// content/portfolio.ts — case studies (EN). Indonesian mirrors live in src/i18n/content.id.ts.
// Client names, hostnames, addresses and internal identifiers stay out of this file.

export const portfolio = [
  {
    slug: "multi-site-network-modernization",
    title: "Network modernization for a 500-user campus",
    excerpt:
      "Replaced a flat, unmonitored network with segmented VLANs, a redundant multi-WAN edge and a managed wireless fleet, without a full downtime window.",
    date: "2026-06-01",
    tags: ["Networking", "MikroTik", "UniFi", "Monitoring"],
    image: "",
    content: `**Context.** A campus network serving roughly 500 students and staff had grown one switch at a time. Every device shared a flat address space, the edge router had a single uplink, and there was no monitoring beyond a ping check.

**Problem.** Broadcast traffic and a single misconfigured device could affect the whole site. When an uplink failed, recovery depended on someone noticing and changing a route by hand. Wireless coverage was patched with consumer access points that could not roam.

**Approach.**
- Documented the existing topology and address plan before changing anything
- Split the network into staff, student, guest and management VLANs with explicit firewall policy between them
- Configured provider failover on the edge router with gateway health checks and QoS for the shared uplink
- Consolidated wireless onto a self-hosted controller with a consistent SSID and roaming policy
- Added interface, link-state and latency monitoring with alerts to the operations team

**Result.** A failed provider now fails over without intervention. Management access is limited to a dedicated VLAN and a VPN, so a bad change on the user network no longer locks out the administrator. The address plan, topology and rollback steps are written down and handed over.`,
    links: { github: "", demo: "" },
  },
  {
    slug: "internship-management-platform",
    title: "Internship management platform replacing spreadsheets",
    excerpt:
      "A PHP and MySQL module that handles placements, supervisor assignments, grading and PDF recaps, with bulk import from the previous spreadsheet workflow.",
    date: "2026-05-20",
    tags: ["Backend", "PHP", "MySQL", "Internal tools"],
    image: "",
    content: `**Context.** A study program managed internships in a spreadsheet that was emailed between coordinators. Every semester the same rows were retyped, and the final recap was assembled by hand.

**Problem.** There was no single source of truth. Two coordinators could edit different copies, placement status was unclear, and producing the final report took days. Supervisor assignments and grades lived in separate files.

**Approach.**
- Modelled placements, supervisors, periods and grades as related tables with foreign keys
- Built role-based admin screens with server-side validation
- Added CSV import so existing rows could be migrated without retyping
- Generated the recap PDF from the same records instead of assembling it manually

**Result.** One record per placement. The recap is generated on demand, and the coordinator can see which placements are still missing a supervisor or a grade. Historical rows are imported from CSV instead of being retyped each semester.`,
    links: { github: "", demo: "" },
  },
  {
    slug: "monitoring-and-config-backup",
    title: "Monitoring and configuration backup for network devices",
    excerpt:
      "LibreNMS and Uptime Kuma for visibility, plus scheduled configuration exports to off-device storage, so a failed device is a restore instead of a rebuild.",
    date: "2026-05-05",
    tags: ["Operations", "LibreNMS", "Proxmox", "Backup"],
    image: "",
    content: `**Context.** Network devices were managed one at a time. Configuration changes were not tracked, and a failed switch meant rebuilding it from memory.

**Problem.** Outages were reported by users, not by monitoring. Nobody could say which device changed before an incident, and there was no copy of any configuration outside the device itself.

**Approach.**
- Deployed LibreNMS for interface, CPU, memory and link-state metrics, with alert rules tied to the management VLAN
- Added Uptime Kuma checks for the services users actually notice: DNS, intranet, mail and the VPN endpoint
- Scheduled configuration exports from routers and switches to a separate backup host
- Kept the previous export on the device for a quick rollback, and a copy off-device for a full rebuild
- Wrote a one-page restore procedure to follow on a spare unit

**Result.** Alerts arrive before users call. Every device has a configuration export outside the device itself, and the restore steps are written down instead of living in memory.`,
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

The course covers network architecture and models, IP addressing, Ethernet concepts and media, and the basic configuration needed to build a small LAN. It is the foundation the rest of the CCNA path builds on.`,
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

The course covers switching technologies, router operations in small to medium networks, WLAN configuration and fundamental LAN security. The lab work is where the material sticks: VLANs, trunking and wireless configuration fail in ways a slide cannot show.`,
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
