import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type CatalogSearchParams, ProjectsCatalog } from '@/components/projects/catalog'
import { PageHero } from '@/components/sections/page-hero'
import type { Locale } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<CatalogSearchParams> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })
  return buildMetadata({
    locale,
    href: '/projects/ongoing',
    title: t('ongoingTitle'),
    description: t('ongoingIntro'),
  })
}

export default async function ProjectsOngoingPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'projects' })
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={t('ongoingTitle')}
        description={t('ongoingIntro')}
        crumbs={[
          { label: t('title'), href: '/projects', url: '/projects' },
          { label: t('ongoingTitle') },
        ]}
        decor="network"
        tone="night"
      />
      <ProjectsCatalog
        locale={locale}
        searchParams={await searchParams}
        fixedStatus="ongoing"
        pathname="/projects/ongoing"
        showImpact={false}
      />
    </>
  )
}
