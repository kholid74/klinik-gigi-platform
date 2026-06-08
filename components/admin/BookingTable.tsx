'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { Booking, BookingStatus } from '@/types'
import { updateBookingStatus } from '@/lib/actions/admin'

const STATUSES: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Terkonfirmasi' },
  { value: 'completed', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
]

const STATUS_STYLE: Record<string, string> = {
  pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const STATUS_NEXT: Record<string, { value: string; label: string }[]> = {
  pending:   [{ value: 'confirmed', label: 'Konfirmasi' }, { value: 'cancelled', label: 'Batalkan' }],
  confirmed: [{ value: 'completed', label: 'Selesai' }, { value: 'cancelled', label: 'Batalkan' }],
  completed: [],
  cancelled: [],
}

function StatusDropdown({ booking }: { booking: Booking }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const actions = STATUS_NEXT[booking.status] ?? []

  if (actions.length === 0) {
    return (
      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full border capitalize ${STATUS_STYLE[booking.status] ?? ''}`}>
        {booking.status}
      </span>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border capitalize ${STATUS_STYLE[booking.status] ?? ''}`}
      >
        {booking.status}
        <ChevronDown size={10} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-border)] rounded-xl shadow-md z-10 min-w-[140px] py-1">
          {actions.map((action) => (
            <button
              key={action.value}
              onClick={() => {
                setOpen(false)
                startTransition(async () => {
                  await updateBookingStatus(booking.id, action.value)
                })
              }}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function BookingTable({ bookings, activeStatus }: { bookings: Booking[]; activeStatus?: string }) {
  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(({ value, label }) => (
          <Link
            key={value}
            href={value === 'all' ? '/admin/booking' : `/admin/booking?status=${value}`}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              (activeStatus ?? 'all') === value
                ? 'bg-[var(--color-brand-primary)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-brand-primary)]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
        {bookings.length === 0 ? (
          <div className="py-16 text-center text-[var(--color-muted)]">
            <p className="text-sm">Tidak ada booking di kategori ini</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                <tr>
                  {['Kode', 'Pasien', 'Layanan / Dokter', 'Jadwal', 'Status', 'Aksi'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-muted)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[var(--color-surface)/50] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-[var(--color-brand-primary)]">{b.booking_code}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-xs text-[var(--color-foreground)]">{b.patient_name}</p>
                      <p className="text-[10px] text-[var(--color-subtle)]">{b.patient_phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-[var(--color-foreground)]">{b.service?.name ?? '–'}</p>
                      <p className="text-[10px] text-[var(--color-subtle)]">{b.doctor?.name ?? '–'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-[var(--color-foreground)]">{b.booking_date}</p>
                      <p className="text-[10px] text-[var(--color-subtle)]">{b.booking_time.slice(0, 5)} WIB</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusDropdown booking={b} />
                    </td>
                    <td className="px-4 py-3 text-[10px] text-[var(--color-subtle)]">
                      {b.patient_notes && (
                        <p className="max-w-[120px] truncate" title={b.patient_notes}>{b.patient_notes}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
