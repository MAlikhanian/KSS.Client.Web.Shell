import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getFundCount } from '@/services/erp-members-api';

// GET /api/funds/count — proxies the scalar count from KSS.Service.SEBA_ERP_Members.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const count = await getFundCount(session.accessToken);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching fund count:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
