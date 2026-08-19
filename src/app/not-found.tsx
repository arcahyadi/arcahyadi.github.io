"use client";

import Link from "next/link";

import { useLocale } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-[24px] font-bold text-[var(--color-text-strong)]">{t.notFound.title}</h1>
      <p className="text-sm text-[var(--color-text)] mt-2 max-w-[32rem]">{t.notFound.subtitle}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] text-[var(--color-text-inverted)] rounded font-medium text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
      >
        {t.notFound.backHome}
      </Link>
    </main>
  );
}
