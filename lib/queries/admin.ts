import { createClient } from '@/lib/supabase/server'
import type { Booking, ContactMessage } from '@/types'

export async function getBookings(filters?: {
  status?: string
  limit?: number
  offset?: number
}): Promise<Booking[]> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from('bookings')
      .select(`
        id, booking_code, patient_name, patient_phone, patient_email,
        patient_notes, booking_date, booking_time, status, admin_notes,
        created_at, updated_at,
        service:service_id(id, name, category),
        doctor:doctor_id(id, name, specialty)
      `)
      .order('booking_date', { ascending: false })
      .order('booking_time', { ascending: true })

    if (filters?.status) query = query.eq('status', filters.status)
    if (filters?.limit) query = query.limit(filters.limit)
    if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit ?? 20) - 1)

    const { data, error } = await query
    if (error) throw error
    return (data as Booking[]) ?? []
  } catch {
    return []
  }
}

export async function getDashboardStats() {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().slice(0, 10)

    const [bookingToday, bookingPending, unreadMessages, totalDoctors] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('bookings').select('*', { count: 'exact', head: true }).eq('booking_date', today),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('doctors').select('*', { count: 'exact', head: true }).eq('is_active', true),
    ])

    return {
      bookingToday: bookingToday.count ?? 0,
      bookingPending: bookingPending.count ?? 0,
      unreadMessages: unreadMessages.count ?? 0,
      totalDoctors: totalDoctors.count ?? 0,
    }
  } catch {
    return { bookingToday: 0, bookingPending: 0, unreadMessages: 0, totalDoctors: 0 }
  }
}

export async function getContactMessages(filters?: {
  isRead?: boolean
  limit?: number
}): Promise<ContactMessage[]> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.isRead !== undefined) query = query.eq('is_read', filters.isRead)
    if (filters?.limit) query = query.limit(filters.limit)

    const { data, error } = await query
    if (error) throw error
    return (data as ContactMessage[]) ?? []
  } catch {
    return []
  }
}
