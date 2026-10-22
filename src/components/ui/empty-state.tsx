import type * as React from 'react'
import { cn } from '@/lib/utils'

export function EmptyState({
  icon,
  title,
  description,
  action,
  tone = 'light',
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      role="status"
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-card)] border border-dashed px-6 py-12 text-center md:px-12',
        dark ? 'border-white/20 bg-white/[0.03] text-white' : 'border-forest/20 bg-white/60 text-forest',
        className,
      )}
    >
      <div aria-hidden="true" className={cn('absolute inset-0 opacity-60', dark ? 'bg-dots' : 'bg-grid-light')} />
      <div className="relative mx-auto max-w-xl">
        {icon && (
          <div className={cn('mx-auto mb-5 grid size-14 place-items-center rounded-2xl', dark ? 'bg-white/8 text-gold' : 'bg-leaf-50 text-leaf')}>
            {icon}
          </div>
        )}
        <p className="font-display text-lg font-semibold">{title}</p>
        {description && <p className={cn('mt-2 leading-relaxed', dark ? 'text-white/70' : 'text-ink-muted')}>{description}</p>}
        {action && <div className="mt-6 flex justify-center">{action}</div>}
      </div>
    </div>
  )
}
