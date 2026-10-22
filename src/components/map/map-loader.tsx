'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import type { MapMarker } from './projects-map'

const ProjectsMap = dynamic(() => import('./projects-map'), {
  ssr: false,
  loading: () => <Skeleton className="h-[26rem] w-full rounded-[1.5rem] bg-white/5 md:h-[32rem]" />,
})

export function MapLoader(props: {
  markers: MapMarker[]
  labels: { bf: string; wa: string; view: string; open: string }
}) {
  return <ProjectsMap {...props} />
}
