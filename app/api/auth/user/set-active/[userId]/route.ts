import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { setUserActive } from '@/services/auth-api';

// PUT /api/auth/user/set-active/{userId} — body { isActive: bool }
export async function PUT(
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
    if (typeof body?.isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'isActive (boolean) is required' },
        { status: 400 },
      );
    }

    await setUserActive(session.accessToken, userId, body.isActive);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error setting user active:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
