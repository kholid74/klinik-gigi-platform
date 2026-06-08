// Domain types for Klinik Gigi Senyum Sehat

export type Doctor = {
  id: string
  name: string
  slug: string
  specialty: string
  bio: string | null
  education: string[]
  certifications: string[]
  photo_url: string | null
  is_active: boolean
}

export type DoctorSchedule = {
  id: string
  doctor_id: string
  day_of_week: number
  start_time: string
  end_time: string
  slot_duration_mins: number
  is_active: boolean
}

export type TimeSlot = {
  time: string
  available: boolean
}

export type ServiceCategory =
  | 'preventif'
  | 'restoratif'
  | 'ortodonti'
  | 'bedah'
  | 'estetik'
  | 'anak'
  | 'darurat'

export type Service = {
  id: string
  name: string
  slug: string
  category: ServiceCategory
  short_desc: string | null
  description: string | null
  benefits: string[]
  price_min: number | null
  price_max: number | null
  duration_mins: number | null
  icon_name: string | null
  is_active: boolean
  sort_order: number
}

export type PromoEligibility = 'all' | 'member' | 'new_patient'
export type PromoDiscountType = 'percentage' | 'fixed' | 'free'
export type PromoStatus = 'aktif' | 'member' | 'berakhir'

export type Promo = {
  id: string
  title: string
  slug: string
  description: string | null
  promo_code: string | null
  discount_type: PromoDiscountType
  discount_value: number | null
  original_price: number | null
  promo_price: number | null
  start_date: string
  end_date: string
  max_claims: number | null
  current_claims: number
  eligibility: PromoEligibility
  image_url: string | null
  terms: string[]
  is_featured: boolean
  status: PromoStatus
}

export type ArticleCategory = 'perawatan' | 'anak' | 'estetik' | 'nutrisi' | 'tips'

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: ArticleCategory
  thumbnail_url: string | null
  author: string
  read_time_mins: number | null
  is_featured: boolean
  is_published: boolean
  published_at: string | null
  created_at: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  booking_code: string
  patient_name: string
  patient_phone: string
  patient_email: string | null
  patient_notes: string | null
  service_id: string | null
  doctor_id: string | null
  booking_date: string
  booking_time: string
  status: BookingStatus
  admin_notes: string | null
  created_at: string
  updated_at: string
  service?: Pick<Service, 'id' | 'name' | 'category'>
  doctor?: Pick<Doctor, 'id' | 'name' | 'specialty'>
}

export type ContactMessage = {
  id: string
  name: string
  phone: string | null
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

// Server Action return type
export type ActionResult<T = void> =
  | { data: T; error?: never }
  | { data?: never; error: string }

// Booking store input types
export type PatientData = {
  name: string
  phone: string
  email: string
  notes: string
}
