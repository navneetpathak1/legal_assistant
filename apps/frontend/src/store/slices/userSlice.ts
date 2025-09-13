import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { buildApiUrl, API_CONFIG } from '../../config/api';

export interface Conversation {
  id: number;
  title: string;
  createdAt: string;
  chats: Chat[];
}

export interface Chat {
  id: number;
  role: 'user' | 'bot' | 'lawyer';
  message: string;
  createdAt: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  subscription: 'FREE' | 'PREMIUM';
  createdAt: string;
}

export interface AvailableLawyer {
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
}

interface UserState {
  profile: UserProfile | null;
  conversations: Conversation[];
  availableLawyers: AvailableLawyer[];
  currentConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  isProUser: boolean;
}

const initialState: UserState = {
  profile: null,
  conversations: [],
  availableLawyers: [],
  currentConversation: null,
  loading: false,
  error: null,
  isProUser: false,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
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
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const fetchAvailableLawyers = createAsyncThunk(
  'user/fetchAvailableLawyers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER_AVAILABLE_PROFILE), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch lawyers');
      }

      const data = await response.json();
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'user/sendMessage',
  async ({ userId, message, country, conversationId }: {
    userId: number;
    message: string;
    country: string;
    conversationId?: number;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER_SEND), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message, country, conversationId }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to send message');
      }

      const data = await response.json();
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.currentConversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ conversationId: number; message: Chat }>) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.chats.push(message);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setProUser: (state, action: PayloadAction<boolean>) => {
      state.isProUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.conversations = action.payload.conversations || [];
        state.isProUser = action.payload.subscription === 'PREMIUM';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAvailableLawyers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableLawyers.fulfilled, (state, action) => {
        state.loading = false;
        state.availableLawyers = action.payload;
      })
      .addCase(fetchAvailableLawyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { reply, conversationId } = action.payload;
        
        // Add user message
        const userMessage: Chat = {
          id: Date.now(),
          role: 'user',
          message: action.meta.arg.message,
          createdAt: new Date().toISOString(),
        };
        
        // Add bot response
        const botMessage: Chat = {
          id: Date.now() + 1,
          role: 'bot',
          message: reply,
          createdAt: new Date().toISOString(),
        };
        
        // Find or create conversation
        let conversation = state.conversations.find(conv => conv.id === conversationId);
        if (!conversation) {
          conversation = {
            id: conversationId,
            title: action.meta.arg.message.slice(0, 30) + '...',
            createdAt: new Date().toISOString(),
            chats: [],
          };
          state.conversations.unshift(conversation);
        }
        
        conversation.chats.push(userMessage, botMessage);
        state.currentConversation = conversation;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentConversation, addMessage, clearError, setProUser } = userSlice.actions;
export default userSlice.reducer;
