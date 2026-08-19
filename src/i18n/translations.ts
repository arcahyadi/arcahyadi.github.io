// src/i18n/translations.ts — Type-safe en/id dictionaries for every UI string.
// Public content (blogs/portfolio/cv) lives in src/i18n/content.ts; UI copy lives here.

import type { Locale } from "./config";

export type Dictionary = {
  site: {
    title: string;
    description: string;
  };
  nav: {
    portfolio: string;
    blogs: string;
    cv: string;
  };
  footer: {
    // footer labels are largely proper nouns; keep but centralize if needed
    cv: string;
  };
  legal: {
    copyright: string;
    links: { portfolio: string; blogs: string; cv: string };
    languageLabel: string; // accessible name for picker
    languagePickerAriaLabel: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    whatIDo: {
      title: string;
      items: Array<{ title: string; description: string }>;
    };
    featured: {
      portfolioTitle: string;
      portfolioSubtitle: string;
      blogsTitle: string;
      blogsSubtitle: string;
      seeAll: string;
      browseAll: string;
    };
    stack: {
      title: string;
      groups: Array<{ label: string; items: string[] }>;
    };
    contact: {
      title: string;
      subtitle: string;
      ctaLabel: string;
    };
  };
  blogsPage: {
    title: string;
    subtitle: string;
    readMore: string;
    backToBlogs: string;
    notFoundTitle: string;
    notFoundSubtitle: string;
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    backToPortfolio: string;
    notFoundTitle: string;
    notFoundSubtitle: string;
    github: string;
    liveDemo: string;
  };
  cvPage: {
    title: string;
    // headline is per-locale from content, but section headings here:
    download: string;
    education: string;
    experience: string;
    skills: string;
    skillsLabels: { programming: string; networking: string; infra: string; automation: string };
    certifications: string;
    interests: string;
  };
  contactForm: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    orEmail: string;
    success: string;
    errorNotConfigured: string;
    errorFallback: string;
    errorConnection: string;
    web3formsHint: string;
  };
  header: {
    homeAriaLabel: string;
    themeLightLabel: string;
    themeDarkLabel: string;
    toggleThemeSr: string;
    toggleMenuSr: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    navAriaLabel: string;
    navMobileAriaLabel: string;
  };
  common: {
    selected: string;
  };
  markdown: {
    mermaidLabel: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    backHome: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  en: {
    site: {
      title: "Aufa R Cahyadi — Networking · SysAdmin · Backend",
      description:
        "Network Technician, SysAdmin and homelab enthusiast — I like Backend, Networking and Automation. Based in Banjarmasin, Indonesia.",
    },
    nav: {
      portfolio: "Portfolio",
      blogs: "Blogs",
      cv: "CV",
    },
    footer: {
      cv: "CV",
    },
    legal: {
      copyright: "©2026",
      links: { portfolio: "Portfolio", blogs: "Blogs", cv: "CV" },
      languageLabel: "Language",
      languagePickerAriaLabel: "Select language",
    },
    home: {
      hero: {
        eyebrow: "Network Technician · SysAdmin · Homelab enthusiast",
        title: "Hi, I'm Aufa R Cahyadi",
        subtitle:
          "I like Backend, Networking and Automation — building systems that just work, and running my own mini data center at home in Banjarmasin.",
        ctaPrimary: "View Portfolio",
        ctaSecondary: "View CV",
      },
      whatIDo: {
        title: "What I do",
        items: [
          {
            title: "Campus Network",
            description:
              "Design & maintain Ubiquiti UniFi + MikroTik CCR network for STIKES ISFI Banjarmasin — VLANs, firewall, traffic shaping for 500+ users.",
          },
          {
            title: "SysAdmin & Homelab",
            description:
              "Two Proxmox VE nodes (pve/pve2), ZFS RAID1, SDN — Jellyfin, LibreNMS, n8n, Dockge, Uptime Kuma, UniFi OS.",
          },
          {
            title: "Backend",
            description:
              "Internal web apps with PHP, Go, MySQL — campus operations from admission to graduation.",
          },
          {
            title: "Automation & Local AI",
            description:
              "n8n workflows + LM Studio on MacBook Air M4 (MLX/Metal) — Gemma 4, Qwen 3.5, privacy-first.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Featured work",
        portfolioSubtitle: "Certificates and projects — see all in Portfolio.",
        blogsTitle: "Recent writing",
        blogsSubtitle: "Real-world setups from homelab and campus — browse all in Blogs.",
        seeAll: "See all →",
        browseAll: "Browse all →",
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
        ctaLabel: "Email me",
      },
    },
    blogsPage: {
      title: "Blogs",
      subtitle: "Notes on networking, homelab, automation and backend",
      readMore: "Read more →",
      backToBlogs: "← Back to Blogs",
      notFoundTitle: "Not found",
      notFoundSubtitle: "Blog post not found.",
    },
    portfolioPage: {
      title: "Portfolio",
      subtitle: "Projects, homelab and infrastructure",
      backToPortfolio: "← Back to Portfolio",
      notFoundTitle: "Not found",
      notFoundSubtitle: "Portfolio item not found.",
      github: "GitHub",
      liveDemo: "Live Demo",
    },
    cvPage: {
      title: "CV",
      download: "Download CV (PDF)",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      skillsLabels: { programming: "Programming:", networking: "Networking:", infra: "Infra:", automation: "Automation:" },
      certifications: "Certifications",
      interests: "Interests",
    },
    contactForm: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Hello Aufa, ...",
      submit: "Send message",
      sending: "Sending...",
      orEmail: "or email directly ↓",
      success: "Thanks! Message sent — I'll reply as soon as possible. You can also reach me directly via Email below.",
      errorNotConfigured:
        "Form not configured. Create an Access Key at web3forms.com then set src/site.config.ts → home.contact.web3formsKey",
      errorFallback: "Failed to send. Please try again or email directly.",
      errorConnection: "Connection failed. Please try again or email directly.",
      web3formsHint:
        "Form is ready but needs a Web3Forms Access Key. Sign up for free at web3forms.com then set home.contact.web3formsKey in src/site.config.ts. Alternative without signup: change fetch URL to https://formsubmit.co/arcahyadi.dev@gmail.com.",
    },
    header: {
      homeAriaLabel: "Home",
      themeLightLabel: "Switch to light mode",
      themeDarkLabel: "Switch to dark mode",
      toggleThemeSr: "Toggle theme",
      toggleMenuSr: "Toggle menu",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      navAriaLabel: "Primary navigation",
      navMobileAriaLabel: "Mobile primary navigation",
    },
    common: {
      selected: "selected",
    },
    markdown: {
      mermaidLabel: "diagram · mermaid",
    },
    notFound: {
      title: "Page not found",
      subtitle: "The page you are looking for does not exist.",
      backHome: "← Back to home",
    },
  },
  id: {
    site: {
      title: "Aufa R Cahyadi — Jaringan · SysAdmin · Backend",
      description:
        "Teknisi Jaringan, SysAdmin dan penggemar homelab — saya suka Backend, Jaringan dan Otomasi. Berbasis di Banjarmasin, Indonesia.",
    },
    nav: {
      portfolio: "Portofolio",
      blogs: "Blog",
      cv: "CV",
    },
    footer: {
      cv: "CV",
    },
    legal: {
      copyright: "©2026",
      links: { portfolio: "Portofolio", blogs: "Blog", cv: "CV" },
      languageLabel: "Bahasa",
      languagePickerAriaLabel: "Pilih bahasa",
    },
    home: {
      hero: {
        eyebrow: "Teknisi Jaringan · SysAdmin · Penggemar Homelab",
        title: "Halo, saya Aufa R Cahyadi",
        subtitle:
          "Saya suka Backend, Jaringan dan Otomasi — membangun sistem yang andal, dan menjalankan mini data center sendiri di rumah di Banjarmasin.",
        ctaPrimary: "Lihat Portofolio",
        ctaSecondary: "Lihat CV",
      },
      whatIDo: {
        title: "Yang saya kerjakan",
        items: [
          {
            title: "Jaringan Kampus",
            description:
              "Merancang & memelihara jaringan Ubiquiti UniFi + MikroTik CCR untuk STIKES ISFI Banjarmasin — VLAN, firewall, traffic shaping untuk 500+ pengguna.",
          },
          {
            title: "SysAdmin & Homelab",
            description:
              "Dua node Proxmox VE (pve/pve2), ZFS RAID1, SDN — Jellyfin, LibreNMS, n8n, Dockge, Uptime Kuma, UniFi OS.",
          },
          {
            title: "Backend",
            description:
              "Aplikasi web internal dengan PHP, Go, MySQL — operasional kampus dari penerimaan hingga kelulusan.",
          },
          {
            title: "Otomasi & AI Lokal",
            description:
              "Workflow n8n + LM Studio di MacBook Air M4 (MLX/Metal) — Gemma 4, Qwen 3.5, mengutamakan privasi.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Karya pilihan",
        portfolioSubtitle: "Sertifikat dan proyek — lihat semua di Portofolio.",
        blogsTitle: "Tulisan terbaru",
        blogsSubtitle: "Setup nyata dari homelab dan kampus — jelajahi semua di Blog.",
        seeAll: "Lihat semua →",
        browseAll: "Jelajahi semua →",
      },
      stack: {
        title: "Tech stack",
        groups: [
          { label: "Pemrograman", items: ["Go", "PHP", "MySQL", "SQL"] },
          { label: "Jaringan", items: ["Cisco", "Mikrotik", "Ubiquiti UniFi", "WireGuard", "Tailscale", "OpenVPN", "VLAN"] },
          { label: "Infra", items: ["Proxmox VE", "Docker", "Linux (Debian, Ubuntu)", "DigitalOcean", "ZFS", "SDN", "NFS"] },
          { label: "Otomasi", items: ["n8n", "LM Studio", "MLX", "Metal"] },
        ],
      },
      contact: {
        title: "Mari ngobrol",
        subtitle: "Terbuka untuk kolaborasi di jaringan, infra dan backend. Hubungi via email atau tautan di bawah.",
        ctaLabel: "Email saya",
      },
    },
    blogsPage: {
      title: "Blog",
      subtitle: "Catatan tentang jaringan, homelab, otomasi dan backend",
      readMore: "Baca selengkapnya →",
      backToBlogs: "← Kembali ke Blog",
      notFoundTitle: "Tidak ditemukan",
      notFoundSubtitle: "Artikel tidak ditemukan.",
    },
    portfolioPage: {
      title: "Portofolio",
      subtitle: "Proyek, homelab dan infrastruktur",
      backToPortfolio: "← Kembali ke Portofolio",
      notFoundTitle: "Tidak ditemukan",
      notFoundSubtitle: "Item portofolio tidak ditemukan.",
      github: "GitHub",
      liveDemo: "Demo Langsung",
    },
    cvPage: {
      title: "CV",
      download: "Unduh CV (PDF)",
      education: "Pendidikan",
      experience: "Pengalaman",
      skills: "Keahlian",
      skillsLabels: { programming: "Pemrograman:", networking: "Jaringan:", infra: "Infra:", automation: "Otomasi:" },
      certifications: "Sertifikasi",
      interests: "Minat",
    },
    contactForm: {
      nameLabel: "Nama",
      namePlaceholder: "Nama kamu",
      emailLabel: "Email",
      emailPlaceholder: "kamu@email.com",
      messageLabel: "Pesan",
      messagePlaceholder: "Halo Aufa, ...",
      submit: "Kirim pesan",
      sending: "Mengirim...",
      orEmail: "atau email langsung ↓",
      success: "Terima kasih! Pesan terkirim — saya akan balas secepatnya. Bisa juga hubungi langsung via Email di bawah.",
      errorNotConfigured:
        "Form belum dikonfigurasi. Buat Access Key di web3forms.com lalu isi di src/site.config.ts → home.contact.web3formsKey",
      errorFallback: "Gagal mengirim. Coba lagi atau email langsung.",
      errorConnection: "Gagal koneksi. Coba lagi atau email langsung.",
      web3formsHint:
        "Form siap tapi butuh Web3Forms Access Key. Daftar gratis di web3forms.com lalu isi home.contact.web3formsKey di src/site.config.ts. Alternatif tanpa daftar: ganti fetch URL ke https://formsubmit.co/arcahyadi.dev@gmail.com.",
    },
    header: {
      homeAriaLabel: "Beranda",
      themeLightLabel: "Ganti ke mode terang",
      themeDarkLabel: "Ganti ke mode gelap",
      toggleThemeSr: "Ganti tema",
      toggleMenuSr: "Buka/tutup menu",
      openMenuLabel: "Buka menu",
      closeMenuLabel: "Tutup menu",
      navAriaLabel: "Navigasi utama",
      navMobileAriaLabel: "Navigasi utama seluler",
    },
    common: {
      selected: "dipilih",
    },
    markdown: {
      mermaidLabel: "diagram · mermaid",
    },
    notFound: {
      title: "Halaman tidak ditemukan",
      subtitle: "Halaman yang kamu cari tidak tersedia.",
      backHome: "← Kembali ke beranda",
    },
  },
};
