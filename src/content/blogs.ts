// content/blogs.ts — auto-generated from arcahyadi.github.io/_posts (9 posts)
// Tambah blog: duplikat salah satu object, ganti slug (unik) + isi. Mirip _posts di academicpages.

export const blogs = [
  {
    slug: "mikrotik-ccr-campus-config",
    title: "Multi-WAN failover and link aggregation on RouterOS",
    date: "2026-06-23",
    excerpt:
      "RouterOS configuration notes for multi-WAN failover, link aggregation, management access, and scheduled backups.",
    tags: ["mikrotik", "networking", "routeros", "high-availability"],
    content: `This example covers provider failover and internal link aggregation with RouterOS. It uses documentation addresses; replace them with addresses from your own network plan.

## Design

Start from what the network must survive:

- Loss of one provider without manual intervention
- A distribution switch that can lose one cable without losing the link
- Management access that still works when the LAN is misconfigured
- Configuration backups that do not depend on someone remembering them

## Uplinks and failover

Give each provider its own DHCP client, then add default routes with gateway health checks. When a gateway stops answering, RouterOS removes that route and traffic moves to the remaining provider.

\`\`\`routeros
/ip dhcp-client
add interface=ether-1-internet
add interface=ether-2-internet
add interface=ether-3-internet

/ip route
add dst-address=0.0.0.0/0 gateway=192.0.2.1 check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.0.2.2 check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.0.2.3 check-gateway=ping
\`\`\`

The \`192.0.2.0/24\` range is reserved for documentation examples.

## Bonding

For the link to the distribution switch, LACP gives both more throughput and redundancy. Both ends must agree on the mode, and the switch ports must be configured before the bond is enabled.

\`\`\`routeros
/interface bonding
add mode=802.3ad name=bond-distribution slaves=ether-5,ether6,ether7
\`\`\`

If the switch does not support LACP, active-backup is the safer choice: it fails over without any switch-side configuration.

## Firewall and management access

Management should not be reachable from every subnet. Restrict WinBox and SSH to a management VLAN and a VPN subnet, and disable the services you do not use.

\`\`\`routeros
/ip service
set ftp disabled=yes
set telnet disabled=yes
set api disabled=yes
set api-ssl disabled=yes
set winbox address=192.168.10.0/24,192.168.99.0/24
set www port=8443

/ip ssh
set strong-crypto=yes
\`\`\`

Keep a second way in, such as a serial console or a documented physical procedure, before you tighten management access.

## Backups and monitoring

Schedule configuration exports to off-device storage so they remain available if the router fails.

\`\`\`routeros
/system scheduler
add name=config-backup interval=2d on-event=config-backup start-time=02:00:00

/system script
add name=config-backup policy=ftp,read,write,sensitive source={
  /export file=config-backup
  /tool fetch url="sftp://192.0.2.50" src-path=config-backup.rsc \\
    dst-path=config-backup.rsc user=backup password=change-me upload=yes
}
\`\`\`

Export SNMP to a monitoring host on the management VLAN for interface and health counters. Alert on link state and packet loss, not only on ping.

## What to verify before cutover

1. Test failover by disabling each uplink in turn and watching the active route
2. Confirm the bond carries traffic with one member cable removed
3. Check that management access still works from the VPN with the LAN default route broken
4. Restore a configuration export on a spare device and confirm it boots
5. Write down the rollback steps and keep the previous config on hand`,
  },
  {
    slug: "my-proxmox-homelab-setup",
    title: "Proxmox VE for small production: storage, snapshots and recovery",
    date: "2026-06-23",
    excerpt:
      "Storage options, snapshot limits, backup schedules, and restore checks for a small Proxmox VE deployment.",
    tags: ["proxmox", "virtualization", "zfs", "backup"],
    content: `For a small Proxmox VE deployment, plan the storage layout and backup destination before creating guests. Test a restore before relying on the backups.

## Nodes and storage

One node is a valid starting point. Two nodes give you a maintenance window without a full outage, but they are not a cluster with quorum: with two votes, losing one node stops cluster operations. If you need real high availability, plan for three nodes or accept manual recovery.

ZFS is a good default for local storage because checksums catch silent corruption and snapshots are cheap. The trade-off is memory: plan for roughly one GB of RAM per TB of storage, plus headroom for the services themselves.

| Storage | Use | Trade-off |
|---|---|---|
| ZFS mirror | VM disks, containers | Half the raw capacity, survives one disk |
| ZFS single disk | Scratch, ISO images | No redundancy, rebuild means restore |
| NFS share | Templates, backups | Depends on the network and the NAS |

Keep a separate backup of any VM stored on a single disk.

## Snapshots are not backups

A snapshot lives on the same pool as the data and cannot protect against losing that pool. Use snapshots before changes and store backups separately.

Example backup schedule:

- Nightly backups of every VM and container to a separate host or NAS
- Weekly backup copy to off-site storage, encrypted
- Monthly restore test of one random guest
- A written note of what was restored and how long it took

\`\`\`bash
# Manual backup of one guest to a mounted backup target
vzdump 101 --storage backup-nfs --mode snapshot --compress zstd

# List what is available before restoring
pvesm list backup-nfs
\`\`\`

Test the restore on a spare VMID before restoring over an existing guest.

## Networking

Keep management, storage and guest traffic on separate bridges or VLANs where possible. A saturated storage network should not make the management interface unreachable during an incident.

For internal service discovery, a simple SDN zone or a dedicated bridge is enough. Avoid routing guest traffic through a single VM unless that VM is monitored and restartable.

## Monitoring and access

Monitor disk health, pool usage, backup job status, and temperature alongside CPU usage.

- SMART checks on every physical disk
- ZFS pool health and scrub results
- Backup job success and age of the last good backup
- UPS status if one is present

Access should be limited to a management network and a VPN. Use per-user accounts with two-factor authentication where the platform supports it, and keep an offline copy of the recovery keys.

## Recovery checklist

1. Boot the node and confirm the pool imports cleanly
2. Check that the network bridge configuration matches the documentation
3. Restore one guest and verify it starts and serves traffic
4. Confirm monitoring and backups resumed
5. Record what failed, what was restored, and what changed`,
  },
  {
    slug: "rustdesk-server-setup",
    title: "Self-Hosting a RustDesk Server: Open Source Remote Desktop",
    date: "2026-06-23",
    excerpt: "Today I learned how to install and set up a self-hosted RustDesk Server. For those who might not know, RustDesk is an open-source alternative to remote deskt...",
    tags: ["rustdesk", "self-hosting", "homelab", "linux"],
    content: "Today I learned how to install and set up a self-hosted **RustDesk Server**. For those who might not know, RustDesk is an open-source alternative to remote desktop software like TeamViewer or AnyDesk.\n\nWhile you can use RustDesk's public servers for free, self-hosting your own server comes with several great benefits:\n\n- **Faster & more stable connection**: Especially if the server and the client are in the same region, or even on the same local network (LAN).\n- **Security & Privacy**: Your connection data is completely under your own control.\n- **No Limitations**: There are no time limits or annoying commercial pop-ups.\n\n## Prerequisites\n\nTo run a RustDesk Server using the installation script, you will need:\n\n- A server/VPS running a supported Linux distribution (Ubuntu, Debian, or CentOS are recommended).\n- `sudo` or `root` access to your server.\n- A static Public IP or a domain name pointing to your server's IP (for access from outside your network).\n\n## Port Forwarding\n\nBefore running the installation, make sure the following ports are open on your firewall or router (Port Forwarding):\n\n- **TCP**: 21115, 21116, 21117, 21118, 21119\n- **UDP**: 21116\n\n## Installing via Script\n\nThe easiest way to install RustDesk on a bare-metal Linux server or a VM is by using a popular community-maintained installation script. This script automatically downloads the latest release, sets up the necessary `systemd` services (`hbbs` and `hbbr`), and configures the firewall if needed.\n\n1. SSH into your server.\n2. Download the installation script:\n\n```bash\nwget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh\n```\n\n3. Make the script executable:\n\n```bash\nchmod +x install.sh\n```\n\n4. Run the script:\n\n```bash\n./install.sh\n```\n\nDuring the installation, the script might ask you for your server's public IP or domain name. Follow the on-screen prompts to complete the setup. \n\nThe script will automatically configure `systemd` so that your RustDesk server components (`hbbs` and `hbbr`) start automatically on boot.\n\n## Retrieving the Public Key\n\nTo ensure that RustDesk clients can connect securely and to prevent unauthorized access, the server generates a key pair (Private & Public key) during installation.\n\nYou need to grab this **Public Key** to enter into the client application. If you used the script above, the key file is typically stored in `/opt/rustdesk/id_ed25519.pub` or the directory where it was installed.\n\nRun this command to view the Public Key:\n\n```bash\ncat /opt/rustdesk/id_ed25519.pub\n```\n\nCopy and save the text string that appears. We'll need it for the next step.\n\n## Client Application Configuration\n\nNow that our server is running, the final step is to point the RustDesk application on our computer or phone to our newly created server.\n\n1. Open the **RustDesk** application.\n2. Go to **Settings** -> **Network**.\n3. Click **Unlock network settings** if the settings are currently locked.\n4. Fill in the following details:\n   - **ID Server**: Enter your server's domain or IP (e.g., `rustdesk.yourdomain.com`).\n   - **Relay Server**: Leave this blank (it will automatically use the ID Server's domain).\n   - **Key**: Paste the *Public Key* we obtained in the previous step.\n5. Click **Apply**.\n\nAnd you're done! Now, at the bottom of the RustDesk application, it should say **Ready**, indicating that the application has successfully connected to your self-hosted server.\n\nThe remote desktop experience is now much more responsive and private! \ud83d\ude80",
  },
  {
    slug: "lmstudio-local-ai-macbook-m4",
    title: "Running local LLMs with LM Studio",
    date: "2026-06-24",
    excerpt:
      "Run a local model with LM Studio, start its OpenAI-compatible server, and connect a Python client.",
    tags: ["ai", "llm", "lmstudio", "local"],
    content: `LM Studio runs language models locally and provides a chat interface and an OpenAI-compatible server.

## What it provides

- A model browser that downloads from Hugging Face
- A chat interface for quick evaluation
- A local server compatible with the OpenAI API
- Apple Silicon acceleration through MLX and Metal

Available memory limits the model size and context length. Leave room for the operating system and other applications.

## Model sizes and quantization

Quantization reduces memory use at the cost of precision. Try a 4-bit or 6-bit model and check its output on your own tasks.

## Install and serve

1. Install the Apple Silicon build from the official site
2. Download a model and note its quantization
3. Open the Developer tab and start the local server
4. Point your client at the local endpoint

\`\`\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:1234/v1", api_key="local")

response = client.chat.completions.create(
    model="local-model",
    messages=[{"role": "user", "content": "Summarize this changelog in three bullets."}],
)

print(response.choices[0].message.content)
\`\`\`

The API key is a placeholder that the local server accepts; it is not a secret. Do not expose the server port beyond localhost unless you have added authentication in front of it.

## Where local models fit

- Drafting and summarizing documents that must stay on site
- Classification and extraction in an automation pipeline
- A coding assistant on a machine without reliable internet
- Prototyping before paying for a hosted model

Evaluate long-context tasks and batch jobs on the hardware you plan to use. Verify outputs before using them for decisions where an error would be costly.

## Operational notes

- Pin model versions and record the quantization used for each result
- Evaluate on your own examples, not only public benchmarks
- Keep prompts and outputs out of logs if they contain sensitive data
- Monitor memory pressure and swapping when evaluating performance
- Have a fallback path when the model server is unavailable`,
  },
  {
    slug: "unifi-os-proxmox-setup",
    title: "Running UniFi OS Server on Proxmox",
    date: "2026-06-24",
    excerpt:
      "Run UniFi OS Server in a Linux VM on Proxmox, using the official installer, a stable management address and off-VM backups.",
    tags: ["networking", "unifi", "proxmox", "self-hosting"],
    content: `UniFi OS Server replaces the legacy Network Application and can run in a Linux VM on Proxmox. It provides centralized management for compatible access points, switches and independent gateways.

## Before you install

UniFi OS depends on Podman and slirp4netns. Check the supported host distributions, kernel, and dependency versions before installation.

- A Linux distribution and dependency versions supported by the current installer
- Static IP on the VM, outside the DHCP pool
- DNS and NTP working from inside the VM
- A backup target outside the VM

## Sizing

Use the hardware recommendations in the official guide for your device and client count. Account for statistics retention and monitor disk usage after deployment.

## Install in a VM

Use a Linux VM on Proxmox and follow the [official UniFi OS Server installation guide](https://help.ui.com/hc/en-us/articles/34210126298775-Self-Hosting-UniFi). Container-specific setup is not covered here.

1. Install the dependencies listed in the official guide, including Podman and slirp4netns
2. Download the installer for your architecture from the Ubiquiti Downloads page linked in that guide
3. Make the downloaded file executable and run that file with sudo, using its actual filename
4. Complete the initial admin setup and keep the installer output for troubleshooting

Check the current distribution and dependency requirements before choosing a VM image. UniFi OS Server needs host services; a standalone Docker or Podman container is not a substitute for the installer.

## Network layout

Give the controller a static address and put it on the management VLAN with the devices it manages. Access points need a stable address to find the controller after a power event.

- Management VLAN for the controller and device management interfaces
- Guest and staff SSIDs on separate VLANs with firewall policy between them
- DHCP reservations for access points, switches and the controller
- A documented fallback address if the management VLAN is misconfigured

Do not manage the controller through the same link you are changing. Keep a console path or a second network interface.

## Backups and upgrades

Enable automatic backups and store a copy outside the VM. Verify that you can restore the controller configuration before relying on those backups.

Upgrade in a maintenance window, keep the previous VM snapshot, and check that devices reconnect before you delete the snapshot. Read the release notes for the supported upgrade path; skipping major versions can leave the controller in a state that needs a reinstall.

## Monitoring

Watch VM CPU and memory, disk usage of the statistics database, and device adoption status. A controller that is up but cannot reach its access points looks healthy on a basic ping check.

## Checklist

1. Static address documented and reserved
2. Automatic backups verified by restoring one
3. Management access limited to the management VLAN and VPN
4. Firmware update policy agreed before rollout
5. Fallback access path written down`,
  },
  {
    slug: "docker-dockge-setup",
    title: "My Docker Setup: Managing Containers with Dockge",
    date: "2026-06-25",
    excerpt: "Docker is a containerization platform that makes spinning up new services incredibly easy \u2014 just pull an image, configure a compose file, and you're up and r...",
    tags: ["docker", "self-hosting", "homelab", "dockge"],
    content: "Docker is a containerization platform that makes spinning up new services incredibly easy \u2014 just pull an image, configure a compose file, and you're up and running. But managing multiple Docker Compose stacks from the command line can get tedious. That's where **Dockge** comes in.\n\n## What is Dockge?\n\n[Dockge](https://github.com/louislam/dockge) is a self-hosted Docker Compose stack manager built by the same developer behind Uptime Kuma. It provides a clean, modern web UI to create, manage, and monitor your Docker Compose stacks \u2014 without needing to SSH into your server every time.\n\nWhat I love about Dockge:\n\n- \ud83c\udfa8 **Beautiful UI** \u2014 clean dark interface that makes managing stacks a pleasure\n- \ud83d\udcdd **Compose editor** \u2014 edit your `docker-compose.yml` files directly in the browser\n- \u25b6\ufe0f **One-click controls** \u2014 start, stop, restart, and update stacks with a single click\n- \ud83d\udcca **Real-time status** \u2014 see which containers are active at a glance\n- \ud83d\udd04 **Interactive updates** \u2014 pull new images and recreate containers easily\n\nUnlike Portainer, Dockge focuses specifically on Docker Compose, which is exactly what I need. It's lightweight, fast, and doesn't try to do too much.\n\n## My Container Stack\n\nHere's what I'm currently running through Dockge \u2014 all containers are **active** and running smoothly:\n\n### \ud83d\udcca Uptime Kuma \u2014 Service Monitoring\n\n[Uptime Kuma](https://github.com/louislam/uptime-kuma) is my go-to uptime monitoring tool. It monitors all my services, websites, and network devices, and sends alerts when something goes down. It supports multiple notification channels including Telegram, Discord, and email.\n\n**Why I use it:** In a homelab with so many services running, knowing immediately when something breaks is essential. Uptime Kuma gives me a beautiful status page and peace of mind.\n\n### \ud83d\udd04 n8n \u2014 Workflow Automation\n\n[n8n](https://n8n.io/) is a powerful workflow automation platform \u2014 think of it as a self-hosted alternative to Zapier or Make. I use it to automate repetitive tasks and connect different services together.\n\n**Why I use it:** Automation is one of my passions. n8n lets me build complex workflows visually, connecting APIs, databases, and services without writing boilerplate code for every integration.\n\n### \ud83c\udf10 OpenSpeedTest \u2014 Network Speed Testing\n\n[OpenSpeedTest](https://github.com/openspeedtest/Docker-Image) is a self-hosted speed test server. It lets me test network speeds between devices and my server without relying on external services like Speedtest.net.\n\n**Why I use it:** When troubleshooting network issues across the campus, having a local speed test server gives accurate results without internet variables affecting the test. It's also great for verifying that network upgrades actually improved throughput.\n\n### \ud83d\udcc8 SpeedTrack \u2014 Speed Test History\n\n[SpeedTrack](https://github.com/alexjustesen/speedtest-tracker) works alongside OpenSpeedTest to **track and log speed test results over time**. Instead of running a test and forgetting the numbers, SpeedTrack keeps a historical record so I can spot trends and degradation.\n\n**Why I use it:** Being able to look back at network performance over weeks or months helps me identify patterns \u2014 like whether speeds drop during certain hours or after configuration changes.\n\n### \ud83e\uddf0 OmniTools \u2014 All-in-One Utility Toolbox\n\n[OmniTools](https://github.com/iib0011/omni-tools) is a self-hosted collection of various IT utilities and tools accessible from a web browser. It bundles handy tools like encoders/decoders, formatters, converters, and network utilities into a single interface.\n\n**Why I use it:** Instead of searching for random online tools every time I need to encode a Base64 string or format JSON, I have everything in one place on my own server \u2014 fast, private, and always available.\n\n### \ud83d\udcc4 BentoPDF \u2014 PDF Generation\n\n[BentoPDF](https://github.com/nicholasgasior/bento-pdf) is a privacy-first, client-side PDF toolkit for manipulating, merging, splitting, and processing PDF files \u2014 all running locally in the browser via WebAssembly.\n\n**Why I use it:** Useful for automating document workflows and converting files without uploading them to third-party services. Keeps everything private and on-premise.\n\n### \ud83c\udfb5 Yubal \u2014 YouTube Music Downloader\n\n[Yubal](https://github.com/guillevc/yubal) is a self-hosted YouTube Music downloader. Paste a link, and it downloads the track with proper tags and organizes it into your library automatically.\n\nKey features:\n\n- **Scheduled sync** \u2014 automatically download new releases from your favorite artists\n- **Smart deduplication** \u2014 no duplicate files cluttering your library\n- **Media server ready** \u2014 organized output that works perfectly with Jellyfin, Plex, or Navidrome\n- **Browser extension** \u2014 download directly from YouTube Music with one click\n\n**Why I use it:** Combined with Jellyfin on my Proxmox node, Yubal gives me a complete self-hosted music streaming setup. I paste a link, Yubal downloads and tags it, and it shows up in my media server \u2014 no subscriptions needed.\n\n## Why Dockge Over Portainer?\n\nI've used Portainer before, and while it's powerful, it felt like overkill for my use case. Here's why I chose Dockge:\n\n| Feature | Dockge | Portainer |\n|---------|--------|-----------|\n| **Focus** | Docker Compose only | Full Docker management |\n| **Complexity** | Simple and lightweight | Feature-rich but heavier |\n| **Compose editing** | Native YAML editor | Limited compose support |\n| **Resource usage** | Minimal | Higher |\n| **Learning curve** | Almost none | Moderate |\n\nDockge does one thing and does it well \u2014 managing Docker Compose stacks with a beautiful interface. For my homelab, that's exactly what I need.\n\n## Tips for Getting Started with Dockge\n\nIf you want to try Dockge yourself, here are a few tips:\n\n1. **Install Dockge itself via Docker** \u2014 it's a single compose file to get started\n2. **Organize your stacks** \u2014 give each stack a clear, descriptive name\n3. **Use environment variables** \u2014 keep sensitive data like passwords and API keys in `.env` files\n4. **Set restart policies** \u2014 use `restart: unless-stopped` so your containers survive reboots\n5. **Keep compose files clean** \u2014 Dockge stores all compose files in a central directory, making backups easy\n\n## Final Thoughts\n\nDocker + Dockge has been a game-changer for my homelab. The combination of Docker's flexibility with Dockge's clean management interface means I spend less time on maintenance and more time actually using my services.\n\nWhether you're just starting with Docker or looking for a better way to manage your existing stacks, I highly recommend giving Dockge a try. It's lightweight, intuitive, and makes self-hosting a lot more enjoyable. \ud83d\udc33",
  },
  {
    slug: "digitalocean-droplet-spaces-setup",
    title: "A Complete Guide to Setting Up DigitalOcean Droplets and Spaces Object Storage",
    date: "2026-06-26",
    excerpt: "DigitalOcean is one of the most popular cloud computing IaaS providers for developers due to its clean interface, solid performance, and transparent pricing....",
    tags: ["digitalocean", "cloud", "vps", "storage", "tutorial"],
    content: "DigitalOcean is one of the most popular cloud computing (IaaS) providers for developers due to its clean interface, solid performance, and transparent pricing. Two of their most commonly used services are **Droplets** (VPS/Virtual Machines) and **Spaces** (Amazon S3-compatible Object Storage).\n\nIn this post, I will share a step-by-step guide on how to create a Droplet and configure Spaces Object Storage on DigitalOcean.\n\n## 1. How to Create a Droplet (Virtual Private Server)\n\nA \"Droplet\" is DigitalOcean's term for a Virtual Machine or VPS. Creating a Droplet is incredibly easy and fast.\n\n**Steps:**\n\n1. **Log in to the DigitalOcean Dashboard:** Access your account. If you don't have one, you'll need to sign up first.\n2. **Click the \"Create\" Button:** In the top right corner, click the green **Create** button, then select **Droplets**.\n3. **Choose a Region (Data Center):** Select the server location closest to your target users. For users in Southeast Asia, **Singapore (SGP1)** is usually the best choice for the lowest latency.\n4. **Choose an Image (Operating System):** Select the OS you want to use. **Ubuntu (latest LTS version)** is the standard, secure choice with a massive support community. You can also choose the *Marketplace* if you want to install ready-to-use applications like WordPress or Docker.\n5. **Choose a Size (Specs/Plan):** \n   - Select the CPU type: *Basic*, *General Purpose*, *CPU-Optimized*, etc.\n   - For small projects or learning, the **Basic (Shared CPU)** plan starting at $4-$6/month is more than enough.\n6. **Choose an Authentication Method (Important!):**\n   - **SSH Key:** Highly recommended. It is much more secure than a password. If you don't have one, you can generate it on your local machine and upload the *Public Key*.\n   - **Password:** This option is easier but vulnerable to *brute-force* attacks. If you choose this, make sure to use a very strong password.\n7. **Select Additional Options (Optional):** You can check *Enable Backups*, *Monitoring*, or *IPv6* according to your needs.\n8. **Choose a Hostname:** Enter a recognizable `Hostname` for your Droplet (e.g., `web-server-01`).\n9. **Click \"Create Droplet\":** Wait about a minute, and your Droplet's Public IP will appear. You can now log in via SSH!\n\n---\n\n## 2. How to Create Spaces Object Storage\n\nSpaces is an *Object Storage* service perfect for storing static assets like images, videos, backup files, or static website files. Spaces are very affordable (starting at $5/month for 250GB) and include a built-in *Content Delivery Network* (CDN).\n\n**Steps:**\n\n1. **Click the \"Create\" Button:** In the top right corner of the dashboard, click **Create**, then select **Spaces**.\n2. **Choose a Region:** Again, choose the location closest to your users (e.g., **Singapore**). It is highly recommended to select the same region as your Droplet if they will communicate with each other, ensuring faster transfer speeds.\n3. **CDN Configuration (Content Delivery Network):**\n   - By default, the CDN is enabled. This is great for accelerating asset loading times for visitors from different countries.\n   - You can also add a **Custom Subdomain** (e.g., `cdn.yourdomain.com`) if you manage your DNS on DigitalOcean.\n4. **Choose a Space Name (Bucket):** \n   - This name must be globally unique because it will form part of the URL (e.g., `my-awesome-assets`).\n5. **Select a Project:** Assign this Space to the appropriate project.\n6. **Click \"Create a Space\":** Your Space will be created instantly and is ready to use.\n\n---\n\n## 3. Generating Access Keys for Spaces (Important)\n\nBecause Spaces is compatible with the Amazon S3 API, you can use various S3 tools (like S3cmd, rclone, or AWS SDKs) to manage it. To do this, you need an **Access Key** and a **Secret Key**.\n\n1. In the left-hand menu, click on the **API** section.\n2. Select the **Spaces Keys** tab.\n3. Click the **Generate New Key** button.\n4. Give the key a descriptive name (e.g., `App Backup Key`).\n5. Two codes will appear: the **Key** and the **Secret**. \n   > [!WARNING]\n   > Immediately copy and save your **Secret Key** in a secure location! This code is only displayed once. If you lose it, you will have to generate a new key pair.\n\n## Conclusion\n\nDigitalOcean makes cloud infrastructure provisioning incredibly simple. With a Droplet, you have full control over your server (VPS), and with Spaces, you can store thousands of static files at a very affordable price without consuming your Droplet's primary disk space. \n\nCombining these two services provides a rock-solid foundation for deploying modern web applications! \ud83d\ude80",
  },
  {
    slug: "rclone-encrypted-backup-google-drive",
    title: "Encrypted Cloud Backups to Google Drive with Rclone",
    date: "2026-07-11",
    excerpt: "Google Drive offers 15GB of free cloud storage \u2014 it would be a waste not to use it for backing up important data. But uploading raw files to a third-party cl...",
    tags: ["backup", "rclone", "google-drive", "encryption", "self-hosting", "tutorial"],
    content: "Google Drive offers 15GB of free cloud storage \u2014 it would be a waste not to use it for backing up important data. But uploading raw files to a third-party cloud raises legitimate privacy concerns. The solution? Use **Rclone** with its built-in **crypt** feature to encrypt files *before* they leave your machine. This way, your data stays safe even if your Google account is compromised.\n\nIn this post, I'll walk through the complete setup: installing Rclone, configuring Google Drive, setting up transparent encryption, and automating everything with a cron job.\n\n## What is Rclone?\n\n[Rclone](https://rclone.org/) is an open-source command-line tool for managing files on cloud storage. It supports over 40 cloud providers, including Google Drive, OneDrive, Dropbox, Amazon S3, and many more. Often called \"rsync for the cloud,\" Rclone is incredibly flexible and powerful.\n\nKey features:\n\n- \ud83d\udd04 **Sync & Copy** \u2014 one-way or two-way sync between cloud and local storage\n- \ud83d\udd10 **Encryption (crypt)** \u2014 transparently encrypt files before uploading\n- \ud83d\udce6 **Mount** \u2014 mount cloud storage as a local drive via FUSE\n- \u26a1 **Bandwidth control** \u2014 throttle upload/download speeds as needed\n- \ud83d\udcca **Logging** \u2014 detailed activity logs for monitoring and debugging\n\n## Prerequisites\n\nBefore getting started, make sure you have:\n\n1. **A Linux server** (Ubuntu/Debian) \u2014 can be a VPS or a local machine\n2. **A Google account** with enough free storage\n3. **Terminal access** with a user that has sudo privileges\n\n## 1. Installing Rclone\n\nThe easiest way to install Rclone is using the official install script:\n\n```bash\nsudo -v ; curl https://rclone.org/install.sh | sudo bash\n```\n\nOr if you prefer a manual installation:\n\n```bash\n# Download the latest version\ncurl -O https://downloads.rclone.org/current/rclone-current-linux-amd64.zip\n\n# Extract\nunzip rclone-current-linux-amd64.zip\ncd rclone-*-linux-amd64\n\n# Copy the binary to /usr/bin\nsudo cp rclone /usr/bin/\nsudo chmod 755 /usr/bin/rclone\n\n# Verify the installation\nrclone version\n```\n\n## 2. Configuring the Google Drive Remote\n\nRun the interactive configuration wizard:\n\n```bash\nrclone config\n```\n\nFollow these steps:\n\n```\nNo remotes found, make a new one?\nn) New remote\nq) Quit config\nn/s/q> n\n\nEnter name for new remote.\nname> gdrive\n\nOption Storage.\nType of storage to configure.\nChoose a number from below, or type in your own value.\n...\n18 / Google Drive\n   \\ (drive)\n...\nStorage> drive\n\nOption client_id.\nGoogle Application Client Id\nLeave blank normally.\nclient_id>\n\nOption client_secret.\nOAuth Client Secret.\nLeave blank normally.\nclient_secret>\n\nOption scope.\nScope that rclone should use when requesting access from drive.\nChoose a number from below, or type in your own value.\n 1 / Full access all files, excluding Application Data Folder.\n   \\ (drive)\n...\nscope> 1\n\nOption service_account_file.\nService Account Credentials JSON file path.\nLeave blank normally.\nservice_account_file>\n\nEdit advanced config?\ny) Yes\nn) No (default)\ny/n> n\n\nUse web browser to automatically authenticate rclone with remote?\ny) Yes (default)\nn) No\ny/n>\n```\n\n### Authenticating on a Headless Server\n\nIf you're configuring Rclone on a server without a browser (headless), select `n` at the prompt above. Rclone will then display a command you need to run on a local machine that has a browser:\n\n```\nOption config_token.\nFor this to work, you will need rclone available on a machine that has\na web browser available.\n\nFor more help and alternate methods see: https://rclone.org/remote_setup/\n\nExecute the following on the machine with the web browser (same rclone\nversion recommended):\n\n\trclone authorize \"drive\" \"eyJ...token...\"\n\nThen paste the result.\nconfig_token>\n```\n\nHere's how to complete the process:\n\n1. **On your local machine** (with a browser), install Rclone as well\n2. Run the `rclone authorize` command shown in the output\n3. A browser window will open \u2014 log in to your Google account and grant permission\n4. Copy the token that appears in your local terminal\n5. Paste the token back into the server's prompt\n\nAfter successful authentication:\n\n```\nConfigure this as a Shared Drive (Team Drive)?\ny) Yes\nn) No (default)\ny/n> n\n\nKeep this \"gdrive\" remote?\ny) Yes this is OK (default)\ne) Edit this remote\nd) Delete this remote\ny/e/d> y\n```\n\nVerify the connection:\n\n```bash\nrclone lsd gdrive:\n```\n\nThis should list the folders in your Google Drive.\n\n## 3. Setting Up Encryption (Crypt Remote)\n\nThis is the most important part \u2014 we'll create a new remote that transparently encrypts all files before they're uploaded to Google Drive.\n\nRun the config wizard again:\n\n```bash\nrclone config\n```\n\n```\nn) New remote\nn/s/q> n\n\nEnter name for new remote.\nname> gdrive-crypt\n\nOption Storage.\nType of storage to configure.\nChoose a number from below, or type in your own value.\n...\n14 / Encrypt/Decrypt a remote\n   \\ (crypt)\n...\nStorage> crypt\n\nOption remote.\nRemote to encrypt/decrypt.\nNormally should contain a ':' and a path, e.g. \"myremote:path/to/dir\",\n\"myremote:bucket\" or maybe \"myremote:\" (not recommended).\nremote> gdrive:backup-encrypted\n\nOption filename_encryption.\nHow to encrypt the filenames.\nChoose a number from below, or type in your own value.\n 1 / Encrypt the filenames.\n   \\ (standard)\n 2 / Very simple filename obfuscation.\n   \\ (obfuscate)\n 3 / Don't encrypt the file names.\n   \\ (off)\nfilename_encryption> standard\n\nOption directory_name_encryption.\nOption to either encrypt directory names or leave them intact.\nChoose a number from below, or type in your own value.\n 1 / Encrypt directory names.\n   \\ (true)\n 2 / Don't encrypt directory names, leave them intact.\n   \\ (false)\ndirectory_name_encryption> true\n\nOption password.\nPassword or pass phrase for encryption.\ny) Yes, type in my own password\ng) Generate random password\ny/g> y\nEnter the password: ********\nConfirm the password: ********\n\nOption password2.\nPassword or pass phrase for salt.\ny) Yes, type in my own password\ng) Generate random password\nn) No, leave this optional password blank (default)\ny/g/n> y\nEnter the password: ********\nConfirm the password: ********\n```\n\n> [!CAUTION]\n> **Store both passwords in an extremely safe place!** If you lose them, your encrypted files **cannot be decrypted** and your data will be gone forever. I recommend using a password manager like Bitwarden or KeePassXC.\n\nAfter completing the setup:\n\n```\nKeep this \"gdrive-crypt\" remote?\ny) Yes this is OK (default)\ny/e/d> y\n```\n\n### How Rclone Encryption Works\n\nHere's how data flows through the crypt remote:\n\n```\nLocal Files \u2500\u2500\u25ba Rclone Crypt (encrypt) \u2500\u2500\u25ba Google Drive\n                                           (encrypted files)\n\nGoogle Drive \u2500\u2500\u25ba Rclone Crypt (decrypt) \u2500\u2500\u25ba Local Files\n(encrypted files)                          (original files)\n```\n\n- **Filenames** are encrypted and unreadable on Google Drive\n- **File contents** are encrypted using NaCl SecretBox (XSalsa20 + Poly1305)\n- **Directory structure** is also encrypted (if `directory_name_encryption` is enabled)\n\n## 4. Using Rclone for Backups\n\n### Uploading (Backing Up) Files\n\nTo upload files to Google Drive with encryption:\n\n```bash\n# Copy files/folders to cloud (automatically encrypted)\nrclone copy /path/to/local/data gdrive-crypt: --progress\n\n# Example: back up /home/user/documents\nrclone copy /home/user/documents gdrive-crypt:documents --progress\n```\n\n### Sync (One-Way Mirror)\n\nSync makes the remote an exact mirror of your local directory \u2014 files deleted locally will also be deleted on the remote:\n\n```bash\nrclone sync /path/to/local/data gdrive-crypt: --progress\n```\n\n> [!WARNING]\n> Be careful with `sync`! Files that exist on the remote but not locally will be **deleted**. Use `copy` if you only want to add new files without removing old ones.\n\n### Downloading (Restoring) Files\n\nTo restore files from a backup:\n\n```bash\n# Download all files (automatically decrypted)\nrclone copy gdrive-crypt: /path/to/restore/ --progress\n\n# Download a specific folder\nrclone copy gdrive-crypt:documents /home/user/restore/documents --progress\n```\n\n### Viewing Encrypted vs. Decrypted Files\n\n```bash\n# View files on Google Drive (encrypted names)\nrclone ls gdrive:backup-encrypted\n\n# Example output:\n# 2948723 v05u42a5fkh5b2s0r91cbo4im0/7gdcp5...\n\n# View files through the crypt remote (decrypted names)\nrclone ls gdrive-crypt:\n\n# Example output:\n# 2948723 documents/important-notes.txt\n```\n\n## 5. Automating Backups with Cron\n\nTo run backups automatically, we can use a simple shell script combined with a cron job.\n\n### Create the Backup Script\n\n```bash\nsudo nano /usr/local/bin/backup-gdrive.sh\n```\n\nScript contents:\n\n```bash\n#!/bin/bash\n\n# ============================================\n# Rclone Encrypted Backup Script\n# ============================================\n\n# Configuration\nRCLONE_REMOTE=\"gdrive-crypt\"\nBACKUP_DIRS=(\n    \"/home/user/documents\"\n    \"/home/user/projects\"\n    \"/etc/nginx\"\n    \"/opt/docker-compose\"\n)\nLOG_FILE=\"/var/log/rclone-backup.log\"\nDATE=$(date '+%Y-%m-%d %H:%M:%S')\n\n# Logging function\nlog() {\n    echo \"[$DATE] $1\" | tee -a \"$LOG_FILE\"\n}\n\nlog \"========== Backup started ==========\"\n\n# Back up each directory\nfor DIR in \"${BACKUP_DIRS[@]}\"; do\n    if [ -d \"$DIR\" ]; then\n        DEST_NAME=$(basename \"$DIR\")\n        log \"Backing up: $DIR -> $RCLONE_REMOTE:$DEST_NAME\"\n\n        rclone copy \"$DIR\" \"$RCLONE_REMOTE:$DEST_NAME\" \\\n            --log-file=\"$LOG_FILE\" \\\n            --log-level INFO \\\n            --transfers 4 \\\n            --checkers 8 \\\n            --contimeout 60s \\\n            --timeout 300s \\\n            --retries 3 \\\n            --low-level-retries 10 \\\n            --stats 1m\n\n        if [ $? -eq 0 ]; then\n            log \"\u2705 Success: $DIR\"\n        else\n            log \"\u274c Failed: $DIR\"\n        fi\n    else\n        log \"\u26a0\ufe0f Directory not found: $DIR\"\n    fi\ndone\n\nlog \"========== Backup finished ==========\"\nlog \"\"\n```\n\nMake it executable:\n\n```bash\nsudo chmod +x /usr/local/bin/backup-gdrive.sh\n```\n\n### Set Up the Cron Job\n\nOpen the crontab editor:\n\n```bash\ncrontab -e\n```\n\nAdd a backup schedule (example: every day at 2 AM):\n\n```cron\n# Encrypted backup to Google Drive every day at 02:00\n0 2 * * * /usr/local/bin/backup-gdrive.sh\n```\n\nOther schedule examples:\n\n```cron\n# Every 6 hours\n0 */6 * * * /usr/local/bin/backup-gdrive.sh\n\n# Every Sunday at 3 AM\n0 3 * * 0 /usr/local/bin/backup-gdrive.sh\n\n# First day of every month at 1 AM\n0 1 1 * * /usr/local/bin/backup-gdrive.sh\n```\n\n## 6. Tips and Best Practices\n\n### Limit Bandwidth\n\nIf your server has limited bandwidth, throttle the upload speed:\n\n```bash\n# Limit upload to 5 Mbps\nrclone copy /data gdrive-crypt: --bwlimit 5M\n```\n\n### Exclude Unnecessary Files\n\nSkip files that don't need to be backed up:\n\n```bash\nrclone copy /data gdrive-crypt: \\\n    --exclude \"*.tmp\" \\\n    --exclude \"*.log\" \\\n    --exclude \"node_modules/**\" \\\n    --exclude \".cache/**\"\n```\n\n### Dry Run (Simulation)\n\nAlways simulate before running a sync to see what would change:\n\n```bash\nrclone sync /data gdrive-crypt: --dry-run --progress\n```\n\n### Verify File Integrity\n\nMake sure uploaded files aren't corrupted:\n\n```bash\nrclone check /path/to/local/data gdrive-crypt: --one-way\n```\n\n### Back Up Your Rclone Configuration\n\nDon't forget to back up the Rclone config file itself:\n\n```bash\n# Default config location\ncat ~/.config/rclone/rclone.conf\n\n# Back up to a safe location (e.g., an encrypted USB drive)\ncp ~/.config/rclone/rclone.conf /media/usb-drive/rclone-config-backup.conf\n```\n\n> [!IMPORTANT]\n> The `rclone.conf` file contains your encryption passwords (albeit obfuscated). Make sure this file is stored securely and never committed to a public repository!\n\n## Conclusion\n\nWith the combination of **Rclone + Google Drive + Crypt**, you get a cloud backup solution that is:\n\n- \u2705 **Free** \u2014 leverages Google Drive's 15GB of free storage\n- \u2705 **Secure** \u2014 files are encrypted end-to-end before leaving your server\n- \u2705 **Automated** \u2014 cron jobs run backups without manual intervention\n- \u2705 **Verifiable** \u2014 file integrity can be checked at any time\n\nGoogle cannot read your files because everything is encrypted before it's uploaded. Even if someone gains access to your Google account, they'll only see files with random names and unreadable contents.\n\nHappy backing up \u2014 and remember: **a backup that hasn't been test-restored is not a real backup!** \ud83d\udd10",
  },
] as const;