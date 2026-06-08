'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UserRound,
  Stethoscope,
  Tag,
  BookOpen,
  CalendarCheck,
  MessageSquare,
  LogOut,
  X,
} from 'lucide-react'

const NAV = [
  {
    group: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Konten',
    items: [
      { href: '/admin/dokter', label: 'Dokter', icon: UserRound },
      { href: '/admin/layanan', label: 'Layanan', icon: Stethoscope },
      { href: '/admin/promo', label: 'Promo', icon: Tag },
      { href: '/admin/artikel', label: 'Artikel', icon: BookOpen },
    ],
  },
  {
    group: 'Operasional',
    items: [
      { href: '/admin/booking', label: 'Booking', icon: CalendarCheck },
      { href: '/admin/pesan', label: 'Pesan Kontak', icon: MessageSquare },
    ],
  },
]

interface AdminSidebarProps {
  open?: boolean
  onClose?: () => void
  userEmail?: string
}

export function AdminSidebar({ open = true, onClose, userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {onClose && open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col bg-[var(--color-foreground)] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div>
            <p className="font-display text-lg text-white leading-tight">Senyum Sehat</p>
            <p className="text-[10px] text-white/40 font-sans">Admin Panel</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map(({ group, items }) => (
            <div key={group} className="mb-1">
              <p className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                {group}
              </p>
              {items.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors relative ${
                    isActive(href)
                      ? 'text-white bg-[var(--color-brand-secondary)]/15'
                      : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  {isActive(href) && (
                    <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-[var(--color-brand-secondary)] rounded-r" />
                  )}
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-xs font-bold text-white shrink-0">
            {userEmail?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{userEmail ?? 'Admin'}</p>
            <p className="text-[10px] text-white/40">Administrator</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-white/40 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
