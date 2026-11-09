# arcahyadi.github.io

Situs layanan jaringan, server, backend, dan otomasi, beserta portofolio dan catatan teknis.
Dibangun dengan **Next.js 16 + React 19 + Tailwind 4 + TypeScript**, static export untuk GitHub Pages.
Tersedia dalam bahasa Indonesia dan Inggris pada URL yang sama. Konten disimpan dalam file TypeScript.

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
| `npm run validate:export` | Setelah build: cek URL artikel lama, label footer Indonesia dan satu tombol email di bagian kontak |

## Privasi

Repo ini hanya memuat identitas publik yang diperlukan untuk kontak:

- Nama tampilan dan alamat surel
- Tautan GitHub dan form kontak
- Studi kasus yang sudah dianonimkan (tanpa nama klien, hostname, alamat IP internal atau kredensial)

Jangan menambahkan riwayat pribadi, data klien, konfigurasi produksi, atau kredensial ke repo ini.
Konfigurasi jaringan di catatan memakai rentang alamat dokumentasi.

## Deploy

Workflow GitHub Pages ada di `.github/workflows/deploy.yml`: `npm ci` lalu `npm run build`, hasil `out/` diunggah sebagai artifact. Di GitHub, set **Settings → Pages → Source: GitHub Actions**.

Cloudflare Workers Builds juga mengikuti branch `main` dari repo ini untuk `arcahyadi.my.id`. Proses tersebut menjalankan `npm run build`, lalu mengunggah `out/` dengan Wrangler. Nama Worker, compatibility date, dan direktori aset ditentukan oleh perintah deploy di Workers Builds. `wrangler.jsonc` menetapkan `preview_urls: false` agar deploy tidak membuka kembali URL versi lama yang masih berisi konten pribadi.

`public/CNAME` berisi domain kustom. Jangan hapus `.nojekyll` agar `_next/` dapat disajikan.

### HTTPS

Redirect HTTP ke HTTPS diatur di Cloudflare khusus untuk `arcahyadi.me` dan `www.arcahyadi.me`. Respons HTTP harus berstatus `301` dengan path dan query string yang sama pada URL HTTPS. Subdomain lain tidak termasuk aturan ini.

GitHub Pages belum mengizinkan opsi **Enforce HTTPS** karena sertifikat untuk domain kustom belum tersedia di origin. HTTPS publik dan redirect ditangani oleh Cloudflare; pengaturan sertifikat origin perlu ditinjau terpisah. Redirect di `next.config.ts` tidak berlaku untuk static export.

## Kredit

Struktur konten terinspirasi [academicpages.github.io](https://academicpages.github.io). Desain awal mengacu pada [opencode.ai](https://opencode.ai).
