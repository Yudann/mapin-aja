#  MapinAja — Platform Direktori UMKM Berbasis Lokasi

**MapinAja** adalah platform direktori UMKM berbasis lokasi yang dirancang untuk membantu pengguna menemukan UMKM terdekat dengan pengalaman pencarian yang **modern, cepat, dan mudah**.

Platform ini dibangun untuk membantu UMKM meningkatkan visibilitas, serta mempermudah pelanggan menemukan bisnis lokal di sekitar mereka.

---

## 1.  Tujuan & Gambaran Umum

MapinAja bertujuan untuk menjadi jembatan antara pelanggan dan UMKM melalui teknologi berbasis lokasi, antarmuka yang intuitif, serta fitur-fitur yang mempermudah proses pencarian, komunikasi, hingga interaksi bisnis.

Website ini dirancang dengan fokus pada:

* **Pengalaman pengguna** yang sederhana namun modern.
* **Informasi UMKM** yang lengkap dan mudah dipahami.
* **Navigasi berbasis lokasi**.
* **Desain** yang konsisten, *mobile-first*, dan *kompetisi-ready*.

---

## 2.  Fitur Utama (Core Features)

Project ini berfokus pada fitur utama eksplorasi UMKM, yang seluruhnya dapat diakses melalui halaman `/umkm` dan turunannya.

### Fitur untuk Pengguna

1.  **Pencarian UMKM**
    * Cari UMKM berdasarkan lokasi, nama, kata kunci, atau kategori.
    * Input pencarian tersedia di *hero section* & *top bar* UMKM page.
2.  **Quick Filter & Smart Filtering**
    * Filter kategori (kafe, kuliner, *fashion*, *handmade*, *retail*, dll).
    * Filter jarak, *rating*, dan status buka/tutup.
    * Hasil pencarian diperbarui secara *real-time* (menggunakan *dummy data*).
3.  **Peta Interaktif UMKM (`/umkm/map`)**
    * *Marker* UMKM lengkap dengan nama, *rating*, dan jarak.
    * Lokasi *user* (*geolocation*) untuk menampilkan UMKM terdekat.
    * *Bottom sheet* interaktif untuk detail singkat UMKM.
4.  **Rekomendasi UMKM (`/umkm/recommendation`)**
    * Menampilkan UMKM populer berdasarkan kategori.
    * *Horizontal scroll sections* untuk kategori tertentu.
    * Dirancang mirip gaya rekomendasi aplikasi *map/food delivery* modern.
5.  **Detail UMKM Lengkap (`/umkm/[id]`)**
    * *Hero image* UMKM.
    * Informasi utama: *rating*, lokasi, jam operasional, deskripsi, kategori.
    * Produk/menu UMKM.
    * *Review* pengguna (*dummy data*).
    * *Owner info* untuk menambah *trust*.
    * Peta lokasi UMKM.
    * *Sidebar* berisi *action* seperti kontak/chat.
6.  **Navigasi Mode List / Mode Map**
    * Pengguna bisa beralih antara tampilan *list* (*grid*) dan peta (*map*).
    * Membantu pengguna yang lebih nyaman melihat *layout list* atau peta.

> **Catatan:** Fitur lain (Dashboard Seller, Customer, Admin) berada dalam pengembangan lanjutan dan tidak termasuk ruang lingkup fitur inti untuk kompetisi ini. Fokus utama penilaian diarahkan pada **Pengalaman eksplorasi UMKM, Interface map & list, Detail UMKM, serta Konsistensi desain dan UX.**

---

## 3.  Halaman Utama dalam Project

| Halaman | Deskripsi | Fokus Fitur |
| :--- | :--- | :--- |
| **Landing Page** | Profil perusahaan: Visi, masalah & solusi, fitur utama, kategori UMKM. Berfungsi mengarahkan user ke eksplorasi UMKM. | CTA ke eksplorasi UMKM, Company Profile. |
| **`/umkm` (Explore Page)** | Berisi fitur inti: *Hero search*, kategori & *quick filter*, *grid* UMKM lengkap (dengan *pagination*/*infinite grid*), dan *Switch to Map Mode*. | Pencarian, Filtering, Tampilan Grid UMKM. |
| **`/umkm/map` (Map Mode)** | Peta interaktif, *Marker* UMKM, *Bottom sheet* detail UMKM, *Search* & *filter* langsung di map. Desain menyerupai aplikasi pencarian lokasi modern. | Navigasi Berbasis Lokasi, Peta Interaktif. |
| **`/umkm/recommendation`** | Kumpulan rekomendasi UMKM berdasarkan kategori populer, *Horizontal scroll*, *Highlight* kategori yang sering dicari. | Rekomendasi UMKM. |
| **`/umkm/[id]` (Detail UMKM)** | Informasi lengkap: *Hero image*, *rating*, kategori, lokasi, jam buka, deskripsi, produk/menu, *review*, peta lokasi, *sidebar* info & *action button*. | Informasi UMKM Lengkap. |

---

## 4.  Teknologi yang Digunakan

* **Framework:** Next.js 15 (App Router)
* **Bahasa:** TypeScript
* **Styling:** Tailwind CSS
* **Pemetaan:** Leaflet / React Leaflet
* **Ikon:** Lucide Icons
* **Animasi:** Framer Motion
* **Backend:** Supabase (Auth + Database)
* **State Management:** React Hooks

---

## 5.  Design System

### Warna Utama
| Variabel | Kode Warna | Deskripsi |
| :--- | :--- | :--- |
| Teks Utama | `#000000` | Hitam murni. |
| Background Putih | `#FFFFFF` | Putih standar. |
| Background Soft Brown | `#FAF3E0` | Background cokelat lembut. |
| Accent Dark Brown | `#3E2C23` | Aksen cokelat gelap. |
| Accent Brown Modern | `#B99470` | Aksen cokelat modern. |

### Prinsip Desain
* Mobile-first
* Clean dan modern
* Konsisten dan mudah dibaca
* Layout mirip aplikasi pencarian lokasi modern (*GrabFood* / *Google Maps feel*)

---

---

## 6. 🚀 Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```
## 2. Development
```bash
npm run dev
```
3. Production
```bash
npm run build
npm start
```

Akses di: http://localhost:3000

7. Struktur Folder Utama

```bash
src/
├── app/
│   ├── (site)/
│   │   ├── umkm/
│   │   │   ├── page.tsx                 # /umkm
│   │   │   ├── [id]/page.tsx            # /umkm/[id]
│   │   │   ├── map/page.tsx             # /umkm/map
│   │   │   └── recommendation/page.tsx  # /umkm/recommendation
│   ├── dashboard/
│   ├── auth/
│   ├── onboarding/
│   └── layout.tsx
├── components/
├── data/
├── types/
└── lib/
```

8.  Rencana Pengembangan Lanjutan
Dashboard Seller

Dashboard Customer

Dashboard Admin

Sistem booking UMKM

Pembayaran online

Push notifications

Moderasi admin

Verifikasi UMKM

Loyalty program

Promo & rekomendasi berbasis AI
