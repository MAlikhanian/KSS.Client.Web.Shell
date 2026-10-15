import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getTradingStationActivityTypes, getTradingStationActivityTypeTranslations } from '@/services/trading-station-api';
import { apiErrorResponse } from '@/lib/api-error';

/** GET /api/members-lookups/trading-station-activity-types?languageId=12 -> [{id,name,code,isActive}] */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const languageId = parseInt(searchParams.get('languageId') || '12');

    const [types, translations] = await Promise.all([
      getTradingStationActivityTypes(session.accessToken),
      getTradingStationActivityTypeTranslations(session.accessToken),
    ]);

    const fa = new Map(translations.filter((t) => t.languageId === languageId).map((t) => [t.tradingStationActivityTypeId, t.name]));
    const en = new Map(translations.filter((t) => t.languageId === 10).map((t) => [t.tradingStationActivityTypeId, t.name]));

    return NextResponse.json(types.map((x) => ({
      id: String(x.id),
      name: fa.get(x.id) || en.get(x.id) || x.code,
      code: x.code,
      isActive: true,
    })));
  } catch (error) {
    return apiErrorResponse(error, 'fetching trading station activity types');
  }
}
