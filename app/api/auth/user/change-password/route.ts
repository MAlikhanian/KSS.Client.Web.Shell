import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { changePassword } from '@/services/auth-api';

// PUT /api/auth/user/change-password — body { currentPassword, newPassword }
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body?.currentPassword || !body?.newPassword) {
      return NextResponse.json(
        { message: 'currentPassword and newPassword are required' },
        { status: 400 },
      );
    }

    await changePassword(session.accessToken, {
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
