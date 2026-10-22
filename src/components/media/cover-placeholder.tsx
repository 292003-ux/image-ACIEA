import { cn } from '@/lib/utils'

function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return Math.abs(h)
}

/**
 * Elegant generative cover used when no validated image exists.
 * Deterministic per seed: topographic contours over a forest/night gradient.
 */
export function CoverPlaceholder({ seed = 'aciea', className }: { seed?: string; className?: string }) {
  const h = hash(seed)
  const cx = 30 + (h % 40)
  const cy = 30 + ((h >> 5) % 40)
  const variant = h % 3
  const gradients = [
    ['#103D30', '#0A2A21'],
    ['#101E25', '#103D30'],
    ['#164A3B', '#101E25'],
  ][variant] as [string, string]
  const rings = Array.from({ length: 9 }, (_, i) => i)
  const id = `g${h % 100000}`
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden', className)}>
      <svg viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={gradients[0]} />
            <stop offset="1" stopColor={gradients[1]} />
          </linearGradient>
        </defs>
        <rect width="100" height="62" fill={`url(#${id})`} />
        {rings.map((i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy * 0.62}
            rx={6 + i * 7 + ((h >> i) % 3)}
            ry={4 + i * 5 + ((h >> (i + 2)) % 3)}
            fill="none"
            stroke={i % 3 === 0 ? '#D5AE62' : '#00BA89'}
            strokeOpacity={i % 3 === 0 ? 0.35 : 0.16}
            strokeWidth={0.25}
            transform={`rotate(${(h % 50) - 25} ${cx} ${cy * 0.62})`}
          />
        ))}
        <circle cx={cx} cy={cy * 0.62} r="1.1" fill="#D5AE62" />
      </svg>
      <div className="absolute inset-0 bg-grid opacity-40" />
      <span className="absolute right-4 bottom-3 font-display text-[0.65rem] font-semibold tracking-[0.3em] text-white/35">
        ACIEA
      </span>
    </div>
  )
}
