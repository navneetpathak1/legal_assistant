import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import lawyerReducer from './slices/lawyerSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: userReducer,
  lawyer: lawyerReducer,
  chat: chatReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
