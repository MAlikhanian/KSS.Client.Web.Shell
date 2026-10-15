import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listStockExchanges } from '@/services/erp-members-api';

/**
 * GET /api/members-lookups/stock-exchanges
 *
 * Returns the StockExchange lookup list (with FA + EN translations) from the
 * Members service. Same shape as positions/work-locations so the existing
 * `useData('stock-exchanges')` hook works unchanged.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const rows = await listStockExchanges(session.accessToken);

    const items = rows.map((s) => {
      const fa = s.translations?.find((t) => t.languageId === 12);
      const en = s.translations?.find((t) => t.languageId === 10);
      return {
        id: String(s.id),
        code: s.code,
        name: fa?.name ?? en?.name ?? s.code,
        isActive: true,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('[members-lookups/stock-exchanges] GET error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load stock exchanges' },
      { status: 500 },
    );
  }
}
