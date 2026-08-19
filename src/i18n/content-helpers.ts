// src/i18n/content-helpers.ts — merge raw content with locale overrides (strict parity)
import type { Locale } from "./config";
import {
  blogsIdBySlug,
  cvId,
  portfolioIdBySlug,
  type BlogSlug,
  type LocalizedContent,
  type LocalizedCVFields,
  type PortfolioSlug,
} from "./content.id";

export type LocalizedBlog = LocalizedContent & {
  readonly slug: BlogSlug;
  readonly date: string;
  readonly tags: readonly string[];
};

export type LocalizedPortfolio = LocalizedContent & {
  readonly slug: PortfolioSlug;
  readonly date: string;
  readonly tags: readonly string[];
  readonly image: string;
  readonly links: {
    readonly github: string;
    readonly demo: string;
  };
};

export type LocalizedCV = LocalizedCVFields & { readonly pdfUrl: string };

export function getLocalizedBlogs(locale: Locale, raw: readonly LocalizedBlog[]): readonly LocalizedBlog[] {
  if (locale === "en") return raw;
  return raw.map((b) => {
    const override = blogsIdBySlug[b.slug];
    return {
      ...b,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  });
}

export function getLocalizedPortfolio(locale: Locale, raw: readonly LocalizedPortfolio[]): readonly LocalizedPortfolio[] {
  if (locale === "en") return raw;
  return raw.map((p) => {
    const override = portfolioIdBySlug[p.slug];
    return {
      ...p,
      title: override.title,
      excerpt: override.excerpt,
      content: override.content,
    };
  });
}

export function getLocalizedCV(locale: Locale, raw: LocalizedCV): LocalizedCV {
  if (locale === "en") return raw;
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
// Use scripts/validate-parity.ts for deterministic structure and technical-fact checks.
export function getContentParityReport(
  blogsRaw: readonly LocalizedBlog[],
  portfolioRaw: readonly LocalizedPortfolio[]
): {
  missingBlogSlugs: BlogSlug[];
  missingPortfolioSlugs: PortfolioSlug[];
  blogCount: { en: number; id: number };
  portfolioCount: { en: number; id: number };
} {
  const blogSlugs = blogsRaw.map((b) => b.slug);
  const portfolioSlugs = portfolioRaw.map((p) => p.slug);
  return {
    missingBlogSlugs: blogSlugs.filter((s) => !(s in blogsIdBySlug)),
    missingPortfolioSlugs: portfolioSlugs.filter((s) => !(s in portfolioIdBySlug)),
    blogCount: { en: blogSlugs.length, id: Object.keys(blogsIdBySlug).length },
    portfolioCount: { en: portfolioSlugs.length, id: Object.keys(portfolioIdBySlug).length },
  };
}
