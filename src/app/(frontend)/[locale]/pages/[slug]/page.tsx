import { setRequestLocale } from 'next-intl/server'
import { CmsPage } from '@/components/sections/cms-page'
import type { Locale } from '@/i18n/routing'
import { getPageBySlug } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const page = await getPageBySlug(slug, locale)
  if (!page) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/pages/[slug]', params: { slug } },
    title: page.title,
    description: page.intro,
    seo: page.seo,
  })
}

export default async function GenericPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  return <CmsPage slug={slug} locale={locale} />
}
