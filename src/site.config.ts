// site.config.ts — SINGLE SOURCE OF TRUTH (aggregate)
// Edit konten Portfolio/Blogs/CV di src/content/* — file terpisah per koleksi (mirip _portfolio/_posts/_pages di academicpages).
// Header/hero/landing tetap di sini. Semua halaman hot-reload (npm run dev).

import { portfolio } from "./content/portfolio";
import { blogs } from "./content/blogs";
import { cv } from "./content/cv";

export const siteConfig = {
  // ── Global / Site ── (synced from arcahyadi.github.io _config.yml)
  site: {
    name: "Aufa Personal Page",
    title: "Aufa R Cahyadi — Networking · SysAdmin · Backend",
    shortTitle: "Aufa R Cahyadi",
    author: "Aufa R Cahyadi",
    description: "Network Technician, SysAdmin and homelab enthusiast — I like Backend, Networking and Automation. Based in Banjarmasin, Indonesia.",
    url: "https://arcahyadi.me",
    // Logo header: taruh file logomu di public/logo.svg (atau .png/.webp), ganti path di sini.
    // Contoh: "/logo.svg", "/logo.png", "/images/my-logo.png". Kosongkan "" untuk pakai teks nama saja.
    logo: "/logo.svg",
    logoAlt: "Aufa R Cahyadi",
  },

  // ── Author (synced — kayak arcahyadi.me sidebar) ──
  // avatar: taruh file fotomu di public/ (contoh: /avatar.jpg, /avatar.png, /profile.webp) lalu tulis path di sini.
  // bisa .png .jpg .jpeg .webp .svg — cukup tulis nama file + format, mis. "/avatar.jpg" atau "/foto-profil.png"
  author: {
    name: "Aufa R Cahyadi",
    role: "Network Technician · SysAdmin · Programmer",
    bio: "I like Backend, Networking and Automation",
    location: "Earth",
    avatar: "/avatar.jpg",
    email: "arcahyadi.dev@gmail.com",
    links: [
      { label: "GitHub", href: "https://github.com/arcahyadi", icon: "github" },
      { label: "Instagram", href: "https://instagram.com/a.r.cahyadi", icon: "instagram" },
      { label: "LinkedIn", href: "https://linkedin.com/in/arcahyadi07", icon: "linkedin" },
      { label: "Email", href: "mailto:arcahyadi.dev@gmail.com", icon: "email" },
    ],
  },

  // ── Header ──
  header: {
    nav: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blogs", href: "/blogs" },
      { label: "CV", href: "/cv" },
    ],
  },

  // ── Footer ── (edit link footer di sini — ngikut config, bukan clone)
  footer: {
    links: [
      { label: "GitHub", href: "https://github.com/arcahyadi", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/arcahyadi07", external: true },
      { label: "Instagram", href: "https://instagram.com/a.r.cahyadi", external: true },
      { label: "Email", href: "mailto:arcahyadi.dev@gmail.com" },
      { label: "CV", href: "/cv" },
    ],
  },

  // ── Legal ── (copyright + link bawah footer)
  legal: {
    copyright: "©2026",
    company: { label: "Aufa R Cahyadi", href: "https://arcahyadi.me" },
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blogs", href: "/blogs" },
      { label: "CV", href: "/cv" },
    ],
    // Languages are managed via src/i18n (Header renders LanguagePicker directly).
    // Keeping shape for backwards compat / docs; UI no longer reads this list.
    languages: [{ name: "English", code: "en" }, { name: "Indonesia", code: "id" }],
    defaultLanguage: "English",
  },

  // ── Home — personal landing (synced from arcahyadi.me _pages/about.md) ──
  home: {
    hero: {
      // avatar: override khusus hero (opsional). Kosongkan "" untuk pakai author.avatar di atas.
      // contoh: "/avatar.jpg", "/foto-saya.png"
      avatar: "",
      eyebrow: "Network Technician · SysAdmin · Homelab enthusiast",
      title: "Hi, I'm Aufa R Cahyadi",
      subtitle: "I like Backend, Networking and Automation — building systems that just work, and running my own mini data center at home in Banjarmasin.",
      ctaPrimary: { label: "View Portfolio", href: "/portfolio" },
      ctaSecondary: { label: "View CV", href: "/cv" },
    },
    whatIDo: {
      title: "What I do",
      items: [
        { title: "Campus Network", description: "Design & maintain Ubiquiti UniFi + MikroTik CCR network for STIKES ISFI Banjarmasin — VLANs, firewall, traffic shaping for 500+ users." },
        { title: "SysAdmin & Homelab", description: "Two Proxmox VE nodes (pve/pve2), ZFS RAID1, SDN — Jellyfin, LibreNMS, n8n, Dockge, Uptime Kuma, UniFi OS." },
        { title: "Backend", description: "Internal web apps with PHP, Go, MySQL — campus operations from admission to graduation." },
        { title: "Automation & Local AI", description: "n8n workflows + LM Studio on MacBook Air M4 (MLX/Metal) — Gemma 4, Qwen 3.5, privacy-first." },
      ],
    },
    featured: {
      portfolioTitle: "Featured work",
      portfolioSubtitle: "Certificates and projects — see all in Portfolio.",
      blogsTitle: "Recent writing",
      blogsSubtitle: "Real-world setups from homelab and campus — browse all in Blogs.",
    },
    stack: {
      title: "Tech stack",
      groups: [
        { label: "Programming", items: ["Go", "PHP", "MySQL", "SQL"] },
        { label: "Networking", items: ["Cisco", "Mikrotik", "Ubiquiti UniFi", "WireGuard", "Tailscale", "OpenVPN", "VLANs"] },
        { label: "Infra", items: ["Proxmox VE", "Docker", "Linux (Debian, Ubuntu)", "DigitalOcean", "ZFS", "SDN", "NFS"] },
        { label: "Automation", items: ["n8n", "LM Studio", "MLX", "Metal"] },
      ],
    },
    contact: {
      title: "Let's talk",
      subtitle: "Open to collaboration on networking, infra and backend. Reach me via email or the links below.",
      email: "arcahyadi.dev@gmail.com",
      ctaLabel: "Email me",
      // Web3Forms: daftar gratis di https://web3forms.com -> copy Access Key -> isi di sini.
      // Biarkan placeholder sampai kamu isi — form akan tampil dengan petunjuk.
      web3formsKey: "4f2c761d-0e93-4664-a3a2-b750237dd58e",
    },
  },

  // ── Portfolio / Blogs / CV — dari file terpisah (academicpages-style) ──
  portfolio,
  blogs,
  cv,
} as const;

export type SiteConfig = typeof siteConfig;
