// content/cv.ts — synced from arcahyadi.github.io/_pages/cv.md + _pages/about.md

export const cv = {
  headline: "Network Technician · SysAdmin · Programmer",
  summary:
    "Network Technician, SysAdmin and homelab enthusiast based in Banjarmasin, Indonesia. I build and maintain systems that just work — and a mini data center at home.",
  pdfUrl: "#",
  education: [
    { degree: "Bachelor's Degree, Informatics Engineering (S1)", school: "Universitas Islam Kalimantan Muhammad Arsyad Al Banjari (UNISKA) — Banjarmasin", year: "2024 — 2026", details: "Bachelor's program in Informatics Engineering — graduated 2026, focus on software engineering, networking, and intelligent systems." },
    { degree: "Associate's Degree, Informatics Engineering", school: "Politeknik Negeri Banjarmasin", year: "2022", details: "Informatics Engineering — GPA focus on network & software." },
    { degree: "Computer Network Engineering", school: "SMKN 1 Marabahan", year: "2019", details: "Foundation in Computer Network Engineering." },
  ],
  experience: [
    {
      role: "Programmer and SysAdmin",
      org: "STIKES ISFI Banjarmasin",
      period: "2022 — Now",
      bullets: [
        "Led upgrade and modernization of campus network system — redesigned VLAN segmentation, firewall policies, and traffic shaping for 500+ users",
        "Upgraded campus WiFi infrastructure — migrated to UniFi OS Server and expanded AP fleet (UAP-LR, UAP-AC-Lite, U7 Lite, U6+, U6-LR) for better coverage and roaming",
        "Optimized MikroTik CCR1016 as core router (RouterOS 7) — multi-WAN, NAT, bonding (802.3ad), and QoS tuning for stability and throughput",
        "Monitoring and maintaining network infrastructure with LibreNMS and Uptime Kuma",
        "Delivered major updates to stikes-isfi.ac.id — built PWP (Praktik Kerja Lapangan) internship module, modernized Admin panel, added maintenance mode & improved user management, and refreshed public site (footer, navigation, links)",
      ],
    },
    {
      role: "Ketua BAAK (Biro Administrasi Akademik dan Kemahasiswaan)",
      org: "STIKES ISFI Banjarmasin",
      period: "2022 — Now",
      bullets: [
        "Coordinating academic administration from admission to graduation",
        "Managing student registration, KRS, KHS, transcripts, academic calendar",
        "Overseeing yudisium, wisuda, diploma issuance and PD Dikti reporting",
        "Administering scholarships and student welfare services",
      ],
    },
    {
      role: "Homelab Enthusiast",
      org: "Self-hosted · Proxmox VE",
      period: "2023 — Now",
      bullets: [
        "Two Proxmox VE nodes (pve / pve2): LXC, VMs, ZFS RAID1, SDN",
        "Docker & Dockge — Uptime Kuma, n8n, OpenSpeedTest, OmniTools, BentoPDF, Yubal, Jellyfin, LibreNMS, NFS, UniFi OS",
        "n8n workflow automation; local LLMs via LM Studio (MLX/Metal) on MacBook Air M4",
      ],
    },
  ],
  skills: {
    networking: ["Cisco", "Mikrotik", "Ubiquiti UniFi", "WireGuard", "Tailscale", "OpenVPN", "VLANs", "Firewall", "Network monitoring"],
    programming: ["PHP", "Go", "SQL / MySQL"],
    infra: ["Proxmox VE (LXC, VMs, ZFS)", "Docker & Dockge", "Linux (Debian, Ubuntu)", "DigitalOcean Droplets & Spaces", "NFS"],
    automation: ["n8n workflow automation", "LM Studio — local LLMs (MLX/Metal)"],
  },
  certifications: [
    "CCNA: Introduction to Networks — /portfolio/portfolio-1/",
    "CCNA: Switching, Routing, and Wireless Essentials — /portfolio/portfolio-2/",
    "CCNA: Enterprise Networking, Security, and Automation — /portfolio/portfolio-3/",
  ],
  interests: [
    "Network Infrastructure — routing, switching, VPN, monitoring",
    "Homelab & Self-Hosting — owning my stack, end to end",
    "Backend Development — building things that scale",
    "System Administration — Linux, containers, virtualization",
    "AI & Local LLMs — privacy-first AI on own hardware",
    "Workflow Automation — making computers do the boring stuff",
  ],
} as const;
