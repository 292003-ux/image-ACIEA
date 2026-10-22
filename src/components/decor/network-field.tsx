import { cn } from '@/lib/utils'

/**
 * Deterministic constellation of connected nodes (sensors / contributors / data points).
 * Pure SVG + CSS: no JS cost, honours prefers-reduced-motion through global CSS.
 */
const NODES: [number, number][] = [
  [80, 120],
  [210, 60],
  [330, 160],
  [460, 90],
  [560, 210],
  [690, 130],
  [800, 250],
  [920, 160],
  [140, 280],
  [270, 330],
  [400, 280],
  [520, 360],
  [650, 320],
  [770, 400],
  [880, 330],
  [980, 420],
  [60, 430],
  [190, 470],
  [340, 440],
  [470, 500],
  [610, 470],
  [740, 530],
  [860, 500],
]
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [0, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [2, 10],
  [4, 11],
  [5, 12],
  [6, 14],
  [8, 16],
  [16, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [9, 18],
  [11, 19],
  [12, 20],
  [13, 21],
  [14, 22],
  [7, 15],
]

export function NetworkField({
  className,
  pulses = [3, 11, 20, 6],
}: {
  className?: string
  pulses?: number[]
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1040 580"
      className={cn('pointer-events-none', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#00BA89" strokeOpacity=".22" strokeWidth="1">
        {EDGES.map(([a, b], i) => {
          const [x1, y1] = NODES[a]!
          const [x2, y2] = NODES[b]!
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>
      <g
        stroke="#D5AE62"
        strokeOpacity=".5"
        strokeWidth="1.2"
        strokeDasharray="3 9"
        className="animate-dash"
      >
        {EDGES.filter((_, i) => i % 5 === 0).map(([a, b], i) => {
          const [x1, y1] = NODES[a]!
          const [x2, y2] = NODES[b]!
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>
      {NODES.map(([x, y], i) => (
        <g key={i}>
          {pulses.includes(i) && (
            <circle
              cx={x}
              cy={y}
              r="9"
              fill="#00BA89"
              fillOpacity=".25"
              className="animate-pulse-dot"
              style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.3}s` }}
            />
          )}
          <circle
            cx={x}
            cy={y}
            r={pulses.includes(i) ? 3.6 : 2.2}
            fill={pulses.includes(i) ? '#00BA89' : '#9fe3cf'}
            fillOpacity={pulses.includes(i) ? 1 : 0.55}
          />
        </g>
      ))}
    </svg>
  )
}
