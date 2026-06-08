'use client'

import { useState, useTransition } from 'react'
import { Mail, MailOpen, Phone } from 'lucide-react'
import type { ContactMessage } from '@/types'
import { markMessageRead } from '@/lib/actions/admin'
import { formatDate } from '@/lib/utils'

export function MessagesInbox({ messages }: { messages: ContactMessage[] }) {
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [isPending, startTransition] = useTransition()
  const [read, setRead] = useState<Set<string>>(
    new Set(messages.filter((m) => m.is_read).map((m) => m.id)),
  )

  function handleSelect(msg: ContactMessage) {
    setSelected(msg)
    if (!read.has(msg.id)) {
      setRead((prev) => new Set([...prev, msg.id]))
      startTransition(async () => { await markMessageRead(msg.id) })
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden flex flex-col md:flex-row min-h-[480px]">
      {/* List */}
      <div className="md:w-80 border-b md:border-b-0 md:border-r border-[var(--color-border)] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="p-6 text-sm text-center text-[var(--color-subtle)]">Tidak ada pesan</p>
        ) : (
          messages.map((msg) => {
            const isRead = read.has(msg.id)
            const isActive = selected?.id === msg.id
            return (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left px-4 py-3.5 border-b border-[var(--color-border)] transition-colors ${
                  isActive ? 'bg-[var(--color-brand-light)]' : 'hover:bg-[var(--color-surface)]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isRead
                    ? <MailOpen size={13} className="text-[var(--color-subtle)] shrink-0" />
                    : <Mail size={13} className="text-[var(--color-brand-cta)] shrink-0" />
                  }
                  <p className={`text-xs flex-1 truncate ${isRead ? 'font-medium text-[var(--color-muted)]' : 'font-bold text-[var(--color-foreground)]'}`}>
                    {msg.name}
                  </p>
                  <span className="text-[10px] text-[var(--color-subtle)] shrink-0">
                    {msg.created_at ? formatDate(msg.created_at) : ''}
                  </span>
                </div>
                {msg.subject && (
                  <p className="text-[10px] font-semibold text-[var(--color-muted)] truncate pl-5">{msg.subject}</p>
                )}
                <p className="text-[10px] text-[var(--color-subtle)] truncate pl-5">{msg.message}</p>
              </button>
            )
          })
        )}
      </div>

      {/* Detail */}
      <div className="flex-1 p-6">
        {!selected ? (
          <div className="h-full flex items-center justify-center text-[var(--color-subtle)]">
            <div className="text-center">
              <Mail size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Pilih pesan untuk melihat detail</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-xl text-[var(--color-foreground)]">{selected.subject ?? 'Tanpa Subjek'}</h3>
              <p className="text-xs text-[var(--color-subtle)] mt-1">{selected.created_at ? formatDate(selected.created_at) : ''}</p>
            </div>

            <div className="flex flex-wrap gap-4 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
              <div>
                <p className="text-[10px] font-semibold text-[var(--color-subtle)] mb-0.5">Pengirim</p>
                <p className="text-sm font-bold text-[var(--color-foreground)]">{selected.name}</p>
              </div>
              {selected.email && (
                <div>
                  <p className="text-[10px] font-semibold text-[var(--color-subtle)] mb-0.5">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm text-[var(--color-brand-primary)] hover:underline">{selected.email}</a>
                </div>
              )}
              {selected.phone && (
                <div>
                  <p className="text-[10px] font-semibold text-[var(--color-subtle)] mb-0.5">Telepon</p>
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-brand-primary)] flex items-center gap-1 hover:underline">
                    <Phone size={12} />{selected.phone}
                  </a>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--color-muted)] mb-2">Pesan</p>
              <p className="text-sm text-[var(--color-foreground)] leading-relaxed whitespace-pre-wrap bg-white border border-[var(--color-border)] rounded-xl p-4">{selected.message}</p>
            </div>

            {selected.email && (
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? 'Pesan Anda'}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                Balas via Email
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
