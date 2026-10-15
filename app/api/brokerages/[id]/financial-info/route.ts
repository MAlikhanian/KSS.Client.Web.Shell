import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import {
  listCompanyFinancialInfo,
  addCompanyFinancialInfo,
  updateCompanyFinancialInfo,
  deleteCompanyFinancialInfo,
} from '@/services/company-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET — List all financial info records for a company
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: companyId } = await params;
    const records = await listCompanyFinancialInfo(session.accessToken, companyId);

    // Sort by fiscal year descending (newest first)
    records.sort((a, b) => b.fiscalYear - a.fiscalYear);

    return NextResponse.json(records);
  } catch (error: unknown) {
    console.error('Error listing financial info:', error);
    return apiErrorResponse(error);
  }
}

/**
 * POST — Add a new financial info record
 * Body: { fiscalYear, registeredCapital, numberOfShares }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: companyId } = await params;
    const body = await req.json();
    const { fiscalYear, registeredCapital, numberOfShares } = body as {
      fiscalYear: number;
      registeredCapital: number;
      numberOfShares: number;
    };

    if (!fiscalYear || !registeredCapital || !numberOfShares) {
      return NextResponse.json({ message: 'fiscalYear, registeredCapital and numberOfShares are required' }, { status: 400 });
    }

    // No id — the backend stamps a v7 GUID (FinancialInfoInsertDto has no Id).
    await addCompanyFinancialInfo(session.accessToken, {
      companyId,
      fiscalYear,
      registeredCapital,
      numberOfShares,
    });

    return NextResponse.json({ companyId, fiscalYear, registeredCapital, numberOfShares }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error adding financial info:', error);
    return apiErrorResponse(error);
  }
}

/**
 * PUT — Update an existing financial info record
 * Body: { itemId, fiscalYear, registeredCapital, numberOfShares }
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: companyId } = await params;
    const body = await req.json();
    const { itemId, fiscalYear, registeredCapital, numberOfShares } = body as {
      itemId: string;
      fiscalYear: number;
      registeredCapital: number;
      numberOfShares: number;
    };

    if (!itemId || !fiscalYear || !registeredCapital || !numberOfShares) {
      return NextResponse.json({ message: 'itemId, fiscalYear, registeredCapital and numberOfShares are required' }, { status: 400 });
    }

    await updateCompanyFinancialInfo(session.accessToken, {
      id: itemId,
      companyId,
      fiscalYear,
      registeredCapital,
      numberOfShares,
    });

    return NextResponse.json({ id: itemId, companyId, fiscalYear, registeredCapital, numberOfShares });
  } catch (error: unknown) {
    console.error('Error updating financial info:', error);
    return apiErrorResponse(error);
  }
}

/**
 * DELETE — Remove a financial info record
 * Query params: ?itemId=...
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: companyId } = await params;
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ message: 'itemId is required' }, { status: 400 });
    }

    // We need the full entity to delete (BaseController Remove requires [FromBody] T)
    // First fetch the records and find the one to delete
    const records = await listCompanyFinancialInfo(session.accessToken, companyId);
    const record = records.find((r) => r.id === itemId);

    if (!record) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }

    await deleteCompanyFinancialInfo(session.accessToken, {
      id: record.id,
      companyId: record.companyId,
      fiscalYear: record.fiscalYear,
      registeredCapital: record.registeredCapital,
      numberOfShares: record.numberOfShares,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting financial info:', error);
    return apiErrorResponse(error);
  }
}
