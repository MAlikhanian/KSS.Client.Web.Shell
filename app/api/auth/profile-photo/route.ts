import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { listDocumentsByPerson } from '@/services/person-api';
import { downloadFile } from '@/services/file-orchestrator-api';

const PROFILE_PHOTO_TYPE_ID = 8;

// GET: Returns the logged-in user's profile photo as binary
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken || !session?.user?.personId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const personId = session.user.personId as string;

    // Find profile photo document
    const docs = await listDocumentsByPerson(session.accessToken, personId);
    const profileDoc = Array.isArray(docs)
      ? docs.find((d: { documentTypeId: number }) => d.documentTypeId === PROFILE_PHOTO_TYPE_ID)
      : null;

    if (!profileDoc) {
      return NextResponse.json({ message: 'No profile photo' }, { status: 404 });
    }

    // Download through orchestrator
    const fileDataBase64 = await downloadFile(
      session.accessToken,
      profileDoc.id,
      profileDoc.storageInstanceId,
    );

    if (!fileDataBase64) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    const buffer = Buffer.from(fileDataBase64, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': profileDoc.contentType || 'image/jpeg',
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch (error) {
    console.error('Error fetching profile photo:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 },
    );
  }
}
