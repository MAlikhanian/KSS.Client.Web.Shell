import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listPersonStatusesLookup } from '@/services/erp-members-api';

/**
 * GET /api/members-lookups/person-statuses
 *
 * Returns the PersonStatus lookup list (Active / Suspended / Closed / Pending)
 * with FA + EN names from the Members service, in the `useData('person-statuses')`
 * shape so DynamicSelect can consume it like the other members lookups.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const items = await listPersonStatusesLookup(session.accessToken);
    return NextResponse.json(items);
  } catch (error) {
    console.error('[members-lookups/person-statuses] GET error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to load person statuses' },
      { status: 500 },
    );
  }
}
