import Link from 'next/link'
import { MapPin, Phone, Mail, Share2, Users, Play } from 'lucide-react'
import { SITE_CONTACT } from '@/lib/site'
import { ToothIcon } from '@/components/ui/ToothIcon'

const LAYANAN_LINKS = [
  { href: '/layanan', label: 'Semua Layanan' },
  { href: '/layanan#pemeriksaan', label: 'Pemeriksaan Rutin' },
  { href: '/layanan#scaling', label: 'Scaling & Polishing' },
  { href: '/layanan#whitening', label: 'Teeth Whitening' },
  { href: '/layanan#ortodonti', label: 'Ortodonti / Behel' },
  { href: '/layanan#implant', label: 'Implan Gigi' },
]

const INFO_LINKS = [
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/dokter', label: 'Tim Dokter' },
  { href: '/promo', label: 'Promo & Diskon' },
  { href: '/edukasi', label: 'Artikel Kesehatan' },
  { href: '/kontak', label: 'Kontak' },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-foreground)] text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <ToothIcon size={26} className="text-[var(--color-brand-secondary)]" />
              <span className="font-display text-[var(--color-brand-secondary)]">
                Senyum Sehat
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Klinik gigi terpercaya di Bandung dengan layanan lengkap dan dokter berpengalaman.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: 'https://instagram.com/senyumsehatid', label: 'Instagram' },
                { icon: Users, href: 'https://facebook.com/senyumsehatid', label: 'Facebook' },
                { icon: Play, href: 'https://youtube.com/@senyumsehatid', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--color-brand-secondary)] flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Layanan
            </h3>
            <ul className="space-y-2">
              {LAYANAN_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Informasi
            </h3>
            <ul className="space-y-2">
              {INFO_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-white/70">
                <MapPin size={16} className="shrink-0 mt-0.5 text-[var(--color-brand-secondary)]" />
                {SITE_CONTACT.address}
              </li>
              <li>
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="flex gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0 mt-0.5 text-[var(--color-brand-secondary)]" />
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="flex gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0 mt-0.5 text-[var(--color-brand-secondary)]" />
                  {SITE_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © 2026 Klinik Gigi Senyum Sehat. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="/privasi" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
