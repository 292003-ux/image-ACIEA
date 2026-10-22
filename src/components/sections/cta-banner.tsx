import type * as React from 'react'
import { NetworkField } from '@/components/decor/network-field'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function CtaBanner({
  eyebrow,
  title,
  text,
  actions,
  className,
}: {
  eyebrow?: string
  title: string
  text?: string | null
  actions: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('bg-ivory py-20 md:py-28', className)}>
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-white shadow-lift sm:px-12 md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,186,137,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(213,174,98,0.22),transparent_50%)]"
            />
            <NetworkField className="absolute inset-0 -z-10 size-full opacity-50" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-30" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                {eyebrow && <p className="mb-5 eyebrow text-gold">{eyebrow}</p>}
                <h2 className="font-serif text-[clamp(1.9rem,1.3rem+2.4vw,3.25rem)] leading-[1.12] font-medium text-balance">
                  {title}
                </h2>
                {text && <p className="mt-5 max-w-2xl text-lead text-white/75">{text}</p>}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                {actions}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
