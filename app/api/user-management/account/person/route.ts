import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { getPersonById } from '@/services/person-api';
import { getCurrentUser } from '@/services/auth-api';

export async function GET(req: NextRequest) {
  try {
    // Validate user session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    // Get access token from JWT token
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = (token as any)?.accessToken || (session as any).accessToken;
    
    if (!accessToken) {
      return NextResponse.json(
        { 
          message: 'Authentication token not found. Please log out and log back in to refresh your session.',
          code: 'TOKEN_MISSING'
        },
        { status: 401 },
      );
    }

    // Get PersonId from session, or fetch from Auth service if not available
    let personId = session.user?.personId;
    
    if (!personId) {
      console.log('[Account Person API] PersonId not in session, fetching from Auth service...');
      try {
        const currentUser = await getCurrentUser(accessToken);
        personId = currentUser.personId;
        
        if (!personId) {
          return NextResponse.json(
            { message: 'Person ID not found for this user. Please contact support.' },
            { status: 404 },
          );
        }
        
        console.log('[Account Person API] Retrieved PersonId from Auth service:', personId);
      } catch (error) {
        console.error('[Account Person API] Error fetching PersonId from Auth service:', error);
        return NextResponse.json(
          { 
            message: 'Failed to retrieve Person ID. Please log out and log back in.',
            code: 'PERSON_ID_FETCH_FAILED'
          },
          { status: 500 },
        );
      }
    }

    console.log('[Account Person API] Fetching person data:', { personId });

    // Fetch person from Person service
    const person = await getPersonById(accessToken, personId);

    return NextResponse.json(person);
  } catch (error) {
    console.error('[Account Person API] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch person data';
    
    // If the error is a token expiration, return 401 so the client can redirect
    const isAuthError = message.toLowerCase().includes('token expired') 
      || message.toLowerCase().includes('unauthorized')
      || message.toLowerCase().includes('authentication');
    
    return NextResponse.json(
      { message },
      { status: isAuthError ? 401 : 500 },
    );
  }
}
