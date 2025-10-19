import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import chatSlice from './slices/chatSlice';
import themeSlice from './slices/themeSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    theme: themeSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
