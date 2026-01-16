# Dicoding Notes App

Aplikasi catatan modern dan responsif yang dibangun dengan Vanilla JavaScript, Web Components, dan CSS Grid.

**[Lihat Demo / Deploy Link](https://MuhammadAlim7.github.io/Dicoding-Notes-App)** _(Silakan ganti link ini setelah peluncuran)_

## 🚀 Fitur

### Fungsionalitas Inti

- **Tambah Catatan**: Membuat catatan baru dengan judul dan isi.
- **Lihat Catatan**: Menampilkan semua catatan dalam tata letak grid yang responsif.
- **Hapus Catatan**: Menghapus catatan menggunakan tombol "X" pada setiap kartu.
- **Validasi Real-time**: Input formulir divalidasi secara instan dan menampilkan pesan kesalahan.

### Strategi Data (Hybrid)

- **Catatan Baru**: Disimpan ke **LocalStorage**. Catatan ini tetap ada bahkan setelah browser ditutup.
- **Catatan Default**: Dimuat dari file statis (`notes.js`). Jika dihapus, catatan ini akan muncul kembali saat halaman di-refresh (mensimulasikan reset untuk data bawaan).

### Arsitektur & Teknologi

- **Web Components**: UI modular menggunakan `<app-bar>`, `<note-input>`, dan `<note-item>`.
- **ES Modules**: Struktur JavaScript yang bersih dan modular.
- **CSS Grid**: Digunakan untuk tata letak utama daftar catatan agar responsif.
- **CSS Variables**: Tema global untuk warna, font, dan jarak yang konsisten.

### Desain UI/UX

- **Tata Letak Terpisah Tetap (Fixed Split Layout)**:
  - **Kiri (Desktop)**: Sidebar tetap untuk formulir "Tambah Catatan".
  - **Kanan (Desktop)**: Area yang dapat digulir (scrollable) untuk daftar catatan.
- **Kartu Gaya Notifikasi**: Catatan digayakan seperti notifikasi yang ramping dengan efek bayangan dan hover.
- **Posisi Tanggal Absolut**: Tanggal disematkan di pojok kanan bawah agar tampilan konsisten.
- **Responsif**: Tata letak menumpuk secara vertikal (stack) pada perangkat seluler untuk penggunaan yang lebih baik.

### Jaminan Kualitas (Quality Assurance)

- **ESLint**: Pelintingan JavaScript dengan konfigurasi `globals` dan `eslint:recommended`.
- **Stylelint**: Pelintingan CSS dengan `stylelint-config-standard`.

## 🛠️ Cara Menjalankan

Karena proyek ini menggunakan ES Modules, diperlukan server lokal.

1.  **Buka situs ini di browser**
2.  **Clone/Download** proyek ini.
3.  **Instal Dependensi** (untuk linting):
    ```bash
    npm install
    ```
4.  **Jalankan dengan Python**:
    ```bash
    python -m http.server
    ```
    Atau gunakan ekstensi "Live Server" di VS Code.
5.  **Buka di Browser**:
    Buka `http://localhost:8000`

## 📝 Perintah (Commands)

- `npm run lint`: Memeriksa kualitas kode JavaScript.
- `npm run lint:css`: Memeriksa kualitas kode CSS.
