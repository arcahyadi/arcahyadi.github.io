// site.config.ts — SINGLE SOURCE OF TRUTH (aggregate)
// Edit konten Portfolio/Blogs di src/content/* — file terpisah per koleksi.
// Header/hero/services/landing tetap di sini. Semua halaman hot-reload (npm run dev).

import { portfolio } from "./content/portfolio";
import { blogs } from "./content/blogs";

export const siteConfig = {
  // ── Global / Site ──
  site: {
    name: "arcahyadi.dev",
    title: "arcahyadi — Network, Server & Automation",
    shortTitle: "arcahyadi",
    author: "arcahyadi",
    description:
      "Networking, servers and backend automation: MikroTik, UniFi, Proxmox, Docker, Go and n8n. Independent consulting and hands-on implementation.",
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
      title: "Networks that hold up. Servers that stay up.",
      subtitle:
        "Hands-on help with routing and wireless, Proxmox and Docker infrastructure, backend systems, and workflow automation. Clear scope, working systems, documented handover.",
      ctaPrimary: { label: "See services", href: "#services" },
      ctaSecondary: { label: "Read case studies", href: "/portfolio" },
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
            "Proxmox VE clusters, ZFS storage, Docker workloads and monitoring with LibreNMS and Uptime Kuma. Built for recovery, not just uptime.",
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
