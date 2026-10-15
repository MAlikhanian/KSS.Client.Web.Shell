import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import {
  listFundRolePersons,
  addFundRolePerson,
  removeFundRolePerson,
} from '@/services/erp-members-api';

// GET /api/funds/{id}/role-persons — list all organ assignments for a fund
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const rows = await listFundRolePersons(session.accessToken, id);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}

// POST /api/funds/{id}/role-persons — add a new organ assignment.
// Body: { personId, fundRoleId }
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    // No id — the backend stamps a v7 GUID (FundRolePersonInsertDto has no Id).
    const result = await addFundRolePerson(session.accessToken, {
      fundId: id,
      personId: body.personId,
      fundRoleId: body.fundRoleId,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}

// DELETE /api/funds/{id}/role-persons — remove one assignment by row id.
// Body: { id: <fundRolePersonId> }
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    await removeFundRolePerson(session.accessToken, body.id);
    return NextResponse.json({ message: 'Removed.' });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
