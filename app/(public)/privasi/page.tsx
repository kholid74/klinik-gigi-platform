import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { SITE_CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi Klinik Gigi Senyum Sehat untuk penggunaan data pasien pada website dan booking online.',
}

const SECTIONS = [
  {
    title: 'Data yang Kami Kumpulkan',
    body: 'Saat Anda mengisi form kontak atau booking online, kami dapat mengumpulkan nama, nomor WhatsApp, email, pilihan layanan, dokter, jadwal, dan catatan keluhan yang Anda berikan secara sukarela.',
  },
  {
    title: 'Penggunaan Data',
    body: 'Data digunakan untuk mengonfirmasi janji temu, menjawab pertanyaan, menyiapkan estimasi layanan, dan menghubungi Anda terkait jadwal kunjungan. Data tidak dijual kepada pihak ketiga.',
  },
  {
    title: 'Keamanan dan Akses',
    body: 'Akses data dibatasi untuk tim administrasi dan tenaga medis yang relevan dengan kebutuhan layanan. Website ini adalah contoh portfolio digital; verifikasi kebijakan final sebelum digunakan pada operasional klinik nyata.',
  },
  {
    title: 'Kontak',
    body: `Untuk pertanyaan terkait privasi, hubungi ${SITE_CONTACT.email} atau ${SITE_CONTACT.phoneDisplay}.`,
  },
]

export default function PrivasiPage() {
  return (
    <>
      <PageHero
        title="Kebijakan Privasi"
        subtitle="Ringkasan cara kami menggunakan data yang Anda kirim melalui website dan booking online."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Kebijakan Privasi', href: '/privasi' }]}
      />
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl text-[var(--color-foreground)] mb-2">{section.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
