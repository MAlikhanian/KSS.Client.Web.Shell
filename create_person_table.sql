-- Create database (if needed, uncomment and adjust)
CREATE DATABASE kss_person_write;

-- Create Person table (using default public schema)
CREATE TABLE IF NOT EXISTS "Person" (
    "Id" INTEGER NOT NULL PRIMARY KEY,
    "NationalCode" VARCHAR(255),
    "FirstNameFA" VARCHAR(255),
    "LastNameFA" VARCHAR(255),
    "FirstNameEN" VARCHAR(255),
    "LastNameEN" VARCHAR(255),
    "FatherFirstNameFA" VARCHAR(255),
    "FatherFirstNameEN" VARCHAR(255),
    "BirthGDate" TIMESTAMP NOT NULL,
    "BirthCertificateNumber" VARCHAR(255),
    "BirthCertificateSerialPartA" VARCHAR(255),
    "BirthCertificateSerialPartBId" SMALLINT NOT NULL,
    "BirthCertificateSerialPartC" VARCHAR(255),
    "BirthplaceCityId" SMALLINT NOT NULL,
    "BirthCertificateRegistrationCityId" SMALLINT NOT NULL,
    "Male" BOOLEAN NOT NULL,
    "Married" BOOLEAN NOT NULL,
    "CountryId" SMALLINT NOT NULL,
    "ReligionId" SMALLINT NOT NULL,
    "PssportNumber" VARCHAR(255),
    "MobileNumber" VARCHAR(255),
    "PhoneNumber" VARCHAR(255),
    "PostalCode" VARCHAR(255),
    "Address" TEXT,
    "MilitaryServiceStatusId" SMALLINT NOT NULL,
    "InsuranceTypeId" SMALLINT NOT NULL,
    "InsuranceNumber" VARCHAR(255),
    "EmailAddress" VARCHAR(255),
    "ExtensionNumber" VARCHAR(255),
    "CompanyEmail" VARCHAR(255),
    "PersonalCode" INTEGER,
    "NetworkName" VARCHAR(255),
    "ATT_Id" INTEGER,
    "CompanyId" SMALLINT,
    "DepartmentId" SMALLINT,
    "LocationId" SMALLINT,
    "DomainId" SMALLINT,
    "NeedATT" BOOLEAN,
    "Active" BOOLEAN NOT NULL,
    "StatusId" SMALLINT NOT NULL
);

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_person_national_code ON "Person"("NationalCode");
CREATE INDEX IF NOT EXISTS idx_person_mobile_number ON "Person"("MobileNumber");
CREATE INDEX IF NOT EXISTS idx_person_email ON "Person"("EmailAddress");
CREATE INDEX IF NOT EXISTS idx_person_personal_code ON "Person"("PersonalCode");
CREATE INDEX IF NOT EXISTS idx_person_active ON "Person"("Active");
CREATE INDEX IF NOT EXISTS idx_person_company_id ON "Person"("CompanyId");
CREATE INDEX IF NOT EXISTS idx_person_department_id ON "Person"("DepartmentId");

-- Add comments to table and columns for documentation
COMMENT ON TABLE "Person" IS 'Person entity table';
COMMENT ON COLUMN "Person"."Id" IS 'Primary key identifier';
COMMENT ON COLUMN "Person"."NationalCode" IS 'National identification code';
COMMENT ON COLUMN "Person"."BirthGDate" IS 'Birth date in Gregorian calendar';
COMMENT ON COLUMN "Person"."PersonalCode" IS 'Personal/Employee code';

