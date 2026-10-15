import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

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
    const branches = await prisma.brokerageBranch.findMany({
      where: {
        brokerageId: id,
        isTrashed: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map to expected format
    const mappedBranches = branches.map((branch) => ({
      id: branch.id,
      officeType: branch.branchTypeId?.toString() || '',
      officeCount: '1',
      activityType: branch.activityTypeId?.toString() || '',
      officeCountry: '1', // Default to Iran
      officeProvince: branch.provinceId?.toString() || '',
      officeCity: branch.cityId?.toString() || '',
      officeManagerName: branch.ceo || '',
      employeeCount: '',
      officePhone: branch.phone || '',
      officeAddress: branch.address || '',
    }));

    return NextResponse.json(mappedBranches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

