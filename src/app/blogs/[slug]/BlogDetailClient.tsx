"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { Markdown } from "@/components/Markdown";
import { useLocale } from "@/i18n/LocaleProvider";

export default function BlogDetailClient() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { blogs, t } = useLocale();
  const post = blogs.find((p) => p.slug === slug);

  if (!post)
    return (
      <AcademicShell withSidebar={false} title={t.blogsPage.notFoundTitle} subtitle={t.blogsPage.notFoundSubtitle}>
        <Link href="/blogs" className="text-[var(--color-text-strong)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
          {t.blogsPage.backToBlogs}
        </Link>
      </AcademicShell>
    );

  return (
    <AcademicShell withSidebar={false} title={post.title} subtitle={`${post.date} · ${post.tags.join(" · ")}`}>
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline mb-6 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
        {t.blogsPage.backToBlogs}
      </Link>
      <p className="text-[var(--color-text)] text-sm leading-relaxed italic border-l-2 border-[var(--color-border-weak)] pl-4 mb-6">{post.excerpt}</p>
      <article className="max-w-none">
        <Markdown content={post.content} />
      </article>
      <div className="flex gap-2 mt-8 flex-wrap">
        {post.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">
            #{tag}
          </span>
        ))}
      </div>
    </AcademicShell>
  );
}
