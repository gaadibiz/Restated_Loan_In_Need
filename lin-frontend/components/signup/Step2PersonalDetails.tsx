"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { personalDetailsSchema, type PersonalDetailsForm } from "@/lib/signup-schemas"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface Step2Props {
  onSubmit: (data: PersonalDetailsForm) => void;
  onGoToDashboard: () => void;
  formData: PersonalDetailsForm;
  setFormData: (data: PersonalDetailsForm) => void;
}

export function Step2PersonalDetails({ onSubmit, onGoToDashboard, formData, setFormData }: Step2Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, watch, formState } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { errors, isValid } = formState;

  const handleSaveData = async (data: PersonalDetailsForm) => {
    setIsSaving(true);
    try {
      // The API call is now handled by the parent component through useSignup hook
      // This is just for UI state management
      setFormData(data);
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenderChange = (value: "Male" | "Female" | "Prefer not to say") => {
    setValue("gender", value);
    setFormData({ ...formData, gender: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("dateOfBirth", value);
    setFormData({ ...formData, dateOfBirth: value });
  };

  const onValidSubmit = (data: PersonalDetailsForm) => {
    if (isSaved) onSubmit(data);
    else handleSaveData(data);
  };
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const dateOfBirth = watch("dateOfBirth");
  const gender = watch("gender");
  const email = watch("email");
  const password = watch("password");
  
  const isFormValid = firstName && lastName && dateOfBirth && gender && email && password

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
      <div className="space-y-6">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name *
            </label>
            <Input
              {...register("firstName")}
              placeholder="Enter your first name"
              className="w-full h-12 text-base"
              disabled={isSaved}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Middle name
            </label>
            <Input
              {...register("middleName")}
              placeholder="Enter your middle name"
              className="w-full h-12 text-base"
              defaultValue=""
              disabled={isSaved}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name *
            </label>
            <Input
              {...register("lastName")}
              placeholder="Enter your last name"
              className="w-full h-12 text-base"
              disabled={isSaved}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of birth *
            </label>
            <Input
              type="date"
              {...register("dateOfBirth")}
              onChange={handleDateChange}
              className="w-full h-12 text-base"
              disabled={isSaved}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <Select value={gender} onValueChange={handleGenderChange} disabled={isSaved}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 text-base"
            disabled={isSaved}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full h-12 text-base pr-10"
              disabled={isSaved}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isSaved}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        {!isSaved ? (
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
            disabled={!isFormValid || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Now'
            )}
          </Button>
        ) : (
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium"
            >
              Apply for loan →
            </Button>

            <Button
              type="button"
              onClick={onGoToDashboard}
              variant="outline"
              className="flex-1 h-12 text-base font-medium border-gray-300 hover:bg-gray-50"
            >
              Go to dashboard
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
