import type * as React from 'react'
import { NetworkField } from '@/components/decor/network-field'
import { TopoLines } from '@/components/decor/topo-lines'
import { CmsImage } from '@/components/media/cms-image'
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string | null
  title: string
  description?: string | null
  crumbs?: Crumb[]
  image?: Media | number | null
  tone?: 'forest' | 'night'
  decor?: 'topo' | 'network'
  children?: React.ReactNode
  aside?: React.ReactNode
}

/** Inner-page hero: dark, editorial, with a discreet eco-tech layer. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  image,
  tone = 'forest',
  decor = 'topo',
  children,
  aside,
}: Props) {
  const hasImage = !!image && typeof image === 'object'
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden pt-32 pb-16 text-white md:pt-40 md:pb-24',
        tone === 'forest' ? 'bg-forest' : 'bg-night',
      )}
    >
      {hasImage && (
        <>
          <CmsImage media={image} size="hero" priority sizes="100vw" className="absolute inset-0 -z-20" showProvenance={false} />
          <div aria-hidden="true" className={cn('absolute inset-0 -z-10', tone === 'forest' ? 'bg-gradient-to-r from-forest via-forest/90 to-forest/55' : 'bg-gradient-to-r from-night via-night/92 to-night/60')} />
        </>
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
      {decor === 'topo' ? (
        <TopoLines className="absolute inset-0 -z-10 size-full opacity-60" />
      ) : (
        <NetworkField className="absolute inset-y-0 right-0 -z-10 h-full w-full opacity-70 md:w-2/3" />
      )}
      <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 size-[28rem] rounded-full bg-leaf/25 blur-[110px]" />
      <div className="container-page">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <div className={cn(aside ? 'lg:col-span-7' : 'lg:col-span-9')}>
            {eyebrow && (
              <p className="eyebrow mb-5 inline-flex items-center gap-3 text-gold">
                <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
                {eyebrow}
              </p>
            )}
            <h1 className="text-h1 font-semibold">{title}</h1>
            {description && <p className="mt-6 max-w-2xl text-lead text-white/75">{description}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  )
}
