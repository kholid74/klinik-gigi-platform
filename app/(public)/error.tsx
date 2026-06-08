'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-display text-2xl text-[var(--color-foreground)] mb-2">Terjadi Kesalahan</h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          Halaman tidak dapat dimuat. Silakan coba lagi atau kembali ke beranda.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 border border-[var(--color-border)] text-sm font-semibold rounded-full hover:bg-[var(--color-surface)] transition-colors"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
