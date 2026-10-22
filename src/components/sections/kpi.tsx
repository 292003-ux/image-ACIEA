'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import * as React from 'react'
import { Icon } from '@/components/icon'

/** Count-up KPI. Only ever used with verified, published figures. */
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
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const fmt = React.useMemo(() => new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR'), [locale])
  const [display, setDisplay] = React.useState(reduce ? value : 0)

  React.useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[var(--radius-card)] bg-white/[0.04] p-7 ring-1 ring-white/10">
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
