import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchUserProfile, fetchAvailableLawyers, sendMessage } from "../store/slices/userSlice";
import { buildApiUrl } from "../config/api";

export const useUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error, conversations, availableLawyers, currentConversation, isProUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !profile) {
      dispatch(fetchUserProfile());
      dispatch(fetchAvailableLawyers());
    }
  }, [dispatch, profile]);

  const refreshProfile = () => {
    dispatch(fetchUserProfile());
  };

  const refreshLawyers = () => {
    dispatch(fetchAvailableLawyers());
  };

  const sendChatMessage = (message: string, conversationId?: number) => {
    if (profile) {
      return dispatch(sendMessage({
        userId: profile.id,
        message,
        country: profile.country,
        conversationId
      }));
    }
  };

  return { 
    profile, 
    loading, 
    error, 
    conversations,
    availableLawyers,
    currentConversation,
    isProUser,
    refreshProfile,
    refreshLawyers,
    sendChatMessage
  };
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, token, login, logout };
};

export const useApi = () => {
  const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    const url = buildApiUrl(endpoint);
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || "Request failed");
    }

    return response.json();
  };

  return { makeRequest };
};
