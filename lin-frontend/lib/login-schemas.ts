import { z } from "zod"

// Login step 1: Phone and DOB
export const loginStep1Schema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
    dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const parsedDate = new Date(date.split('/').reverse().join('-'))
      const today = new Date()
      const age = today.getFullYear() - parsedDate.getFullYear()
      return age >= 18 && age <= 65
    }, "Age must be between 18 and 65 years"),
})

// Login step 2: OTP verification
export const loginOtpSchema = z.object({
  otp: z.string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers")
})

export type LoginStep1Form = z.infer<typeof loginStep1Schema>
export type LoginOtpForm = z.infer<typeof loginOtpSchema>