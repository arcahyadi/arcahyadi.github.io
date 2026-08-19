import Link from "next/link";
import { siteConfig } from "@/site.config";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { Markdown } from "@/components/Markdown";

export function generateStaticParams() {
  return siteConfig.blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = siteConfig.blogs.find((p) => p.slug === slug);
  if (!post)
    return (
      <AcademicShell withSidebar={false} title="Not found" subtitle="Blog post not found.">
        <Link href="/blogs" className="text-[var(--color-text-strong)] underline">← Back to Blogs</Link>
      </AcademicShell>
    );

  return (
    <AcademicShell withSidebar={false} title={post.title} subtitle={`${post.date} · ${post.tags.join(" · ")}`}>
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline mb-6 no-underline">
        ← Back to Blogs
      </Link>
      <p className="text-[var(--color-text)] text-sm leading-relaxed italic border-l-2 border-[var(--color-border-weak)] pl-4 mb-6">{post.excerpt}</p>
      <article className="max-w-none">
        <Markdown content={post.content} />
      </article>
      <div className="flex gap-2 mt-8 flex-wrap">
        {post.tags.map((t) => (
          <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">
            #{t}
          </span>
        ))}
      </div>
    </AcademicShell>
  );
}
