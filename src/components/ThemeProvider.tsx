"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "light";

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
  toggleTheme: (origin?: { x: number; y: number }) => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme() ?? DEFAULT_THEME;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // apply on mount (and handle SSR mismatch)
    applyTheme(theme);
    // mark mounted — intentional single setState on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const stored = e.newValue === "light" || e.newValue === "dark" ? e.newValue : null;
      const nextTheme = stored ?? DEFAULT_THEME;
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
    // theme intentionally not in deps: initial sync only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!origin || reduceMotion || typeof document.startViewTransition !== "function") {
      setTheme(nextTheme);
      return;
    }

    const root = document.documentElement;
    const radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y),
    );
    root.style.setProperty("--theme-transition-x", `${origin.x}px`);
    root.style.setProperty("--theme-transition-y", `${origin.y}px`);
    root.style.setProperty("--theme-transition-radius", `${radius}px`);
    root.classList.add("theme-transition");

    const transition = document.startViewTransition(() => setTheme(nextTheme));
    transition.finished.finally(() => {
      root.classList.remove("theme-transition");
      root.style.removeProperty("--theme-transition-x");
      root.style.removeProperty("--theme-transition-y");
      root.style.removeProperty("--theme-transition-radius");
    });
  }, [theme, setTheme]);

  // avoid passing stale closure value directly
  const value: ThemeContextValue = {
    theme: mounted ? theme : DEFAULT_THEME,
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
