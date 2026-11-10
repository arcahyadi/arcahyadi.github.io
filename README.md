# arcahyadi.github.io

Situs ini memuat layanan jaringan, server, backend, dan otomasi, ditambah portofolio dan catatan teknis. Dibangun dengan Next.js 16, React 19, Tailwind 4, dan TypeScript. Hasil build berupa static export untuk GitHub Pages dan Cloudflare Workers.

Halaman tersedia dalam bahasa Indonesia dan Inggris tanpa URL terpisah. Konten disimpan sebagai file TypeScript.

## Struktur

```
src/
  site.config.ts           # identitas publik, tautan kontak, hero, layanan, footer
  content/
    blogs.ts               # catatan teknis (EN)
    portfolio.ts           # studi kasus anonim (EN)
  i18n/
    config.ts              # locale, htmlLang, isLocale
    translations.ts        # string UI EN/ID
    content.id.ts          # terjemahan konten per slug (strict parity)
    content-helpers.ts     # gabungkan konten EN dengan override ID
    LocaleProvider.tsx     # locale default id, aman saat hydration, sinkron <html lang>
  app/
    page.tsx               # beranda: hero, layanan, karya, catatan, toolkit, kontak
    layout.tsx             # font, metadata, tema terang sebagai default
    blogs/, portfolio/     # halaman daftar dan detail
    not-found.tsx          # 404
  components/
    Markdown.tsx           # renderer markdown tanpa dependensi
    LanguagePicker.tsx     # pemilih bahasa di header
    PageShell.tsx          # kerangka halaman daftar dan detail
    home/                  # bagian beranda dan form kontak
    sites/...              # header, footer, legal
```

`src/site.config.ts` mengimpor `portfolio` dan `blogs` dari `src/content/`, lalu mengekspor `siteConfig`. Semua halaman membaca data dari sana.

## Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Dev server (Turbopack) di `http://localhost:3000` |
| `npm run build` | Build static export ke `out/` |
| `npm run lint` | ESLint |
| `npm run validate:parity` | Validasi parity EN/ID: slug, field, struktur blok, code fence, URL, inline code, angka |
| `npm run validate:export` | Setelah build: cek URL artikel lama, label footer Indonesia, dan satu tombol email di bagian kontak |

## Privasi

Repo ini hanya memuat identitas publik yang diperlukan untuk kontak:

- Nama tampilan dan alamat surel
- Tautan GitHub dan form kontak
- Studi kasus yang sudah dianonimkan, tanpa nama klien, hostname, alamat IP internal, atau kredensial

Jangan menambahkan riwayat pribadi, data klien, konfigurasi produksi, atau kredensial ke repo ini. Catatan jaringan memakai alamat contoh, bukan alamat instalasi sebenarnya.

## Deploy

GitHub Pages membangun situs lewat `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, lalu `out/` diunggah sebagai artifact. Workflow memakai Node.js 24. Di GitHub, atur **Settings → Pages → Source: GitHub Actions**.

Cloudflare Workers Builds mengikuti branch `main` untuk `arcahyadi.my.id`. Build menjalankan `npm run build`, lalu mengunggah `out/` dengan Wrangler. Nama Worker, compatibility date, dan direktori aset ditentukan oleh perintah deploy di Workers Builds. `wrangler.jsonc` menetapkan `preview_urls: false` agar deploy tidak membuka kembali URL versi lama.

`public/CNAME` menyimpan domain kustom. Biarkan `.nojekyll` agar `_next/` dapat disajikan.

### HTTPS

Cloudflare mengalihkan HTTP ke HTTPS untuk `arcahyadi.me` dan `www.arcahyadi.me` dengan status `301`, sambil mempertahankan path dan query string. Subdomain lain tidak termasuk aturan ini.

GitHub Pages belum bisa mengaktifkan **Enforce HTTPS** karena sertifikat origin untuk domain kustom belum tersedia. Cloudflare menangani HTTPS publik; sertifikat origin perlu ditinjau terpisah. Redirect di `next.config.ts` tidak berlaku untuk static export.

## Kredit

Acuan desain awal: [opencode.ai](https://opencode.ai).
