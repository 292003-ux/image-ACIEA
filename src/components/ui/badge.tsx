import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none tracking-wide',
  {
    variants: {
      tone: {
        forest: 'bg-forest/8 text-forest ring-1 ring-forest/12 ring-inset',
        leaf: 'bg-leaf-50 text-leaf-600 ring-1 ring-leaf/20 ring-inset',
        gold: 'bg-gold-100 text-[#6d521c] ring-1 ring-gold/40 ring-inset',
        night: 'bg-white/8 text-white/85 ring-1 ring-white/15 ring-inset',
        digital: 'bg-digital/12 text-digital-300 ring-1 ring-digital/30 ring-inset',
        success: 'bg-success-bg text-success',
        info: 'bg-info-bg text-info',
        warning: 'bg-warning-bg text-warning',
        danger: 'bg-danger-bg text-danger',
        neutral: 'bg-ink/5 text-ink-muted',
      },
    },
    defaultVariants: { tone: 'forest' },
  },
)

export function Badge({
  className,
  tone,
  dot,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { dot?: boolean }) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {props.children}
    </span>
  )
}
