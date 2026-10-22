import { CalendarDays, ExternalLink, MapPin, Monitor } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { eventTiming } from '@/components/cards/event-card'
import { CmsImage } from '@/components/media/cms-image'
import { RichText } from '@/components/rich-text'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { PageHero } from '@/components/sections/page-hero'
import { Badge } from '@/components/ui/badge'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getEventBySlug } from '@/lib/queries'
import { buildMetadata, jsonLd } from '@/lib/seo'
import { isSafeExternalUrl } from '@/lib/utils'
import type { News } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const event = await getEventBySlug(slug, locale)
  if (!event) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/events/[slug]', params: { slug } },
    title: event.title,
    description: event.summary,
    image: event.coverImage,
    seo: event.seo,
  })
}

function fmt(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
    dateStyle: 'full',
    timeZone: 'Africa/Ouagadougou',
  }).format(new Date(date))
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [t, tc, event] = await Promise.all([
    getTranslations({ locale, namespace: 'events' }),
    getTranslations({ locale, namespace: 'common' }),
    getEventBySlug(slug, locale),
  ])
  if (!event) notFound()
  const current = await getLocale()
  const timing = eventTiming(event)
  const report =
    event.relatedNews && typeof event.relatedNews === 'object' ? (event.relatedNews as News) : null
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          description: event.summary,
          startDate: event.startDate,
          ...(event.endDate ? { endDate: event.endDate } : {}),
          eventStatus: event.cancelled
            ? 'https://schema.org/EventCancelled'
            : 'https://schema.org/EventScheduled',
          eventAttendanceMode:
            event.format === 'online'
              ? 'https://schema.org/OnlineEventAttendanceMode'
              : event.format === 'hybrid'
                ? 'https://schema.org/MixedEventAttendanceMode'
                : 'https://schema.org/OfflineEventAttendanceMode',
          ...(event.location ? { location: { '@type': 'Place', name: event.location } } : {}),
          organizer: { '@type': 'NGO', name: 'ACIEA' },
        })}
      />
      <PageHero
        eyebrow={t('title')}
        title={event.title}
        description={event.summary}
        crumbs={[{ label: t('title'), href: '/events', url: '/events' }, { label: event.title }]}
      >
        <div className="flex flex-wrap gap-2">
          {event.cancelled ? (
            <Badge tone="danger">{t('cancelled')}</Badge>
          ) : (
            <Badge tone="night" dot>
              {t(timing)}
            </Badge>
          )}
          {event.format && <Badge tone="night">{t(`format.${event.format}`)}</Badge>}
        </div>
      </PageHero>
      <Section tone="ivory">
        {event._isFallback && <FallbackNotice className="mb-8" />}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {event.coverImage && typeof event.coverImage === 'object' && (
              <CmsImage
                media={event.coverImage}
                size="hero"
                className="mb-10 aspect-[16/9] rounded-[1.75rem]"
                sizes="(min-width:1024px) 800px, 100vw"
                priority
              />
            )}
            <RichText data={event.description} />
            {report && report._status === 'published' && (
              <Link
                href={{ pathname: '/news/[slug]', params: { slug: report.slug } }}
                className={`${buttonVariants({ variant: 'primary' })} mt-10`}
              >
                {t('report')} <ArrowGlyph />
              </Link>
            )}
          </div>
          <aside className="lg:col-span-4">
            <dl className="space-y-5 rounded-[1.5rem] bg-white p-6 shadow-soft lg:sticky lg:top-28">
              <div className="relative pl-8">
                <CalendarDays
                  className="absolute top-0.5 left-0 size-5 text-gold-600"
                  aria-hidden="true"
                />
                <dt className="text-xs text-ink-muted">{tc('date')}</dt>
                <dd className="text-sm font-medium text-forest">
                  {fmt(event.startDate, current)}
                  {event.endDate &&
                    fmt(event.endDate, current) !== fmt(event.startDate, current) && (
                      <> → {fmt(event.endDate, current)}</>
                    )}
                </dd>
              </div>
              {event.location && (
                <div className="relative pl-8">
                  <MapPin
                    className="absolute top-0.5 left-0 size-5 text-gold-600"
                    aria-hidden="true"
                  />
                  <dt className="text-xs text-ink-muted">{tc('location')}</dt>
                  <dd className="text-sm font-medium text-forest">{event.location}</dd>
                </div>
              )}
              {event.format && (
                <div className="relative pl-8">
                  <Monitor
                    className="absolute top-0.5 left-0 size-5 text-gold-600"
                    aria-hidden="true"
                  />
                  <dt className="text-xs text-ink-muted">Format</dt>
                  <dd className="text-sm font-medium text-forest">{t(`format.${event.format}`)}</dd>
                </div>
              )}
              {timing === 'upcoming' &&
                !event.cancelled &&
                isSafeExternalUrl(event.registrationUrl) && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonVariants({ variant: 'gold' })} w-full`}
                  >
                    {t('register')} <ExternalLink aria-hidden="true" />
                  </a>
                )}
            </dl>
          </aside>
        </div>
      </Section>
    </>
  )
}
