import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { markEmailVerified } from '@/services/auth-api';

// POST /api/auth/user/mark-email-verified/{userId}
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: 'userId is required' }, { status: 400 });
    }

    await markEmailVerified(session.accessToken, userId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error marking email verified:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
