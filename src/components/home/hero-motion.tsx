import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Entrance animation in pure CSS: runs without waiting for hydration (better LCP)
 * and is neutralised by the global prefers-reduced-motion rule.
 */
export function HeroMotion({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={cn('animate-fade-up', className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
