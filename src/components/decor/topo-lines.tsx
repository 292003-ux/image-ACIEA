import { cn } from '@/lib/utils'

/** Topographic contour lines — evokes terrain, hydrology and geospatial data. */
export function TopoLines({
  className,
  animated = true,
}: {
  className?: string
  animated?: boolean
}) {
  const paths = Array.from({ length: 14 }, (_, i) => {
    const o = i * 26
    return `M-50 ${120 + o} C 180 ${40 + o}, 320 ${220 + o}, 560 ${120 + o} S 900 ${10 + o}, 1180 ${140 + o} S 1500 ${260 + o}, 1700 ${120 + o}`
  })
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none', className)}
    >
      <defs>
        <linearGradient id="topo-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#00BA89" stopOpacity="0" />
          <stop offset=".35" stopColor="#00BA89" stopOpacity=".55" />
          <stop offset=".7" stopColor="#D5AE62" stopOpacity=".5" />
          <stop offset="1" stopColor="#D5AE62" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#topo-fade)"
          strokeWidth={i % 4 === 0 ? 1.1 : 0.6}
          strokeOpacity={i % 4 === 0 ? 0.55 : 0.28}
          strokeDasharray={animated && i % 4 === 0 ? '4 10' : undefined}
          className={animated && i % 4 === 0 ? 'animate-dash' : undefined}
        />
      ))}
    </svg>
  )
}
