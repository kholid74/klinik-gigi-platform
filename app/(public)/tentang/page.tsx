import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Calendar } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Klinik Gigi Senyum Sehat — melayani kesehatan gigi masyarakat Bandung sejak 2013 dengan tim dokter berpengalaman.',
}

const STATS = [
  { value: '3.000+', label: 'Pasien Puas' },
  { value: '6', label: 'Dokter Spesialis' },
  { value: '12+', label: 'Layanan Tersedia' },
  { value: '10+', label: 'Tahun Pengalaman' },
]

const VALUES = [
  { title: 'Profesionalisme', desc: 'Setiap prosedur dilakukan oleh dokter berlisensi dengan standar klinik internasional.' },
  { title: 'Kenyamanan', desc: 'Ruang tunggu nyaman, prosedur minim sakit, dan tim yang ramah untuk semua usia.' },
  { title: 'Teknologi Modern', desc: 'Peralatan digital terkini — dari rontgen panoramik hingga CAD/CAM untuk restorasi presisi.' },
  { title: 'Transparansi', desc: 'Rencana perawatan dan biaya dijelaskan di awal. Tidak ada biaya tersembunyi.' },
  { title: 'Aksesibilitas', desc: 'Lokasi strategis, parkir luas, dan booking online 24 jam untuk kemudahan Anda.' },
  { title: 'Edukasi', desc: 'Kami percaya pencegahan lebih baik dari pengobatan — setiap kunjungan adalah sesi edukasi.' },
]

const TIMELINE = [
  { year: '2013', event: 'Klinik Gigi Senyum Sehat didirikan di Jl. Sudirman Bandung' },
  { year: '2015', event: 'Penambahan layanan ortodonti dan bedah mulut dengan dokter spesialis' },
  { year: '2017', event: 'Renovasi dan perluasan klinik — kapasitas menjadi 6 kursi dental' },
  { year: '2019', event: 'Implementasi sistem booking online dan rekam medis digital' },
  { year: '2021', event: 'Sertifikasi ISO 9001:2015 untuk sistem manajemen mutu' },
  { year: '2023', event: 'Kerjasama dengan 8 perusahaan asuransi nasional dan internasional' },
]

const FASILITAS = [
  'Peralatan rontgen digital panoramik',
  'Sistem sterilisasi autoclave modern',
  'Unit dental ergonomis terbaru',
  'Ruang anak khusus bertema cerita',
  'Wifi gratis & TV di ruang tunggu',
  'Area parkir luas dan aman',
  'Sistem rekam medis digital',
  'CCTV & keamanan 24 jam',
]

export default function TentangPage() {
  return (
    <>
      <PageHero
        title="Tentang Senyum Sehat"
        subtitle="Melayani kesehatan gigi masyarakat Bandung dengan tulus dan profesional sejak 2013."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Tentang', href: '/tentang' }]}
      />

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="mb-4">Visi & Misi</Badge>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)] mb-4">
                Menjadi Klinik Gigi Pilihan Utama di Jawa Barat
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-5">
                Kami hadir untuk memberikan layanan kesehatan gigi berkualitas tinggi yang terjangkau dan nyaman.
                Setiap pasien diperlakukan seperti keluarga — dengan perhatian, empati, dan keahlian terbaik.
              </p>
              <ul className="space-y-2">
                {['Perawatan berbasis bukti ilmiah terkini', 'Tim multidisiplin yang berkolaborasi', 'Kepuasan pasien adalah prioritas utama'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                    <CheckCircle size={16} className="text-[var(--color-brand-secondary)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden h-80">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Klinik Gigi Senyum Sehat"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-[var(--color-surface)] rounded-2xl p-6 text-center border border-[var(--color-border)]">
                <div className="font-display text-3xl text-[var(--color-brand-primary)] mb-1">{value}</div>
                <div className="text-xs text-[var(--color-muted)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <Badge variant="default" className="mb-3">Nilai Kami</Badge>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Yang Membuat Kami Berbeda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-light)] flex items-center justify-center mb-4">
                  <CheckCircle size={20} className="text-[var(--color-brand-primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-3">Perjalanan Kami</Badge>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Lebih dari Satu Dekade Melayani</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
            <div className="space-y-6">
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start relative">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-[var(--color-brand-light)] border-4 border-white flex items-center justify-center z-10">
                    <span className="text-xs font-bold text-[var(--color-brand-primary)]">{year}</span>
                  </div>
                  <div className="flex-1 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)] mt-3">
                    <p className="text-sm text-[var(--color-muted)]">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <Badge variant="default" className="mb-3">Fasilitas</Badge>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Fasilitas Modern & Nyaman</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FASILITAS.map((item) => (
              <div key={item} className="bg-white rounded-xl p-4 border border-[var(--color-border)] flex items-start gap-2">
                <CheckCircle size={16} className="text-[var(--color-brand-secondary)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-muted)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-brand-primary)] text-white text-center">
        <div className="container max-w-xl">
          <h2 className="font-display text-2xl md:text-3xl mb-4">Percayakan Kesehatan Gigi Anda kepada Kami</h2>
          <p className="text-white/80 mb-6 text-sm">Buat janji temu hari ini dan rasakan perbedaan perawatan profesional.</p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-brand-cta)] text-white font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            <Calendar size={18} />
            Buat Janji Sekarang
          </Link>
        </div>
      </section>
    </>
  )
}
