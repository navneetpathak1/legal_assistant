// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3003',
  ENDPOINTS: {
    // User endpoints
    USER_LOGIN: '/api/v1/users/login',
    USER_REGISTER: '/api/v1/users/register',
    USER_PROFILE: '/api/v1/users/profile',
    
    // Payment endpoints
    CREATE_ORDER: '/api/v1/payments/create-order',
    VERIFY_PAYMENT: '/api/v1/payments/verify',
    GET_PAYMENT: (paymentId: string) => `/api/v1/payments/${paymentId}`,
    
    // Lawyer endpoints
    GET_LAWYER: (lawyerId: string) => `/api/v1/lawyers/${lawyerId}`,
    USER_AVAILABLE_PROFILE: '/api/v1/users/availableProfile',
    USER_SEND: '/api/v1/users/send',
    
    // Lawyer endpoints
    LAWYER_LOGIN: '/api/v1/lawyers/login',
    LAWYER_REGISTER: '/api/v1/lawyers/register',
    LAWYER_PROFILE: '/api/v1/lawyers/profile',
    LAWYER_UPDATE: '/api/v1/lawyers/update',
    LAWYER_CREATE_ORDER: '/api/v1/lawyers/create-order',
    LAWYER_VERIFY: '/api/v1/lawyers/verify',
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};
