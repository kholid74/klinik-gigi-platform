export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[var(--color-brand-light)] border-t-[var(--color-brand-primary)] rounded-full animate-spin" />
        <p className="text-xs text-[var(--color-subtle)]">Memuat...</p>
      </div>
    </div>
  )
}
