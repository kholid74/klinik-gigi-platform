import { createStaticClient } from '@/lib/supabase/static'
import type { Service, ServiceCategory } from '@/types'

export async function getServices(filters?: {
  category?: ServiceCategory
  isActive?: boolean
  limit?: number
}): Promise<Service[]> {
  try {
    const supabase = createStaticClient()
    let query = supabase
      .from('services')
      .select('*')
      .order('sort_order')

    if (filters?.isActive !== undefined) query = query.eq('is_active', filters.isActive)
    if (filters?.category) query = query.eq('category', filters.category)
    if (filters?.limit) query = query.limit(filters.limit)

    const { data, error } = await query
    if (error) throw error
    return (data as Service[]) ?? []
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const supabase = createStaticClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data as Service
  } catch {
    return null
  }
}

export { SERVICE_CATEGORIES } from '@/lib/utils'
