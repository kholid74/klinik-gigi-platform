import type { MetadataRoute } from 'next'
import { getArticleSlugs } from '@/lib/queries/articles'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://senyumsehat.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleSlugs = await getArticleSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/dokter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/layanan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/promo`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/edukasi`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/booking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map(({ slug }) => ({
    url: `${BASE}/edukasi/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes]
}
