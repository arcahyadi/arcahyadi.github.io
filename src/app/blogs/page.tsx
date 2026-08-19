import Link from "next/link";
import { siteConfig } from "@/site.config";
import { AcademicShell } from "@/components/academic/AcademicShell";

export default function BlogsPage() {
  const { blogs } = siteConfig;
  // newest first
  const sorted = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <AcademicShell withSidebar={false} title="Blogs" subtitle="Notes on networking, homelab, automation and backend">
      <div className="grid gap-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block border-b border-[var(--color-border-weak)] pb-6 last:border-0 no-underline hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--color-text-weak)] mb-2">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex gap-1.5 flex-wrap">
                {post.tags.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-[var(--color-background-weak)] border border-[var(--color-border-weak)] rounded">
                    {t}
                  </span>
                ))}
              </span>
            </div>
            <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] group-hover:underline underline-offset-4 decoration-1 leading-tight">{post.title}</h2>
            <p className="text-[var(--color-text)] text-sm leading-relaxed mt-2 line-clamp-2">{post.excerpt}</p>
            <span className="inline-flex mt-3 text-sm font-medium text-[var(--color-text-strong)] group-hover:underline decoration-1 underline-offset-4">Read more →</span>
          </Link>
        ))}
      </div>
    </AcademicShell>
  );
}
