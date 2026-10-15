import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listWorkLocations } from '@/services/erp-members-api';

/**
 * GET /api/members-lookups/work-locations
 *
 * Returns the WorkLocation lookup list (with FA + EN translations) from the
 * Members service, mapped to the legacy `useData('work-locations')` shape so
 * existing components keep working.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const rows = await listWorkLocations(session.accessToken);

    const items = rows.map((w) => {
      const fa = w.translations?.find((t) => t.languageId === 12);
      const en = w.translations?.find((t) => t.languageId === 10);
      return {
        id: String(w.id),
        code: w.code,
        name: fa?.name ?? en?.name ?? w.code,
        isActive: true,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('[members-lookups/work-locations] GET error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load work locations' },
      { status: 500 },
    );
  }
}
