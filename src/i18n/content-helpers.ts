// src/i18n/content-helpers.ts — merge raw content with locale overrides (strict parity)
import type { Locale } from "./config";
import { blogsIdBySlug, cvId, portfolioIdBySlug, type BlogSlug, type PortfolioSlug, type LocalizedContent } from "./content.id";

type BlogRaw = (typeof import("@/content/blogs").blogs)[number];
type PortfolioRaw = (typeof import("@/content/portfolio").portfolio)[number];
type CVRaw = typeof import("@/content/cv").cv;

export type LocalizedBlog = Omit<BlogRaw, "title" | "excerpt" | "content"> & LocalizedContent;
export type LocalizedPortfolio = Omit<PortfolioRaw, "title" | "excerpt" | "content"> & LocalizedContent;

export function getLocalizedBlogs(locale: Locale, raw: readonly BlogRaw[]): readonly LocalizedBlog[] {
  if (locale === "en") return raw as readonly LocalizedBlog[];
  return raw.map((b) => {
    const override = blogsIdBySlug[b.slug as BlogSlug];
    return {
      ...b,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  });
}

export function getLocalizedPortfolio(locale: Locale, raw: readonly PortfolioRaw[]): readonly LocalizedPortfolio[] {
  if (locale === "en") return raw as readonly LocalizedPortfolio[];
  return raw.map((p) => {
    const override = portfolioIdBySlug[p.slug as PortfolioSlug];
    return {
      ...p,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  });
}

export type LocalizedCV = Omit<CVRaw, "headline" | "summary" | "education" | "experience" | "skills" | "certifications" | "interests"> & {
  headline: (typeof cvId)["headline"];
  summary: (typeof cvId)["summary"];
  education: (typeof cvId)["education"];
  experience: (typeof cvId)["experience"];
  skills: (typeof cvId)["skills"];
  certifications: (typeof cvId)["certifications"];
  interests: (typeof cvId)["interests"];
};

export function getLocalizedCV(locale: Locale, raw: CVRaw): LocalizedCV {
  if (locale === "en") return raw as unknown as LocalizedCV;
  return {
    ...raw,
    headline: cvId.headline,
    summary: cvId.summary,
    education: cvId.education,
    experience: cvId.experience,
    skills: cvId.skills,
    certifications: cvId.certifications,
    interests: cvId.interests,
  };
}

// Parity validation — reflects strict Record parity (every EN slug has an ID entry).
// For build-safe runtime checks, use scripts/validate-parity.ts for fence/heading/URL depth.
export function getContentParityReport(
  blogsRaw: readonly BlogRaw[],
  portfolioRaw: readonly PortfolioRaw[]
): {
  missingBlogSlugs: BlogSlug[];
  missingPortfolioSlugs: PortfolioSlug[];
  blogCount: { en: number; id: number };
  portfolioCount: { en: number; id: number };
} {
  const blogSlugs = blogsRaw.map((b) => b.slug as BlogSlug);
  const portfolioSlugs = portfolioRaw.map((p) => p.slug as PortfolioSlug);
  return {
    missingBlogSlugs: blogSlugs.filter((s) => !(s in blogsIdBySlug)),
    missingPortfolioSlugs: portfolioSlugs.filter((s) => !(s in portfolioIdBySlug)),
    blogCount: { en: blogSlugs.length, id: Object.keys(blogsIdBySlug).length },
    portfolioCount: { en: portfolioSlugs.length, id: Object.keys(portfolioIdBySlug).length },
  };
}
