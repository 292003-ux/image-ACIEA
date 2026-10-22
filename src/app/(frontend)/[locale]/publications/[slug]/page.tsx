import { Download, ExternalLink, FileText } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { RichText } from '@/components/rich-text'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { PageHero } from '@/components/sections/page-hero'
import { buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { getPublicationBySlug } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { formatDate, formatFileSize, isSafeExternalUrl } from '@/lib/utils'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const pub = await getPublicationBySlug(slug, locale)
  if (!pub) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/publications/[slug]', params: { slug } },
    title: pub.title,
    description: pub.description,
    image: pub.coverImage,
    seo: pub.seo,
  })
}

export default async function PublicationPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [t, tc, pub] = await Promise.all([
    getTranslations({ locale, namespace: 'publications' }),
    getTranslations({ locale, namespace: 'common' }),
    getPublicationBySlug(slug, locale),
  ])
  if (!pub) notFound()
  const file = pub.file && typeof pub.file === 'object' ? pub.file : null
  return (
    <>
      <PageHero
        eyebrow={t(`types.${pub.type}`)}
        title={pub.title}
        description={pub.description}
        crumbs={[
          { label: t('title'), href: '/publications', url: '/publications' },
          { label: pub.title },
        ]}
      />
      <Section tone="ivory">
        {pub._isFallback && <FallbackNotice className="mb-8" />}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RichText data={pub.body} />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
              <FileText className="size-10 text-leaf" aria-hidden="true" />
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-ink-muted">{tc('date')}</dt>
                  <dd className="font-medium text-forest">{formatDate(pub.publishedAt, locale)}</dd>
                </div>
                {pub.authors && (
                  <div>
                    <dt className="text-ink-muted">{t('authors')}</dt>
                    <dd className="font-medium text-forest">{pub.authors}</dd>
                  </div>
                )}
                {pub.documentLanguage && (
                  <div>
                    <dt className="text-ink-muted">{t('language')}</dt>
                    <dd className="font-medium text-forest uppercase">{pub.documentLanguage}</dd>
                  </div>
                )}
              </dl>
              {file?.url && (
                <a
                  href={file.url}
                  download
                  className={`${buttonVariants({ variant: 'primary' })} mt-6 w-full`}
                >
                  <Download aria-hidden="true" /> {tc('download')}{' '}
                  {file.filesize ? `(${formatFileSize(file.filesize, locale)})` : ''}
                </a>
              )}
              {!file?.url && isSafeExternalUrl(pub.externalUrl) && (
                <a
                  href={pub.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonVariants({ variant: 'primary' })} mt-6 w-full`}
                >
                  {t('consult')} <ExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
