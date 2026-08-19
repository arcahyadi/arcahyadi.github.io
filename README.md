# Personal Academic Site — Next.js Template

Template website personal / akademik berbasis **Next.js 16 + React 19 + Tailwind 4 + TypeScript**, desain bold mono ala [opencode.ai](https://opencode.ai) tapi kontennya akademik ala [academicpages.github.io](https://academicpages.github.io) / [arcahyadi.me](https://arcahyadi.me).

Static export ready — deploy ke **GitHub Pages** tanpa server. **Bilingual EN/ID** siap pakai, dilengkapi kontrol keyboard dan atribut ARIA, kompatibel dengan static export, dan tidak mengubah URL.

**Live structure:** Landing personal `/` + `Portfolio` + `Blogs` + `CV`. Edit konten cukup 1 file TypeScript per koleksi, hot-reload langsung. Header kiri sekarang **teks Your Name** dari config (klik balik ke `/`), avatar hero/sidebar dari `public/avatar.jpg`.

---

## Bilingual EN/ID — Architecture, Editing, Validation

**Arsitektur:** `src/i18n/` adalah single source untuk locale.

- `src/i18n/config.ts` — daftar locale (`en`, `id`), tipe `Locale`, label, `htmlLang`, `STORAGE_KEY="locale"`, helper `isLocale`. Default `en`.
- `src/i18n/translations.ts` — dictionary type-safe `Dictionary` untuk semua string UI (nav, hero, What I do, featured titles, stack, contact, listing pages, detail fallbacks, CV section headings, ContactForm, header aria including `navAriaLabel`/`navMobileAriaLabel`, mermaid label, 404). `translations.en`/`.id` adalah source of truth; komponen tidak hard-code string.
- `src/i18n/content.id.ts` — override terjemahan konten publik per `slug` (portfolio/blogs) dan `cv` (headline, summary, education/experience/skills/interests). Properti invarian dipertahankan di `en`: `slug`, `date`, `tags`, `links`/`image`, seluruh code fence, URL, inline code, fakta numerik, dan struktur blok. Semua 9 blog dan 5 portfolio memiliki entri `Record<Slug, LocalizedContent>` yang lengkap; TypeScript memaksa kelengkapan karena helper memakai strict `Record` (bukan `Partial`).
- `src/i18n/content-helpers.ts` — `getLocalizedBlogs/Portfolio/CV(locale, raw)` menggabungkan data mentah `src/content/*` dengan override `id`. Karena parity dijamin strict `Record<BlogSlug, LocalizedContent>` / `Record<PortfolioSlug, LocalizedContent>` (lihat `content.id.ts`), tidak ada fallback `Partial` — setiap slug wajib ada terjemahan. Helper tidak memakai `any` maupun type assertion untuk memaksa kompatibilitas. Tersedia `getContentParityReport()` untuk cek slug coverage; validasi struktural ada di `scripts/validate-parity.ts`.
- `src/i18n/LocaleProvider.tsx` — context client (`LocaleProvider`, `useLocale`) yang menyediakan `locale`, `setLocale`, `t`, `blogs`, `portfolio`, `cv`. **Hydration-safe:** state awal selalu `en` agar cocok dengan HTML export (`<html lang="en">`) dan render server, lalu locale tersimpan (localStorage/cookie) diterapkan di `useEffect` setelah hydration. Ini menghindari mismatch hydration; pengunjung dengan `id` tersimpan akan melihat switch EN→ID client-side setelah mount. Persistensi di `localStorage` + `document.cookie` (`SameSite=Lax, max-age 1y`) dengan `try/catch` untuk private mode. `useEffect` sinkronisasi `document.documentElement.lang` (`en`/`id`) agar selaras dengan locale yang dirender, dan effect terpisah update live DOM metadata (`document.title` + `meta[name="description"]` + `meta[property="og:title/description"]` + `meta[name="twitter:title/description"]`). Build-time metadata (Crawler-visible, `layout.tsx` `metadata`) tetap English karena single static URL; live DOM metadata mengikuti locale terpilih. Provider membungkus `ThemeProvider`.
- `src/components/LanguagePicker.tsx` — kontrol bahasa ringkas di header, tepat di kanan theme toggle, dengan ikon bendera 🇺🇸/🇮🇩 tanpa teks visual. Nama bahasa tetap tersedia lewat `aria-label` dan `title`. Aksesibilitas: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"` + `role="menuitemradio"` + `aria-checked`, keyboard (Enter/Space/ArrowDown/ArrowUp buka dan fokus ke opsi terpilih atau pertama, ArrowUp/Down roving, Home/End, Enter/Space pilih, Escape tutup dan mengembalikan fokus, Tab menutup), outside-click, serta focus ring yang terlihat.
- `src/components/Markdown.tsx` — label mermaid dari `t.markdown.mermaidLabel`; `Header.tsx` — dua landmark nav dengan `aria-label` lokal (`t.header.navAriaLabel` desktop dan `t.header.navMobileAriaLabel` mobile, bukan duplikat "Primary"), `aria-label` Home, theme toggle, mobile menu semuanya dari `t.header`; `ContactForm.tsx` — error memakai kode netral (`not_configured`/`fallback`/`connection`) yang dirender via `t.contactForm` terkait; `src/app/not-found.tsx` — halaman 404 lokal (`Page not found` / `Halaman tidak ditemukan`) dengan CTA `backHome`.
- URL tidak berubah — locale disimpan di browser, kompatibel dengan `output: "export"` (tidak memakai fitur server-only `next/intl` routing, `cookies()` atau `headers()`). Halaman detail (`/blogs/[slug]`, `/portfolio/[slug]`) pakai wrapper `page.tsx` (server, `generateStaticParams`) + `*Client.tsx` (client, `useParams` + `useLocale`) agar static export tetap generate semua path sementara konten diterjemahkan di client.

**Hydration & locale limitation (static export, single URL):** Exported HTML selalu `lang="en"` dan konten EN. Locale `id` tersimpan hanya diterapkan client-side setelah hydration via `useEffect` di `LocaleProvider`; tidak ada prepaint `localeScript` yang menyentuh `document.documentElement.lang` sebelum hydration (yang sebelumnya menyebabkan mismatch antara prepaint lang dan React's first render). Konsekuensi: pengunjung returning dengan `id` akan melihat konten EN sesaat lalu switch ke ID setelah mount — ini disengaja untuk menjaga konsistensi hydration. Crawler selalu melihat English default (single static URL).

**Default:** `en`. Browser baru lihat EN; pilihan disimpan di localStorage+cookie. Menghapus keduanya mengembalikan ke EN. `lang` di-sync ke locale aktif setelah mount via `document.documentElement.lang`.

**Cara edit kedua terjemahan:**

1. **String UI (nav/label/judul section/form/CV heading/header aria termasuk `navAriaLabel`/`navMobileAriaLabel`/mermaid/404):** edit `src/i18n/translations.ts` — ubah `en` dan `id` di `Dictionary` yang sama. Type-check memastikan kedua locale ada. Jangan hard-code string di komponen; semua baca dari `useLocale().t` (mis. `t.header.homeAriaLabel`, `t.header.navAriaLabel`, `t.markdown.mermaidLabel`, `t.notFound.title`).
2. **Konten publik (blog/portfolio/cv prose):**
   - `en` tetap di `src/content/blogs.ts` / `portfolio.ts` / `cv.ts` (fakta, link, slug, tanggal, code fence body, tag tidak boleh diubah saat menerjemahkan; command/options/URL di dalam fence harus verbatim).
   - `id` hanya di `src/i18n/content.id.ts` (`blogsIdBySlug[slug]`, `portfolioIdBySlug[slug]`, `cvId`). Strict: setiap slug EN wajib punya entri ID (`Record<Slug, LocalizedContent>`); menambah post baru di `src/content/*` tanpa entri ID akan type error. Jalankan `npm run validate:parity` untuk memeriksa kelengkapan field, struktur blok/list, seluruh code fence secara byte-for-byte, URL, inline code, fakta numerik, dan blok terjemahan yang terlalu pendek. Pemeriksaan ini tidak dapat membuktikan kualitas semantik, jadi terjemahan tetap perlu review manusia.
3. **Menambah locale baru (mis. `ja`):**
   - `src/i18n/config.ts`: tambah ke `locales`, `localeLabels`, `localeNativeNames`, `htmlLang`, dan `isLocale`.
   - `src/i18n/translations.ts`: tambah key baru di `translations` (copy `en` lalu terjemahkan — type error akan menandai field yang belum diisi).
   - Buat `src/i18n/content.ja.ts` dan tambah helper di `content-helpers.ts` atau extend pattern `content.id.ts` (atau buat registry per-locale). Karena hydration-safe strategy (EN initial + effect), tidak perlu prepaint `localeScript`; cukup update `LocaleProvider` effect whitelist.
   - `LanguagePicker` otomatis render daftar `locales`.
4. Jangan edit langsung text di `Header.tsx`/`HomeSections.tsx`/`ContactForm.tsx`/`Markdown.tsx` — semua baca dari `useLocale().t`.

**Aksesibilitas picker bahasa:**

- Nama accessible: "Select language" (EN) / "Pilih bahasa" (ID) via `aria-label` + hidden label.
- State terpilih: latar visual berbeda, `aria-checked="true"`, label "English (selected)" / "Indonesia (dipilih)", dan focus ring yang jelas.
- Keyboard: Tab ke trigger → Enter/Space/ArrowDown/ArrowUp buka dan fokus ke opsi terpilih atau pertama → ArrowUp/Down roving (wrap), Home/End → Enter/Space pilih → Escape tutup & fokus balik ke trigger. Tab dari menu tutup menu. Focus ring `focus-visible:ring-2` di trigger, `focus-visible:ring-1` di menuitem.
- Hydration-safe: initial render `en` (cocok dengan HTML export), locale tersimpan diterapkan di `useEffect` setelah hydration, `document.documentElement.lang` selalu sinkron dengan locale aktif.

**Validasi:**

```bash
npm run lint              # harus 0 error
npx tsc --noEmit          # harus 0 error; content-helpers tanpa `any` atau type assertion
npm run validate:parity   # deterministik: 9 blog + 5 portfolio; cek slug, field, blok/list, seluruh fence, URL, inline code, angka, length guard
npm run build             # static export: 7 entri route, 20 halaman statis, 21 file HTML di out/ (termasuk alias 404)
# Manual:
# - Buka /, /blogs, /blogs/<slug>, /portfolio, /portfolio/<slug>, /cv di EN lalu switch ke ID — semua string & post berubah, URL tetap.
# - Reload di ID — bahasa bertahan (localStorage + cookie + html lang) setelah mount (hydration-safe: EN sesaat lalu ID).
# - Keyboard-only: Tab → picker → Enter/Space/ArrowDown buka (fokus ke terpilih) → ArrowDown/Up/Home/End pindah → Enter pilih → fokus kembali → Escape tutup.
# - Kunjungi /not-found-test atau URL tidak ada — tampil 404 lokal (ID/EN sesuai locale).
# - Hapus localStorage "locale" + cookie locale → reload → kembali EN.
# - Inspector: <html lang> ganti en↔id saat switch; document.title + og:* + twitter:* ikut locale (live DOM).
# Catatan: lint/type/parity/build bersifat otomatis; screen reader/assistive technology tetap perlu diuji manual di browser dan perangkat target.
```

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
| `npm run build` | Build static export ke `out/` — 7 entri route, 20 halaman statis, 21 file HTML termasuk alias 404 (lihat Validasi) |
| `npm run start` | Preview production (kalau tidak pakai `output: export`) |
| `npm run lint` | ESLint |
| `npm run validate:parity` | Validasi parity EN/ID deterministik (slug/field, struktur blok, seluruh fence, URL, inline code, angka, length guard) |

> Build default = **static export** (`next.config.ts: output: "export"`). Hasilnya folder `out/` siap upload ke GitHub Pages / hosting statis lain. Tidak butuh Node server. Next menampilkan 7 entri route dan menghasilkan 20 halaman statis; terdapat 21 file HTML karena `trailingSlash: true` membuat `index.html` per route dan export juga menyediakan alias `/404.html`.

---

## Cara Pakai Template (Kustomisasi)

Semua konten terpusat dan type-safe (TypeScript, bukan YAML). Tidak perlu parser tambahan.

### 1. Ganti identitas site & author

Edit **`src/site.config.ts`** → bagian `site` dan `author`:

```ts
site: {
  name: "Aufa Personal Page",
  title: "Aufa R Cahyadi — Networking · SysAdmin · Backend", // dipakai <title> build-time (English); runtime title mengikuti locale via t.site.title di LocaleProvider effect
  shortTitle: "Aufa R Cahyadi", // Your Name di header kiri (klik → /)
  description: "Deskripsi untuk SEO / OpenGraph (build-time EN; live DOM description juga ikut locale)",
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

**Your Name di header:** komponen `src/components/sites/opencode-2d59a23a/root-8a5edab2/Header.tsx` render `site.shortTitle || author.name || site.name` di dalam `<Link href="/">` — jadi klik nama balik ke halaman awal. Ganti `shortTitle` di config untuk ubah teksnya. Hover `opacity-80` sebagai feedback. Aria-label Home memakai `t.header.homeAriaLabel` ("Home"/"Beranda"), sedangkan dua landmark nav memakai `t.header.navAriaLabel` dan `t.header.navMobileAriaLabel` ("Primary navigation"/"Navigasi utama" dan mobile variant).

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

Teks nav di-render via `t.nav.*` sehingga mengikuti locale yang dipilih tanpa mengubah URL.

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
                          #   site.title/shortTitle → build-time <title> (EN) + runtime locale title
                          #   author.avatar + home.hero.avatar → foto bulat
  content/
    blogs.ts              # ← koleksi Blogs (1 file = semua post, 9 posts)
    portfolio.ts          # ← koleksi Portfolio (5 entries)
    cv.ts                 # ← data CV
  i18n/
    config.ts             # locale + htmlLang + isLocale
    translations.ts       # Dictionary type-safe (nav/hero/whatIDo/featured/stack/contact/blogsPage/portfolioPage/cvPage/contactForm/header/common/markdown/notFound + site.title/description + navAriaLabel)
    content.id.ts         # override ID per slug (BlogSlug/PortfolioSlug union, strict Record — semua slug wajib)
    content-helpers.ts    # getLocalized* (strict, tanpa any) + getContentParityReport (slug coverage)
    LocaleProvider.tsx    # hydration-safe: EN initial + effect apply persisted locale + lang sync + live DOM metadata (title, description, og/twitter)
  scripts/
    validate-parity.ts    # cek slug/field, struktur blok, seluruh fence, URL, inline code, angka, dan length guard untuk 9+5
  app/
    page.tsx              # landing / (HomeHero, WhatIDo, Featured, Stack, Contact)
    layout.tsx            # font mono + metadata (build-time EN via site.title) + inline theme script (no locale prepaint)
    not-found.tsx         # 404 lokal (client, dari t.notFound)
    globals.css           # design tokens (hsl vars, dark mode)
    blogs/page.tsx        # listing blogs
    blogs/[slug]/page.tsx # detail blog (Markdown)
    portfolio/page.tsx
    portfolio/[slug]/page.tsx
    cv/page.tsx
  components/
    Markdown.tsx          # renderer markdown tanpa deps (headings, table, code, mermaid placeholder via t.markdown.mermaidLabel)
    LanguagePicker.tsx    # picker bendera 🇺🇸/🇮🇩 di header; menuitemradio + roving focus
    academic/
      AcademicShell.tsx   # layout Header + sidebar opsional + Footer/Legal
      AuthorSidebar.tsx   # sidebar ala arcahyadi.me — conditional img kalau author.avatar kosong
    home/
      HomeSections.tsx    # 6 section homepage (HomeHero conditional avatar)
      ContactForm.tsx     # form: kode error netral → pesan lokal
    sites/opencode-...    # Header (dua nav landmark dengan aria-label lokal) + Footer/Legal
public/
  avatar.jpg              # foto bulat hero + sidebar (baru)
  .nojekyll, CNAME        # Pages + custom domain
  social-share.png, favicon*, site.webmanifest, files/, logo.svg (legacy header teks)
next.config.ts            # output: "export", images.unoptimized, trailingSlash
.github/workflows/deploy.yml  # GH Pages: build → upload artifact → deploy
```

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
- Raw HTML `<div class="mermaid">` → render sebagai placeholder pre (butuh JS mermaid kalau mau grafik interaktif — tinggal ganti placeholder; label via `t.markdown.mermaidLabel`)
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
