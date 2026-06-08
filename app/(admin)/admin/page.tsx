import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarCheck, Clock, MessageSquare, UserRound, ChevronRight } from 'lucide-react'
import { getDashboardStats, getBookings, getContactMessages } from '@/lib/queries/admin'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard — Admin Senyum Sehat' }

const STATUS_STYLE: Record<string, string> = {
  pending:   'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

export default async function AdminDashboardPage() {
  const [stats, recentBookings, unreadMessages] = await Promise.all([
    getDashboardStats(),
    getBookings({ limit: 6 }),
    getContactMessages({ isRead: false, limit: 5 }),
  ])

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <p className="text-xs text-[var(--color-subtle)]">{today}</p>
        <h2 className="font-display text-2xl text-[var(--color-foreground)]">Selamat datang kembali 👋</h2>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Booking Hari Ini', value: stats.bookingToday, icon: CalendarCheck, color: 'text-[var(--color-brand-primary)]', bg: 'bg-[var(--color-brand-light)]', href: '/admin/booking' },
          { label: 'Menunggu Konfirmasi', value: stats.bookingPending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', href: '/admin/booking?status=pending' },
          { label: 'Pesan Belum Dibaca', value: stats.unreadMessages, icon: MessageSquare, color: 'text-[var(--color-brand-cta)]', bg: 'bg-orange-50', href: '/admin/pesan' },
          { label: 'Dokter Aktif', value: stats.totalDoctors, icon: UserRound, color: 'text-purple-600', bg: 'bg-purple-50', href: '/admin/dokter' },
        ].map((tile) => (
          <Link key={tile.label} href={tile.href} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 rounded-xl ${tile.bg} flex items-center justify-center mb-3`}>
              <tile.icon size={20} className={tile.color} />
            </div>
            <p className="text-3xl font-bold text-[var(--color-foreground)]">{tile.value}</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">{tile.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h3 className="font-semibold text-sm text-[var(--color-foreground)]">Booking Terbaru</h3>
            <Link href="/admin/booking" className="text-xs font-semibold text-[var(--color-brand-primary)] flex items-center gap-0.5 hover:gap-1 transition-all">
              Lihat semua <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {recentBookings.length === 0 ? (
              <p className="py-8 text-center text-xs text-[var(--color-subtle)]">Belum ada booking</p>
            ) : (
              recentBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-xs font-bold text-[var(--color-brand-primary)] shrink-0">
                    {b.patient_name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{b.patient_name}</p>
                    <p className="text-xs text-[var(--color-muted)] truncate">
                      {b.service?.name ?? '–'} · {b.booking_date} {b.booking_time.slice(0, 5)}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${STATUS_STYLE[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Unread Messages */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h3 className="font-semibold text-sm text-[var(--color-foreground)]">Pesan Belum Dibaca</h3>
            <Link href="/admin/pesan" className="text-xs font-semibold text-[var(--color-brand-primary)] flex items-center gap-0.5 hover:gap-1 transition-all">
              Semua <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {unreadMessages.length === 0 ? (
              <p className="py-8 text-center text-xs text-[var(--color-subtle)]">Tidak ada pesan baru</p>
            ) : (
              unreadMessages.map((msg) => (
                <div key={msg.id} className="px-5 py-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-brand-cta)] shrink-0" />
                    <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{msg.name}</p>
                    <span className="ml-auto text-[10px] text-[var(--color-subtle)] shrink-0">
                      {msg.created_at ? formatDate(msg.created_at) : ''}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2 pl-4">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
