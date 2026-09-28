import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listPositions } from '@/services/erp-members-api';

/**
 * GET /api/members-lookups/positions
 *
 * Returns the Position lookup list (with FA + EN translations) from the
 * Members service. Used by the brokerages/members-info "Position" select.
 *
 * Shape is mapped to the same `{ id, name, code, isActive }` the legacy
 * `useData('positions')` hook used to load from `/data/positions.json`, so
 * existing components don't need to change.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const rows = await listPositions(session.accessToken);

    // Map to the legacy DataItem shape. Name picks Persian (LanguageId=12)
    // first, falls back to English (10), then the code itself.
    const items = rows.map((p) => {
      const fa = p.translations?.find((t) => t.languageId === 12);
      const en = p.translations?.find((t) => t.languageId === 10);
      return {
        id: String(p.id),
        code: p.code,
        name: fa?.name ?? en?.name ?? p.code,
        isActive: true,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('[members-lookups/positions] GET error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load positions' },
      { status: 500 },
    );
  }
}
