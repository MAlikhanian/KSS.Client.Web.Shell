import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getInstitutions, getInstitutionTranslations } from '@/services/person-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/institutions?languageId=1&countryId=1&regionId=1&cityId=1
 * Returns institutions with translated names, optionally filtered by location.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const languageId = parseInt(searchParams.get('languageId') || '1');
    const countryId = searchParams.get('countryId') ? parseInt(searchParams.get('countryId')!) : null;
    const regionId = searchParams.get('regionId') ? parseInt(searchParams.get('regionId')!) : null;
    const cityId = searchParams.get('cityId') ? parseInt(searchParams.get('cityId')!) : null;

    const [institutions, allTranslations] = await Promise.all([
      getInstitutions(session.accessToken),
      getInstitutionTranslations(session.accessToken),
    ]);

    const translations = allTranslations.filter((t: { languageId: number }) => t.languageId === languageId);
    const translationMap = new Map(
      translations.map((t: { institutionId: number; name: string }) => [t.institutionId, t.name]),
    );

    let filtered = institutions.filter((i: { isActive: boolean }) => i.isActive);

    if (countryId) filtered = filtered.filter((i: { countryId: number }) => i.countryId === countryId);
    if (regionId) filtered = filtered.filter((i: { regionId: number }) => i.regionId === regionId);
    if (cityId) filtered = filtered.filter((i: { cityId: number }) => i.cityId === cityId);

    const result = filtered.map((i: { id: number; code: string; countryId: number; regionId: number; cityId: number }) => ({
      id: i.id,
      code: i.code,
      name: translationMap.get(i.id) || i.code,
      countryId: i.countryId,
      regionId: i.regionId,
      cityId: i.cityId,
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error fetching institutions:', error);
    return apiErrorResponse(error, 'fetching institutions');
  }
}
