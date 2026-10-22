import type * as React from 'react'
import { cn } from '@/lib/utils'

type Tone = 'ivory' | 'white' | 'forest' | 'night' | 'none'

const toneClass: Record<Tone, string> = {
  ivory: 'bg-ivory text-ink',
  white: 'bg-white text-ink',
  forest: 'bg-forest text-white',
  night: 'bg-night text-white',
  none: '',
}

export function Section({
  tone = 'ivory',
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<'section'> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section className={cn('relative py-20 md:py-28', toneClass[tone], className)} {...props}>
      <div className={cn('relative container-page', containerClassName)}>{children}</div>
    </section>
  )
}
