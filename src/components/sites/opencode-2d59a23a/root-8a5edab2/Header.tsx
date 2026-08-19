"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { HamburgerIcon, CloseIcon } from "../shared/icons";
import { siteConfig } from "@/site.config";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/i18n/LocaleProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { site, author } = siteConfig;
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";
  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };
  const nav = [
    { label: t.nav.portfolio, href: "/portfolio" },
    { label: t.nav.blogs, href: "/blogs" },
    { label: t.nav.cv, href: "/cv" },
  ];

  return (
    <section
      data-component="top"
      className="sticky top-0 z-50 flex items-center justify-between h-20 min-h-[80px] bg-[var(--color-background)] border-b border-[var(--color-border-weak)] px-6 md:px-20"
    >
      <div>
        <Link href="/" className="block hover:opacity-80 transition-opacity" aria-label={t.header.homeAriaLabel}>
          <span className="text-[15px] md:text-base font-bold tracking-tight text-[var(--color-text-strong)]">
            {site.shortTitle || author.name || site.name}
          </span>
        </Link>
      </div>

      {/* Desktop Nav + Theme Toggle */}
      <div className="hidden md:flex items-center gap-4">
        <nav data-component="nav-desktop" aria-label={t.header.navAriaLabel}>
          <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0 text-base">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text)] hover:text-[var(--color-text-strong)] hover:underline hover:underline-offset-4 decoration-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            data-component="theme-toggle"
            aria-label={isDark ? t.header.themeLightLabel : t.header.themeDarkLabel}
            title={isDark ? t.header.themeLightLabel : t.header.themeDarkLabel}
            onClick={handleThemeToggle}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-icon)] hover:bg-[var(--color-background-weak)] hover:text-[var(--color-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] transition-colors"
          >
            <span className="sr-only">{t.header.toggleThemeSr}</span>
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <LanguagePicker />
        </div>
      </div>

      {/* Mobile: Theme Toggle + Nav Toggle */}
      <nav data-component="nav-mobile" className="flex md:hidden items-center gap-1" aria-label={t.header.navMobileAriaLabel}>
        <button
          type="button"
          data-component="theme-toggle"
          aria-label={isDark ? t.header.themeLightLabel : t.header.themeDarkLabel}
          title={isDark ? t.header.themeLightLabel : t.header.themeDarkLabel}
          onClick={handleThemeToggle}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-icon)] hover:bg-[var(--color-background-weak)] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
        >
          <span className="sr-only">{t.header.toggleThemeSr}</span>
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
        <LanguagePicker />
        <button
          type="button"
          data-component="nav-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-mobile-menu"
          aria-label={mobileMenuOpen ? t.header.closeMenuLabel : t.header.openMenuLabel}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center -mr-2 text-[var(--color-icon)] hover:bg-[var(--color-background-weak)] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
        >
          <span className="sr-only">{t.header.toggleMenuSr}</span>
          {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {mobileMenuOpen && (
          <div
            id="nav-mobile-menu"
            className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] bg-[var(--color-background)] border-b border-[var(--color-border-weak)] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <ul className="list-none py-5 m-0 px-0">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-5 px-6 text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] text-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </section>
  );
}
