import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { SignupFormData } from '@/lib/signup-schemas';

interface UseSignupReturn {
  currentStep: number;
  formData: SignupFormData;
  isLoading: boolean;
  error: string | null;
  setCurrentStep: (step: number) => void;
  updateFormData: (step: keyof SignupFormData, data: any) => void;
  submitStep: (step: number, data: any) => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: SignupFormData = {
  phoneVerification: { phoneNumber: "", otp: "" as string | undefined },
  personalDetails: {
    firstName: "", middleName: "", lastName: "", dateOfBirth: "", email: "", password: "", gender: "" as "Male" | "Female" | "Prefer not to say"
  },
  basicDetails: {
    loanAmount: 0, purposeOfLoan: "", companyName: "", companyAddress: "",
    monthlyIncome: 0, jobStability: "" as "Very unstable" | "Somewhat unstable" | "Neutral / moderate" | "Stable" | "Very stable",
    currentAddress: "", currentAddressType: "" as "Owner(Self or Family)" | "Rented",
    permanentAddress: "", addressProof: new File([], ""), pinCode: ""
  },
  documentVerification: {
    payslipFile: new File([], ""), bankStatementFile: new File([], ""),
    panNumber: "", aadhaarNumber: ""
  },
  aadhaarOtp: { aadhaarOtp: "" },
  photoAndLocationSchema: { photoFile: new File([], ""), autoDetectLocation: false, location: "" }
};

export function useSignup(): UseSignupReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = useCallback((step: keyof SignupFormData, data: any) => {
    setFormData(prev => ({ ...prev, [step]: data }));
  }, []);

  const submitStep = useCallback(async (step: number, data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      switch (step) {
        case 1:
          if (!data.otp) {
            // Request OTP
            await apiClient.requestPhoneOtp(data.phoneNumber);
            return true;
          } else {
            // Verify OTP
            const response = await apiClient.verifyPhoneOtp(data.phoneNumber, data.otp);
            if (response.token) {
              apiClient.setToken(response.token);
            }
            return true;
          }

        case 2:
          // Register user with personal details
          const name = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`.trim();
          await apiClient.registerUser({
            name,
            dob: data.dateOfBirth,
            gender: data.gender,
            email: data.email,
            password: data.password,
          });
          return true;

        case 3:
          // Submit KYC details
          await apiClient.submitKYC({
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            monthlyIncome: data.monthlyIncome,
            stability: data.jobStability,
            currentAddress: data.currentAddress,
            currentAddressType: data.currentAddressType,
            permanentAddress: data.permanentAddress,
            currentPostalCode: data.pinCode,
            loanAmount: data.loanAmount,
            purpose: data.purposeOfLoan,
          });
          return true;

        case 4:
          // Submit documents (without selfie)
          const documentFormData = new FormData();
          documentFormData.append('salarySlips', data.payslipFile);
          documentFormData.append('bankStatements', data.bankStatementFile);
          documentFormData.append('panNumber', data.panNumber);
          documentFormData.append('aadhaarNumber', data.aadhaarNumber);
          
          // Add location data if available
          if (navigator.geolocation) {
            try {
              const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0
                });
              });
              
              documentFormData.append('latitude', position.coords.latitude.toString());
              documentFormData.append('longitude', position.coords.longitude.toString());
              documentFormData.append('accuracy', position.coords.accuracy?.toString() || '');
            } catch (error) {
              console.warn('Could not get location:', error);
              // Use default location or let backend handle missing location
              documentFormData.append('latitude', '0');
              documentFormData.append('longitude', '0');
            }
          } else {
            documentFormData.append('latitude', '0');
            documentFormData.append('longitude', '0');
          }
          
          documentFormData.append('consent', 'true');
          
          await apiClient.submitDocuments(documentFormData);
          return true;

        case 5:
          // Verify Aadhaar OTP - use phone number from step 1
          const phoneNumber = formData.phoneVerification.phoneNumber;
          await apiClient.verifyAadhaarOtp(phoneNumber, data.aadhaarOtp);
          return true;

        case 6:
          // Upload selfie first
          if (data.photoFile && data.photoFile.size > 0) {
            await apiClient.uploadSelfie(data.photoFile);
          }
          
          // Submit location data
          if (data.autoDetectLocation && navigator.geolocation) {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              });
            });

            await apiClient.submitLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              placeName: data.location,
            });
          }
          return true;

        default:
          return false;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData.documentVerification.aadhaarNumber, formData.phoneVerification.phoneNumber]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    currentStep,
    formData,
    isLoading,
    error,
    setCurrentStep,
    updateFormData,
    submitStep,
    resetForm,
  };
}
