import { NextRequest, NextResponse } from 'next/server'
import { getDoctorAvailableSlots } from '@/lib/queries/doctors'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const doctorId = searchParams.get('doctorId')
  const date = searchParams.get('date')

  if (!doctorId || !date) {
    return NextResponse.json({ error: 'Missing doctorId or date' }, { status: 400 })
  }

  const slots = await getDoctorAvailableSlots(doctorId, date)
  return NextResponse.json(slots)
}
