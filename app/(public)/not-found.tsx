import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="font-display text-8xl text-[var(--color-brand-light)] mb-2">404</div>
        <h1 className="font-display text-2xl text-[var(--color-foreground)] mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[var(--color-brand-primary)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            Ke Beranda
          </Link>
          <Link
            href="/booking"
            className="px-5 py-2.5 border border-[var(--color-border)] text-sm font-semibold rounded-full hover:bg-[var(--color-surface)] transition-colors"
          >
            Buat Janji
          </Link>
        </div>
      </div>
    </div>
  )
}
