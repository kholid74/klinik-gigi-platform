-- =====================================================
-- Seed Data — Klinik Gigi Senyum Sehat
-- Based on 04-preview design reference
-- =====================================================

-- ─── DOCTORS ──────────────────────────────────────────
INSERT INTO doctors (id, name, slug, specialty, bio, education, certifications, photo_url) VALUES
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'drg. Rina Safitri, Sp.KG',
  'rina-safitri',
  'Konservasi Gigi',
  'Dokter gigi spesialis konservasi dengan pengalaman 12 tahun. Ahli dalam perawatan saluran akar, tambalan estetik, dan restorasi mahkota.',
  ARRAY['S1 Kedokteran Gigi – Universitas Padjadjaran (2008)', 'Sp.KG – Universitas Indonesia (2013)'],
  ARRAY['Anggota PDGI', 'Sertifikasi Endodontik Lanjutan', 'Pelatihan CAD/CAM Dental'],
  NULL
),
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'drg. Budi Hartono, Sp.Ort',
  'budi-hartono',
  'Ortodonti',
  'Spesialis ortodonti dengan keahlian dalam perawatan behel konvensional dan clear aligner. Telah menangani lebih dari 800 kasus maloklusi.',
  ARRAY['S1 Kedokteran Gigi – Universitas Gadjah Mada (2006)', 'Sp.Ort – Universitas Airlangga (2011)'],
  ARRAY['Anggota IKORTI', 'Certified Invisalign Provider', 'Pelatihan Damon System'],
  NULL
),
(
  'a1b2c3d4-0003-0000-0000-000000000003',
  'drg. Maya Putri, Sp.BM',
  'maya-putri',
  'Bedah Mulut',
  'Spesialis bedah mulut yang berpengalaman dalam pencabutan gigi bungsu, implan gigi, dan bedah tulang rahang.',
  ARRAY['S1 Kedokteran Gigi – Universitas Padjadjaran (2010)', 'Sp.BM – Universitas Indonesia (2015)'],
  ARRAY['Anggota PABMI', 'Sertifikasi Implan Gigi Nobel Biocare', 'ATLS Certification'],
  NULL
),
(
  'a1b2c3d4-0004-0000-0000-000000000004',
  'drg. Arif Setiawan',
  'arif-setiawan',
  'Gigi Umum',
  'Dokter gigi umum dengan pengalaman 8 tahun. Berfokus pada pemeriksaan rutin, scaling, dan edukasi kesehatan gigi bagi pasien semua usia.',
  ARRAY['S1 Kedokteran Gigi – Universitas Padjadjaran (2014)'],
  ARRAY['Anggota PDGI', 'Pelatihan Aesthetic Dentistry'],
  NULL
),
(
  'a1b2c3d4-0005-0000-0000-000000000005',
  'drg. Siti Nurhaliza, Sp.KGA',
  'siti-nurhaliza',
  'Kedokteran Gigi Anak',
  'Spesialis gigi anak yang ramah dan sabar. Ahli dalam menangani pasien anak dengan pendekatan bermain untuk mengurangi rasa takut.',
  ARRAY['S1 Kedokteran Gigi – Universitas Trisakti (2011)', 'Sp.KGA – Universitas Padjadjaran (2016)'],
  ARRAY['Anggota IDGAI', 'Pelatihan Pedodonti Behavior Management', 'Sertifikasi Fluoride Therapy'],
  NULL
),
(
  'a1b2c3d4-0006-0000-0000-000000000006',
  'drg. Hendra Wijaya, Sp.Perio',
  'hendra-wijaya',
  'Periodonti',
  'Spesialis periodonti yang menangani penyakit gusi dan jaringan pendukung gigi. Ahli dalam scaling deep, kuretase, dan cangkok gusi.',
  ARRAY['S1 Kedokteran Gigi – Universitas Diponegoro (2009)', 'Sp.Perio – Universitas Airlangga (2014)'],
  ARRAY['Anggota PDGI', 'Anggota ISPG', 'Pelatihan Laser Periodontal Therapy'],
  NULL
);

-- ─── DOCTOR SCHEDULES ─────────────────────────────────
-- 0=Minggu, 1=Senin, 2=Selasa, 3=Rabu, 4=Kamis, 5=Jumat, 6=Sabtu
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_mins) VALUES
-- drg. Rina (Senin, Rabu, Jumat)
('a1b2c3d4-0001-0000-0000-000000000001', 1, '09:00', '17:00', 30),
('a1b2c3d4-0001-0000-0000-000000000001', 3, '09:00', '17:00', 30),
('a1b2c3d4-0001-0000-0000-000000000001', 5, '09:00', '17:00', 30),
-- drg. Budi (Selasa, Kamis, Sabtu)
('a1b2c3d4-0002-0000-0000-000000000002', 2, '10:00', '18:00', 30),
('a1b2c3d4-0002-0000-0000-000000000002', 4, '10:00', '18:00', 30),
('a1b2c3d4-0002-0000-0000-000000000002', 6, '09:00', '15:00', 30),
-- drg. Maya (Senin, Selasa, Kamis)
('a1b2c3d4-0003-0000-0000-000000000003', 1, '11:00', '19:00', 45),
('a1b2c3d4-0003-0000-0000-000000000003', 2, '11:00', '19:00', 45),
('a1b2c3d4-0003-0000-0000-000000000003', 4, '11:00', '19:00', 45),
-- drg. Arif (Senin – Sabtu)
('a1b2c3d4-0004-0000-0000-000000000004', 1, '09:00', '20:00', 30),
('a1b2c3d4-0004-0000-0000-000000000004', 2, '09:00', '20:00', 30),
('a1b2c3d4-0004-0000-0000-000000000004', 3, '09:00', '20:00', 30),
('a1b2c3d4-0004-0000-0000-000000000004', 4, '09:00', '20:00', 30),
('a1b2c3d4-0004-0000-0000-000000000004', 5, '09:00', '20:00', 30),
('a1b2c3d4-0004-0000-0000-000000000004', 6, '09:00', '16:00', 30),
-- drg. Siti (Senin, Rabu, Sabtu)
('a1b2c3d4-0005-0000-0000-000000000005', 1, '09:00', '16:00', 30),
('a1b2c3d4-0005-0000-0000-000000000005', 3, '09:00', '16:00', 30),
('a1b2c3d4-0005-0000-0000-000000000005', 6, '09:00', '14:00', 30),
-- drg. Hendra (Selasa, Rabu, Jumat)
('a1b2c3d4-0006-0000-0000-000000000006', 2, '13:00', '20:00', 30),
('a1b2c3d4-0006-0000-0000-000000000006', 3, '13:00', '20:00', 30),
('a1b2c3d4-0006-0000-0000-000000000006', 5, '13:00', '20:00', 30);

-- ─── SERVICES ─────────────────────────────────────────
INSERT INTO services (name, slug, category, short_desc, description, benefits, price_min, price_max, duration_mins, icon_name, sort_order) VALUES
('Pemeriksaan & Konsultasi', 'pemeriksaan-konsultasi', 'preventif',
 'Deteksi masalah gigi sejak dini dengan pemeriksaan menyeluruh.',
 'Pemeriksaan menyeluruh kondisi gigi, gusi, dan rongga mulut. Termasuk konsultasi untuk rencana perawatan jika diperlukan.',
 ARRAY['Deteksi dini masalah gigi', 'Foto rontgen panoramik', 'Konsultasi rencana perawatan', 'Edukasi kebersihan mulut'],
 100000, 250000, 30, 'stethoscope', 1),

('Scaling & Polishing', 'scaling-polishing', 'preventif',
 'Pembersihan karang gigi profesional untuk gusi yang sehat.',
 'Pembersihan plak dan karang gigi menggunakan alat ultrasonik, diikuti polishing untuk permukaan gigi yang lebih halus dan bersih.',
 ARRAY['Menghilangkan karang gigi', 'Mencegah penyakit gusi', 'Nafas lebih segar', 'Gigi lebih bersih dan cerah'],
 150000, 350000, 45, 'sparkles', 2),

('Tambal Gigi (Komposit)', 'tambal-gigi-komposit', 'restoratif',
 'Perbaikan gigi berlubang dengan material estetik warna gigi.',
 'Penambalan gigi berlubang menggunakan bahan resin komposit yang disesuaikan dengan warna gigi asli. Tahan lama dan estetik.',
 ARRAY['Material sewarna gigi asli', 'Prosedur cepat 1 kunjungan', 'Tahan lama hingga 7 tahun', 'Bebas merkuri'],
 200000, 600000, 60, 'plus-square', 3),

('Perawatan Saluran Akar', 'perawatan-saluran-akar', 'restoratif',
 'Selamatkan gigi yang terinfeksi tanpa harus dicabut.',
 'Pembersihan dan pengisian saluran akar gigi yang terinfeksi untuk menyelamatkan gigi. Dilakukan dalam 1-3 kunjungan.',
 ARRAY['Menyelamatkan gigi asli', 'Menghilangkan nyeri', 'Mencegah penyebaran infeksi', 'Tanpa rasa sakit berlebih'],
 500000, 1500000, 90, 'zap', 4),

('Pemasangan Behel', 'pemasangan-behel', 'ortodonti',
 'Rapikan gigi dengan behel konvensional atau clear aligner.',
 'Perawatan ortodonti untuk merapikan susunan gigi dan memperbaiki gigitan. Tersedia behel metal, keramik, dan clear aligner.',
 ARRAY['Konsultasi cetak gigi awal', 'Berbagai pilihan jenis behel', 'Kontrol rutin termasuk', 'Retensi pasca lepas behel'],
 5000000, 15000000, 60, 'git-commit', 5),

('Cabut Gigi Bungsu', 'cabut-gigi-bungsu', 'bedah',
 'Ekstraksi gigi bungsu impaksi oleh spesialis bedah mulut.',
 'Pencabutan gigi bungsu yang tumbuh miring atau impaksi dengan prosedur bedah minimal invasif. Ditangani spesialis bedah mulut.',
 ARRAY['Ditangani Sp.BM berpengalaman', 'Anestesi lokal nyaman', 'Luka minimal, pemulihan cepat', 'Obat pasca operasi termasuk'],
 500000, 2000000, 90, 'scissors', 6),

('Teeth Whitening', 'teeth-whitening', 'estetik',
 'Cerahkan warna gigi hingga 8 shade lebih putih dalam 1 jam.',
 'Pemutihan gigi menggunakan gel peroksida konsentrasi tinggi yang diaktifkan lampu LED. Hasilnya tahan 1-2 tahun.',
 ARRAY['Hasil terlihat instan', 'Prosedur 60 menit', 'Aman untuk email gigi', 'Tahan 1-2 tahun'],
 800000, 1500000, 60, 'sun', 7),

('Veneer Porselen', 'veneer-porselen', 'estetik',
 'Lapisan tipis porselen untuk senyum yang sempurna.',
 'Pemasangan lapisan tipis porselen di permukaan depan gigi untuk memperbaiki warna, bentuk, dan ukuran gigi secara estetik.',
 ARRAY['Perubahan drastis dalam 2 kunjungan', 'Warna natural seperti gigi asli', 'Tahan lama 10-15 tahun', 'Stain-resistant'],
 3000000, 8000000, 90, 'layers', 8),

('Implan Gigi', 'implan-gigi', 'bedah',
 'Penggantian gigi permanen dengan implan titanium.',
 'Pemasangan akar gigi buatan dari titanium sebagai pengganti gigi yang hilang. Hasil paling natural dan permanen.',
 ARRAY['Solusi permanen gigi hilang', 'Tidak merusak gigi sebelah', 'Kuat seperti gigi asli', 'Bebas perawatan khusus'],
 8000000, 20000000, 120, 'anchor', 9),

('Perawatan Gigi Anak', 'perawatan-gigi-anak', 'anak',
 'Perawatan khusus anak dengan pendekatan ramah dan menyenangkan.',
 'Pemeriksaan, penambalan, dan perawatan gigi susu pada anak usia 1-12 tahun. Dilakukan oleh Sp.KGA dengan pendekatan behavioral.',
 ARRAY['Spesialis gigi anak berpengalaman', 'Ruang tunggu khusus anak', 'Anestesi topikal sebelum suntik', 'Hadiah untuk anak setelah perawatan'],
 100000, 500000, 45, 'smile', 10),

('Sikat & Fluoride Anak', 'sikat-fluoride-anak', 'anak',
 'Pencegahan karies gigi anak dengan fluoride profesional.',
 'Aplikasi fluoride topikal konsentrasi tinggi untuk memperkuat email gigi anak dan mencegah karies. Dilakukan setiap 6 bulan.',
 ARRAY['Mencegah gigi berlubang', 'Prosedur cepat dan nyaman', 'Direkomendasikan tiap 6 bulan', 'Aman untuk anak 3 tahun ke atas'],
 75000, 150000, 20, 'shield', 11),

('Penanganan Darurat', 'penanganan-darurat', 'darurat',
 'Penanganan cepat untuk nyeri gigi, trauma, atau gigi patah.',
 'Layanan darurat untuk mengatasi nyeri akut, gigi patah karena trauma, abses, atau kondisi darurat gigi lainnya. Prioritas antrian.',
 ARRAY['Prioritas antrian', 'Penanganan dalam 30 menit', 'Tersedia semua hari operasional', 'Konsultasi via WhatsApp tersedia'],
 200000, 500000, 30, 'alert-circle', 12);

-- ─── PROMOS ───────────────────────────────────────────
INSERT INTO promos (title, slug, description, promo_code, discount_type, discount_value, original_price, promo_price, start_date, end_date, max_claims, current_claims, eligibility, terms, is_featured) VALUES
(
  'Paket Senyum Cantik',
  'paket-senyum-cantik',
  'Dapatkan paket lengkap Scaling + Whitening + Pemeriksaan dengan harga spesial. Untuk pasien baru yang ingin tampil percaya diri.',
  'SENYUM25',
  'percentage', 25,
  1000000, 750000,
  '2026-05-01', '2026-06-09',
  30, 12,
  'new_patient',
  ARRAY['Berlaku untuk pasien baru (kunjungan pertama)', 'Tidak dapat digabung dengan promo lain', 'Berakhir 9 Juni 2026', 'Harus melakukan booking online atau via WhatsApp'],
  true
),
(
  'Scaling Gratis untuk Lansia',
  'scaling-gratis-lansia',
  'Program kepedulian kami untuk orang tua tercinta. Scaling gigi gratis untuk pasien berusia 60 tahun ke atas.',
  'LANSIA60',
  'free', NULL,
  250000, 0,
  '2026-05-15', '2026-06-15',
  30, 21,
  'all',
  ARRAY['Berlaku untuk pasien usia 60 tahun ke atas', 'Wajib membawa KTP', 'Satu kali per pasien', 'Tidak dapat digabung promo lain'],
  false
),
(
  'Referral Teman',
  'referral-teman',
  'Ajak teman ke Senyum Sehat, Anda dan teman masing-masing mendapat diskon 20% untuk semua layanan.',
  'TEMAN20',
  'percentage', 20,
  NULL, NULL,
  '2026-05-01', '2026-06-30',
  20, 7,
  'all',
  ARRAY['Anda dan teman harus melakukan booking bersamaan', 'Diskon berlaku untuk 1 layanan per orang', 'Tidak berlaku untuk implan dan behel', 'Maksimal 1 referral per pasien per bulan'],
  false
),
(
  'Birthday Month Bonus',
  'birthday-month-bonus',
  'Kami merayakan ulang tahun Anda! Dapatkan diskon 30% untuk semua layanan di bulan ulang tahun Anda.',
  NULL,
  'percentage', 30,
  NULL, NULL,
  '2026-01-01', '2026-12-31',
  NULL, 0,
  'member',
  ARRAY['Khusus anggota program Senyum Sehat Card', 'Berlaku sepanjang bulan ulang tahun', 'Wajib menunjukkan KTP', 'Tidak berlaku untuk implan dan behel'],
  false
),
(
  'Hari Kesehatan Gigi 2025',
  'hari-kesehatan-gigi-2025',
  'Rayakan Hari Kesehatan Gigi Nasional dengan diskon 40% untuk semua layanan preventif.',
  'SEHAT40',
  'percentage', 40,
  NULL, NULL,
  '2025-09-01', '2025-09-12',
  100, 100,
  'all',
  ARRAY['Promo ini telah berakhir'],
  false
);

-- ─── ARTICLES ─────────────────────────────────────────
INSERT INTO articles (title, slug, excerpt, category, author, read_time_mins, is_featured, is_published, published_at) VALUES
(
  'Mengenal Karies Gigi: Penyebab, Gejala, dan Cara Mencegahnya',
  'mengenal-karies-gigi',
  'Karies atau gigi berlubang adalah masalah gigi yang paling umum terjadi. Pelajari penyebab, gejala, dan cara efektif mencegahnya sejak dini.',
  'perawatan', 'drg. Arif Setiawan', 6, true, true, NOW() - INTERVAL '3 days'
),
(
  'Kapan Waktu yang Tepat Membawa Anak ke Dokter Gigi untuk Pertama Kali?',
  'waktu-tepat-anak-ke-dokter-gigi',
  'Banyak orang tua yang masih ragu kapan harus membawa anak ke dokter gigi. Jawabannya mungkin lebih awal dari yang Anda kira.',
  'anak', 'drg. Siti Nurhaliza, Sp.KGA', 5, false, true, NOW() - INTERVAL '7 days'
),
(
  'Teeth Whitening di Klinik vs di Rumah: Mana yang Lebih Aman?',
  'teeth-whitening-klinik-vs-rumah',
  'Di pasaran banyak produk pemutih gigi yang bisa dipakai sendiri di rumah. Apakah seaman prosedur profesional di klinik?',
  'estetik', 'drg. Rina Safitri, Sp.KG', 7, false, true, NOW() - INTERVAL '12 days'
),
(
  '5 Makanan yang Tanpa Sadar Merusak Gigi Anda Setiap Hari',
  '5-makanan-merusak-gigi',
  'Beberapa makanan yang kita konsumsi sehari-hari ternyata bisa merusak email gigi tanpa kita sadari. Cek daftarnya di sini.',
  'nutrisi', 'Tim Senyum Sehat', 4, false, true, NOW() - INTERVAL '18 days'
),
(
  'Kenapa Napas Bau Meski Sudah Gosok Gigi? Ini Penyebabnya',
  'penyebab-napas-bau',
  'Bau mulut atau halitosis bisa disebabkan banyak faktor, bukan hanya kebersihan gigi. Pelajari penyebab dan solusinya.',
  'tips', 'drg. Hendra Wijaya, Sp.Perio', 5, false, true, NOW() - INTERVAL '25 days'
),
(
  'Panduan Lengkap Flossing: Teknik yang Benar untuk Gigi Bersih Optimal',
  'panduan-flossing-benar',
  'Flossing adalah bagian penting dari rutinitas kebersihan gigi yang sering diabaikan. Pelajari teknik yang benar agar hasilnya maksimal.',
  'tips', 'Tim Senyum Sehat', 4, false, true, NOW() - INTERVAL '32 days'
),
(
  'Behel vs Clear Aligner: Pilih yang Mana untuk Gigi Rapi?',
  'behel-vs-clear-aligner',
  'Ingin gigi rapi tapi bingung pilih behel konvensional atau clear aligner? Berikut perbandingan lengkap keduanya untuk membantu keputusan Anda.',
  'estetik', 'drg. Budi Hartono, Sp.Ort', 8, false, true, NOW() - INTERVAL '40 days'
);
