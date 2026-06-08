'use client'

import { useTransition } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface Column<T> {
  key: string
  label: string
  render: (row: T) => React.ReactNode
}

interface AdminTableProps<T extends { id: string }> {
  title: string
  rows: T[]
  columns: Column<T>[]
  onNew: () => void
  onEdit: (row: T) => void
  onDelete: (id: string) => Promise<void>
  newLabel?: string
}

export function AdminTable<T extends { id: string }>({
  title,
  rows,
  columns,
  onNew,
  onEdit,
  onDelete,
  newLabel = 'Tambah Baru',
}: AdminTableProps<T>) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-sm text-[var(--color-foreground)]">{title} <Badge variant="muted">{rows.length}</Badge></h3>
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-brand-primary)] text-white text-xs font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          <Plus size={13} />
          {newLabel}
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="py-12 text-center text-[var(--color-subtle)] text-sm">
          Belum ada data. Klik "{newLabel}" untuk menambahkan.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-muted)]">{col.label}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--color-muted)]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)]/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">{col.render(row)}</td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-brand-light)] text-[var(--color-brand-primary)] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus?')) {
                            startTransition(() => onDelete(row.id))
                          }
                        }}
                        disabled={isPending}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                        title="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
