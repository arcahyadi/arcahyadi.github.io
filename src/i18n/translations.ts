// src/i18n/translations.ts — Type-safe en/id dictionaries for every UI string.
// Public content (blogs/portfolio) lives in src/content/*; UI copy lives here.

import type { Locale } from "./config";

export type Dictionary = {
  site: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    work: string;
    notes: string;
    contact: string;
  };
  legal: {
    copyright: string;
    links: { work: string; notes: string };
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
    services: {
      title: string;
      subtitle: string;
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
    errorFallback: string;
    errorConnection: string;
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
      title: "arcahyadi — Network, Server & Automation",
      description:
        "Networking, servers and backend automation: MikroTik, UniFi, Proxmox, Docker, Go and n8n. Independent consulting and hands-on implementation.",
    },
    nav: {
      services: "Services",
      work: "Work",
      notes: "Notes",
      contact: "Contact",
    },
    legal: {
      copyright: "©2026",
      links: { work: "Work", notes: "Notes" },
      languageLabel: "Language",
      languagePickerAriaLabel: "Select language",
    },
    home: {
      hero: {
        eyebrow: "Network · Server · Automation",
        title: "Networks that hold up. Servers that stay up.",
        subtitle:
          "Hands-on help with routing and wireless, Proxmox and Docker infrastructure, backend systems, and workflow automation. Clear scope, working systems, documented handover.",
        ctaPrimary: "See services",
        ctaSecondary: "Read case studies",
      },
      services: {
        title: "Services",
        subtitle: "Small, well-scoped engagements. You get the fix and the notes to run it.",
        items: [
          {
            title: "Network design & hardening",
            description:
              "VLAN segmentation, firewall policy, multi-WAN failover, QoS and wireless rollout on MikroTik and UniFi. Includes topology and IP plan documentation.",
          },
          {
            title: "Server & virtualization",
            description:
              "Proxmox VE, ZFS storage, Docker workloads and monitoring with LibreNMS and Uptime Kuma. Built for recovery, not just uptime.",
          },
          {
            title: "Backend & internal tools",
            description:
              "PHP, Go and MySQL applications that replace spreadsheets: forms, approvals, reporting and PDF exports, with migration of existing data.",
          },
          {
            title: "Automation & local AI",
            description:
              "n8n workflows that connect the tools you already use, plus local LLM setups for work that cannot leave your network.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Selected work",
        portfolioSubtitle: "Anonymized case studies: problem, approach, result.",
        blogsTitle: "Field notes",
        blogsSubtitle: "Configuration write-ups and lessons from real deployments.",
        seeAll: "All work →",
        browseAll: "All notes →",
      },
      stack: {
        title: "Toolkit",
        groups: [
          { label: "Networking", items: ["MikroTik RouterOS", "Ubiquiti UniFi", "Cisco", "WireGuard", "Tailscale", "VLANs", "QoS"] },
          { label: "Infrastructure", items: ["Proxmox VE", "Docker", "Debian", "ZFS", "NFS", "LibreNMS", "Uptime Kuma"] },
          { label: "Backend", items: ["Go", "PHP", "MySQL", "SQL"] },
          { label: "Automation", items: ["n8n", "LM Studio", "Bash", "Rclone"] },
        ],
      },
      contact: {
        title: "Start a conversation",
        subtitle:
          "Describe the setup and what is not working. You will get a straight answer on scope, approach and whether I am the right fit.",
        ctaLabel: "Email me",
      },
    },
    blogsPage: {
      title: "Field notes",
      subtitle: "Networking, servers and automation, written from real deployments",
      readMore: "Read more →",
      backToBlogs: "← Back to notes",
      notFoundTitle: "Not found",
      notFoundSubtitle: "Note not found.",
    },
    portfolioPage: {
      title: "Work",
      subtitle: "Anonymized case studies: problem, approach, result",
      backToPortfolio: "← Back to work",
      notFoundTitle: "Not found",
      notFoundSubtitle: "Case study not found.",
      github: "GitHub",
      liveDemo: "Live Demo",
    },
    contactForm: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Message",
      messagePlaceholder: "What are you working on?",
      submit: "Send message",
      sending: "Sending...",
      orEmail: "or email directly ↓",
      success: "Thanks! Message sent — I will reply as soon as possible.",
      errorFallback: "Failed to send. Please try again or email directly.",
      errorConnection: "Connection failed. Please try again or email directly.",
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
      title: "arcahyadi — Jaringan, Server & Otomasi",
      description:
        "Jaringan, server dan otomasi backend: MikroTik, UniFi, Proxmox, Docker, Go dan n8n. Konsultasi dan implementasi langsung.",
    },
    nav: {
      services: "Layanan",
      work: "Karya",
      notes: "Catatan",
      contact: "Kontak",
    },
    legal: {
      copyright: "©2026",
      links: { work: "Karya", notes: "Catatan" },
      languageLabel: "Bahasa",
      languagePickerAriaLabel: "Pilih bahasa",
    },
    home: {
      hero: {
        eyebrow: "Jaringan · Server · Otomasi",
        title: "Jaringan yang tahan. Server yang tetap hidup.",
        subtitle:
          "Bantuan langsung untuk routing dan wireless, infrastruktur Proxmox dan Docker, sistem backend, serta otomasi workflow. Lingkup jelas, sistem berjalan, serah terima terdokumentasi.",
        ctaPrimary: "Lihat layanan",
        ctaSecondary: "Baca studi kasus",
      },
      services: {
        title: "Layanan",
        subtitle: "Pekerjaan kecil dengan lingkup jelas. Kamu dapat perbaikannya dan catatan untuk menjalankannya.",
        items: [
          {
            title: "Desain & penguatan jaringan",
            description:
              "Segmentasi VLAN, kebijakan firewall, failover multi-WAN, QoS dan rollout wireless di MikroTik dan UniFi. Termasuk dokumentasi topologi dan rencana IP.",
          },
          {
            title: "Server & virtualisasi",
            description:
              "Proxmox VE, storage ZFS, workload Docker dan monitoring dengan LibreNMS serta Uptime Kuma. Dibangun untuk pemulihan, bukan hanya uptime.",
          },
          {
            title: "Backend & tools internal",
            description:
              "Aplikasi PHP, Go dan MySQL untuk menggantikan spreadsheet: form, persetujuan, laporan dan ekspor PDF, dengan migrasi data yang sudah ada.",
          },
          {
            title: "Otomasi & AI lokal",
            description:
              "Workflow n8n yang menghubungkan tools yang sudah dipakai, plus setup LLM lokal untuk pekerjaan yang tidak boleh keluar dari jaringanmu.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Karya pilihan",
        portfolioSubtitle: "Studi kasus anonim: masalah, pendekatan, hasil.",
        blogsTitle: "Catatan lapangan",
        blogsSubtitle: "Panduan konfigurasi dan pelajaran dari deployment nyata.",
        seeAll: "Semua karya →",
        browseAll: "Semua catatan →",
      },
      stack: {
        title: "Perangkat",
        groups: [
          { label: "Jaringan", items: ["MikroTik RouterOS", "Ubiquiti UniFi", "Cisco", "WireGuard", "Tailscale", "VLAN", "QoS"] },
          { label: "Infrastruktur", items: ["Proxmox VE", "Docker", "Debian", "ZFS", "NFS", "LibreNMS", "Uptime Kuma"] },
          { label: "Backend", items: ["Go", "PHP", "MySQL", "SQL"] },
          { label: "Otomasi", items: ["n8n", "LM Studio", "Bash", "Rclone"] },
        ],
      },
      contact: {
        title: "Mulai dari obrolan",
        subtitle:
          "Ceritakan setup dan bagian yang bermasalah. Kamu akan dapat jawaban langsung soal lingkup, pendekatan, dan apakah saya cocok untuk itu.",
        ctaLabel: "Email saya",
      },
    },
    blogsPage: {
      title: "Catatan lapangan",
      subtitle: "Jaringan, server dan otomasi, ditulis dari deployment nyata",
      readMore: "Baca selengkapnya →",
      backToBlogs: "← Kembali ke catatan",
      notFoundTitle: "Tidak ditemukan",
      notFoundSubtitle: "Catatan tidak ditemukan.",
    },
    portfolioPage: {
      title: "Karya",
      subtitle: "Studi kasus anonim: masalah, pendekatan, hasil",
      backToPortfolio: "← Kembali ke karya",
      notFoundTitle: "Tidak ditemukan",
      notFoundSubtitle: "Studi kasus tidak ditemukan.",
      github: "GitHub",
      liveDemo: "Demo Langsung",
    },
    contactForm: {
      nameLabel: "Nama",
      namePlaceholder: "Nama kamu",
      emailLabel: "Email",
      emailPlaceholder: "kamu@email.com",
      messageLabel: "Pesan",
      messagePlaceholder: "Sedang mengerjakan apa?",
      submit: "Kirim pesan",
      sending: "Mengirim...",
      orEmail: "atau email langsung ↓",
      success: "Terima kasih! Pesan terkirim — saya akan balas secepatnya.",
      errorFallback: "Gagal mengirim. Coba lagi atau email langsung.",
      errorConnection: "Gagal koneksi. Coba lagi atau email langsung.",
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
