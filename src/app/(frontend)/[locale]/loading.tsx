import { CardSkeleton, Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="bg-forest pt-36 pb-20">
        <div className="container-page space-y-5">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-12 w-2/3 bg-white/10" />
          <Skeleton className="h-5 w-1/2 bg-white/10" />
        </div>
      </div>
      <div className="container-page grid gap-6 py-16 md:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
