import type { Metadata } from 'next'
import { getBookings } from '@/lib/queries/admin'
import { BookingTable } from '@/components/admin/BookingTable'

export const metadata: Metadata = { title: 'Booking — Admin' }

export default async function AdminBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const bookings = await getBookings({ status, limit: 50 })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl text-[var(--color-foreground)]">Manajemen Booking</h2>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">{bookings.length} booking ditemukan</p>
      </div>
      <BookingTable bookings={bookings} activeStatus={status} />
    </div>
  )
}
