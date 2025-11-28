import { z } from "zod"

const MAX_5MB = 5 * 1024 * 1024;
const MAX_2MB = 2 * 1024 * 1024;

// Step 1: Phone verification
export const phoneVerificationSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  otp: z.string().optional()
})

// Phone number only schema (for initial submission)
export const phoneNumberSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number")
})

// OTP verification schema
export const otpVerificationSchema = z.object({
  phoneNumber: z.string(),
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

// Step 2: Personal details
export const personalDetailsSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  middleName: z.string().default("").optional(),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsedDate = new Date(date.split('/').reverse().join('-'))
      const today = new Date()
      const age = today.getFullYear() - parsedDate.getFullYear()
      return age >= 18 && age <= 65
    }, "Age must be between 18 and 65 years"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  gender: z.enum(["Male", "Female", "Prefer not to say"])
})

// Step 3: Basic details
export const basicDetailsSchema = z.object({
  // Loan details
  loanAmount: z.number()
    .min(5000, "Minimum loan amount is ₹5,000")
    .max(5000000, "Maximum loan amount is ₹50,00,000"),
  purposeOfLoan: z.string()
    .min(5, "Please describe your loan purpose")
    .max(200, "Purpose description must be less than 200 characters"),

  // Employment details
  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  companyAddress: z.string()
    .min(10, "Company address must be at least 10 characters")
    .max(200, "Company address must be less than 200 characters"),
  monthlyIncome: z.number()
    .min(35000, "Minimum monthly income is ₹35,000")
    .max(1000000, "Maximum monthly income is ₹10,00,000"),
  jobStability: z.enum(["Very unstable", "Somewhat unstable", "Neutral / moderate", "Stable", "Very stable"]),

  // Address details
  currentAddress: z.string()
    .min(10, "Current address must be at least 10 characters")
    .max(200, "Current address must be less than 200 characters"),
  currentAddressType: z.enum(["Owner(Self or Family)", "Rented"]),
  permanentAddress: z.string()
    .min(10, "Permanent address must be at least 10 characters")
    .max(200, "Permanent address must be less than 200 characters"),
  pinCode: z.string()
    .min(6, "Pin code must be 6 digits")
    .max(6, "Pin code must be 6 digits"),
  addressProof: z
    .instanceof(File)
    .refine(file => ["application/pdf"].includes(file.type), "Must be a PDF file")
    .refine(file => file.size <= MAX_5MB, "File size must be ≤ 5MB"),
})

// Step 4: Document verification

export const documentVerificationSchema = z.object({
  payslipFile: z
    .instanceof(File)
    .refine(file => ["application/pdf"].includes(file.type), "Must be a PDF file")
    .refine(file => file.size <= MAX_5MB, "File size must be ≤ 5MB"),

  bankStatementFile: z
    .instanceof(File)
    .refine(file => ["application/pdf"].includes(file.type), "Must be a PDF file")
    .refine(file => file.size <= MAX_5MB, "File size must be ≤ 5MB"),

  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),

  aadhaarNumber: z.string()
    .regex(/^\d{12}$/, "Aadhaar number must be 12 digits"),
});


// Step 5: Aadhaar OTP verification
export const aadhaarOtpSchema = z.object({
  aadhaarOtp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

// Step 6: Upload photo and auto detect location
export const photoAndLocationSchema = z.object({
  photoFile: z
    .instanceof(File)
    .refine(file => file.size <= MAX_2MB, "File size must be ≤ 2MB")
    .refine(file => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      "Only .png/.jpg/.jpeg images allowed"),

  autoDetectLocation: z.boolean(),
  location: z.string().optional(),
})

// Combined schema for all steps
export const signupFormSchema = z.object({
  phoneVerification: phoneVerificationSchema,
  personalDetails: personalDetailsSchema,
  basicDetails: basicDetailsSchema,
  documentVerification: documentVerificationSchema,
  aadhaarOtp: aadhaarOtpSchema,
  photoAndLocationSchema: photoAndLocationSchema
})

export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>
export type PhoneNumberForm = z.infer<typeof phoneNumberSchema>
export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>
export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>
export type BasicDetailsForm = z.infer<typeof basicDetailsSchema>
export type DocumentVerificationForm = z.infer<typeof documentVerificationSchema>
export type AadhaarOtpForm = z.infer<typeof aadhaarOtpSchema>
export type PhotoLocationForm = z.infer<typeof photoAndLocationSchema>
export type SignupFormData = z.infer<typeof signupFormSchema>
