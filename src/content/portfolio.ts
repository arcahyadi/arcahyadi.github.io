// content/portfolio.ts — auto-generated from arcahyadi.github.io/_portfolio
// Tambah portfolio: tambah object baru, slug jadi URL /portfolio/[slug]

export const portfolio = [
  {
    slug: "stikes-isfi-campus-network-upgrade",
    title: "STIKES ISFI Banjarmasin — Campus Network System Upgrade",
    excerpt: "End-to-end upgrade of campus network infrastructure — core router, WiFi, VLANs and monitoring for 500+ users",
    date: "2026-08-19",
    tags: ["Networking", "MikroTik", "UniFi", "Infrastructure", "STIKES ISFI"],
    image: "/social-share.png",
    content: `Lead upgrade and modernization of the campus network system at **STIKES ISFI Banjarmasin** — serving 500+ students, lecturers, and staff.

**Core Router — MikroTik CCR1016 (RouterOS 7):**
- Optimized CCR1016-12G with RouterOS 7.22.1 as campus core gateway
- Multi-WAN with 3 ISP uplinks (failover + load distribution, \`check-gateway=ping\`)
- Interface bonding 802.3ad (LACP) for high-throughput WiFi distribution (Bonding port 5-7)
- Redesigned firewall, NAT, VLAN segmentation and QoS/traffic shaping for stability and fairness

**Wireless — UniFi OS Server (self-hosted on Proxmox):**
- Migrated from legacy UniFi Network Application to **UniFi OS Server**
- Centralized management of AP fleet: UAP-LR, UAP-AC-Lite, U7 Lite, U6+, U6-LR
- Improved coverage, seamless roaming, and centralized RF/SSID policy

**Monitoring & Operations:**
- LibreNMS + Uptime Kuma for real-time monitoring and alerting
- Documentation of topology, IP plan, and SOP for campus IT operations

This work complements ongoing development of [stikes-isfi.ac.id](https://stikes-isfi.ac.id) and is documented in more detail in my blogs:
- [MikroTik CCR1016 Campus Config](/blogs/mikrotik-ccr-campus-config/)
- [Self-Hosting UniFi OS on Proxmox](/blogs/unifi-os-proxmox-setup/)

[🌐 Campus Website](https://stikes-isfi.ac.id)`,
    links: { github: "", demo: "https://stikes-isfi.ac.id" },
  },
  {
    slug: "stikes-isfi-ac-id-updates",
    title: "STIKES ISFI Banjarmasin — Web Platform Updates",
    excerpt: "Major updates to stikes-isfi.ac.id — PWP internship module, Admin modernization, and public site improvements",
    date: "2026-08-19",
    tags: ["STIKES ISFI", "Full-Stack", "Web Development"],
    image: "/social-share.png",
    content: `Ongoing development for the official campus platform **[stikes-isfi.ac.id](https://stikes-isfi.ac.id)** — delivered as Programmer & SysAdmin at STIKES ISFI Banjarmasin.

**What I shipped:**
- **PWP Module (Praktik Kerja Lapangan)** — end-to-end internship management: placements, supervisor assignments, grading, and PDF recaps with CSV bulk import
- **Admin Modernization** — unified Admin panel to a consistent MonsterAdmin theme for a cleaner, more maintainable UI
- **Operations & Security** — added maintenance mode and improved user password reset flow
- **Public Website** — refreshed footer, navigation, and important links for better usability

[🌐 Visit Website](https://stikes-isfi.ac.id)`,
    links: { github: "", demo: "https://stikes-isfi.ac.id" },
  },
  {
    slug: "portfolio-1",
    title: "CCNA: Introduction to Networks",
    excerpt: "CCNA NETWORK ENGINEER Introduction to Networks",
    date: "2022-06-01",
    tags: ["Cisco", "CCNA", "Networking"],
    image: "/social-share.png",
    content: `This certificate verifies the successful completion of the **CCNA: Introduction to Networks** course, part of the Cisco Networking Academy program.

The course covers the architecture, structure, functions, components, and models of the Internet and other computer networks. It provides a solid foundation in the principles of IP addressing and the fundamentals of Ethernet concepts, media, and operations to build simple LANs, perform basic configurations for routers and switches, and implement IP addressing schemes.`,
    links: { github: "https://github.com/arcahyadi", demo: "#" },
  },
  {
    slug: "portfolio-2",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    excerpt: "CCNA NETWORK ENGINEER Switching, Routing, and Wireless Essentials",
    date: "2022-07-01",
    tags: ["Cisco", "CCNA", "Switching"],
    image: "/social-share.png",
    content: `This certificate verifies the successful completion of the **CCNA: Switching, Routing, and Wireless Essentials** course, part of the Cisco Networking Academy program.

The course focuses on switching technologies and router operations that support small-to-medium business networks, including wireless local area networks (WLANs) and fundamental security concepts. It covers performing basic network configuration and troubleshooting, identifying and mitigating LAN security threats, and configuring and securing a basic WLAN.`,
    links: { github: "https://github.com/arcahyadi", demo: "#" },
  },
  {
    slug: "portfolio-3",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    excerpt: "CCNA NETWORK ENGINEER Enterprise Networking, Security, and Automation",
    date: "2022-08-01",
    tags: ["Cisco", "CCNA", "Enterprise"],
    image: "/social-share.png",
    content: `This certificate verifies the successful completion of the **CCNA: Enterprise Networking, Security, and Automation** course, part of the Cisco Networking Academy program.

The course describes the architecture and considerations related to designing, securing, operating, and troubleshooting enterprise networks. It covers wide area network (WAN) technologies and quality of service (QoS) mechanisms used for secure remote access, along with the introduction of software-defined networking, virtualization, and automation concepts that support the digitalization of networks.`,
    links: { github: "https://github.com/arcahyadi", demo: "#" },
  },
] as const;
