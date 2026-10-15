/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

/**
 * Maps JSON status and InstituteKind to BrokerageStatus enum
 */
function mapStatus(status, instituteKind) {
  // If Status is false, set to INACTIVE
  if (status === false) {
    return 'INACTIVE';
  }

  // Check InstituteKind for suspended/cancelled status
  if (instituteKind) {
    const kind = instituteKind.toLowerCase();
    if (kind.includes('لغو') || kind.includes('تعلیق')) {
      return 'SUSPENDED';
    }
  }

  // Default to ACTIVE if Status is true
  return 'ACTIVE';
}

async function main() {
  console.log('Starting brokerage data import...');

  // Read the JSON file
  const jsonPath = path.join(__dirname, '../public/data/brokerages.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    throw new Error('Invalid JSON structure. Expected { data: [...] }');
  }

  const brokerages = jsonData.data;
  console.log(`Found ${brokerages.length} brokerages to import.`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  await prisma.$transaction(
    async (tx) => {
      for (const item of brokerages) {
        try {
          // Skip if NationalId is missing (required for unique constraint)
          if (!item.NationalId) {
            console.warn(`Skipping brokerage "${item.Name}" - missing NationalId`);
            skippedCount++;
            continue;
          }

          // Map the data
          const brokerageData = {
            companyPersianName: item.Name || '',
            nationalId: item.NationalId,
            seoRegistrationNumber: item.SEORegisterNo
              ? String(item.SEORegisterNo)
              : null,
            website: item.Website || null,
            status: mapStatus(item.Status, item.InstituteKind),
          };

          // Use upsert to avoid duplicates based on nationalId
          await tx.brokerage.upsert({
            where: {
              nationalId: item.NationalId,
            },
            update: {
              // Update existing records with new data
              companyPersianName: brokerageData.companyPersianName,
              seoRegistrationNumber: brokerageData.seoRegistrationNumber,
              website: brokerageData.website,
              status: brokerageData.status,
              updatedAt: new Date(),
            },
            create: brokerageData,
          });

          successCount++;
        } catch (error) {
          console.error(
            `Error importing brokerage "${item.Name}" (NationalId: ${item.NationalId}):`,
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
  console.log(`Total processed: ${brokerages.length}`);
  console.log('Brokerage data import completed!');
}

main()
  .catch((e) => {
    console.error('Error during brokerage import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

