import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="py-16 bg-[var(--color-brand-primary)]">
        <div className="container space-y-4">
          <Skeleton className="h-4 w-32 bg-white/20 rounded-full" />
          <Skeleton className="h-10 w-64 bg-white/20" />
          <Skeleton className="h-4 w-48 bg-white/20" />
        </div>
      </div>
      {/* Content skeleton */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container">
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-9 w-20 rounded-full bg-[var(--color-brand-light)] animate-pulse" />
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <Skeleton className="h-48 rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
