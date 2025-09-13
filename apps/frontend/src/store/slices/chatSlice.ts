import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: number;
  type: 'user' | 'bot' | 'lawyer';
  content: string;
  timestamp: string; // Store as string for Redux serialization
  conversationId?: number;
}

export interface ChatState {
  messages: ChatMessage[];
  currentConversationId: number | null;
  isTyping: boolean;
  lastMessageTime: string | null;
}

const initialState: ChatState = {
  messages: [],
  currentConversationId: null,
  isTyping: false,
  lastMessageTime: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      state.lastMessageTime = action.payload.timestamp;
    },
    setCurrentConversation: (state, action: PayloadAction<number | null>) => {
      state.currentConversationId = action.payload;
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentConversationId = null;
      state.lastMessageTime = null;
    },
    loadConversationMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setCurrentConversation, setTyping, clearMessages, loadConversationMessages } = chatSlice.actions;
export default chatSlice.reducer;