import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getCountries, getCountryTranslations } from '@/services/common-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/countries?languageId=12
 * Returns countries with their translated names.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const languageId = parseInt(searchParams.get('languageId') || '12');

    const [countries, allTranslations] = await Promise.all([
      getCountries(session.accessToken),
      getCountryTranslations(session.accessToken),
    ]);

    // Filter translations by languageId, then join with countries
    const translations = allTranslations.filter((t) => t.languageId === languageId);
    const translationMap = new Map(
      translations.map((t) => [t.countryId, t.name]),
    );

    const result = countries.map((c) => ({
      id: c.id,
      code: c.code,
      code3: c.code3,
      name: translationMap.get(c.id) || c.nativeName || c.code,
      nativeName: c.nativeName,
      callingCode: c.callingCode,
      postalCodeLength: c.postalCodeLength,
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error fetching countries:', error);
    return apiErrorResponse(error, 'fetching countries');
  }
}
