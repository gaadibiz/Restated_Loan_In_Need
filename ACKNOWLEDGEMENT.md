# Acknowledgement — Data & Asset Inventory

This document inventories the files, folders, database schema (Prisma models), and environment variables referenced by the codebase at d:\Project\copy\SecondCopy\LoanInNeed. It is written for a third-party reviewer. Sensitive secret values are NOT included — only variable names and locations where secrets exist are recorded. If you require secrets to be shared, follow secure channels and rotate keys after sharing.

---

## Summary (high level)
- Project root: d:\Project\copy\SecondCopy\LoanInNeed
- Main parts:
  - `Backend/` — Node.js/Express backend, Prisma ORM, controllers, services, models, tests, deployment docs.
  - `lin-frontend/` — Next.js frontend with public assets and a small config referencing public envs.
  - `prisma/` (inside `Backend/`) — Prisma schema and migrations describing DB tables.
  - `uploads/`, `temp/`, and `logs/` (project-level directories) — used for transient data or logs (may contain PII or file uploads).

Note: I did not read or disclose secret values present in any `.env` file. This inventory lists files and the *names* of environment variables referenced by the code only.

---

## Files and folders of interest (purpose)
- `Backend/` — backend source code:
  - `controllers/` — request handlers exposing REST API endpoints (auth, user, kyc, documents, loan flows).
  - `services/` — business logic (document upload, OTP, selfie handling, supabase interactions, Twilio OTP, email, etc.).
  - `models/` — Prisma-based data access wrappers (User, Aadhaar, PAN, documents, otp, loan, locations, employment, etc.).
  - `prisma/` — `schema.prisma` and migration SQL files (defines database tables and columns).
  - `routes/` — route definitions mapping endpoints to controllers.
  - `middleware/` — auth and request logging middleware.
  - `__tests__/` — unit/integration tests (contain test helpers and references to environment variables used for tests).
  - `DEPLOYMENT.md`, `README.md` and other docs describing deployment and env setup.
  - `package.json` / `package-lock.json` — server dependencies (includes @supabase, prisma, twilio etc.).
  - `Backend/.env` — environment file (present in the repository at the path listed). It contains secret keys and service credentials (see Environment variables below). **Do not store secrets in VCS**.

- `lin-frontend/` — frontend (Next.js):
  - `lib/config.ts` — reads public env vars (`NEXT_PUBLIC_*`) for Supabase and API URLs.
  - `public/` — static assets.

- Root-level:
  - `uploads/`, `temp/` — temporary or uploaded files (may contain user-uploaded documents if used locally).
  - `logs/` — application logs (may include error messages, request traces, and potentially PII if logged).
  - `reports/`, `jest-html-reporters-attach/` — test and coverage reports.

---

## Database schema (Prisma models) — tables and key fields
The database provider is PostgreSQL (Prisma datasource). The `Backend/prisma/schema.prisma` file defines the following models (tables) and their notable fields:

- User
  - id (Int)
  - customUserId (String, optional, unique)
  - name (String?)
  - email (String?, unique)
  - phone (String, unique)
  - password (String?) — hashed password expected
  - phoneVerified (Boolean), phoneVerifiedAt (DateTime?)
  - dob (DateTime?), gender
  - role, verificationStatus
  - relations: aadhaarVerification, panVerification, employment, address, otps, loans, loanApplications, documents, locations, status
  - PII: phone, email, name, dob, gender, password (sensitive)

- AadhaarVerification
  - aadhaarNumber (String, unique)
  - verified (Boolean), verifiedAt (DateTime?)
  - userId -> relation to User
  - PII: aadhaarNumber (sensitive)

- PanVerification
  - panNumber (String, unique)
  - verified (Boolean), verifiedAt
  - userId -> relation to User
  - PII: panNumber (sensitive)

- EmploymentDetail
  - employmentType, employerName, companyAddress, monthlyIncome, stability
  - userId -> relation to User

- AddressDetail
  - currentAddress, permanentAddress, city, state, postalCode, etc.
  - userId -> relation to User
  - PII: addresses (sensitive)

- OtpVerification
  - otpCode (String), expiresAt (DateTime), verified (Boolean), userId
  - PII/sensitive: OTP codes (should be short-lived)

- Loan
  - loanAmount (Float), purposeOfLoan, interestRate, termMonths, startDate, status
  - userId -> relation to User
  - Contains loan financial information (sensitive/business data)

- LoanApplication
  - loanType, loanAmount, otpVerified, status, userId, employmentDetail relation

- UserDocument
  - docType (DocumentType enum), filePath (Supabase path), fileUrl, fileName, mimeType, size, checksum, status, verified, verifiedBy, verifiedAt, notes, uploadedAt
  - Stores references to uploaded user documents (Aadhaar, PAN scans, pay slips, bank statements, photos, signatures). These are PII / identity documents and must be handled securely.

- UserLocation
  - latitude, longitude, accuracy, locality, city, state, country, postalCode, placeName, capturedAt
  - Sensitive: precise location data (PII/geo-location)

- UserDocumentStatus
  - userId (unique), status (PENDING_UPLOAD | SUBMITTED | VERIFIED | REJECTED), latitude, longitude, updatedAt

- ENUMS of note: VerificationStatus, UserRole, Gender, JobStability, AddressType, LoanStatus, EmploymentType, LoanType, DocumentType, DocumentUploadStatus

---

## Environment variables referenced (names only — no secret values)
The codebase references the following environment variable names (this is a non-exhaustive but comprehensive list collected from source files and config):

- DATABASE_URL (Prisma DB connection string)
- JWT_SECRET
- JWT_EXPIRES_IN
- BACKEND_URL
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY
- SUPABASE_BUCKET
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_SERVICE_SID
- LOG_LEVEL
- LOKI_URL
- APP_NAME
- ELASTICSEARCH_NODE
- ELASTICSEARCH_AUTH
- CLOUDWATCH_GROUP
- CLOUDWATCH_STREAM
- AWS_REGION
- NODE_ENV
- Various provider-related envs (e.g., SMTP/EMAIL/SENDGRID etc. may be present in docs or expected by deployment guides)

Where found (examples):
- `Backend/prisma/schema.prisma` references `env("DATABASE_URL")`.
- `Backend/services/*` and `Backend/utils/*` reference `SUPABASE_*`, `TWILIO_*`, and `JWT_SECRET`.
- `lin-frontend/lib/config.ts` references `NEXT_PUBLIC_*` env variables which are safe to expose on the client (these are public/anonymous keys for Supabase and public API URLs).
- `Backend/.env` file (present in repo) contains many of the service keys (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, SUPABASE_BUCKET). **These are secrets and should not be committed.**

Important: I intentionally DO NOT disclose the values of any of these environment variables. The repository does contain a `Backend/.env` file with secrets; please remove it from version control and rotate the keys immediately if the repo is public or shared.

---

## Where user/client data is stored or can appear
- Database (Postgres via Prisma): stores PII and KYC information (User, AadhaarVerification, PanVerification, AddressDetail, EmploymentDetail, OTPs, loans, loan applications).
- Supabase Storage (configured by `SUPABASE_BUCKET` and `SUPABASE_*` keys): stores uploaded documents (scans/photos). Code references `process.env.SUPABASE_BUCKET` and uses Supabase client in `Backend/services/documentService.js` and `selfieService.js`.
- Server logs (`logs/`): may contain request traces, errors or debug logs. Avoid logging raw PII or full documents.
- Temporary upload directories (`uploads/`, `temp/`) if used locally; also `lin-frontend/public/` contains static assets (not user PII), but large binary assets were detected in `public/`.
- Test reports and coverage (`reports/`) — may include sample data if tests write fixtures; check tests under `Backend/__tests__`.

---

## Other code-level notes relevant to data handling
- OTP handling: OTP codes are stored in `OtpVerification` table (otpCode, expiresAt) and verified via `otpService` / Twilio integration.
- Document uploads: Documents are stored in Supabase and a `userDocument` record references the file path and URL. The DB stores docType (AADHAAR, PAN, pay slip etc.) and verification status.
- Location capture: `UserLocation` stores latitude/longitude and textual locality/city/state — this is sensitive location data.
- Authentication: JWT (secret via `JWT_SECRET`) is used to sign tokens. If `JWT_SECRET` is leaked, tokens must be re-issued (rotate secret).

---

## Sensitive artifacts discovered in the repository (must be secured/removed)
- `Backend/.env` — contains service credentials (Supabase keys shown in the repo). This file is an immediate risk if the repository is shared.
- Potentially committed build artifacts and `.next/` files in the frontend (these are not secrets but may contain bundled code). Remove `.next/` from VCS and only keep source.
- `logs/` and `uploads/` — may contain PII if not cleaned; do not include these in public repos.

---

## Recommended actions (short, actionable)
1. Remove `Backend/.env` from the repository history (if already committed). At minimum, delete the file, add it to `.gitignore`, and rotate all secrets contained in it immediately (Supabase keys, Twilio credentials, etc.).
2. Add an `.env.example` file listing required environment variable names (without values) and sample formats.
3. Ensure `uploads/`, `logs/`, and other directories that can hold PII are not committed and are listed in `.gitignore`.
4. Review logs for accidental PII leaks and purge/redact as necessary.
5. Restrict access to Supabase / Twilio / other service consoles and rotate keys.
6. If this acknowledgement is delivered to an external third party, include an explicit statement that you will not share any secret or personal data without the data owner's consent and that keys will be rotated before/after sharing.

---

## Closing statement
This inventory describes the codebase structure, the database (Prisma) models (tables and fields), where uploaded documents and location/identity data are persisted, and which environment variables the code expects. No secret values were disclosed here. If you want, I can create a trimmed `Backend/.env.example` listing only variable names and minimal guidance for each variable. I can also prepare a short change guide to remove `Backend/.env` from Git history (instructions to remove sensitive file from history and rotate secrets).

If you want me to proceed with the `Backend/.env` removal steps (prepare git commands and safe rotation checklist), say so and I'll draft the exact commands for your PowerShell environment.
