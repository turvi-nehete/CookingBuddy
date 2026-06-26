/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../api/axios";

const AuthContext = createContext(null);

const MOCK_USER_KEY = "cookbuddy_mock_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(MOCK_USER_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem(MOCK_USER_KEY);
      }
    }
    return null;
  });
  const loading = false;
  const [authError, setAuthError] = useState("");

  async function login(credentials) {
    setAuthError("");
    
    // Simulate a brief network latency for UX realism
    await new Promise((resolve) => setTimeout(resolve, 300));

    const username = credentials.email.split("@")[0];
    const profile = {
      id: "chef-123",
      username: username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: credentials.email,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(profile));
    localStorage.setItem(ACCESS_TOKEN_KEY, "mock-access-token");
    localStorage.setItem(REFRESH_TOKEN_KEY, "mock-refresh-token");
    setUser(profile);
    return profile;
  }

  async function register(payload) {
    setAuthError("");

    await new Promise((resolve) => setTimeout(resolve, 300));

    const username = payload.email.split("@")[0];
    const profile = {
      id: "chef-123",
      username: username,
      name: payload.name || (username.charAt(0).toUpperCase() + username.slice(1)),
      email: payload.email,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(profile));
    localStorage.setItem(ACCESS_TOKEN_KEY, "mock-access-token");
    localStorage.setItem(REFRESH_TOKEN_KEY, "mock-refresh-token");
    setUser(profile);
    return profile;
  }

  function logout() {
    localStorage.removeItem(MOCK_USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
  }

  function rememberError(error) {
    const message = error?.message || "Something went wrong.";
    setAuthError(message);
    return message;
  }

  const value = useMemo(
    () => ({ user, loading, authError, isAuthenticated: Boolean(user), login, logout, register, rememberError }),
    [user, loading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}