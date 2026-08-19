// src/i18n/config.ts — locale definitions, type-safe

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Display labels (native)
export const localeLabels: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
};

// Full native names for docs/aria
export const localeNativeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

// Compact visual labels for the header language picker.
export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  id: "🇮🇩",
};

export const STORAGE_KEY = "locale";

export function isLocale(v: string | null): v is Locale {
  return v === "en" || v === "id";
}

// For <html lang> — use BCP47
export const htmlLang: Record<Locale, string> = {
  en: "en",
  id: "id",
};
