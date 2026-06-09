export const SITE_CONTACT = {
  name: 'Klinik Gigi Senyum Sehat',
  shortName: 'Senyum Sehat',
  city: 'Bandung',
  address: 'Jl. Sudirman No. 45, Bandung 40117',
  phoneDisplay: '+62 22 7890-0000',
  phoneHref: 'tel:+62227890000',
  whatsappDisplay: '+62 22 7890-0000',
  whatsappHref: 'https://wa.me/62227890000',
  email: 'halo@senyumsehat.id',
  mapsHref: 'https://maps.google.com/?q=Jl.%20Sudirman%20No.%2045%2C%20Bandung%2040117',
  hoursShort: 'Senin – Sabtu: 08.00 – 20.00',
  responseTime: 'Biasanya dibalas dalam 5–15 menit pada jam operasional.',
} as const

export const SITE_SCHEDULE = [
  { day: 'Senin – Jumat', time: '08.00 – 20.00 WIB' },
  { day: 'Sabtu', time: '08.00 – 17.00 WIB' },
  { day: 'Minggu', time: '09.00 – 14.00 WIB' },
  { day: 'Hari Libur Nasional', time: 'Tutup' },
] as const

export const BOOKING_REASSURANCE = [
  'Booking online gratis tanpa DP.',
  'Admin mengonfirmasi jadwal via WhatsApp.',
  'Jadwal bisa diubah sebelum kunjungan.',
  'Estimasi biaya final dikonfirmasi setelah pemeriksaan dokter.',
] as const
