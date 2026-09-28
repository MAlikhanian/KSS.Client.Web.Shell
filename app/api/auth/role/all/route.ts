import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

// GET /api/auth/role/all — proxy to KSS.Service.Auth `/Api/Role/GetAll`.
// Used by the security page's role-edit dialog to populate the multi-select.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const baseUrl = process.env.AUTH_API_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { message: 'AUTH_API_BASE_URL is not set' },
        { status: 500 },
      );
    }

    const res = await fetch(`${baseUrl}/Api/Role/GetAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return NextResponse.json(
        { message: text || 'Failed to load roles' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading all roles:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
