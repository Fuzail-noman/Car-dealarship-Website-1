import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("galaxy_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await api.me();
      if (res.success) {
        setUser(res.user);
      } else {
        localStorage.removeItem("galaxy_token");
        setToken(null);
      }
      setLoading(false);
    }
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistSession(newToken, newUser) {
    localStorage.setItem("galaxy_token", newToken);
    setToken(newToken);
    setUser(newUser);
  }

  async function login(email, password) {
    const res = await api.login({ email, password });
    if (res.success) persistSession(res.token, res.user);
    return res;
  }

  async function signup(payload) {
    const res = await api.signup(payload);
    if (res.success) persistSession(res.token, res.user);
    return res;
  }

  function logout() {
    localStorage.removeItem("galaxy_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
