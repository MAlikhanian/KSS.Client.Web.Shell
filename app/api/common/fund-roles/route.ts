import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listFundRoles } from '@/services/erp-members-api';

const PERSIAN = 12;

/**
 * GET /api/common/fund-roles?languageId=12
 *
 * Lookup for the organ-role dropdown in fund-organs-section. Returns
 * { id, code, name }[] — 4 rows (Manager, Trustee, Auditor, Association
 * Liaison) with the name in the requested language (fa default).
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const languageId = Number(request.nextUrl.searchParams.get('languageId') || PERSIAN);
    const data = await listFundRoles(session.accessToken, languageId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
