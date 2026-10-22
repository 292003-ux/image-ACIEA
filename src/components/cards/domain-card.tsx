import { Icon } from '@/components/icon'
import { Link } from '@/i18n/navigation'
import type { Domain } from '@/payload-types'
import { cn } from '@/lib/utils'

export function DomainCard({
  domain,
  index,
  tone = 'light',
}: {
  domain: Domain
  index: number
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-7 transition-all duration-500 hover:-translate-y-1',
        dark
          ? 'bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07] hover:ring-gold/40'
          : 'bg-white shadow-soft ring-1 ring-forest/5 hover:shadow-lift',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-48 rounded-full bg-digital/0 blur-3xl transition-colors duration-700 group-hover:bg-digital/15"
      />
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'grid size-14 place-items-center rounded-2xl transition-all duration-500',
            dark
              ? 'bg-white/8 text-gold group-hover:bg-gold group-hover:text-forest-900'
              : 'bg-leaf-50 text-leaf group-hover:bg-forest group-hover:text-gold',
          )}
        >
          <Icon name={domain.icon} className="size-7" />
        </span>
        <span
          className={cn(
            'font-display text-sm font-semibold tabular-nums',
            dark ? 'text-white/30' : 'text-forest/25',
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3
        className={cn(
          'mt-8 font-display text-xl leading-snug font-semibold',
          dark ? 'text-white' : 'text-forest',
        )}
      >
        <Link
          href={{ pathname: '/domains/[slug]', params: { slug: domain.slug } }}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {domain.title}
        </Link>
      </h3>
      <p className={cn('mt-3 leading-relaxed', dark ? 'text-white/65' : 'text-ink-muted')}>
        {domain.summary}
      </p>
      <span
        aria-hidden="true"
        className={cn(
          'mt-auto flex items-center gap-2 pt-6 text-sm font-semibold transition-all',
          dark ? 'text-gold' : 'text-leaf',
        )}
      >
        <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />→
      </span>
    </article>
  )
}
