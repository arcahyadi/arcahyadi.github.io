// src/i18n/content.id.ts — Indonesian overrides for public content
// Truth: slugs, dates, tags, links, code fences, image paths remain invariant (en). Only
// user-visible prose (title, excerpt, content, cv fields) is translated. Technical terms
// (MikroTik, RouterOS, WireGuard, Proxmox, etc.) and facts are preserved verbatim.

import type { blogs } from "@/content/blogs";
import type { portfolio } from "@/content/portfolio";

export type BlogSlug = (typeof blogs)[number]["slug"];
export type PortfolioSlug = (typeof portfolio)[number]["slug"];

export type LocalizedContent = { title: string; excerpt: string; content: string };

// Portfolio overrides: keyed by slug, only translated fields
export const portfolioIdBySlug = {
  "institution-campus-network-upgrade": {
    title: "Institution — Upgrade Sistem Jaringan Kampus",
    excerpt:
      "Upgrade menyeluruh infrastruktur jaringan kampus — core router, WiFi, VLAN dan monitoring untuk 500+ pengguna",
    content: `Upgrade menyeluruh dan modernisasi sistem jaringan kampus di **Institution** — melayani 500+ mahasiswa, dosen, dan tenaga kependidikan.

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

Pekerjaan ini melengkapi pengembangan [example.org](https://example.org) dan didokumentasikan lebih detail di blog saya:
- [Konfigurasi MikroTik CCR1016 Kampus](/blogs/mikrotik-ccr-campus-config/)
- [Self-Hosting UniFi OS di Proxmox](/blogs/unifi-os-proxmox-setup/)

[🌐 Website Kampus](https://example.org)`,
  },
  "institution-ac-id-updates": {
    title: "Institution — Update Platform Web",
    excerpt:
      "Pembaruan besar untuk example.org — modul magang PWP, modernisasi Admin, dan peningkatan situs publik",
    content: `Pengembangan berkelanjutan untuk platform resmi kampus **[example.org](https://example.org)** — sebagai Programmer & SysAdmin di Institution.

**Yang saya rilis:**
- **Modul PWP (Praktik Kerja Lapangan)** — manajemen magang end-to-end: penempatan, assignment pembimbing, penilaian, dan rekap PDF dengan import CSV massal
- **Modernisasi Admin** — menyatukan panel Admin ke tema MonsterAdmin yang konsisten untuk UI yang lebih bersih dan mudah dipelihara
- **Operasional & Keamanan** — menambahkan maintenance mode dan memperbaiki alur reset password pengguna
- **Website Publik** — penyegaran footer, navigasi, dan tautan penting untuk usability yang lebih baik

[🌐 Kunjungi Website](https://example.org)`,
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
} as const satisfies Record<PortfolioSlug, LocalizedContent>;

// Blogs overrides: keyed by slug, only translated fields
// Preserve: slug, date, tags, code fences, links, markdown structure, technical terminology
export const blogsIdBySlug = {
  "mikrotik-ccr-campus-config": {
    title: "Failover multi-WAN dan link aggregation di RouterOS",
    excerpt:
      "Catatan konfigurasi RouterOS untuk failover multi-WAN, link aggregation, akses manajemen, dan backup terjadwal.",
    content: `Contoh ini membahas failover antarpenyedia internet dan penggabungan link internal dengan RouterOS. Alamat yang digunakan adalah alamat dokumentasi; ganti sesuai rencana pengalamatan jaringanmu.

## Desain

Tentukan gangguan yang perlu diantisipasi:

- Koneksi tetap berjalan saat salah satu penyedia internet terputus
- Link ke switch distribusi tetap aktif saat salah satu kabel dilepas
- Akses manajemen yang tetap bekerja saat LAN salah konfigurasi
- Backup konfigurasi berjalan sesuai jadwal

## Uplink dan failover

Beri setiap penyedia DHCP client sendiri, lalu tambahkan default route dengan health check gateway. Saat gateway berhenti menjawab, RouterOS menghapus rute itu dan trafik pindah ke penyedia yang tersisa.

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

Rentang \`192.0.2.0/24\` dikhususkan untuk contoh dalam dokumentasi.

## Bonding

Untuk link ke switch distribusi, LACP menyediakan agregasi bandwidth dan redundansi. Mode di kedua ujung harus sesuai. Konfigurasikan port switch sebelum mengaktifkan bond.

\`\`\`routeros
/interface bonding
add mode=802.3ad name=bond-distribution slaves=ether-5,ether6,ether7
\`\`\`

Jika switch tidak mendukung LACP, active-backup adalah pilihan yang lebih aman: ia failover tanpa konfigurasi di sisi switch.

## Firewall dan akses manajemen

Manajemen tidak boleh terjangkau dari setiap subnet. Batasi WinBox dan SSH ke VLAN manajemen dan subnet VPN, lalu nonaktifkan layanan yang tidak dipakai.

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

Siapkan jalur masuk kedua, seperti console serial atau prosedur fisik yang terdokumentasi, sebelum memperketat akses manajemen.

## Backup dan monitoring

Jadwalkan ekspor konfigurasi ke penyimpanan di luar perangkat agar salinannya tetap tersedia jika router rusak.

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

Pantau counter interface dan kondisi perangkat melalui SNMP dari host monitoring di VLAN manajemen. Atur alert untuk perubahan status link dan packet loss selain pemeriksaan ping.

## Yang harus diverifikasi sebelum cutover

1. Uji failover dengan menonaktifkan tiap uplink bergantian dan amati rute aktif
2. Pastikan bond membawa trafik saat satu kabel anggota dilepas
3. Cek akses manajemen tetap bekerja dari VPN saat default route LAN rusak
4. Pulihkan ekspor konfigurasi di perangkat cadangan dan pastikan ia boot
5. Tulis langkah rollback dan simpan konfigurasi sebelumnya`,
  },
  "my-proxmox-homelab-setup": {
    title: "Proxmox VE skala kecil: storage, snapshot, dan pemulihan",
    excerpt:
      "Pilihan storage, batas penggunaan snapshot, jadwal backup, dan pengujian pemulihan untuk Proxmox VE skala kecil.",
    content: `Rencanakan tata letak storage dan tujuan backup sebelum membuat VM atau container di Proxmox VE. Uji pemulihannya sebelum mengandalkan backup tersebut.

## Node dan storage

Satu node adalah titik awal yang sah. Dua node memberi jendela maintenance tanpa pemadaman total, tetapi bukan cluster dengan quorum: dengan dua suara, kehilangan satu node menghentikan operasi cluster. Jika butuh high availability sungguhan, rencanakan tiga node atau terima pemulihan manual.

ZFS adalah default yang baik untuk storage lokal karena checksum menangkap korupsi senyap dan snapshot murah. Trade-off-nya memori: rencanakan sekitar satu GB RAM per TB storage, ditambah ruang untuk layanan itu sendiri.

| Storage | Penggunaan | Trade-off |
|---|---|---|
| ZFS mirror | Disk VM, container | Setengah kapasitas mentah, bertahan satu disk |
| ZFS single disk | Scratch, image ISO | Tanpa redundansi, rebuild berarti restore |
| Share NFS | Template, backup | Bergantung pada jaringan dan NAS |

Simpan backup terpisah untuk setiap VM yang berada di satu disk.

## Snapshot bukan backup

Snapshot berada di pool yang sama dengan data, sehingga tidak melindungi data jika pool tersebut hilang. Gunakan snapshot sebelum perubahan dan simpan backup secara terpisah.

Contoh jadwal backup:

- Backup malam untuk setiap VM dan container ke host atau NAS terpisah
- Salinan backup mingguan ke storage off-site, terenkripsi
- Uji restore acak satu guest setiap bulan
- Catatan tertulis tentang apa yang dipulihkan dan berapa lama

\`\`\`bash
# Manual backup of one guest to a mounted backup target
vzdump 101 --storage backup-nfs --mode snapshot --compress zstd

# List what is available before restoring
pvesm list backup-nfs
\`\`\`

Uji restore ke VMID cadangan sebelum menimpa guest yang sudah ada.

## Jaringan

Pisahkan trafik manajemen, storage dan guest ke bridge atau VLAN berbeda bila memungkinkan. Jaringan storage yang jenuh tidak boleh membuat interface manajemen tidak terjangkau saat insiden.

Untuk service discovery internal, gunakan zona SDN sederhana atau bridge khusus. Hindari merutekan trafik guest melalui satu VM kecuali VM tersebut dipantau dan dapat dijalankan ulang.

## Monitoring dan akses

Pantau kondisi disk, penggunaan pool, status job backup, dan suhu selain penggunaan CPU.

- Pemeriksaan SMART di setiap disk fisik
- Kesehatan pool ZFS dan hasil scrub
- Keberhasilan job backup dan waktu backup terakhir yang berhasil
- Status UPS jika ada

Akses harus dibatasi ke jaringan manajemen dan VPN. Pakai akun per pengguna dengan autentikasi dua faktor bila platform mendukung, dan simpan salinan offline kunci pemulihan.

## Checklist pemulihan

1. Boot node dan pastikan pool berhasil diimpor tanpa error
2. Cek konfigurasi bridge jaringan sesuai dokumentasi
3. Pulihkan satu guest dan pastikan dapat berjalan serta melayani trafik
4. Pastikan monitoring dan backup berjalan lagi
5. Catat apa yang gagal, apa yang dipulihkan, dan apa yang berubah`,
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
    title: "Menjalankan LLM lokal dengan LM Studio",
    excerpt:
      "Jalankan model lokal dengan LM Studio, aktifkan server kompatibel OpenAI, lalu hubungkan client Python.",
    content: `LM Studio menjalankan model bahasa secara lokal dan menyediakan antarmuka chat serta server yang kompatibel dengan OpenAI API.

## Yang disediakan

- Browser model yang mengunduh dari Hugging Face
- Antarmuka chat untuk evaluasi cepat
- Server lokal yang kompatibel dengan OpenAI API
- Akselerasi Apple Silicon lewat MLX dan Metal

Memori yang tersedia membatasi ukuran model dan panjang konteks. Sisakan memori untuk sistem operasi dan aplikasi lain.

## Ukuran model dan kuantisasi

Kuantisasi mengurangi penggunaan memori dengan mengurangi presisi. Coba model 4-bit atau 6-bit, lalu periksa hasilnya pada tugas yang ingin dikerjakan.

## Pasang dan jalankan

1. Pasang build Apple Silicon dari situs resmi
2. Unduh model dan catat kuantisasinya
3. Buka tab Developer dan jalankan server lokal
4. Arahkan client ke endpoint lokal

\`\`\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:1234/v1", api_key="local")

response = client.chat.completions.create(
    model="local-model",
    messages=[{"role": "user", "content": "Summarize this changelog in three bullets."}],
)

print(response.choices[0].message.content)
\`\`\`

API key adalah placeholder yang diterima server lokal; itu bukan secret. Jangan ekspos port server di luar localhost kecuali kamu menambahkan autentikasi di depannya.

## Kapan model lokal cocok

- Menyusun dan meringkas dokumen yang harus tetap di lokasi
- Klasifikasi dan ekstraksi dalam pipeline otomasi
- Asisten coding di mesin tanpa internet andal
- Prototyping sebelum membayar model hosted

Uji tugas berkonteks panjang dan pemrosesan batch pada perangkat yang akan digunakan. Verifikasi hasilnya sebelum dipakai untuk keputusan yang berisiko jika salah.

## Catatan operasional

- Tetapkan versi model dan catat kuantisasi untuk setiap hasil
- Evaluasi dengan contohmu sendiri, bukan hanya benchmark publik
- Jangan catat prompt atau output yang berisi data sensitif
- Pantau penggunaan memori dan swapping saat mengukur performa
- Siapkan jalur fallback saat server model tidak tersedia`,
  },
  "unifi-os-proxmox-setup": {
    title: "Menjalankan UniFi OS Server di Proxmox",
    excerpt:
      "Jalankan UniFi OS Server dalam VM Linux di Proxmox, menggunakan installer resmi, alamat manajemen tetap dan backup di luar VM.",
    content: `UniFi OS Server menggantikan Network Application lama dan dapat berjalan dalam VM Linux di Proxmox. Ia menyediakan manajemen terpusat untuk access point, switch dan gateway independen yang kompatibel.

## Sebelum memasang

UniFi OS membutuhkan Podman dan slirp4netns. Periksa distribusi host, kernel, dan versi dependensi yang didukung sebelum instalasi.

- Distribusi Linux dan versi dependensi yang didukung installer terkini
- IP statis di VM, di luar pool DHCP
- DNS dan NTP bekerja dari dalam VM
- Target backup di luar VM

## Kebutuhan resource

Gunakan rekomendasi hardware dalam panduan resmi sesuai jumlah perangkat dan client. Perhitungkan retensi statistik dan pantau penggunaan disk setelah deployment.

## Pasang dalam VM

Gunakan VM Linux di Proxmox dan ikuti [panduan instalasi resmi UniFi OS Server](https://help.ui.com/hc/en-us/articles/34210126298775-Self-Hosting-UniFi). Setup khusus container tidak dibahas di sini.

1. Pasang dependensi yang tercantum di panduan resmi, termasuk Podman dan slirp4netns
2. Unduh installer sesuai arsitektur dari halaman Ubiquiti Downloads yang ditautkan dalam panduan tersebut
3. Jadikan file unduhan executable lalu jalankan file itu dengan sudo, menggunakan nama file sebenarnya
4. Selesaikan setup admin awal dan simpan output installer untuk troubleshooting

Periksa persyaratan distribusi dan dependensi terkini sebelum memilih image VM. UniFi OS Server membutuhkan layanan host; container Docker atau Podman mandiri bukan pengganti installer.

## Tata letak jaringan

Beri controller alamat statis dan tempatkan di VLAN manajemen bersama perangkat yang dikelolanya. Access point memerlukan alamat controller yang tetap agar dapat terhubung kembali setelah listrik padam.

- VLAN manajemen untuk controller dan interface manajemen perangkat
- SSID tamu dan staf di VLAN terpisah dengan kebijakan firewall di antaranya
- Reservasi DHCP untuk access point, switch dan controller
- Alamat fallback terdokumentasi jika VLAN manajemen salah konfigurasi

Jangan mengelola controller melalui link yang sedang kamu ubah. Siapkan jalur console atau interface jaringan kedua.

## Backup dan upgrade

Aktifkan backup otomatis dan simpan salinan di luar VM. Pastikan konfigurasi controller bisa dipulihkan sebelum mengandalkan backup tersebut.

Upgrade di jendela maintenance, simpan snapshot VM sebelumnya, dan pastikan perangkat terhubung kembali sebelum menghapus snapshot. Baca release notes untuk jalur upgrade yang didukung; melewati versi mayor bisa meninggalkan controller dalam kondisi yang butuh instalasi ulang.

## Monitoring

Pantau CPU dan memori VM, penggunaan disk database statistik, dan status adopsi perangkat. Controller yang hidup tetapi tidak bisa mencapai access point terlihat sehat pada pengecekan ping dasar.

## Checklist

1. Alamat statis terdokumentasi dan direservasi
2. Hasil backup otomatis sudah diuji pemulihannya
3. Akses manajemen dibatasi ke VLAN manajemen dan VPN
4. Kebijakan update firmware disepakati sebelum rollout
5. Jalur akses fallback ditulis`,
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

[n8n](https://n8n.io/) adalah platform otomasi workflow yang powerful — anggap saja sebagai alternatif self-hosted untuk Zapier atau Make. Saya pakai untuk mengotomasi tugas berulang dan menghubungkan layanan yang berbeda.

**Kenapa saya pakai:** Otomasi adalah salah satu passion saya. n8n memungkinkan saya membangun workflow kompleks secara visual, menghubungkan API, database, dan layanan tanpa menulis boilerplate code untuk setiap integrasi.

### 🌐 OpenSpeedTest — Uji Kecepatan Jaringan

[OpenSpeedTest](https://github.com/openspeedtest/Docker-Image) adalah server uji kecepatan self-hosted. Memungkinkan saya menguji kecepatan jaringan antar perangkat dan server tanpa bergantung layanan eksternal seperti Speedtest.net.

**Kenapa saya pakai:** Saat troubleshooting masalah jaringan di kampus, memiliki server uji kecepatan lokal memberikan hasil yang akurat tanpa variabel internet yang memengaruhi tes. Juga bagus untuk memverifikasi bahwa upgrade jaringan benar-benar meningkatkan throughput.

### 📈 SpeedTrack — Riwayat Uji Kecepatan

[SpeedTrack](https://github.com/alexjustesen/speedtest-tracker) bekerja bersama OpenSpeedTest untuk **melacak dan mencatat hasil uji kecepatan dari waktu ke waktu**. Alih-alih menjalankan tes dan melupakan angkanya, SpeedTrack menyimpan rekam historis sehingga saya bisa melihat tren dan degradasi.

**Kenapa saya pakai:** Mampu melihat kembali performa jaringan selama berminggu-minggu atau berbulan-bulan membantu saya mengidentifikasi pola — seperti apakah kecepatan turun di jam tertentu atau setelah perubahan konfigurasi.

### 🧰 OmniTools — Toolbox Utilitas Lengkap

[OmniTools](https://github.com/iib0011/omni-tools) adalah koleksi self-hosted dari berbagai utilitas dan perkakas IT yang dapat diakses dari browser web. Menggabungkan perkakas praktis seperti encoder/decoder, formatter, converter, dan utilitas jaringan ke dalam satu antarmuka.

**Kenapa saya pakai:** Alih-alih mencari perkakas online acak setiap kali perlu encode string Base64 atau format JSON, saya punya semuanya di satu tempat di server sendiri — cepat, privat, dan selalu tersedia.

### 📄 BentoPDF — Generasi PDF

[BentoPDF](https://github.com/nicholasgasior/bento-pdf) adalah toolkit PDF yang mengutamakan privasi, berjalan sisi klien untuk memanipulasi, menggabungkan, memisahkan, dan memproses file PDF — semuanya berjalan lokal di browser via WebAssembly.

**Kenapa saya pakai:** Berguna untuk mengotomasi workflow dokumen dan mengkonversi file tanpa mengunggahnya ke layanan pihak ketiga. Menjaga semuanya privat dan on-premise.

### 🎵 Yubal — Pengunduh YouTube Music

[Yubal](https://github.com/guillevc/yubal) adalah pengunduh YouTube Music self-hosted. Tempel tautan, dan ia mengunduh trek dengan tag yang tepat dan mengorganisirnya ke library secara otomatis.

Fitur utama:

- **Scheduled sync** — otomatis mengunduh rilis baru dari artis favoritmu
- **Smart deduplication** — tidak ada file duplikat yang mengacaukan library
- **Media server ready** — output terorganisir yang bekerja sempurna dengan Jellyfin, Plex, atau Navidrome
- **Browser extension** — unduh langsung dari YouTube Music dengan satu klik

**Kenapa saya pakai:** Dikombinasikan dengan Jellyfin di node Proxmox saya, Yubal memberi saya setup streaming musik self-hosted yang lengkap. Saya tempel tautan, Yubal mengunduh dan memberi tag, dan ia muncul di media server — tidak perlu langganan.

## Kenapa Dockge Dibanding Portainer?

Saya pernah memakai Portainer sebelumnya, dan meski powerful, rasanya berlebihan untuk use case saya. Inilah kenapa saya memilih Dockge:

| Feature | Dockge | Portainer |
|---------|--------|-----------|
| **Focus** | Docker Compose only | Full Docker management |
| **Complexity** | Simple and lightweight | Feature-rich but heavier |
| **Compose editing** | Native YAML editor | Limited compose support |
| **Resource usage** | Minimal | Higher |
| **Learning curve** | Almost none | Moderate |

Dockge melakukan satu hal dan melakukannya dengan baik — mengelola stack Docker Compose dengan antarmuka yang indah. Untuk homelab saya, itulah yang tepat dibutuhkan.

## Tips Memulai dengan Dockge

Jika kamu ingin mencoba Dockge sendiri, berikut beberapa tips:

1. **Install Dockge sendiri via Docker** — hanya satu file compose untuk memulai
2. **Organisir stack-mu** — beri setiap stack nama yang jelas dan deskriptif
3. **Gunakan environment variables** — simpan data sensitif seperti password dan API key di file \`.env\`
4. **Set restart policies** — gunakan \`restart: unless-stopped\` agar container bertahan setelah reboot
5. **Jaga file compose tetap bersih** — Dockge menyimpan semua file compose di direktori terpusat, membuat backup jadi mudah

## Penutup

Docker + Dockge telah menjadi game-changer untuk homelab saya. Kombinasi fleksibilitas Docker dengan antarmuka manajemen Dockge yang bersih berarti saya menghabiskan lebih sedikit waktu untuk perawatan dan lebih banyak waktu benar-benar memakai layanan saya.

Apakah kamu baru memulai dengan Docker atau mencari cara yang lebih baik untuk mengelola stack yang sudah ada, saya sangat merekomendasikan untuk mencoba Dockge. Ringan, intuitif, dan membuat self-hosting jauh lebih menyenangkan. 🐳`,
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
7. **Pilih Opsi Tambahan (Opsional):** Kamu bisa centang *Enable Backups*, *Monitoring*, atau *IPv6* sesuai kebutuhan.
8. **Pilih Hostname:** Masukkan \`Hostname\` yang dikenali untuk Droplet-mu (mis. \`web-server-01\`).
9. **Klik "Create Droplet":** Tunggu sekitar semenit, dan Public IP Droplet-mu akan muncul. Kamu kini bisa login via SSH!

---

## 2. Cara Membuat Spaces Object Storage

Spaces adalah layanan *Object Storage* yang sempurna untuk menyimpan aset statis seperti gambar, video, file backup, atau file website statis. Spaces sangat terjangkau (mulai $5/bulan untuk 250GB) dan menyertakan *Content Delivery Network* (CDN) bawaan.

**Langkah:**

1. **Klik tombol "Create":** Di kanan atas dashboard, klik **Create**, lalu pilih **Spaces**.
2. **Pilih Region:** Sekali lagi, pilih lokasi terdekat dengan pengguna (mis. **Singapore**). Sangat direkomendasikan untuk memilih region yang sama dengan Droplet-mu jika keduanya akan saling berkomunikasi, memastikan kecepatan transfer yang lebih cepat.
3. **Konfigurasi CDN (Content Delivery Network):**
   - Secara default, CDN diaktifkan. Ini bagus untuk mempercepat waktu loading aset bagi pengunjung dari negara berbeda.
   - Kamu juga bisa menambahkan **Custom Subdomain** (mis. \`cdn.yourdomain.com\`) jika kamu mengelola DNS di DigitalOcean.
4. **Pilih Nama Space (Bucket):**
   - Nama ini harus unik secara global karena akan menjadi bagian dari URL (mis. \`my-awesome-assets\`).
5. **Pilih Project:** Tetapkan Space ini ke project yang sesuai.
6. **Klik "Create a Space":** Space-mu akan langsung dibuat dan siap digunakan.

---

## 3. Menghasilkan Access Key untuk Spaces (Penting)

Karena Spaces kompatibel dengan Amazon S3 API, kamu bisa memakai berbagai perkakas S3 (seperti S3cmd, rclone, atau AWS SDK) untuk mengelolanya. Untuk itu, kamu butuh **Access Key** dan **Secret Key**.

1. Di menu sebelah kiri, klik bagian **API**.
2. Pilih tab **Spaces Keys**.
3. Klik tombol **Generate New Key**.
4. Beri nama deskriptif pada key (mis. \`App Backup Key\`).
5. Dua kode akan muncul: **Key** dan **Secret**.
   > [!WARNING]
   > Segera salin dan simpan **Secret Key** di lokasi yang aman! Kode ini hanya ditampilkan sekali. Jika hilang, kamu harus membuat pasangan key baru.

## Kesimpulan

DigitalOcean membuat provisioning infrastruktur cloud menjadi sangat sederhana. Dengan Droplet, kamu punya kontrol penuh atas server (VPS), dan dengan Spaces, kamu bisa menyimpan ribuan file statis dengan harga yang sangat terjangkau tanpa menghabiskan disk utama Droplet.

Mengkombinasikan kedua layanan ini memberikan fondasi yang kokoh untuk deploy aplikasi web modern! 🚀`,
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
\`\`\`

## 2. Konfigurasi Google Drive Remote

Jalankan wizard konfigurasi interaktif:

\`\`\`bash
rclone config
\`\`\`

Ikuti langkah berikut:

\`\`\`
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
   \\ (drive)
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
   \\ (drive)
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
\`\`\`

### Autentikasi di Server Headless

Jika kamu mengkonfigurasi Rclone di server tanpa browser (headless), pilih \`n\` pada prompt di atas. Rclone kemudian akan menampilkan perintah yang perlu kamu jalankan di mesin lokal yang memiliki browser:

\`\`\`
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.

For more help and alternate methods see: https://rclone.org/remote_setup/

Execute the following on the machine with the web browser (same rclone
version recommended):

\trclone authorize "drive" "eyJ...token..."

Then paste the result.
config_token>
\`\`\`

Berikut cara menyelesaikan prosesnya:

1. **Di mesin lokal** (dengan browser), install Rclone juga
2. Jalankan perintah \`rclone authorize\` yang ditampilkan di output
3. Jendela browser akan terbuka — login ke akun Google-mu dan beri izin
4. Salin token yang muncul di terminal lokal-mu
5. Tempel token tersebut kembali ke prompt server

Setelah autentikasi berhasil:

\`\`\`
Configure this as a Shared Drive (Team Drive)?
y) Yes
n) No (default)
y/n> n

Keep this "gdrive" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
\`\`\`

Verifikasi koneksi:

\`\`\`bash
rclone lsd gdrive:
\`\`\`

Ini akan menampilkan daftar folder di Google Drive-mu.

## 3. Setup Enkripsi (Crypt Remote)

Ini adalah bagian paling penting — kita akan membuat remote baru yang secara transparan mengenkripsi semua file sebelum diunggah ke Google Drive.

Jalankan wizard config lagi:

\`\`\`bash
rclone config
\`\`\`

\`\`\`
n) New remote
n/s/q> n

Enter name for new remote.
name> gdrive-crypt

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
...
14 / Encrypt/Decrypt a remote
   \\ (crypt)
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
   \\ (standard)
 2 / Very simple filename obfuscation.
   \\ (obfuscate)
 3 / Don't encrypt the file names.
   \\ (off)
filename_encryption> standard

Option directory_name_encryption.
Option to either encrypt directory names or leave them intact.
Choose a number from below, or type in your own value.
 1 / Encrypt directory names.
   \\ (true)
 2 / Don't encrypt directory names, leave them intact.
   \\ (false)
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
\`\`\`

> [!CAUTION]
> **Simpan kedua password di tempat yang sangat aman!** Jika kamu kehilangan password tersebut, file terenkripsi **tidak dapat didekripsi** dan data akan hilang selamanya. Saya merekomendasikan memakai password manager seperti Bitwarden atau KeePassXC.

Setelah setup selesai:

\`\`\`
Keep this "gdrive-crypt" remote?
y) Yes this is OK (default)
y/e/d> y
\`\`\`

### Cara Kerja Enkripsi Rclone

Berikut alur data melalui remote crypt:

\`\`\`
Local Files ──► Rclone Crypt (encrypt) ──► Google Drive
                                           (encrypted files)

Google Drive ──► Rclone Crypt (decrypt) ──► Local Files
(encrypted files)                          (original files)
\`\`\`

- **Nama file** dienkripsi dan tidak terbaca di Google Drive
- **Isi file** dienkripsi memakai NaCl SecretBox (XSalsa20 + Poly1305)
- **Struktur direktori** juga terenkripsi (jika \`directory_name_encryption\` diaktifkan)

## 4. Menggunakan Rclone untuk Backup

### Mengunggah (Backup) File

Untuk mengunggah file ke Google Drive dengan enkripsi:

\`\`\`bash
# Copy files/folders to cloud (automatically encrypted)
rclone copy /path/to/local/data gdrive-crypt: --progress

# Example: back up /home/user/documents
rclone copy /home/user/documents gdrive-crypt:documents --progress
\`\`\`

### Sync (One-Way Mirror)

Sync membuat remote menjadi mirror persis dari direktori lokal — file yang dihapus secara lokal juga akan dihapus di remote:

\`\`\`bash
rclone sync /path/to/local/data gdrive-crypt: --progress
\`\`\`

> [!WARNING]
> Hati-hati dengan \`sync\`! File yang ada di remote tapi tidak ada secara lokal akan **dihapus**. Gunakan \`copy\` jika kamu hanya ingin menambah file baru tanpa menghapus yang lama.

### Mengunduh (Restore) File

Untuk memulihkan file dari backup:

\`\`\`bash
# Download all files (automatically decrypted)
rclone copy gdrive-crypt: /path/to/restore/ --progress

# Download a specific folder
rclone copy gdrive-crypt:documents /home/user/restore/documents --progress
\`\`\`

### Melihat File Terenkripsi vs. Terdekripsi

\`\`\`bash
# View files on Google Drive (encrypted names)
rclone ls gdrive:backup-encrypted

# Example output:
# 2948723 v05u42a5fkh5b2s0r91cbo4im0/7gdcp5...

# View files through the crypt remote (decrypted names)
rclone ls gdrive-crypt:

# Example output:
# 2948723 documents/important-notes.txt
\`\`\`

## 5. Mengotomasi Backup dengan Cron

Untuk menjalankan backup otomatis, kita bisa memakai skrip shell sederhana yang dikombinasikan dengan cron job.

### Membuat Skrip Backup

\`\`\`bash
sudo nano /usr/local/bin/backup-gdrive.sh
\`\`\`

Isi skrip:

\`\`\`bash
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
for DIR in "\${BACKUP_DIRS[@]}"; do
    if [ -d "$DIR" ]; then
        DEST_NAME=$(basename "$DIR")
        log "Backing up: $DIR -> $RCLONE_REMOTE:$DEST_NAME"

        rclone copy "$DIR" "$RCLONE_REMOTE:$DEST_NAME" \\
            --log-file="$LOG_FILE" \\
            --log-level INFO \\
            --transfers 4 \\
            --checkers 8 \\
            --contimeout 60s \\
            --timeout 300s \\
            --retries 3 \\
            --low-level-retries 10 \\
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
\`\`\`

Jadikan executable:

\`\`\`bash
sudo chmod +x /usr/local/bin/backup-gdrive.sh
\`\`\`

### Setup Cron Job

Buka editor crontab:

\`\`\`bash
crontab -e
\`\`\`

Tambahkan jadwal backup (contoh: setiap hari jam 2 pagi):

\`\`\`cron
# Encrypted backup to Google Drive every day at 02:00
0 2 * * * /usr/local/bin/backup-gdrive.sh
\`\`\`

Contoh jadwal lain:

\`\`\`cron
# Every 6 hours
0 */6 * * * /usr/local/bin/backup-gdrive.sh

# Every Sunday at 3 AM
0 3 * * 0 /usr/local/bin/backup-gdrive.sh

# First day of every month at 1 AM
0 1 1 * * /usr/local/bin/backup-gdrive.sh
\`\`\`

## 6. Tips dan Best Practice

### Batasi Bandwidth

Jika server-mu memiliki bandwidth terbatas, throttle kecepatan upload:

\`\`\`bash
# Limit upload to 5 Mbps
rclone copy /data gdrive-crypt: --bwlimit 5M
\`\`\`

### Abaikan File yang Tidak Perlu

Lewati file yang tidak perlu di-backup:

\`\`\`bash
rclone copy /data gdrive-crypt: \\
    --exclude "*.tmp" \\
    --exclude "*.log" \\
    --exclude "node_modules/**" \\
    --exclude ".cache/**"
\`\`\`

### Dry Run (Simulasi)

Selalu simulasikan sebelum menjalankan sync untuk melihat apa yang akan berubah:

\`\`\`bash
rclone sync /data gdrive-crypt: --dry-run --progress
\`\`\`

### Verifikasi Integritas File

Pastikan file yang diunggah tidak korup:

\`\`\`bash
rclone check /path/to/local/data gdrive-crypt: --one-way
\`\`\`

### Backup Konfigurasi Rclone Sendiri

Jangan lupa backup file config Rclone itu sendiri:

\`\`\`bash
# Default config location
cat ~/.config/rclone/rclone.conf

# Back up to a safe location (e.g., an encrypted USB drive)
cp ~/.config/rclone/rclone.conf /media/usb-drive/rclone-config-backup.conf
\`\`\`

> [!IMPORTANT]
> File \`rclone.conf\` berisi password enkripsi-mu (meski sudah di-obfuscate). Pastikan file ini disimpan dengan aman dan jangan pernah di-commit ke repository publik!

## Kesimpulan

Dengan kombinasi **Rclone + Google Drive + Crypt**, kamu mendapatkan solusi backup cloud yang:

- ✅ **Gratis** — memanfaatkan 15GB storage gratis Google Drive
- ✅ **Aman** — file dienkripsi end-to-end sebelum meninggalkan server
- ✅ **Otomatis** — cron job menjalankan backup tanpa intervensi manual
- ✅ **Terverifikasi** — integritas file dapat diperiksa kapan saja

Google tidak dapat membaca file-mu karena semuanya terenkripsi sebelum diunggah. Bahkan jika seseorang mendapatkan akses ke akun Google-mu, mereka hanya akan melihat file dengan nama acak dan isi yang tidak terbaca.

Selamat membackup — dan ingat: **backup yang belum pernah di-test restore bukanlah backup yang nyata!** 🔐`,
  },
} as const satisfies Record<BlogSlug, LocalizedContent>;
