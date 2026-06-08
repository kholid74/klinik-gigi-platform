export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[var(--color-brand-light)] ${className}`}
    />
  )
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="h-60 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
