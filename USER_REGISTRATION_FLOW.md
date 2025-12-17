# User Registration Flow Documentation

## Overview

The user registration process in this application follows a **multi-step authentication and registration pattern** using:
1. **Phone OTP verification** (via Twilio)
2. **User account creation** (after OTP verification)
3. **Profile completion** (name, DOB, gender, email, password)

---

## Phase 1: Phone OTP Request

### Endpoint
```
POST /api/auth/request-otp
```

### Request Payload
```json
{
  "phone": "+919830069363"
}
```

### Request Flow

1. **Frontend** sends phone number to backend
2. **authController.requestPhoneOtp** receives the request
3. **authService.requestPhoneOtp** validates the phone format:
   - Must start with `+` (country code required)
   - Example: `+919830069363` (valid), `9830069363` (invalid)
4. **Twilio OTP Service** sends SMS with OTP code to the phone
5. **Backend** logs the action and returns success message

### Response (Success)
```json
{
  "message": "OTP sent successfully."
}
```

### Response (Error)
```json
{
  "error": "Phone number must include country code, e.g., +919830069363"
}
```

### Code Reference
- **Controller**: `Backend/controllers/authController.js` → `requestPhoneOtp()`
- **Service**: `Backend/services/authService.js` → `requestPhoneOtp(phone)`
- **Twilio Util**: `Backend/utils/twilioOtp.js` → `sendOtp(phone)`

---

## Phase 2: Phone OTP Verification & User Creation

### Endpoint
```
POST /api/auth/verify-otp
```

### Request Payload
```json
{
  "phone": "+919830069363",
  "code": "123456"
}
```

### Request Flow

1. **Frontend** sends phone and OTP code
2. **authController.verifyPhoneOtp** processes the request
3. **authService.verifyPhoneOtp** performs the following:

#### Step 1: Validate Input
- Check if phone and code are provided
- Throw error if missing

#### Step 2: Verify OTP with Twilio
- Call `twilioOtp.verifyOtp(phone, code)`
- Check if status is `'approved'`
- If not approved, throw error: "Invalid or expired OTP."

#### Step 3: Check if User Exists
```javascript
const user = await prisma.user.findUnique({ where: { phone } });
```

#### Step 4: Handle Two Cases

**Case A: New User (doesn't exist)**
- Generate custom user ID: `LIN001`, `LIN002`, etc.
- Create new user record with:
  - `customUserId`: Generated ID (e.g., `LIN001`)
  - `phone`: Verified phone number
  - `phoneVerified`: `true`
  - `phoneVerifiedAt`: Current timestamp
  - `role`: `'CUSTOMER'`
  - `verificationStatus`: `'PENDING'`

**Case B: Existing User (not verified)**
- Update user with:
  - `phoneVerified`: `true`
  - `phoneVerifiedAt`: Current timestamp

**Case C: Existing User (already verified)**
- No update needed, proceed to token generation

#### Step 5: Generate JWT Token
- Create JWT token using `generateToken(user)`
- Token includes: `id`, `phone`, `role`, `verificationStatus`

### Response (Success)
```json
{
  "message": "Phone verified successfully.",
  "user": {
    "id": "LIN001",
    "phone": "+919830069363",
    "role": "CUSTOMER",
    "verificationStatus": "PENDING"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Error)
```json
{
  "error": "Invalid or expired OTP."
}
```

### Key Points
- **Phone verification = Account creation** (happens in one step)
- **Custom User ID**: Format is `LIN` + padded number (e.g., `LIN001`, `LIN123`)
- **JWT Token**: Sent to client; used for subsequent authenticated requests
- **Verification Status**: Starts as `PENDING` (completed after profile registration)

### Code Reference
- **Controller**: `Backend/controllers/authController.js` → `verifyPhoneOtp(phone, code)`
- **Service**: `Backend/services/authService.js` → `verifyPhoneOtp(phone, code)`
- **Twilio Util**: `Backend/utils/twilioOtp.js` → `verifyOtp(phone, code)`
- **JWT Util**: `Backend/utils/jwt.js` → `generateToken(user)`

---

## Phase 3: Profile Registration (Complete User Details)

### Endpoint
```
POST /api/users/register
```

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```
*Note: This is a **protected route** — requires valid JWT from Phase 2*

### Request Payload
```json
{
  "name": "John Doe",
  "dob": "1990-05-15",
  "gender": "MALE",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

### Request Flow

1. **Frontend** sends profile details with JWT token in header
2. **authMiddleware** validates JWT and extracts `userId`
3. **userController.registerUser** receives authenticated request
4. **userService.registerUser** processes registration:

#### Step 1: Fetch User by ID
```javascript
const user = await prisma.user.findUnique({ where: { id: userId } });
```

#### Step 2: Verify Phone is Already Verified
- Check: `if (!user.phoneVerified)`
- If not verified, throw error: "Phone must be verified before registration."

#### Step 3: Validate Required Fields
- Required fields: `name`, `dob`, `gender`, `password`
- All fields must be provided
- If any missing, throw error

#### Step 4: Validate Email Uniqueness (if provided)
```javascript
if (email && email !== user.email) {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) throw BadRequestError('Email already registered.');
}
```

#### Step 5: Hash Password
```javascript
password: await hashPassword(password)
```
- Password is **never** stored in plain text
- Uses bcrypt hashing algorithm
- Hash stored in database

#### Step 6: Update User in Database
```javascript
const updatedUser = await prisma.user.update({
  where: { id: user.id },
  data: {
    name,
    dob: new Date(dob),
    gender: gender.toUpperCase(),
    email,
    password: hashedPassword
  }
});
```

#### Step 7: Return Success Response
- User record now has complete profile
- `verificationStatus` remains as `'PENDING'` until KYC is completed

### Response (Success)
```json
{
  "message": "Registration completed successfully.",
  "user": {
    "id": "LIN001",
    "phone": "+919830069363",
    "name": "John Doe",
    "email": "john@example.com",
    "dob": "1990-05-15T00:00:00.000Z",
    "gender": "MALE"
  }
}
```

### Response (Error Examples)

**Phone Not Verified**
```json
{
  "error": "Phone must be verified before registration."
}
```

**Missing Required Fields**
```json
{
  "error": "name, dob, gender & password are required."
}
```

**Email Already Exists**
```json
{
  "error": "Email already registered."
}
```

### Code Reference
- **Controller**: `Backend/controllers/userController.js` → `registerUser(req, res)`
- **Service**: `Backend/services/userServices.js` → `registerUser(userId, data)`
- **Middleware**: `Backend/middleware/authMiddleware.js` (validates JWT)
- **Hash Util**: `Backend/utils/hash.js` → `hashPassword(password)`

---

## Complete Registration Sequence Diagram

```
┌─────────────┐                    ┌──────────────────┐              ┌─────────────────┐
│   Frontend  │                    │  Backend API     │              │  Twilio / DB    │
└──────┬──────┘                    └────────┬─────────┘              └────────┬────────┘
       │                                    │                                 │
       │  1. POST /auth/request-otp        │                                 │
       │────────────────────────────────>  │                                 │
       │     { phone }                      │                                 │
       │                                    │  2. Send OTP via Twilio        │
       │                                    │─────────────────────────────>  │
       │                                    │                    3. SMS sent │
       │                                    │  <─────────────────────────────│
       │  4. Response: OTP Sent             │                                 │
       │  <────────────────────────────────│                                 │
       │                                    │                                 │
       │ (User enters OTP from SMS)         │                                 │
       │                                    │                                 │
       │  5. POST /auth/verify-otp         │                                 │
       │────────────────────────────────>  │                                 │
       │     { phone, code }                │                                 │
       │                                    │  6. Verify OTP                 │
       │                                    │─────────────────────────────>  │
       │                                    │             7. OTP approved    │
       │                                    │  <─────────────────────────────│
       │                                    │                                 │
       │                                    │  8. Create User (if new)        │
       │                                    │     Or Update verification      │
       │                                    │─────────────────────────────>  │
       │                                    │         User created/updated   │
       │                                    │  <─────────────────────────────│
       │                                    │                                 │
       │  9. Response: JWT Token + User    │                                 │
       │  <────────────────────────────────│                                 │
       │     { token, user }                │                                 │
       │                                    │                                 │
       │ (Store JWT in localStorage)        │                                 │
       │                                    │                                 │
       │  10. POST /users/register         │                                 │
       │  Auth: Bearer <JWT>              │                                 │
       │────────────────────────────────>  │                                 │
       │  { name, dob, gender, email, pw } │                                 │
       │                                    │  11. Validate JWT              │
       │                                    │      Hash password             │
       │                                    │      Update user profile       │
       │                                    │─────────────────────────────>  │
       │                                    │       User profile updated     │
       │                                    │  <─────────────────────────────│
       │                                    │                                 │
       │  12. Response: Registration OK    │                                 │
       │  <────────────────────────────────│                                 │
       │     { message, user }              │                                 │
       │                                    │                                 │
```

---

## Database Schema

### User Table (Prisma Schema)

```prisma
model User {
  id                    Int                   @id @default(autoincrement())
  customUserId          String                @unique  // e.g., "LIN001"
  phone                 String                @unique
  phoneVerified         Boolean               @default(false)
  phoneVerifiedAt       DateTime?
  email                 String?               @unique
  name                  String?
  password              String?               // bcrypt hashed
  gender                String?               // MALE, FEMALE, OTHER
  dob                   DateTime?
  role                  String                @default("CUSTOMER")  // CUSTOMER, ADMIN
  verificationStatus    String                @default("PENDING")   // PENDING, VERIFIED, REJECTED
  
  // Relations
  aadhaarVerification   AadhaarVerification?
  panVerification       PanVerification?
  employmentDetail      EmploymentDetail?
  addressDetail         AddressDetail?
  otpVerification       OtpVerification[]
  userDocuments         UserDocument[]
  userLocation          UserLocation[]
  loanApplications      LoanApplication[]
  loans                 Loan[]
  
  createdAt             DateTime              @default(now())
  updatedAt             DateTime              @updatedAt
}
```

---

## Error Handling & Edge Cases

### Edge Case 1: Existing User, Phone Not Verified Yet
- **Scenario**: User previously registered phone but never verified OTP
- **Solution**: Update existing user record with `phoneVerified = true`
- **Result**: User can proceed to Phase 3 (profile registration)

### Edge Case 2: User Tries to Register with Already Registered Email
- **Scenario**: Email already exists in database for another user
- **Solution**: Validation fails, throw error: "Email already registered."
- **Result**: User must use a different email

### Edge Case 3: OTP Expired
- **Scenario**: User enters correct OTP but it has expired (> 10 min typically)
- **Solution**: Twilio returns status `!== 'approved'`
- **Result**: Error: "Invalid or expired OTP." User must request new OTP

### Edge Case 4: User Attempts Profile Registration Without Phone Verification
- **Scenario**: User skips Phase 2 and tries to register profile directly
- **Solution**: Auth middleware requires valid JWT (which is only issued after phone verification)
- **Result**: Error: "Phone must be verified before registration."

### Edge Case 5: Invalid Phone Number Format
- **Scenario**: User submits phone without country code (e.g., `9830069363`)
- **Solution**: Service validates format and requires `+` prefix
- **Result**: Error: "Phone number must include country code, e.g., +919830069363"

---

## Security Considerations

### 1. Password Security
- **Hashing**: Passwords are bcrypt hashed before storage
- **No Plain Text**: Never stored or logged in plain text
- **Comparison**: During login, input password is hashed and compared with stored hash

### 2. JWT Token Security
- **Secret Key**: Signed with `JWT_SECRET` environment variable
- **Expiration**: Token has configurable expiration time
- **Validation**: Checked on every protected route via `authMiddleware`

### 3. Phone Verification
- **OTP Verification**: Handled by Twilio (production) or test mode
- **Test Phone**: Optional `TEST_PHONE_NUMBER` env var for testing
- **Phone Uniqueness**: Enforced at database level

### 4. Email Uniqueness
- **Database Constraint**: Email is unique in `User` table
- **Validation**: Checked before creating/updating user record

### 5. PII Protection
- **Phone**: Verified before storage
- **Email**: Optional, validated if provided
- **DOB & Gender**: Only collected after phone verification
- **Password**: Hashed and never transmitted over HTTP (use HTTPS in production)

---

## Integration Points

### Frontend Integration

```javascript
// Step 1: Request OTP
const requestOtp = async (phone) => {
  const response = await fetch('/api/auth/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};

// Step 2: Verify OTP
const verifyOtp = async (phone, code) => {
  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code })
  });
  const data = response.json();
  // Store token
  localStorage.setItem('jwt_token', data.token);
  return data;
};

// Step 3: Complete Registration
const completeRegistration = async (formData) => {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
    body: JSON.stringify(formData)
  });
  return response.json();
};
```

### Backend Routes

```javascript
// authRoutes.js
router.post('/request-otp', authController.requestPhoneOtp);
router.post('/verify-otp', authController.verifyPhoneOtp);

// userRoutes.js
router.post('/register', authenticate, userController.registerUser);
```

---

## Testing the Flow

### Manual Testing Steps

1. **Request OTP**
   ```bash
   curl -X POST http://localhost:5000/api/auth/request-otp \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919830069363"}'
   ```

2. **Verify OTP** (use code from SMS or test config)
   ```bash
   curl -X POST http://localhost:5000/api/auth/verify-otp \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919830069363", "code": "123456"}'
   ```

3. **Complete Registration** (use JWT from step 2)
   ```bash
   curl -X POST http://localhost:5000/api/users/register \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <JWT_TOKEN>" \
     -d '{
       "name": "John Doe",
       "dob": "1990-05-15",
       "gender": "MALE",
       "email": "john@example.com",
       "password": "SecurePassword123"
     }'
   ```

---

## Next Steps After Registration

After successful profile registration (Phase 3), users can proceed to:

1. **KYC Verification** (`POST /api/kyc/upload`)
   - Aadhaar verification
   - PAN card verification
   - Address verification

2. **Document Upload** (`POST /api/documents/upload`)
   - Selfie upload
   - Document uploads for loan application

3. **Loan Application** (`POST /api/loan/apply`)
   - Submit loan application with required documents and KYC info

4. **Profile Completion** (`GET /api/users/me`)
   - Fetch complete profile with all KYC and verification details

---

## Summary

| Phase | Endpoint | Method | JWT Required | Purpose |
|-------|----------|--------|--------------|---------|
| 1 | `/api/auth/request-otp` | POST | No | Request OTP via SMS |
| 2 | `/api/auth/verify-otp` | POST | No | Verify OTP & create user |
| 3 | `/api/users/register` | POST | **Yes** | Complete profile registration |

**Key Takeaway**: Registration is a **three-phase process** where phone verification (Phases 1-2) happens before profile completion (Phase 3), ensuring secure and validated user accounts.
