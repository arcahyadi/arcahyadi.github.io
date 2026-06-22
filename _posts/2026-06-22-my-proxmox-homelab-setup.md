---
title: 'My Proxmox Homelab Setup: What I Run and Why'
date: 2026-06-22
permalink: /posts/2026/06/my-proxmox-homelab-setup/
tags:
  - homelab
  - proxmox
  - self-hosting
  - networking
---

One of my favorite things about being in tech is having a homelab. There's nothing quite like running your own infrastructure at home — it's a playground where you can experiment, break things, and learn without consequences. In this post, I want to share my current Proxmox homelab setup and what services I'm running on it.

## The Setup: Two Proxmox Nodes

My homelab runs on **two Proxmox VE nodes**: `pve` and `pve2`. Having two separate nodes gives me flexibility to separate workloads and experiment with different configurations without affecting my main services.

### Node 1: `pve` — The Lightweight Workhorse

This node runs mostly **LXC containers**, which are lightweight and perfect for services that don't need a full virtual machine.

| ID  | Name                | Type | Description |
|-----|---------------------|------|-------------|
| 100 | **n8n**             | LXC  | Workflow automation platform — I use this to automate repetitive tasks and connect different services together |
| 101 | **pve-scripts-local** | LXC | Local scripts for Proxmox management and maintenance |
| 103 | **librenms**        | LXC  | Network monitoring system — keeps an eye on all my devices and alerts me if something goes down |
| 109 | **qbittorrent**     | LXC  | Torrent client for downloading Linux ISOs (of course 😄) |
| 110 | **nfs**             | LXC  | NFS file server for shared storage across the network |
| 111 | **docker**          | LXC  | Docker host running various containerized services |

**Storage on `pve`:**
- `local`, `local-lvm` and `lvm-hdd2-pve` — standard Proxmox storage

### Node 2: `pve2` — The Heavy Lifter

This node handles heavier workloads with a mix of **LXC containers and full VMs**.

| ID  | Name                | Type | Description |
|-----|---------------------|------|-------------|
| 100 | **jellyfin**        | CT   | Media server — my personal Netflix for streaming movies and shows at home |
| 101 | **backup**          | CT   | Backup services to keep everything safe and recoverable |
| 102 | **alpine-it-tools** | CT   | Lightweight Alpine-based container packed with IT tools for troubleshooting |
| 103 | **docker**          | CT   | Another Docker host for additional containerized services |
| 104 | **win10**           | VM   | Windows 10 virtual machine — for when I need Windows-specific tools |
| 105 | **kali**            | VM   | Kali Linux — for security testing and learning penetration testing |
| 108 | **unifi-os-server** | CT   | UniFi Network controller for managing my Ubiquiti network gear |
| 110 | **nfs2**            | CT   | Secondary NFS server for additional shared storage |

**Storage on `pve2`:**
- `local` and `local-lvm` — standard Proxmox storage
- `data_zfs` — ZFS pool for data integrity and snapshots with RAID1 Configuration
- `zfs-baru` — additional ZFS storage pool with RAID1 Configuration

Both nodes also share a `localnetwork` SDN zone, which helps with internal networking between VMs and containers.

## Why These Services?

Each service in my homelab serves a specific purpose:

- 🎬 **Jellyfin** — I love having my own media server. No subscriptions, no restrictions, just my content available anywhere on my network
- 📊 **LibreNMS** — As someone who works with network infrastructure, monitoring is essential. LibreNMS gives me full visibility into my network health
- 🔄 **n8n** — Automation is one of my passions. n8n lets me create workflows that connect services and automate tasks without writing code for every little thing
- 🐳 **Docker** — Having dedicated Docker hosts on both nodes gives me the flexibility to spin up new services quickly
- 📡 **UniFi Controller** — Managing my Ubiquiti access points and switches from a centralized dashboard makes network management a breeze
- 🔐 **Kali Linux** — Security is important, and having a Kali VM ready to go means I can always practice and test security tools

## Storage Strategy

I use a combination of **LVM** and **ZFS** for storage:

- **LVM** is used for the main Proxmox storage and VM disks
- **ZFS** provides data integrity with checksumming, easy snapshots, and compression — great for important data that I can't afford to lose
- **NFS** servers on both nodes allow shared storage access across the network

## What's Next?

My homelab is always evolving. Some things I'm planning to add or improve:

- Setting up **Proxmox Backup Server** for centralized backup management
- Adding more monitoring with **Grafana** dashboards
- Experimenting with **Kubernetes** (k3s) for container orchestration
- Improving network segmentation with **VLANs**

## Final Thoughts

Running a homelab has been one of the best investments in my learning journey. It's where I practice what I learn, break things safely, and build skills that directly translate to my work. If you're thinking about starting your own homelab, I highly recommend it — even a single mini PC running Proxmox can be a great starting point!

Feel free to reach out if you have questions about any of my setup. Happy homelabbing! 🏠🖥️
