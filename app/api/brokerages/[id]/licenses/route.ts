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
    const licenses = await prisma.brokerageLicense.findMany({
      where: {
        brokerageId: id,
        isTrashed: false,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    // Map to expected format
    const mappedLicenses = licenses.map((license) => ({
      id: license.id,
      nationalId: '', // Not stored in license table
      licenseTypeId: license.licenseTypeId?.toString() || '',
      licenseType: license.licenseType || '',
      newLicenseTypeId: license.newLicenseTypeId?.toString() || '',
      licenseNo: license.licenseNo || '',
      licenseStatusId: license.licenseStatusId?.toString() || '',
      licenseStatus: license.licenseStatus || '',
      licenseStatusDescription: license.licenseStatusDescription || '',
      instituteTypeId: '',
      instituteType: '',
      instituteKindId: '',
      instituteKind: '',
      startDate: license.startDate || '',
      expireDate: license.expireDate || '',
      isExpired: license.isExpired,
      trusteeId: license.trusteeId?.toString() || '',
      trusteeContractStart: license.trusteeContractStart || '',
      trusteeContractExpire: license.trusteeContractExpire || '',
      industryCategory: license.industryCategory || '',
      signInIndustry: license.signInIndustry || '',
    }));

    return NextResponse.json(mappedLicenses);
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

