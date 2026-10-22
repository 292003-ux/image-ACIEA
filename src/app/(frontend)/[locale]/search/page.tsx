import { Search as SearchIcon } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { searchAll, type SearchHit } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'search' })
  return buildMetadata({ locale, href: '/search', title: t('title'), noIndex: true })
}

const ROUTE = {
  projects: '/projects/[slug]',
  news: '/news/[slug]',
  publications: '/publications/[slug]',
  events: '/events/[slug]',
  domains: '/domains/[slug]',
} as const

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { q = '' } = await searchParams
  const query = q.trim().slice(0, 80)
  const [t, tc, hits] = await Promise.all([
    getTranslations({ locale, namespace: 'search' }),
    getTranslations({ locale, namespace: 'common' }),
    searchAll(locale, query),
  ])
  const groups = (Object.keys(ROUTE) as SearchHit['type'][])
    .map((type) => ({ type, hits: hits.filter((h) => h.type === type) }))
    .filter((g) => g.hits.length)
  return (
    <>
      <PageHero title={t('title')} description={t('intro')} crumbs={[{ label: t('title') }]}>
        <form role="search" method="get" className="relative max-w-2xl">
          <label htmlFor="site-search" className="sr-only">
            {tc('search')}
          </label>
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/60"
            aria-hidden="true"
          />
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={query}
            minLength={2}
            maxLength={80}
            placeholder={t('placeholder')}
            className="h-14 w-full rounded-full border border-white/20 bg-white/10 pr-32 pl-14 text-white backdrop-blur outline-none placeholder:text-white/50 focus:border-gold focus:ring-4 focus:ring-gold/20"
          />
          <button
            type="submit"
            className="absolute top-1.5 right-1.5 h-11 rounded-full bg-gold px-5 font-display text-sm font-semibold text-forest-900 hover:bg-[#e0bd78]"
          >
            {tc('search')}
          </button>
        </form>
      </PageHero>
      <Section tone="ivory">
        {query.length < 2 ? (
          <p className="text-ink-muted">{t('minChars')}</p>
        ) : groups.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="size-7" aria-hidden="true" />}
            title={t('noResults', { query })}
          />
        ) : (
          <div className="space-y-14">
            <p className="text-sm text-ink-muted" aria-live="polite">
              {tc('results', { count: hits.length })}
            </p>
            {groups.map((g) => (
              <section key={g.type} aria-labelledby={`g-${g.type}`}>
                <h2 id={`g-${g.type}`} className="eyebrow text-leaf">
                  {t(`groups.${g.type}`)} · {g.hits.length}
                </h2>
                <ul className="mt-5 divide-y divide-forest/8 rounded-[1.5rem] bg-white shadow-soft">
                  {g.hits.map((h) => (
                    <li key={`${h.type}-${h.slug}`}>
                      <Link
                        href={{ pathname: ROUTE[h.type], params: { slug: h.slug } }}
                        className="block p-6 transition-colors hover:bg-ivory/60"
                      >
                        <p className="font-display text-lg font-semibold text-forest">{h.title}</p>
                        {h.excerpt && (
                          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{h.excerpt}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
