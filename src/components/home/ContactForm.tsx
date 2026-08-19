"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Web3Forms access key — ganti di src/site.config.ts -> home.contact.web3formsKey
  // Daftar gratis 1 menit: https://web3forms.com -> Get Started -> copy Access Key
  // Alternatif tanpa daftar: ganti action ke https://formsubmit.co/arcahyadi.dev@gmail.com (lihat komentar di bawah)
  const accessKey = (siteConfig.home.contact as { web3formsKey?: string }).web3formsKey || "";

  const isConfigured = accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConfigured) {
      setStatus("error");
      setErrorMsg("Form belum dikonfigurasi. Buat Access Key di web3forms.com lalu isi di src/site.config.ts -> home.contact.web3formsKey");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    // honeypot
    if (data.get("botcheck")) {
      setStatus("success");
      form.reset();
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    data.set("access_key", accessKey);
    data.set("subject", `New message from ${data.get("name") || "arcahyadi.me"}`);
    data.set("from_name", String(data.get("name") || "arcahyadi.me contact"));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Gagal mengirim. Coba lagi atau email langsung.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Gagal koneksi. Coba lagi atau email langsung.");
    }
  }

  return (
    <div className="mt-8 max-w-[42rem]">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {/* honeypot */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-[var(--color-text-weak)]">Nama</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Nama kamu"
              className="w-full px-3 py-2.5 rounded border border-[var(--color-border-weak)] bg-[var(--color-background)] text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text-weak)] focus:outline-none focus:border-[var(--color-text-weak)] focus:ring-1 focus:ring-[var(--color-border-weak)]"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-[var(--color-text-weak)]">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="kamu@email.com"
              className="w-full px-3 py-2.5 rounded border border-[var(--color-border-weak)] bg-[var(--color-background)] text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text-weak)] focus:outline-none focus:border-[var(--color-text-weak)] focus:ring-1 focus:ring-[var(--color-border-weak)]"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono text-[var(--color-text-weak)]">Pesan</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Halo Aufa, ..."
            className="w-full px-3 py-2.5 rounded border border-[var(--color-border-weak)] bg-[var(--color-background)] text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text-weak)] focus:outline-none focus:border-[var(--color-text-weak)] focus:ring-1 focus:ring-[var(--color-border-weak)] resize-y"
          />
        </label>

        <div className="flex items-center gap-3 mt-1">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-text-inverted)] rounded font-medium text-sm transition-colors"
          >
            {status === "loading" ? "Mengirim..." : "Kirim pesan"}
          </button>
          <span className="text-xs font-mono text-[var(--color-text-weak)]">atau email langsung ↓</span>
        </div>

        {!isConfigured ? (
          <p className="text-xs leading-relaxed text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded px-3 py-2 bg-amber-50 dark:bg-amber-950/30">
            Form siap tapi butuh <strong>Web3Forms Access Key</strong>. Daftar gratis di{" "}
            <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline">
              web3forms.com
            </a>{" "}
            lalu isi <code>home.contact.web3formsKey</code> di <code>src/site.config.ts</code>. Alternatif tanpa daftar: ganti fetch URL ke{" "}
            <code>https://formsubmit.co/arcahyadi.dev@gmail.com</code>.
          </p>
        ) : null}

        {status === "success" ? (
          <p className="text-sm text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded px-3 py-2 bg-green-50 dark:bg-green-950/30">
            Thanks! Pesan terkirim — aku akan balas secepatnya. Bisa juga hubungi langsung via Email di bawah.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded px-3 py-2 bg-red-50 dark:bg-red-950/30">
            {errorMsg}
          </p>
        ) : null}
      </form>
    </div>
  );
}
