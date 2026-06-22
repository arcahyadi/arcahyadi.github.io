---
title: 'Setting Up UniFi OS on Proxmox to Manage Campus WiFi'
date: 2026-06-22
permalink: /posts/2026/06/unifi-os-proxmox-setup/
tags:
  - networking
  - unifi
  - proxmox
  - self-hosting
---

Managing a fleet of wireless access points across a campus can be a challenge — especially without a centralized controller. In this post, I'll share how I set up **UniFi OS (UOS)** running inside a container on my Proxmox server to manage all the Ubiquiti access points at my workplace.

## Why Self-Host the UniFi Controller?

Ubiquiti offers a cloud-based option, but self-hosting the UniFi Network Application gives you:

- **Full control** — no dependency on cloud services or subscriptions
- **Low latency** — the controller is on the same local network as the APs
- **Privacy** — all network data stays on-premise
- **Always available** — as long as your server is up, your controller is up

Since I already run Proxmox for my homelab, spinning up a dedicated container for UniFi OS was a no-brainer.

## Installation on Proxmox

I run UniFi OS inside an **LXC container** on my Proxmox node. Here's a high-level overview of the setup:

1. **Create an LXC container** — I used a Debian-based template with enough resources (2 CPU cores, 2GB RAM, 8GB disk)
2. **Install dependencies** — Java (OpenJDK), MongoDB, and required libraries
3. **Add the UniFi repository** — Ubiquiti provides an official APT repository for the Network Application
4. **Install UniFi Network Application** — A simple `apt install unifi` after adding the repo
5. **Access the web UI** — Once installed, the UniFi controller is accessible via `https://<server-ip>:8443`

### Key Configuration Tips

- Make sure the container has a **static IP** so your APs can always reach the controller
- Open the necessary ports: **8443** (web UI), **8080** (device communication), **3478/UDP** (STUN)
- Set the **inform URL** on your APs to point to the controller's IP so they can be adopted

## The Fleet: Access Points Under Management

After setting up the controller, I adopted all the access points across the campus. Here's what the fleet looks like:

| Model | Quantity | Uplink | Status |
|-------|----------|--------|--------|
| **UAP-LR** | 1 | FE | ✅ Up to date |
| **UAP-AC-Lite** | 4 | GbE | ✅ Up to date |
| **U7 Lite** | 3 | GbE | ✅ Up to date |
| **U6+** | 1 | GbE | ✅ Up to date |
| **U6-LR** | 2 | GbE | ✅ Up to date |
| **AC-LR** | 1 | — | ⚠️ Offline (spare) |

That's **12 access points** in total — a mix of legacy and newer WiFi 6/6E models, all managed from a single dashboard.

### A Few Observations

- **UAP-LR** is the oldest model still in the fleet. It connects via **Fast Ethernet (FE)**, which limits throughput to 100 Mbps. It still works fine for low-density areas, but it's on the replacement list.
- **UAP-AC-Lite** units are the workhorses — reliable WiFi 5 APs that have been running for years without issues.
- **U7 Lite** is the newest addition — WiFi 7 capable with great performance, perfect for high-traffic areas.
- **U6+ and U6-LR** provide excellent WiFi 6 coverage with improved range, especially the Long Range variants.
- The **AC-LR** marked as offline is kept as a **spare/backup** unit, ready to be deployed if another AP fails.

## Managing Everything from One Dashboard

The beauty of UniFi OS is having everything in one place:

- 📊 **Real-time monitoring** — see CPU usage, load averages, and connected clients per AP
- 🔄 **Firmware updates** — push updates to all APs simultaneously with one click
- 📡 **WiFi configuration** — manage SSIDs, VLANs, guest networks, and radio settings centrally
- 🗺️ **Floor maps** — upload building floor plans and place APs on the map for visual coverage planning
- ⚠️ **Alerts** — get notified when an AP goes offline or experiences issues

## Lessons Learned

A few things I picked up along the way:

1. **MongoDB version matters** — UniFi Network Application is picky about MongoDB versions. Make sure to install a compatible version (check the release notes)
2. **Backup regularly** — UniFi has a built-in auto-backup feature. Enable it and save backups to a network share
3. **Use static IPs for APs** — While not strictly necessary, assigning static IPs to your APs through DHCP reservations makes troubleshooting much easier
4. **Separate management VLAN** — If possible, put your APs on a dedicated management VLAN for cleaner network segmentation

## Final Thoughts

Self-hosting UniFi OS on Proxmox has been a great experience. It gives me full control over the campus WiFi infrastructure without relying on cloud services, and running it as an LXC container means it uses minimal resources on my Proxmox node.

If you're managing Ubiquiti gear and already have a Proxmox setup, I highly recommend this approach. It's lightweight, reliable, and puts you in full control of your network. 🌐📡
