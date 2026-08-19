"use client";

import React, { useEffect, useId, useRef, useState, useCallback } from "react";
import { localeFlags, localeLabels, localeNativeNames, locales } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguagePicker() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const componentId = useId();
  const ref = useRef<HTMLSpanElement>(null);
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
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) setOpen(false);
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

  const labelledById = `${componentId}-label`;
  const menuId = `${componentId}-menu`;

  return (
    <span className="relative inline-block" ref={ref} data-component="language-picker">
      <span id={labelledById} className="sr-only">
        {t.legal.languagePickerAriaLabel}
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${t.legal.languagePickerAriaLabel}: ${localeNativeNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        title={localeNativeNames[locale]}
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
        className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent border-0 text-xl leading-none hover:bg-[var(--color-background-weak)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
      >
        <span aria-hidden="true">{localeFlags[locale]}</span>
      </button>

      {open ? (
        <div
          id={menuId}
          ref={listRef}
          role="menu"
          aria-labelledby={labelledById}
          className="absolute top-full right-0 mt-2 flex w-[5.5rem] overflow-hidden bg-[var(--color-background)] border border-[var(--color-border-weak)] rounded-[6px] shadow-lg p-1 z-[60]"
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
                title={localeNativeNames[code]}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLocale(code);
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
                    const idx = items.indexOf(e.currentTarget);
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
                className={`flex h-9 flex-1 items-center justify-center rounded text-xl leading-none hover:bg-[var(--color-background-weak)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border)] ${
                  selected ? "bg-[var(--color-background-weak)]" : "bg-transparent"
                }`}
              >
                <span aria-hidden="true">{localeFlags[code]}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </span>
  );
}
