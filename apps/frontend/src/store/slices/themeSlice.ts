import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export const lightColors: ColorScheme = {
  primary: '#2563eb', // Modern blue
  secondary: '#7c3aed', // Purple
  accent: '#06b6d4', // Cyan
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const darkColors: ColorScheme = {
  primary: '#3b82f6', // Brighter blue for dark mode
  secondary: '#8b5cf6', // Brighter purple
  accent: '#22d3ee', // Brighter cyan
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
};

interface ThemeState {
  currentTheme: Theme;
  isDark: boolean;
  colors: ColorScheme;
  isProUser: boolean;
}

const getSystemTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const initialState: ThemeState = {
  currentTheme: 'system',
  isDark: getSystemTheme(),
  colors: getSystemTheme() ? darkColors : lightColors,
  isProUser: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      
      if (action.payload === 'system') {
        state.isDark = getSystemTheme();
      } else {
        state.isDark = action.payload === 'dark';
      }
      
      state.colors = state.isDark ? darkColors : lightColors;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.toggle('dark', state.isDark);
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.currentTheme = newTheme;
      state.isDark = newTheme === 'dark';
      state.colors = state.isDark ? darkColors : lightColors;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', state.isDark);
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
        state.currentTheme = savedTheme;
        
        if (savedTheme === 'system') {
          state.isDark = getSystemTheme();
        } else {
          state.isDark = savedTheme === 'dark';
        }
        
        state.colors = state.isDark ? darkColors : lightColors;
        document.documentElement.classList.toggle('dark', state.isDark);
      }
    },
    setProUser: (state, action: PayloadAction<boolean>) => {
      state.isProUser = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, initializeTheme, setProUser } = themeSlice.actions;
export default themeSlice.reducer;