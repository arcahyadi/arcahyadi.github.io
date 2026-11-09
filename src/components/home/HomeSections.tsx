"use client";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { ContactForm } from "./ContactForm";
import { useLocale } from "@/i18n/LocaleProvider";

export function HomeHero() {
  const { t } = useLocale();
  const hero = t.home.hero;
  return (
    <section className="px-6 py-12 md:px-20 md:py-16">
      <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-text-weak)] mb-2">{hero.eyebrow}</p>
      <h1 className="text-[26px] md:text-[36px] font-bold text-[var(--color-text-strong)] leading-tight tracking-tight max-w-[46rem]">{hero.title}</h1>
      <p className="text-[var(--color-text)] text-base md:text-lg leading-relaxed mt-3 max-w-[42rem]">{hero.subtitle}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <Link href={siteConfig.home.hero.ctaPrimary.href} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] text-[var(--color-text-inverted)] rounded font-medium text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
          {hero.ctaPrimary}
        </Link>
        <Link href={siteConfig.home.hero.ctaSecondary.href} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-border-weak)] hover:bg-[var(--color-background-weak)] text-[var(--color-text-strong)] rounded font-medium text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
          {hero.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useLocale();
  const services = t.home.services;
  return (
    <section id="services" className="border-t border-[var(--color-border-weak)] px-6 py-12 md:px-20 md:py-16 scroll-mt-20">
      <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] mb-2">{services.title}</h2>
      <p className="text-sm text-[var(--color-text)] mb-6 max-w-[42rem]">{services.subtitle}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {services.items.map((it, i) => (
          <div key={it.title} className="flex gap-4 p-5 border border-[var(--color-border-weak)] rounded-[6px] bg-[var(--color-background-weak)]/50">
            <span className="text-[var(--color-text-weak)] font-mono shrink-0 select-none" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold text-[var(--color-text-strong)] text-sm">{it.title}</h3>
              <p className="text-sm text-[var(--color-text)] leading-relaxed mt-1">{it.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedPortfolio() {
  const { portfolio, t } = useLocale();
  const featured = t.home.featured;
  const items = portfolio.slice(0, 3);
  return (
    <section className="border-t border-[var(--color-border-weak)] px-6 py-12 md:px-20 md:py-16">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h2 className="text-[18px] font-bold text-[var(--color-text-strong)]">{featured.portfolioTitle}</h2>
        <Link href="/portfolio" className="text-sm font-medium text-[var(--color-text-strong)] hover:underline underline-offset-4 decoration-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
          {featured.seeAll}
        </Link>
      </div>
      <p className="text-sm text-[var(--color-text)] mb-6">{featured.portfolioSubtitle}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <Link key={it.slug} href={`/portfolio/${it.slug}`} className="group block border border-[var(--color-border-weak)] rounded-[6px] p-5 hover:border-[var(--color-text-weak)] transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {it.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">{tag}</span>
              ))}
            </div>
            <h3 className="font-semibold text-[var(--color-text-strong)] text-sm leading-tight group-hover:underline underline-offset-4 decoration-1">{it.title}</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed mt-1.5 line-clamp-2">{it.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RecentBlogs() {
  const { blogs, t } = useLocale();
  const featured = t.home.featured;
  const posts = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  return (
    <section className="border-t border-[var(--color-border-weak)] px-6 py-12 md:px-20 md:py-16">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h2 className="text-[18px] font-bold text-[var(--color-text-strong)]">{featured.blogsTitle}</h2>
        <Link href="/blogs" className="text-sm font-medium text-[var(--color-text-strong)] hover:underline underline-offset-4 decoration-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
          {featured.browseAll}
        </Link>
      </div>
      <p className="text-sm text-[var(--color-text)] mb-6">{featured.blogsSubtitle}</p>
      <div className="grid gap-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blogs/${p.slug}`} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 border-b border-[var(--color-border-weak)] last:border-0 no-underline hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded">
            <span className="text-xs font-mono text-[var(--color-text-weak)] shrink-0">{p.date}</span>
            <h3 className="font-medium text-[var(--color-text-strong)] text-sm flex-1 group-hover:underline underline-offset-4 decoration-1 leading-tight">{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TechStack() {
  const { t } = useLocale();
  const stack = t.home.stack;
  return (
    <section className="border-t border-[var(--color-border-weak)] px-6 py-12 md:px-20 md:py-16">
      <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] mb-6">{stack.title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {stack.groups.map((g) => (
          <div key={g.label}>
            <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--color-text-weak)] mb-2">{g.label}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="text-xs font-mono px-2.5 py-1.5 rounded-full bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  const { t } = useLocale();
  const contact = t.home.contact;
  const email = siteConfig.home.contact.email;
  return (
    <section id="contact" className="border-t border-[var(--color-border-weak)] px-6 py-12 md:px-20 md:py-16 scroll-mt-20">
      <h2 className="text-[18px] font-bold text-[var(--color-text-strong)] mb-2">{contact.title}</h2>
      <p className="text-sm text-[var(--color-text)] leading-relaxed max-w-[42rem] mb-6">{contact.subtitle}</p>
      <ContactForm />
      <div className="flex flex-wrap gap-3 mt-6">
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] text-[var(--color-text-inverted)] rounded font-medium text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
          {contact.ctaLabel}
        </a>
        {siteConfig.author.links.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-weak)] hover:bg-[var(--color-background-weak)] text-[var(--color-text-strong)] rounded font-medium text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]">
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
