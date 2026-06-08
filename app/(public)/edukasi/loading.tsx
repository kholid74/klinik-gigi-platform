import { ArticleCardSkeleton, Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <section className="py-12 bg-[var(--color-surface)]">
      <div className="container">
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-20 rounded-full bg-[var(--color-brand-light)] animate-pulse shrink-0" />
          ))}
        </div>
        {/* Featured skeleton */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row mb-8">
          <Skeleton className="md:w-2/5 h-56 md:h-auto rounded-none" />
          <div className="flex-1 p-8 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}
