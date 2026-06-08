import type { Metadata } from 'next'
import { getDoctors } from '@/lib/queries/doctors'
import { getServices } from '@/lib/queries/services'
import { BookingFlow } from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Buat Janji Temu',
  description: 'Buat janji temu dengan dokter gigi Klinik Senyum Sehat. Pilih layanan, dokter, dan waktu yang sesuai — mudah dan cepat.',
}

export default async function BookingPage() {
  const [services, doctors] = await Promise.all([
    getServices({ isActive: true }),
    getDoctors({ isActive: true }),
  ])

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <div
        className="py-12 text-white"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #005f63 100%)' }}
      >
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            📅 Booking Online
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">Buat Janji Temu</h1>
          <p className="text-white/80 text-sm max-w-md mx-auto">
            Pilih layanan, dokter, dan waktu yang nyaman untuk Anda. Proses cepat dan mudah.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container">
          <BookingFlow services={services} doctors={doctors} />
        </div>
      </section>
    </div>
  )
}
