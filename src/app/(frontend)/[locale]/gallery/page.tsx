import { Images } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import type { Locale } from '@/i18n/routing'
import { getGalleryMedia } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  return buildMetadata({ locale, href: '/gallery', title: t('title'), description: t('intro') })
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn, media] = await Promise.all([
    getTranslations({ locale, namespace: 'gallery' }),
    getTranslations({ locale, namespace: 'nav' }),
    getGalleryMedia(locale),
  ])
  const images = media.filter((m) => m.mimeType?.startsWith('image/'))
  return (
    <>
      <PageHero
        eyebrow={tn('news')}
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
      />
      <Section tone="ivory">
        {images.length ? (
          <GalleryGrid items={images} columns={4} />
        ) : (
          <EmptyState icon={<Images className="size-7" aria-hidden="true" />} title={t('empty')} />
        )}
      </Section>
    </>
  )
}
