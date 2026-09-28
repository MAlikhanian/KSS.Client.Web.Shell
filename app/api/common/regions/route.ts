import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getRegionsByCountry, getRegionTranslations } from '@/services/common-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/regions?countryId=1&languageId=12
 * Returns regions for a country with their translated names.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const countryId = parseInt(searchParams.get('countryId') || '0');
    const languageId = parseInt(searchParams.get('languageId') || '12');

    if (!countryId) {
      return NextResponse.json({ message: 'countryId is required' }, { status: 400 });
    }

    const [regions, allTranslations] = await Promise.all([
      getRegionsByCountry(session.accessToken, countryId),
      getRegionTranslations(session.accessToken),
    ]);

    // Filter translations by languageId, then join with regions
    const translations = allTranslations.filter((t) => t.languageId === languageId);
    const translationMap = new Map(
      translations.map((t) => [t.regionId, t.name]),
    );

    const result = regions.map((r) => ({
      id: r.id,
      countryId: r.countryId,
      code: r.code,
      name: translationMap.get(r.id) || r.code,
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    return apiErrorResponse(error, 'fetching regions');
  }
}
