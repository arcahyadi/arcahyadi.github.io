import Link from "next/link";
import { siteConfig } from "@/site.config";

export function AuthorSidebar() {
  const { author } = siteConfig;
  return (
    <aside className="w-full md:w-[240px] shrink-0 md:sticky md:top-24 self-start">
      <div className="flex flex-col gap-4 p-6 md:p-0">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          {author.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.avatar}
              alt={author.name}
              width={80}
              height={80}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border border-[var(--color-border-weak)] bg-[var(--color-background-weak)]"
            />
          ) : null}
          <div>
            <h2 className="text-[15px] font-bold text-[var(--color-text-strong)] leading-tight">{author.name}</h2>
            <p className="text-xs text-[var(--color-text)] leading-relaxed mt-0.5">{author.role}</p>
          </div>
        </div>

        <p className="text-sm text-[var(--color-text)] leading-relaxed hidden md:block">{author.bio}</p>

        <ul className="list-none p-0 m-0 flex flex-col gap-1.5 text-sm">
          <li className="flex items-center gap-2 text-[var(--color-text-weak)]">
            <span className="text-[11px]">📍</span> {author.location}
          </li>
          {author.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline decoration-1 transition-colors"
              >
                <span className="text-[11px]">↗</span> {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${author.email}`} className="flex items-center gap-2 text-[var(--color-text-weak)] hover:text-[var(--color-text-strong)] hover:underline decoration-1">
              <span className="text-[11px]">✉</span> Email
            </a>
          </li>
        </ul>

        <Link
          href="/cv"
          className="hidden md:inline-flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] text-[var(--color-text-inverted)] rounded text-sm font-medium no-underline transition-colors"
        >
          View CV
        </Link>
      </div>
    </aside>
  );
}
