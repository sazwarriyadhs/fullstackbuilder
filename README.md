# DesignSync Canvas

DesignSync Canvas adalah platform desain visual inovatif yang dirancang untuk mempercepat proses pembuatan antarmuka pengguna (UI). Dengan fokus pada kolaborasi dan kemudahan penggunaan, platform ini memungkinkan desainer dan pengembang untuk bekerja sama secara efisien, mengubah ide menjadi prototipe fungsional dalam waktu singkat.

## Fitur Utama

- **Galeri Template:** Mulailah proyek Anda dengan beragam template desain open-source yang dapat disesuaikan.
- **Visual Builder:** Rancang dan susun komponen UI secara visual menggunakan antarmuka seret dan lepas yang intuitif.
- **Ekspor Desain:** Simpan desain Anda sebagai file JSON untuk portabilitas dan kontrol versi yang mudah, atau unduh sebagai proyek Next.js yang lengkap.
- **Skema Desain:** Lihat skema kode atau database dari desain Anda untuk integrasi yang mulus.
- **Konektor Database:** Hubungkan desain Anda ke database lokal atau online.
- **Tingkat Keanggotaan:** Pilih dari berbagai tingkatan keanggotaan untuk membuka fitur-fitur canggih seperti koneksi database online dan unduhan desain.

## Tumpukan Teknologi

- **Next.js:** Framework React untuk aplikasi web modern yang cepat dan SEO-friendly.
- **React:** Pustaka JavaScript untuk membangun antarmuka pengguna yang interaktif.
- **TypeScript:** Menambahkan tipe statis ke JavaScript untuk meningkatkan kualitas dan keandalan kode.
- **Tailwind CSS:** Framework CSS utility-first untuk desain yang cepat dan dapat disesuaikan.
- **ShadCN UI:** Kumpulan komponen UI yang dapat digunakan kembali dan dapat diakses.
- **Dnd Kit:** Pustaka seret dan lepas yang ringan dan dapat diperluas untuk React.
- **Genkit (untuk AI):** Toolkit untuk membangun fitur-fitur bertenaga AI.
- **Firebase:** Platform untuk otentikasi pengguna dan layanan backend lainnya.

## Memulai

Untuk memulai proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Instal dependensi:**
    ```bash
    npm install
    ```

2.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

    Buka [http://localhost:9002](http://localhost:9002) di browser Anda untuk melihat hasilnya.

3.  **Mulai Genkit (opsional, untuk fitur AI):**
    ```bash
    npm run genkit:dev
    ```

## Struktur Proyek

- `src/app/`: Halaman dan rute utama aplikasi menggunakan App Router Next.js.
- `src/components/`: Komponen React yang digunakan di seluruh aplikasi.
  - `src/components/builder/`: Komponen khusus untuk fungsionalitas visual builder.
  - `src/components/ui/`: Komponen UI dari ShadCN.
- `src/ai/`: Fitur-fitur bertenaga AI yang dibangun dengan Genkit.
- `src/lib/`: Utilitas dan konfigurasi (misalnya, koneksi Firebase).
- `src/data/`: File data statis seperti daftar template.
- `public/`: Aset statis seperti gambar dan ikon.

## Kontribusi

Kami menyambut kontribusi dari komunitas! Silakan buka *issue* atau *pull request* di repositori GitHub kami.
