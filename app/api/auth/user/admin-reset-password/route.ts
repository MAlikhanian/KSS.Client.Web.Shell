import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { adminResetPassword } from '@/services/auth-api';

// PUT /api/auth/user/admin-reset-password — body { userId, newPassword }
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body?.userId || !body?.newPassword) {
      return NextResponse.json(
        { message: 'userId and newPassword are required' },
        { status: 400 },
      );
    }

    await adminResetPassword(session.accessToken, {
      userId: body.userId,
      newPassword: body.newPassword,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error resetting password (admin):', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
