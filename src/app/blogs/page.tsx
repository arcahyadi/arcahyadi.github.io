"use client";

import Link from "next/link";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { useLocale } from "@/i18n/LocaleProvider";

export default function BlogsPage() {
  const { blogs, t } = useLocale();
  const sorted = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <AcademicShell withSidebar={false} title={t.blogsPage.title} subtitle={t.blogsPage.subtitle}>
      <div className="grid gap-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block border-b border-[var(--color-border-weak)] pb-6 last:border-0 no-underline hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded"
          >
            <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--color-text-weak)] mb-2">
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span className="flex gap-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-[var(--color-background-weak)] border border-[var(--color-border-weak)] rounded">
                    {tag}
                  </span>
                ))}
              </span>
            </div>
            <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] group-hover:underline underline-offset-4 decoration-1 leading-tight">{post.title}</h2>
            <p className="text-[var(--color-text)] text-sm leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
            <span className="inline-flex mt-3 text-sm font-medium text-[var(--color-text-strong)] group-hover:underline decoration-1 underline-offset-4">{t.blogsPage.readMore}</span>
          </Link>
        ))}
      </div>
    </AcademicShell>
  );
}
