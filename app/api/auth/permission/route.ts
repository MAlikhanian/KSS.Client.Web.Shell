import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listPermissions } from '@/services/auth-api';

// GET /api/auth/permission — list all permissions (read-only).
// Permission catalog is maintained via DB migrations only; no create/update/delete.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await listPermissions(session.accessToken);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load permissions.' },
      { status: 500 },
    );
  }
}
