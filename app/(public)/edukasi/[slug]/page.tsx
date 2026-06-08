import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react'
import { getArticleBySlug, getArticleSlugs, formatDate } from '@/lib/queries/articles'
import { getArticles } from '@/lib/queries/articles'
import { PageHero } from '@/components/ui/PageHero'
import { Badge } from '@/components/ui/Badge'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Artikel tidak ditemukan' }
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: article.thumbnail_url ? { images: [article.thumbnail_url] } : undefined,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, related] = await Promise.all([
    getArticleBySlug(slug),
    getArticles({ limit: 3 }),
  ])

  if (!article) notFound()

  const otherArticles = related.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        title={article.title}
        subtitle={article.excerpt ?? undefined}
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Edukasi', href: '/edukasi' },
          { label: article.title.slice(0, 30) + (article.title.length > 30 ? '...' : ''), href: `/edukasi/${slug}` },
        ]}
      />

      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Article content */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {article.thumbnail_url && (
                <div className="h-72 md:h-96 relative overflow-hidden">
                  <Image src={article.thumbnail_url} alt={article.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="default" className="capitalize">{article.category}</Badge>
                  {article.author && (
                    <span className="flex items-center gap-1 text-xs text-[var(--color-subtle)]">
                      <User size={12} />{article.author}
                    </span>
                  )}
                  {article.read_time_mins && (
                    <span className="flex items-center gap-1 text-xs text-[var(--color-subtle)]">
                      <Clock size={12} />{article.read_time_mins} menit baca
                    </span>
                  )}
                  {article.published_at && (
                    <span className="text-xs text-[var(--color-subtle)]">
                      {formatDate(article.published_at)}
                    </span>
                  )}
                </div>

                {/* Content */}
                {article.content ? (
                  <div
                    className="prose prose-sm max-w-none text-[var(--color-muted)] [&>h2]:font-display [&>h2]:text-[var(--color-foreground)] [&>h3]:font-semibold [&>h3]:text-[var(--color-foreground)] [&>a]:text-[var(--color-brand-primary)]"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                ) : (
                  <p className="text-[var(--color-muted)] leading-relaxed">{article.excerpt}</p>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* CTA */}
              <div className="bg-[var(--color-brand-primary)] text-white rounded-2xl p-6">
                <h3 className="font-display text-lg mb-2">Siap menjaga kesehatan gigi Anda?</h3>
                <p className="text-white/80 text-xs mb-4">Konsultasikan kondisi gigi Anda dengan dokter kami.</p>
                <Link
                  href="/booking"
                  className="flex items-center justify-center gap-2 py-2.5 bg-white text-[var(--color-brand-primary)] text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Calendar size={14} />
                  Buat Janji
                </Link>
              </div>

              {/* Related */}
              {otherArticles.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-sm text-[var(--color-foreground)] mb-4">Artikel Lainnya</h3>
                  <div className="space-y-4">
                    {otherArticles.map((a) => (
                      <Link key={a.id} href={`/edukasi/${a.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-brand-light)] shrink-0 relative">
                          {a.thumbnail_url && (
                            <Image src={a.thumbnail_url} alt={a.title} fill sizes="64px" className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[var(--color-foreground)] line-clamp-2 group-hover:text-[var(--color-brand-primary)] transition-colors">{a.title}</p>
                          {a.read_time_mins && <p className="text-[10px] text-[var(--color-subtle)] mt-1 flex items-center gap-1"><Clock size={10} />{a.read_time_mins} mnt</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link href="/edukasi" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-primary)] hover:gap-3 transition-all">
                <ArrowLeft size={14} />
                Semua Artikel
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
