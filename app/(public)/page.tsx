import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight, Award, Clock, MapPin, Phone, MessageCircle, Shield, Wrench, GitCommit, Scissors, Sparkles, Smile, Zap, Stethoscope } from 'lucide-react'
import type { ServiceCategory } from '@/types'

const CATEGORY_ICONS: Record<ServiceCategory, React.ElementType> = {
  preventif: Shield,
  restoratif: Wrench,
  ortodonti: GitCommit,
  bedah: Scissors,
  estetik: Sparkles,
  anak: Smile,
  darurat: Zap,
}
import { getDoctors } from '@/lib/queries/doctors'
import { getServices } from '@/lib/queries/services'
import { getPromos } from '@/lib/queries/promos'
import { getArticles } from '@/lib/queries/articles'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { InsuranceChips } from '@/components/kontak/InsuranceChips'
import { SITE_CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Klinik Gigi Senyum Sehat Bandung',
  description: 'Klinik gigi terpercaya di Bandung. Booking online, dokter berpengalaman, layanan lengkap dari pemeriksaan rutin hingga ortodonti.',
}

export const revalidate = 60

const TESTIMONIALS = [
  {
    name: 'Rizky Pratama',
    location: 'Bandung',
    text: 'Dokternya sabar dan profesional. Cabut gigi bungsu yang saya bayangkan menakutkan ternyata lancar dan hampir tidak sakit. Sangat direkomendasikan!',
    service: 'Bedah Gigi Bungsu',
    initial: 'R',
    avatarBg: 'bg-[var(--color-brand-primary)]',
  },
  {
    name: 'Sari Dewi',
    location: 'Cimahi',
    text: 'Booking online mudah dan admin responsif via WhatsApp. Klinik bersih dan modern. Anak saya yang tadinya takut dokter gigi, sekarang sudah mau!',
    service: 'Perawatan Anak',
    initial: 'S',
    avatarBg: 'bg-[var(--color-brand-secondary)]',
  },
  {
    name: 'Hendra Wijaya',
    location: 'Bandung Barat',
    text: 'Whitening hasilnya memuaskan. Penjelasan dokter jelas sebelum tindakan, dan harga sesuai yang dijanjikan. Tidak ada biaya tersembunyi sama sekali.',
    service: 'Teeth Whitening',
    initial: 'H',
    avatarBg: 'bg-[#005f63]',
  },
]

const INSURANCE = [
  { name: 'BPJS Kesehatan', domain: 'bpjs-kesehatan.go.id', type: 'Jaminan Kesehatan Nasional' },
  { name: 'Prudential', domain: 'prudential.com', type: 'Asuransi Jiwa & Kesehatan' },
  { name: 'AXA Mandiri', domain: 'axa.com', type: 'Asuransi Jiwa & Umum' },
  { name: 'Allianz', domain: 'allianz.com', type: 'Asuransi Kesehatan' },
  { name: 'Manulife', domain: 'manulife.com', type: 'Asuransi Jiwa & Kesehatan' },
  { name: 'Sun Life', domain: 'sunlife.com', type: 'Asuransi Jiwa & Investasi' },
  { name: 'BRI Life', domain: 'brilife.co.id', type: 'Asuransi Jiwa & Kesehatan' },
  { name: 'Cigna', domain: 'cigna.com', type: 'Asuransi Kesehatan Korporat' },
]

export default async function HomePage() {
  const [doctors, services, promos, articles] = await Promise.all([
    getDoctors({ isActive: true, limit: 3 }),
    getServices({ isActive: true, limit: 6 }),
    getPromos({ limit: 3 }),
    getArticles({ limit: 3 }),
  ])

  const featuredPromo = promos.find((p) => p.is_featured) ?? promos[0] ?? null

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-brand-cream)]">
        {/* Decorative bg blobs */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,115,119,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(20,189,172,0.06) 0%, transparent 70%)' }}
        />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24 lg:py-28">

            {/* Left: content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-[var(--color-brand-light)] text-[var(--color-brand-primary)] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-secondary)] animate-pulse" />
                Buka Hari Ini · Senin – Sabtu
              </span>

              <h1
                className="font-display text-[var(--color-foreground)] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.1 }}
              >
                Klinik Gigi Keluarga<br />di Bandung.
              </h1>

              <p className="text-[var(--color-muted)] text-lg mb-8 leading-relaxed max-w-md">
                Pilih layanan, cek estimasi biaya, dan buat janji dengan dokter gigi
                berpengalaman — untuk anak hingga dewasa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-brand-cta)] text-white font-bold rounded-full hover:opacity-90 transition-opacity text-base"
                  style={{ boxShadow: '0 4px 16px rgba(232,85,62,0.35)' }}
                >
                  <Calendar size={18} />
                  Booking Sekarang
                </Link>
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[var(--color-foreground)] font-semibold rounded-full border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors text-base"
                >
                  Lihat Layanan
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Mini trust strip */}
              <div className="flex items-center gap-5 text-sm flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-base leading-none">★</span>
                  <span className="font-bold text-[var(--color-foreground)]">4.9</span>
                  <span className="text-[var(--color-muted)]">Google</span>
                </div>
                <div className="w-px h-4 bg-[var(--color-border)]" />
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--color-foreground)]">10+</span>
                  <span className="text-[var(--color-muted)]">Tahun Pengalaman</span>
                </div>
                <div className="w-px h-4 bg-[var(--color-border)]" />
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--color-foreground)]">3.000+</span>
                  <span className="text-[var(--color-muted)]">Pasien Puas</span>
                </div>
              </div>
            </div>

            {/* Right: hero image with organic blob shape */}
            <div className="relative hidden lg:flex justify-end items-center">
              {/* Accent ring behind image */}
              <div
                className="absolute top-8 right-8 w-[420px] h-[500px] border-2 border-[var(--color-brand-secondary)]/20"
                style={{ borderRadius: '55% 45% 38% 62% / 46% 52% 48% 54%' }}
              />
              {/* Image blob */}
              <div
                className="relative w-[400px] h-[480px] overflow-hidden"
                style={{ borderRadius: '60% 40% 32% 68% / 44% 50% 50% 56%' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                  alt="Dokter Gigi Senyum Sehat Bandung"
                  fill
                  className="object-cover object-top"
                  sizes="400px"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2 bg-[var(--color-brand-light)] inline-block px-3 py-1 rounded-full">
                Layanan Kami
              </p>
              <h2 className="text-section-title mt-2">
                Perawatan Lengkap untuk Senyum Terbaik
              </h2>
            </div>
            <Link href="/layanan" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.slice(0, 6).map((svc) => (
              <Link
                key={svc.id}
                href="/layanan"
                className="bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-brand-secondary)] hover:shadow-md transition-all group flex flex-col gap-3"
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand-secondary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-colors">
                  {(() => { const Icon = CATEGORY_ICONS[svc.category] ?? Stethoscope; return <Icon size={20} /> })()}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm mb-1">{svc.name}</h3>
                  {svc.price_min && (
                    <p className="text-xs font-bold text-[var(--color-brand-cta)]">
                      ab {formatPrice(svc.price_min)}
                    </p>
                  )}
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 mt-1">{svc.short_desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/layanan" className="flex md:hidden items-center justify-center gap-1 mt-6 text-sm font-semibold text-[var(--color-brand-primary)]">
            Lihat Semua Layanan <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── PROMO BANNER ───────────────────────────────── */}
      {featuredPromo && (
        <section className="py-12 bg-[var(--color-brand-light)]">
          <div className="container">
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))' }}
            >
              {/* decorative circle */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
              <div className="relative text-white">
                <span className="inline-block bg-[var(--color-brand-cta)] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  🔥 Promo Terbatas
                </span>
                <h3 className="font-display text-2xl mb-1">{featuredPromo.title}</h3>
                <p className="text-white/85 text-sm max-w-md">{featuredPromo.description}</p>
                {featuredPromo.promo_price && (
                  <div className="mt-3 text-2xl font-bold">
                    {formatPrice(featuredPromo.promo_price)}
                    {featuredPromo.original_price && (
                      <s className="text-sm font-normal text-white/60 ml-2">{formatPrice(featuredPromo.original_price)}</s>
                    )}
                  </div>
                )}
              </div>
              <Link
                href="/booking"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:scale-[1.03] transition-transform"
              >
                <Calendar size={16} />
                Klaim Sekarang
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DOCTORS ────────────────────────────────────── */}
      <section className="py-16 bg-[var(--color-brand-cream)]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2 bg-[var(--color-brand-light)] inline-block px-3 py-1 rounded-full">
                Tim Dokter
              </p>
              <h2 className="text-section-title mt-2">
                Ditangani Dokter Berpengalaman
              </h2>
            </div>
            <Link href="/dokter" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Semua Dokter <ChevronRight size={16} />
            </Link>
          </div>

          {/* horizontal scroll on mobile, grid on desktop */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-x-visible"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="shrink-0 w-72 lg:w-auto rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="h-56 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--color-brand-light) 0%, var(--color-brand-secondary) 100%)' }}
                >
                  {doc.photo_url ? (
                    <Image src={doc.photo_url} alt={doc.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 280px, 33vw" loading="eager" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center font-display text-5xl text-white">
                        {doc.name.split(' ').slice(-1)[0]?.[0]}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <Badge variant="default">{doc.specialty}</Badge>
                  <h3 className="font-bold text-base text-[var(--color-foreground)]">{doc.name}</h3>
                  <Link
                    href="/dokter"
                    className="text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 inline-flex items-center gap-1 transition-all"
                  >
                    Lihat Profil <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
            {doctors.length === 0 && (
              <div className="lg:col-span-3 py-12 text-center text-[var(--color-muted)] text-sm w-full">
                Memuat data dokter...
              </div>
            )}
          </div>

          <Link href="/dokter" className="flex md:hidden items-center justify-center gap-1 mt-4 text-sm font-semibold text-[var(--color-brand-primary)]">
            Semua Dokter <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-16 bg-[var(--color-brand-light)]">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2 bg-white inline-block px-3 py-1 rounded-full">
              Testimoni
            </p>
            <h2 className="text-section-title mt-2">
              Dipercaya Ribuan Pasien
            </h2>
            <p className="text-[var(--color-muted)] mt-1">Apa kata mereka tentang layanan kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] flex flex-col gap-4">
                <div className="flex gap-0.5 text-amber-400 text-base">
                  {'★★★★★'}
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${t.avatarBg}`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">{t.name}</p>
                    <p className="text-xs text-[var(--color-muted)]">{t.location} · {t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2 bg-[var(--color-brand-light)] inline-block px-3 py-1 rounded-full">
                Edukasi
              </p>
              <h2 className="text-section-title mt-2">
                Edukasi Kesehatan Gigi
              </h2>
              <p className="text-[var(--color-muted)] text-lg mt-1">Artikel dari dokter kami untuk keluarga Indonesia</p>
            </div>
            <Link href="/edukasi" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Semua Artikel <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/edukasi/${article.slug}`}
                className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-52 bg-gradient-to-br from-[#e0f2f1] to-[#b2dfdb] relative overflow-hidden">
                  {article.thumbnail_url ? (
                    <Image
                      src={article.thumbnail_url}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="eager"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Award size={36} className="text-[var(--color-brand-secondary)]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-[var(--color-brand-primary)] uppercase tracking-wide mb-2">{article.category}</p>
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                    {article.read_time_mins && (
                      <span className="flex items-center gap-1"><Clock size={11} />{article.read_time_mins} mnt</span>
                    )}
                    {article.published_at && <span>{formatDate(article.published_at)}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/edukasi" className="flex md:hidden items-center justify-center gap-1 mt-6 text-sm font-semibold text-[var(--color-brand-primary)]">
            Semua Artikel <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CONTACT STRIP ──────────────────────────────── */}
      <section className="py-10 bg-[var(--color-brand-cream)] border-t border-[var(--color-border)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                label: 'Alamat Klinik',
                value: SITE_CONTACT.address,
              },
              {
                icon: Clock,
                label: 'Jam Operasional',
                value: SITE_CONTACT.hoursShort,
              },
              {
                icon: Phone,
                label: 'Hubungi Kami',
                value: SITE_CONTACT.phoneDisplay,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-brand-light)] flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE ──────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[var(--color-border)]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl text-[var(--color-foreground)] mb-2">Asuransi yang Diterima</h2>
            <p className="text-[var(--color-muted)]">
              Klinik kami bekerja sama dengan berbagai penyedia asuransi kesehatan terkemuka.
            </p>
          </div>
          <InsuranceChips logos={INSURANCE} showType />
          <p className="text-center text-xs text-[var(--color-muted)] mt-5">
            Hubungi kami untuk konfirmasi cakupan polis Anda.{' '}
            <Link href="/kontak" className="text-[var(--color-brand-primary)] font-semibold">
              Kontak →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────── */}
      <section
        className="py-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #005f63 100%)' }}
      >
        <div className="container max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Siap untuk Senyum yang Lebih Sehat?</h2>
          <p className="text-white/80 mb-8">
            Buat janji temu sekarang dan dapatkan pemeriksaan gratis untuk kunjungan pertama Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-brand-cta)] text-white font-bold rounded-full hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 4px 16px rgba(232,85,62,0.35)' }}
            >
              <Calendar size={18} />
              Buat Janji Sekarang
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/15 text-white font-semibold rounded-full hover:bg-white/25 transition-colors border border-white/30"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP FAB ───────────────────────────────── */}
      <a
        href={SITE_CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="fixed right-4 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl z-50 hover:scale-110 transition-transform md:bottom-6"
        style={{
          background: '#25D366',
          boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
          bottom: 'max(80px, calc(80px + env(safe-area-inset-bottom, 0px)))',
        }}
      >
        <MessageCircle size={26} />
      </a>

      {/* ── MOBILE BOOKING BAR ─────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-[var(--color-border)] px-3 pt-3 z-40"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
      >
        <Link
          href="/booking"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-brand-cta)] text-white font-bold rounded-full"
          style={{ boxShadow: '0 4px 16px rgba(232,85,62,0.35)' }}
        >
          <Calendar size={18} />
          Booking Sekarang
        </Link>
      </div>
    </>
  )
}
