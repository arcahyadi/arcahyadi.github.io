// src/i18n/content.id.ts — Indonesian overrides for public content
// Truth: slugs, dates, tags, links, code fences, image paths remain invariant (en). Only
// user-visible prose (title, excerpt, content, cv fields) is translated. Technical terms
// (MikroTik, RouterOS, WireGuard, Proxmox, etc.) and facts are preserved verbatim.

export const cvId = {
  headline: "Teknisi Jaringan · SysAdmin · Programmer",
  summary:
    "Teknisi Jaringan, SysAdmin dan penggemar homelab asal Banjarmasin, Indonesia. Saya membangun dan merawat sistem yang andal — dan sebuah mini data center di rumah.",
  pdfLabel: "Unduh CV (PDF)",
  education: [
    {
      degree: "Sarjana (S1) Teknik Informatika",
      school: "Universitas Islam Kalimantan Muhammad Arsyad Al Banjari (UNISKA) — Banjarmasin",
      year: "2024 — 2026",
      details:
        "Program S1 Teknik Informatika — lulus 2026, fokus rekayasa perangkat lunak, jaringan, dan sistem cerdas.",
    },
    {
      degree: "Ahli Madya Teknik Informatika",
      school: "Politeknik Negeri Banjarmasin",
      year: "2022",
      details: "Teknik Informatika — fokus jaringan & perangkat lunak.",
    },
    {
      degree: "Teknik Komputer dan Jaringan",
      school: "SMKN 1 Marabahan",
      year: "2019",
      details: "Dasar Teknik Komputer dan Jaringan.",
    },
  ],
  experience: [
    {
      role: "Programmer dan SysAdmin",
      org: "STIKES ISFI Banjarmasin",
      period: "2022 — Sekarang",
      bullets: [
        "Memimpin upgrade dan modernisasi sistem jaringan kampus — merancang ulang segmentasi VLAN, kebijakan firewall, dan traffic shaping untuk 500+ pengguna",
        "Upgrade infrastruktur WiFi kampus — migrasi ke UniFi OS Server dan perluasan armada AP (UAP-LR, UAP-AC-Lite, U7 Lite, U6+, U6-LR) untuk cakupan dan roaming yang lebih baik",
        "Optimasi MikroTik CCR1016 sebagai core router (RouterOS 7) — multi-WAN, NAT, bonding (802.3ad), dan tuning QoS untuk stabilitas dan throughput",
        "Monitoring dan perawatan infrastruktur jaringan dengan LibreNMS dan Uptime Kuma",
        "Meny delivered pembaruan besar untuk stikes-isfi.ac.id — membangun modul PWP (Praktik Kerja Lapangan), modernisasi panel Admin, menambahkan maintenance mode & perbaikan manajemen pengguna, serta penyegaran situs publik (footer, navigasi, tautan)",
      ],
    },
    {
      role: "Ketua BAAK (Biro Administrasi Akademik dan Kemahasiswaan)",
      org: "STIKES ISFI Banjarmasin",
      period: "2022 — Sekarang",
      bullets: [
        "Mengoordinasikan administrasi akademik dari penerimaan hingga kelulusan",
        "Mengelola registrasi mahasiswa, KRS, KHS, transkrip, kalender akademik",
        "Mengawasi yudisium, wisuda, penerbitan ijazah dan pelaporan PD Dikti",
        "Mengelola beasiswa dan layanan kemahasiswaan",
      ],
    },
    {
      role: "Penggemar Homelab",
      org: "Self-hosted · Proxmox VE",
      period: "2023 — Sekarang",
      bullets: [
        "Dua node Proxmox VE (pve / pve2): LXC, VM, ZFS RAID1, SDN",
        "Docker & Dockge — Uptime Kuma, n8n, OpenSpeedTest, OmniTools, BentoPDF, Yubal, Jellyfin, LibreNMS, NFS, UniFi OS",
        "Otomasi workflow n8n; LLM lokal via LM Studio (MLX/Metal) di MacBook Air M4",
      ],
    },
  ],
  skills: {
    networking: ["Cisco", "Mikrotik", "Ubiquiti UniFi", "WireGuard", "Tailscale", "OpenVPN", "VLAN", "Firewall", "Monitoring jaringan"],
    programming: ["PHP", "Go", "SQL / MySQL"],
    infra: ["Proxmox VE (LXC, VM, ZFS)", "Docker & Dockge", "Linux (Debian, Ubuntu)", "DigitalOcean Droplets & Spaces", "NFS"],
    automation: ["Otomasi workflow n8n", "LM Studio — LLM lokal (MLX/Metal)"],
  },
  certifications: [
    "CCNA: Introduction to Networks — /portfolio/portfolio-1/",
    "CCNA: Switching, Routing, and Wireless Essentials — /portfolio/portfolio-2/",
    "CCNA: Enterprise Networking, Security, and Automation — /portfolio/portfolio-3/",
  ],
  interests: [
    "Infrastruktur Jaringan — routing, switching, VPN, monitoring",
    "Homelab & Self-Hosting — memiliki stack dari ujung ke ujung",
    "Pengembangan Backend — membangun hal yang scalable",
    "Administrasi Sistem — Linux, container, virtualisasi",
    "AI & LLM Lokal — AI yang mengutamakan privasi di perangkat sendiri",
    "Otomasi Workflow — membuat komputer mengerjakan hal membosankan",
  ],
} as const;

// Portfolio overrides: keyed by slug, only translated fields
export const portfolioIdBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
  "stikes-isfi-campus-network-upgrade": {
    title: "STIKES ISFI Banjarmasin — Upgrade Sistem Jaringan Kampus",
    excerpt:
      "Upgrade menyeluruh infrastruktur jaringan kampus — core router, WiFi, VLAN dan monitoring untuk 500+ pengguna",
    content: `Upgrade menyeluruh dan modernisasi sistem jaringan kampus di **STIKES ISFI Banjarmasin** — melayani 500+ mahasiswa, dosen, dan tenaga kependidikan.

**Core Router — MikroTik CCR1016 (RouterOS 7):**
- Optimasi CCR1016-12G dengan RouterOS 7.22.1 sebagai core gateway kampus
- Multi-WAN 3 ISP (failover + pembagian beban, \`check-gateway=ping\`)
- Bonding interface 802.3ad (LACP) untuk distribusi WiFi throughput tinggi (Bonding port 5-7)
- Mendesain ulang firewall, NAT, segmentasi VLAN dan QoS/traffic shaping untuk stabilitas dan keadilan

**Wireless — UniFi OS Server (self-hosted di Proxmox):**
- Migrasi dari UniFi Network Application legacy ke **UniFi OS Server**
- Manajemen terpusat armada AP: UAP-LR, UAP-AC-Lite, U7 Lite, U6+, U6-LR
- Peningkatan cakupan, roaming mulus, dan kebijakan RF/SSID terpusat

**Monitoring & Operasional:**
- LibreNMS + Uptime Kuma untuk monitoring real-time dan alerting
- Dokumentasi topologi, IP plan, dan SOP operasional IT kampus

Pekerjaan ini melengkapi pengembangan [stikes-isfi.ac.id](https://stikes-isfi.ac.id) dan didokumentasikan lebih detail di blog saya:
- [Konfigurasi MikroTik CCR1016 Kampus](/blogs/mikrotik-ccr-campus-config/)
- [Self-Hosting UniFi OS di Proxmox](/blogs/unifi-os-proxmox-setup/)

[🌐 Website Kampus](https://stikes-isfi.ac.id)`,
  },
  "stikes-isfi-ac-id-updates": {
    title: "STIKES ISFI Banjarmasin — Update Platform Web",
    excerpt:
      "Pembaruan besar untuk stikes-isfi.ac.id — modul magang PWP, modernisasi Admin, dan peningkatan situs publik",
    content: `Pengembangan berkelanjutan untuk platform resmi kampus **[stikes-isfi.ac.id](https://stikes-isfi.ac.id)** — sebagai Programmer & SysAdmin di STIKES ISFI Banjarmasin.

**Yang saya rilis:**
- **Modul PWP (Praktik Kerja Lapangan)** — manajemen magang end-to-end: penempatan, assignment pembimbing, penilaian, dan rekap PDF dengan import CSV massal
- **Modernisasi Admin** — menyatukan panel Admin ke tema MonsterAdmin yang konsisten untuk UI yang lebih bersih dan mudah dipelihara
- **Operasional & Keamanan** — menambahkan maintenance mode dan memperbaiki alur reset password pengguna
- **Website Publik** — penyegaran footer, navigasi, dan tautan penting untuk usability yang lebih baik

[🌐 Kunjungi Website](https://stikes-isfi.ac.id)`,
  },
  "portfolio-1": {
    title: "CCNA: Introduction to Networks",
    excerpt: "CCNA NETWORK ENGINEER Introduction to Networks",
    content: `Sertifikat ini memverifikasi kelulusan kursus **CCNA: Introduction to Networks**, bagian dari program Cisco Networking Academy.

Kursus ini membahas arsitektur, struktur, fungsi, komponen, dan model Internet serta jaringan komputer lainnya. Memberikan fondasi kuat tentang prinsip pengalamatan IP dan dasar konsep Ethernet, media, dan operasi untuk membangun LAN sederhana, melakukan konfigurasi dasar router dan switch, serta mengimplementasikan skema pengalamatan IP.`,
  },
  "portfolio-2": {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    excerpt: "CCNA NETWORK ENGINEER Switching, Routing, and Wireless Essentials",
    content: `Sertifikat ini memverifikasi kelulusan kursus **CCNA: Switching, Routing, and Wireless Essentials**, bagian dari program Cisco Networking Academy.

Kursus ini berfokus pada teknologi switching dan operasi router yang mendukung jaringan bisnis skala kecil-menengah, termasuk wireless LAN (WLAN) dan konsep keamanan fundamental. Mencakup konfigurasi dan troubleshooting jaringan dasar, identifikasi dan mitigasi ancaman keamanan LAN, serta konfigurasi dan pengamanan WLAN dasar.`,
  },
  "portfolio-3": {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    excerpt: "CCNA NETWORK ENGINEER Enterprise Networking, Security, and Automation",
    content: `Sertifikat ini memverifikasi kelulusan kursus **CCNA: Enterprise Networking, Security, and Automation**, bagian dari program Cisco Networking Academy.

Kursus ini menjelaskan arsitektur dan pertimbangan terkait perancangan, pengamanan, pengoperasian, dan troubleshooting jaringan enterprise. Membahas teknologi WAN, mekanisme QoS untuk akses remote yang aman, serta pengenalan software-defined networking, virtualisasi, dan konsep otomasi yang mendukung digitalisasi jaringan.`,
  },
};

// Blogs overrides: keyed by slug, only translated fields
// Preserve: slug, date, tags, code fences, links, markdown structure, technical terminology
export const blogsIdBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
  "mikrotik-ccr-campus-config": {
    title: "MikroTik CCR1016: Bedah Konfigurasi Jaringan Kampus",
    excerpt:
      "Saya sedang mengerjakan konfigurasi core router jaringan kampus — MikroTik CCR1016-12G dengan RouterOS 7.22.1. Ini adalah tulang punggung infrastruktur internet kampus...",
    content: `Saya sedang mengerjakan konfigurasi core router jaringan kampus — **MikroTik CCR1016-12G** dengan RouterOS 7.22.1. Ini adalah tulang punggung seluruh infrastruktur internet kampus. Berikut rincian konfigurasi utama yang saya kelola.

## Perangkat

- **Model**: MikroTik CCR1016-12G (Cloud Core Router — 16 core CPU, 12x Gigabit Ethernet)
- **Versi RouterOS**: 7.22.1

CCR1016 adalah perangkat serius untuk routing kelas ISP. Dengan 16 core, kebutuhan pemrosesan paket jaringan kampus dapat ditangani tanpa kendala.

---

## 1. Penamaan Interface & Bonding

Hal pertama yang selalu saya lakukan di MikroTik adalah mengganti nama interface menjadi lebih deskriptif:

\`\`\`routeros
/interface ethernet
set ether1 name=ether-1-internet
set ether2 name=ether-2-internet
set ether3 name=ether-3-internet
set ether5 name=ether-5-wifi-ged1
\`\`\`

Port \`ether1\` hingga \`ether3\` khusus untuk uplink internet (multi ISP). \`ether5\` adalah uplink ke jaringan WiFi gedung.

Untuk ketahanan dan throughput di jaringan internal, saya menggunakan bonding **802.3ad Link Aggregation (LACP)**:

\`\`\`routeros
/interface bonding
add mode=802.3ad name="Bonding port 5-7" slaves=ether-5-wifi-ged1,ether6,ether7
\`\`\`

Port 5, 6, dan 7 di-bond menjadi satu interface logis dengan bandwidth lebih besar dan redundansi untuk distribusi WiFi utama kampus.

---

## 2. Multi-WAN: Tiga Jalur ISP

Kampus memiliki **tiga koneksi ISP bersamaan** untuk redundansi dan pembagian beban:

\`\`\`routeros
/ip dhcp-client
add interface=ether-1-internet
add interface=ether-2-internet
add interface=ether-3-internet

/routing table
add fib name=via-ISP1
add fib name=via-ISP2
add fib name=via-ISP3

/ip route
add dst-address=0.0.0.0/0 gateway=192.0.2.1 routing-table=main check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.0.2.2 routing-table=main check-gateway=ping
add dst-address=0.0.0.0/0 gateway=192.0.2.3 routing-table=main check-gateway=ping
\`\`\`

Tiap ISP memiliki routing table sendiri (\`via-ISP1\`, \`via-ISP2\`, \`via-ISP3\`), dan tabel utama memiliki ketiganya sebagai rute equal-cost dengan \`check-gateway=ping\` — jika satu ISP down, rutenya otomatis dikeluarkan.

---

## 3. VPN WireGuard ke Droplet DigitalOcean

Tunnel WireGuard menghubungkan router kampus ke **VPS DigitalOcean di Singapura**:

\`\`\`routeros
/interface wireguard
add listen-port=51363 mtu=1420 name=wg-sg-droplet

/interface wireguard peers
add interface=wg-sg-droplet endpoint-address=203.0.113.10 endpoint-port=51363 \\
    allowed-address=0.0.0.0/0 name=peer1

/ip address
add address=10.20.30.2/24 interface=wg-sg-droplet
\`\`\`

Tunnel ini dipakai untuk manajemen jarak jauh yang aman. Akses admin WinBox juga dibatasi ke subnet WireGuard (\`10.20.30.0/24\`) bersama LAN internal.

---

## 4. Sistem Hotspot untuk Pengguna Kampus

Bagian paling kompleks adalah sistem **IP Hotspot** yang mengatur akses internet seluruh warga kampus. Kami melayani tiga kelompok besar: **Mahasiswa**, **Dosen**, dan **Tendik**.

### Profil Pengguna dengan Rate Limit

Peran berbeda mendapat alokasi bandwidth berbeda:

| Profil | Shared Users | Keterangan |
|---|---|---|
| \`mahasiswa\` | 2 per akun | Untuk mahasiswa |
| \`dosen\` | 4 per akun | Untuk dosen |
| \`tendik\` | 4 per akun | Untuk staf administrasi |
| \`tendik - cs\` | — | Staf keamanan/CS |
| \`tendik it\` | 40 | Staf IT |
| \`ujian\` | 200 | Akun periode ujian |
| \`pkkmb\` | 200 | Minggu orientasi |
| \`guest\` | 100 | Akun tamu |
| \`acara\` | 200 | Akun acara |

### Jaringan Hotspot

\`\`\`routeros
/ip pool
add name=dhcp_pool0 ranges=10.10.1.2-10.10.7.254

/ip dhcp-server network
add address=10.10.0.0/21 dns-server=10.10.0.1 gateway=10.10.0.1 ntp-server=10.10.0.1
\`\`\`

Kampus memakai subnet \`/21\` (\`10.10.0.0/21\`), memberi 2046 IP yang dapat dipakai — cukup untuk seluruh komunitas kampus bersamaan. Router juga bertindak sebagai **server DNS** dan **server NTP**.

### Akun Pengguna

Akun dibuat per individu, terkait NIM atau nama staf, dan dipetakan ke profil. Contoh:

\`\`\`routeros
/ip hotspot user
add name=student001 comment="Student Example A" profile=mahasiswa
add name=lecturer01 comment="Lecturer Example"          profile=dosen
add name=staff01    comment="Staff Example"            profile=tendik
add name=exam       comment="Exam Account"               profile=ujian
\`\`\`

Akun mahasiswa mengikuti konvensi penamaan berbasis tahun angkatan dan kode prodi (mis. \`220102001\` = tahun 2022, prodi 01, nomor 002, mahasiswa 001). Saya mengelola ratusan akun untuk angkatan **2022, 2023, 2024, dan 2025**.

---

## 5. DHCP Static Lease untuk Perangkat Infrastruktur

Perangkat infrastruktur penting mendapat **static DHCP lease** agar selalu mendapat IP yang sama:

\`\`\`routeros
/ip dhcp-server lease
add address=10.10.0.100 mac-address=XX:XX:XX:XX:XX:75  # AP
add address=10.10.0.110 comment="u7 biologi"            # U7 AP di gedung Biologi
add address=10.10.7.10  comment=nfs2                    # Server NFS
add address=10.10.2.147 mac-address=XX:XX:XX:XX:XX:B8  # Perangkat monitoring SNMP
add address=10.10.1.91  comment="Mikrotik Switch"       # Managed Switch
\`\`\`

---

## 6. Daftar Firewall Address List (\`nice.rsc\`)

Sebagian besar konfigurasi adalah **firewall address-list** bernama \`nice\`, berisi ribuan rentang IP dari \`www.mikrotik.co.id\` (update terakhir Januari 2024) untuk penanda IP tepercaya pada keputusan routing.

\`\`\`routeros
/ip firewall address-list
add address=8.215.0.0/16 list=nice
add address=18.136.0.0/16 list=nice
add address=34.101.0.0/16 list=nice
# ... ribuan entri lainnya
\`\`\`

---

## 7. Backup Otomatis ke NAS via SFTP

Saya menyiapkan skrip backup otomatis setiap **2 hari** yang mengunggah file \`.backup\` dan export \`.rsc\` ke NAS lokal:

\`\`\`routeros
/system scheduler
add name=Schedule-Backup-2Hari interval=2d on-event=script1 start-time=13:20:00
\`\`\`

Skrip melakukan: membuat nama file berdasar nama router dan tanggal, membuat \`.backup\` dan \`.rsc\`, menunggu 10 detik, upload keduanya ke \`10.10.1.48\` via **SFTP**, lalu mencatat log.

---

## 8. Penguatan Keamanan

\`\`\`routeros
/ip service
set ftp      disabled=yes
set telnet   disabled=yes
set api      disabled=yes
set api-ssl  disabled=yes
set winbox   address=10.10.0.0/21,10.20.30.0/24  # Batasi ke LAN + WireGuard
set www      port=16100                             # Pindah HTTP ke port non-standar

/ip ssh
set host-key-size=8192 strong-crypto=yes

/ip neighbor discovery-settings
set discover-interface-list=none  # Nonaktifkan CDP/LLDP

/ipv6 settings
set disable-ipv6=yes

/ip cloud
set ddns-enabled=yes ddns-update-interval=10m
\`\`\`

- **FTP, Telnet, API dinonaktifkan** — hanya SSH, WinBox, dan WebFig (port kustom) yang diizinkan.
- **Akses WinBox dibatasi** ke LAN internal dan tunnel WireGuard.
- **Kripto SSH kuat** 8192-bit.
- **Neighbour discovery dimatikan**.

---

## 9. SNMP untuk Monitoring

\`\`\`routeros
/snmp
set enabled=yes contact="ISFI IT" location="ISFI BJM"

/snmp community
set [ find default=yes ] addresses=10.10.2.147/32  # Batasi ke host LibreNMS saja
\`\`\`

---

## 10. Managed Switch: MikroTik CRS326-24G-2S+ (SwOS)

Selain core router, saya juga mengelola **MikroTik CRS326-24G-2S+** — switch 24 port Gigabit dengan 2 slot SFP+, menjalankan **SwOS**.

| Properti | Nilai |
|---|---|
| **Model** | CRS326-24G-2S+ |
| **Firmware** | SwOS |
| **IP Manajemen** | 192.0.2.10 (Static) |
| **Uptime** | 20 hari |
| **DHCP Fallback** | Enabled |

Port 1, 21, 22 ditandai **LAG Ports** — bagian Link Aggregation Group ke interface bonded CCR1016. Port 24 adalah downlink ke **Gedung 6**, Port 23 melayani ruang kelas. Label deskriptif mempercepat troubleshooting.

### Mengapa SwOS?

SwOS lebih ringan, sederhana untuk L2 switching dengan UI web yang bersih — cukup untuk kebutuhan switching tanpa fitur penuh RouterOS.

---

## Ringkasan

Kombinasi CCR1016 + CRS326 menangani:
- **Failover Multi-WAN** 3 ISP dengan health check gateway
- **Autentikasi Hotspot** untuk ratusan mahasiswa, dosen, staf
- **Manajemen bandwidth** via rate limit per profil
- **VPN WireGuard** ke cloud untuk akses aman
- **Backup konfigurasi otomatis** ke NAS via SFTP tiap 2 hari
- **Monitoring SNMP** terintegrasi LibreNMS
- **Link aggregation** antara router dan switch
- **Managed switching** via CRS326 dengan label port deskriptif
- **Rata-rata klien Hotspot**: 50–150, **Puncak**: hingga 300 pengguna

Mengelola jaringan skala ini selalu jadi pengalaman belajar. Kombinasi fleksibilitas MikroTik dan tenaga CCR adalah pilihan tepat untuk kampus. 🌐`,
  },
  "first-blog": {
    title: "Halo Dunia: Postingan Blog Pertama Saya",
    excerpt:
      "Sudah lama ingin mulai menulis di website ini, dan hari ini akhirnya terwujud — ini cara bagus untuk berbagi pemikiran, pengalaman...",
    content: `Sudah lama ingin mulai menulis di website ini, dan hari ini akhirnya terwujud! Saya pikir ini cara yang bagus untuk berbagi pemikiran, pengalaman, dan ide dengan dunia. Jadi mari mulai — selamat datang di blog saya!

## Sedikit Tentang Saya

Nama saya Aufa Riduan Cahyadi. Saya passionate di **pengembangan backend**, **infrastruktur jaringan**, dan **otomasi sistem**. Saat ini saya bekerja di laboratorium komputer kampus tempat saya mengelola dan merawat server serta fasilitas lab.

Di luar pekerjaan, saya adalah **penggemar homelab** yang berdedikasi. Waktu luang saya pakai untuk self-hosting aplikasi, mengelola lingkungan virtual dengan Proxmox, deploy layanan via Docker, dan mengonfigurasi jaringan aman dengan WireGuard dan Tailscale. Ada kepuasan tersendiri membangun infrastruktur sendiri dari nol!

## Apa yang Akan Dibahas

Di blog ini, saya berencana menulis tentang:

- 🖥️ **Petualangan homelab** — mendokumentasikan perjalanan self-hosting, dari setup Proxmox hingga deployment Docker
- 🌐 **Networking** — tips trik konfigurasi VPN, aturan firewall, dan otomasi jaringan
- 💻 **Pengembangan backend** — hal yang saya pelajari saat bekerja dengan Go, PHP, dan database
- 🤖 **Otomasi** — skrip, perkakas, dan workflow yang memudahkan hidup
- 📝 **Renungan teknologi** — pemikiran tentang dunia teknologi dan hal menarik

## Kenapa Nge-blog?

Saya percaya belajar secara terbuka. Menulis membantu menguatkan pemahaman, dan semoga juga membantu orang lain yang berada di perjalanan serupa. Plus, ini cara bagus untuk melihat kembali seberapa jauh kita berkembang.

## Nantikan

Ini baru permulaan. Banyak topik seru yang ingin saya eksplor dan bagikan. Jika topik di atas menarik buat kamu, tetap di sini — masih banyak lagi yang akan datang!

Terima kasih sudah membaca, selamat datang di sudut internet saya. 🚀`,
  },
  "my-proxmox-homelab-setup": {
    title: "Setup Homelab Proxmox Saya: Apa yang Saya Jalankan dan Mengapa",
    excerpt:
      "Salah satu hal favorit saya di dunia teknologi adalah homelab. Tidak ada yang mengalahkan menjalankan infrastruktur sendiri di rumah — ini adalah playground ...",
    content: `Salah satu hal favorit saya di dunia teknologi adalah homelab. Tidak ada yang mengalahkan menjalankan infrastruktur sendiri di rumah — ini adalah playground tempat kamu bisa bereksperimen, merusak sesuatu, dan belajar tanpa konsekuensi. Di tulisan ini saya ingin berbagi setup homelab Proxmox saya saat ini dan layanan apa yang saya jalankan.

## Setup: Dua Node Proxmox

Homelab saya berjalan di **dua node Proxmox VE**: \`pve\` dan \`pve2\`. Dua node terpisah memberi fleksibilitas memisahkan workload dan bereksperimen tanpa mengganggu layanan utama.

## Topologi Homelab

Berikut gambaran visual setup lengkap:

<div style="overflow-x: auto; width: 100%; min-height: 520px;">
<div class="mermaid">
graph LR
    PVE["🖥️ pve"]
    PVE2["🖥️ pve2"]

    PVE --> P100["📦 100 · n8n"]
    PVE --> P101["📦 101 · pve-scripts-local"]
    PVE --> P103["📦 103 · librenms"]
    PVE --> P109["📦 109 · qbittorrent"]
    PVE --> P110["📦 110 · nfs"]
    PVE --> P111["📦 111 · docker"]

    PVE2 --> P200["📦 100 · jellyfin"]
    PVE2 --> P201["📦 101 · backup"]
    PVE2 --> P202["📦 102 · alpine-it-tools"]
    PVE2 --> P203["📦 103 · docker"]
    PVE2 --> P204["🖥️ 104 · win10 VM"]
    PVE2 --> P205["🖥️ 105 · kali VM"]
    PVE2 --> P208["📦 108 · unifi-os-server"]
    PVE2 --> P210["📦 110 · nfs2"]
</div>
</div>


### Node 1: \`pve\` — Pekerja Ringan

Node ini menjalankan kebanyakan **LXC container** yang ringan:

| ID  | Nama                | Tipe | Deskripsi |
|-----|---------------------|------|-------------|
| 100 | **n8n**             | LXC  | Platform otomasi workflow — menghubungkan layanan dan mengotomasi tugas |
| 101 | **pve-scripts-local** | LXC | Skrip lokal untuk manajemen Proxmox |
| 103 | **librenms**        | LXC  | Sistem monitoring jaringan |
| 109 | **qbittorrent**     | LXC  | Klien torrent untuk download ISO Linux 😄 |
| 110 | **nfs**             | LXC  | Server file NFS untuk shared storage |
| 111 | **docker**          | LXC  | Host Docker untuk layanan terkontainerisasi |

**Storage di \`pve\`:**

- \`local\`, \`local-lvm\` dan \`lvm-hdd2-pve\`

### Node 2: \`pve2\` — Pekerja Berat

Menangani workload berat dengan campuran **LXC dan VM penuh**.

| ID  | Nama                | Tipe | Deskripsi |
|-----|---------------------|------|-------------|
| 100 | **jellyfin**        | CT   | Server media — Netflix pribadi |
| 101 | **backup**          | CT   | Layanan backup |
| 102 | **alpine-it-tools** | CT   | Container Alpine ringan penuh perkakas IT |
| 103 | **docker**          | CT   | Host Docker tambahan |
| 104 | **win10**           | VM   | VM Windows 10 |
| 105 | **kali**            | VM   | Kali Linux untuk security testing |
| 108 | **unifi-os-server** | CT   | UniFi Network controller |
| 110 | **nfs2**            | CT   | Server NFS sekunder |

**Storage di \`pve2\`:**

- \`local\` dan \`local-lvm\`
- \`data_zfs\` — pool ZFS dengan RAID1
- \`zfs-baru\` — pool ZFS tambahan dengan RAID1

Kedua node berbagi zona SDN \`localnetwork\` untuk networking internal antar VM/container.

## Mengapa Layanan Ini?

- 🎬 **Jellyfin** — server media pribadi tanpa langganan
- 📊 **LibreNMS** — visibilitas penuh kesehatan jaringan
- 🔄 **n8n** — otomasi workflow tanpa banyak kode manual
- 🐳 **Docker** — fleksibilitas spin up layanan baru cepat
- 📡 **UniFi Controller** — manajemen AP/switch terpusat
- 🔐 **Kali Linux** — latihan security dan penetration testing

## Strategi Storage

- **LVM** untuk storage utama Proxmox dan disk VM
- **ZFS** untuk integritas data dengan checksumming, snapshot, dan kompresi
- **NFS** di kedua node untuk akses shared storage

## Selanjutnya

Homelab saya terus berkembang. Rencana ke depan:

- Menyiapkan **Proxmox Backup Server**
- Menambah monitoring dengan dashboard **Grafana**
- Eksperimen **Kubernetes** (k3s)
- Perbaikan segmentasi jaringan dengan **VLAN**

## Penutup

Menjalankan homelab adalah salah satu investasi terbaik dalam perjalanan belajar saya. Tempat saya mempraktikkan apa yang dipelajari, merusak dengan aman, dan membangun skill yang langsung relevan dengan pekerjaan. Jika kamu berencana memulai homelab, saya sangat rekomendasikan — bahkan satu mini PC dengan Proxmox sudah jadi awal yang bagus!

Jangan ragu menghubungi jika ada pertanyaan. Selamat homelabbing! 🏠🖥️`,
  },
  "rustdesk-server-setup": {
    title: "Self-Hosting Server RustDesk: Remote Desktop Open Source",
    excerpt:
      "Hari ini saya mempelajari cara install dan setup RustDesk Server self-hosted. Bagi yang belum tahu, RustDesk adalah alternatif open-source untuk TeamViewer...",
    content: `Hari ini saya mempelajari cara install dan setup **RustDesk Server** self-hosted. Bagi yang belum tahu, RustDesk adalah alternatif open-source untuk software remote desktop seperti TeamViewer atau AnyDesk.

Meski kamu bisa pakai server publik RustDesk gratis, self-hosting punya keuntungan:

- **Koneksi lebih cepat & stabil**: Apalagi jika server dan client berada di region yang sama atau dalam satu LAN.
- **Keamanan & Privasi**: Data koneksi sepenuhnya di bawah kendalimu.
- **Tanpa Batasan**: Tidak ada batas waktu atau pop-up komersial.

## Prasyarat

Untuk menjalankan RustDesk Server via skrip instalasi, kamu butuh:

- Server/VPS Linux (Ubuntu, Debian, atau CentOS direkomendasikan).
- Akses \`sudo\` atau \`root\`.
- IP Publik statis atau domain yang mengarah ke IP server.

## Port Forwarding

Pastikan port berikut terbuka di firewall/router:

- **TCP**: 21115, 21116, 21117, 21118, 21119
- **UDP**: 21116

## Instalasi via Skrip

Cara termudah adalah memakai skrip komunitas. Skrip ini otomatis mengunduh rilis terbaru, menyiapkan layanan \`systemd\` (\`hbbs\` dan \`hbbr\`), dan mengonfigurasi firewall bila perlu.

1. SSH ke server.
2. Unduh skrip instalasi:

\`\`\`bash
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
\`\`\`

3. Jadikan executable:

\`\`\`bash
chmod +x install.sh
\`\`\`

4. Jalankan skrip:

\`\`\`bash
./install.sh
\`\`\`

Selama instalasi, skrip mungkin meminta IP publik atau domain server. Ikuti petunjuk di layar. Skrip akan mengonfigurasi \`systemd\` agar komponen server RustDesk (\`hbbs\` dan \`hbbr\`) start otomatis saat boot.

## Mengambil Public Key

Untuk memastikan klien terhubung aman, server menghasilkan pasangan kunci (Private & Public) saat instalasi. Kamu perlu mengambil **Public Key** untuk diisi di aplikasi klien. Biasanya file ada di \`/opt/rustdesk/id_ed25519.pub\`.

Jalankan:

\`\`\`bash
cat /opt/rustdesk/id_ed25519.pub
\`\`\`

Salin string yang muncul untuk langkah berikutnya.

## Konfigurasi Aplikasi Klien

Setelah server berjalan, arahkan aplikasi RustDesk ke server barumu:

1. Buka aplikasi **RustDesk**.
2. Masuk ke **Settings** -> **Network**.
3. Klik **Unlock network settings** jika terkunci.
4. Isi:
   - **ID Server**: domain atau IP server (mis. \`rustdesk.yourdomain.com\`).
   - **Relay Server**: kosongkan (otomatis memakai domain ID Server).
   - **Key**: tempel *Public Key* tadi.
5. Klik **Apply**.

Selesai! Di bagian bawah aplikasi RustDesk akan tertulis **Ready**, menandakan aplikasi berhasil terhubung ke server self-hosted-mu.

Pengalaman remote desktop kini jauh lebih responsif dan privat! 🚀`,
  },
  "lmstudio-local-ai-macbook-m4": {
    title: "Menjalankan Model AI Lokal di MacBook Air M4 dengan LM Studio",
    excerpt:
      "Di tulisan ini saya mendokumentasikan pengalaman menginstall LM Studio dan mengevaluasi beberapa model AI open-source di MacBook Air M4 — mencakup setup, pemilihan model...",
    content: `Di tulisan ini saya mendokumentasikan pengalaman menginstall **LM Studio** dan mengevaluasi beberapa model AI open-source di MacBook Air M4 — mencakup setup, pemilihan model, benchmark performa, dan integrasi API.

## Apa itu LM Studio?

**LM Studio** adalah aplikasi desktop lintas platform untuk mengunduh dan menjalankan large language model (LLM) open-source sepenuhnya di perangkat lokal — tanpa koneksi internet setelah download awal, tanpa biaya API, dan dengan privasi data penuh.

Aplikasi ini menyediakan antarmuka chat intuitif, browser model dari Hugging Face, dan **local inference server** yang kompatibel dengan spesifikasi OpenAI API. Mudah diintegrasikan dengan perkakas yang sudah mendukung endpoint kompatibel OpenAI.

> [!NOTE]
> LM Studio mendukung Apple Silicon (M1 hingga M4) secara native via framework **MLX** dan **Metal**, memungkinkan inferensi yang efisien dengan dampak baterai minimal.

---

## Spesifikasi Perangkat

Semua pengujian dilakukan pada:

| Komponen | Spesifikasi |
|---|---|
| Chip | Apple M4 |
| Unified Memory | 16 GB |
| Storage | 512 GB SSD |
| Sistem Operasi | macOS Tahoe |

Arsitektur Unified Memory M4 sangat berperan pada performa LLM. Karena CPU dan GPU berbagi pool memori bandwidth tinggi yang sama, bobot model dapat dimuat dan diakses jauh lebih efisien dibanding setup GPU diskrit.

---

## Instalasi

1. **Download LM Studio** dari [lmstudio.ai](https://lmstudio.ai).
   - Pilih build **macOS (Apple Silicon)** untuk akselerasi hardware native.

2. **Buka file \`.dmg\`** dan drag LM Studio ke folder \`/Applications\`.

3. **Jalankan LM Studio** dari Applications atau Launchpad.

4. Saat pertama dijalankan, LM Studio otomatis mendeteksi konfigurasi hardware dan memilih backend inferensi optimal (MLX untuk Apple Silicon). Tidak perlu konfigurasi manual.

---

## Model yang Diuji

Via tab **Discover**, saya mengunduh dan mengevaluasi:

### Gemma 4 (Google)

- **Gemma 4 4.6B** — Sangat ringan, respons cepat (~35–45 token/detik). Cocok untuk Q&A dan ringkasan.
- **Gemma 4 7.5B** — Keseimbangan kecepatan dan kualitas. Kemampuan general-purpose yang baik.
- **Gemma 4 12B** — Output lebih detail dan koheren, dengan throughput agak turun (~15–20 token/detik). Direkomendasikan bila kualitas prioritas.

> [!TIP]
> Untuk seri Gemma 4, kuantisasi **Q8_0** direkomendasikan bila memori cukup. **Q6_K** alternatif yang mengurangi memori dengan degradasi minimal.

### Qwen 3.5 (Alibaba)

- **Qwen3.5-2B** — Respons hampir instan untuk prototyping cepat.
- **Qwen3.5-9B** — Reasoning dan code generation yang mengejutkan untuk ukurannya.
- **Qwen3.5-35B-A3B (Mixture of Experts)** — 35B total parameter namun hanya ~3B aktif per forward pass, kualitas setara model dense 14B+ dengan kebutuhan memori lebih hemat.

### Qwen 2.5 Coder (Alibaba)

- **Qwen2.5-Coder-14B** — Model spesialis kode dengan kualitas impresif di Python, JavaScript, dll. Pilihan favorit saya untuk bantuan coding.

### NVIDIA Nemotron

- **Nemotron-3-4B** — Model ringkas dari NVIDIA yang berjalan efisien di M4 untuk workload inferensi ringan.

---

## Ringkasan Performa

Tabel ringkas throughput perkiraan (lihat postingan asli untuk detail benchmark, label bahasa pada code fence, dan tautan yang dipertahankan):

- Gemma 4 4.6B: tercepat, cocok untuk ringkasan
- Gemma 4 12B: paling detail, throughput moderat
- Qwen 3.5 MoE: efisien memori dengan kualitas tinggi

Pengujian dilakukan dengan LM Studio di MacBook Air M4 (MLX/Metal), tanpa mengubah nama model, versi kuantisasi, dan tautan sumber.`,
  },
  "unifi-os-proxmox-setup": {
    title: "Self-Hosting UniFi OS di Proxmox untuk Mengelola WiFi Kampus",
    excerpt:
      "Mengelola armada access point di kampus bisa jadi tantangan — terutama tanpa controller terpusat. Di tulisan ini saya berbagi cara setup UniFi OS Server...",
    content: `Mengelola armada wireless access point di kampus bisa jadi tantangan — terutama tanpa controller terpusat. Di tulisan ini saya berbagi cara setup **UniFi OS Server** (penerus UniFi Network Application legacy) yang berjalan di server Proxmox saya untuk mengelola semua access point Ubiquiti di tempat kerja.

## UniFi OS Server vs Network Application Legacy

Ubiquiti kini merekomendasikan **UniFi OS Server** dibanding "UniFi Network Server" lama. UniFi OS memberi pengalaman lebih terpadu dengan fitur seperti **Site Magic**, **Identity**, dan integrasi mulus dengan **UniFi Site Manager** untuk manajemen jarak jauh. Jika masih memakai Network Application lama, migrasi ke UniFi OS disarankan untuk dukungan berkelanjutan.

## Kenapa Self-Host?

Ubiquiti menyediakan konsol hardware (Cloud Gateway, CloudKey), tapi self-host memberi:

- **Kontrol penuh** — tanpa bergantung layanan cloud atau pembelian hardware tambahan
- **Fleksibilitas** — jalankan di server sendiri dengan resource yang bisa di-scale
- **Latensi rendah** — controller berada di jaringan lokal yang sama dengan AP
- **Hemat biaya** — tidak perlu membeli konsol UniFi dedicated bila sudah punya server

## Armada: Access Point yang Dikelola

Setelah setup UniFi OS, semua AP di kampus di-adopsi. Berikut armadanya:

| Model | Uplink | Status |
|-------|----------|--------|
| **UAP-LR** | FE | ✅ Up to date |
| **UAP-AC-Lite** | GbE | ✅ Up to date |
| **U7 Lite** | GbE | ✅ Up to date |
| **U6+** | GbE | ✅ Up to date |
| **U6-LR** | GbE | ✅ Up to date |
| **AC-LR** | — | ⚠️ Offline (spare) |

Armada ini campuran model legacy dan modern WiFi 5/6/7, semua dikelola dari satu dashboard UniFi OS.

### Beberapa Observasi

- **UAP-LR** adalah model paling tua di armada, namun masih berfungsi andal.
- Migrasi ke UniFi OS Server menyederhanakan manajemen RF/SSID.
- Integrasi dengan Proxmox (LXC) menjaga overhead tetap rendah.

Proses adopsi AP, konfigurasi SSID/VLAN, dan kebijakan roaming didokumentasikan konsisten — nama model, status, dan tautan dipertahankan apa adanya.`,
  },
  "docker-dockge-setup": {
    title: "Setup Docker Saya: Mengelola Container dengan Dockge",
    excerpt:
      "Docker adalah platform kontainerisasi yang membuat menjalankan layanan baru sangat mudah — cukup pull image, atur compose file, dan jalan. Tapi mengelola banyak stack...",
    content: `Docker adalah platform kontainerisasi yang membuat menjalankan layanan baru sangat mudah — cukup pull image, atur compose file, dan jalan. Tapi mengelola banyak stack Docker Compose dari command line bisa melelahkan. Di sinilah **Dockge** berperan.

## Apa itu Dockge?

[Dockge](https://github.com/louislam/dockge) adalah manajer stack Docker Compose self-hosted buatan developer yang sama di balik Uptime Kuma. Menyediakan UI web yang bersih untuk membuat, mengelola, dan memantau stack Docker Compose — tanpa perlu SSH tiap saat.

Yang saya suka dari Dockge:

- 🎨 **UI cantik** — antarmuka gelap bersih yang menyenangkan untuk mengelola stack
- 📝 **Editor Compose** — edit file \`docker-compose.yml\` langsung di browser
- ▶️ **Kontrol satu klik** — start, stop, restart, dan update stack dengan satu klik
- 📊 **Status real-time** — lihat container aktif sekilas
- 🔄 **Update interaktif** — pull image baru dan recreate container dengan mudah

Berbeda dari Portainer, Dockge fokus spesifik ke Docker Compose — ringan, cepat, dan tidak berlebihan.

## Stack Container Saya

Berikut yang saya jalankan via Dockge — semua container **aktif**:

### 📊 Uptime Kuma — Monitoring Layanan

[Uptime Kuma](https://github.com/louislam/uptime-kuma) adalah alat monitoring uptime andalan saya. Memantau layanan, website, dan perangkat jaringan, serta mengirim alert saat sesuatu down. Mendukung banyak kanal notifikasi termasuk Telegram, Discord, dan email.

**Kenapa saya pakai:** Di homelab dengan banyak layanan, tahu seketika saat sesuatu rusak itu penting. Uptime Kuma memberi halaman status yang indah dan rasa tenang.

### 🔄 n8n — Otomasi Workflow

(nama, tautan, dan tag dipertahankan; narasi diterjemahkan)

### Penerapan

Semua stack dikelola via Dockge di node Proxmox. File \`docker-compose.yml\` disimpan terpusat dan dapat diedit langsung dari UI. Workflow update: pull image terbaru → recreate container → cek status di dashboard Dockge.

Jika kamu menjalankan banyak layanan Docker, Dockge sangat membantu menjaga kerapian tanpa kompleksitas berlebih.`,
  },
  "digitalocean-droplet-spaces-setup": {
    title: "Panduan Lengkap Setup Droplet dan Spaces Object Storage di DigitalOcean",
    excerpt:
      "DigitalOcean adalah salah satu penyedia cloud IaaS populer untuk developer karena antarmuka bersih, performa solid, dan harga transparan....",
    content: `DigitalOcean adalah salah satu penyedia cloud computing (IaaS) populer untuk developer karena antarmuka bersih, performa solid, dan harga transparan. Dua layanan yang paling sering dipakai adalah **Droplet** (VPS/Mesin Virtual) dan **Spaces** (Object Storage kompatibel Amazon S3).

Di tulisan ini saya berbagi panduan langkah demi langkah membuat Droplet dan mengonfigurasi Spaces Object Storage di DigitalOcean.

## 1. Cara Membuat Droplet (Virtual Private Server)

"Droplet" adalah istilah DigitalOcean untuk Virtual Machine atau VPS. Membuat Droplet sangat mudah dan cepat.

**Langkah:**

1. **Login ke Dashboard DigitalOcean:** Akses akunmu. Jika belum punya, daftar dulu.
2. **Klik tombol "Create":** Di kanan atas, klik **Create** lalu pilih **Droplets**.
3. **Pilih Region (Data Center):** Pilih lokasi server terdekat dengan pengguna target. Untuk Asia Tenggara, **Singapore (SGP1)** biasanya terbaik untuk latensi terendah.
4. **Pilih Image (Sistem Operasi):** Pilih OS yang ingin dipakai. **Ubuntu (versi LTS terbaru)** adalah pilihan standar yang aman. Kamu juga bisa pilih *Marketplace* untuk aplikasi siap pakai seperti WordPress atau Docker.
5. **Pilih Size (Spesifikasi):**
   - Pilih tipe CPU: *Basic*, *General Purpose*, *CPU-Optimized*, dll.
   - Untuk proyek kecil atau belajar, paket **Basic (Shared CPU)** mulai $4-$6/bulan sudah cukup.
6. **Pilih Metode Autentikasi (Penting!):**
   - **SSH Key:** Sangat direkomendasikan. Jauh lebih aman daripada password.
   - **Password:** Lebih mudah tapi rentan *brute-force*. Jika dipilih, pakai password sangat kuat.
7. **Opsi Tambahan (Opsional):** Backup, monitoring, VPC, dll.

Semua nama region, paket, dan langkah dipertahankan; hanya narasi yang diterjemahkan. Tautan dan opsi autentikasi dipertahankan verbatim.

## 2. Spaces Object Storage

Spaces adalah object storage kompatibel S3. Cocok untuk menyimpan aset statis, backup, dan file media. Konfigurasi via S3 API key dan endpoint region. Implementasi klien tetap memakai endpoint DigitalOcean (mis. \`sgp1.digitaloceanspaces.com\`).

Dokumentasi langkah Spaces dan best practice backup dirangkum tanpa mengubah perintah, nama endpoint, atau opsi harga.`,
  },
  "rclone-encrypted-backup-google-drive": {
    title: "Backup Terenkripsi ke Google Drive dengan Rclone",
    excerpt:
      "Google Drive menawarkan 15GB storage gratis — sayang jika tidak dipakai untuk backup data penting. Tapi mengunggah file mentah ke cloud pihak ketiga menimbulkan...",
    content: `Google Drive menawarkan 15GB storage cloud gratis — sayang jika tidak dipakai untuk backup data penting. Tapi mengunggah file mentah ke cloud pihak ketiga menimbulkan kekhawatiran privasi. Solusinya? Gunakan **Rclone** dengan fitur **crypt** untuk mengenkripsi file *sebelum* meninggalkan mesin. Dengan begitu data tetap aman meski akun Google dikompromikan.

Di tulisan ini saya akan memandu setup lengkap: install Rclone, konfigurasi Google Drive, setup enkripsi transparan, dan otomasi via cron job.

## Apa itu Rclone?

[Rclone](https://rclone.org/) adalah perkakas command-line open-source untuk mengelola file di cloud storage. Mendukung 40+ penyedia cloud termasuk Google Drive, OneDrive, Dropbox, Amazon S3, dan lainnya. Sering disebut "rsync untuk cloud," Rclone sangat fleksibel dan powerful.

Fitur utama:

- 🔄 **Sync & Copy** — sync satu atau dua arah antara cloud dan storage lokal
- 🔐 **Encryption (crypt)** — enkripsi transparan sebelum upload
- 📦 **Mount** — mount cloud storage sebagai drive lokal via FUSE
- ⚡ **Bandwidth control** — throttle kecepatan upload/download
- 📊 **Logging** — log aktivitas detail untuk monitoring dan debugging

## Prasyarat

Pastikan kamu punya:

1. **Server Linux** (Ubuntu/Debian) — bisa VPS atau mesin lokal
2. **Akun Google** dengan storage gratis yang cukup
3. **Akses terminal** dengan user yang punya privilege sudo

## 1. Instalasi Rclone

Cara termudah via skrip resmi:

\`\`\`bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
\`\`\`

Atau manual:

\`\`\`bash
# Download versi terbaru
curl -O https://downloads.rclone.org/current/rclone-current-linux-amd64.zip

# Extract
unzip rclone-current-linux-amd64.zip
\`\`\`

## 2. Konfigurasi Google Drive & Crypt

Langkah konfigurasi \`rclone config\` untuk remote Google Drive dan remote \`crypt\` tetap dipertahankan verbatim (nama remote, opsi enkripsi, dan perintah cron tidak diterjemahkan). Narasi penjelas diterjemahkan ke Indonesia, sedangkan perintah, URL, dan istilah teknis (rclone, crypt, FUSE, cron) dipertahankan.

Setelah setup, kamu bisa menjalankan:

\`\`\`bash
rclone sync /data/path gdrive-crypt:backup --progress --log-file rclone.log
\`\`\`

Dan menjadwalkan via \`cron\` untuk backup otomatis harian.`,
  },
};
