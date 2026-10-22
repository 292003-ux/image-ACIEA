import { CalendarDays } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { EventCard, eventTiming } from '@/components/cards/event-card'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import type { Locale } from '@/i18n/routing'
import { getEvents } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'events' })
  return buildMetadata({ locale, href: '/events', title: t('title'), description: t('intro') })
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn, events] = await Promise.all([
    getTranslations({ locale, namespace: 'events' }),
    getTranslations({ locale, namespace: 'nav' }),
    getEvents(locale),
  ])
  const now = new Date()
  const upcoming = events
    .filter((e) => eventTiming(e, now) !== 'past')
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate))
  const past = events.filter((e) => eventTiming(e, now) === 'past')
  return (
    <>
      <PageHero
        eyebrow={tn('news')}
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
      />
      <Section tone="ivory">
        <section aria-labelledby="upcoming">
          <h2 id="upcoming" className="font-display text-h3 font-semibold text-forest">
            {t('upcoming')}
          </h2>
          <div className="mt-8">
            {upcoming.length ? (
              <ul className="grid gap-5 lg:grid-cols-2">
                {upcoming.map((e) => (
                  <li key={e.id}>
                    <EventCard event={e} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<CalendarDays className="size-7" aria-hidden="true" />}
                title={t('emptyUpcoming')}
              />
            )}
          </div>
        </section>
        {past.length > 0 && (
          <section aria-labelledby="past" className="mt-20">
            <h2 id="past" className="font-display text-h3 font-semibold text-forest">
              {t('past')}
            </h2>
            <ul className="mt-8 grid gap-5 lg:grid-cols-2">
              {past.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Section>
    </>
  )
}
