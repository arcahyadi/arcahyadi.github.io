---
title: 'My Docker Setup: Managing Containers with Dockge'
date: 2026-06-25
permalink: /posts/2026/06/docker-dockge-setup/
tags:
  - docker
  - self-hosting
  - homelab
  - dockge
---

Docker is a containerization platform that makes spinning up new services incredibly easy — just pull an image, configure a compose file, and you're up and running. But managing multiple Docker Compose stacks from the command line can get tedious. That's where **Dockge** comes in.

## What is Dockge?

[Dockge](https://github.com/louislam/dockge) is a self-hosted Docker Compose stack manager built by the same developer behind Uptime Kuma. It provides a clean, modern web UI to create, manage, and monitor your Docker Compose stacks — without needing to SSH into your server every time.

What I love about Dockge:

- 🎨 **Beautiful UI** — clean dark interface that makes managing stacks a pleasure
- 📝 **Compose editor** — edit your `docker-compose.yml` files directly in the browser
- ▶️ **One-click controls** — start, stop, restart, and update stacks with a single click
- 📊 **Real-time status** — see which containers are active at a glance
- 🔄 **Interactive updates** — pull new images and recreate containers easily

Unlike Portainer, Dockge focuses specifically on Docker Compose, which is exactly what I need. It's lightweight, fast, and doesn't try to do too much.

## My Container Stack

Here's what I'm currently running through Dockge — all containers are **active** and running smoothly:

### 📊 Uptime Kuma — Service Monitoring

[Uptime Kuma](https://github.com/louislam/uptime-kuma) is my go-to uptime monitoring tool. It monitors all my services, websites, and network devices, and sends alerts when something goes down. It supports multiple notification channels including Telegram, Discord, and email.

**Why I use it:** In a homelab with so many services running, knowing immediately when something breaks is essential. Uptime Kuma gives me a beautiful status page and peace of mind.

### 🔄 n8n — Workflow Automation

[n8n](https://n8n.io/) is a powerful workflow automation platform — think of it as a self-hosted alternative to Zapier or Make. I use it to automate repetitive tasks and connect different services together.

**Why I use it:** Automation is one of my passions. n8n lets me build complex workflows visually, connecting APIs, databases, and services without writing boilerplate code for every integration.

### 🌐 OpenSpeedTest — Network Speed Testing

[OpenSpeedTest](https://github.com/openspeedtest/Docker-Image) is a self-hosted speed test server. It lets me test network speeds between devices and my server without relying on external services like Speedtest.net.

**Why I use it:** When troubleshooting network issues across the campus, having a local speed test server gives accurate results without internet variables affecting the test. It's also great for verifying that network upgrades actually improved throughput.

### 📈 SpeedTrack — Speed Test History

[SpeedTrack](https://github.com/alexjustesen/speedtest-tracker) works alongside OpenSpeedTest to **track and log speed test results over time**. Instead of running a test and forgetting the numbers, SpeedTrack keeps a historical record so I can spot trends and degradation.

**Why I use it:** Being able to look back at network performance over weeks or months helps me identify patterns — like whether speeds drop during certain hours or after configuration changes.

### 🧰 OmniTools — All-in-One Utility Toolbox

[OmniTools](https://github.com/iib0011/omni-tools) is a self-hosted collection of various IT utilities and tools accessible from a web browser. It bundles handy tools like encoders/decoders, formatters, converters, and network utilities into a single interface.

**Why I use it:** Instead of searching for random online tools every time I need to encode a Base64 string or format JSON, I have everything in one place on my own server — fast, private, and always available.

### 📄 BentoPDF — PDF Generation

[BentoPDF](https://github.com/nicholasgasior/bento-pdf) is a privacy-first, client-side PDF toolkit for manipulating, merging, splitting, and processing PDF files — all running locally in the browser via WebAssembly.

**Why I use it:** Useful for automating document workflows and converting files without uploading them to third-party services. Keeps everything private and on-premise.

### 🎵 Yubal — YouTube Music Downloader

[Yubal](https://github.com/guillevc/yubal) is a self-hosted YouTube Music downloader. Paste a link, and it downloads the track with proper tags and organizes it into your library automatically.

Key features:
- **Scheduled sync** — automatically download new releases from your favorite artists
- **Smart deduplication** — no duplicate files cluttering your library
- **Media server ready** — organized output that works perfectly with Jellyfin, Plex, or Navidrome
- **Browser extension** — download directly from YouTube Music with one click

**Why I use it:** Combined with Jellyfin on my Proxmox node, Yubal gives me a complete self-hosted music streaming setup. I paste a link, Yubal downloads and tags it, and it shows up in my media server — no subscriptions needed.

## Why Dockge Over Portainer?

I've used Portainer before, and while it's powerful, it felt like overkill for my use case. Here's why I chose Dockge:

| Feature | Dockge | Portainer |
|---------|--------|-----------|
| **Focus** | Docker Compose only | Full Docker management |
| **Complexity** | Simple and lightweight | Feature-rich but heavier |
| **Compose editing** | Native YAML editor | Limited compose support |
| **Resource usage** | Minimal | Higher |
| **Learning curve** | Almost none | Moderate |

Dockge does one thing and does it well — managing Docker Compose stacks with a beautiful interface. For my homelab, that's exactly what I need.

## Tips for Getting Started with Dockge

If you want to try Dockge yourself, here are a few tips:

1. **Install Dockge itself via Docker** — it's a single compose file to get started
2. **Organize your stacks** — give each stack a clear, descriptive name
3. **Use environment variables** — keep sensitive data like passwords and API keys in `.env` files
4. **Set restart policies** — use `restart: unless-stopped` so your containers survive reboots
5. **Keep compose files clean** — Dockge stores all compose files in a central directory, making backups easy

## Final Thoughts

Docker + Dockge has been a game-changer for my homelab. The combination of Docker's flexibility with Dockge's clean management interface means I spend less time on maintenance and more time actually using my services.

Whether you're just starting with Docker or looking for a better way to manage your existing stacks, I highly recommend giving Dockge a try. It's lightweight, intuitive, and makes self-hosting a lot more enjoyable. 🐳
