import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { getPromos } from '@/lib/queries/promos'
import { Countdown } from '@/components/promo/Countdown'
import { PromoFilter } from '@/components/promo/PromoFilter'

export const metadata: Metadata = {
  title: 'Promo & Diskon',
  description: 'Hemat lebih banyak dengan promo eksklusif Klinik Gigi Senyum Sehat. Diskon hingga 40% untuk berbagai layanan perawatan gigi.',
}

export const revalidate = 60

export default async function PromoPage() {
  const promos = await getPromos()
  const activePromo = promos.find((p) => p.status === 'aktif')
  const nearestEndDate = activePromo?.end_date
    ? new Date(activePromo.end_date + 'T23:59:59').toISOString()
    : '2026-06-30T23:59:59.000Z'

  return (
    <>
      {/* Promo Hero Banner */}
      <div
        className="py-12 md:py-16 text-white"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #005f63 100%)' }}
      >
        <div className="container">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-[var(--color-brand-cta)] px-3 py-1 rounded-full">🔥 Promo Terbatas</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Diskon hingga 40%<br className="hidden md:block" /> untuk Pasien Baru
          </h1>
          <p className="text-white/80 text-sm mb-6">Berlaku untuk Scaling, Whitening, dan Pemeriksaan Awal. Kuota promo mengikuti ketersediaan jadwal dokter dan akan dikonfirmasi admin setelah booking.</p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div>
              <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wider">Promo berakhir dalam</p>
              <Countdown endDate={nearestEndDate} />
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-cta)] text-white font-bold rounded-full hover:opacity-90 transition-opacity text-sm sm:ml-auto"
            >
              <Calendar size={16} />
              Klaim Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Promo List */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <PromoFilter promos={promos} />
        </div>
      </section>
    </>
  )
}
