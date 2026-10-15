import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { createCompany } from '@/services/company-api';
import { apiErrorResponse } from '@/lib/api-error';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    const accessToken = session.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { message: 'No access token available. Please sign in again.' },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { companyPersianName, companyLatinName } = body;

    // Validate required fields
    if (!companyPersianName) {
      return NextResponse.json(
        { message: 'Company Persian name is required' },
        { status: 400 },
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Build translations array. The backend (CompanyOperation/Insert) generates
    // the company id (v7) and wires it to these translations — the frontend never
    // supplies a GUID.
    const translations = [
      { languageId: 12, name: companyPersianName },
    ];
    if (companyLatinName) {
      translations.push({ languageId: 10, name: companyLatinName });
    }

    // Build name history translations
    const nameHistoryTranslations = [
      { nameHistoryId: '', languageId: 12, name: companyPersianName },
    ];
    if (companyLatinName) {
      nameHistoryTranslations.push({
        nameHistoryId: '',
        languageId: 10,
        name: companyLatinName,
      });
    }

    const insertDto = {
      legalFormId: 1, // Default type, user can change later
      registrationDate: body.registrationDate || today,
      registrationNo: body.registrationNumber || '',
      nationalId: body.nationalId || '',
      economicCode: body.economicCode || '',
      registrationCountryId: body.registrationCountry
        ? parseInt(body.registrationCountry)
        : 0,
      registrationRegionId: body.registrationRegion
        ? parseInt(body.registrationRegion)
        : 0,
      registrationCityId: body.registrationCity
        ? parseInt(body.registrationCity)
        : 0,
      foundedDate: body.seoRegistrationDate || null,
      website: body.website || null,
      isActive: true,
      translations,
      nameHistory: {
        startDate: body.registrationDate || today,
        endDate: null,
        translations: nameHistoryTranslations,
      },
    };

    const result = await createCompany(accessToken, insertDto);

    return NextResponse.json({ id: result.id }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'creating brokerage');
  }
}
