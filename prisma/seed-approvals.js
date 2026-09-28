/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting approvals data import...');

  // Read the JSON file
  const jsonPath = path.join(__dirname, '../public/data/brokerage-approvals.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    throw new Error('Invalid JSON structure. Expected { data: [...] }');
  }

  const approvals = jsonData.data;
  console.log(`Found ${approvals.length} approvals to import.`);

  // Get all brokerages from database to create a lookup map
  const brokerages = await prisma.brokerage.findMany({
    select: {
      id: true,
      nationalId: true,
      seoRegistrationNumber: true,
    },
  });

  // Create lookup map by nationalId
  const brokerageMap = new Map();
  brokerages.forEach((b) => {
    if (b.nationalId) {
      brokerageMap.set(b.nationalId, b.id);
    }
  });

  // Also create lookup from brokerages JSON to get NationalId -> external Id mapping
  const brokeragesJsonPath = path.join(__dirname, '../public/data/brokerages.json');
  const brokeragesJsonData = JSON.parse(fs.readFileSync(brokeragesJsonPath, 'utf8'));
  const externalIdToNationalId = new Map();
  if (brokeragesJsonData.data && Array.isArray(brokeragesJsonData.data)) {
    brokeragesJsonData.data.forEach((b) => {
      if (b.NationalId && b.Id) {
        externalIdToNationalId.set(b.Id.toString(), b.NationalId);
      }
    });
  }

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  await prisma.$transaction(
    async (tx) => {
      for (const item of approvals) {
        try {
          // Find brokerage by matching instituteId to NationalId, then to database UUID
          const nationalId = externalIdToNationalId.get(item.instituteId?.toString());
          if (!nationalId) {
            skippedCount++;
            continue;
          }

          const brokerageId = brokerageMap.get(nationalId);
          if (!brokerageId) {
            console.warn(`Skipping approval - brokerage not found for NationalId: ${nationalId}`);
            skippedCount++;
            continue;
          }

          // Map the data
          const approvalData = {
            brokerageId,
            technicalApprovalId: item.TechnicalApprovalId || null,
            technicalApprovalName: item.TechnicalApprovalIdName || null,
            featureId: item.FeatureId || null,
            featureName: item.FeatureName || null,
            contractorId: item.ContractorId || null,
            contractorName: item.ContractorName || null,
            approvalNum: item.ApprovalNum || null,
            approvalDate: item.ApprovalDate || null,
            versionNum: item.VersionNum || null,
            statusId: item.StatusId || null,
            statusName: item.StatusName || null,
            description: item.Description || null,
            validityDate: item.ValidityDate || null,
            isExpired: item.IsExpired || false,
            externalId: item.Id || null,
          };

          // Use upsert to avoid duplicates based on externalId and brokerageId
          if (item.Id) {
            // Check if record exists
            const existing = await tx.brokerageApproval.findFirst({
              where: {
                brokerageId,
                externalId: item.Id,
              },
            });

            if (existing) {
              await tx.brokerageApproval.update({
                where: { id: existing.id },
                data: approvalData,
              });
            } else {
              await tx.brokerageApproval.create({
                data: approvalData,
              });
            }
          } else {
            await tx.brokerageApproval.create({
              data: approvalData,
            });
          }

          successCount++;
        } catch (error) {
          console.error(
            `Error importing approval (Id: ${item.Id}):`,
            error.message,
          );
          errorCount++;
        }
      }
    },
    {
      timeout: 300000, // 5 minutes timeout
    },
  );

  console.log('\n=== Import Summary ===');
  console.log(`Successfully imported: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Total processed: ${approvals.length}`);
  console.log('Approvals data import completed!');
}

main()
  .catch((e) => {
    console.error('Error during approvals import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

