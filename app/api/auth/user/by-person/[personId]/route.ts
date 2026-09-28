import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getUserByPersonId } from '@/services/auth-api';

// GET /api/auth/user/by-person/{personId}
// Returns the User row tied to a PersonId, or null if no user is linked.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ personId: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { personId } = await params;
    if (!personId) {
      return NextResponse.json({ message: 'personId is required' }, { status: 400 });
    }

    const user = await getUserByPersonId(session.accessToken, personId);
    // User missing → return JSON null (page treats null as "no linked user").
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user by personId:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
