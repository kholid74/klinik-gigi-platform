'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import type { Doctor } from '@/types'
import { AdminTable } from './AdminTable'
import { AdminModal } from './AdminModal'
import { Badge } from '@/components/ui/Badge'
import { upsertDoctor, deleteDoctor } from '@/lib/actions/admin'

function DokterForm({ doctor, onClose }: { doctor?: Doctor; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (doctor) fd.set('id', doctor.id)
    startTransition(async () => {
      const result = await upsertDoctor(fd)
      if (result.error) { setError(result.error); return }
      onClose()
    })
  }

  const field = (label: string, name: string, type = 'text', placeholder = '', required = false) => (
    <div>
      <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">
        {label}{required && <span className="text-[var(--color-brand-cta)]"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={doctor ? String((doctor as Record<string, unknown>)[name] ?? '') : ''}
        className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)]"
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
      {field('Nama', 'name', 'text', 'drg. Nama Dokter', true)}
      {field('Spesialisasi', 'specialty', 'text', 'Dokter Gigi Umum', true)}
      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Bio</label>
        <textarea
          name="bio"
          rows={3}
          defaultValue={doctor?.bio ?? ''}
          placeholder="Deskripsi singkat dokter..."
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none"
        />
      </div>
      {field('URL Foto', 'photo_url', 'url', 'https://...')}
      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Pendidikan (JSON array)</label>
        <textarea
          name="education"
          rows={2}
          defaultValue={JSON.stringify(doctor?.education ?? [])}
          placeholder='["S1 Kedokteran Gigi UGM"]'
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[var(--color-foreground)] mb-1.5">Sertifikasi (JSON array)</label>
        <textarea
          name="certifications"
          rows={2}
          defaultValue={JSON.stringify(doctor?.certifications ?? [])}
          placeholder='["STR No. 12345"]'
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono outline-none focus:border-[var(--color-brand-primary)] bg-[var(--color-surface)] resize-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="is_active" value="true" defaultChecked={doctor?.is_active ?? true} id="doc-active" className="rounded" />
        <label htmlFor="doc-active" className="text-xs font-semibold text-[var(--color-foreground)]">Dokter Aktif</label>
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

export function DokterManager({ doctors }: { doctors: Doctor[] }) {
  const [modal, setModal] = useState<{ open: boolean; doctor?: Doctor }>({ open: false })

  return (
    <>
      <AdminTable
        title="Daftar Dokter"
        rows={doctors}
        columns={[
          {
            key: 'name', label: 'Dokter',
            render: (d) => (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--color-brand-light)] shrink-0 relative">
                  {d.photo_url
                    ? <Image src={d.photo_url} alt={d.name} fill sizes="36px" className="object-cover" />
                    : <div className="absolute inset-0 flex items-center justify-center text-base">👨‍⚕️</div>}
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-foreground)]">{d.name}</p>
                  <p className="text-[10px] text-[var(--color-subtle)]">{d.specialty}</p>
                </div>
              </div>
            ),
          },
          {
            key: 'is_active', label: 'Status',
            render: (d) => <Badge variant={d.is_active ? 'primary' : 'muted'}>{d.is_active ? 'Aktif' : 'Nonaktif'}</Badge>,
          },
        ]}
        onNew={() => setModal({ open: true })}
        onEdit={(d) => setModal({ open: true, doctor: d })}
        onDelete={async (id) => { await deleteDoctor(id) }}
        newLabel="Tambah Dokter"
      />

      <AdminModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.doctor ? 'Edit Dokter' : 'Tambah Dokter'}
      >
        <DokterForm doctor={modal.doctor} onClose={() => setModal({ open: false })} />
      </AdminModal>
    </>
  )
}
