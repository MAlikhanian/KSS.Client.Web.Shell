/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting branches data import...');

  // Read the JSON file
  const jsonPath = path.join(__dirname, '../public/data/brokerage-branches.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    throw new Error('Invalid JSON structure. Expected { data: [...] }');
  }

  const branches = jsonData.data;
  console.log(`Found ${branches.length} branches to import.`);

  // Get all brokerages from database to create a lookup map
  const brokerages = await prisma.brokerage.findMany({
    select: {
      id: true,
      nationalId: true,
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
      for (const item of branches) {
        try {
          // Find brokerage by matching instituteId to NationalId, then to database UUID
          const nationalId = externalIdToNationalId.get(item.instituteId?.toString());
          if (!nationalId) {
            skippedCount++;
            continue;
          }

          const brokerageId = brokerageMap.get(nationalId);
          if (!brokerageId) {
            console.warn(`Skipping branch - brokerage not found for NationalId: ${nationalId}`);
            skippedCount++;
            continue;
          }

          // Map the data
          const branchData = {
            brokerageId,
            branchTypeId: item.BranchTypeId || null,
            branchType: item.BranchType || null,
            activityTypeId: item.ActivityTypeId || null,
            activityType: item.ActivityType || null,
            provinceId: item.ProvinceId || null,
            province: item.Province || null,
            cityId: item.CityId || null,
            city: item.City || null,
            postalCode: item.PostalCode || null,
            ceo: item.CEO || null,
            address: item.Address || null,
            phone: item.Phone || null,
            externalId: item.Id || null,
          };

          // Use upsert to avoid duplicates based on externalId and brokerageId
          if (item.Id) {
            // Check if record exists
            const existing = await tx.brokerageBranch.findFirst({
              where: {
                brokerageId,
                externalId: item.Id,
              },
            });

            if (existing) {
              await tx.brokerageBranch.update({
                where: { id: existing.id },
                data: branchData,
              });
            } else {
              await tx.brokerageBranch.create({
                data: branchData,
              });
            }
          } else {
            await tx.brokerageBranch.create({
              data: branchData,
            });
          }

          successCount++;
        } catch (error) {
          console.error(
            `Error importing branch (Id: ${item.Id}):`,
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
  console.log(`Total processed: ${branches.length}`);
  console.log('Branches data import completed!');
}

main()
  .catch((e) => {
    console.error('Error during branches import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

