"use client";

import Link from "next/link";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { useLocale } from "@/i18n/LocaleProvider";

export default function PortfolioPage() {
  const { portfolio, t } = useLocale();
  return (
    <AcademicShell title={t.portfolioPage.title} subtitle={t.portfolioPage.subtitle} withSidebar={false}>
      <div className="grid gap-6 md:gap-8">
        {portfolio.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className="group block border border-[var(--color-border-weak)] rounded-[6px] overflow-hidden hover:border-[var(--color-text-weak)] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
          >
            <div className="p-6 md:p-7">
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">
                    {tag}
                  </span>
                ))}
                <span className="text-[11px] font-mono text-[var(--color-text-weak)] ml-auto">{item.date}</span>
              </div>
              <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] group-hover:underline underline-offset-4 decoration-1">{item.title}</h2>
              <p className="text-[var(--color-text)] text-sm leading-relaxed mt-2">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </AcademicShell>
  );
}
