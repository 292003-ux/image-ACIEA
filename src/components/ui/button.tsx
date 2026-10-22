import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-[var(--ease-out-soft)] focus-visible:outline-3 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300',
  {
    variants: {
      variant: {
        primary:
          'bg-forest text-white shadow-soft hover:bg-forest-700 hover:shadow-lift active:translate-y-px',
        gold: 'bg-gold text-forest-900 shadow-soft hover:bg-[#e0bd78] hover:shadow-lift active:translate-y-px',
        outline:
          'border border-forest/20 bg-white/60 text-forest backdrop-blur hover:border-forest/50 hover:bg-white',
        light:
          'border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/12',
        digital: 'bg-digital text-night shadow-glow hover:bg-digital-300 active:translate-y-px',
        ghost: 'text-forest hover:bg-forest/5',
        link: 'h-auto rounded-none px-0 text-leaf underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.9375rem]',
        lg: 'h-13 px-7 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/** Arrow icon that nudges on hover — used inside CTA buttons. */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn('group-hover/btn:translate-x-0.5', className)}
    >
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
