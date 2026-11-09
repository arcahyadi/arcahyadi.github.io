// content/portfolio.ts — case studies (EN). Indonesian mirrors live in src/i18n/content.id.ts.
// Client names, hostnames, addresses and internal identifiers stay out of this file.

export const portfolio = [
  {
    slug: "multi-site-network-modernization",
    title: "Network modernization for a 500-user campus",
    excerpt:
      "Campus network upgrade covering multi-WAN routing, VLAN segmentation, managed wireless and monitoring for 500+ users.",
    date: "2026-08-19",
    tags: ["Networking", "MikroTik", "UniFi", "Monitoring"],
    image: "",
    content: `Campus network upgrade for 500+ students, lecturers, and staff.

**Work delivered.**
- Configured multi-WAN failover and load distribution on MikroTik RouterOS with gateway health checks
- Configured LACP link aggregation for wireless distribution
- Redesigned firewall, NAT, VLAN segmentation and QoS
- Migrated the wireless controller to self-hosted UniFi OS Server on Proxmox with centralized RF and SSID policies
- Deployed LibreNMS and Uptime Kuma for monitoring and alerting
- Documented topology, the address plan and operating procedures

**Technical notes.** The routing and controller setup are covered in the [RouterOS guide](/blogs/mikrotik-multi-wan-bonding/) and [UniFi guide](/blogs/unifi-os-on-proxmox/).`,
    links: { github: "", demo: "" },
  },
  {
    slug: "internship-management-platform",
    title: "Internship management module",
    excerpt:
      "An internship module covering placements, supervisor assignments, grading, PDF recaps and CSV bulk import.",
    date: "2026-08-19",
    tags: ["Backend", "PHP", "MySQL", "Internal tools"],
    image: "",
    content: `An internship management module within an institutional web platform.

**Work delivered.**
- Internship placements and supervisor assignments
- Grading and PDF recaps
- CSV bulk import

**Related platform work.** Modernized the admin panel, added maintenance mode, improved the password reset flow, and refreshed public navigation and footer links.`,
    links: { github: "", demo: "" },
  },
  {
    slug: "monitoring-and-config-backup",
    title: "Monitoring and configuration backup for network devices",
    excerpt:
      "Network monitoring with LibreNMS and Uptime Kuma, with scheduled configuration exports to off-device storage.",
    date: "2026-08-19",
    tags: ["Operations", "LibreNMS", "Proxmox", "Backup"],
    image: "",
    content: `Monitoring and backup work for the campus network upgrade. This is part of the same project, not a separate client engagement.

**Work delivered.**
- LibreNMS and Uptime Kuma for real-time monitoring and alerting
- Scheduled binary backups and text configuration exports from the core router to off-device storage over SFTP
- Topology, address-plan and operating-procedure documentation

**Technical notes.** The backup setup is described in the [RouterOS guide](/blogs/mikrotik-multi-wan-bonding/).`,
    links: { github: "", demo: "" },
  },
  {
    slug: "cisco-ccna-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    excerpt: "Cisco Networking Academy certificate covering IP addressing, Ethernet and basic router and switch configuration.",
    date: "2022-06-01",
    tags: ["Cisco", "CCNA", "Networking"],
    image: "",
    content: `Certificate of completion for the **CCNA: Introduction to Networks** course in the Cisco Networking Academy program.

The course covers network architecture and models, IP addressing, Ethernet concepts and media, and basic router and switch configuration for a small LAN.`,
    links: { github: "https://github.com/arcahyadi", demo: "" },
  },
  {
    slug: "cisco-ccna-switching-and-wireless",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    excerpt: "Cisco Networking Academy certificate covering switching, WLAN configuration and LAN security fundamentals.",
    date: "2022-07-01",
    tags: ["Cisco", "CCNA", "Switching"],
    image: "",
    content: `Certificate of completion for the **CCNA: Switching, Routing, and Wireless Essentials** course in the Cisco Networking Academy program.

The course covers switching technologies, router operations in small to medium networks, WLAN configuration and fundamental LAN security.`,
    links: { github: "https://github.com/arcahyadi", demo: "" },
  },
  {
    slug: "cisco-ccna-enterprise-networking",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    excerpt: "Cisco Networking Academy certificate covering enterprise routing, WAN, QoS and network automation concepts.",
    date: "2022-08-01",
    tags: ["Cisco", "CCNA", "Enterprise"],
    image: "",
    content: `Certificate of completion for the **CCNA: Enterprise Networking, Security, and Automation** course in the Cisco Networking Academy program.

The course covers enterprise network design, WAN technologies, QoS, secure remote access, and the automation and virtualization concepts used to operate networks at scale.`,
    links: { github: "https://github.com/arcahyadi", demo: "" },
  },
] as const;
