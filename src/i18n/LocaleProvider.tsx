"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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

/**
 * Hydration-safe locale provider.
 *
 * For `output: "export"` with single-locale HTML (`lang="en"`), the server and
 * the first client render MUST match to avoid hydration mismatch. We therefore
 * initialize React state to `defaultLocale` (en) for the initial render —
 * matching the exported HTML and the <html lang="en"> — and apply any persisted
 * locale (localStorage/cookie) in a client effect after hydration.
 *
 * This means a returning visitor with `id` stored will see a brief client-side
 * locale switch after hydration (EN → ID) before settling. The alternative —
 * reading storage during render — causes React hydration errors (server HTML en
 * vs client HTML id). The exported HTML is always English for crawlers; the
 * live DOM reflects the user's chosen locale after mount.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // After hydration, apply persisted locale (localStorage/cookie) if present.
  useEffect(() => {
    let next: Locale | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored) && stored !== defaultLocale) {
        next = stored;
      } else {
        const cookieMatch = document.cookie.match(/(?:^|; )locale=([^;]*)/);
        const cookieVal = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
        if (isLocale(cookieVal) && cookieVal !== defaultLocale) {
          next = cookieVal;
        }
      }
    } catch {
      // private mode or no storage
    }
    if (next) setLocaleState(next); // eslint-disable-line react-hooks/set-state-in-effect -- hydration: apply persisted locale after mount to match static export
  }, []);

  // Keep <html lang> in sync with the actually rendered locale.
  useEffect(() => {
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

  // Live DOM metadata: update title/description and social meta when locale changes.
  // Build-time metadata (exported HTML) stays English (siteConfig) for crawlers on the single static URL.
  useEffect(() => {
    document.title = t.site.title;
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', t.site.description);
    setMeta('meta[property="og:title"]', t.site.title);
    setMeta('meta[property="og:description"]', t.site.description);
    setMeta('meta[name="twitter:title"]', t.site.title);
    setMeta('meta[name="twitter:description"]', t.site.description);
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
