import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import {
  listBrokeragePersonsByBrokerage,
  upsertBrokeragePerson,
  deleteBrokeragePerson,
  getBrokerageByCompanyId,
  type BrokeragePersonDto,
} from '@/services/erp-members-api';

/**
 * Brokerage membership ("Related Parties") BFF route.
 *
 * URL param `id` is the **CompanyId** (the brokerages context calls this
 * "selectedBrokerageId", but it's actually KSS_Company.Company.Id — the same
 * value the company-stakeholders route uses). We resolve it to the Members
 * service's Brokerage.Id internally via `getBrokerageByCompanyId`.
 *
 * GET   — list every Members.Person row for the brokerage. Person-level data
 *         (name, NID, gender, email, etc.) is NOT fetched here; the UI calls
 *         /api/person/{personId} for that, so the read-only card can render
 *         independently of this list response.
 * POST  — upsert a single membership row keyed by (BrokerageId, PersonId).
 *         Body matches BrokeragePersonDto.
 * DELETE — soft-delete by row id (Members.Person.Id) via ?membershipId=...
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: companyId } = await params;
    const erpBrokerage = await getBrokerageByCompanyId(session.accessToken, companyId).catch(() => null);
    if (!erpBrokerage) {
      return NextResponse.json([]);
    }
    const rows = await listBrokeragePersonsByBrokerage(session.accessToken, erpBrokerage.id);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('[brokerages/[id]/related-persons] GET error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load related persons' },
      { status: 500 },
    );
  }
}

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
    const body = (await req.json()) as Partial<BrokeragePersonDto>;

    if (!body.personId) {
      return NextResponse.json({ message: 'personId is required' }, { status: 400 });
    }

    const erpBrokerage = await getBrokerageByCompanyId(session.accessToken, companyId).catch(() => null);
    if (!erpBrokerage) {
      return NextResponse.json({ message: 'BROKERAGE_NOT_FOUND' }, { status: 400 });
    }

    const dto: BrokeragePersonDto = {
      ...(body as BrokeragePersonDto),
      brokerageId: erpBrokerage.id,
    };

    const saved = await upsertBrokeragePerson(session.accessToken, dto);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('[brokerages/[id]/related-persons] POST error:', error);
    const message = error instanceof Error ? error.message : 'Failed to save related person';
    const isBusinessRule = /^[A-Z_]+$/.test(message);
    return NextResponse.json({ message }, { status: isBusinessRule ? 400 : 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const membershipId = url.searchParams.get('membershipId');
    if (!membershipId) {
      return NextResponse.json({ message: 'membershipId query param required' }, { status: 400 });
    }

    await deleteBrokeragePerson(session.accessToken, membershipId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[brokerages/[id]/related-persons] DELETE error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to delete related person' },
      { status: 500 },
    );
  }
}
