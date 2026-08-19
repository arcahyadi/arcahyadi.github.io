// src/i18n/content-helpers.ts — merge raw content with locale overrides

import type { Locale } from "./config";
import { blogsIdBySlug, cvId, portfolioIdBySlug } from "./content.id";

type BlogRaw = (typeof import("@/content/blogs").blogs)[number];
type PortfolioRaw = (typeof import("@/content/portfolio").portfolio)[number];
type CVRaw = typeof import("@/content/cv").cv;

export function getLocalizedBlogs(locale: Locale, raw: readonly BlogRaw[]) {
  if (locale === "en") return raw as unknown as BlogRaw[];
  return raw.map((b) => {
    const override = blogsIdBySlug[b.slug];
    if (!override) return b;
    return {
      ...b,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  }) as unknown as BlogRaw[];
}

export function getLocalizedPortfolio(locale: Locale, raw: readonly PortfolioRaw[]) {
  if (locale === "en") return raw as unknown as PortfolioRaw[];
  return raw.map((p) => {
    const override = portfolioIdBySlug[p.slug];
    if (!override) return p;
    return {
      ...p,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  }) as unknown as PortfolioRaw[];
}

export function getLocalizedCV(locale: Locale, raw: CVRaw) {
  if (locale === "en") return raw;
  // Merge cvId (translated) but keep pdfUrl invariant
  return {
    ...raw,
    headline: cvId.headline,
    summary: cvId.summary,
    education: cvId.education as unknown as CVRaw["education"],
    experience: cvId.experience as unknown as CVRaw["experience"],
    skills: cvId.skills as unknown as CVRaw["skills"],
    certifications: cvId.certifications as unknown as CVRaw["certifications"],
    interests: cvId.interests as unknown as CVRaw["interests"],
  } as unknown as CVRaw;
}
