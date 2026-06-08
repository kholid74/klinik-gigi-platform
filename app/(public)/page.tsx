import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight, Star, Users, Award, Clock } from 'lucide-react'
import { getDoctors } from '@/lib/queries/doctors'
import { getServices } from '@/lib/queries/services'
import { getPromos } from '@/lib/queries/promos'
import { getArticles } from '@/lib/queries/articles'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { AnnouncementBar } from '@/components/home/AnnouncementBar'
import { InsuranceChips } from '@/components/kontak/InsuranceChips'

export const metadata: Metadata = {
  title: 'Klinik Gigi Senyum Sehat Bandung',
  description: 'Klinik gigi terpercaya di Bandung. Booking online, dokter berpengalaman, layanan lengkap dari pemeriksaan rutin hingga ortodonti.',
}

export const revalidate = 60

const INSURANCE = [
  { name: 'BPJS Kesehatan', domain: 'bpjs-kesehatan.go.id' },
  { name: 'Prudential', domain: 'prudential.com' },
  { name: 'AXA Mandiri', domain: 'axa.com' },
  { name: 'Allianz', domain: 'allianz.com' },
  { name: 'Manulife', domain: 'manulife.com' },
  { name: 'Sun Life', domain: 'sunlife.com' },
  { name: 'BRI Life', domain: 'brilife.co.id' },
  { name: 'Cigna', domain: 'cigna.com' },
]

export default async function HomePage() {
  const [doctors, services, promos, articles] = await Promise.all([
    getDoctors({ isActive: true, limit: 3 }),
    getServices({ isActive: true, limit: 6 }),
    getPromos({ limit: 3 }),
    getArticles({ limit: 3 }),
  ])

  const featuredPromo = promos.find((p) => p.is_featured) ?? promos[0] ?? null
  const regularPromos = promos.filter((p) => !p.is_featured).slice(0, 2)

  return (
    <>
      <AnnouncementBar />

      {/* ── HERO ───────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #005f63 50%, #004d50 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="container relative">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5">
              ✨ Klinik Gigi Terpercaya di Bandung
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
              Senyum Sehat,<br />Hidup Lebih Percaya Diri
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Perawatan gigi profesional dengan teknologi modern dan dokter berpengalaman.
              Dari pemeriksaan rutin hingga ortodonti — semua dalam satu klinik.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-cta)] text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                <Calendar size={16} />
                Buat Janji Sekarang
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-full hover:bg-white/25 transition-colors text-sm border border-white/30"
              >
                Lihat Layanan
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Users, value: '500+', label: 'Pasien Puas' },
                { icon: Award, value: '6', label: 'Dokter Spesialis' },
                { icon: Star, value: '4.9', label: 'Rating Google' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
                  <Icon size={14} className="text-[var(--color-brand-secondary)]" />
                  <span className="font-bold">{value}</span>
                  <span className="text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-1 uppercase tracking-wider">Layanan Kami</p>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Perawatan Lengkap untuk Senyum Terbaik</h2>
            </div>
            <Link href="/layanan" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.slice(0, 6).map((svc) => (
              <Link key={svc.id} href="/layanan" className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-light)] flex items-center justify-center mb-4 text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-colors">
                  <Award size={22} />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)] text-sm mb-1">{svc.name}</h3>
                <p className="text-xs text-[var(--color-muted)] line-clamp-2">{svc.short_desc}</p>
              </Link>
            ))}
          </div>

          <Link href="/layanan" className="flex md:hidden items-center justify-center gap-1 mt-6 text-sm font-semibold text-[var(--color-brand-primary)]">
            Lihat Semua Layanan <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── PROMO ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[var(--color-brand-cta)] mb-1 uppercase tracking-wider">🔥 Promo Terbatas</p>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Penawaran Spesial untuk Anda</h2>
            </div>
            <Link href="/promo" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Semua Promo <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Featured promo */}
            {featuredPromo && (
              <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row" style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))' }}>
                <div className="flex-1 p-6 text-white">
                  <Badge variant="cta" className="mb-3">⭐ Promo Unggulan</Badge>
                  <h3 className="font-display text-xl md:text-2xl mb-2">{featuredPromo.title}</h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{featuredPromo.description}</p>
                  {featuredPromo.promo_price && (
                    <div className="text-2xl font-bold mb-4">
                      {formatPrice(featuredPromo.promo_price)}
                      {featuredPromo.original_price && (
                        <s className="text-sm font-normal text-white/60 ml-2">{formatPrice(featuredPromo.original_price)}</s>
                      )}
                    </div>
                  )}
                  <Link href="/booking" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                    Klaim Sekarang
                  </Link>
                </div>
              </div>
            )}

            {/* Regular promos */}
            <div className="flex flex-col gap-4">
              {regularPromos.map((promo) => (
                <div key={promo.id} className="bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)] shadow-sm flex-1">
                  <Badge variant={promo.status === 'aktif' ? 'primary' : 'muted'} className="mb-2">
                    {promo.status === 'aktif' ? 'Aktif' : promo.status === 'member' ? 'Member' : 'Berakhir'}
                  </Badge>
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm mb-1">{promo.title}</h3>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 mb-3">{promo.description}</p>
                  {promo.promo_code && (
                    <code className="text-xs font-bold text-[var(--color-brand-primary)] bg-[var(--color-brand-light)] px-3 py-1 rounded-full">
                      {promo.promo_code}
                    </code>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link href="/promo" className="flex md:hidden items-center justify-center gap-1 mt-6 text-sm font-semibold text-[var(--color-brand-primary)]">
            Semua Promo <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── DOCTORS ────────────────────────────────────── */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-1 uppercase tracking-wider">Tim Dokter</p>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Ditangani Dokter Berpengalaman</h2>
            </div>
            <Link href="/dokter" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Semua Dokter <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-56 bg-[var(--color-brand-light)] relative overflow-hidden">
                  {doc.photo_url ? (
                    <Image src={doc.photo_url} alt={doc.name} fill className="object-cover object-top" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-display text-[var(--color-brand-primary)]/30">
                        {doc.name.split(' ').slice(-1)[0]?.[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <Badge variant="default" className="mb-2">{doc.specialty}</Badge>
                  <h3 className="font-semibold text-[var(--color-foreground)] mb-3">{doc.name}</h3>
                  <Link
                    href="/dokter"
                    className="flex items-center justify-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all"
                  >
                    Lihat Profil <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}

            {doctors.length === 0 && (
              <div className="md:col-span-3 py-12 text-center text-[var(--color-muted)] text-sm">
                Memuat data dokter...
              </div>
            )}
          </div>

          <Link href="/dokter" className="flex md:hidden items-center justify-center gap-1 mt-6 text-sm font-semibold text-[var(--color-brand-primary)]">
            Semua Dokter <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── ARTICLES ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-1 uppercase tracking-wider">Edukasi</p>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--color-foreground)]">Artikel Kesehatan Gigi</h2>
            </div>
            <Link href="/edukasi" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-2 transition-all">
              Semua Artikel <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link key={article.id} href={`/edukasi/${article.slug}`} className="bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 bg-[var(--color-brand-light)] relative overflow-hidden">
                  {article.thumbnail_url ? (
                    <Image
                      src={article.thumbnail_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Award size={40} className="text-[var(--color-brand-primary)]/30" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <Badge variant="default" className="mb-2 capitalize">{article.category}</Badge>
                  <h3 className="font-semibold text-[var(--color-foreground)] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[var(--color-brand-primary)] transition-colors">{article.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-subtle)]">
                    {article.read_time_mins && (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{article.read_time_mins} menit baca
                      </span>
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

      {/* ── INSURANCE ──────────────────────────────────── */}
      <section className="py-12 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container">
          <p className="text-center text-xs font-semibold text-[var(--color-subtle)] uppercase tracking-wider mb-6">
            Bekerjasama dengan Asuransi Terpercaya
          </p>
          <div className="flex justify-center">
            <InsuranceChips logos={INSURANCE} />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────── */}
      <section
        className="py-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #005f63 100%)' }}
      >
        <div className="container max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Siap untuk Senyum yang Lebih Sehat?</h2>
          <p className="text-white/80 mb-8">Buat janji temu sekarang dan dapatkan pemeriksaan gratis untuk kunjungan pertama Anda.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-brand-cta)] text-white font-bold rounded-full hover:opacity-90 transition-opacity"
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
    </>
  )
}
