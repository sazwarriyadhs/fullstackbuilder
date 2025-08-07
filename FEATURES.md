# Daftar Fitur: DesignSync Canvas

Berikut adalah rincian fitur yang direncanakan dan diimplementasikan untuk aplikasi DesignSync Canvas.

## Fitur Inti

### 1. Galeri Template
- **Deskripsi:** Menyediakan koleksi template desain open-source yang dapat dipilih pengguna sebagai titik awal untuk proyek mereka.
- **Status:** Tuntas.
- **Detail:**
    - Pengguna dapat menelusuri galeri template.
    - Setiap template memiliki pratinjau gambar, judul, dan deskripsi.
    - Pengguna dapat memilih template untuk mulai membangun di Visual Builder.
    - Judul dan deskripsi template dapat diedit.

### 2. Visual Builder
- **Deskripsi:** Antarmuka seret dan lepas (drag-and-drop) di mana pengguna dapat secara visual merancang dan menyusun komponen UI.
- **Status:** Tuntas.
- **Detail:**
    - Kanvas untuk menempatkan dan mengatur komponen.
    - Palet alat dengan berbagai komponen UI (misalnya, Tombol, Input, Kartu).
    - Kemampuan untuk memilih, memindahkan, dan menyusun ulang komponen di kanvas.
    - Panel properti untuk menyesuaikan atribut komponen yang dipilih (misalnya, teks, warna, ukuran).
    - Fungsionalitas Undo/Redo untuk mengelola riwayat perubahan.

### 3. Ekspor Desain
- **Deskripsi:** Memungkinkan pengguna untuk menyimpan desain mereka sebagai file JSON atau mengunduhnya sebagai proyek yang dapat dijalankan.
- **Status:** Tuntas.
- **Detail:**
    - Ekspor konfigurasi komponen ke file `components.json`.
    - Unduh seluruh desain sebagai file ZIP yang berisi proyek Next.js lengkap dengan halaman dan komponen yang dihasilkan.
    - Impor (Unggah) desain dari file ZIP yang sebelumnya diekspor.

### 4. Skema Desain
- **Deskripsi:** Memungkinkan pengguna untuk melihat skema kode atau database yang terkait dengan desain mereka.
- **Status:** Tuntas.
- **Detail:**
    - Tab "Schema" di panel properti.
    - Menampilkan contoh skema database dalam format JSON.
    - (Cakupan di Masa Depan) Secara dinamis menghasilkan skema berdasarkan komponen pada kanvas.

### 5. Otentikasi Pengguna
- **Deskripsi:** Memungkinkan pengguna untuk mendaftar dan masuk ke aplikasi untuk mengelola pekerjaan mereka.
- **Status:** Tuntas.
- **Detail:**
    - Pendaftaran menggunakan email/kata sandi dan nama.
    - Login menggunakan email/kata sandi.
    - Login/Pendaftaran menggunakan penyedia layanan pihak ketiga (Google).
    - Pengguna yang sudah login dapat mengakses fitur-fitur yang dilindungi.
    - Menu navigasi pengguna untuk melihat profil dan opsi logout.

## Fitur Premium (Terkait Keanggotaan)

### 6. Konektor Database
- **Deskripsi:** Memungkinkan pengguna untuk menghubungkan desain mereka ke database lokal atau online.
- **Status:** Tuntas (UI).
- **Detail:**
    - Halaman pengaturan untuk mengonfigurasi koneksi database.
    - Opsi untuk memilih antara koneksi lokal (default) dan online.
    - Saat "Online" dipilih, kolom untuk string koneksi, nama pengguna, dan kata sandi akan muncul.
    - Fungsionalitas backend untuk koneksi online akan memerlukan langganan berbayar.

### 7. Keanggotaan dan Harga
- **Deskripsi:** Menyediakan tingkatan keanggotaan yang berbeda dengan fitur yang bervariasi.
- **Status:** Tuntas (UI).
- **Detail:**
    - Halaman harga yang menampilkan tingkatan "Free", "Pro", dan "Enterprise".
    - Tingkat "Pro" dapat dibeli melalui dialog pembayaran.
    - Proses pembayaran (simulasi) menggunakan kode QR untuk berbagai e-wallet.
    - Konfirmasi pembayaran menampilkan notifikasi toast.
    - Fitur premium seperti koneksi database online dan unduhan desain akan terkait dengan tingkatan ini.

## Peningkatan Gaya dan Pengalaman Pengguna (UX)

- **Skema Warna:** Menggunakan warna nila tua sebagai warna utama, nila sangat terang sebagai latar belakang, dan magenta cerah sebagai aksen.
- **Tipografi:** Menggunakan font 'Inter' untuk tampilan yang bersih dan modern.
- **Ikonografi:** Menggunakan ikon garis minimalis dari `lucide-react`.
- **Tata Letak:** Tata letak berbasis grid yang bersih dengan banyak ruang putih untuk keterbacaan.
- **Desain Responsif:** Aplikasi dirancang agar dapat digunakan di berbagai ukuran layar.
- **Pemberitahuan Toast:** Digunakan untuk memberikan umpan balik kepada pengguna untuk tindakan seperti menyimpan pengaturan, login yang gagal, dan pembayaran yang berhasil.
