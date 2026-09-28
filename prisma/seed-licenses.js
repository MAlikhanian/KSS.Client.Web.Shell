/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting licenses data import...');

  // Read the JSON file
  const jsonPath = path.join(__dirname, '../public/data/brokerage-licenses.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (!jsonData.data || !Array.isArray(jsonData.data)) {
    throw new Error('Invalid JSON structure. Expected { data: [...] }');
  }

  const licenses = jsonData.data;
  console.log(`Found ${licenses.length} licenses to import.`);

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
      for (const item of licenses) {
        try {
          // Find brokerage by matching instituteId to NationalId, then to database UUID
          const nationalId = externalIdToNationalId.get(item.instituteId?.toString());
          if (!nationalId) {
            skippedCount++;
            continue;
          }

          const brokerageId = brokerageMap.get(nationalId);
          if (!brokerageId) {
            console.warn(`Skipping license - brokerage not found for NationalId: ${nationalId}`);
            skippedCount++;
            continue;
          }

          // Map the data
          const licenseData = {
            brokerageId,
            licenseTypeId: item.LicenseTypeId || null,
            licenseType: item.LicenseType || null,
            newLicenseTypeId: item.NewLicenseTypeId || null,
            licenseNo: item.LicenseNo || null,
            licenseStatusId: item.LicenseStatusId || null,
            licenseStatus: item.LicenseStatus || null,
            licenseStatusDescription: item.LicenseStatusDescription || null,
            startDate: item.StartDate || null,
            expireDate: item.ExpireDate || null,
            isExpired: item.IsExpired || false,
            trusteeId: item.TrusteeID || null,
            trusteeContractStart: item.TrusteeContractStart || null,
            trusteeContractExpire: item.TrusteeContractExpire || null,
            industryCategory: item.IndustryCategory || null,
            signInIndustry: item.SignInIndustry || null,
            externalId: item.Id || null,
          };

          // Use upsert to avoid duplicates based on externalId and brokerageId
          if (item.Id) {
            // Check if record exists
            const existing = await tx.brokerageLicense.findFirst({
              where: {
                brokerageId,
                externalId: item.Id,
              },
            });

            if (existing) {
              await tx.brokerageLicense.update({
                where: { id: existing.id },
                data: licenseData,
              });
            } else {
              await tx.brokerageLicense.create({
                data: licenseData,
              });
            }
          } else {
            await tx.brokerageLicense.create({
              data: licenseData,
            });
          }

          successCount++;
        } catch (error) {
          console.error(
            `Error importing license (Id: ${item.Id}):`,
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
  console.log(`Total processed: ${licenses.length}`);
  console.log('Licenses data import completed!');
}

main()
  .catch((e) => {
    console.error('Error during licenses import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

