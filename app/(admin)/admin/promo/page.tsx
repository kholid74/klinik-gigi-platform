import type { Metadata } from 'next'
import { getPromos } from '@/lib/queries/promos'
import { PromoManager } from '@/components/admin/PromoManager'

export const metadata: Metadata = { title: 'Promo — Admin' }

export default async function AdminPromoPage() {
  const promos = await getPromos()
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl text-[var(--color-foreground)]">Manajemen Promo</h2>
      <PromoManager promos={promos} />
    </div>
  )
}
