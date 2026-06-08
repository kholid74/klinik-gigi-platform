'use client'

import { useState, useTransition } from 'react'
import type { Article, ArticleCategory } from '@/types'
import { AdminTable } from './AdminTable'
import { AdminModal } from './AdminModal'
import { Badge } from '@/components/ui/Badge'
import { upsertArticle, deleteArticle } from '@/lib/actions/admin'
import { formatDate } from '@/lib/utils'

const CATEGORIES: ArticleCategory[] = ['perawatan', 'anak', 'estetik', 'nutrisi', 'tips']

function ArtikelForm({ article, onClose }: { article?: Article; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (article) fd.set('id', article.id)
    startTransition(async () => {
      const result = await upsertArticle(fd)
      if (result.error) { setError(result.error); return }
      onClose()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {error && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Judul <span className="text-[var(--color-brand-cta)]">*</span></label>
        <input name="title" required defaultValue={article?.title ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Kategori <span className="text-[var(--color-brand-cta)]">*</span></label>
        <select name="category" required defaultValue={article?.category ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]">
          <option value="">Pilih kategori...</option>
          {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Ringkasan</label>
        <textarea name="excerpt" rows={2} defaultValue={article?.excerpt ?? ''} placeholder="Ringkasan artikel untuk tampilan daftar..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Konten (HTML)</label>
        <textarea name="content" rows={6} defaultValue={article?.content ?? ''} placeholder="<p>Konten artikel...</p>" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-y" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">URL Thumbnail</label>
        <input name="thumbnail_url" type="url" defaultValue={article?.thumbnail_url ?? ''} placeholder="https://..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Penulis</label>
          <input name="author" defaultValue={article?.author ?? 'Tim Senyum Sehat'} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Estimasi Baca (menit)</label>
          <input name="read_time_mins" type="number" defaultValue={article?.read_time_mins ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" value="true" defaultChecked={article?.is_published ?? false} id="art-pub" className="rounded" />
          <label htmlFor="art-pub" className="text-xs font-semibold text-[var(--color-foreground)]">Publikasikan</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_featured" value="true" defaultChecked={article?.is_featured ?? false} id="art-feat" className="rounded" />
          <label htmlFor="art-feat" className="text-xs font-semibold text-[var(--color-foreground)]">Unggulan</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-semibold text-[var(--color-muted)] hover:bg-[var(--color-surface)]">Batal</button>
        <button type="submit" disabled={isPending} className="flex-1 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-60">
          {isPending ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}

export function ArtikelManager({ articles }: { articles: Article[] }) {
  const [modal, setModal] = useState<{ open: boolean; article?: Article }>({ open: false })

  return (
    <>
      <AdminTable
        title="Daftar Artikel"
        rows={articles}
        columns={[
          {
            key: 'title', label: 'Artikel',
            render: (a) => (
              <div>
                <p className="text-xs font-bold text-[var(--color-foreground)] line-clamp-1">{a.title}</p>
                <p className="text-[10px] text-[var(--color-subtle)]">{a.author}</p>
              </div>
            ),
          },
          {
            key: 'category', label: 'Kategori',
            render: (a) => <Badge variant="default" className="capitalize">{a.category}</Badge>,
          },
          {
            key: 'status', label: 'Status',
            render: (a) => (
              <div className="flex gap-1">
                <Badge variant={a.is_published ? 'primary' : 'muted'}>{a.is_published ? 'Publik' : 'Draft'}</Badge>
                {a.is_featured && <Badge variant="cta">⭐</Badge>}
              </div>
            ),
          },
          {
            key: 'published_at', label: 'Tanggal',
            render: (a) => <p className="text-[10px] text-[var(--color-subtle)]">{a.published_at ? formatDate(a.published_at) : '–'}</p>,
          },
        ]}
        onNew={() => setModal({ open: true })}
        onEdit={(a) => setModal({ open: true, article: a })}
        onDelete={async (id) => { await deleteArticle(id) }}
        newLabel="Tambah Artikel"
      />

      <AdminModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.article ? 'Edit Artikel' : 'Tambah Artikel'}
      >
        <ArtikelForm article={modal.article} onClose={() => setModal({ open: false })} />
      </AdminModal>
    </>
  )
}
