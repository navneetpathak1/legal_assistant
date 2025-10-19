import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeTheme } from '../store/slices/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { currentTheme, isDark } = useAppSelector((state) => state.theme);

  useEffect(() => {
    // Initialize theme on app start
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (currentTheme === 'system') {
        dispatch(initializeTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch, currentTheme]);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
