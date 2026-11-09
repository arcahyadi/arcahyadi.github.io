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
      title: "arcahyadi | Networks, Servers & Automation",
      description:
        "Help with MikroTik and UniFi networks, Proxmox and Docker servers, backend applications, and n8n automation.",
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
        title: "Help with networks, servers, and automation.",
        subtitle:
          "I help configure MikroTik and UniFi networks, manage Proxmox and Docker servers, build backend applications, and automate workflows with n8n.",
        ctaPrimary: "See services",
        ctaSecondary: "Read case studies",
      },
      services: {
        title: "Services",
        subtitle: "The areas I can help with.",
        items: [
          {
            title: "Network design & hardening",
            description:
              "VLAN segmentation, firewall policy, multi-WAN failover, QoS and wireless rollout on MikroTik and UniFi. Includes topology and IP plan documentation.",
          },
          {
            title: "Server & virtualization",
            description:
              "Proxmox VE, ZFS storage, Docker, and monitoring with LibreNMS and Uptime Kuma.",
          },
          {
            title: "Backend & internal tools",
            description:
              "Backend applications with PHP, Go, and MySQL for forms, approvals, reports, PDF exports, and migration of existing data.",
          },
          {
            title: "Automation & local AI",
            description:
              "n8n workflows to connect existing applications, and local LLM setup with LM Studio.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Selected work",
        portfolioSubtitle: "Selected network and application work. Client names and installation details are omitted.",
        blogsTitle: "Technical notes",
        blogsSubtitle: "Configuration guides for networks, servers, and automation.",
        seeAll: "All work →",
        browseAll: "All notes →",
      },
      stack: {
        title: "Tools and technologies",
        groups: [
          { label: "Networking", items: ["MikroTik RouterOS", "Ubiquiti UniFi", "Cisco", "WireGuard", "Tailscale", "VLANs", "QoS"] },
          { label: "Infrastructure", items: ["Proxmox VE", "Docker", "Debian", "ZFS", "NFS", "LibreNMS", "Uptime Kuma"] },
          { label: "Backend", items: ["Go", "PHP", "MySQL", "SQL"] },
          { label: "Automation", items: ["n8n", "LM Studio", "Bash", "Rclone"] },
        ],
      },
      contact: {
        title: "Discuss a project",
        subtitle:
          "Describe what you need help with or the technical issue you're facing.",
        ctaLabel: "Email me",
      },
    },
    blogsPage: {
      title: "Technical notes",
      subtitle: "Configuration guides for networks, servers, and automation",
      readMore: "Read note",
      backToBlogs: "← Back to notes",
      notFoundTitle: "Not found",
      notFoundSubtitle: "Note not found.",
    },
    portfolioPage: {
      title: "Work",
      subtitle: "Selected network and application work. Client names and installation details are omitted.",
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
      success: "Message sent. Thank you.",
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
      title: "arcahyadi | Jaringan, Server & Otomasi",
      description:
        "Bantuan untuk jaringan MikroTik dan UniFi, server Proxmox dan Docker, aplikasi backend, serta otomasi n8n.",
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
        title: "Bantuan untuk jaringan, server, dan otomasi.",
        subtitle:
          "Saya membantu konfigurasi jaringan MikroTik dan UniFi, pengelolaan server Proxmox dan Docker, pengembangan backend, serta otomasi dengan n8n.",
        ctaPrimary: "Lihat layanan",
        ctaSecondary: "Baca studi kasus",
      },
      services: {
        title: "Layanan",
        subtitle: "Pekerjaan yang bisa saya bantu.",
        items: [
          {
            title: "Desain & keamanan jaringan",
            description:
              "Segmentasi VLAN, aturan firewall, failover multi-WAN, QoS, dan pemasangan jaringan Wi-Fi dengan MikroTik dan UniFi. Termasuk dokumentasi topologi dan pengalamatan IP.",
          },
          {
            title: "Server & virtualisasi",
            description:
              "Proxmox VE, penyimpanan ZFS, Docker, serta monitoring dengan LibreNMS dan Uptime Kuma.",
          },
          {
            title: "Backend & aplikasi internal",
            description:
              "Aplikasi backend dengan PHP, Go, dan MySQL untuk formulir, persetujuan, laporan, ekspor PDF, dan migrasi data yang sudah ada.",
          },
          {
            title: "Otomasi & AI lokal",
            description:
              "Workflow n8n untuk menghubungkan aplikasi yang sudah digunakan, serta penyiapan LLM lokal dengan LM Studio.",
          },
        ],
      },
      featured: {
        portfolioTitle: "Karya pilihan",
        portfolioSubtitle: "Pilihan pekerjaan jaringan dan pengembangan aplikasi. Nama klien dan detail instalasi tidak ditampilkan.",
        blogsTitle: "Catatan teknis",
        blogsSubtitle: "Panduan konfigurasi jaringan, server, dan otomasi.",
        seeAll: "Semua karya →",
        browseAll: "Semua catatan →",
      },
      stack: {
        title: "Teknologi yang digunakan",
        groups: [
          { label: "Jaringan", items: ["MikroTik RouterOS", "Ubiquiti UniFi", "Cisco", "WireGuard", "Tailscale", "VLAN", "QoS"] },
          { label: "Infrastruktur", items: ["Proxmox VE", "Docker", "Debian", "ZFS", "NFS", "LibreNMS", "Uptime Kuma"] },
          { label: "Backend", items: ["Go", "PHP", "MySQL", "SQL"] },
          { label: "Otomasi", items: ["n8n", "LM Studio", "Bash", "Rclone"] },
        ],
      },
      contact: {
        title: "Diskusikan kebutuhan",
        subtitle:
          "Ceritakan kebutuhan atau masalah teknis yang ingin dibahas.",
        ctaLabel: "Email saya",
      },
    },
    blogsPage: {
      title: "Catatan teknis",
      subtitle: "Panduan konfigurasi jaringan, server, dan otomasi",
      readMore: "Baca catatan",
      backToBlogs: "← Kembali ke catatan",
      notFoundTitle: "Tidak ditemukan",
      notFoundSubtitle: "Catatan tidak ditemukan.",
    },
    portfolioPage: {
      title: "Karya",
      subtitle: "Pilihan pekerjaan jaringan dan pengembangan aplikasi. Nama klien dan detail instalasi tidak ditampilkan.",
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
      success: "Pesan terkirim. Terima kasih.",
      errorFallback: "Pesan belum terkirim. Coba lagi atau kirim lewat email.",
      errorConnection: "Pesan belum terkirim. Periksa koneksi, lalu coba lagi atau kirim lewat email.",
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
