// src/i18n/content.id.ts — Indonesian overrides for public content
// Truth: slugs, dates, tags, links, code fences, image paths remain invariant (en). Only
// user-visible prose (title, excerpt, content) is translated. Technical terms and facts are
// preserved verbatim. Run npm run validate:parity after edits.

import type { blogs } from "@/content/blogs";
import type { portfolio } from "@/content/portfolio";

export type BlogSlug = (typeof blogs)[number]["slug"];
export type PortfolioSlug = (typeof portfolio)[number]["slug"];

export type LocalizedContent = {
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
};

// Portfolio overrides: keyed by slug, only translated fields
export const portfolioIdBySlug = {
  "multi-site-network-modernization": {
    title: "Modernisasi jaringan kampus 500 pengguna",
    excerpt:
      "Peningkatan jaringan kampus meliputi routing multi-WAN, segmentasi VLAN, wireless terkelola dan monitoring untuk 500+ pengguna.",
    content: `**Lingkup.** Peningkatan dan modernisasi jaringan kampus yang melayani 500+ mahasiswa, dosen dan staf. Nama institusi dan pengenal instalasi tidak ditampilkan.

**Pekerjaan yang diselesaikan.**
- Mengonfigurasi failover multi-WAN dan distribusi beban di MikroTik RouterOS dengan health check gateway
- Mengonfigurasi link aggregation LACP untuk distribusi wireless
- Mendesain ulang firewall, NAT, segmentasi VLAN dan QoS
- Memigrasikan controller wireless ke UniFi OS Server self-hosted di Proxmox dengan kebijakan RF dan SSID terpusat
- Men-deploy LibreNMS dan Uptime Kuma untuk monitoring dan alerting
- Mendokumentasikan topologi, rencana alamat dan prosedur operasional

**Catatan teknis.** Setup routing dan controller dibahas di [panduan RouterOS](/blogs/mikrotik-multi-wan-bonding/) dan [panduan UniFi](/blogs/unifi-os-on-proxmox/).`,
  },
  "internship-management-platform": {
    title: "Modul manajemen magang",
    excerpt:
      "Modul magang untuk penempatan, assignment pembimbing, penilaian, rekap PDF dan impor massal CSV.",
    content: `**Lingkup.** Pengembangan modul manajemen magang dalam platform web institusi. Nama institusi dan alamat aplikasi tidak ditampilkan.

**Pekerjaan yang diselesaikan.**
- Penempatan magang dan assignment pembimbing
- Penilaian dan rekap PDF
- Impor massal CSV

**Pekerjaan platform terkait.** Memodernisasi panel admin, menambahkan maintenance mode, memperbaiki alur reset password, serta memperbarui navigasi publik dan tautan footer.`,
  },
  "monitoring-and-config-backup": {
    title: "Monitoring dan backup konfigurasi perangkat jaringan",
    excerpt:
      "LibreNMS dan Uptime Kuma untuk visibilitas, plus ekspor konfigurasi terjadwal ke storage di luar perangkat, agar perangkat gagal cukup dipulihkan bukan dibangun ulang.",
    content: `**Lingkup.** Pekerjaan monitoring dan backup dalam peningkatan jaringan kampus, bukan proyek klien terpisah.

**Pekerjaan yang diselesaikan.**
- LibreNMS dan Uptime Kuma untuk monitoring dan alerting real-time
- Backup biner dan ekspor konfigurasi teks terjadwal dari core router ke storage di luar perangkat melalui SFTP
- Dokumentasi topologi, rencana alamat dan prosedur operasional

**Catatan teknis.** [Panduan RouterOS](/blogs/mikrotik-multi-wan-bonding/) menjelaskan pendekatan backup dengan alamat dokumentasi sebagai pengganti detail instalasi.`,
  },
  "cisco-ccna-introduction-to-networks": {
    title: "CCNA: Introduction to Networks",
    excerpt: "Sertifikat Cisco Networking Academy tentang pengalamatan IP, Ethernet dan konfigurasi dasar router serta switch.",
    content: `Sertifikat kelulusan kursus **CCNA: Introduction to Networks** dalam program Cisco Networking Academy.

Kursus ini mencakup arsitektur dan model jaringan, pengalamatan IP, konsep dan media Ethernet, serta konfigurasi dasar untuk membangun LAN kecil. Ini fondasi bagi sisa jalur CCNA.`,
  },
  "cisco-ccna-switching-and-wireless": {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    excerpt: "Sertifikat Cisco Networking Academy tentang switching, konfigurasi WLAN dan dasar keamanan LAN.",
    content: `Sertifikat kelulusan kursus **CCNA: Switching, Routing, and Wireless Essentials** dalam program Cisco Networking Academy.

Kursus ini mencakup teknologi switching, operasi router pada jaringan kecil hingga menengah, konfigurasi WLAN dan dasar keamanan LAN. Pekerjaan lab adalah tempat materi menempel: VLAN, trunking dan konfigurasi wireless gagal dengan cara yang tidak bisa ditunjukkan slide.`,
  },
  "cisco-ccna-enterprise-networking": {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    excerpt: "Sertifikat Cisco Networking Academy tentang routing enterprise, WAN, QoS dan konsep otomasi jaringan.",
    content: `Sertifikat kelulusan kursus **CCNA: Enterprise Networking, Security, and Automation** dalam program Cisco Networking Academy.

Kursus ini mencakup desain jaringan enterprise, teknologi WAN, QoS, akses remote yang aman, serta konsep otomasi dan virtualisasi yang dipakai untuk mengoperasikan jaringan dalam skala besar.`,
  },
} as const satisfies Record<PortfolioSlug, LocalizedContent>;

// Blogs overrides: keyed by slug, only translated fields
// Preserve: slug, date, tags, code fences, links, markdown structure, technical terminology
export const blogsIdBySlug = {
  "rustdesk-server-setup": {
    title: "Self-hosting server RustDesk",
    excerpt: "Pasang layanan sinyal dan relay RustDesk di Linux, atur firewall, lalu hubungkan client menggunakan public key server.",
    content: `RustDesk adalah aplikasi remote desktop open-source. Server self-hosted memungkinkan layanan sinyal dan relay dikelola sendiri, bukan memakai server publik. Panduan ini menggunakan nama contoh, bukan detail instalasi.

## Prasyarat

- Server Linux atau VM yang didukung metode instalasi pilihanmu
- Akses administratif melalui sudo atau root
- Alamat publik statis atau domain yang mengarah ke server untuk akses dari luar jaringan

[Panduan instalasi resmi](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) membahas Docker, skrip instalasi komunitas dan paket Debian. Metode skrip di bawah menyiapkan layanan native.

## Firewall dan port forwarding

Izinkan port TCP 21115, 21116 dan 21117, serta port UDP 21116, di firewall host dan perangkat NAT di depannya.

Port 21118 dan 21119 melayani web client. Biarkan tertutup bila tidak digunakan. Jika digunakan, ikuti panduan reverse proxy resmi dan batasi port ini untuk proxy, bukan mengeksposnya langsung.

## Pasang dengan skrip komunitas

Skrip Techahold mengunduh layanan sinyal dan relay, lalu mengaturnya agar dijalankan saat startup oleh systemd. Unduh dan periksa skrip sebelum menjalankannya dengan hak administratif.

1. Hubungkan ke server melalui SSH
2. Unduh skrip

\`\`\`bash
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
\`\`\`

3. Periksa isinya, lalu jadikan executable

\`\`\`bash
chmod +x install.sh
\`\`\`

4. Jalankan dan ikuti prompt untuk alamat server

\`\`\`bash
./install.sh
\`\`\`

Simpan alamat server dan public key yang ditampilkan di akhir. Pastikan kedua layanan berjalan setelah reboot dan periksa perubahan firewall yang dibuat installer.

## Ambil public key

File key berada di direktori instalasi. Dengan skrip ini, public key biasanya tersedia di path berikut; periksa output installer bila berbeda.

\`\`\`bash
cat /opt/rustdesk/id_ed25519.pub
\`\`\`

Salin hanya public key ke pengaturan client. Simpan private key di server dan sertakan dalam backup yang terlindungi.

## Konfigurasi client

1. Buka RustDesk dan masuk ke Settings, lalu Network
2. Buka kunci pengaturan jaringan bila diperlukan
3. Isi ID Server dengan alamat servermu, seperti \`rustdesk.example.com\`
4. Tempel public key ke Key; kosongkan Relay Server kecuali deployment memakai relay terpisah
5. Terapkan pengaturan dan pastikan client menampilkan Ready

Uji koneksi dari luar jaringan lokal server serta dari dalamnya. Koneksi LAN yang berhasil saja belum memverifikasi firewall publik dan port forwarding.`,
  },
  "digitalocean-droplet-spaces-setup": {
    title: "Menyiapkan DigitalOcean Droplets dan Spaces",
    excerpt: "Buat server virtual Linux, atur object storage kompatibel S3, dan berikan access key Spaces khusus untuk aplikasi.",
    content: `DigitalOcean Droplets adalah server virtual. Spaces menyediakan object storage kompatibel S3 untuk aset dan backup. Panduan ini membahas penyiapan keduanya melalui control panel, tanpa memublikasikan detail akun atau kredensial.

## Buat Droplet

1. Masuk ke control panel DigitalOcean dan pilih Create, lalu Droplets
2. Pilih region dekat pengguna aplikasi dan layanan yang dibutuhkannya
3. Pilih image Linux yang didukung, seperti rilis Ubuntu LTS terkini
4. Pilih paket sesuai workload dan periksa harga terkini sebelum membuatnya
5. Tambahkan SSH public key untuk login; simpan private key di mesinmu sendiri
6. Pilih opsi backup, monitoring dan IPv6 sesuai kebutuhan deployment
7. Beri hostname yang jelas, tinjau konfigurasi dan buat Droplet

Setelah alamat publik tersedia, hubungkan melalui SSH. Verifikasi akses administratif sebelum membatasi firewall, dan buka hanya port yang dibutuhkan aplikasi.

## Buat bucket Spaces

1. Buka Spaces Object Storage di control panel dan buat bucket
2. Pilih region; region yang sama dengan Droplet dapat menyederhanakan akses aplikasi
3. Pilih nama bucket unik dan tentukan proyek
4. Tinjau izin daftar file dan akses objek sebelum mengunggah data
5. Aktifkan CDN bila bucket akan melayani aset publik; CDN bukan pengganti kontrol akses

Jangan publikasikan file backup atau unggahan pribadi sebagai aset publik. Gunakan bucket terpisah atau aturan akses eksplisit bila audiens datanya berbeda.

## Buat access key aplikasi

Ikuti [dokumentasi access key Spaces](https://docs.digitalocean.com/products/spaces/how-to/manage-access/) untuk langkah control panel dan batas izin terkini.

1. Buka Spaces Object Storage, lalu Access Keys, dan pilih Create Access Key
2. Pilih akses terbatas ke bucket dan operasi yang dibutuhkan bila kompatibel dengan kebijakan bucket
3. Beri nama key yang menunjukkan aplikasi pemakainya
4. Buat key dan simpan secret dengan aman; secret hanya ditampilkan sekali
5. Konfigurasikan aplikasi atau client kompatibel S3 dengan endpoint bucket dan kredensial

Jangan masukkan secret ke source control, bundle browser atau screenshot. Gunakan key khusus per aplikasi agar rotasi tidak mengganggu workload lain.

## Verifikasi sebelum dipakai

- Unggah file uji yang tidak sensitif melalui kredensial aplikasi
- Baca kembali dan pastikan akses sesuai harapan
- Pastikan request tanpa autentikasi tidak dapat mengambil objek privat
- Pastikan key tidak dapat mengakses bucket di luar lingkup izinnya

Droplet menjalankan aplikasi; Spaces menyimpan objek secara terpisah dari disk server. Keduanya bukan pengganti proses backup dan pemulihan yang sudah diuji.`,
  },
  "mikrotik-multi-wan-bonding": {
    title: "Failover multi-WAN dan link aggregation di RouterOS",
    excerpt:
      "Satu uplink adalah titik kegagalan tunggal yang paling umum di jaringan kecil. Berikut tata letak RouterOS untuk failover penyedia, link distribusi ter-bonding dan akses manajemen yang tidak bergantung pada kesehatan LAN.",
    content: `Satu uplink adalah titik kegagalan tunggal yang paling umum di jaringan kecil. RouterOS bisa failover antar penyedia dan menggabungkan link internal tanpa hardware tambahan. Contoh di bawah memakai alamat dokumentasi; ganti dengan rencanamu sendiri.

## Desain

Mulai dari apa yang harus dipertahankan jaringan:

- Kehilangan satu penyedia tanpa intervensi manual
- Switch distribusi yang bisa kehilangan satu kabel tanpa kehilangan link
- Akses manajemen yang tetap bekerja saat LAN salah konfigurasi
- Backup konfigurasi yang tidak bergantung pada ingatan seseorang

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

Rentang dokumentasi seperti \`192.0.2.0/24\` disediakan untuk contoh, sehingga konfigurasi aman dibagikan dalam tulisan.

## Bonding

Untuk link ke switch distribusi, LACP memberi throughput lebih besar sekaligus redundansi. Kedua ujung harus sepakat soal mode, dan port switch harus dikonfigurasi sebelum bond diaktifkan.

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

Jadwalkan ekspor konfigurasi dan simpan di luar perangkat. Backup yang hanya ada di router hilang tepat saat dibutuhkan.

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

Ekspor SNMP ke host monitoring di VLAN manajemen untuk counter interface dan kesehatan. Beri alert pada link state dan packet loss, bukan hanya ping.

## Yang harus diverifikasi sebelum cutover

1. Uji failover dengan menonaktifkan tiap uplink bergantian dan amati rute aktif
2. Pastikan bond membawa trafik saat satu kabel anggota dilepas
3. Cek akses manajemen tetap bekerja dari VPN saat default route LAN rusak
4. Pulihkan ekspor konfigurasi di perangkat cadangan dan pastikan ia boot
5. Tulis langkah rollback dan simpan konfigurasi sebelumnya

Tujuannya bukan konfigurasi yang pintar. Tujuannya jaringan yang mode kegagalannya sudah diketahui sebelum terjadi.`,
  },
  "proxmox-ve-storage-and-backups": {
    title: "Proxmox VE untuk produksi kecil: storage, snapshot dan pemulihan",
    excerpt:
      "Virtualisasi mudah dimulai dan sulit dipulihkan. Berikut tata letak praktis Proxmox VE skala kecil: pilihan storage, batas snapshot, backup dan pemeriksaan yang penting setelah kegagalan.",
    content: `Virtualisasi mudah dimulai dan sulit dipulihkan. Deployment Proxmox VE kecil tidak butuh cluster, tetapi butuh storage yang bertahan saat disk gagal dan backup yang sudah pernah dipulihkan setidaknya sekali.

## Node dan storage

Satu node adalah titik awal yang sah. Dua node memberi jendela maintenance tanpa pemadaman total, tetapi bukan cluster dengan quorum: dengan dua suara, kehilangan satu node menghentikan operasi cluster. Jika butuh high availability sungguhan, rencanakan tiga node atau terima pemulihan manual.

ZFS adalah default yang baik untuk storage lokal karena checksum menangkap korupsi senyap dan snapshot murah. Trade-off-nya memori: rencanakan sekitar satu GB RAM per TB storage, ditambah ruang untuk layanan itu sendiri.

| Storage | Penggunaan | Trade-off |
|---|---|---|
| ZFS mirror | Disk VM, container | Setengah kapasitas mentah, bertahan satu disk |
| ZFS single disk | Scratch, image ISO | Tanpa redundansi, rebuild berarti restore |
| Share NFS | Template, backup | Bergantung pada jaringan dan NAS |

Jangan menaruh satu-satunya salinan VM di satu disk lalu menyebutnya storage. Perlakukan itu sebagai cache.

## Snapshot bukan backup

Snapshot tinggal di pool yang sama dengan data. Cepat, berguna sebelum upgrade, dan tidak berguna jika pool hilang. Simpan snapshot untuk jam atau hari, dan simpan backup di tempat lain.

Skema sederhana yang bekerja:

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

Uji jalur restore di VMID cadangan dulu. Memulihkan di atas guest yang berjalan adalah waktu yang salah untuk menemukan backup tidak lengkap.

## Jaringan

Pisahkan trafik manajemen, storage dan guest ke bridge atau VLAN berbeda bila memungkinkan. Jaringan storage yang jenuh tidak boleh membuat interface manajemen tidak terjangkau saat insiden.

Untuk penemuan layanan internal, zona SDN sederhana atau bridge khusus sudah cukup. Hindari merutekan trafik guest melalui satu VM kecuali VM itu dimonitor dan bisa di-restart.

## Monitoring dan akses

Pantau hal yang gagal lebih dulu: kesehatan disk, penggunaan pool, status job backup dan suhu. Dashboard yang hanya menampilkan CPU adalah hiasan.

- Pemeriksaan SMART di setiap disk fisik
- Kesehatan pool ZFS dan hasil scrub
- Keberhasilan job backup dan usia backup baik terakhir
- Status UPS jika ada

Akses harus dibatasi ke jaringan manajemen dan VPN. Pakai akun per pengguna dengan autentikasi dua faktor bila platform mendukung, dan simpan salinan offline kunci pemulihan.

## Checklist pemulihan

1. Boot node dan pastikan pool terimpor bersih
2. Cek konfigurasi bridge jaringan sesuai dokumentasi
3. Pulihkan satu guest dan pastikan ia start serta melayani trafik
4. Pastikan monitoring dan backup berjalan lagi
5. Catat apa yang gagal, apa yang dipulihkan, dan apa yang berubah

Homelab dan deployment produksi memakai tools yang sama. Bedanya adalah apakah langkah pemulihan sudah ada sebelum insiden.`,
  },
  "unifi-os-on-proxmox": {
    title: "Menjalankan UniFi OS Server di Proxmox",
    excerpt:
      "Jalankan UniFi OS Server dalam VM Linux di Proxmox, menggunakan installer resmi, alamat manajemen tetap dan backup di luar VM.",
    content: `UniFi OS Server menggantikan Network Application lama dan dapat berjalan dalam VM Linux di Proxmox. Ia menyediakan manajemen terpusat untuk access point, switch dan gateway independen yang kompatibel.

## Sebelum memasang

UniFi OS bergantung pada Podman dan slirp4netns. Periksa distribusi dan kernel host lebih dulu; base image yang tidak didukung biasanya gagal saat instalasi dengan pesan yang tidak menyebut penyebab sebenarnya.

- Distribusi Linux dan versi dependensi yang didukung installer terkini
- IP statis di VM, di luar pool DHCP
- DNS dan NTP bekerja dari dalam VM
- Target backup di luar VM

## Ukuran

Gunakan rekomendasi hardware dalam panduan resmi sesuai jumlah perangkat dan client. Perhitungkan retensi statistik dan pantau penggunaan disk setelah deployment.

Disk tumbuh mengikuti statistik yang disimpan. Beri lebih dari minimum dan pantau.

## Pasang dalam VM

Gunakan VM Linux di Proxmox dan ikuti [panduan instalasi resmi UniFi OS Server](https://help.ui.com/hc/en-us/articles/34210126298775-Self-Hosting-UniFi). Setup khusus container tidak dibahas di sini.

1. Pasang dependensi yang tercantum di panduan resmi, termasuk Podman dan slirp4netns
2. Unduh installer sesuai arsitektur dari halaman Ubiquiti Downloads yang ditautkan dalam panduan tersebut
3. Jadikan file unduhan executable lalu jalankan file itu dengan sudo, menggunakan nama file sebenarnya
4. Selesaikan setup admin awal dan simpan output installer untuk troubleshooting

Periksa persyaratan distribusi dan dependensi terkini sebelum memilih image VM. UniFi OS Server membutuhkan layanan host; container Docker atau Podman mandiri bukan pengganti installer.

## Tata letak jaringan

Beri controller alamat statis dan tempatkan di VLAN manajemen bersama perangkat yang dikelolanya. Access point butuh alamat stabil untuk menemukan controller setelah peristiwa daya.

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
2. Backup otomatis diverifikasi dengan memulihkan satu
3. Akses manajemen dibatasi ke VLAN manajemen dan VPN
4. Kebijakan update firmware disepakati sebelum rollout
5. Jalur akses fallback ditulis

Controller adalah infrastruktur. Perlakukan dengan aturan backup dan akses yang sama seperti jaringan lainnya.`,
  },
  "docker-dockge-setup": {
    title: "Mengelola stack Docker Compose dengan Dockge",
    excerpt:
      "Dockge adalah manajer stack Compose yang fokus: edit, start, stop dan update stack dari browser. Berikut cara menjalankannya dengan aman dan kebiasaan yang menjaga host Docker kecil tetap terawat.",
    content: `Dockge adalah manajer stack Compose yang fokus: edit, start, stop dan update stack dari browser. Cocok ketika host menjalankan beberapa proyek Compose dan kamu ingin mengurangi SSH, bukan platform orkestrasi penuh.

## Yang dikerjakannya dengan baik

- Satu direktori per stack, berisi file compose dan file environment bersama
- Editor browser dengan validasi sebelum stack dibuat ulang
- Aksi start, stop, restart dan update per stack
- Update image interaktif dengan diff perubahan yang terlihat

Ia tidak menggantikan orkestrasi container. Jika butuh penjadwalan, service discovery atau jaringan multi-host, pakai platform yang memang dibangun untuk itu.

## Instalasi

Dockge berjalan sebagai container dan butuh akses ke Docker socket plus direktori yang menyimpan stack. Buat keduanya eksplisit.

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

Me-mount Docker socket memberi container kendali atas host. Taruh Dockge di belakang reverse proxy dengan autentikasi dan jangan ekspos langsung ke internet.

## Tata letak stack

Tata letak direktori yang konsisten membuat backup dan pemulihan sederhana:

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

Simpan secret di file environment, bukan di file compose, dan pastikan direktori stack masuk backup host. File compose tanpa volume datanya bukan backup.

## Kebiasaan update

- Pin tag image mayor dan baca release notes sebelum lompat versi
- Update satu stack setiap kali dan cek log setelahnya
- Simpan file compose sebelumnya di version control
- Ambil backup volume sebelum upgrade database
- Jadwalkan update di jendela waktu saat kamu bisa merespons

## Perbandingan dengan Portainer

| Fitur | Dockge | Portainer |
|---|---|---|
| Fokus | Stack Compose | Manajemen Docker dan cluster penuh |
| Kompleksitas | Rendah | Lebih tinggi |
| Edit Compose | Native, per stack | Didukung, kurang terpusat |
| Penggunaan resource | Kecil | Lebih besar |
| Kurva belajar | Pendek | Moderat |

## Checklist operasional

1. Autentikasi di depan UI
2. Stack dan data masuk backup
3. Restart policy di setiap service
4. Rotasi log dikonfigurasi di host
5. Cara terdokumentasi untuk start stack tanpa UI
6. Monitoring container berhenti dan health check gagal

Dockge mempercepat pekerjaan stack rutin. Aturan backup dan akses tetap tanggung jawabmu.`,
  },
  "rclone-encrypted-backup-google-drive": {
    title: "Backup off-site terenkripsi dengan Rclone",
    excerpt:
      "Rclone bisa mengenkripsi file sebelum meninggalkan host, sehingga penyedia storage hanya melihat nama dan data buram. Berikut setup lengkap: remote, lapisan crypt, skrip, jadwal dan uji restore.",
    content: `Rclone bisa mengenkripsi file sebelum meninggalkan host, sehingga penyedia storage hanya melihat nama dan data buram. Itu membuat object storage biasa layak untuk backup tanpa mempercayakan isinya ke penyedia.

## Bagaimana lapisannya bekerja

Ada dua remote: remote storage dan remote crypt di atasnya. Baca dan tulis melewati remote crypt; penyedia menyimpan objek terenkripsi.

- Nama dienkripsi dengan mode filename standar
- Isi dienkripsi dengan NaCl SecretBox
- Password kedua opsional untuk salt
- Password crypt tidak disimpan di penyedia remote

Kehilangan password crypt berarti data hilang. Simpan di password manager dan di salinan offline.

## Instalasi

\`\`\`bash
curl https://rclone.org/install.sh | sudo bash
rclone version
\`\`\`

Di host headless, konfigurasikan remote storage di mesin dengan browser lalu salin token yang dihasilkan, atau pakai service account bila penyedia mendukung.

## Konfigurasi remote crypt

\`\`\`bash
rclone config
\`\`\`

Buat remote storage dulu, lalu buat remote kedua bertipe crypt yang menunjuk path di dalamnya. Pilih enkripsi nama file dan aktifkan enkripsi nama direktori jika nama folder sensitif.

\`\`\`text
name> backup-crypt
storage> crypt
remote> storage:backups/encrypted
filename_encryption> standard
directory_name_encryption> true
\`\`\`

Verifikasi remote bekerja sebelum menjadwalkan apa pun:

\`\`\`bash
rclone lsd backup-crypt:
rclone copy /etc/hostname backup-crypt:test/ --progress
rclone ls backup-crypt:test/
\`\`\`

## Skrip backup

Jaga skrip tetap kecil dan biarkan gagal dengan jelas. Job backup yang menyembunyikan error lebih buruk daripada tanpa job, karena menciptakan keyakinan palsu.

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

Jadwalkan dengan systemd timer atau cron, dan beri alert saat exit code bukan nol. Simpan status run terakhir di tempat yang benar-benar kamu lihat.

## Uji restore

Backup yang belum pernah dipulihkan adalah hipotesis. Sebulan sekali, pulihkan sampel ke direktori sementara dan bandingkan checksum.

\`\`\`bash
mkdir -p /tmp/restore-test
rclone copy backup-crypt:host-a /tmp/restore-test --progress
diff -r /srv/data /tmp/restore-test
\`\`\`

Catat tanggal, jumlah file dan hasilnya. Jika restore lebih lama dari target pemulihanmu, targetnya salah atau backupnya.

## Praktik yang mencegah kejutan

- Kecualikan cache dan file sementara, bukan direktori data
- Pakai \`copy\` secara default; \`sync\` menghapus file yang tidak ada di sumber
- Simpan password crypt dan konfigurasi remote secara terpisah
- Uji restore di mesin berbeda, bukan mesin yang membuat backup
- Pantau usia backup, bukan hanya keberhasilan job

Enkripsi melindungi data saat istirahat. Ia tidak menggantikan kontrol akses pada akun storage, jadi pakai key khusus dengan izin paling sempit yang masih memungkinkan job berjalan.`,
  },
  "lmstudio-local-llm": {
    title: "Menjalankan LLM lokal dengan LM Studio",
    excerpt:
      "LM Studio menjalankan model terbuka di laptop dan menyediakan server kompatibel OpenAI. Berikut ekspektasi ukuran model, kuantisasi dan throughput di Apple Silicon, serta cara integrasi tanpa mengirim data keluar.",
    content: `LM Studio menjalankan model terbuka di laptop dan menyediakan server kompatibel OpenAI. Untuk pekerjaan yang tidak boleh keluar dari jaringan, kombinasi itu sering cukup: tanpa API key, tanpa data keluar, dan biaya yang bisa diprediksi.

## Yang disediakan

- Browser model yang mengunduh dari Hugging Face
- Antarmuka chat untuk evaluasi cepat
- Server lokal yang kompatibel dengan OpenAI API
- Akselerasi Apple Silicon lewat MLX dan Metal

Trade-off-nya skala. Laptop menjalankan model yang muat di unified memory, artinya model lebih kecil dan konteks lebih pendek dibanding layanan hosted.

## Mesin referensi

Angka di bawah berasal dari mesin referensi, bukan server:

| Komponen | Spesifikasi |
|---|---|
| Chip | Apple M4 |
| Unified memory | 16 GB |
| Storage | 512 GB SSD |

Memori adalah batasannya. Model plus konteksnya harus muat bersama sistem operasi dan aplikasi yang benar-benar kamu pakai.

## Ukuran model dan kuantisasi

Kuantisasi menukar kualitas dengan memori. Untuk sebagian besar evaluasi, model terkuantisasi 4-bit atau 6-bit adalah titik awal yang tepat; naik hanya saat tugas membutuhkannya.

| Ukuran model | Kuantisasi | Kecepatan perkiraan |
|---|---|---|
| 2B | Q8_0 | 60+ token per detik |
| 7B | Q8_0 | 25 hingga 30 token per detik |
| 9B | Q8_0 | 20 hingga 25 token per detik |
| 12B | Q8_0 | 15 hingga 20 token per detik |

Ini angka penggunaan interaktif dengan konteks pendek. Prompt panjang dan jendela konteks besar menurunkan throughput, kadang hingga setengah.

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

Mereka kurang cocok untuk penalaran konteks panjang, job batch throughput tinggi, atau apa pun yang jawaban salahnya mahal dan tidak terverifikasi.

## Catatan operasional

- Pin versi model dan catat kuantisasi untuk setiap hasil
- Evaluasi dengan contohmu sendiri, bukan hanya benchmark publik
- Jaga prompt dan output keluar dari log jika berisi data sensitif
- Pantau tekanan memori; swapping menghancurkan throughput
- Siapkan jalur fallback saat server model tidak tersedia

Inferensi lokal adalah keputusan privasi dan biaya lebih dulu, keputusan performa kedua. Sesuaikan ukuran model dengan mesin, dan workflow dengan model.
`,
  },
} as const satisfies Record<BlogSlug, LocalizedContent>;
