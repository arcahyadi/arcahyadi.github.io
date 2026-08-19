import React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";

export function FooterSection() {
  const { links } = siteConfig.footer;
  return (
    <footer
      data-component="footer"
      className="border-t border-[var(--color-border-weak)] flex flex-wrap md:flex-nowrap"
    >
      {links.map((link, i) => {
        // responsive border logic preserved via index
        const borderClass =
          i === 0
            ? "flex-1 text-center border-b md:border-b-0 border-[var(--color-border-weak)] min-w-[50%] md:min-w-0"
            : i === 1
              ? "flex-1 text-center border-l border-b md:border-b-0 border-[var(--color-border-weak)] min-w-[50%] md:min-w-0"
              : "flex-1 text-center border-t md:border-t-0 md:border-l border-[var(--color-border-weak)] min-w-[33%] md:min-w-0";
        return (
          <div key={link.label} data-slot="cell" className={borderClass}>
            {"external" in link && link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-8 w-full text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] hover:underline hover:underline-offset-4 decoration-1 no-underline transition-colors"
              >
                {link.label}{"badge" in link && (link as unknown as {badge?: string}).badge ? <span className="text-[var(--color-text-weak)] hidden sm:inline">{(link as unknown as {badge?: string}).badge}</span> : null}
              </a>
            ) : (
              <Link
                href={link.href}
                className="block py-8 w-full text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] hover:underline hover:underline-offset-4 decoration-1 no-underline transition-colors"
              >
                {link.label}
              </Link>
            )}
          </div>
        );
      })}
    </footer>
  );
}
