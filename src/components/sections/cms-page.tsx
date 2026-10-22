import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { RichText } from '@/components/rich-text'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { getPageBySlug } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

/** Renders an editorial page managed in the "Pages" collection. */
export async function CmsPage({ slug, locale }: { slug: string; locale: Locale }) {
  const [page, t] = await Promise.all([
    getPageBySlug(slug, locale),
    getTranslations({ locale, namespace: 'legal' }),
  ])
  if (!page) notFound()
  return (
    <>
      <PageHero title={page.title} description={page.intro} crumbs={[{ label: page.title }]} />
      <Section tone="ivory">
        <div className="mx-auto max-w-3xl">
          {page._isFallback && <FallbackNotice className="mb-8" />}
          <RichText data={page.content} />
          {page.lastReviewed && (
            <p className="mt-12 border-t border-forest/10 pt-6 text-sm text-ink-muted">
              {t('lastReviewed', { date: formatDate(page.lastReviewed, locale) })}
            </p>
          )}
        </div>
      </Section>
    </>
  )
}
