import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { mapPersonsToUsers } from '@/services/auth-api';

// POST /api/auth/map-persons-to-users — proxies the bulk PersonId → UserId
// lookup from KSS.Service.Auth. Body: { personIds: string[] }.
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const personIds: string[] = Array.isArray(body?.personIds) ? body.personIds : [];
    const map = await mapPersonsToUsers(session.accessToken, personIds);
    return NextResponse.json(map);
  } catch (error) {
    console.error('Error mapping persons to users:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
