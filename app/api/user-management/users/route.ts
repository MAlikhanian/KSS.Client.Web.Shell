import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { getClientIP } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { systemLog } from '@/services/system-log';
import {
  UserAddSchema,
  UserAddSchemaType,
} from '@/app/(protected)/user-management/users/forms/user-add-schema';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { UserStatus } from '@/app/models/user';
import { getPersonsList } from '@/services/person-api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const query = searchParams.get('query') || '';
  const sortField = searchParams.get('sort') || 'createdAt';
  const sortDirection = searchParams.get('dir') === 'desc' ? 'desc' : 'asc';

  try {
    // Validate user session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    // Get access token from JWT token (more reliable than session)
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = (token as any)?.accessToken || (session as any).accessToken;
    
    // If no token found, try to get it from Auth service (for users who logged in before token storage was added)
    if (!accessToken && session.user?.email) {
      console.log('[User Management API] Access token not in session, attempting to fetch from Auth service...');
      try {
        // Note: This requires the user's password which we don't have
        // Users will need to log out and log back in to get the token stored
        console.warn('[User Management API] Cannot fetch token without password. User must log in again.');
      } catch (error) {
        console.error('[User Management API] Error fetching token:', error);
      }
    }
    
    if (!accessToken) {
      console.error('[User Management API] Access token not found. User must log out and log back in.');
      return NextResponse.json(
        { 
          message: 'Authentication token not found. Please log out and log back in to refresh your session.',
          code: 'TOKEN_MISSING'
        },
        { status: 401 },
      );
    }

    console.log('[User Management API] Fetching persons with token');

    // Fetch persons from Person service
    let personsResponse;
    try {
      personsResponse = await getPersonsList(accessToken);
      console.log('[User Management API] Persons response:', {
        count: personsResponse?.Count,
        valueLength: personsResponse?.value?.length,
      });
    } catch (error) {
      console.error('[User Management API] Error fetching persons:', error);
      throw error;
    }
    
    let persons = personsResponse.value || [];
    console.log('[User Management API] Processed persons count:', persons.length);

    // Apply search filter
    if (query) {
      const queryLower = query.toLowerCase();
      persons = persons.filter((person) => {
        const firstName = person.translations?.[0]?.firstName?.toLowerCase() || '';
        const lastName = person.translations?.[0]?.lastName?.toLowerCase() || '';
        const nationalId = person.nationalId?.toLowerCase() || '';
        return (
          firstName.includes(queryLower) ||
          lastName.includes(queryLower) ||
          nationalId.includes(queryLower)
        );
      });
    }

    // Apply sorting
    persons.sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = `${a.translations?.[0]?.firstName || ''} ${a.translations?.[0]?.lastName || ''}`.trim();
          bValue = `${b.translations?.[0]?.firstName || ''} ${b.translations?.[0]?.lastName || ''}`.trim();
          break;
        case 'nationalId':
          aValue = a.nationalId || '';
          bValue = b.nationalId || '';
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Apply pagination
    const total = persons.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPersons = persons.slice(startIndex, endIndex);

    // Transform Person data to User-like format for the grid
    const users = paginatedPersons.map((person) => {
      const translation = person.translations?.[0];
      const firstName = translation?.firstName || '';
      const lastName = translation?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim() || person.nationalId;
      
      // Get primary email or first email
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const primaryEmail = person.emails?.find((e: any) => e.isPrimary) || person.emails?.[0];
      const emailAddress = primaryEmail?.emailAddress || '';
      
      return {
        id: person.id,
        name: fullName,
        email: emailAddress,
        avatar: null,
        status: 'ACTIVE' as UserStatus,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt || person.createdAt,
        lastSignInAt: null,
        emailVerifiedAt: null,
        isTrashed: false,
        isProtected: false,
        roleId: '', // Person doesn't have role, using empty string
        role: {
          id: '',
          name: '',
          slug: '',
          description: null,
          isTrashed: false,
          createdByUserId: null,
          createdAt: new Date(),
          isProtected: false,
          isDefault: false,
        },
        nationalId: person.nationalId,
      };
    });

    console.log('[User Management API] Returning response:', {
      usersCount: users.length,
      total,
      page,
      empty: users.length === 0,
    });

    return NextResponse.json({
      data: users,
      empty: users.length === 0,
      pagination: {
        total,
        page,
      },
    });
  } catch (error) {
    console.error('[User Management API] Error:', error);
    const message = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again in a moment.';
    
    // If the error is a token expiration, return 401 so the client can redirect
    const isAuthError = message.toLowerCase().includes('token expired') 
      || message.toLowerCase().includes('unauthorized')
      || message.toLowerCase().includes('authentication');
    
    return NextResponse.json(
      { message: isAuthError ? message : 'Oops! Something went wrong. Please try again in a moment.' },
      { status: isAuthError ? 401 : 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate user session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 }, // Unauthorized
      );
    }

    const clientIp = getClientIP(request);
    const body = await request.json();
    const parsedData = UserAddSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input.' },
        { status: 400 }, // Bad request
      );
    }

    const { name, email, roleId }: UserAddSchemaType = parsedData.data;

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email is already registered.' },
        { status: 409 }, // Conflict
      );
    }

    // Check if the role exists
    const existingRole = await prisma.userRole.findUnique({
      where: { id: roleId },
    });

    if (!existingRole) {
      return NextResponse.json(
        {
          message:
            'Selected role does not exist. Someone might have deleted it already.',
        },
        { status: 404 }, // Not found
      );
    }

    // Use a transaction to insert multiple records atomically
    const result = await prisma.$transaction(async (tx) => {
      // Create a user
      const user = await tx.user.create({
        data: {
          name,
          email,
          status: UserStatus.ACTIVE,
          roleId,
        },
      });

      // Log the event
      await systemLog(
        {
          event: 'create',
          userId: session.user.id,
          entityId: user.id,
          entityType: 'user',
          description: 'User added by user.',
          ipAddress: clientIp,
        },
        tx,
      );

      return user;
    });

    return NextResponse.json(
      {
        message: 'User successfully added.',
        user: result,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}
