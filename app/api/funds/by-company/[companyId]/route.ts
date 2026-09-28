import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getFundByCompanyId } from '@/services/erp-members-api';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { companyId } = await params;
    const fund = await getFundByCompanyId(session.accessToken, companyId);
    if (!fund) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(fund);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
