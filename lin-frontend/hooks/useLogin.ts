import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { LoginStep1Form, LoginOtpForm } from '@/lib/login-schemas';

interface UseLoginReturn {
  step: 1 | 2 | 3;
  phoneNumber: string;
  otpResendTimer: number;
  isVerifying: boolean;
  error: string | null;
  setStep: (step: 1 | 2 | 3) => void;
  setPhoneNumber: (phone: string) => void;
  setOtpResendTimer: (timer: number) => void;
  setIsVerifying: (verifying: boolean) => void;
  setError: (error: string | null) => void;
  loginStep1: (data: LoginStep1Form) => Promise<boolean>;
  verifyOtp: (data: LoginOtpForm) => Promise<boolean>;
  resendOtp: () => Promise<boolean>;
  resetLogin: () => void;
}

export function useLogin(): UseLoginReturn {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpResendTimer, setOtpResendTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginStep1 = useCallback(async (data: LoginStep1Form): Promise<boolean> => {
    try {
      setError(null);
      setPhoneNumber(data.phoneNumber);
      
      // Call login API with phone and DOB
      await apiClient.loginUser(data.phoneNumber, data.dateOfBirth);
      
      setStep(2);
      setOtpResendTimer(30);
      return true;
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      return false;
    }
  }, []);

  const verifyOtp = useCallback(async (data: LoginOtpForm): Promise<boolean> => {
    try {
      setError(null);
      setIsVerifying(true);
      
      // Verify OTP using the same endpoint as signup
      const response = await apiClient.verifyLoginOtp(phoneNumber, data.otp);
      
      if (response.token) {
        setStep(3);
        return true;
      } else {
        setError('Invalid OTP. Please try again.');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please try again.');
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [phoneNumber]);

  const resendOtp = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      
      // Resend OTP using the same login endpoint
      await apiClient.loginUser(phoneNumber, ''); // DOB not needed for resend
      
      setOtpResendTimer(30);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
      return false;
    }
  }, [phoneNumber]);

  const resetLogin = useCallback(() => {
    setStep(1);
    setPhoneNumber("");
    setOtpResendTimer(0);
    setIsVerifying(false);
    setError(null);
  }, []);

  return {
    step,
    phoneNumber,
    otpResendTimer,
    isVerifying,
    error,
    setStep,
    setPhoneNumber,
    setOtpResendTimer,
    setIsVerifying,
    setError,
    loginStep1,
    verifyOtp,
    resendOtp,
    resetLogin,
  };
}
