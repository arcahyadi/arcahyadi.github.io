"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { Markdown } from "@/components/Markdown";
import { useLocale } from "@/i18n/LocaleProvider";

export default function PortfolioDetailClient() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { portfolio, t } = useLocale();
  const item = portfolio.find((p) => p.slug === slug);

  if (!item)
    return (
      <AcademicShell withSidebar={false} title={t.portfolioPage.notFoundTitle} subtitle={t.portfolioPage.notFoundSubtitle}>
        <Link href="/portfolio" className="text-[var(--color-text-strong)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
          {t.portfolioPage.backToPortfolio}
        </Link>
      </AcademicShell>
    );

  return (
    <AcademicShell withSidebar={false} title={item.title} subtitle={`${item.date} · ${item.tags.join(" · ")}`}>
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline mb-6 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
        {t.portfolioPage.backToPortfolio}
      </Link>
      <article className="max-w-none">
        <Markdown content={item.content} />
      </article>
      <div className="flex flex-wrap gap-3 mt-8">
        {item.links.github ? (
          <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border-weak)] rounded text-sm font-medium text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
            {t.portfolioPage.github}
          </a>
        ) : null}
        {item.links.demo && item.links.demo !== "#" ? (
          <a href={item.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-background-strong)] text-[var(--color-text-inverted)] rounded text-sm font-medium hover:bg-[var(--color-background-strong-hover)] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
            {t.portfolioPage.liveDemo}
          </a>
        ) : null}
      </div>
    </AcademicShell>
  );
}
