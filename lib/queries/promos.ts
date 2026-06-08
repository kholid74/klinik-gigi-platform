import { createStaticClient } from '@/lib/supabase/static'
import type { Promo, PromoStatus } from '@/types'

export async function getPromos(filters?: {
  status?: PromoStatus
  featuredOnly?: boolean
  limit?: number
}): Promise<Promo[]> {
  try {
    const supabase = createStaticClient()
    let query = supabase
      .from('promos_with_status')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (filters?.featuredOnly) query = query.eq('is_featured', true)
    if (filters?.limit) query = query.limit(filters.limit)

    const { data, error } = await query
    if (error) throw error

    let promos = (data as Promo[]) ?? []

    if (filters?.status) {
      promos = promos.filter((p) => p.status === filters.status)
    }

    return promos
  } catch {
    return []
  }
}

export { formatPrice } from '@/lib/utils'
