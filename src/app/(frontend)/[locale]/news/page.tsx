import { Newspaper } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NewsCard } from '@/components/cards/news-card'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/ui/pagination'
import type { Locale } from '@/i18n/routing'
import { getNews } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'news' })
  return buildMetadata({
    locale,
    href: '/news',
    title: t('title'),
    description: t('intro'),
    noIndex: Boolean(sp.page),
  })
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)
  const [t, news] = await Promise.all([
    getTranslations({ locale, namespace: 'news' }),
    getNews(locale, { page, limit: 10 }),
  ])
  const [first, ...rest] = news.docs
  const featureFirst = page === 1 && first
  return (
    <>
      <PageHero title={t('title')} description={t('intro')} crumbs={[{ label: t('title') }]} />
      <Section tone="ivory">
        <div>
          {news.docs.length === 0 ? (
            <EmptyState
              icon={<Newspaper className="size-7" aria-hidden="true" />}
              title={t('empty')}
            />
          ) : (
            <>
              {featureFirst && (
                <div className="mb-8">
                  <NewsCard article={first} variant="featured" priority />
                </div>
              )}
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(featureFirst ? rest : news.docs).map((n) => (
                  <li key={n.id}>
                    <NewsCard article={n} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <Pagination pathname="/news" page={news.page} totalPages={news.totalPages} />
      </Section>
    </>
  )
}
