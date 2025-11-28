// API integration layer for backend communication
import { config } from './config';

const API_BASE_URL = config.apiUrl;

interface ApiResponse<T = any> {
  success?: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
}

interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}`;
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      body: JSON.stringify({
        path: endpoint,
        body: options.body ? JSON.parse(options.body as string) : undefined,
      }),
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async requestPhoneOtp(phone: string): Promise<ApiResponse> {
    return this.request('/api/auth/phone/request-otp', {
      body: JSON.stringify({ phone: `+91${phone}` }),
    });
  }

  async verifyPhoneOtp(phone: string, code: string): Promise<ApiResponse> {
    const response = await this.request('/api/auth/phone/verify-otp', {
      body: JSON.stringify({ phone: `+91${phone}`, code }),
    });

    // Store token for future requests
    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
      }
    }

    return response;
  }

  // Login endpoints
  async loginUser(phone: string, dateOfBirth: string): Promise<ApiResponse> {
    return this.request('/api/users/login', {
      body: JSON.stringify({ 
        phone: `+91${phone}`, 
        dob: dateOfBirth 
      }),
    });
  }

  async verifyLoginOtp(phone: string, code: string): Promise<ApiResponse> {
    const response = await this.request('/api/auth/phone/verify-otp', {
      body: JSON.stringify({ phone: `+91${phone}`, code }),
    });

    // Store token for future requests
    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
      }
    }

    return response;
  }

  async registerUser(userData: {
    name: string;
    dob: string;
    gender: string;
    email: string;
    password: string;
  }): Promise<ApiResponse> {
    return this.request('/api/users/register', {
      body: JSON.stringify(userData),
    });
  }

  // KYC endpoints
  async submitKYC(kycData: {
    companyName: string;
    companyAddress: string;
    monthlyIncome: number;
    stability: string;
    currentAddress: string;
    currentAddressType: string;
    permanentAddress: string;
    currentCity?: string;
    currentState?: string;
    currentPostalCode?: string;
    loanAmount: number;
    purpose: string;
    status?: string;
    startDate?: string;
    interestRate?: number;
    termMonths?: number;
  }): Promise<ApiResponse> {
    return this.request('/api/kyc', {
      body: JSON.stringify(kycData),
    });
  }

  // Document verification endpoints
  async submitDocuments(formData: FormData): Promise<ApiResponse> {
    const url = '/api/upload-documents';
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Document upload failed:', error);
      throw error;
    }
  }

  // Selfie upload endpoint
  async uploadSelfie(selfieFile: File): Promise<ApiResponse> {
    const url = '/api/upload-selfie';
    const formData = new FormData();
    formData.append('selfie', selfieFile);
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Selfie upload failed:', error);
      throw error;
    }
  }

  // Aadhaar verification endpoints
  async requestAadhaarOtp(aadhaarNumber: string): Promise<ApiResponse> {
    return this.request('/api/auth/aadhaar/request-otp', {
      body: JSON.stringify({ aadhaarNumber }),
    });
  }

  async verifyAadhaarOtp(phone: string, otp: string): Promise<ApiResponse> {
    // Use the same phone OTP verification endpoint (OTP sent to phone)
    return this.request('/api/auth/phone/verify-otp', {
      body: JSON.stringify({ phone: `+91${phone}`, code: otp }),
    });
  }

  // Location capture endpoint
  async submitLocation(locationData: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    locality?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    placeName?: string;
  }): Promise<ApiResponse> {
    return this.request('/api/users/location', {
      body: JSON.stringify(locationData),
    });
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    return this.token;
  }
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse, ApiError };
