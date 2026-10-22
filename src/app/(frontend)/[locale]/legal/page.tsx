import { setRequestLocale } from 'next-intl/server'
import { CmsPage } from '@/components/sections/cms-page'
import type { Locale } from '@/i18n/routing'
import { getPageBySlug } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const page = await getPageBySlug('legal', locale)
  return buildMetadata({
    locale,
    href: '/legal',
    title: page?.title,
    description: page?.intro,
    seo: page?.seo,
  })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CmsPage slug="legal" locale={locale} />
}
