'use client'

import { useState, useTransition } from 'react'
import type { Promo } from '@/types'
import { AdminTable } from './AdminTable'
import { AdminModal } from './AdminModal'
import { Badge } from '@/components/ui/Badge'
import { upsertPromo, deletePromo } from '@/lib/actions/admin'
import { formatPrice } from '@/lib/utils'

function PromoForm({ promo, onClose }: { promo?: Promo; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (promo) fd.set('id', promo.id)
    startTransition(async () => {
      const result = await upsertPromo(fd)
      if (result.error) { setError(result.error); return }
      onClose()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {error && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Judul Promo <span className="text-[var(--color-brand-cta)]">*</span></label>
        <input name="title" required defaultValue={promo?.title ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Deskripsi</label>
        <textarea name="description" rows={2} defaultValue={promo?.description ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Tipe Diskon</label>
          <select name="discount_type" defaultValue={promo?.discount_type ?? 'percentage'} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]">
            <option value="percentage">Persentase (%)</option>
            <option value="fixed">Nominal (Rp)</option>
            <option value="free">Gratis</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Nilai Diskon</label>
          <input name="discount_value" type="number" defaultValue={promo?.discount_value ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Tanggal Mulai</label>
          <input name="start_date" type="date" required defaultValue={promo?.start_date ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Tanggal Berakhir</label>
          <input name="end_date" type="date" required defaultValue={promo?.end_date ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Kode Promo</label>
          <input name="promo_code" defaultValue={promo?.promo_code ?? ''} placeholder="DISKON20" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Maks. Klaim</label>
          <input name="max_claims" type="number" defaultValue={promo?.max_claims ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Eligibility</label>
        <select name="eligibility" defaultValue={promo?.eligibility ?? 'all'} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]">
          <option value="all">Semua Pasien</option>
          <option value="new_patient">Pasien Baru</option>
          <option value="member">Member Only</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">URL Gambar</label>
        <input name="image_url" type="url" defaultValue={promo?.image_url ?? ''} placeholder="https://..." className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Syarat & Ketentuan (JSON array)</label>
        <textarea name="terms" rows={2} defaultValue={JSON.stringify(promo?.terms ?? [])} placeholder='["Berlaku untuk pasien baru"]' className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="is_featured" value="true" defaultChecked={promo?.is_featured ?? false} id="promo-featured" className="rounded" />
        <label htmlFor="promo-featured" className="text-xs font-semibold text-[var(--color-foreground)]">Promo Unggulan</label>
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

const STATUS_VARIANT: Record<string, 'primary' | 'cta' | 'muted'> = {
  aktif: 'primary', member: 'cta', berakhir: 'muted',
}

export function PromoManager({ promos }: { promos: Promo[] }) {
  const [modal, setModal] = useState<{ open: boolean; promo?: Promo }>({ open: false })

  return (
    <>
      <AdminTable
        title="Daftar Promo"
        rows={promos}
        columns={[
          {
            key: 'title', label: 'Promo',
            render: (p) => (
              <div>
                <p className="text-xs font-bold text-[var(--color-foreground)]">{p.title}</p>
                {p.promo_code && <p className="text-[10px] font-mono text-[var(--color-brand-primary)] mt-0.5">{p.promo_code}</p>}
              </div>
            ),
          },
          {
            key: 'discount', label: 'Diskon',
            render: (p) => (
              <p className="text-xs text-[var(--color-foreground)]">
                {p.discount_type === 'percentage' ? `${p.discount_value}%` :
                  p.discount_type === 'free' ? 'GRATIS' :
                  p.discount_value ? formatPrice(p.discount_value) : '–'}
              </p>
            ),
          },
          {
            key: 'date', label: 'Periode',
            render: (p) => <p className="text-[10px] text-[var(--color-muted)]">{p.start_date} – {p.end_date}</p>,
          },
          {
            key: 'status', label: 'Status',
            render: (p) => <Badge variant={STATUS_VARIANT[p.status] ?? 'muted'} className="capitalize">{p.status}</Badge>,
          },
        ]}
        onNew={() => setModal({ open: true })}
        onEdit={(p) => setModal({ open: true, promo: p })}
        onDelete={async (id) => { await deletePromo(id) }}
        newLabel="Tambah Promo"
      />

      <AdminModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.promo ? 'Edit Promo' : 'Tambah Promo'}
      >
        <PromoForm promo={modal.promo} onClose={() => setModal({ open: false })} />
      </AdminModal>
    </>
  )
}
