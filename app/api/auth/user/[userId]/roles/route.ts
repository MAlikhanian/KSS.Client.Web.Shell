import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getUserRoles, assignUserRoles } from '@/services/auth-api';

// GET /api/auth/user/{userId}/roles — list of role names assigned to the user.
export async function GET(
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

    const roles = await getUserRoles(session.accessToken, userId);
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error loading user roles:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}

// PUT /api/auth/user/{userId}/roles — body { roleIds: string[] }.
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
    if (!Array.isArray(body?.roleIds)) {
      return NextResponse.json(
        { message: 'roleIds (string[]) is required' },
        { status: 400 },
      );
    }

    await assignUserRoles(session.accessToken, {
      userId,
      roleIds: body.roleIds,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error assigning user roles:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
