import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import {
  getCachedCountries,
  getCachedRegions,
  getCachedCities,
} from '@/lib/locations-cache';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * Unified location endpoint for the LocationSelect component.
 *
 * Query params:
 *   type       — "countries" | "provinces" | "cities"  (required)
 *   countryId  — filter provinces by country            (optional, for type=provinces)
 *   provinceId — filter cities by province/region       (optional, for type=cities)
 *
 * Response shape matches LocationData interface:
 *   [{id, name, nameEn, code?, countryId?, provinceId?}]
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type || !['countries', 'provinces', 'cities'].includes(type)) {
      return NextResponse.json(
        {
          message:
            'Query parameter "type" is required and must be one of: countries, provinces, cities',
        },
        { status: 400 },
      );
    }

    switch (type) {
      case 'countries': {
        const countries = await getCachedCountries(session.accessToken);
        return NextResponse.json(countries);
      }

      case 'provinces': {
        const allRegions = await getCachedRegions(session.accessToken);
        const countryId = searchParams.get('countryId');
        const filtered = countryId
          ? allRegions.filter((r) => r.countryId === countryId)
          : allRegions;
        return NextResponse.json(filtered);
      }

      case 'cities': {
        const allCities = await getCachedCities(session.accessToken);
        const provinceId = searchParams.get('provinceId');
        const filtered = provinceId
          ? allCities.filter((c) => c.provinceId === provinceId)
          : allCities;
        return NextResponse.json(filtered);
      }

      default:
        return NextResponse.json(
          { message: 'Invalid type' },
          { status: 400 },
        );
    }
  } catch (error: unknown) {
    return apiErrorResponse(error, 'fetching locations');
  }
}
