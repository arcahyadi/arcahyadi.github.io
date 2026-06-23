---
title: 'MikroTik CCR1016 Campus Network Configuration Deep Dive'
date: 2026-06-23
permalink: /posts/2026/06/mikrotik-ccr-campus-config/
tags:
  - mikrotik
  - networking
  - campus-network
  - routeros
---

I'm currently working on the configuration of a campus network's core router — a **MikroTik CCR1016-12G** running RouterOS 7.22.1. This is the backbone of the entire campus internet infrastructure. Here's a breakdown of the key configurations I maintain on this device.

## The Device

- **Model**: MikroTik CCR1016-12G (Cloud Core Router — 16 CPU cores, 12x Gigabit Ethernet)
- **RouterOS Version**: 7.22.1

The CCR1016 is a serious piece of hardware designed for ISP-grade routing. With 16 CPU cores, it handles the heavy packet-processing demands of a campus network without breaking a sweat.

---

## 1. Interface Naming & Bonding

One of the first things I always do on MikroTik is rename interfaces to something meaningful:

```routeros
/interface ethernet
set ether1 name=ether-1-internet
set ether2 name=ether-2-internet
set ether3 name=ether-3-internet
set ether5 name=ether-5-wifi-ged1
```

Ports `ether1` through `ether3` are dedicated to internet uplinks (multiple ISPs). `ether5` is the uplink to the WiFi building network.

For resilience and throughput in the internal network, I use **802.3ad Link Aggregation (LACP)** bonding:

```routeros
/interface bonding
add mode=802.3ad name="Bonding port 5-7" slaves=ether-5-wifi-ged1,ether6,ether7
```

Ports 5, 6, and 7 are bonded together, creating a logical interface with higher bandwidth and redundancy for the main campus WiFi distribution.

---

## 2. Multi-WAN: Three ISP Uplinks

The campus has **three simultaneous ISP connections** for redundancy and load distribution:

```routeros
/ip dhcp-client
add interface=ether-1-internet
add interface=ether-2-internet
add interface=ether-3-internet

/routing table
add fib name=via-ISP1
add fib name=via-ISP2
add fib name=via-ISP3

/ip route
add dst-address=0.0.0.0/0 gateway=192.168.1.1 routing-table=main check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.168.2.1 routing-table=main check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.168.3.1 routing-table=main check-gateway=ping
```

Each ISP has its own routing table (`via-ISP1`, `via-ISP2`, `via-ISP3`), and the main routing table has all three as equal-cost routes with `check-gateway=ping` — meaning if any ISP goes down, its route is automatically removed from the active routing table.

---

## 3. WireGuard VPN to DigitalOcean Droplet

A WireGuard tunnel connects the campus router to a **DigitalOcean VPS in Singapore**:

```routeros
/interface wireguard
add listen-port=51363 mtu=1420 name=wg-sg-droplet

/interface wireguard peers
add interface=wg-sg-droplet endpoint-address=104.248.155.213 endpoint-port=51363 \
    allowed-address=0.0.0.0/0 name=peer1

/ip address
add address=10.66.66.2/24 interface=wg-sg-droplet
```

This tunnel is used for secure remote management and potentially routing certain traffic through Singapore when needed. The WinBox admin access is also restricted to the WireGuard subnet (`10.66.66.0/24`) alongside the internal LAN.

---

## 4. Hotspot System for Campus Users

The most complex part of this config is the **IP Hotspot** system that manages internet access for all campus users. We serve three major groups: **Mahasiswa (Students)**, **Dosen (Lecturers)**, and **Tendik (Administrative Staff)**.

### User Profiles with Rate Limiting

Different roles get different bandwidth allocations:

| Profile | Shared Users | Notes
|---|---|---|
| `mahasiswa` | 2 per account | For students |
| `dosen` | 4 per account | For lecturers |
| `tendik` | 4 per account | For admin staff |
| `tendik - cs` | — | Security/CS staff |
| `tendik it` | 40 | IT staff |
| `ujian` | 200 | Exam period account |
| `pkkmb` | 200 | Orientation week |
| `guest` | 100 | Guest account |
| `acara` | 200 | Events account |

### Hotspot Network

```routeros
/ip pool
add name=dhcp_pool0 ranges=172.16.1.2-172.16.7.254

/ip dhcp-server network
add address=172.16.0.0/21 dns-server=172.16.0.1 gateway=172.16.0.1 ntp-server=172.16.0.1
```

The campus uses a `/21` subnet (`172.16.0.0/21`), giving us 2046 usable IP addresses — enough for the entire campus community connected simultaneously.

The router also acts as the **DNS server** and **NTP server** for the internal network.

### User Accounts

User accounts are created per individual, linked to their student ID or staff name, and assigned a profile. Here's a sample:

```routeros
/ip hotspot user
add name=220102001 comment="S122A - TIKA ANGGREINY" profile=mahasiswa
add name=hafizh    comment="Dosen - Hafizh"          profile=dosen
add name=lulu      comment="Tendik - Lulu"            profile=tendik
add name=ujian     comment="AKUN UJIAN"               profile=ujian
```

Student accounts follow a naming convention based on their enrollment year and major code (e.g., `220102001` = year 2022, major 01, number 002, student 001). I maintain hundreds of individual user accounts for students from batches **2022, 2023, 2024, and 2025**.

---

## 5. DHCP Static Leases for Infrastructure Devices

Key infrastructure devices have **static DHCP leases** to ensure they always get the same IP:

```routeros
/ip dhcp-server lease
add address=172.16.0.100 mac-address=F4:E2:C6:16:4C:75  # AP
add address=172.16.0.110 comment="u7 biologi"            # U7 AP at Biology building
add address=172.16.7.10  comment=nfs2                    # NFS server
add address=172.16.2.147 mac-address=02:53:90:B1:32:B8  # SNMP monitoring device
add address=172.16.1.91  comment="Mikrotik Switch"       # Managed Switch
```

The Ubiquiti U7 access points and the NFS server are pinned to specific IPs so that monitoring systems and DHCP reservations remain stable even after router reboots.

---

## 6. Firewall Address List (`nice.rsc`)

A large portion of the config is a **firewall address list** called `nice`, which contains thousands of IP ranges. This is a well-known list from `www.mikrotik.co.id` (last updated January 2024) used to mark "good" or "trusted" IP ranges for routing decisions.

```routeros
/ip firewall address-list
add address=8.215.0.0/16 list=nice
add address=18.136.0.0/16 list=nice
add address=34.101.0.0/16 list=nice
# ... thousands more entries
```

This list is used for policy-based routing — certain traffic destined for these "nice" IPs can be routed differently, for example bypassing certain firewall rules or being routed through a specific ISP.

---

## 7. Automated Backup to NAS via SFTP

I set up an automated backup script that runs every **2 days** and uploads both a `.backup` file and an `.rsc` export to a NAS server on the local network:

```routeros
/system scheduler
add name=Schedule-Backup-2Hari interval=2d on-event=script1 start-time=13:20:00
```

The script (`script1`) does the following:

1. Generates a filename based on the router's name and current date (e.g., `CCR_2026-06-21`).
2. Creates both a binary `.backup` and a text `.rsc` export.
3. Waits 10 seconds for files to be written.
4. Uploads both files to `172.16.1.48` (the NAS) via **SFTP**.
5. Logs success or failure of each step.

This is the exact `.rsc` file I'm writing about right now! The file I'm analysing (`CCR_2026-06-21.rsc`) was generated and automatically pushed to our NAS at 13:20 on June 21, 2026.

---

## 8. Security Hardening

Several security measures are in place:

```routeros
/ip service
set ftp      disabled=yes
set telnet   disabled=yes
set api      disabled=yes
set api-ssl  disabled=yes
set winbox   address=172.16.0.0/21,10.66.66.0/24  # Restrict to LAN + WireGuard
set www      port=16100                             # Move HTTP to non-standard port

/ip ssh
set host-key-size=8192 strong-crypto=yes

/ip neighbor discovery-settings
set discover-interface-list=none  # Disable CDP/LLDP discovery

/ipv6 settings
set disable-ipv6=yes  # IPv6 disabled (not yet deployed on campus)

/ip cloud
set ddns-enabled=yes ddns-update-interval=10m  # MikroTik DDNS for remote access
```

Key security decisions:
- **FTP, Telnet, API all disabled** — only SSH, WinBox, and WebFig (on custom port) are allowed.
- **WinBox access restricted** to the internal LAN (`172.16.0.0/21`) and the WireGuard VPN tunnel only.
- **Strong SSH crypto** with 8192-bit host key.
- **Neighbour discovery disabled** to avoid leaking topology information.

---

## 9. SNMP for Network Monitoring

SNMP is enabled for integration with our **LibreNMS** monitoring system:

```routeros
/snmp
set enabled=yes contact="ISFI IT" location="ISFI BJM"

/snmp community
set [ find default=yes ] addresses=172.16.2.147/32  # Restrict to LibreNMS host only
```

SNMP access is locked to a single host (`172.16.2.147`) which is the LibreNMS server running on our Proxmox homelab — no one else on the network can poll SNMP data.

---

## 10. Managed Switch: MikroTik CRS326-24G-2S+ (SwOS)

Beyond the core router, I also manage a **MikroTik CRS326-24G-2S+** — a 24-port Gigabit managed switch with 2 SFP+ slots, running **SwOS** (Switch OS), MikroTik's lightweight web-based OS designed specifically for switching.

**Device details:**

| Property | Value |
|---|---|
| **Model** | CRS326-24G-2S+ |
| **Firmware** | SwOS |
| **Management IP** | 192.168.88.1 (Static) |
| **Uptime** | 20 days |
| **DHCP Fallback** | Enabled |

### Port Assignment & Status

The 24 copper ports are assigned to different parts of the campus network.

Ports 1, 21, and 22 are marked as **LAG Ports** — these are part of the Link Aggregation Group that connects back to the CCR1016 router's bonded interface (`Bonding port 5-7`). This creates a multi-gigabit uplink between the switch and the router with redundancy.

Port 24 is the downlink to **Gedung 6** (Building 6), and Port 23 serves a classroom area (Ruang 3 or 4). Descriptive port labels like these make troubleshooting much faster — when someone calls to say "no internet in the lecturer's room," I can immediately check Port 4 ("Dosen") in the SwOS dashboard.

### Why SwOS Instead of RouterOS?

The CRS326 can run either SwOS or RouterOS. For this deployment, SwOS is the better choice because:

- **Simplicity** — SwOS is purpose-built for Layer 2 switching with a clean web UI. No need for the full RouterOS feature set when all we need is switching.
- **Lower resource overhead** — SwOS is lighter and leaves more CPU/memory for packet switching.
- **Easy port management** — The SwOS interface makes it trivial to see port status, assign VLANs, or configure LAG from any browser.

---

## Summary

This CCR1016 + CRS326 combination handles an impressive amount of responsibility for our campus:

- **Multi-WAN failover** across 3 ISPs with automatic gateway health checks
- **Hotspot authentication** for hundreds of students, lecturers, and staff
- **Bandwidth management** via per-profile rate limiting
- **WireGuard VPN** to a cloud server for secure remote access
- **Automated config backups** to NAS via SFTP every 2 days
- **SNMP monitoring** integrated with LibreNMS
- **Link aggregation** between the CCR1016 router and CRS326 switch for internal network resilience
- **Managed switching** via CRS326-24G-2S+ with descriptive per-port labels
- **Hotspot Client Average**: Around 50–150 users, **Peak**: Up to 300 users

Managing a network of this scale is always a learning experience. The combination of MikroTik's flexibility with RouterOS and the CCR's raw processing power makes it a great choice for campus-scale deployments. 🌐
