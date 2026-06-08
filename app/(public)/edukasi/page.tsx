import type { Metadata } from 'next'
import { getArticles } from '@/lib/queries/articles'
import { PageHero } from '@/components/ui/PageHero'
import { ArticleFilter } from '@/components/edukasi/ArticleFilter'

export const metadata: Metadata = {
  title: 'Edukasi Kesehatan Gigi',
  description: 'Tips dan panduan merawat kesehatan gigi dari para dokter Senyum Sehat — dari cara sikat gigi yang benar hingga pentingnya rutin kontrol.',
}

export const revalidate = 60

export default async function EdukasiPage() {
  const articles = await getArticles()

  return (
    <>
      <PageHero
        title="Edukasi Kesehatan Gigi"
        subtitle="Tips, panduan, dan informasi kesehatan gigi dari para dokter kami untuk membantu Anda menjaga senyum terbaik."
        breadcrumb={[{ label: 'Beranda', href: '/' }, { label: 'Edukasi', href: '/edukasi' }]}
      />

      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <ArticleFilter articles={articles} />
        </div>
      </section>
    </>
  )
}
