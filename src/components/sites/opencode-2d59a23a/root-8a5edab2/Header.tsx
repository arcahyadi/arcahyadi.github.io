"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "../shared/icons";
import { siteConfig } from "@/site.config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { nav } = siteConfig.header;
  const { site, author } = siteConfig;

  return (
    <section
      data-component="top"
      className="sticky top-0 z-50 flex items-center justify-between h-20 min-h-[80px] bg-[var(--color-background)] border-b border-[var(--color-border-weak)] px-6 md:px-20"
    >
      <div>
        <Link href="/" className="block hover:opacity-80 transition-opacity" aria-label="Home">
          <span className="text-[15px] md:text-base font-bold tracking-tight text-[var(--color-text-strong)]">
            {site.shortTitle || author.name || site.name}
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav data-component="nav-desktop" className="hidden md:block">
        <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0 text-base">
          {nav.map((item) => (
            <li key={item.label}>
              {"external" in item && (item as { external?: boolean }).external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-text-strong)] hover:underline hover:underline-offset-4 decoration-1 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--color-text)] hover:text-[var(--color-text-strong)] hover:underline hover:underline-offset-4 decoration-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Nav Toggle */}
      <nav data-component="nav-mobile" className="block md:hidden">
        <button
          type="button"
          data-component="nav-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center -mr-2 text-[var(--color-icon)] hover:bg-[var(--color-background-weak)] rounded transition-colors"
        >
          <span className="sr-only">Toggle menu</span>
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
                  {"external" in item && (item as { external?: boolean }).external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-5 px-6 text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] text-lg no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-5 px-6 text-[var(--color-text-strong)] hover:bg-[var(--color-background-weak)] text-lg no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </section>
  );
}
