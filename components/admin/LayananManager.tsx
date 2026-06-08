'use client'

import { useState, useTransition } from 'react'
import type { Service, ServiceCategory } from '@/types'
import { AdminTable } from './AdminTable'
import { AdminModal } from './AdminModal'
import { Badge } from '@/components/ui/Badge'
import { upsertService, deleteService } from '@/lib/actions/admin'
import { formatPrice } from '@/lib/utils'

const CATEGORIES: ServiceCategory[] = ['preventif', 'restoratif', 'ortodonti', 'bedah', 'estetik', 'anak', 'darurat']

function LayananForm({ service, onClose }: { service?: Service; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (service) fd.set('id', service.id)
    startTransition(async () => {
      const result = await upsertService(fd)
      if (result.error) { setError(result.error); return }
      onClose()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Nama Layanan <span className="text-[var(--color-brand-cta)]">*</span></label>
        <input name="name" required defaultValue={service?.name ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Kategori <span className="text-[var(--color-brand-cta)]">*</span></label>
        <select name="category" required defaultValue={service?.category ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]">
          <option value="">Pilih kategori...</option>
          {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Deskripsi Singkat</label>
        <input name="short_desc" defaultValue={service?.short_desc ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Harga Min (Rp)</label>
          <input name="price_min" type="number" defaultValue={service?.price_min ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Harga Max (Rp)</label>
          <input name="price_max" type="number" defaultValue={service?.price_max ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Durasi (menit)</label>
          <input name="duration_mins" type="number" defaultValue={service?.duration_mins ?? ''} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Urutan</label>
          <input name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Icon (emoji)</label>
        <input name="icon_name" defaultValue={service?.icon_name ?? ''} placeholder="🦷" className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Manfaat (JSON array)</label>
        <textarea name="benefits" rows={2} defaultValue={JSON.stringify(service?.benefits ?? [])} placeholder='["Manfaat 1", "Manfaat 2"]' className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="is_active" value="true" defaultChecked={service?.is_active ?? true} id="svc-active" className="rounded" />
        <label htmlFor="svc-active" className="text-xs font-semibold text-[var(--color-foreground)]">Layanan Aktif</label>
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

export function LayananManager({ services }: { services: Service[] }) {
  const [modal, setModal] = useState<{ open: boolean; service?: Service }>({ open: false })

  return (
    <>
      <AdminTable
        title="Daftar Layanan"
        rows={services}
        columns={[
          {
            key: 'name', label: 'Layanan',
            render: (s) => (
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon_name ?? '🦷'}</span>
                <div>
                  <p className="text-xs font-bold text-[var(--color-foreground)]">{s.name}</p>
                  <p className="text-[10px] text-[var(--color-subtle)] capitalize">{s.category}</p>
                </div>
              </div>
            ),
          },
          {
            key: 'price', label: 'Harga',
            render: (s) => (
              <p className="text-xs text-[var(--color-foreground)]">
                {s.price_min ? formatPrice(s.price_min) : '–'}
                {s.price_max && s.price_max !== s.price_min ? ` – ${formatPrice(s.price_max)}` : ''}
              </p>
            ),
          },
          {
            key: 'is_active', label: 'Status',
            render: (s) => <Badge variant={s.is_active ? 'primary' : 'muted'}>{s.is_active ? 'Aktif' : 'Nonaktif'}</Badge>,
          },
        ]}
        onNew={() => setModal({ open: true })}
        onEdit={(s) => setModal({ open: true, service: s })}
        onDelete={async (id) => { await deleteService(id) }}
        newLabel="Tambah Layanan"
      />

      <AdminModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.service ? 'Edit Layanan' : 'Tambah Layanan'}
      >
        <LayananForm service={modal.service} onClose={() => setModal({ open: false })} />
      </AdminModal>
    </>
  )
}
