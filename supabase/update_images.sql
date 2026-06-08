-- =====================================================
-- Update image URLs — jalankan di Supabase SQL Editor
-- =====================================================

-- ─── DOCTOR PHOTOS ────────────────────────────────────
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face' WHERE slug = 'rina-safitri';
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face' WHERE slug = 'budi-hartono';
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face' WHERE slug = 'maya-putri';
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=face' WHERE slug = 'arif-setiawan';
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&h=600&fit=crop&crop=face' WHERE slug = 'siti-nurhaliza';
UPDATE doctors SET photo_url = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&crop=face' WHERE slug = 'hendra-wijaya';

-- ─── ARTICLE THUMBNAILS ───────────────────────────────
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1588776814546-1ffbb172c7a5?w=800&h=450&fit=crop' WHERE slug = 'mengenal-karies-gigi';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=450&fit=crop' WHERE slug = 'waktu-tepat-anak-ke-dokter-gigi';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=450&fit=crop' WHERE slug = 'teeth-whitening-klinik-vs-rumah';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop' WHERE slug = '5-makanan-merusak-gigi';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop' WHERE slug = 'penyebab-napas-bau';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=450&fit=crop' WHERE slug = 'panduan-flossing-benar';
UPDATE articles SET thumbnail_url = 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=800&h=450&fit=crop' WHERE slug = 'behel-vs-clear-aligner';
