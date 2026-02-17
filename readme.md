# Tugas Kelompok: Aplikasi CRUD Mahasiswa (Ionic + Express + MySQL)

Project ini adalah implementasi fitur lengkap CRUD dengan UX modern (Sliding Item, Pull Refresh) dan struktur data yang diperbarui (Validasi NIM Unik).

## 👥 Anggota Kelompok
1. Muhammad Faiz (220511139) 
2. Nama (NIM) 
3. Nama (NIM) 

## 🚀 Fitur Utama (Nilai A)
1.  **Sliding Items:** Tombol Edit/Hapus tersembunyi (Swipe Left).
2.  **Validasi Data:** NIM harus unik. Jika duplikat, server menolak.
3.  **Data Lengkap:** Input NIM dan Jenis Kelamin (Radio Button).
4.  **Interaktif:** Live Search & Pull to Refresh.
5.  **Strict Typing:** Kode Frontend menggunakan TypeScript Interface (No `any`).

## 🛠 Cara Menjalankan Project
Pastikan **MySQL** sudah berjalan (via Laragon/XAMPP).

### 1. Jalankan Backend
   ```bash
    cd server-crud
    npm install
    node server.js
   ```
### 2. Jalankan Frontend
   ```bash
    cd client-crud
    npm install
    ionic serve
   ```