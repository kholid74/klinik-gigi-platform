'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Calendar } from 'lucide-react'
import { ToothIcon } from '@/components/ui/ToothIcon'

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/dokter', label: 'Dokter' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/promo', label: 'Promo' },
  { href: '/edukasi', label: 'Edukasi' },
  { href: '/kontak', label: 'Kontak' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--color-border)] shadow-xs">
      <div className="container">
        <div className="flex items-center justify-between h-[72px] gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl text-[var(--color-brand-primary)] shrink-0"
          >
            <ToothIcon size={26} className="text-[var(--color-brand-primary)]" />
            <span className="font-display">Senyum Sehat</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center justify-center gap-6 flex-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`py-2 text-base font-medium whitespace-nowrap transition-colors border-b-2 ${
                    isActive(href)
                      ? 'text-[var(--color-brand-primary)] border-[var(--color-brand-primary)] font-semibold'
                      : 'text-[var(--color-muted)] border-transparent hover:text-[var(--color-brand-primary)]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/booking"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-cta)] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-cta shrink-0"
          >
            <Calendar size={15} />
            Buat Janji
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--color-border)] pt-2">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive(href)
                        ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-light)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-[var(--color-brand-cta)] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
                >
                  <Calendar size={15} />
                  Buat Janji Sekarang
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
