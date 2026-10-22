import { ArrowDown } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations } from 'next-intl/server'
import { NetworkField } from '@/components/decor/network-field'
import { TopoLines } from '@/components/decor/topo-lines'
import { CmsImage, mediaUrl } from '@/components/media/cms-image'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import type { Homepage, Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { HeroMotion } from './hero-motion'

export async function HomeHero({
  hero,
  locale,
  foundedYear,
  domainsCount,
}: {
  hero: Homepage['hero'] | undefined
  locale: Locale
  foundedYear?: number | null
  domainsCount: number
}) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const mosaic = (hero?.mosaic ?? []).filter((m): m is Media => typeof m === 'object' && !!m)
  const video = hero?.video && typeof hero.video === 'object' ? hero.video : null
  const title = hero?.title || 'Innover pour le climat. Agir pour un avenir durable.'
  // Split the motto in two lines for an editorial rhythm.
  const [first, ...rest] = title.split(/(?<=\.)\s+/)

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-900 pt-28 pb-24 text-white md:min-h-[92vh]">
      {/* Background: photo or light video, darkened by a forest overlay */}
      <div className="absolute inset-0 -z-30">
        {video?.url ? (
          <video
            className="size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={mediaUrl(hero?.image ?? null, 'hero') ?? undefined}
            aria-hidden="true"
          >
            <source src={video.url} type={video.mimeType ?? 'video/mp4'} />
          </video>
        ) : (
          <CmsImage
            media={hero?.image}
            size="hero"
            priority
            sizes="100vw"
            className="size-full"
            imgClassName="scale-105"
            showProvenance={false}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,rgba(10,42,33,0.97)_0%,rgba(16,61,48,0.9)_45%,rgba(16,30,37,0.72)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <TopoLines className="absolute inset-0 -z-10 size-full opacity-55" />
      <NetworkField className="absolute top-0 right-0 -z-10 hidden h-full w-[55%] opacity-60 lg:block" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -bottom-40 -z-10 size-[40rem] rounded-full bg-digital/10 blur-[140px]"
      />

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <HeroMotion className="lg:col-span-7" fade={false}>
          <p className="inline-flex items-center gap-3 eyebrow text-gold">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-digital" />
              <span className="relative size-2 rounded-full bg-digital" />
            </span>
            {hero?.eyebrow || 'Alliance for Climate Innovation and Ecological Action'}
          </p>
          <h1 className="mt-7 text-display font-semibold">
            <span className="block">{first}</span>
            {rest.length > 0 && <span className="block text-gradient-gold">{rest.join(' ')}</span>}
          </h1>
          {hero?.subtitle && (
            <p className="mt-7 max-w-2xl text-lead text-white/78">{hero.subtitle}</p>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <NextLink
              href={pathFor('/about', locale)}
              className={cn(buttonVariants({ variant: 'gold', size: 'lg' }))}
            >
              {t('ctaDiscover')}
              <ArrowGlyph />
            </NextLink>
            <NextLink
              href={pathFor('/projects', locale)}
              className={cn(buttonVariants({ variant: 'light', size: 'lg' }))}
            >
              {t('ctaExplore')}
            </NextLink>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-4 border-t border-white/12 pt-6 sm:grid-cols-3 sm:gap-6">
            {foundedYear && (
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-xs tracking-wide text-white/60">{t('foundedLabel')}</dt>
                <dd className="font-display text-lg font-semibold text-white sm:text-2xl">
                  {foundedYear}
                </dd>
              </div>
            )}
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-xs tracking-wide text-white/60">{t('hqLabel')}</dt>
              <dd className="font-display text-lg font-semibold break-words text-white sm:text-2xl">
                Ouagadougou
              </dd>
            </div>
            {domainsCount > 0 && (
              <div className="hidden flex-col-reverse gap-1 sm:flex">
                <dt className="text-xs tracking-wide text-white/60">{t('domainsCountLabel')}</dt>
                <dd className="font-display text-2xl font-semibold text-gold">{domainsCount}</dd>
              </div>
            )}
          </dl>
        </HeroMotion>

        {mosaic.length > 0 && (
          <HeroMotion delay={0.25} className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.25rem] border border-gold/30"
              />
              {mosaic[0] && (
                <figure className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
                  <CmsImage
                    media={mosaic[0]}
                    size="card"
                    priority
                    sizes="420px"
                    className="absolute inset-0"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-transparent to-transparent"
                  />
                  {mosaic[0].caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 pl-32 text-right text-sm text-white/85">
                      {mosaic[0].caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {mosaic[1] && (
                <figure className="absolute -bottom-10 -left-16 w-44 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-forest-900">
                  <CmsImage
                    media={mosaic[1]}
                    size="thumbnail"
                    sizes="176px"
                    className="aspect-square"
                  />
                </figure>
              )}
              {mosaic[2] && (
                <figure className="absolute -top-8 -right-8 w-36 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-forest-900">
                  <CmsImage
                    media={mosaic[2]}
                    size="thumbnail"
                    sizes="144px"
                    className="aspect-[4/5]"
                  />
                </figure>
              )}
              <div className="absolute top-8 -left-10 rounded-2xl bg-night/80 px-4 py-3 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
                <p className="eyebrow text-[0.6rem] text-digital-300">Eau · Climat · Données</p>
                <div aria-hidden="true" className="mt-2 flex h-6 items-end gap-1">
                  {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-sm bg-gradient-to-t from-digital/40 to-digital"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </HeroMotion>
        )}
      </div>

      <a
        href="#presentation"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-white md:flex"
      >
        {t('scroll')}
        <span className="relative h-10 w-6 rounded-full border border-white/30">
          <span className="absolute top-2 left-1/2 h-2 w-1 -translate-x-1/2 animate-scroll-cue rounded-full bg-gold" />
        </span>
        <ArrowDown className="sr-only" />
      </a>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-forest-900/40"
      />
    </section>
  )
}
