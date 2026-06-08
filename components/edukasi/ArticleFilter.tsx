'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import type { Article, ArticleCategory } from '@/types'
import { TabBar } from '@/components/ui/TabBar'
import { Badge } from '@/components/ui/Badge'
import { ARTICLE_CATEGORIES, formatDate } from '@/lib/utils'

export function ArticleFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<ArticleCategory | 'semua'>('semua')

  const filtered = active === 'semua' ? articles : articles.filter((a) => a.category === active)
  const featured = filtered.find((a) => a.is_featured) ?? filtered[0] ?? null
  const regular = filtered.filter((a) => a.id !== featured?.id)

  return (
    <>
      <TabBar tabs={ARTICLE_CATEGORIES} active={active} onChange={setActive} />

      <div className="mt-8 space-y-8">
        {/* Featured article */}
        {featured && (
          <Link
            href={`/edukasi/${featured.slug}`}
            className="group flex flex-col md:flex-row gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden bg-[var(--color-brand-light)]">
              {featured.thumbnail_url ? (
                <Image
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🦷</span>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <Badge variant="cta">⭐ Unggulan</Badge>
              </div>
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col">
              <Badge variant="default" className="self-start mb-3 capitalize">{featured.category}</Badge>
              <h2 className="font-display text-xl md:text-2xl text-[var(--color-foreground)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3 flex-1">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-4 text-xs text-[var(--color-subtle)]">
                {featured.author && (
                  <span className="flex items-center gap-1">
                    <User size={12} />{featured.author}
                  </span>
                )}
                {featured.read_time_mins && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />{featured.read_time_mins} menit baca
                  </span>
                )}
                {featured.published_at && <span>{formatDate(featured.published_at)}</span>}
              </div>
            </div>
          </Link>
        )}

        {/* Regular articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((article) => (
            <Link
              key={article.id}
              href={`/edukasi/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative overflow-hidden bg-[var(--color-brand-light)]">
                {article.thumbnail_url ? (
                  <Image
                    src={article.thumbnail_url}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">🦷</div>
                )}
              </div>
              <div className="p-5">
                <Badge variant="default" className="mb-2 capitalize">{article.category}</Badge>
                <h3 className="font-semibold text-[var(--color-foreground)] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[var(--color-brand-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--color-subtle)]">
                  {article.read_time_mins && (
                    <span className="flex items-center gap-1"><Clock size={11} />{article.read_time_mins} mnt</span>
                  )}
                  {article.published_at && <span>{formatDate(article.published_at)}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[var(--color-muted)]">
            <div className="text-4xl mb-3">📚</div>
            <p className="font-semibold">Belum ada artikel di kategori ini</p>
          </div>
        )}
      </div>
    </>
  )
}
