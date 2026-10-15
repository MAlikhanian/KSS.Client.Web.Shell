import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getLanguages } from '@/services/common-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/languages
 * Returns all active languages from Common service.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const languages = await getLanguages(session.accessToken);

    // Return only active languages
    const result = languages
      .filter((l) => l.isActive)
      .map((l) => ({
        id: l.id,
        code: l.code,
        name: l.name,
        nativeName: l.nativeName,
      }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error fetching languages:', error);
    return apiErrorResponse(error, 'fetching languages');
  }
}
