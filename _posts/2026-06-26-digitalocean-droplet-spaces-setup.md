---
title: 'A Complete Guide to Setting Up DigitalOcean Droplets and Spaces Object Storage'
date: 2026-06-26
permalink: /posts/2026/06/digitalocean-droplet-spaces-setup/
tags:
  - digitalocean
  - cloud
  - vps
  - storage
  - tutorial
---

DigitalOcean is one of the most popular cloud computing (IaaS) providers for developers due to its clean interface, solid performance, and transparent pricing. Two of their most commonly used services are **Droplets** (VPS/Virtual Machines) and **Spaces** (Amazon S3-compatible Object Storage).

In this post, I will share a step-by-step guide on how to create a Droplet and configure Spaces Object Storage on DigitalOcean.

## 1. How to Create a Droplet (Virtual Private Server)

A "Droplet" is DigitalOcean's term for a Virtual Machine or VPS. Creating a Droplet is incredibly easy and fast.

**Steps:**

1. **Log in to the DigitalOcean Dashboard:** Access your account. If you don't have one, you'll need to sign up first.
2. **Click the "Create" Button:** In the top right corner, click the green **Create** button, then select **Droplets**.
3. **Choose a Region (Data Center):** Select the server location closest to your target users. For users in Southeast Asia, **Singapore (SGP1)** is usually the best choice for the lowest latency.
4. **Choose an Image (Operating System):** Select the OS you want to use. **Ubuntu (latest LTS version)** is the standard, secure choice with a massive support community. You can also choose the *Marketplace* if you want to install ready-to-use applications like WordPress or Docker.
5. **Choose a Size (Specs/Plan):** 
   - Select the CPU type: *Basic*, *General Purpose*, *CPU-Optimized*, etc.
   - For small projects or learning, the **Basic (Shared CPU)** plan starting at $4-$6/month is more than enough.
6. **Choose an Authentication Method (Important!):**
   - **SSH Key:** Highly recommended. It is much more secure than a password. If you don't have one, you can generate it on your local machine and upload the *Public Key*.
   - **Password:** This option is easier but vulnerable to *brute-force* attacks. If you choose this, make sure to use a very strong password.
7. **Select Additional Options (Optional):** You can check *Enable Backups*, *Monitoring*, or *IPv6* according to your needs.
8. **Choose a Hostname:** Enter a recognizable `Hostname` for your Droplet (e.g., `web-server-01`).
9. **Click "Create Droplet":** Wait about a minute, and your Droplet's Public IP will appear. You can now log in via SSH!

---

## 2. How to Create Spaces Object Storage

Spaces is an *Object Storage* service perfect for storing static assets like images, videos, backup files, or static website files. Spaces are very affordable (starting at $5/month for 250GB) and include a built-in *Content Delivery Network* (CDN).

**Steps:**

1. **Click the "Create" Button:** In the top right corner of the dashboard, click **Create**, then select **Spaces**.
2. **Choose a Region:** Again, choose the location closest to your users (e.g., **Singapore**). It is highly recommended to select the same region as your Droplet if they will communicate with each other, ensuring faster transfer speeds.
3. **CDN Configuration (Content Delivery Network):**
   - By default, the CDN is enabled. This is great for accelerating asset loading times for visitors from different countries.
   - You can also add a **Custom Subdomain** (e.g., `cdn.yourdomain.com`) if you manage your DNS on DigitalOcean.
4. **Choose a Space Name (Bucket):** 
   - This name must be globally unique because it will form part of the URL (e.g., `my-awesome-assets`).
5. **Select a Project:** Assign this Space to the appropriate project.
6. **Click "Create a Space":** Your Space will be created instantly and is ready to use.

---

## 3. Generating Access Keys for Spaces (Important)

Because Spaces is compatible with the Amazon S3 API, you can use various S3 tools (like S3cmd, rclone, or AWS SDKs) to manage it. To do this, you need an **Access Key** and a **Secret Key**.

1. In the left-hand menu, click on the **API** section.
2. Select the **Spaces Keys** tab.
3. Click the **Generate New Key** button.
4. Give the key a descriptive name (e.g., `App Backup Key`).
5. Two codes will appear: the **Key** and the **Secret**. 
   > [!WARNING]
   > Immediately copy and save your **Secret Key** in a secure location! This code is only displayed once. If you lose it, you will have to generate a new key pair.

## Conclusion

DigitalOcean makes cloud infrastructure provisioning incredibly simple. With a Droplet, you have full control over your server (VPS), and with Spaces, you can store thousands of static files at a very affordable price without consuming your Droplet's primary disk space. 

Combining these two services provides a rock-solid foundation for deploying modern web applications! 🚀
