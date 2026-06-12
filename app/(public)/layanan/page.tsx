import type { Metadata } from 'next'
import { getServices } from '@/lib/queries/services'
import { PageHero } from '@/components/ui/PageHero'
import { ServiceFilter } from '@/components/layanan/ServiceFilter'

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Lengkap dalam satu klinik — dari pemeriksaan rutin, scaling, orthodonti, hingga implan gigi di Klinik Gigi Senyum Sehat Bandung.',
}

export const revalidate = 60

export default async function LayananPage() {
  const services = await getServices({ isActive: true })

  return (
    <>
      <PageHero
        title="Layanan Kami"
        subtitle="Perawatan gigi lengkap dalam satu klinik — ditangani dokter spesialis dengan teknologi modern."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Layanan', href: '/layanan' }]}
        accent="dots"
      />

      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <ServiceFilter services={services} />
        </div>
      </section>
    </>
  )
}
