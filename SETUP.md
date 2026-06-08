# Setup Guide — Klinik Gigi Senyum Sehat

## Prerequisites

- Node.js 20+
- pnpm / npm
- Supabase account

---

## 1. Clone & Install

```bash
git clone https://github.com/kholid74/klinik-gigi-platform.git
cd klinik-gigi-platform/05-nextjs
npm install
```

---

## 2. Supabase Setup

### 2a. Buat project baru di supabase.com

### 2b. Jalankan migration

Di Supabase dashboard → SQL Editor, jalankan isi file:
```
supabase/migrations/0001_initial_schema.sql
```

### 2c. Seed data (opsional)

Jalankan isi file:
```
supabase/seed.sql
```

### 2d. Buat admin user

Di Supabase dashboard → Authentication → Users → Add User:
- Email: `admin@klinik.id`
- Password: `<password aman>`

---

## 3. Environment Variables

Copy `.env.example` ke `.env.local` dan isi:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Nilai URL dan Anon Key ada di:
Supabase Dashboard → Settings → API

---

## 4. Development

```bash
npm run dev
```

Buka: http://localhost:3000
Admin: http://localhost:3000/admin

---

## 5. Deploy ke Vercel

### 5a. Push ke GitHub (sudah dilakukan)

### 5b. Import project di vercel.com

1. New Project → Import from GitHub
2. Pilih repo `klinik-gigi-platform`
3. Set **Root Directory** ke `05-nextjs`
4. Add environment variables (sama seperti `.env.local` tapi ganti `NEXT_PUBLIC_SITE_URL` ke domain production)
5. Deploy

### 5c. Update Supabase allowed URLs

Di Supabase → Authentication → URL Configuration:
- Site URL: `https://senyumsehat.id`
- Redirect URLs: `https://senyumsehat.id/**`

---

## Route Map

| URL | Deskripsi | Rendering |
|---|---|---|
| `/` | Home | ISR 60s |
| `/tentang` | Tentang Klinik | SSG |
| `/dokter` | Daftar Dokter | ISR 60s |
| `/layanan` | Layanan | ISR 60s |
| `/promo` | Promo & Diskon | ISR 60s |
| `/edukasi` | Artikel Edukasi | ISR 60s |
| `/edukasi/[slug]` | Detail Artikel | SSG + ISR |
| `/kontak` | Kontak | SSG |
| `/booking` | Booking Online | Dynamic |
| `/booking/sukses` | Konfirmasi Booking | Dynamic |
| `/admin` | Dashboard Admin | Dynamic (auth) |
| `/admin/booking` | Manajemen Booking | Dynamic (auth) |
| `/admin/dokter` | Manajemen Dokter | Dynamic (auth) |
| `/admin/layanan` | Manajemen Layanan | Dynamic (auth) |
| `/admin/promo` | Manajemen Promo | Dynamic (auth) |
| `/admin/artikel` | Manajemen Artikel | Dynamic (auth) |
| `/admin/pesan` | Inbox Pesan | Dynamic (auth) |
