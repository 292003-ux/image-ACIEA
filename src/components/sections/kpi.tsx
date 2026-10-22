'use client'

import * as React from 'react'
import { Icon } from '@/components/icon'

/** Count-up KPI (dependency-free). Only ever used with verified, published figures. */
export function KpiCard({
  value,
  label,
  unit,
  period,
  icon,
  locale,
}: {
  value: number
  label: string
  unit?: string | null
  period?: string | null
  icon?: string | null
  locale: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const fmt = React.useMemo(
    () => new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR'),
    [locale],
  )
  // Server HTML shows the real figure; the count-up only runs client-side once visible.
  const [animated, setAnimated] = React.useState<number | null>(null)
  const display = animated ?? value

  React.useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1400)
        setAnimated(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[var(--radius-card)] bg-white/[0.04] p-7 ring-1 ring-white/10"
    >
      <Icon name={icon} className="size-6 text-digital" />
      <p className="mt-6 font-display text-[clamp(2.4rem,2rem+1.6vw,3.4rem)] leading-none font-semibold text-white tabular-nums">
        <span aria-hidden="true">{fmt.format(display)}</span>
        <span className="sr-only">{fmt.format(value)}</span>
        {unit && <span className="ml-1 text-xl text-gold">{unit}</span>}
      </p>
      <p className="mt-3 text-sm font-medium text-white/80">{label}</p>
      {period && <p className="mt-1 text-xs text-white/50">{period}</p>}
    </div>
  )
}
