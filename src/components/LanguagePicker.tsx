"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDownIcon } from "./sites/opencode-2d59a23a/shared/icons";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguagePicker() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const focusItem = useCallback((index: number) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    if (!items || items.length === 0) return;
    const clamped = ((index % items.length) + items.length) % items.length;
    items[clamped]?.focus();
  }, []);

  const focusSelectedOrFirst = useCallback(() => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    if (!items || items.length === 0) return;
    const selectedIndex = Array.from(items).findIndex((el) => el.getAttribute("aria-checked") === "true");
    const target = selectedIndex >= 0 ? selectedIndex : 0;
    items[target]?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Focus selected item when menu opens
  useEffect(() => {
    if (!open) return;
    // next frame so DOM is mounted
    const id = requestAnimationFrame(() => focusSelectedOrFirst());
    return () => cancelAnimationFrame(id);
  }, [open, focusSelectedOrFirst, locale]);

  const labelledById = "language-picker-label";
  const menuId = "language-picker-menu";

  return (
    <span className="relative inline-block" ref={ref} data-component="language-picker">
      <span id={labelledById} className="sr-only">
        {t.legal.languagePickerAriaLabel}
      </span>
      <button
        ref={triggerRef}
        type="button"
        id="language-picker-button"
        aria-label={t.legal.languagePickerAriaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-labelledby={`${labelledById} language-picker-button`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
            else focusSelectedOrFirst();
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) setOpen(true);
            else focusSelectedOrFirst();
          }
          if (e.key === "Escape" && open) {
            e.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
        className="flex items-center gap-2 text-[var(--color-text-weak)] hover:text-[var(--color-text)] cursor-pointer text-sm bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)] rounded px-1 -mx-1"
      >
        <span>{localeLabels[locale]}</span>
        <span className="mt-0.5" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          ref={listRef}
          role="menu"
          aria-labelledby={labelledById}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 max-h-60 overflow-y-auto bg-[var(--color-background)] border border-[var(--color-border-weak)] rounded-[6px] shadow-lg py-1.5 z-50"
        >
          {locales.map((code) => {
            const selected = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                aria-label={`${localeLabels[code]}${selected ? ` (${t.common.selected})` : ""}`}
                onClick={() => {
                  setLocale(code as Locale);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLocale(code as Locale);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const items = Array.from(
                      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []
                    );
                    const idx = items.indexOf(e.currentTarget as HTMLButtonElement);
                    const next = e.key === "ArrowDown" ? idx + 1 : idx - 1;
                    focusItem(next);
                  }
                  if (e.key === "Home") {
                    e.preventDefault();
                    focusItem(0);
                  }
                  if (e.key === "End") {
                    e.preventDefault();
                    const items = listRef.current?.querySelectorAll('[role="menuitemradio"]');
                    focusItem((items?.length ?? 1) - 1);
                  }
                  if (e.key === "Tab") {
                    setOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-1.5 text-xs hover:bg-[var(--color-background-weak)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-[var(--color-background-weak)] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--color-border)] ${
                  selected ? "text-[var(--color-text-strong)] font-semibold" : "text-[var(--color-text)]"
                }`}
              >
                {localeLabels[code]}
                {selected ? <span className="ml-2" aria-hidden="true">✓</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </span>
  );
}
