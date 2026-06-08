import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <section className="py-12 bg-[var(--color-surface)]">
      <div className="container max-w-4xl">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <Skeleton className="h-72 rounded-none" />
            <div className="p-8 space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
