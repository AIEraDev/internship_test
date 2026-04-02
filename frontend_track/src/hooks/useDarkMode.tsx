"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface DarkModeContextValue {
  isDark: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeContextValue>({
  isDark: false,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Read localStorage only on the client after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return <DarkModeContext.Provider value={{ isDark, toggle }}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode(): DarkModeContextValue {
  return useContext(DarkModeContext);
}
