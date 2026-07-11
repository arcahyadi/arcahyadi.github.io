---
title: 'Encrypted Cloud Backups to Google Drive with Rclone'
date: 2026-07-11
permalink: /posts/2026/07/rclone-encrypted-backup-google-drive/
tags:
  - backup
  - rclone
  - google-drive
  - encryption
  - self-hosting
  - tutorial
---

Google Drive offers 15GB of free cloud storage — it would be a waste not to use it for backing up important data. But uploading raw files to a third-party cloud raises legitimate privacy concerns. The solution? Use **Rclone** with its built-in **crypt** feature to encrypt files *before* they leave your machine. This way, your data stays safe even if your Google account is compromised.

In this post, I'll walk through the complete setup: installing Rclone, configuring Google Drive, setting up transparent encryption, and automating everything with a cron job.

## What is Rclone?

[Rclone](https://rclone.org/) is an open-source command-line tool for managing files on cloud storage. It supports over 40 cloud providers, including Google Drive, OneDrive, Dropbox, Amazon S3, and many more. Often called "rsync for the cloud," Rclone is incredibly flexible and powerful.

Key features:

- 🔄 **Sync & Copy** — one-way or two-way sync between cloud and local storage
- 🔐 **Encryption (crypt)** — transparently encrypt files before uploading
- 📦 **Mount** — mount cloud storage as a local drive via FUSE
- ⚡ **Bandwidth control** — throttle upload/download speeds as needed
- 📊 **Logging** — detailed activity logs for monitoring and debugging

## Prerequisites

Before getting started, make sure you have:

1. **A Linux server** (Ubuntu/Debian) — can be a VPS or a local machine
2. **A Google account** with enough free storage
3. **Terminal access** with a user that has sudo privileges

## 1. Installing Rclone

The easiest way to install Rclone is using the official install script:

```bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
```

Or if you prefer a manual installation:

```bash
# Download the latest version
curl -O https://downloads.rclone.org/current/rclone-current-linux-amd64.zip

# Extract
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64

# Copy the binary to /usr/bin
sudo cp rclone /usr/bin/
sudo chmod 755 /usr/bin/rclone

# Verify the installation
rclone version
```

## 2. Configuring the Google Drive Remote

Run the interactive configuration wizard:

```bash
rclone config
```

Follow these steps:

```
No remotes found, make a new one?
n) New remote
q) Quit config
n/s/q> n

Enter name for new remote.
name> gdrive

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
...
18 / Google Drive
   \ (drive)
...
Storage> drive

Option client_id.
Google Application Client Id
Leave blank normally.
client_id>

Option client_secret.
OAuth Client Secret.
Leave blank normally.
client_secret>

Option scope.
Scope that rclone should use when requesting access from drive.
Choose a number from below, or type in your own value.
 1 / Full access all files, excluding Application Data Folder.
   \ (drive)
...
scope> 1

Option service_account_file.
Service Account Credentials JSON file path.
Leave blank normally.
service_account_file>

Edit advanced config?
y) Yes
n) No (default)
y/n> n

Use web browser to automatically authenticate rclone with remote?
y) Yes (default)
n) No
y/n>
```

### Authenticating on a Headless Server

If you're configuring Rclone on a server without a browser (headless), select `n` at the prompt above. Rclone will then display a command you need to run on a local machine that has a browser:

```
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.

For more help and alternate methods see: https://rclone.org/remote_setup/

Execute the following on the machine with the web browser (same rclone
version recommended):

	rclone authorize "drive" "eyJ...token..."

Then paste the result.
config_token>
```

Here's how to complete the process:

1. **On your local machine** (with a browser), install Rclone as well
2. Run the `rclone authorize` command shown in the output
3. A browser window will open — log in to your Google account and grant permission
4. Copy the token that appears in your local terminal
5. Paste the token back into the server's prompt

After successful authentication:

```
Configure this as a Shared Drive (Team Drive)?
y) Yes
n) No (default)
y/n> n

Keep this "gdrive" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```

Verify the connection:

```bash
rclone lsd gdrive:
```

This should list the folders in your Google Drive.

## 3. Setting Up Encryption (Crypt Remote)

This is the most important part — we'll create a new remote that transparently encrypts all files before they're uploaded to Google Drive.

Run the config wizard again:

```bash
rclone config
```

```
n) New remote
n/s/q> n

Enter name for new remote.
name> gdrive-crypt

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
...
14 / Encrypt/Decrypt a remote
   \ (crypt)
...
Storage> crypt

Option remote.
Remote to encrypt/decrypt.
Normally should contain a ':' and a path, e.g. "myremote:path/to/dir",
"myremote:bucket" or maybe "myremote:" (not recommended).
remote> gdrive:backup-encrypted

Option filename_encryption.
How to encrypt the filenames.
Choose a number from below, or type in your own value.
 1 / Encrypt the filenames.
   \ (standard)
 2 / Very simple filename obfuscation.
   \ (obfuscate)
 3 / Don't encrypt the file names.
   \ (off)
filename_encryption> standard

Option directory_name_encryption.
Option to either encrypt directory names or leave them intact.
Choose a number from below, or type in your own value.
 1 / Encrypt directory names.
   \ (true)
 2 / Don't encrypt directory names, leave them intact.
   \ (false)
directory_name_encryption> true

Option password.
Password or pass phrase for encryption.
y) Yes, type in my own password
g) Generate random password
y/g> y
Enter the password: ********
Confirm the password: ********

Option password2.
Password or pass phrase for salt.
y) Yes, type in my own password
g) Generate random password
n) No, leave this optional password blank (default)
y/g/n> y
Enter the password: ********
Confirm the password: ********
```

> [!CAUTION]
> **Store both passwords in an extremely safe place!** If you lose them, your encrypted files **cannot be decrypted** and your data will be gone forever. I recommend using a password manager like Bitwarden or KeePassXC.

After completing the setup:

```
Keep this "gdrive-crypt" remote?
y) Yes this is OK (default)
y/e/d> y
```

### How Rclone Encryption Works

Here's how data flows through the crypt remote:

```
Local Files ──► Rclone Crypt (encrypt) ──► Google Drive
                                           (encrypted files)

Google Drive ──► Rclone Crypt (decrypt) ──► Local Files
(encrypted files)                          (original files)
```

- **Filenames** are encrypted and unreadable on Google Drive
- **File contents** are encrypted using NaCl SecretBox (XSalsa20 + Poly1305)
- **Directory structure** is also encrypted (if `directory_name_encryption` is enabled)

## 4. Using Rclone for Backups

### Uploading (Backing Up) Files

To upload files to Google Drive with encryption:

```bash
# Copy files/folders to cloud (automatically encrypted)
rclone copy /path/to/local/data gdrive-crypt: --progress

# Example: back up /home/user/documents
rclone copy /home/user/documents gdrive-crypt:documents --progress
```

### Sync (One-Way Mirror)

Sync makes the remote an exact mirror of your local directory — files deleted locally will also be deleted on the remote:

```bash
rclone sync /path/to/local/data gdrive-crypt: --progress
```

> [!WARNING]
> Be careful with `sync`! Files that exist on the remote but not locally will be **deleted**. Use `copy` if you only want to add new files without removing old ones.

### Downloading (Restoring) Files

To restore files from a backup:

```bash
# Download all files (automatically decrypted)
rclone copy gdrive-crypt: /path/to/restore/ --progress

# Download a specific folder
rclone copy gdrive-crypt:documents /home/user/restore/documents --progress
```

### Viewing Encrypted vs. Decrypted Files

```bash
# View files on Google Drive (encrypted names)
rclone ls gdrive:backup-encrypted

# Example output:
# 2948723 v05u42a5fkh5b2s0r91cbo4im0/7gdcp5...

# View files through the crypt remote (decrypted names)
rclone ls gdrive-crypt:

# Example output:
# 2948723 documents/important-notes.txt
```

## 5. Automating Backups with Cron

To run backups automatically, we can use a simple shell script combined with a cron job.

### Create the Backup Script

```bash
sudo nano /usr/local/bin/backup-gdrive.sh
```

Script contents:

```bash
#!/bin/bash

# ============================================
# Rclone Encrypted Backup Script
# ============================================

# Configuration
RCLONE_REMOTE="gdrive-crypt"
BACKUP_DIRS=(
    "/home/user/documents"
    "/home/user/projects"
    "/etc/nginx"
    "/opt/docker-compose"
)
LOG_FILE="/var/log/rclone-backup.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Logging function
log() {
    echo "[$DATE] $1" | tee -a "$LOG_FILE"
}

log "========== Backup started =========="

# Back up each directory
for DIR in "${BACKUP_DIRS[@]}"; do
    if [ -d "$DIR" ]; then
        DEST_NAME=$(basename "$DIR")
        log "Backing up: $DIR -> $RCLONE_REMOTE:$DEST_NAME"

        rclone copy "$DIR" "$RCLONE_REMOTE:$DEST_NAME" \
            --log-file="$LOG_FILE" \
            --log-level INFO \
            --transfers 4 \
            --checkers 8 \
            --contimeout 60s \
            --timeout 300s \
            --retries 3 \
            --low-level-retries 10 \
            --stats 1m

        if [ $? -eq 0 ]; then
            log "✅ Success: $DIR"
        else
            log "❌ Failed: $DIR"
        fi
    else
        log "⚠️ Directory not found: $DIR"
    fi
done

log "========== Backup finished =========="
log ""
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/backup-gdrive.sh
```

### Set Up the Cron Job

Open the crontab editor:

```bash
crontab -e
```

Add a backup schedule (example: every day at 2 AM):

```cron
# Encrypted backup to Google Drive every day at 02:00
0 2 * * * /usr/local/bin/backup-gdrive.sh
```

Other schedule examples:

```cron
# Every 6 hours
0 */6 * * * /usr/local/bin/backup-gdrive.sh

# Every Sunday at 3 AM
0 3 * * 0 /usr/local/bin/backup-gdrive.sh

# First day of every month at 1 AM
0 1 1 * * /usr/local/bin/backup-gdrive.sh
```

## 6. Tips and Best Practices

### Limit Bandwidth

If your server has limited bandwidth, throttle the upload speed:

```bash
# Limit upload to 5 Mbps
rclone copy /data gdrive-crypt: --bwlimit 5M
```

### Exclude Unnecessary Files

Skip files that don't need to be backed up:

```bash
rclone copy /data gdrive-crypt: \
    --exclude "*.tmp" \
    --exclude "*.log" \
    --exclude "node_modules/**" \
    --exclude ".cache/**"
```

### Dry Run (Simulation)

Always simulate before running a sync to see what would change:

```bash
rclone sync /data gdrive-crypt: --dry-run --progress
```

### Verify File Integrity

Make sure uploaded files aren't corrupted:

```bash
rclone check /path/to/local/data gdrive-crypt: --one-way
```

### Back Up Your Rclone Configuration

Don't forget to back up the Rclone config file itself:

```bash
# Default config location
cat ~/.config/rclone/rclone.conf

# Back up to a safe location (e.g., an encrypted USB drive)
cp ~/.config/rclone/rclone.conf /media/usb-drive/rclone-config-backup.conf
```

> [!IMPORTANT]
> The `rclone.conf` file contains your encryption passwords (albeit obfuscated). Make sure this file is stored securely and never committed to a public repository!

## Conclusion

With the combination of **Rclone + Google Drive + Crypt**, you get a cloud backup solution that is:

- ✅ **Free** — leverages Google Drive's 15GB of free storage
- ✅ **Secure** — files are encrypted end-to-end before leaving your server
- ✅ **Automated** — cron jobs run backups without manual intervention
- ✅ **Verifiable** — file integrity can be checked at any time

Google cannot read your files because everything is encrypted before it's uploaded. Even if someone gains access to your Google account, they'll only see files with random names and unreadable contents.

Happy backing up — and remember: **a backup that hasn't been test-restored is not a real backup!** 🔐
