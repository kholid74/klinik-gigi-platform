import type { Metadata } from 'next'
import { getContactMessages } from '@/lib/queries/admin'
import { MessagesInbox } from '@/components/admin/MessagesInbox'

export const metadata: Metadata = { title: 'Pesan Kontak — Admin' }

export default async function AdminPesanPage() {
  const messages = await getContactMessages({ limit: 50 })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl text-[var(--color-foreground)]">Pesan Kontak</h2>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          {messages.filter((m) => !m.is_read).length} belum dibaca · {messages.length} total
        </p>
      </div>
      <MessagesInbox messages={messages} />
    </div>
  )
}
