'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="bg-[var(--color-brand-primary)] text-white text-sm py-2.5 px-4 text-center relative">
      <span>
        🎉 Diskon 25% Scaling + Whitening untuk pasien baru!{' '}
        <Link href="/promo" className="font-bold underline hover:no-underline">
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
