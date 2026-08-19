# Personal Academic Site — Next.js Template

Template website personal / akademik berbasis **Next.js 16 + React 19 + Tailwind 4 + TypeScript**, desain bold mono ala [opencode.ai](https://opencode.ai) tapi kontennya akademik ala [academicpages.github.io](https://academicpages.github.io) / [arcahyadi.me](https://arcahyadi.me).

Static export ready — deploy ke **GitHub Pages** tanpa server.

**Live structure:** Landing personal `/` + `Portfolio` + `Blogs` + `CV`. Edit konten cukup 1 file TypeScript per koleksi, hot-reload langsung. Header kiri sekarang **teks Your Name** dari config (klik balik ke `/`), avatar hero/sidebar dari `public/avatar.jpg`.

---

## Quick Start

```bash
# 1. Clone / Use this template
git clone <url-repo-kamu> my-site
cd my-site

# 2. Install
npm install

# 3. Jalankan dev server
npm run dev
# buka http://localhost:3000
```

Edit file apapun di `src/` — browser auto-reload.

## Commands

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Dev server (Turbopack) di `http://localhost:3000` |
| `npm run build` | Build static export ke folder `out/` (19 halaman default) |
| `npm run start` | Preview production (kalau tidak pakai `output: export`) |
| `npm run lint` | ESLint |

> Build default = **static export** (`next.config.ts: output: "export"`). Hasilnya folder `out/` siap upload ke GitHub Pages / hosting statis lain. Tidak butuh Node server.

---

## Cara Pakai Template (Kustomisasi)

Semua konten terpusat dan type-safe (TypeScript, bukan YAML). Tidak perlu parser tambahan.

### 1. Ganti identitas site & author

Edit **`src/site.config.ts`** → bagian `site` dan `author`:

```ts
site: {
  name: "Aufa Personal Page",
  title: "Aufa R Cahyadi — Networking · SysAdmin · Backend", // dipakai <title> tab browser
  shortTitle: "Aufa R Cahyadi", // Your Name di header kiri (klik → /)
  description: "Deskripsi untuk SEO / OpenGraph",
  url: "https://arcahyadi.me",
  // logo file sudah tidak dipakai — header sekarang teks (site.shortTitle || author.name)
  // kalau mau pakai gambar lagi, edit src/components/sites/.../Header.tsx
  logo: "/logo.svg",
  logoAlt: "Aufa R Cahyadi",
},
author: {
  name: "Aufa R Cahyadi",        // fallback Your Name kalau shortTitle kosong
  role: "Network Technician · SysAdmin · Programmer",
  bio: "Bio singkat",
  location: "Earth",
  avatar: "/avatar.jpg",         // foto bulat hero + sidebar — taruh file di public/
  email: "kamu@email.com",
  links: [
    { label: "GitHub", href: "https://github.com/kamu", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kamu", icon: "linkedin" },
    // tambah/hapus sesuka kamu
  ],
},
```

**Your Name di header:** komponen `src/components/sites/opencode-2d59a23a/root-8a5edab2/Header.tsx` render `site.shortTitle || author.name || site.name` di dalam `<Link href="/">` — jadi klik nama balik ke halaman awal. Ganti `shortTitle` di config untuk ubah teksnya. Hover `opacity-80` sebagai feedback.

**Avatar bulat (hero + sidebar):** copy foto ke `public/avatar.jpg` (bisa `.png/.jpg/.webp/.svg` — cukup tulis path di `author.avatar`). Kosongkan `author.avatar = ""` untuk sembunyikan. Override khusus hero: `home.hero.avatar = "/avatar-hero.jpg"` atau `""` untuk ikut `author.avatar`.

Ganti `public/avatar.jpg` dengan fotomu sendiri — contoh sudah ada `public/avatar.jpg` (Bumi, 1 MB). `public/social-share.png` tetap ada untuk OG image, tapi tidak lagi dipakai sebagai avatar.

### 2. Edit homepage (landing `/`)

Masih di **`src/site.config.ts`** → bagian `home`:

```ts
home: {
  hero: {
    avatar: "", // "" = pakai author.avatar; isi "/avatar-hero.jpg" kalau mau beda
    eyebrow, title, subtitle, ctaPrimary, ctaSecondary
  },
  whatIDo: { title, items: [{ title, description }] },
  featured: { portfolioTitle, blogsTitle, ... },
  stack: { title, groups: [{ label, items }] },
  contact: { title, subtitle, email, ctaLabel },
}
```

- `hero.avatar` = override avatar hero (opsional)
- `ctaPrimary/ctaSecondary` = tombol hero (default ke `/portfolio` dan `/cv`)
- `whatIDo.items` = 4 kartu keahlian
- `stack.groups` = tech stack per kategori

Komponen render ada di `src/components/home/HomeSections.tsx` (`HomeHero` pakai `hero.avatar || author.avatar` + conditional `img`) — tetap pakai style bold mono, cukup ubah datanya di config.

### 3. Header navigation

Di `src/site.config.ts` → `header.nav`:

```ts
header: {
  nav: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blogs", href: "/blogs" },
    { label: "CV", href: "/cv" },
  ],
}
```

### 4. Tambah / edit Portfolio

Edit **satu file saja**: **`src/content/portfolio.ts`**

Mirip `_portfolio/` di academicpages — 1 object = 1 project:

```ts
export const portfolio = [
  {
    slug: "my-project",              // unik, jadi URL /portfolio/my-project
    title: "Judul Project",
    excerpt: "Ringkasan 1 baris",
    date: "2024-08-01",
    tags: ["Networking", "Go"],
    image: "/social-share.png",
    content: `Deskripsi panjang pakai **markdown**.
    Bisa heading, list, tabel, code fence, link [PDF](/files/file.pdf).`,
    links: { github: "https://github.com/...", demo: "https://..." },
  },
  // duplikat object untuk project baru
]
```

`slug` harus unik. `content` mendukung markdown (render via `src/components/Markdown.tsx`).

### 5. Tambah / edit Blogs

Edit **`src/content/blogs.ts`** — sama seperti portfolio:

```ts
{
  slug: "my-first-post",             // jadi /blogs/my-first-post
  title: "Judul Blog",
  date: "2026-01-15",
  excerpt: "Cuplikan untuk listing",
  tags: ["homelab", "tutorial"],
  content: `Isi penuh markdown...
  ## Heading
  - list
  | col | col |
  |-----|-----|
  \`\`\`bash
  echo "code fence"
  \`\`\`
  <div class="mermaid">graph LR ...</div>  // placeholder mermaid
  `,
}
```

Untuk impor massal dari Jekyll (`_posts/*.md`) ada script generator: `/.jcode/scratch/gen_arcahyadi.py` — parse frontmatter + body lalu timpa `blogs.ts`.

### 6. Edit CV

Edit **`src/content/cv.ts`**:

```ts
export const cv = {
  headline: "Network Technician · SysAdmin",
  summary: "Ringkasan 1 paragraf",
  pdfUrl: "/files/cv.pdf",           // taruh PDF di public/files/
  education: [{ degree, school, year, details }],
  experience: [{ role, org, period, bullets: [] }],
  skills: { networking: [], programming: [], infra: [], automation: [] },
  certifications: ["... — /portfolio/portfolio-1/"],
  interests: ["..."],
}
```

Halaman CV ada di `src/app/cv/page.tsx` (render dari `cv` di atas).

### 7. File & gambar

- Avatar hero/sidebar → `public/avatar.jpg` (sudah ter-commit; ganti dengan timpa file + `author.avatar = "/avatar.jpg"` di `site.config.ts`; `home.hero.avatar` opsional untuk beda)
- Favicon / OG / icon → `public/favicon*`, `apple-touch-icon*`, `site.webmanifest`, `social-share.png`
- `public/logo.svg` masih ada tapi **tidak dipakai** (header sekarang teks) — hapus aman, atau edit `Header.tsx` kalau mau pakai gambar lagi
- PDF sertifikat / CV → `public/files/` lalu link `/files/namafile.pdf`
- `.nojekyll` sudah ada di `public/.nojekyll` — jangan dihapus (agar `_next/` ke-serve di GitHub Pages)
- `public/CNAME` berisi `arcahyadi.me` — jangan dihapus kalau pakai custom domain

---

## Struktur Project

```
src/
  site.config.ts          # ← SINGLE SOURCE OF TRUTH (site, author, header, home)
                          #   site.title/shortTitle → <title> + Your Name header (Link /)
                          #   author.avatar + home.hero.avatar → foto bulat
  content/
    blogs.ts              # ← koleksi Blogs (1 file = semua post)
    portfolio.ts          # ← koleksi Portfolio
    cv.ts                 # ← data CV
  app/
    page.tsx              # landing / (HomeHero, WhatIDo, Featured, Stack, Contact)
    layout.tsx            # font mono + metadata (title dari site.title)
    globals.css           # design tokens (hsl vars, dark mode)
    blogs/page.tsx        # listing blogs
    blogs/[slug]/page.tsx # detail blog (Markdown)
    portfolio/page.tsx
    portfolio/[slug]/page.tsx
    cv/page.tsx
  components/
    Markdown.tsx          # renderer markdown tanpa deps (headings, table, code, mermaid placeholder)
    academic/
      AcademicShell.tsx   # layout Header + sidebar opsional + Footer/Legal
      AuthorSidebar.tsx   # sidebar ala arcahyadi.me — conditional img kalau author.avatar kosong
    home/
      HomeSections.tsx    # 6 section homepage (HomeHero conditional avatar)
    sites/opencode-...    # Header + Footer/Legal dari clone opencode (dipakai)
public/
  avatar.jpg              # foto bulat hero + sidebar (baru)
  .nojekyll, CNAME        # Pages + custom domain
  social-share.png, favicon*, site.webmanifest, files/, logo.svg (legacy header teks)
next.config.ts            # output: "export", images.unoptimized, trailingSlash
.github/workflows/deploy.yml  # GH Pages: build → upload artifact → deploy
```

*Catatan bersih-bersih:* 8 section opencode tidak dipakai (`HeroSection`, `WhatSection`, `GrowthSection`, `PrivacySection`, `VideoSection`, `FaqSection`, `ZenCtaSection`, `EmailSection`) + blok `site.config` (`hero/video/what/growth/privacy/faq/zen/email`) + asset video 9.9 MB `public/sites/*.mp4` sudah dihapus — tidak dipakai landing personal. `docs/` + `scripts/` clone helpers di-`gitignore` (tetap di lokal, tidak di-push).

**Prinsip:** `site.config.ts` import `portfolio/blogs/cv` dari `content/` lalu re-export sebagai `siteConfig`. Semua halaman import `siteConfig` — jadi edit 1 tempat, semua ke-update. Mirip `_config.yml` + collections di academicpages, tapi type-safe.

---

## Deploy

### GitHub Pages (disarankan)

Sudah siap — workflow ada di `.github/workflows/deploy.yml`.

1. Push repo ke GitHub (`main` atau `master` — keduanya di-sync).
2. Di GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push lagi ke `main` → Actions akan `npm ci` → `npm run build` → upload `out/` → deploy.
4. Untuk custom domain (`arcahyadi.me`): Settings → Pages → Custom domain → isi domain → `public/CNAME` sudah berisi `arcahyadi.me` (jangan hapus, biar tidak hilang tiap build).

Lokal test export:

```bash
npm run build
npx serve out   # atau python3 -m http.server --directory out 8000
```

### Vercel / Netlify / Cloudflare Pages

Bisa juga tanpa `output: export`:

1. Hapus `output: "export"` di `next.config.ts` (atau set `output` conditional).
2. Deploy biasa — platform akan `next build` sebagai SSR/SSG hybrid.

Untuk hosting statis murni, biarkan `output: export` — hasilnya universal.

---

## Markdown yang didukung

`src/components/Markdown.tsx` tanpa dependency tambahan, support:

- Heading `#`–`####`, bold `**`, inline code `` ` `` , link `[label](url)`, `hr` (`---`)
- List unordered/ordered, blockquote `>`, tabel `| |` + separator `---`
- Code fence ` ```lang ` dengan label bahasa
- Raw HTML `<div class="mermaid">` → render sebagai placeholder pre (butuh JS mermaid kalau mau grafik interaktif — tinggal ganti placeholder)
- HTML lain di-pass sebagai `dangerouslySetInnerHTML`

Kalau butuh full MDX / syntax highlight, ganti `Markdown.tsx` dengan `react-markdown` + `rehype-highlight` (tambah deps).

---

## Troubleshooting

**Build error `output: export` + image optimization** → sudah `images: { unoptimized: true }`. Jangan pakai `next/image` optimization di export.

**Halaman 404 di GitHub Pages setelah refresh** → sudah `trailingSlash: true` + `public/.nojekyll`. Pastikan Pages source = GitHub Actions, bukan branch `gh-pages`.

**Sidebar Author tidak muncul** → sengaja `withSidebar={false}` di `src/app/{blogs,portfolio,cv}/page.tsx`. Ganti ke `true` atau pindahkan `AuthorSidebar` ke layout yang kamu mau.

**Avatar tidak muncul** → cek `author.avatar` di `site.config.ts` harus `"/avatar.jpg"` dan file ada di `public/avatar.jpg` (case-sensitive). `home.hero.avatar = ""` ikut `author.avatar`. Kalau `author.avatar = ""`, hero & sidebar sembunyikan `img`.

**Your Name header tidak ganti** → edit `site.shortTitle` di `site.config.ts` (header pakai `site.shortTitle || author.name`). Klik nama selalu ke `/`.

**Mau ganti font / warna** → edit `src/app/globals.css` (CSS vars `--color-*`, `--padding`, font `var(--font-mono)`).

---

## Kredit

- Desain awal clone [opencode.ai](https://opencode.ai) (bold mono, max-w 67.5rem, border-weak).
- Struktur konten terinspirasi [academicpages.github.io](https://academicpages.github.io) (collections `_portfolio`, `_posts`, `_pages` → `src/content/*.ts`).
- Konten contoh dari [arcahyadi.github.io](https://github.com/arcahyadi/arcahyadi.github.io).

Pakai bebas sebagai template — ganti `site.config.ts` + `src/content/*` + `public/` jadi punyamu.
