import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getAddressLabels, getAddressLabelTranslations } from '@/services/common-api';
import { apiErrorResponse } from '@/lib/api-error';

/**
 * GET /api/common/address-labels?languageId=12
 * Shared address labels (from the Common service) with localized names.
 * Shape: [{ id, name, code, isActive }] — consumable by useData / DynamicSelect.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const languageId = parseInt(searchParams.get('languageId') || '12');

    const [labels, allTranslations] = await Promise.all([
      getAddressLabels(session.accessToken),
      getAddressLabelTranslations(session.accessToken),
    ]);

    const fa = new Map(allTranslations.filter((t) => t.languageId === languageId).map((t) => [t.addressLabelId, t.name]));
    const en = new Map(allTranslations.filter((t) => t.languageId === 10).map((t) => [t.addressLabelId, t.name]));

    const result = labels.map((l) => ({
      id: String(l.id),
      name: fa.get(l.id) || en.get(l.id) || l.code,
      code: l.code,
      isActive: true,
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error fetching address labels:', error);
    return apiErrorResponse(error, 'fetching address labels');
  }
}
