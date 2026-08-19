"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultLocale, htmlLang, isLocale, STORAGE_KEY, type Locale } from "./config";
import { translations, type Dictionary } from "./translations";
import { getLocalizedBlogs, getLocalizedPortfolio, getLocalizedCV } from "./content-helpers";
import { blogs as blogsRaw } from "@/content/blogs";
import { portfolio as portfolioRaw } from "@/content/portfolio";
import { cv as cvRaw } from "@/content/cv";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
  blogs: ReturnType<typeof getLocalizedBlogs>;
  portfolio: ReturnType<typeof getLocalizedPortfolio>;
  cv: ReturnType<typeof getLocalizedCV>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const hydrated = useRef(false);

  // Read persisted locale on mount (client only)
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore (private mode, etc) — fallback to default
    }
    if (isLocale(stored)) {
      // avoid calling setState during effect without guard? it's fine
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
      document.documentElement.lang = htmlLang[stored];
    } else {
      document.documentElement.lang = htmlLang[defaultLocale];
    }
    hydrated.current = true;
  }, []);

  // Sync html lang on locale change (after hydration)
  useEffect(() => {
    if (!hydrated.current) return;
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    // best-effort cookie for potential SSR later (static export ignores it, but harmless)
    try {
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
    document.documentElement.lang = htmlLang[next];
  }, []);

  const t = useMemo(() => translations[locale], [locale]);
  const blogs = useMemo(() => getLocalizedBlogs(locale, blogsRaw), [locale]);
  const portfolio = useMemo(() => getLocalizedPortfolio(locale, portfolioRaw), [locale]);
  const cv = useMemo(() => getLocalizedCV(locale, cvRaw), [locale]);

  const value: LocaleContextValue = useMemo(
    () => ({ locale, setLocale, t, blogs, portfolio, cv }),
    [locale, setLocale, t, blogs, portfolio, cv]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useDictionary() {
  return useLocale().t;
}
