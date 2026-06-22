---
title: 'Self-Hosting UniFi OS on Proxmox to Manage Campus WiFi'
date: 2026-06-22
permalink: /posts/2026/06/unifi-os-proxmox-setup/
tags:
  - networking
  - unifi
  - proxmox
  - self-hosting
---

Managing a fleet of wireless access points across a campus can be a challenge — especially without a centralized controller. In this post, I'll share how I set up the **UniFi OS Server** (the successor to the legacy UniFi Network Application) running on my Proxmox server to manage all the Ubiquiti access points at my workplace.

## UniFi OS Server vs Legacy Network Application

It's important to note that Ubiquiti now recommends using the **UniFi OS Server** instead of the old "UniFi Network Server." UniFi OS provides a more unified experience with features like **Site Magic**, **Identity**, and seamless integration with **UniFi Site Manager** for remote management. If you're still running the legacy Network Application, it's worth migrating to UniFi OS for continued support and access to newer features.

## Why Self-Host?

Ubiquiti offers dedicated hardware consoles (like Cloud Gateway and CloudKey), but self-hosting gives you:

- **Full control** — no dependency on cloud services or extra hardware purchases
- **Flexibility** — run it on your own server with resources you can scale
- **Low latency** — the controller is on the same local network as the APs
- **Cost-effective** — no need to buy a dedicated UniFi console if you already have a server

Since I already run Proxmox, deploying UniFi OS in a VM was a natural choice.

## System Requirements

Before installing, make sure your system meets these requirements:

| Component | Requirement |
|-----------|-------------|
| **OS** | Ubuntu 23.04+, Debian 12+, or any modern Linux distro with `systemd`, `libc 2.31+`, `podman 4.3.1+`, and `slirp4netns 1.2+` |
| **CPU** | x86-64 Processor |
| **RAM** | Minimum 2 GB |
| **Storage** | At least 10 GB free space |
| **Network** | 100 Mbps Wired Ethernet |

UniFi OS also supports Windows 10+ (via WSL 2) and macOS Catalina 13.1.0+, but **Linux is the recommended platform** for production environments — and that's exactly what Proxmox provides.

## Installation on Proxmox

I run UniFi OS inside a **virtual machine** on my Proxmox node (`pve2`). Here's how I set it up:

### 1. Create a VM on Proxmox

I created a VM with the following specs:
- **OS:** Debian 12 (Bookworm)
- **CPU:** 2 cores
- **RAM:** 2 GB
- **Disk:** 16 GB
- **Network:** Bridged to the management network

### 2. Install the OS and Dependencies

After installing Debian 12, I made sure the system had the required dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y podman slirp4netns
```

Since UniFi OS uses **Podman** (a container runtime) under the hood, having `podman 4.3.1+` and `slirp4netns 1.2+` is essential.

### 3. Download and Install UniFi OS Server

Download the latest UniFi OS Server installer from the [official Ubiquiti Downloads page](https://www.ui.com/download/unifi):

```bash
# Download the .deb package from ui.com/download/unifi
sudo dpkg -i unifi-os-server_*.deb
```

### 4. Complete the Setup Wizard

Once installed, access the UniFi OS web interface:

```
https://<server-ip>:8443
```

The setup wizard will guide you through:
- Creating or signing in with your **UI Account**
- Configuring your first site
- Enabling **UniFi Site Manager** for remote management and automatic backups

### 5. Open Required Ports

Make sure the following ports are accessible for device communication:

| Port | Protocol | Purpose |
|------|----------|---------|
| 8443 | TCP | Web UI / Management |
| 8080 | TCP | Device communication |
| 3478 | UDP | STUN (required for device adoption) |
| 6789 | TCP | Speed test |
| 10001 | UDP | Device discovery |

## The Fleet: Access Points Under Management

After setting up UniFi OS, I adopted all the access points across the campus. Here's what the fleet looks like:

| Model | Quantity | Uplink | Status |
|-------|----------|--------|--------|
| **UAP-LR** | 1 | FE | ✅ Up to date |
| **UAP-AC-Lite** | 4 | GbE | ✅ Up to date |
| **U7 Lite** | 3 | GbE | ✅ Up to date |
| **U6+** | 1 | GbE | ✅ Up to date |
| **U6-LR** | 2 | GbE | ✅ Up to date |
| **AC-LR** | 1 | — | ⚠️ Offline (spare) |

That's **12 access points** in total — a mix of legacy and modern WiFi 5/6/7 models, all managed from a single UniFi OS dashboard.

### A Few Observations

- **UAP-LR** is the oldest model in the fleet, connected via **Fast Ethernet (FE)** which limits throughput to 100 Mbps. It still works fine for low-density areas, but it's on the replacement list.
- **UAP-AC-Lite** units are the workhorses — reliable WiFi 5 APs that have been running for years without issues.
- **U7 Lite** is the newest addition — WiFi 7 capable with great performance, perfect for high-traffic areas.
- **U6+ and U6-LR** provide excellent WiFi 6 coverage with improved range, especially the Long Range variants.
- The **AC-LR** marked as offline is kept as a **spare/backup** unit, ready to be deployed if another AP fails.

## What UniFi OS Brings to the Table

Compared to the legacy Network Application, UniFi OS provides a more integrated experience:

- 📊 **Unified Dashboard** — manage Network, Protect, Access, and other UniFi applications from a single OS
- 🌐 **Site Manager** — remote management via your UI Account, so you can manage your network from anywhere
- 🔄 **Automatic Updates** — firmware updates for all APs pushed from one place
- 📡 **Site Magic** — simplified inter-site networking
- 🔐 **Identity** — centralized user and access management
- 💾 **Automatic Backups** — enabled through Site Manager for peace of mind
- 🗺️ **Floor Maps** — upload building floor plans and visualize AP placement and coverage

## Lessons Learned

A few things I picked up during the setup:

1. **Check your dependencies** — UniFi OS relies on Podman and slirp4netns. Make sure the versions meet the minimum requirements, otherwise the installer will fail silently
2. **Use a supported distro** — Stick with Debian 12 or Ubuntu 23.04+ for the smoothest experience
3. **Assign a static IP** to the VM — Your APs need to consistently reach the controller at the same address
4. **Enable automatic backups** — Sign in with your UI Account during setup to enable Site Manager and automatic cloud backups
5. **Separate management VLAN** — If possible, put your APs and the controller on a dedicated management VLAN for cleaner network segmentation

## Final Thoughts

Moving from the legacy UniFi Network Application to the full **UniFi OS Server** has been a significant upgrade. The unified dashboard, Site Manager integration, and modern container-based architecture make it feel much more robust and future-proof.

If you're managing Ubiquiti gear and already have a Proxmox setup, self-hosting UniFi OS is the way to go. It's resource-efficient, gives you full control, and keeps everything on-premise. 🌐📡
