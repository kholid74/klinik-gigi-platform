import type { Metadata } from 'next'
import { getArticles } from '@/lib/queries/articles'
import { ArtikelManager } from '@/components/admin/ArtikelManager'

export const metadata: Metadata = { title: 'Artikel — Admin' }

export default async function AdminArtikelPage() {
  const articles = await getArticles()
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl text-[var(--color-foreground)]">Manajemen Artikel</h2>
      <ArtikelManager articles={articles} />
    </div>
  )
}
