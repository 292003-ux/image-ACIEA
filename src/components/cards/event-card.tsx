import { CalendarDays, MapPin } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import type { Event } from '@/payload-types'

export type EventTiming = 'upcoming' | 'ongoing' | 'past'

export function eventTiming(event: Pick<Event, 'startDate' | 'endDate'>, now = new Date()): EventTiming {
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 1000 * 60 * 60 * 6)
  if (now < start) return 'upcoming'
  if (now <= end) return 'ongoing'
  return 'past'
}

export async function EventCard({ event }: { event: Event }) {
  const t = await getTranslations('events')
  const locale = await getLocale()
  const timing = eventTiming(event)
  const start = new Date(event.startDate)
  const fmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', { timeZone: 'Africa/Ouagadougou' })
  const day = fmt.formatToParts(start).find((p) => p.type === 'day')?.value
  const month = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', { month: 'short', timeZone: 'Africa/Ouagadougou' }).format(start)
  const year = start.getFullYear()
  return (
    <article className="group relative flex gap-5 rounded-[var(--radius-card)] bg-white p-6 shadow-soft ring-1 ring-forest/5 transition-all hover:shadow-lift">
      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-forest py-3 text-white">
        <span className="font-display text-3xl leading-none font-bold">{day}</span>
        <span className="mt-1 text-xs tracking-widest text-gold uppercase">{month}</span>
        <span className="text-[0.65rem] text-white/60">{year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2">
          {event.cancelled ? (
            <Badge tone="danger">{t('cancelled')}</Badge>
          ) : (
            <Badge tone={timing === 'upcoming' ? 'gold' : timing === 'ongoing' ? 'leaf' : 'neutral'} dot>
              {t(timing)}
            </Badge>
          )}
          {event.format && <Badge tone="forest">{t(`format.${event.format}`)}</Badge>}
        </div>
        <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-forest">
          <Link href={{ pathname: '/events/[slug]', params: { slug: event.slug } }} className="after:absolute after:inset-0 after:content-['']">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{event.summary}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold-600" aria-hidden="true" />
              {event.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-gold-600" aria-hidden="true" />
            <time dateTime={event.startDate}>{fmt.format(start)}</time>
          </span>
        </div>
      </div>
    </article>
  )
}
