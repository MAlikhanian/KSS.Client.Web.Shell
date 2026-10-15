import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getCitiesByRegion, getCityTranslations } from '@/services/common-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/cities?regionId=1&languageId=12
 * Returns cities for a region with their translated names.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const regionId = parseInt(searchParams.get('regionId') || '0');
    const languageId = parseInt(searchParams.get('languageId') || '12');

    if (!regionId) {
      return NextResponse.json({ message: 'regionId is required' }, { status: 400 });
    }

    const [cities, allTranslations] = await Promise.all([
      getCitiesByRegion(session.accessToken, regionId),
      getCityTranslations(session.accessToken),
    ]);

    // Filter translations by languageId and only for fetched cities, then join
    const cityIds = new Set(cities.map((c) => c.id));
    const translations = allTranslations.filter(
      (t) => t.languageId === languageId && cityIds.has(t.cityId),
    );
    const translationMap = new Map(
      translations.map((t) => [t.cityId, t.name]),
    );

    const result = cities.map((c) => ({
      id: c.id,
      countryId: c.countryId,
      regionId: c.regionId,
      code: c.code,
      name: translationMap.get(c.id) || c.code || `City ${c.id}`,
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    return apiErrorResponse(error, 'fetching cities');
  }
}
