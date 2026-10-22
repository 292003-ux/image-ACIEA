import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type CatalogSearchParams, ProjectsCatalog } from '@/components/projects/catalog'
import { PageHero } from '@/components/sections/page-hero'
import type { Locale } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<CatalogSearchParams> }

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'projects' })
  // Filtered variants are not indexed separately (canonical = unfiltered catalogue).
  const filtered = Boolean(sp.q || sp.status || sp.domain || sp.region || sp.page)
  return buildMetadata({
    locale,
    href: '/projects',
    title: t('title'),
    description: t('intro'),
    noIndex: filtered,
  })
}

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'projects' })
  return (
    <>
      <PageHero
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
        decor="network"
        tone="night"
      />
      <ProjectsCatalog locale={locale} searchParams={await searchParams} pathname="/projects" />
    </>
  )
}
