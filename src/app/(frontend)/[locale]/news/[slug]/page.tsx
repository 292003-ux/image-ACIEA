import { ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NewsCard } from '@/components/cards/news-card'
import { ProjectCard } from '@/components/cards/project-card'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { CmsImage, mediaUrl } from '@/components/media/cms-image'
import { lexicalToPlainText, RichText } from '@/components/rich-text'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { ShareLinks } from '@/components/sections/share-links'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Section } from '@/components/ui/container'
import { getPathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getNews, getNewsBySlug } from '@/lib/queries'
import { buildMetadata, jsonLd } from '@/lib/seo'
import { absoluteUrl, formatDate, isSafeExternalUrl } from '@/lib/utils'
import type { Media, Project } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const article = await getNewsBySlug(slug, locale)
  if (!article) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/news/[slug]', params: { slug } },
    title: article.title,
    description: article.excerpt || lexicalToPlainText(article.content as never, 160),
    image: article.coverImage,
    type: 'article',
    publishedTime: article.publishedAt,
    seo: article.seo,
  })
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [t, tc, article, latest] = await Promise.all([
    getTranslations({ locale, namespace: 'news' }),
    getTranslations({ locale, namespace: 'common' }),
    getNewsBySlug(slug, locale),
    getNews(locale, { limit: 4 }),
  ])
  if (!article) notFound()
  const related = latest.docs.filter((n) => n.id !== article.id).slice(0, 3)
  const projects = (article.relatedProjects ?? []).filter(
    (p): p is Project => typeof p === 'object',
  )
  const gallery = (article.gallery ?? []).filter((m): m is Media => typeof m === 'object')
  const url = absoluteUrl(
    getPathname({ href: { pathname: '/news/[slug]', params: { slug } }, locale }),
  )
  const image = mediaUrl(article.coverImage, 'hero')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          inLanguage: locale,
          mainEntityOfPage: url,
          ...(image ? { image: [absoluteUrl(image)] } : {}),
          author: { '@type': 'Organization', name: article.authorName || 'ACIEA' },
          publisher: { '@type': 'Organization', name: 'ACIEA' },
        })}
      />
      <header className="relative isolate overflow-hidden bg-forest pt-32 pb-16 text-white md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="container-page max-w-4xl">
          <Breadcrumbs
            items={[{ label: t('title'), href: '/news', url: '/news' }, { label: article.title }]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <Badge tone="gold">{t(`categories.${article.category}`)}</Badge>
            <time dateTime={article.publishedAt} className="text-white/70">
              {formatDate(
                article.publishedAt,
                locale,
                article.datePrecision === 'month' ? 'month' : 'day',
              )}
            </time>
            {article.authorName && (
              <span className="text-white/60">· {t('by', { author: article.authorName })}</span>
            )}
          </div>
          <h1 className="mt-6 text-h1 font-semibold">{article.title}</h1>
          <p className="mt-6 text-lead text-white/75">{article.excerpt}</p>
        </div>
      </header>
      {article.coverImage && typeof article.coverImage === 'object' && (
        <div className="bg-gradient-to-b from-forest from-50% to-ivory to-50%">
          <div className="container-page max-w-5xl">
            <figure>
              <CmsImage
                media={article.coverImage}
                size="hero"
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="aspect-[16/9] rounded-[1.75rem] shadow-lift"
              />
              {article.coverImage.caption && (
                <figcaption className="mt-3 text-center text-sm text-ink-muted">
                  {article.coverImage.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      )}
      <Section tone="ivory" className="pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl">
          {article._isFallback && <FallbackNotice className="mb-8" />}
          <RichText data={article.content} className="text-[1.0625rem]" />
          {gallery.length > 0 && (
            <div className="mt-12">
              <GalleryGrid items={gallery} columns={2} />
            </div>
          )}
          <div className="mt-12 flex flex-col gap-6 border-t border-forest/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {isSafeExternalUrl(article.sourceUrl) ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-leaf hover:underline"
              >
                {t('source')} <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">{tc('openInNewTab')}</span>
              </a>
            ) : (
              <span />
            )}
            <ShareLinks url={url} title={article.title} label={tc('share')} />
          </div>
        </div>
      </Section>
      {projects.length > 0 && (
        <Section tone="white">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      {related.length > 0 && (
        <Section tone="white">
          <h2 className="font-display text-h3 font-semibold text-forest">{t('related')}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((n) => (
              <li key={n.id}>
                <NewsCard article={n} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
