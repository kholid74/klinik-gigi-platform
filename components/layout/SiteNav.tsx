'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Calendar } from 'lucide-react'

const NAV_LINKS = [
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
    <nav className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-[var(--color-brand-primary)] shrink-0"
          >
            <span className="text-2xl">🦷</span>
            <span className="font-display">Senyum Sehat</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-light)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)]'
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
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-cta)] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            <Calendar size={15} />
            Buat Janji
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[var(--color-muted)] hover:bg-[var(--color-surface)] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--color-border)] pt-2">
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
