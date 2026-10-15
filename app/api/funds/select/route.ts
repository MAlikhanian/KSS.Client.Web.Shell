import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listFundCompanies } from '@/services/erp-members-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/funds/select
 *
 * Pass-through to KSS.Service.SEBA_ERP_Members /Api/Fund/CompanyList. That
 * endpoint owns the "company belongs to the Fund domain" rule and forwards
 * through to KSS.Service.Company with the caller's Bearer token, so the
 * Access/RoleAccess filter still applies.
 *
 * `id` on each returned item is the Company.Id (Guid) — detail pages resolve
 * the Fund via /api/funds/by-company/{id}.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || undefined;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const companies = await listFundCompanies(session.accessToken, 12, query);
    return NextResponse.json(companies);
  } catch (error) {
    return apiErrorResponse(error, 'fetching fund select list');
  }
}
