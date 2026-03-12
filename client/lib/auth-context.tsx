"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SessionUser = {
  id: string;
  email: string;
  role: string;
};

type AuthState = {
  accessToken: string;
  user: SessionUser;
};

type AuthContextValue = {
  authState: AuthState | null;
  isReady: boolean;
  setAuthState: (next: AuthState | null) => void;
  logout: () => void;
};

const STORAGE_KEY = "sportify-auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [authState, setAuthStateInternal] = useState<AuthState | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as AuthState;
      if (parsed?.accessToken && parsed?.user?.id) {
        return parsed;
      }
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const setAuthState = (next: AuthState | null) => {
    setAuthStateInternal(next);
    if (typeof window === "undefined") {
      return;
    }

    if (!next) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const logout = () => setAuthState(null);

  return (
    <AuthContext.Provider value={{ authState, isReady: true, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
