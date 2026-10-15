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
    const approvals = await prisma.brokerageApproval.findMany({
      where: {
        brokerageId: id,
        isTrashed: false,
      },
      orderBy: {
        approvalDate: 'desc',
      },
    });

    // Map to expected format
    const mappedApprovals = approvals.map((approval) => ({
      id: approval.id,
      technicalApprovalId: approval.technicalApprovalId?.toString() || '',
      technicalApprovalIdName: approval.technicalApprovalName || '',
      featureName: approval.featureName || '',
      contractorId: approval.contractorId?.toString() || '',
      contractorName: approval.contractorName || '',
      approvalNum: approval.approvalNum || '',
      approvalDate: approval.approvalDate || '',
      versionNum: approval.versionNum || '',
      statusId: approval.statusId?.toString() || '',
      statusName: approval.statusName || '',
      description: approval.description || '',
      validityDate: approval.validityDate || '',
      isExpired: approval.isExpired,
    }));

    return NextResponse.json(mappedApprovals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return NextResponse.json(
      { message: 'Oops! Something went wrong. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

