# arcahyadi.github.io

Halaman pribadi: showcase layanan jaringan, server, backend dan otomasi, plus catatan teknis.
Dibangun dengan **Next.js 16 + React 19 + Tailwind 4 + TypeScript**, static export untuk GitHub Pages.
Bilingual EN/ID, URL tetap, konten dari file TypeScript.

## Struktur

```
src/
  site.config.ts           # identitas publik, link kontak, hero, layanan, footer
  content/
    blogs.ts               # catatan teknis (EN)
    portfolio.ts           # studi kasus anonim (EN)
  i18n/
    config.ts              # locale, htmlLang, isLocale
    translations.ts        # string UI EN/ID
    content.id.ts          # terjemahan konten per slug (strict parity)
    content-helpers.ts     # gabungkan konten mentah + override locale
    LocaleProvider.tsx     # locale default id, hydration-safe, sinkron <html lang>
  app/
    page.tsx               # beranda: hero, layanan, karya, catatan, toolkit, kontak
    layout.tsx             # font, metadata, default light theme
    blogs/, portfolio/     # listing + detail
    not-found.tsx          # 404
  components/
    Markdown.tsx           # renderer markdown tanpa dependensi
    LanguagePicker.tsx     # picker bahasa di header
    home/                  # HomeSections, ContactForm
    academic/AcademicShell.tsx
    sites/...              # Header, Footer, Legal
```

`site.config.ts` mengimpor `portfolio` dan `blogs` dari `src/content/` lalu mengekspor `siteConfig`; semua halaman membaca dari sana.

## Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Dev server (Turbopack) di `http://localhost:3000` |
| `npm run build` | Build static export ke `out/` |
| `npm run lint` | ESLint |
| `npm run validate:parity` | Validasi parity EN/ID: slug, field, struktur blok, code fence, URL, inline code, angka |

## Privasi

Repo ini hanya memuat identitas publik yang diperlukan untuk kontak:

- Nama tampilan dan alamat surel
- Tautan GitHub dan form kontak
- Studi kasus yang sudah dianonimkan (tanpa nama klien, hostname, alamat IP internal atau kredensial)

Jangan menambahkan riwayat pribadi, data klien, konfigurasi produksi, atau kredensial ke repo ini.
Konfigurasi jaringan di catatan memakai rentang alamat dokumentasi.

## Deploy

Workflow GitHub Pages ada di `.github/workflows/deploy.yml`: `npm ci` lalu `npm run build`, hasil `out/` diunggah sebagai artifact. Di GitHub, set **Settings → Pages → Source: GitHub Actions**.

`public/CNAME` berisi domain kustom. Jangan hapus `.nojekyll` agar `_next/` dapat disajikan.

## Kredit

Struktur konten terinspirasi [academicpages.github.io](https://academicpages.github.io). Desain awal mengacu pada [opencode.ai](https://opencode.ai).
