import type { Metadata } from 'next'
import { getDoctors } from '@/lib/queries/doctors'
import { PageHero } from '@/components/ui/PageHero'
import { DoctorFilter } from '@/components/dokter/DoctorFilter'

export const metadata: Metadata = {
  title: 'Tim Dokter',
  description: 'Kenali tim dokter gigi spesialis kami yang berpengalaman dan berdedikasi melayani kesehatan gigi Anda.',
}

export const revalidate = 60

export default async function DokterPage() {
  const doctors = await getDoctors({ isActive: true })

  return (
    <>
      <PageHero
        title="Tim Dokter Kami"
        subtitle="Ditangani oleh dokter gigi spesialis berpengalaman yang berdedikasi untuk kesehatan senyum Anda."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Dokter', href: '/dokter' }]}
        gradient="linear-gradient(135deg, #1A1A2E 0%, #0D7377 100%)"
        accent="circle"
      />

      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <DoctorFilter doctors={doctors} />
        </div>
      </section>
    </>
  )
}
