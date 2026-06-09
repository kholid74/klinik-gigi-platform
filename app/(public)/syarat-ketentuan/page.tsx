import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { SITE_CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan layanan website, promo, dan booking online Klinik Gigi Senyum Sehat.',
}

const TERMS = [
  {
    title: 'Booking Online',
    body: 'Booking melalui website bersifat permintaan jadwal. Tim admin akan menghubungi Anda melalui WhatsApp untuk konfirmasi dokter, waktu, dan ketersediaan slot.',
  },
  {
    title: 'Estimasi Harga',
    body: 'Harga yang ditampilkan adalah estimasi awal dan dapat berubah sesuai hasil pemeriksaan dokter, kondisi klinis, bahan yang digunakan, serta kebutuhan tindakan tambahan.',
  },
  {
    title: 'Promo',
    body: 'Promo berlaku sesuai periode, kuota, dan syarat masing-masing. Promo tidak selalu dapat digabungkan dengan asuransi atau promo lain kecuali dinyatakan berbeda.',
  },
  {
    title: 'Asuransi',
    body: 'Cakupan asuransi tergantung polis dan ketentuan penyedia. Pasien disarankan mengonfirmasi cakupan kepada admin sebelum kunjungan.',
  },
  {
    title: 'Kontak Resmi',
    body: `Pertanyaan layanan dapat dikirim ke ${SITE_CONTACT.email} atau WhatsApp ${SITE_CONTACT.whatsappDisplay}.`,
  },
]

export default function SyaratKetentuanPage() {
  return (
    <>
      <PageHero
        title="Syarat & Ketentuan"
        subtitle="Informasi penggunaan booking online, estimasi harga, promo, dan asuransi."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' }]}
      />
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            {TERMS.map((term) => (
              <section key={term.title}>
                <h2 className="font-display text-xl text-[var(--color-foreground)] mb-2">{term.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{term.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
