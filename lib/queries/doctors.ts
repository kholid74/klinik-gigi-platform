import { createClient } from '@/lib/supabase/server'
import type { Doctor, DoctorSchedule, TimeSlot } from '@/types'

export async function getDoctors(filters?: {
  specialty?: string
  isActive?: boolean
  limit?: number
}): Promise<Doctor[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('doctors')
      .select('id, name, slug, specialty, bio, education, certifications, photo_url, is_active')
      .order('name')

    if (filters?.isActive !== undefined) query = query.eq('is_active', filters.isActive)
    if (filters?.specialty) query = query.eq('specialty', filters.specialty)
    if (filters?.limit) query = query.limit(filters.limit)

    const { data, error } = await query
    if (error) throw error
    return (data as Doctor[]) ?? []
  } catch {
    return []
  }
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data as Doctor
  } catch {
    return null
  }
}

export async function getDoctorSchedules(doctorId: string): Promise<DoctorSchedule[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('doctor_schedules')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('is_active', true)
      .order('day_of_week')

    if (error) throw error
    return (data as DoctorSchedule[]) ?? []
  } catch {
    return []
  }
}

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export async function getDoctorAvailableSlots(
  doctorId: string,
  date: string,
): Promise<TimeSlot[]> {
  try {
    const supabase = await createClient()
    const dayOfWeek = new Date(date).getDay()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: schedule } = await (supabase as any)
      .from('doctor_schedules')
      .select('start_time, end_time, slot_duration_mins')
      .eq('doctor_id', doctorId)
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true)
      .single() as { data: { start_time: string; end_time: string; slot_duration_mins: number } | null }

    if (!schedule) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabase as any)
      .from('bookings')
      .select('booking_time')
      .eq('doctor_id', doctorId)
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed']) as { data: { booking_time: string }[] | null }

    const bookedTimes = new Set(
      (existing ?? []).map((b) => b.booking_time.slice(0, 5)),
    )

    return generateSlots(
      schedule.start_time,
      schedule.end_time,
      schedule.slot_duration_mins,
      bookedTimes,
    )
  } catch {
    return []
  }
}

function generateSlots(
  startTime: string,
  endTime: string,
  durationMins: number,
  bookedTimes: Set<string>,
): TimeSlot[] {
  const slots: TimeSlot[] = []
  let [h, m] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  const endTotal = eh * 60 + em

  while (h * 60 + m + durationMins <= endTotal) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    slots.push({ time, available: !bookedTimes.has(time) })
    m += durationMins
    if (m >= 60) { h += Math.floor(m / 60); m = m % 60 }
  }
  return slots
}

export { DAY_NAMES }
