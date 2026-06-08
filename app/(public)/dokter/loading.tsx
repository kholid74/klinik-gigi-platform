import { DoctorCardSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <section className="py-12 bg-[var(--color-surface)]">
      <div className="container">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-[var(--color-brand-light)] animate-pulse shrink-0" />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}
