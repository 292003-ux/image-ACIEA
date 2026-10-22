import 'server-only'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { mediaUrl } from '@/components/media/cms-image'
import { getPathname } from '@/i18n/navigation'
import { type Locale, locales } from '@/i18n/routing'
import type { Media } from '@/payload-types'
import { getSiteSettings } from './queries'
import { absoluteUrl } from './utils'

type Href = Parameters<typeof getPathname>[0]['href']

export async function buildMetadata({
  locale,
  href,
  title,
  description,
  image,
  noIndex,
  type = 'website',
  publishedTime,
  seo,
}: {
  locale: Locale
  href: Href
  title?: string | null
  description?: string | null
  image?: Media | number | null
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: Media | number | null
    noIndex?: boolean | null
  } | null
}): Promise<Metadata> {
  const [settings, t] = await Promise.all([
    getSiteSettings(locale),
    getTranslations({ locale, namespace: 'meta' }),
  ])
  const siteName = settings?.defaultMetaTitle || t('siteName')
  const finalTitle = seo?.metaTitle || title || siteName
  const finalDescription =
    seo?.metaDescription ||
    description ||
    settings?.defaultMetaDescription ||
    t('defaultDescription')
  const img = mediaUrl(seo?.ogImage ?? image ?? settings?.defaultOgImage ?? null, 'hero')
  const languages: Record<string, string> = {}
  for (const l of locales)
    languages[l === 'fr' ? 'fr-BF' : 'en'] = absoluteUrl(getPathname({ href, locale: l }))
  languages['x-default'] = absoluteUrl(getPathname({ href, locale: 'fr' }))
  const canonical = absoluteUrl(getPathname({ href, locale }))

  return {
    title: finalTitle === siteName ? { absolute: siteName } : finalTitle,
    description: finalDescription.slice(0, 300),
    alternates: { canonical, languages },
    robots: noIndex || seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      siteName,
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: locale === 'fr' ? ['en_GB'] : ['fr_FR'],
      ...(img ? { images: [{ url: absoluteUrl(img), width: 1200, height: 630 }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: img ? 'summary_large_image' : 'summary',
      title: finalTitle,
      description: finalDescription,
      ...(img ? { images: [absoluteUrl(img)] } : {}),
    },
  }
}

export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}
