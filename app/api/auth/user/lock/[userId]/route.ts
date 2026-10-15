import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { lockUser } from '@/services/auth-api';

// POST /api/auth/user/lock/{userId} — body { lockMinutes }
export async function POST(
  req: NextRequest,
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

    const body = await req.json();
    const lockMinutes = Number(body?.lockMinutes);
    if (!Number.isFinite(lockMinutes) || lockMinutes <= 0) {
      return NextResponse.json(
        { message: 'lockMinutes must be a positive number' },
        { status: 400 },
      );
    }

    await lockUser(session.accessToken, userId, lockMinutes);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error locking user:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
