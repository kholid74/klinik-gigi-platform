import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Calendar, Phone, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Janji Temu Berhasil Dibuat',
}

export default async function BookingSuksesPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-md p-8 text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>

          <h1 className="font-display text-2xl text-[var(--color-foreground)] mb-2">
            Janji Temu Dikirim!
          </h1>
          <p className="text-sm text-[var(--color-muted)] mb-6">
            Permintaan janji temu Anda telah kami terima. Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
          </p>

          {code && (
            <div className="bg-[var(--color-surface)] border-2 border-dashed border-[var(--color-brand-primary)]/30 rounded-2xl p-5 mb-6">
              <p className="text-xs font-semibold text-[var(--color-subtle)] mb-1">Kode Booking Anda</p>
              <p className="font-display text-2xl text-[var(--color-brand-primary)] tracking-wider">{code}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1">Simpan kode ini untuk konfirmasi ulang</p>
            </div>
          )}

          <div className="space-y-3 text-left mb-6">
            {[
              { icon: <Phone size={14} />, text: 'Tim kami akan menghubungi Anda dalam 1–2 jam di hari kerja' },
              { icon: <MessageCircle size={14} />, text: 'Konfirmasi jadwal akan dikirim via WhatsApp' },
              { icon: <Calendar size={14} />, text: 'Harap tiba 10 menit sebelum jadwal yang dikonfirmasi' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-light)] flex items-center justify-center text-[var(--color-brand-primary)] shrink-0">
                  {item.icon}
                </div>
                <p className="text-xs text-[var(--color-muted)] pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3.5 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Kembali ke Beranda
          </Link>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <MessageCircle size={16} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
