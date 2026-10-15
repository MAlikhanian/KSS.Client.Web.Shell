-- CreateEnum
CREATE TYPE "BrokerageStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "Brokerage" (
    "id" TEXT NOT NULL,
    "companyPersianName" TEXT NOT NULL,
    "companyLatinName" TEXT,
    "formerNames" TEXT,
    "registrationDate" TIMESTAMP(3),
    "registrationNumber" TEXT,
    "registrationProvince" TEXT,
    "registrationPlace" TEXT,
    "seoRegistrationDate" TIMESTAMP(3),
    "seoRegistrationNumber" TEXT,
    "employeeCount" INTEGER,
    "nationalId" TEXT,
    "economicCode" TEXT,
    "phoneNumber" TEXT,
    "faxNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "headOfficeAddress" TEXT,
    "postalCode" TEXT,
    "poBox" TEXT,
    "status" "BrokerageStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isTrashed" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT,

    CONSTRAINT "Brokerage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brokerage_nationalId_key" ON "Brokerage"("nationalId");

-- CreateIndex
CREATE INDEX "Brokerage_nationalId_idx" ON "Brokerage"("nationalId");

-- CreateIndex
CREATE INDEX "Brokerage_companyPersianName_idx" ON "Brokerage"("companyPersianName");

-- CreateIndex
CREATE INDEX "Brokerage_status_idx" ON "Brokerage"("status");

-- CreateIndex
CREATE INDEX "Brokerage_createdByUserId_idx" ON "Brokerage"("createdByUserId");

-- CreateIndex
CREATE INDEX "Brokerage_isTrashed_idx" ON "Brokerage"("isTrashed");

