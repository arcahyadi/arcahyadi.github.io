// site.config.ts — SINGLE SOURCE OF TRUTH (aggregate)
// Edit konten Portfolio/Blogs di src/content/* — file terpisah per koleksi.
// Header/hero/services/landing tetap di sini. Semua halaman hot-reload (npm run dev).

import { portfolio } from "./content/portfolio";
import { blogs } from "./content/blogs";

export const siteConfig = {
  // ── Global / Site ──
  site: {
    name: "arcahyadi.dev",
    title: "arcahyadi | Networks, Servers & Automation",
    shortTitle: "arcahyadi",
    author: "arcahyadi",
    description:
      "Help with MikroTik and UniFi networks, Proxmox and Docker servers, backend applications, and n8n automation.",
    url: "https://arcahyadi.me",
  },

  // ── Author (public identity only) ──
  author: {
    name: "arcahyadi",
    email: "arcahyadi.dev@gmail.com",
    links: [
      { label: "GitHub", href: "https://github.com/arcahyadi", icon: "github" },
    ],
  },

  // ── Footer ──
  footer: {
    links: [
      { label: "GitHub", href: "https://github.com/arcahyadi", external: true },
      { label: "Email", href: "mailto:arcahyadi.dev@gmail.com" },
      { label: "Work", href: "/portfolio" },
    ],
  },

  // ── Legal ──
  legal: {
    copyright: "©2026",
    company: { label: "arcahyadi", href: "https://arcahyadi.me" },
    links: [
      { label: "Work", href: "/portfolio" },
      { label: "Notes", href: "/blogs" },
    ],
  },

  // ── Home — service showcase ──
  home: {
    hero: {
      eyebrow: "Network · Server · Automation",
      title: "Help with networks, servers, and automation.",
      subtitle:
        "I help configure MikroTik and UniFi networks, manage Proxmox and Docker servers, build backend applications, and automate workflows with n8n.",
      ctaPrimary: { label: "See services", href: "#services" },
      ctaSecondary: { label: "Read case studies", href: "/portfolio" },
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
      email: "arcahyadi.dev@gmail.com",
      ctaLabel: "Email me",
      // Web3Forms access key is public by design (an alias for the inbox, not a secret).
      web3formsKey: "4f2c761d-0e93-4664-a3a2-b750237dd58e",
    },
  },

  portfolio,
  blogs,
} as const;

export type SiteConfig = typeof siteConfig;
