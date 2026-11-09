// content/blogs.ts — field notes (EN). Indonesian mirrors live in src/i18n/content.id.ts.
// Keep code fences, URLs, inline code and numbers identical across locales (npm run validate:parity).

export const blogs = [
  {
    slug: "rustdesk-server-setup",
    title: "Self-hosting a RustDesk server",
    date: "2026-06-23",
    excerpt: "Set up RustDesk signal and relay services on Linux, configure the firewall, and connect clients using the server's public key.",
    tags: ["rustdesk", "self-hosting", "linux"],
    content: `RustDesk is an open-source remote desktop application. With a self-hosted server, you run the signal and relay services yourself.

## Prerequisites

- A Linux server or VM supported by the installation method you choose
- Administrative access through sudo or root
- A static public address or a domain pointing to the server for access from outside the network

The [official installation guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) covers Docker, a community install script and Debian packages. The script method below sets up native services.

## Firewall and port forwarding

Allow TCP ports 21115, 21116 and 21117, plus UDP port 21116, through the host firewall and any upstream NAT device.

Ports 21118 and 21119 serve the web client. Keep them closed if you do not use it. If you do, follow the official reverse-proxy guidance and restrict these ports to the proxy, rather than exposing them directly.

## Install with the community script

The Techahold script downloads the signal service and relay service, then sets them up for startup with systemd. Download and review the script before running it with administrative privileges.

1. Connect to the server over SSH
2. Download the script

\`\`\`bash
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
\`\`\`

3. Review its contents, then make it executable

\`\`\`bash
chmod +x install.sh
\`\`\`

4. Run it and follow the prompts for the server address

\`\`\`bash
./install.sh
\`\`\`

Keep the server address and public key shown at the end. Check that both services start after reboot and review the firewall changes made by the installer.

## Retrieve the public key

The key files are stored in the installation directory. With this script, the public key is typically available at the following path; check the installer output if it differs.

\`\`\`bash
cat /opt/rustdesk/id_ed25519.pub
\`\`\`

Copy only the public key into client settings. Keep the private key on the server and include it in protected backups.

## Configure clients

1. Open RustDesk and go to Settings, then Network
2. Unlock the network settings if needed
3. Set ID Server to your server address, such as \`rustdesk.example.com\`
4. Paste the public key into Key; leave Relay Server blank unless your deployment uses a separate relay
5. Apply the settings and check that the client reports Ready

Test a connection from outside the server's local network as well as from inside it. A working LAN connection alone does not verify the public firewall and port forwarding.`,
  },
  {
    slug: "digitalocean-droplet-spaces-setup",
    title: "Setting up DigitalOcean Droplets and Spaces",
    date: "2026-06-26",
    excerpt: "Create a Linux virtual server, configure S3-compatible object storage, and give an application a dedicated Spaces access key.",
    tags: ["digitalocean", "cloud", "vps", "storage", "tutorial"],
    content: `DigitalOcean Droplets are virtual servers. Spaces provides S3-compatible object storage for assets and backups. This guide covers setting up both through the control panel.

## Create a Droplet

1. Sign in to the DigitalOcean control panel and choose Create, then Droplets
2. Choose a region close to the application users and any services it depends on
3. Select a supported Linux image, such as a current Ubuntu LTS release
4. Choose a plan for the workload and check current pricing before creating it
5. Add an SSH public key for login; keep its private key on your own machine
6. Choose backup, monitoring and IPv6 options according to the deployment requirements
7. Set a descriptive hostname, review the configuration and create the Droplet

Once the public address is available, connect over SSH. Verify administrative access before restricting the firewall, and open only the ports the application needs.

## Create a Spaces bucket

1. Open Spaces Object Storage in the control panel and create a bucket
2. Choose a region; using the same region as the Droplet can simplify application access
3. Choose a unique bucket name and assign the project
4. Review file-listing and object-access permissions before uploading data
5. Enable the CDN if the bucket will serve public assets; it is not a replacement for access control

Do not publish backup files or private uploads as public assets. Use separate buckets or explicit access rules when the data has different audiences.

## Generate an application access key

Follow the [Spaces access-key documentation](https://docs.digitalocean.com/products/spaces/how-to/manage-access/) for the current control-panel steps and permission limits.

1. Open Spaces Object Storage, then Access Keys, and choose Create Access Key
2. Choose limited access for the required buckets and operations when compatible with your bucket policy
3. Give the key a name that identifies the application using it
4. Create the key and store its secret securely; it is shown only once
5. Configure the application or S3-compatible client with the bucket endpoint and credentials

Keep secrets out of source control, browser bundles and screenshots. Use a dedicated key per application so rotation does not affect unrelated workloads.

## Verify before use

- Upload a non-sensitive test file through the application's credentials
- Read it back and confirm access behaves as intended
- Check that an unauthenticated request cannot retrieve private objects
- Confirm the key cannot access buckets outside its assigned scope

The Droplet runs the application; Spaces stores objects independently of the server disk. Neither replaces a tested backup and restore process.`,
  },
  {
    slug: "mikrotik-multi-wan-bonding",
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
    slug: "proxmox-ve-storage-and-backups",
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
    slug: "unifi-os-on-proxmox",
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
    title: "Managing Docker Compose stacks with Dockge",
    date: "2026-06-25",
    excerpt:
      "Install Dockge to manage Docker Compose stacks from a browser, with notes on access control, directory layout, backups, and updates.",
    tags: ["docker", "containers", "operations", "dockge"],
    content: `Dockge lets you edit, start, stop, and update Docker Compose stacks from a browser. It can be useful for managing several Compose projects on a single host.

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

Keep each stack's files in a separate directory:

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
6. Monitoring for stopped containers and failed health checks`,
  },
  {
    slug: "rclone-encrypted-backup-google-drive",
    title: "Encrypted off-site backups with Rclone",
    date: "2026-07-11",
    excerpt:
      "Configure an encrypted Rclone remote, schedule file copies, and test restoring the backup.",
    tags: ["backup", "rclone", "encryption", "operations"],
    content: `Rclone's crypt remote encrypts files before uploading them to the storage provider. This guide covers the remote configuration, a backup script, scheduling, and a restore test.

## How the layers fit

There are two remotes: the storage remote and a crypt remote layered on top of it. Reads and writes go through the crypt remote; the provider stores encrypted objects.

- Names encrypted with the standard filename mode
- Contents encrypted with NaCl SecretBox
- Optional second password for the salt
- The crypt password is not stored in the remote provider

You need the crypt password to decrypt the backup. Keep it in a password manager and retain an offline copy.

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

Keep the script short, record its errors, and check the exit status of each scheduled run.

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

Test backup restoration regularly. Once a month, restore a sample into a temporary directory and compare checksums.

\`\`\`bash
mkdir -p /tmp/restore-test
rclone copy backup-crypt:host-a /tmp/restore-test --progress
diff -r /srv/data /tmp/restore-test
\`\`\`

Record the date, file count, result, and restore duration. Compare the duration with your recovery target.

## Backup checks

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
] as const;
