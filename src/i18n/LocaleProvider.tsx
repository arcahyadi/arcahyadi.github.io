"use client";

import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
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

/** Lazy initializer reads persisted locale so first render already matches pre-paint lang. */
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
    // also check cookie (set by setLocale)
    const cookieMatch = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    const cookieVal = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    if (isLocale(cookieVal)) return cookieVal;
  } catch {
    // private mode
  }
  return defaultLocale;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Keep <html lang> in sync with actually rendered content; also re-apply after dev StrictMode remount.
  useLayoutEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  useEffect(() => {
    // Ensure lang is correct on mount (covers pre-paint script + hydration)
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
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

  // Update document title/description per locale when translation available (client-only, static export safe)
  useEffect(() => {
    document.title = t.site.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.site.description);
  }, [t.site.title, t.site.description]);

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
