import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="py-12 bg-[var(--color-brand-primary)]">
        <div className="container text-center space-y-3">
          <Skeleton className="h-5 w-32 mx-auto bg-white/20 rounded-full" />
          <Skeleton className="h-10 w-56 mx-auto bg-white/20" />
          <Skeleton className="h-4 w-80 mx-auto bg-white/20" />
        </div>
      </div>
      <section className="py-12">
        <div className="container max-w-2xl">
          <Skeleton className="h-12 w-full mb-8 rounded-xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </section>
    </div>
  )
}
