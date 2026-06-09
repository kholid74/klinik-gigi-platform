'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="bg-[var(--color-brand-cta)] text-white text-sm py-2.5 px-4 text-center relative">
      <span>
        🎉 <strong className="font-bold">Promo Aktif:</strong>{' '}
        Scaling + Whitening — hemat sampai 25%. Kuota terbatas bulan ini.{' '}
        <Link href="/promo" className="inline-flex items-center rounded-full bg-white px-4 py-1 text-xs font-bold text-[var(--color-brand-cta)] no-underline hover:bg-white/90">
          Klaim Sekarang
        </Link>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Tutup"
      >
        <X size={14} />
      </button>
    </div>
  )
}
