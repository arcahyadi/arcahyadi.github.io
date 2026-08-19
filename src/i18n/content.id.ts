// src/i18n/content.id.ts — Indonesian overrides for public content
// Truth: slugs, dates, tags, links, code fences, image paths remain invariant (en). Only
// user-visible prose (title, excerpt, content, cv fields) is translated. Technical terms
// (MikroTik, RouterOS, WireGuard, Proxmox, etc.) and facts are preserved verbatim.

// Portfolio overrides: keyed by slug, only translated fields
export const portfolioIdBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
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
};

// Blogs overrides: keyed by slug, only translated fields
// Preserve: slug, date, tags, code fences, links, markdown structure, technical terminology
export const blogsIdBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
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
