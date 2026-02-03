import { useMemo, useState } from "react";

const HARD_CODED = { username: "hacker", password: "htn2026" };

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = (username, password) => {
    const ok = username === HARD_CODED.username && password === HARD_CODED.password;
    if (ok) setIsLoggedIn(true);
    return ok;
  };

  const logout = () => setIsLoggedIn(false);

  return useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn]
  );
}
