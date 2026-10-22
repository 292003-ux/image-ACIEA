import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { PublicationsLibrary } from '@/components/sections/publications-library'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ type?: string; q?: string; page?: string }>
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'publications' })
  return buildMetadata({
    locale,
    href: '/publications',
    title: t('title'),
    description: t('intro'),
    noIndex: Boolean(sp.type || sp.q || sp.page),
  })
}

export default async function PublicationsPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn] = await Promise.all([
    getTranslations({ locale, namespace: 'publications' }),
    getTranslations({ locale, namespace: 'nav' }),
  ])
  return (
    <>
      <PageHero
        eyebrow={tn('news')}
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
      />
      <Section tone="ivory">
        <PublicationsLibrary
          locale={locale}
          pathname="/publications"
          searchParams={await searchParams}
        />
      </Section>
    </>
  )
}
