import type { Metadata } from 'next'
import { getServices } from '@/lib/queries/services'
import { LayananManager } from '@/components/admin/LayananManager'

export const metadata: Metadata = { title: 'Layanan — Admin' }

export default async function AdminLayananPage() {
  const services = await getServices()
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl text-[var(--color-foreground)]">Manajemen Layanan</h2>
      <LayananManager services={services} />
    </div>
  )
}
