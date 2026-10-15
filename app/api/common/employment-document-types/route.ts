import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

const PERSIAN = 12;
const ENGLISH = 10;

interface EmploymentDocumentTypeRow {
  id: number;
  code: string;
  isActive: boolean;
  translations?: Array<{ languageId: number; name: string }>;
}

/**
 * GET /api/common/employment-document-types?languageId=12
 *
 * Lookup endpoint feeding the "Document Type" dropdown inside the Employment
 * (Work Experience) section's doc-upload dialog. Joins EmploymentDocumentType +
 * its translations once on the BFF and returns `{ id, code, name }[]` filtered
 * to the requested language (defaults to Persian if not given).
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
    }

    const languageId = Number(request.nextUrl.searchParams.get('languageId') || PERSIAN);
    const baseUrl = process.env.PERSON_API_BASE_URL;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    };

    // Pull types + translations in parallel.
    const [typesRes, transRes] = await Promise.all([
      fetch(`${baseUrl}/Api/EmploymentDocumentType/ToListAll`, { method: 'GET', headers, cache: 'no-store' }),
      fetch(`${baseUrl}/Api/EmploymentDocumentTypeTranslation/ToListAll`, { method: 'GET', headers, cache: 'no-store' }),
    ]);

    if (!typesRes.ok || !transRes.ok) {
      return NextResponse.json({ message: 'Failed to load document types.' }, { status: 500 });
    }

    const types: EmploymentDocumentTypeRow[] = await typesRes.json();
    const translations: Array<{ employmentDocumentTypeId: number; languageId: number; name: string }> =
      await transRes.json();

    const result = types
      .filter((t) => t.isActive !== false)
      .map((t) => {
        const tr =
          translations.find((x) => x.employmentDocumentTypeId === t.id && x.languageId === languageId) ||
          translations.find((x) => x.employmentDocumentTypeId === t.id && x.languageId === ENGLISH) ||
          translations.find((x) => x.employmentDocumentTypeId === t.id);
        return { id: t.id, code: t.code, name: tr?.name || t.code };
      });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
