import type * as React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  action?: React.ReactNode
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
  action,
  id,
}: Props) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p
            className={cn(
              'eyebrow mb-4 inline-flex items-center gap-3',
              dark ? 'text-gold' : 'text-leaf',
            )}
          >
            <span aria-hidden="true" className={cn('h-px w-8', dark ? 'bg-gold/70' : 'bg-leaf/60')} />
            {eyebrow}
          </p>
        )}
        <Tag
          id={id}
          className={cn(
            'text-h2 font-semibold',
            dark ? 'text-white' : 'text-forest',
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className={cn('mt-5 text-lead', dark ? 'text-white/72' : 'text-ink-muted')}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
