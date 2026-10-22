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

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'publications' })
  return buildMetadata({
    locale,
    href: '/publications/reports',
    title: t('reportsTitle'),
    description: t('reportsIntro'),
  })
}

export default async function ReportsPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'publications' })
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={t('reportsTitle')}
        description={t('reportsIntro')}
        crumbs={[
          { label: t('title'), href: '/publications', url: '/publications' },
          { label: t('reportsTitle') },
        ]}
      />
      <Section tone="ivory">
        <PublicationsLibrary
          locale={locale}
          pathname="/publications/reports"
          searchParams={await searchParams}
          types={['report', 'public-document', 'study']}
        />
      </Section>
    </>
  )
}
