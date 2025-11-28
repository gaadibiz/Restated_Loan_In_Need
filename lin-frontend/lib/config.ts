// Configuration for the application
export const config = {
  // Backend API Configuration
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api/proxy',
  
  // Supabase Configuration (if needed for file uploads)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  
  // App Configuration
  app: {
    name: 'LoanInNeed',
    version: '1.0.0',
  },
};
