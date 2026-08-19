"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "../shared/icons";
import { siteConfig } from "@/site.config";

export function LegalSection() {
  const { copyright, company, links, defaultLanguage } = siteConfig.legal;
  const languages = siteConfig.legal.languages as unknown as { name: string; code: string }[];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          className="text-[var(--color-text-weak)] hover:text-[var(--color-text)] hover:underline decoration-1"
        >
          {company.label}
        </a>
      </span>
      {links.map((link) => (
        <span key={link.label}>
          <Link
            href={link.href}
            className="text-[var(--color-text-weak)] hover:text-[var(--color-text)] hover:underline decoration-1"
          >
            {link.label}
          </Link>
        </span>
      ))}

      {/* Language Picker — tampil hanya kalau siteConfig.legal.languages ada isi */}
      {languages.length > 0 ? (
        <span className="relative inline-block" ref={dropdownRef}>
        <div data-component="language-picker">
          <div data-component="dropdown">
            <button
              data-slot="trigger"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-[var(--color-text-weak)] hover:text-[var(--color-text)] cursor-pointer text-sm bg-transparent border-0 p-0"
            >
              <span>{selectedLanguage}</span>
              <span className="mt-0.5">
                <ChevronDownIcon />
              </span>
            </button>

            {dropdownOpen && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 max-h-60 overflow-y-auto bg-[var(--color-background)] border border-[var(--color-border-weak)] rounded-[6px] shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs hover:bg-[var(--color-background-weak)] cursor-pointer transition-colors ${
                      selectedLanguage === lang.name
                        ? "text-[var(--color-text-strong)] font-semibold"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        </span>
      ) : null}
    </div>
  );
}
