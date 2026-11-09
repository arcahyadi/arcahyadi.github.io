// content/blogs.ts — field notes (EN). Indonesian mirrors live in src/i18n/content.id.ts.
// Keep code fences, URLs, inline code and numbers identical across locales (npm run validate:parity).

export const blogs = [
  {
    slug: "mikrotik-multi-wan-bonding",
    title: "Multi-WAN failover and link aggregation on RouterOS",
    date: "2026-06-23",
    excerpt:
      "A single uplink is the usual single point of failure in a small network. Here is a RouterOS layout for provider failover, bonded distribution links and management access that does not depend on the LAN being healthy.",
    tags: ["mikrotik", "networking", "routeros", "high-availability"],
    content: `A single uplink is the most common single point of failure in a small network. RouterOS can fail over between providers and aggregate internal links without extra hardware. The example below uses documentation addresses; replace them with your own plan.

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

Documentation ranges such as \`192.0.2.0/24\` are reserved for examples, which makes configs safe to share in a write-up.

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

Schedule a configuration export and keep it off the device. A backup that only lives on the router is lost exactly when you need it.

\`\`\`routeros
/system scheduler
add name=config-backup interval=2d on-event=config-backup start-time=02:00:00

/system script
add name=config-backup policy=ftp,read,write,sensitive source={
  /export file=config-backup
  /tool fetch address=192.0.2.50 src-path=config-backup.rsc \\
    user=backup password=change-me mode=ftp upload=yes
}
\`\`\`

Export SNMP to a monitoring host on the management VLAN for interface and health counters. Alert on link state and packet loss, not only on ping.

## What to verify before cutover

1. Test failover by disabling each uplink in turn and watching the active route
2. Confirm the bond carries traffic with one member cable removed
3. Check that management access still works from the VPN with the LAN default route broken
4. Restore a configuration export on a spare device and confirm it boots
5. Write down the rollback steps and keep the previous config on hand

The goal is not a clever configuration. It is a network where the failure modes are known before they happen.`,
  },
  {
    slug: "proxmox-ve-storage-and-backups",
    title: "Proxmox VE for small production: storage, snapshots and recovery",
    date: "2026-06-23",
    excerpt:
      "Virtualization is easy to start and hard to recover. This is a practical layout for a small Proxmox VE deployment: storage choices, snapshot limits, backups and the checks that matter after a failure.",
    tags: ["proxmox", "virtualization", "zfs", "backup"],
    content: `Virtualization is easy to start and hard to recover. A small Proxmox VE deployment does not need a cluster, but it does need storage that survives a disk failure and backups that have been restored at least once.

## Nodes and storage

One node is a valid starting point. Two nodes give you a maintenance window without a full outage, but they are not a cluster with quorum: with two votes, losing one node stops cluster operations. If you need real high availability, plan for three nodes or accept manual recovery.

ZFS is a good default for local storage because checksums catch silent corruption and snapshots are cheap. The trade-off is memory: plan for roughly one GB of RAM per TB of storage, plus headroom for the services themselves.

| Storage | Use | Trade-off |
|---|---|---|
| ZFS mirror | VM disks, containers | Half the raw capacity, survives one disk |
| ZFS single disk | Scratch, ISO images | No redundancy, rebuild means restore |
| NFS share | Templates, backups | Depends on the network and the NAS |

Do not put the only copy of a VM on a single disk and call it storage. Treat it as cache.

## Snapshots are not backups

A snapshot lives on the same pool as the data. It is fast, useful before an upgrade, and useless if the pool is lost. Keep snapshots for hours or days, and keep backups somewhere else.

A simple scheme that works:

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

Test the restore path on a spare VMID first. Restoring over a running guest is the wrong time to discover that the backup is incomplete.

## Networking

Keep management, storage and guest traffic on separate bridges or VLANs where possible. A saturated storage network should not make the management interface unreachable during an incident.

For internal service discovery, a simple SDN zone or a dedicated bridge is enough. Avoid routing guest traffic through a single VM unless that VM is monitored and restartable.

## Monitoring and access

Monitor the things that fail first: disk health, pool usage, backup job status and temperature. A dashboard that only shows CPU is decoration.

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
5. Record what failed, what was restored, and what changed

A homelab and a production deployment use the same tools. The difference is whether the recovery steps exist before the incident.`,
  },
  {
    slug: "unifi-os-on-proxmox",
    title: "Running UniFi OS Server on Proxmox",
    date: "2026-06-24",
    excerpt:
      "UniFi OS Server replaces the legacy Network Application and runs well as a container on Proxmox. Here is how to size it, install it, and avoid the mistakes that make the controller unreachable after a reboot.",
    tags: ["networking", "unifi", "proxmox", "self-hosting"],
    content: `UniFi OS Server replaces the legacy Network Application and runs well as a container on Proxmox. It gives you a single dashboard for access points, switches and gateways without buying dedicated hardware.

## Before you install

UniFi OS depends on Podman and slirp4netns. Check the host distribution and kernel first; an unsupported base image usually fails during install with a message that does not mention the real cause.

- Debian 12 or a current Ubuntu LTS
- Static IP on the container, outside the DHCP pool
- DNS and NTP working from inside the container
- A backup target that is not the same disk as the container

## Sizing

The controller is light until you enable more applications. Size for the number of devices and the retention you want, not for the current device count.

| Deployment | Devices | vCPU | RAM |
|---|---|---|---|
| Home or small office | up to 30 | 2 | 2 GB |
| Branch office | up to 100 | 2 | 4 GB |
| Multi-site | 100+ | 4 | 8 GB |

Disk grows with retained statistics. Give it more than the minimum and monitor it.

## Install as a container

Create a privileged LXC container with nesting enabled, then run the official installer inside it. The exact steps change between releases, so follow the current Ubiquiti documentation and pin the version you install.

\`\`\`bash
# Inside the container: check dependencies before the installer
podman --version
slirp4netns --version

# Keep the installer output; it names the port and the initial admin setup
bash uniFi-os-server-install.sh
\`\`\`

If the installer fails silently, check that the container can reach the internet and that \`/dev/net/tun\` exists. Both are common causes.

## Network layout

Give the controller a static address and put it on the management VLAN with the devices it manages. Access points need a stable address to find the controller after a power event.

- Management VLAN for the controller and device management interfaces
- Guest and staff SSIDs on separate VLANs with firewall policy between them
- DHCP reservations for access points, switches and the controller
- A documented fallback address if the management VLAN is misconfigured

Do not manage the controller through the same link you are changing. Keep a console path or a second network interface.

## Backups and upgrades

Enable automatic backups and store a copy outside the container. A controller backup contains the device configuration and the local admin accounts; losing it means re-adopting every device.

Upgrade in a maintenance window, keep the previous container snapshot, and check that devices re-adopt before you delete the snapshot. Read the release notes for the supported upgrade path; skipping major versions can leave the controller in a state that needs a reinstall.

## Monitoring

Watch container CPU and memory, disk usage of the statistics database, and device adoption status. A controller that is up but cannot reach its access points looks healthy on a basic ping check.

## Checklist

1. Static address documented and reserved
2. Automatic backups verified by restoring one
3. Management access limited to the management VLAN and VPN
4. Firmware update policy agreed before rollout
5. Fallback access path written down

The controller is infrastructure. Treat it with the same backup and access rules as the rest of the network.`,
  },
  {
    slug: "docker-dockge-stacks",
    title: "Managing Docker Compose stacks with Dockge",
    date: "2026-06-25",
    excerpt:
      "Dockge is a focused Compose stack manager: edit, start, stop and update stacks from a browser. Here is how to run it safely and which habits keep a small Docker host maintainable.",
    tags: ["docker", "containers", "operations", "dockge"],
    content: `Dockge is a focused Compose stack manager: edit, start, stop and update stacks from a browser. It is a good fit when the host runs a handful of Compose projects and you want less SSH, not a full orchestration platform.

## What it does well

- One directory per stack, with the compose file and its environment file together
- A browser editor with validation before a stack is recreated
- Start, stop, restart and update actions per stack
- Interactive image updates with a visible diff of what changed

It does not replace container orchestration. If you need scheduling, service discovery or multi-host networking, use a platform built for that.

## Install

Dockge runs as a container and needs access to the Docker socket plus the directory that holds your stacks. Keep both explicit.

\`\`\`yaml
services:
  dockge:
    image: louislam/dockge:1
    restart: unless-stopped
    ports:
      - 5001:5001
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
      - /opt/stacks:/opt/stacks
    environment:
      - DOCKGE_STACKS_DIR=/opt/stacks
\`\`\`

Mounting the Docker socket gives the container control of the host. Put Dockge behind a reverse proxy with authentication and do not expose it directly to the internet.

## Stack layout

A predictable directory layout makes backup and recovery simple:

\`\`\`text
/opt/stacks/
  monitoring/
    compose.yaml
    .env
  automation/
    compose.yaml
    .env
  files/
    compose.yaml
    .env
\`\`\`

Keep secrets in the environment file, not in the compose file, and make sure the stack directory is included in the host backup. A compose file without its data volumes is not a backup.

## Update habits

- Pin major image tags and read release notes before a jump
- Update one stack at a time and check logs after each
- Keep the previous compose file in version control
- Take a volume backup before a database upgrade
- Schedule updates for a window when you can respond

## Comparison with Portainer

| Feature | Dockge | Portainer |
|---|---|---|
| Focus | Compose stacks | Full Docker and cluster management |
| Complexity | Low | Higher |
| Compose editing | Native, per stack | Supported, less central |
| Resource use | Small | Larger |
| Learning curve | Short | Moderate |

## Operations checklist

1. Authentication in front of the UI
2. Stacks and data included in backups
3. Restart policy set on every service
4. Log rotation configured on the host
5. A documented way to start a stack without the UI
6. Monitoring for stopped containers and failed health checks

Dockge makes routine stack work faster. The backup and access rules are still your responsibility.`,
  },
  {
    slug: "rclone-encrypted-backup",
    title: "Encrypted off-site backups with Rclone",
    date: "2026-07-11",
    excerpt:
      "Rclone can encrypt files before they leave the host, so the storage provider only sees opaque names and data. Here is a complete setup: remote, crypt layer, script, schedule and restore test.",
    tags: ["backup", "rclone", "encryption", "operations"],
    content: `Rclone can encrypt files before they leave the host, so the storage provider only sees opaque names and data. That makes ordinary object storage usable for backups without trusting the provider with the contents.

## How the layers fit

There are two remotes: the storage remote and a crypt remote layered on top of it. Reads and writes go through the crypt remote; the provider stores encrypted objects.

- Names encrypted with the standard filename mode
- Contents encrypted with NaCl SecretBox
- Optional second password for the salt
- The crypt password is not stored in the remote provider

Lose the crypt password and the data is gone. Store it in a password manager and in an offline copy.

## Install

\`\`\`bash
curl https://rclone.org/install.sh | sudo bash
rclone version
\`\`\`

On a headless host, configure the storage remote on a machine with a browser and copy the resulting token, or use a service account where the provider supports it.

## Configure the crypt remote

\`\`\`bash
rclone config
\`\`\`

Create the storage remote first, then create a second remote of type crypt that points at a path inside it. Choose filename encryption and enable directory name encryption if the folder names are sensitive.

\`\`\`text
name> backup-crypt
storage> crypt
remote> storage:backups/encrypted
filename_encryption> standard
directory_name_encryption> true
\`\`\`

Verify that the remote works before scheduling anything:

\`\`\`bash
rclone lsd backup-crypt:
rclone copy /etc/hostname backup-crypt:test/ --progress
rclone ls backup-crypt:test/
\`\`\`

## Backup script

Keep the script small and let it fail loudly. A backup job that hides errors is worse than no job, because it creates false confidence.

\`\`\`bash
#!/bin/bash
set -euo pipefail

SRC="/srv/data"
DEST="backup-crypt:host-a"
LOG="/var/log/rclone-backup.log"

rclone copy "$SRC" "$DEST" \\
  --log-file "$LOG" \\
  --log-level INFO \\
  --transfers 4 \\
  --checkers 8 \\
  --retries 3 \\
  --stats 1m

rclone check "$SRC" "$DEST" --one-way --log-file "$LOG"
\`\`\`

Schedule it with a systemd timer or cron, and alert on a non-zero exit code. Keep the last run status somewhere you will actually see it.

## Restore test

A backup that has never been restored is a hypothesis. Once a month, restore a sample into a temporary directory and compare checksums.

\`\`\`bash
mkdir -p /tmp/restore-test
rclone copy backup-crypt:host-a /tmp/restore-test --progress
diff -r /srv/data /tmp/restore-test
\`\`\`

Record the date, the file count and the result. If the restore takes longer than your recovery target, the target is wrong or the backup is.

## Practices that prevent surprises

- Exclude caches and temporary files, not data directories
- Use \`copy\` by default; \`sync\` deletes files that are missing at the source
- Keep the crypt password and the remote configuration backed up separately
- Test the restore on a different machine, not the one that made the backup
- Monitor backup age, not only job success

Encryption protects the data at rest. It does not replace access control on the storage account, so use a dedicated key with the narrowest permissions that still allow the job to run.`,
  },
  {
    slug: "lmstudio-local-llm",
    title: "Running local LLMs with LM Studio",
    date: "2026-06-24",
    excerpt:
      "LM Studio runs open models on a laptop and exposes an OpenAI-compatible server. Here is what to expect from model sizes, quantization and throughput on Apple Silicon, and how to integrate it without sending data out.",
    tags: ["ai", "llm", "lmstudio", "local"],
    content: `LM Studio runs open models on a laptop and exposes an OpenAI-compatible server. For work that cannot leave the network, that combination is often enough: no API key, no data egress, and a predictable cost.

## What it provides

- A model browser that downloads from Hugging Face
- A chat interface for quick evaluation
- A local server compatible with the OpenAI API
- Apple Silicon acceleration through MLX and Metal

The trade-off is scale. A laptop runs models that fit in unified memory, which means smaller models and shorter context than a hosted service.

## Reference machine

The numbers below come from a reference machine, not a server:

| Component | Specification |
|---|---|
| Chip | Apple M4 |
| Unified memory | 16 GB |
| Storage | 512 GB SSD |

Memory is the constraint. A model plus its context has to fit alongside the operating system and the applications you are actually using.

## Model sizes and quantization

Quantization trades quality for memory. For most evaluation work, a 4-bit or 6-bit quantized model is the right starting point; move up only when the task needs it.

| Model size | Quantization | Approximate speed |
|---|---|---|
| 2B | Q8_0 | 60+ tokens per second |
| 7B | Q8_0 | 25 to 30 tokens per second |
| 9B | Q8_0 | 20 to 25 tokens per second |
| 12B | Q8_0 | 15 to 20 tokens per second |

These are interactive-use figures with a short context. Long prompts and large context windows reduce throughput, sometimes by half.

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

They are a poor fit for long-context reasoning, high-throughput batch jobs, or anything where a wrong answer is expensive and unverified.

## Operational notes

- Pin model versions and record the quantization used for each result
- Evaluate on your own examples, not only public benchmarks
- Keep prompts and outputs out of logs if they contain sensitive data
- Monitor memory pressure; swapping destroys throughput
- Have a fallback path when the model server is unavailable

Local inference is a privacy and cost decision first, and a performance decision second. Size the model to the machine, and the workflow to the model.`,
  },
] as const;
