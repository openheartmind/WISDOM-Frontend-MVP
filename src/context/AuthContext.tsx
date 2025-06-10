"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  authId: string;
  email: string;
  displayName: string | null;
  fullName?: string;
  phone?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setAuth: (token: string | null, user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load saved auth data on initial mount
  useEffect(() => {
    try {
      // Try to get token from localStorage
      const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      const savedUserJson = localStorage.getItem(AUTH_USER_KEY);

      if (savedToken) {
        setToken(savedToken);
        console.log("Loaded auth token from localStorage");
      }

      if (savedUserJson) {
        const savedUser = JSON.parse(savedUserJson);
        setUser(savedUser);
        console.log("Loaded user data from localStorage");
      }
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
    } finally {
      setIsReady(true);
    }
  }, []);

  const setAuth = (newToken: string | null, newUser: User | null) => {
    if (!newToken) {
      console.warn("Warning: Attempted to set auth with null/empty token");
    }

    if (!newUser) {
      console.warn("Warning: Attempted to set auth with null/empty user data");
    }

    // Update state
    setToken(newToken);
    setUser(newUser);

    // Save to localStorage
    try {
      if (newToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }

      if (newUser) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }

      console.log("Auth data saved to localStorage");
    } catch (error) {
      console.error("Error saving auth data to localStorage:", error);
    }
  };

  const logout = () => {
    // Clear state
    setToken(null);
    setUser(null);

    // Clear localStorage
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      console.log("Auth data cleared from localStorage");
    } catch (error) {
      console.error("Error clearing auth data from localStorage:", error);
    }
  };

  // For debugging purposes
  useEffect(() => {
    console.log("AuthContext state updated:", {
      hasToken: !!token,
      hasUser: !!user,
      isAuthenticated: !!token,
    });
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setAuth,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
