import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const HARDCODED = {
  username: "hacker",
  password: "htn2026",
};

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => {
    return localStorage.getItem("htn_authed") === "true";
  });

  const login = (username, password) => {
    const ok = username === HARDCODED.username && password === HARDCODED.password;
    if (ok) {
      setIsAuthed(true);
      localStorage.setItem("htn_authed", "true");
    }
    return ok;
  };

  const logout = () => {
    setIsAuthed(false);
    localStorage.setItem("htn_authed", "false");
  };

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
