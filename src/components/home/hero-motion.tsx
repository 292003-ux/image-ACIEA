import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Entrance animation in pure CSS: runs without waiting for hydration (better LCP)
 * and is neutralised by the global prefers-reduced-motion rule.
 */
export function HeroMotion({
  children,
  className,
  delay = 0,
  fade = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Disable the opacity fade for the LCP block (headline): only a subtle rise remains. */
  fade?: boolean
}) {
  return (
    <div
      className={cn(fade ? 'animate-fade-up' : 'animate-rise', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
