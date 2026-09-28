import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

interface ShareholderInput {
  shareholderName: string;
  ownershipType: string;
  ownershipPercentage: string;
  shareCount: string;
  boardRepresentative: string;
  registrationDate: string;
  lastUpdateDate: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    const { id } = await params;
    const shareholders = await prisma.shareholder.findMany({
      where: {
        brokerageId: id,
        isTrashed: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map to expected format
    const mappedShareholders = shareholders.map((shareholder) => ({
      id: shareholder.id,
      shareholderName: shareholder.shareholderName,
      ownershipType: shareholder.ownershipType === 'INDIVIDUAL' ? 'individual' : shareholder.ownershipType === 'LEGAL_ENTITY' ? 'legal_entity' : '',
      ownershipPercentage: shareholder.ownershipPercentage?.toString() || '',
      shareCount: shareholder.shareCount?.toString() || '',
      boardRepresentative: shareholder.boardRepresentative || '',
      registrationDate: shareholder.registrationDate ? shareholder.registrationDate.toISOString().split('T')[0] : '',
      lastUpdateDate: shareholder.lastUpdateDate ? shareholder.lastUpdateDate.toISOString().split('T')[0] : '',
    }));

    return NextResponse.json(mappedShareholders);
  } catch (error) {
    console.error('Error fetching shareholders:', error);
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized request' },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { shareholders } = body;

    if (!Array.isArray(shareholders)) {
      return NextResponse.json(
        { message: 'Shareholders must be an array' },
        { status: 400 },
      );
    }

    // Delete existing shareholders (soft delete)
    await prisma.shareholder.updateMany({
      where: {
        brokerageId: id,
        isTrashed: false,
      },
      data: {
        isTrashed: true,
      },
    });

    // Create new shareholders
    const createdShareholders = await Promise.all(
      shareholders.map((shareholder: ShareholderInput) => {
        return prisma.shareholder.create({
          data: {
            brokerageId: id,
            shareholderName: shareholder.shareholderName || '',
            ownershipType: shareholder.ownershipType === 'individual' ? 'INDIVIDUAL' : shareholder.ownershipType === 'legal_entity' ? 'LEGAL_ENTITY' : null,
            ownershipPercentage: shareholder.ownershipPercentage ? parseFloat(shareholder.ownershipPercentage) : null,
            shareCount: shareholder.shareCount ? parseInt(shareholder.shareCount) : null,
            boardRepresentative: shareholder.boardRepresentative || null,
            registrationDate: shareholder.registrationDate ? new Date(shareholder.registrationDate) : null,
            lastUpdateDate: shareholder.lastUpdateDate ? new Date(shareholder.lastUpdateDate) : null,
          },
        });
      })
    );

    return NextResponse.json({
      message: 'Shareholders saved successfully',
      count: createdShareholders.length,
    });
  } catch (error) {
    console.error('Error saving shareholders:', error);
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

