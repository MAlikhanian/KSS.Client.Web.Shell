import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import {
  getBrokerageByCompanyId,
  createBrokerageErp,
  updateBrokerageErp,
} from '@/services/erp-members-api';
import { apiErrorResponse } from '@/lib/api-error';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    const accessToken = session.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { message: 'No access token available. Please sign in again.' },
        { status: 401 },
      );
    }

    const { id } = await params;
    const erpData = await getBrokerageByCompanyId(accessToken, id).catch(() => null);

    return NextResponse.json({
      companyId: id,
      seoRegistrationDate: erpData?.seoRegistrationDate || '',
      seoRegistrationNumber: erpData?.seoRegistrationNo || '',
      employeeCount: erpData?.employeeCount ?? null,
      erpBrokerageId: erpData?.id || null,
      brokerageCode: erpData?.brokerageCode || '',
      seoLicenseNo: erpData?.seoLicenseNo || '',
      seoLicenseDate: erpData?.seoLicenseDate || '',
      seoLicenseExpiryDate: erpData?.seoLicenseExpiryDate || '',
      capitalAmount: erpData?.capitalAmount ?? null,
      branchCount: erpData?.branchCount ?? null,
      isListedOnExchange: erpData?.isListedOnExchange ?? false,
      exchangeSymbol: erpData?.exchangeSymbol || '',
      isActive: erpData?.isActive ?? true,
    });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'fetching brokerage');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    const accessToken = session.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { message: 'No access token available. Please sign in again.' },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();

    if (!body.seoRegistrationDate) {
      return NextResponse.json(
        { message: 'تاریخ ثبت در سازمان الزامی است' },
        { status: 400 },
      );
    }
    if (!body.seoRegistrationNumber || !body.seoRegistrationNumber.trim()) {
      return NextResponse.json(
        { message: 'شماره ثبت در سازمان الزامی است' },
        { status: 400 },
      );
    }

    const erpFields = {
      companyId: id,
      seoRegistrationNo: body.seoRegistrationNumber.trim(),
      seoRegistrationDate: body.seoRegistrationDate,
      employeeCount: body.employeeCount ? parseInt(body.employeeCount) : null,
      isActive: body.isActive ?? true,
    };

    await upsertBrokerageErp(accessToken, id, erpFields);

    return NextResponse.json(erpFields);
  } catch (error: unknown) {
    return apiErrorResponse(error, 'updating brokerage');
  }
}

/**
 * Upsert brokerage ERP record:
 * - If a record exists for this companyId, update it
 * - Otherwise create a new one
 */
async function upsertBrokerageErp(
  token: string,
  companyId: string,
  fields: {
    companyId: string;
    seoRegistrationNo: string;
    seoRegistrationDate: string;
    employeeCount: number | null;
    isActive: boolean;
  },
) {
  const existing = await getBrokerageByCompanyId(token, companyId).catch(
    () => null,
  );

  if (existing) {
    await updateBrokerageErp(token, {
      id: existing.id,
      companyId: existing.companyId,
      brokerageStatusId: existing.brokerageStatusId,
      brokerageCode: existing.brokerageCode,
      seoRegistrationNo: fields.seoRegistrationNo,
      seoRegistrationDate: fields.seoRegistrationDate,
      seoLicenseNo: existing.seoLicenseNo,
      seoLicenseDate: existing.seoLicenseDate,
      seoLicenseExpiryDate: existing.seoLicenseExpiryDate,
      capitalAmount: existing.capitalAmount,
      employeeCount: fields.employeeCount,
      branchCount: existing.branchCount,
      isListedOnExchange: existing.isListedOnExchange,
      exchangeSymbol: existing.exchangeSymbol,
      isActive: fields.isActive,
      description: existing.description,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
    });
  } else {
    await createBrokerageErp(token, {
      // No id — the backend stamps a v7 GUID (BrokerageInsertDto has no Id field,
      // so a client-supplied GUID can't be bound even by mistake).
      companyId,
      brokerageStatusId: 1,
      seoRegistrationNo: fields.seoRegistrationNo,
      seoRegistrationDate: fields.seoRegistrationDate,
      employeeCount: fields.employeeCount,
      isActive: fields.isActive,
      isListedOnExchange: false,
    });
  }
}
