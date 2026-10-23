import { getLocale } from 'next-intl/server'
import { Reveal } from '@/components/motion/reveal'
import type { AboutPage } from '@/payload-types'
import { cn, formatDate } from '@/lib/utils'

type Milestone = NonNullable<AboutPage['milestones']>[number]

/** Sources stay in the CMS for editors; the timeline itself shows no outbound links. */
export async function Milestones({
  items,
  tone = 'light',
  limit,
}: {
  items: Milestone[]
  tone?: 'light' | 'dark'
  limit?: number
}) {
  const locale = await getLocale()
  const sorted = [...items].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, limit)
  const dark = tone === 'dark'
  return (
    <ol className="relative">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-2 bottom-2 left-[0.6875rem] w-px',
          dark ? 'bg-white/15' : 'bg-forest/15',
        )}
      />
      {sorted.map((m, i) => (
        <Reveal as="li" key={m.id ?? i} delay={i * 0.05} className="relative pb-10 pl-12 last:pb-0">
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-1 left-0 grid size-6 place-items-center rounded-full ring-4',
              dark ? 'bg-night ring-night' : 'bg-ivory ring-ivory',
            )}
          >
            <span
              className={cn(
                'size-3 rotate-45 rounded-[3px]',
                i === 0 ? 'bg-gold' : dark ? 'bg-digital' : 'bg-leaf',
              )}
            />
          </span>
          <time dateTime={m.date} className={cn('eyebrow', dark ? 'text-gold' : 'text-gold-600')}>
            {formatDate(m.date, locale, (m.datePrecision as 'day' | 'month' | 'year') ?? 'day')}
          </time>
          <h3
            className={cn(
              'mt-2 font-display text-lg font-semibold',
              dark ? 'text-white' : 'text-forest',
            )}
          >
            {m.title}
          </h3>
          {m.description && (
            <p
              className={cn(
                'mt-2 max-w-2xl leading-relaxed',
                dark ? 'text-white/65' : 'text-ink-muted',
              )}
            >
              {m.description}
            </p>
          )}
        </Reveal>
      ))}
    </ol>
  )
}
