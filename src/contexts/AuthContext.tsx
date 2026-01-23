"use client";

import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { safeGetItem, safeSetItem } from "@/lib/storage";

type AuthUser = {
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  hydrated: boolean;
  loading: boolean;
};

const STORAGE_KEY = "base_next_auth";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: async () => undefined,
  logout: () => undefined,
  hydrated: false,
  loading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = safeGetItem<AuthUser | null>(STORAGE_KEY, null);
    if (stored) {
      startTransition(() => setUser(stored));
    }
    startTransition(() => setHydrated(true));
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!email || !password) {
        throw new Error("missing-credentials");
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const authUser = { email };
      setUser(authUser);
      safeSetItem(STORAGE_KEY, authUser);
      setLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    safeSetItem<AuthUser | null>(STORAGE_KEY, null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      hydrated,
      loading,
    }),
    [user, login, logout, hydrated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

