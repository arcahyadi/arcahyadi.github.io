"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useLocale } from "@/i18n/LocaleProvider";

export function LegalSection() {
  const { copyright, company } = siteConfig.legal;
  const { t } = useLocale();
  const links = [
    { label: t.legal.links.portfolio, href: "/portfolio" },
    { label: t.legal.links.blogs, href: "/blogs" },
    { label: t.legal.links.cv, href: "/cv" },
  ];

  return (
    <div
      data-component="legal"
      className="text-[var(--color-text-weak)] text-sm flex items-center justify-center gap-6 md:gap-8 flex-wrap py-6"
    >
      <span>
        {copyright}{" "}
        <a
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-weak)] hover:text-[var(--color-text)] hover:underline decoration-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded"
        >
          {company.label}
        </a>
      </span>
      {links.map((link) => (
        <span key={link.href}>
          <Link
            href={link.href}
            className="text-[var(--color-text-weak)] hover:text-[var(--color-text)] hover:underline decoration-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded"
          >
            {link.label}
          </Link>
        </span>
      ))}

      <LanguagePicker />
    </div>
  );
}
