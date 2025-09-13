import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { buildApiUrl, API_CONFIG } from '../../config/api';

export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  subscription: 'FREE' | 'PREMIUM';
  createdAt: string;
}

export interface Lawyer {
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
}

interface AuthState {
  user: User | null;
  lawyer: Lawyer | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'user' | 'lawyer' | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  lawyer: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  userType: null,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER_LOGIN), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const data = await response.json();
      return { ...data, userType: 'user' };
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const loginLawyer = createAsyncThunk(
  'auth/loginLawyer',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_LOGIN), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Login failed');
      }

      const data = await response.json();
      return { ...data, userType: 'lawyer' };
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email: string; password: string; country: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER_REGISTER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Registration failed');
      }

      const data = await response.json();
      return { ...data, userType: 'user' };
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const registerLawyer = createAsyncThunk(
  'auth/registerLawyer',
  async (lawyerData: any, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LAWYER_REGISTER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lawyerData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Registration failed');
      }

      const data = await response.json();
      return { ...data, userType: 'lawyer' };
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER_PROFILE), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch profile');
      }

      const data = await response.json();
      return data.profile;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const fetchLawyerProfile = createAsyncThunk(
  'auth/fetchLawyerProfile',
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.lawyer = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userType = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserType: (state, action: PayloadAction<'user' | 'lawyer'>) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.userType = 'user';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login Lawyer
      .addCase(loginLawyer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginLawyer.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.userType = 'lawyer';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginLawyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userType = 'user';
        state.isAuthenticated = true;
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register Lawyer
      .addCase(registerLawyer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerLawyer.fulfilled, (state, action) => {
        state.loading = false;
        state.lawyer = action.payload.lawyer;
        state.userType = 'lawyer';
        state.isAuthenticated = true;
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerLawyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userType = 'user';
      })
      // Fetch Lawyer Profile
      .addCase(fetchLawyerProfile.fulfilled, (state, action) => {
        state.lawyer = action.payload;
        state.userType = 'lawyer';
      });
  },
});

export const { logout, clearError, setUserType } = authSlice.actions;
export default authSlice.reducer;
