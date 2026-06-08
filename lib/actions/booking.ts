'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'

const bookingSchema = z.object({
  serviceId: z.string().uuid(),
  doctorId: z.string().uuid(),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bookingTime: z.string().regex(/^\d{2}:\d{2}$/),
  patientName: z.string().min(3, 'Nama minimal 3 karakter'),
  patientPhone: z
    .string()
    .regex(/^(\+62|08)\d{8,11}$/, 'Format nomor HP tidak valid (contoh: 08123456789)'),
  patientEmail: z.string().email().optional().or(z.literal('')),
  patientNotes: z.string().max(500).optional(),
})

export type BookingInput = z.infer<typeof bookingSchema>

export async function createBooking(
  input: BookingInput,
): Promise<ActionResult<{ bookingCode: string }>> {
  const parsed = bookingSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data tidak valid' }
  }

  try {
    const supabase = await createClient()
    const d = parsed.data

    // Check slot availability
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('doctor_id', d.doctorId)
      .eq('booking_date', d.bookingDate)
      .eq('booking_time', d.bookingTime + ':00')
      .in('status', ['pending', 'confirmed'])

    if (existing && existing.length > 0) {
      return { error: 'Slot ini sudah tidak tersedia. Silakan pilih waktu lain.' }
    }

    const bookingCode = await generateBookingCode(supabase)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from('bookings').insert({
      booking_code: bookingCode,
      patient_name: d.patientName,
      patient_phone: d.patientPhone,
      patient_email: d.patientEmail || null,
      patient_notes: d.patientNotes || null,
      service_id: d.serviceId,
      doctor_id: d.doctorId,
      booking_date: d.bookingDate,
      booking_time: d.bookingTime + ':00',
      status: 'pending',
    } as any)

    if (error) throw error

    redirect(`/booking/sukses?code=${bookingCode}`)
  } catch (e) {
    if (e instanceof Error && e.message.includes('NEXT_REDIRECT')) throw e
    return { error: 'Gagal membuat booking. Silakan coba lagi.' }
  }
}

async function generateBookingCode(supabase: Awaited<ReturnType<typeof createClient>>) {
  const today = new Date().toISOString().slice(0, 10)
  const { count } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', `${today}T00:00:00Z`)

  const seq = String((count ?? 0) + 1).padStart(4, '0')
  return `SS-${today.replace(/-/g, '')}-${seq}`
}
