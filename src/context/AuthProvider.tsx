import { useCallback, useEffect, useMemo, useState } from "react";

import { getCurrentUserApi } from "../api/auth";
import { AuthContext } from "./auth-context";

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
};

function readToken(): string | null {
  return localStorage.getItem("token");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = readToken();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => Boolean(token));

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await getCurrentUserApi();
        if (!cancelled) setUser(res.user);
      } catch {
        localStorage.removeItem("token");
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback((token: string, user: User) => {
    console.log("login() được gọi, token: ",token)
    localStorage.setItem("token", token);
    console.log("sau setItem:", localStorage.getItem("token"))
    setUser(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}