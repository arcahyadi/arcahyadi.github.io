import Link from "next/link";
import { siteConfig } from "@/site.config";
import { AcademicShell } from "@/components/academic/AcademicShell";
import { Markdown } from "@/components/Markdown";

export function generateStaticParams() {
  return siteConfig.portfolio.map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = siteConfig.portfolio.find((p) => p.slug === slug);
  if (!item) return <AcademicShell withSidebar={false} title="Not found" subtitle="Portfolio item not found."> <Link href="/portfolio" className="text-[var(--color-text-strong)] underline">← Back to Portfolio</Link> </AcademicShell>;

  return (
    <AcademicShell withSidebar={false} title={item.title} subtitle={`${item.date} · ${item.tags.join(" · ")}`}>
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline mb-6 no-underline">
        ← Back to Portfolio
      </Link>
      <article className="max-w-none"><Markdown content={item.content} /></article>
      <div className="flex flex-wrap gap-3 mt-8">
        {item.links.github ? (
          <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border-weak)] rounded text-sm font-medium text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] no-underline">
            GitHub
          </a>
        ) : null}
        {item.links.demo && item.links.demo !== "#" ? (
          <a href={item.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-background-strong)] text-[var(--color-text-inverted)] rounded text-sm font-medium hover:bg-[var(--color-background-strong-hover)] no-underline">
            Live Demo
          </a>
        ) : null}
      </div>
    </AcademicShell>
  );
}
