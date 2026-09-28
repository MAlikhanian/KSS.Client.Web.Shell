import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listBrokerageCompanies } from '@/services/erp-members-api';
import { apiErrorResponse } from '@/lib/api-error';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || undefined;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
    }

    const companies = await listBrokerageCompanies(session.accessToken, 12, query);
    return NextResponse.json(companies);
  } catch (error) {
    return apiErrorResponse(error, 'fetching brokerages');
  }
}
