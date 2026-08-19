"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.setAttribute("data-theme", theme);
}

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme() ?? getSystemTheme();
  });
  const hasPreference = useRef(getStoredTheme() !== null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // apply on mount (and handle SSR mismatch)
    applyTheme(theme);
    // mark mounted — intentional single setState on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      if (hasPreference.current) return;
      const systemTheme: Theme = media.matches ? "dark" : "light";
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const stored = e.newValue === "light" || e.newValue === "dark" ? e.newValue : null;
      hasPreference.current = stored !== null;
      if (stored) {
        setThemeState(stored);
        applyTheme(stored);
      } else {
        applySystemTheme();
      }
    };
    media.addEventListener("change", applySystemTheme);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", applySystemTheme);
      window.removeEventListener("storage", onStorage);
    };
    // theme intentionally not in deps: initial sync only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((t: Theme) => {
    hasPreference.current = true;
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // avoid passing stale closure value directly
  const value: ThemeContextValue = {
    theme: mounted ? theme : "light",
    resolvedTheme: theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
