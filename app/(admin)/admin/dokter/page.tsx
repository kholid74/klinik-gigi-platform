import type { Metadata } from 'next'
import { getDoctors } from '@/lib/queries/doctors'
import { DokterManager } from '@/components/admin/DokterManager'

export const metadata: Metadata = { title: 'Dokter — Admin' }

export default async function AdminDokterPage() {
  const doctors = await getDoctors()
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl text-[var(--color-foreground)]">Manajemen Dokter</h2>
      <DokterManager doctors={doctors} />
    </div>
  )
}
