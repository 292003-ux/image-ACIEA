'use client'

import * as React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Progressive reveal on scroll.
 * Content is fully visible in the server HTML (SEO, no-JS, reduced motion);
 * only elements that start below the fold are animated once they enter the viewport.
 */
export function Reveal({ children, className, delay = 0, y = 24, as: Tag = 'div' }: Props) {
  const ref = React.useRef<HTMLElement>(null)
  const [state, setState] = React.useState<'idle' | 'hidden' | 'shown'>('idle')

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    setState('hidden')
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('shown')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const style: React.CSSProperties | undefined =
    state === 'hidden'
      ? { opacity: 0, transform: `translateY(${y}px)` }
      : state === 'shown'
        ? {
            opacity: 1,
            transform: 'none',
            transition: `opacity 0.8s ${ease} ${delay}s, transform 0.8s ${ease} ${delay}s`,
          }
        : undefined

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  )
}
