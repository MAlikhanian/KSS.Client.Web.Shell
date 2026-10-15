import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getBrokerageCount } from '@/services/erp-members-api';

// GET /api/brokerages/count — proxies the scalar count from KSS.Service.SEBA_ERP_Members.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const count = await getBrokerageCount(session.accessToken);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching brokerage count:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
