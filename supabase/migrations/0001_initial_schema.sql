-- =====================================================
-- Klinik Gigi Senyum Sehat — Initial Schema
-- =====================================================

-- ─── DOCTORS ──────────────────────────────────────────
CREATE TABLE doctors (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT        NOT NULL,
  slug            TEXT        UNIQUE NOT NULL,
  specialty       TEXT        NOT NULL,
  bio             TEXT,
  education       TEXT[]      DEFAULT '{}',
  certifications  TEXT[]      DEFAULT '{}',
  photo_url       TEXT,
  is_active       BOOLEAN     DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_is_active ON doctors(is_active);

-- ─── DOCTOR SCHEDULES ─────────────────────────────────
CREATE TABLE doctor_schedules (
  id                  UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id           UUID    NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week         INT     NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time          TIME    NOT NULL,
  end_time            TIME    NOT NULL,
  slot_duration_mins  INT     DEFAULT 30,
  is_active           BOOLEAN DEFAULT true,
  CONSTRAINT unique_doctor_day UNIQUE (doctor_id, day_of_week)
);

CREATE INDEX idx_schedules_doctor ON doctor_schedules(doctor_id);

-- ─── SERVICES ─────────────────────────────────────────
CREATE TABLE services (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT    NOT NULL,
  slug          TEXT    UNIQUE NOT NULL,
  category      TEXT    NOT NULL
                CHECK (category IN ('preventif','restoratif','ortodonti','bedah','estetik','anak','darurat')),
  short_desc    TEXT,
  description   TEXT,
  benefits      TEXT[]  DEFAULT '{}',
  price_min     INT,
  price_max     INT,
  duration_mins INT,
  icon_name     TEXT,
  is_active     BOOLEAN DEFAULT true,
  sort_order    INT     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_category  ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);

-- ─── PROMOS ───────────────────────────────────────────
CREATE TABLE promos (
  id              UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT    NOT NULL,
  slug            TEXT    UNIQUE NOT NULL,
  description     TEXT,
  promo_code      TEXT    UNIQUE,
  discount_type   TEXT    CHECK (discount_type IN ('percentage', 'fixed', 'free')),
  discount_value  INT,
  original_price  INT,
  promo_price     INT,
  start_date      DATE    NOT NULL,
  end_date        DATE    NOT NULL,
  max_claims      INT,
  current_claims  INT     DEFAULT 0,
  eligibility     TEXT    DEFAULT 'all'
                  CHECK (eligibility IN ('all', 'member', 'new_patient')),
  image_url       TEXT,
  terms           TEXT[]  DEFAULT '{}',
  is_featured     BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Computed status view
CREATE VIEW promos_with_status AS
SELECT *,
  CASE
    WHEN end_date < CURRENT_DATE                        THEN 'berakhir'
    WHEN max_claims IS NOT NULL
         AND current_claims >= max_claims               THEN 'berakhir'
    WHEN eligibility = 'member'                         THEN 'member'
    ELSE 'aktif'
  END AS status
FROM promos;

CREATE INDEX idx_promos_end_date    ON promos(end_date);
CREATE INDEX idx_promos_is_featured ON promos(is_featured);

-- ─── ARTICLES ─────────────────────────────────────────
CREATE TABLE articles (
  id              UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT    NOT NULL,
  slug            TEXT    UNIQUE NOT NULL,
  excerpt         TEXT,
  content         TEXT,
  category        TEXT    NOT NULL
                  CHECK (category IN ('perawatan','anak','estetik','nutrisi','tips')),
  thumbnail_url   TEXT,
  author          TEXT    DEFAULT 'Tim Senyum Sehat',
  read_time_mins  INT,
  is_featured     BOOLEAN DEFAULT false,
  is_published    BOOLEAN DEFAULT false,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_category     ON articles(category);
CREATE INDEX idx_articles_is_published ON articles(is_published);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- ─── BOOKINGS ─────────────────────────────────────────
CREATE TABLE bookings (
  id              UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code    TEXT    UNIQUE NOT NULL,
  patient_name    TEXT    NOT NULL,
  patient_phone   TEXT    NOT NULL,
  patient_email   TEXT,
  patient_notes   TEXT,
  service_id      UUID    REFERENCES services(id) ON DELETE SET NULL,
  doctor_id       UUID    REFERENCES doctors(id)  ON DELETE SET NULL,
  booking_date    DATE    NOT NULL,
  booking_time    TIME    NOT NULL,
  status          TEXT    DEFAULT 'pending'
                  CHECK (status IN ('pending','confirmed','completed','cancelled')),
  admin_notes     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date   ON bookings(booking_date);
CREATE INDEX idx_bookings_doctor ON bookings(doctor_id);
CREATE INDEX idx_bookings_code   ON bookings(booking_code);

-- ─── CONTACT MESSAGES ─────────────────────────────────
CREATE TABLE contact_messages (
  id         UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT    NOT NULL,
  phone      TEXT,
  email      TEXT    NOT NULL,
  subject    TEXT,
  message    TEXT    NOT NULL,
  is_read    BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_is_read ON contact_messages(is_read);

-- ─── TRIGGERS ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_doctors_updated_at
  BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_promos_updated_at
  BEFORE UPDATE ON promos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-set published_at when article is published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_published = true AND (OLD.is_published = false OR OLD.is_published IS NULL) THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_published_at
  BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION set_published_at();

-- ─── ROW LEVEL SECURITY ───────────────────────────────
ALTER TABLE doctors          ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE services         ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read (active/published records)
CREATE POLICY "public_read_doctors"
  ON doctors FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_schedules"
  ON doctor_schedules FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_services"
  ON services FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_promos"
  ON promos FOR SELECT USING (true);

CREATE POLICY "public_read_articles"
  ON articles FOR SELECT USING (is_published = true);

-- Public write
CREATE POLICY "public_insert_bookings"
  ON bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "public_insert_messages"
  ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users)
CREATE POLICY "admin_all_doctors"
  ON doctors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_schedules"
  ON doctor_schedules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_services"
  ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_promos"
  ON promos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_articles"
  ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_bookings"
  ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_messages"
  ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
