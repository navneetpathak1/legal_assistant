import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { buildApiUrl, API_CONFIG } from '../../config/api';

export interface LawyerProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  country: string;
  specialization?: string;
  availableFrom?: string;
  availableTo?: string;
  subscription: 'FREE' | 'PREMIUM';
  charge?: number;
  createdAt: string;
  razorpayAccountId?: string;
  payoutEnabled: boolean;
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
}

interface LawyerState {
  profile: LawyerProfile | null;
  loading: boolean;
  error: string | null;
  isProLawyer: boolean;
  paymentOrder: PaymentOrder | null;
  paymentLoading: boolean;
}

const initialState: LawyerState = {
  profile: null,
  loading: false,
  error: null,
  isProLawyer: false,
  paymentOrder: null,
  paymentLoading: false,
};

// Async thunks
export const fetchLawyerProfile = createAsyncThunk(
  'lawyer/fetchLawyerProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_PROFILE), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const updateLawyerProfile = createAsyncThunk(
  'lawyer/updateLawyerProfile',
  async (profileData: Partial<LawyerProfile>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_UPDATE), {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to update profile');
      }

      const data = await response.json();
      return data.lawyer;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const createPaymentOrder = createAsyncThunk(
  'lawyer/createPaymentOrder',
  async (lawyerId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_CREATE_ORDER, { lawyerId }), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to create payment order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'lawyer/verifyPayment',
  async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_VERIFY), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Payment verification failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

const lawyerSlice = createSlice({
  name: 'lawyer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPaymentOrder: (state) => {
      state.paymentOrder = null;
    },
    setProLawyer: (state, action: PayloadAction<boolean>) => {
      state.isProLawyer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawyerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLawyerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isProLawyer = action.payload.subscription === 'PREMIUM';
      })
      .addCase(fetchLawyerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateLawyerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLawyerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isProLawyer = action.payload.subscription === 'PREMIUM';
      })
      .addCase(updateLawyerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPaymentOrder.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.profile = action.payload.lawyer;
        state.isProLawyer = action.payload.lawyer.subscription === 'PREMIUM';
        state.paymentOrder = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearPaymentOrder, setProLawyer } = lawyerSlice.actions;
export default lawyerSlice.reducer;
