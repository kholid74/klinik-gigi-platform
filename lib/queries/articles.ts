import { createStaticClient } from '@/lib/supabase/static'
import type { Article, ArticleCategory } from '@/types'

export async function getArticles(filters?: {
  category?: ArticleCategory
  featuredOnly?: boolean
  limit?: number
  offset?: number
}): Promise<Article[]> {
  try {
    const supabase = createStaticClient()
    let query = supabase
      .from('articles')
      .select('id, title, slug, excerpt, category, thumbnail_url, author, read_time_mins, is_featured, published_at, created_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (filters?.featuredOnly) query = query.eq('is_featured', true)
    if (filters?.category) query = query.eq('category', filters.category)
    if (filters?.limit) query = query.limit(filters.limit)
    if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit ?? 10) - 1)

    const { data, error } = await query
    if (error) throw error
    return (data as Article[]) ?? []
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = createStaticClient()
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) throw error
    return data as Article
  } catch {
    return null
  }
}

export async function getArticleSlugs(): Promise<{ slug: string }[]> {
  try {
    const supabase = createStaticClient()
    const { data, error } = await supabase
      .from('articles')
      .select('slug')
      .eq('is_published', true)

    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export { ARTICLE_CATEGORIES, formatDate } from '@/lib/utils'
