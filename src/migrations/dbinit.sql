CREATE TYPE "roles" AS ENUM (
  'BUYER',
  'SELLER',
  'HYBRID'
);

CREATE TYPE "invoice_status" AS ENUM (
  'UPLOADED',
  'SENT FOR APPROVAL',
  'APPROVED',
  'FINANCE REQUESTED',
  'FINANCED'
);

CREATE TYPE "party_status" AS ENUM (
  'ONBOARDING',
  'INACTIVE',
  'ACTIVE',
  'BLACKLISTED'
);

CREATE TYPE "program_type" AS ENUM (
  'APPROVED PAYABLE FINANCE',
  'RECEIVABLE FINANCE',
  'DISTRIBUTOR FINANCE'
);

CREATE TYPE "financing_request_type" AS ENUM (
  'AUTOMATIC',
  'ON REQUEST'
);

CREATE TYPE "interest_type" AS ENUM (
  'FIXED',
  'FLOATING'
);

CREATE TABLE "banks" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "city" varchar,
  "country_code" varchar(2),
  "base_currency" varchar(3)
);

CREATE TABLE "parties" (
  "id" bigserial UNIQUE,
  "bank_id" int,
  "customer_id" varchar NOT NULL,
  "account_number" varchar NOT NULL,
  "name" varchar NOT NULL,
  "city" varchar,
  "country_code" varchar(2),
  "base_currency" varchar(3),
  "default_role" roles,
  "customer" boolean,
  "status" party_status DEFAULT 'ONBOARDING',
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "proposal" (
  "id" bigserial UNIQUE,
  "bank_id" int,
  "party_id" bigint,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "program" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "proposal_id" bigint,
  "program_type" program_type NOT NULL,
  "program_currency" varchar(3),
  "program_limit" decimal,
  "program_expiry_date" date,
  "financing_request_type" financing_request_type DEFAULT 'AUTOMATIC',
  "financed_amount" decimal,
  "balance_amount" decimal,
  "grace_period" int,
  "interest_type" interest_type,
  "interest_rate" decimal,
  "margin" decimal,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "parings" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "program_id" bigint,
  "customer_id" bigint,
  "counterparty_id" bigint,
  "max_finance_percentage" decimal,
  "max_invoice_age_for_funding" int,
  "max_age_for_repayment" int,
  "minimum_period" int,
  "maximum_period" int,
  "minimum_amount_currency" varchar(3),
  "minimum_amount" decimal,
  "maximum_amount" decimal,
  "financed_amount" decimal,
  "balance_amount" decimal,
  "grace_period" int,
  "interest_type" interest_type,
  "interest_rate" decimal,
  "margin" decimal,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "users" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "party_id" bigint,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "phone" varchar UNIQUE NOT NULL,
  "display_name" varchar,
  "entitlement" int,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "entitlements" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "entitlement_desc" varchar,
  "payable" boolean,
  "receivable" boolean,
  "upload_invoice" boolean,
  "approve_invoice" boolean,
  "approve_invoice_limit" decimal,
  "request_finance" boolean,
  "request_finance_limit" decimal,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "countries" (
  "id" varchar(2) PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "currencies" (
  "id" varchar(3) PRIMARY KEY,
  "iso" int UNIQUE,
  "description" varchar NOT NULL
);

CREATE TABLE "products" (
  "id" varchar(5) PRIMARY KEY,
  "description" varchar NOT NULL
);

CREATE TABLE "funding_requests" (
  "id" bigserial UNIQUE,
  "program_id" bigint,
  "bank_id" bigint,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "funding_request_invoices" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "funding_request_id" bigint,
  "invoice_id" bigint,
  PRIMARY KEY ("id", "bank_id")
);

CREATE TABLE "invoices" (
  "id" bigserial UNIQUE,
  "bank_id" bigint,
  "invoice_no" varchar NOT NULL,
  "issue_date" date NOT NULL,
  "due_date" date NOT NULL,
  "buyer_id" bigint,
  "seller_id" bigint,
  "currency" varchar(3),
  "amount" decimal NOT NULL,
  "financing_request_type" financing_request_type,
  "status" invoice_status DEFAULT 'UPLOADED',
  PRIMARY KEY ("id", "bank_id")
);

ALTER TABLE "parties" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "proposal" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "proposal" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "program" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "program" ADD FOREIGN KEY ("proposal_id") REFERENCES "proposal" ("id");

ALTER TABLE "parings" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "parings" ADD FOREIGN KEY ("program_id") REFERENCES "program" ("id");

ALTER TABLE "parings" ADD FOREIGN KEY ("customer_id") REFERENCES "parties" ("id");

ALTER TABLE "parings" ADD FOREIGN KEY ("counterparty_id") REFERENCES "parties" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("entitlement") REFERENCES "entitlements" ("id");

ALTER TABLE "entitlements" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "funding_requests" ADD FOREIGN KEY ("program_id") REFERENCES "program" ("id");

ALTER TABLE "funding_requests" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "funding_request_invoices" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "funding_request_invoices" ADD FOREIGN KEY ("funding_request_id") REFERENCES "funding_requests" ("id");

ALTER TABLE "funding_request_invoices" ADD FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("bank_id") REFERENCES "banks" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("buyer_id") REFERENCES "parties" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("seller_id") REFERENCES "parties" ("id");


COMMENT ON COLUMN "invoices"."financing_request_type" IS 'default from program';
