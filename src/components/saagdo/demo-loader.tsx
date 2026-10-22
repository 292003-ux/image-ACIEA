'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

/** The interactive demo (charts) is loaded after the page is interactive to keep the critical path light. */
export const SaagdoDemoLoader = dynamic(() => import('./demo').then((m) => m.SaagdoDemo), {
  ssr: false,
  loading: () => <Skeleton className="h-[30rem] w-full rounded-[1.75rem] bg-white/5" />,
})
