---
title: 'Self-Hosting a RustDesk Server: Open Source Remote Desktop'
date: 2026-06-23
permalink: /posts/2026/06/rustdesk-server-setup/
tags:
  - rustdesk
  - self-hosting
  - homelab
  - linux
---

Today I learned how to install and set up a self-hosted **RustDesk Server**. For those who might not know, RustDesk is an open-source alternative to remote desktop software like TeamViewer or AnyDesk.

While you can use RustDesk's public servers for free, self-hosting your own server comes with several great benefits:
- **Faster & more stable connection**: Especially if the server and the client are in the same region, or even on the same local network (LAN).
- **Security & Privacy**: Your connection data is completely under your own control.
- **No Limitations**: There are no time limits or annoying commercial pop-ups.

## Prerequisites

To run a RustDesk Server using the installation script, you will need:
- A server/VPS running a supported Linux distribution (Ubuntu, Debian, or CentOS are recommended).
- `sudo` or `root` access to your server.
- A static Public IP or a domain name pointing to your server's IP (for access from outside your network).

## Port Forwarding

Before running the installation, make sure the following ports are open on your firewall or router (Port Forwarding):
- **TCP**: 21115, 21116, 21117, 21118, 21119
- **UDP**: 21116

## Installing via Script

The easiest way to install RustDesk on a bare-metal Linux server or a VM is by using a popular community-maintained installation script. This script automatically downloads the latest release, sets up the necessary `systemd` services (`hbbs` and `hbbr`), and configures the firewall if needed.

1. SSH into your server.
2. Download the installation script:

```bash
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
```

3. Make the script executable:

```bash
chmod +x install.sh
```

4. Run the script:

```bash
./install.sh
```

During the installation, the script might ask you for your server's public IP or domain name. Follow the on-screen prompts to complete the setup. 

The script will automatically configure `systemd` so that your RustDesk server components (`hbbs` and `hbbr`) start automatically on boot.

## Retrieving the Public Key

To ensure that RustDesk clients can connect securely and to prevent unauthorized access, the server generates a key pair (Private & Public key) during installation.

You need to grab this **Public Key** to enter into the client application. If you used the script above, the key file is typically stored in `/opt/rustdesk/id_ed25519.pub` or the directory where it was installed.

Run this command to view the Public Key:

```bash
cat /opt/rustdesk/id_ed25519.pub
```

Copy and save the text string that appears. We'll need it for the next step.

## Client Application Configuration

Now that our server is running, the final step is to point the RustDesk application on our computer or phone to our newly created server.

1. Open the **RustDesk** application.
2. Go to **Settings** -> **Network**.
3. Click **Unlock network settings** if the settings are currently locked.
4. Fill in the following details:
   - **ID Server**: Enter your server's domain or IP (e.g., `rustdesk.yourdomain.com`).
   - **Relay Server**: Leave this blank (it will automatically use the ID Server's domain).
   - **Key**: Paste the *Public Key* we obtained in the previous step.
5. Click **Apply**.

And you're done! Now, at the bottom of the RustDesk application, it should say **Ready**, indicating that the application has successfully connected to your self-hosted server.

The remote desktop experience is now much more responsive and private! 🚀
