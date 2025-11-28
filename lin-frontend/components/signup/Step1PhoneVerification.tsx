"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { phoneNumberSchema, otpVerificationSchema, type PhoneVerificationForm } from "@/lib/signup-schemas"

interface Step1Props {
  onSubmit: (data: PhoneVerificationForm) => void
  otpSent: boolean
  resendTimer: number
  onResend: () => void
  formData: PhoneVerificationForm
  setFormData: (data: PhoneVerificationForm) => void
  isLoading?: boolean
}

export function Step1PhoneVerification({ 
  onSubmit, 
  otpSent, 
  resendTimer, 
  onResend, 
  formData, 
  setFormData,
  isLoading = false
}: Step1Props) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PhoneVerificationForm>({
    resolver: zodResolver(otpSent ? otpVerificationSchema : phoneNumberSchema),
    defaultValues: formData
  })

  const phoneNumber = watch("phoneNumber")

  const handleFormSubmit = (data: PhoneVerificationForm) => {
    setFormData(data)
    onSubmit(data)
  }

  const handleOtpChange = (value: string) => {
    setValue("otp", value)
    setFormData({ ...formData, otp: value })
  }

  const handleResendClick = () => {
    if (resendTimer > 0) return // Prevent click if timer is running
    onResend()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-6">
        {!otpSent ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter your mobile number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium">
                  +91
                </span>
                <Input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="rounded-l-none h-12 text-base"
                  maxLength={10}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="#" className="text-red-600 hover:underline font-medium">privacy policies</a>{" "}
                and{" "}
                <a href="#" className="text-red-600 hover:underline font-medium">T&C</a>.
                You also authorize us to{" "}
                <a href="#" className="text-red-600 hover:underline font-medium">retrieve your credit report</a>{" "}
                & communicate with you via phone, e-mails, WhatsApp, etc.
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Get OTP'}
            </Button>

            <div className="text-center">
              <a href="/login" className="text-red-600 hover:underline text-sm font-medium">
                Already have an account? Login
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                OTP sent on XXXXXXX{phoneNumber?.slice(-4)}
              </p>
              <div className="text-sm">
                {resendTimer > 0 ? (
                  <p className="text-gray-500">
                    Resend OTP in {resendTimer} sec
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendClick}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter OTP
              </label>
              <InputOTP
                maxLength={6}
                value={formData.otp || ""}
                onChange={handleOtpChange}
                className="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
