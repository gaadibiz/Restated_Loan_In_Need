"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { basicDetailsSchema, type BasicDetailsForm } from "@/lib/signup-schemas"
import { FileUpload } from "../ui/file-upload"

interface Step3Props {
  onSubmit: (data: BasicDetailsForm) => void
  onBack?: () => void
  formData: BasicDetailsForm
  setFormData: (data: BasicDetailsForm) => void
}

export function Step3BasicDetails({ onSubmit, onBack, formData, setFormData }: Step3Props) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BasicDetailsForm>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: formData
  })

  const handleFormSubmit = (data: BasicDetailsForm) => {
    setFormData(data)
    onSubmit(data)
  }

  const handleSelectChange = (field: keyof BasicDetailsForm, value: string) => {
    setValue(field, value)
    setFormData({ ...formData, [field]: value })
  }

  const handleNumberChange = (field: keyof BasicDetailsForm, value: string) => {
    const numValue = parseFloat(value) || 0
    setValue(field, numValue)
    setFormData({ ...formData, [field]: numValue })
  }

  const handleFileChange = (field: keyof BasicDetailsForm, file: File | null) => {
    if (file) {
      setValue(field, file as File)
      setFormData({ ...formData, [field]: file })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-red-600 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      <div className="space-y-6">
        {/* Loan details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Loan details</h3>
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan amount <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  type="number"
                  placeholder="Enter loan amount"
                  className="pl-8"
                  {...register("loanAmount", { valueAsNumber: true })}
                  onChange={(e) => handleNumberChange("loanAmount", e.target.value)}
                />
              </div>
              {errors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of loan <span className="text-primary">*</span>
              </label>
              <Select value={formData.purposeOfLoan} onValueChange={(value) => handleSelectChange("purposeOfLoan", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Describe your purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Home Renovation">Home Renovation</SelectItem>
                  <SelectItem value="Debt Consolidation">Debt Consolidation</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.purposeOfLoan && (
                <p className="text-red-500 text-sm mt-1">{errors.purposeOfLoan.message}</p>
              )}
            </div>
          </div></div>

        {/* Employment details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Employment details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company name <span className="text-primary">*</span>
              </label>
              <Input
                {...register("companyName")}
                placeholder="Enter your company name"
                className="w-full"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company address <span className="text-primary">*</span>
              </label>
              <Input
                {...register("companyAddress")}
                placeholder="Enter your company address"
                className="w-full"
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.companyAddress.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  type="number"
                  placeholder="Enter monthly income"
                  className="pl-8"
                  {...register("monthlyIncome", { valueAsNumber: true })}
                  onChange={(e) => handleNumberChange("monthlyIncome", e.target.value)}
                />
              </div>
              {errors.monthlyIncome && (
                <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stability in current job <span className="text-primary">*</span>
              </label>
              <Select value={formData.jobStability} onValueChange={(value) => handleSelectChange("jobStability", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Very unstable">Very unstable</SelectItem>
                  <SelectItem value="Somewhat unstable">Somewhat unstable</SelectItem>
                  <SelectItem value="Neutral / moderate">Neutral / moderate</SelectItem>
                  <SelectItem value="Stable">Stable</SelectItem>
                  <SelectItem value="Very Stable">Very Stable</SelectItem>
                </SelectContent>
              </Select>
              {errors.jobStability && (
                <p className="text-red-500 text-sm mt-1">{errors.jobStability.message}</p>
              )}
            </div>
          </div></div>

        {/* Address details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Address details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current address with landmark <span className="text-primary">*</span>
              </label>
              <Input
                {...register("currentAddress")}
                placeholder="Enter your current address"
                className="w-full"
              />
              {errors.currentAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.currentAddress.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN <span className="text-primary">*</span>
              </label>
              <Input
                {...register("pinCode")}
                placeholder="Enter your PIN code"
                className="w-full"
              />
              {errors.pinCode && (
                <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current address type <span className="text-primary">*</span>
              </label>
              <Select value={formData.currentAddressType} onValueChange={(value) => handleSelectChange("currentAddressType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner(Self or Family)">Owner(Self or Family)</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
              {errors.currentAddressType && (
                <p className="text-red-500 text-sm mt-1">{errors.currentAddressType.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permanent address <span className="text-primary">*</span>
              </label>
              <Input
                {...register("permanentAddress")}
                placeholder="Enter your permanent address"
                className="w-full"
              />
              {errors.permanentAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current address proof <span className="text-primary">*</span>
              </label>
              <FileUpload
                accept="application/pdf"
                placeholder="Click to upload pdf here"
                onFileChange={(file) => handleFileChange("addressProof", file)}
              />
              {errors.addressProof && (
                <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>
              )}
            </div>
          </div></div>

        <p className="text-sm text-gray-600">
          Secure, transparent, and RBI-compliant personal loans — designed to help you when you need it most.
        </p>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
          Next
        </Button>
      </div>
    </form>
  )
}
