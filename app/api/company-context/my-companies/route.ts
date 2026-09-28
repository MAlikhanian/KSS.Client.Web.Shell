import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getMyCompanyIds } from '@/services/company-person-api';
import { getCompanySelectList } from '@/services/company-api';

// GET /api/company-context/my-companies — the companies the current user (person)
// is assigned to (via CompanyPerson), enriched with names for the picker.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const ids = await getMyCompanyIds(session.accessToken);
    if (ids.length === 0) return NextResponse.json([]);

    // Best-effort name enrichment from the Company service's select list.
    let names: Record<string, string> = {};
    try {
      const list = await getCompanySelectList(session.accessToken);
      names = Object.fromEntries(list.map((c) => [c.id, c.name]));
    } catch {
      // Name lookup is best-effort; fall back to the id.
    }

    const result = ids.map((id) => ({ id, name: names[id] ?? id }));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
