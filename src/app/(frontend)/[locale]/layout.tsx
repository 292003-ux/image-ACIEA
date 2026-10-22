import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type * as React from 'react'
import { Toaster } from 'sonner'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { SiteBanners } from '@/components/layout/site-banners'
import { mediaUrl } from '@/components/media/cms-image'
import { isLocale, locales } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/queries'
import { jsonLd } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import '../globals.css'

// Content is managed in the CMS and must be fresh as soon as it is published.
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#103D30',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [settings, t] = await Promise.all([getSiteSettings(locale), getTranslations({ locale, namespace: 'meta' })])
  const siteName = settings?.defaultMetaTitle || t('siteName')
  const favicon = mediaUrl(settings?.favicon ?? settings?.logo ?? null, 'thumbnail')
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: { default: siteName, template: `%s · ${settings?.shortName || 'ACIEA'}` },
    description: settings?.defaultMetaDescription || t('defaultDescription'),
    applicationName: 'ACIEA',
    icons: favicon ? { icon: favicon, apple: favicon } : { icon: '/brand/favicon.svg' },
    formatDetection: { telephone: false },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const [settings, t] = await Promise.all([getSiteSettings(locale), getTranslations({ locale, namespace: 'common' })])
  const socials = (settings?.socials ?? []).filter((s) => s.verified).map((s) => s.url)
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: settings?.organizationName || 'Alliance for Climate Innovation and Ecological Action',
    alternateName: settings?.shortName || 'ACIEA',
    url: absoluteUrl(`/${locale}`),
    ...(settings?.foundedYear ? { foundingDate: String(settings.foundedYear) } : {}),
    address: { '@type': 'PostalAddress', addressLocality: settings?.city || 'Ouagadougou', addressCountry: 'BF' },
    ...(settings?.email ? { email: settings.email } : {}),
    ...(socials.length ? { sameAs: socials } : {}),
    ...(mediaUrl(settings?.logo ?? null) ? { logo: absoluteUrl(mediaUrl(settings?.logo ?? null)!) } : {}),
  }

  return (
    <html lang={locale === 'fr' ? 'fr' : 'en'} className="scroll-smooth">
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-gold px-5 py-3 font-display text-sm font-semibold text-forest-900 shadow-lift transition-transform focus:translate-y-0"
          >
            {t('skipToContent')}
          </a>
          <SiteBanners locale={locale} englishValidated={!!settings?.englishValidated} />
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <Toaster position="bottom-center" richColors />
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
      </body>
    </html>
  )
}
