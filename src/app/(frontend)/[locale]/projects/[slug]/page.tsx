import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe2,
  MapPin,
  Target,
  Users,
} from 'lucide-react'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DocumentLink } from '@/components/cards/document-card'
import { NewsCard } from '@/components/cards/news-card'
import { PartnerCard } from '@/components/cards/partner-card'
import { STATUS_TONE } from '@/components/cards/project-card'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { CmsImage } from '@/components/media/cms-image'
import { RichText } from '@/components/rich-text'
import { CtaBanner } from '@/components/sections/cta-banner'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import { getProjectBySlug } from '@/lib/queries'
import { buildMetadata, jsonLd } from '@/lib/seo'
import { absoluteUrl, formatDate, isSafeExternalUrl } from '@/lib/utils'
import type { Document, Domain, Media, News, Partner } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const project = await getProjectBySlug(slug, locale)
  if (!project) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/projects/[slug]', params: { slug } },
    title: project.title,
    description: project.excerpt,
    image: project.coverImage,
    seo: project.seo,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [t, tc, project] = await Promise.all([
    getTranslations({ locale, namespace: 'projects' }),
    getTranslations({ locale, namespace: 'common' }),
    getProjectBySlug(slug, locale),
  ])
  if (!project) notFound()

  const domains = (project.domains ?? []).filter((d): d is Domain => typeof d === 'object')
  const partners = (project.partners ?? []).filter(
    (p): p is Partner => typeof p === 'object' && p._status === 'published',
  )
  const gallery = (project.gallery ?? []).filter((m): m is Media => typeof m === 'object')
  const documents = (project.documents ?? []).filter((d): d is Document => typeof d === 'object')
  const news = (project.relatedNews ?? []).filter(
    (n): n is News => typeof n === 'object' && n._status === 'published',
  )
  const achievements = (project.achievements ?? []).filter((a) => a.verified)
  const indicators = (project.indicators ?? []).filter((i) => i.verified)
  const place = [project.location?.locality, project.location?.region, project.location?.country]
    .filter(Boolean)
    .join(', ')

  const facts = [
    {
      icon: Target,
      label: tc('status'),
      value: (
        <Badge tone={STATUS_TONE[project.status]} dot>
          {t(`status.${project.status}`)}
        </Badge>
      ),
    },
    project.startDate && {
      icon: CalendarDays,
      label: t('startDate'),
      value: formatDate(project.startDate, locale),
    },
    project.endDate && {
      icon: CalendarDays,
      label: t('endDate'),
      value: formatDate(project.endDate, locale),
    },
    place && { icon: MapPin, label: tc('location'), value: place },
    // The scale is left out when it only repeats the location (e.g. "West Africa").
    project.location?.scope &&
      t(`scope.${project.location.scope}`) !== place && {
        icon: Globe2,
        label: t('mapScope'),
        value: t(`scope.${project.location.scope}`),
      },
    project.targetAudience && { icon: Users, label: t('audience'), value: project.targetAudience },
  ].filter(Boolean) as { icon: typeof Target; label: string; value: React.ReactNode }[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@context': 'https://schema.org',
          '@type': 'Project',
          name: project.title,
          description: project.excerpt,
          url: absoluteUrl(
            `/${locale}/${locale === 'fr' ? 'projets' : 'projects'}/${project.slug}`,
          ),
          ...(project.startDate ? { startDate: project.startDate } : {}),
          ...(project.endDate ? { endDate: project.endDate } : {}),
          parentOrganization: { '@type': 'NGO', name: 'ACIEA' },
        })}
      />
      <section className="relative isolate overflow-hidden bg-forest pt-32 pb-0 text-white md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/projects', url: pathFor('/projects', locale) },
              { label: project.title },
            ]}
          />
          <div className="grid grid-cols-1 gap-10 pb-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <Badge key={d.id} tone="night">
                    {d.title}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-6 text-h1 font-semibold">{project.title}</h1>
              <p className="mt-6 max-w-3xl text-lead text-white/75">{project.excerpt}</p>
            </div>
          </div>
        </div>
        <div className="container-page">
          <CmsImage
            media={project.coverImage}
            size="hero"
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="relative -mb-24 aspect-[21/9] rounded-t-[2rem] shadow-lift md:-mb-32"
            placeholderSeed={project.slug}
          />
        </div>
      </section>

      <Section tone="ivory" className="pt-36 md:pt-44">
        {project._isFallback && <FallbackNotice className="mb-10" />}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <article className="space-y-14 lg:col-span-8">
            {project.context && (
              <section aria-labelledby="context">
                <h2 id="context" className="font-display text-h3 font-semibold text-forest">
                  {t('context')}
                </h2>
                <RichText data={project.context} className="mt-5" />
              </section>
            )}
            {project.objectives && project.objectives.length > 0 && (
              <section aria-labelledby="objectives">
                <h2 id="objectives" className="font-display text-h3 font-semibold text-forest">
                  {t('objectives')}
                </h2>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.objectives.map((o, i) => (
                    <li key={o.id ?? i} className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft">
                      <span className="font-display text-sm font-semibold text-gold-600 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{o.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            {project.activities && project.activities.length > 0 && (
              <section aria-labelledby="activities">
                <h2 id="activities" className="font-display text-h3 font-semibold text-forest">
                  {t('activities')}
                </h2>
                <ul className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
                  {project.activities.map((a, i) => (
                    <li key={a.id ?? i} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                      <p className="font-display font-semibold text-forest">{a.title}</p>
                      {a.description && (
                        <p className="text-ink-muted sm:col-span-2">{a.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {achievements.length > 0 && (
              <section aria-labelledby="achievements">
                <h2 id="achievements" className="font-display text-h3 font-semibold text-forest">
                  {t('achievements')}
                </h2>
                <ul className="mt-6 space-y-3">
                  {achievements.map((a, i) => (
                    <li key={a.id ?? i} className="flex gap-3 rounded-2xl bg-success-bg/60 p-5">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      <span>
                        {a.text}
                        {isSafeExternalUrl(a.sourceUrl) && (
                          <a
                            href={a.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-leaf hover:underline"
                          >
                            {tc('source')} <ExternalLink className="size-3" aria-hidden="true" />
                            <span className="sr-only">{tc('openInNewTab')}</span>
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {indicators.length > 0 && (
              <section aria-labelledby="indicators">
                <h2 id="indicators" className="font-display text-h3 font-semibold text-forest">
                  {t('indicators')}
                </h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  {indicators.map((ind, i) => (
                    <div key={ind.id ?? i} className="rounded-2xl bg-forest p-6 text-white">
                      <dd className="font-display text-3xl font-semibold">
                        {ind.value}
                        {ind.unit && <span className="ml-1 text-base text-gold">{ind.unit}</span>}
                      </dd>
                      <dt className="mt-2 text-sm text-white/70">{ind.label}</dt>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {gallery.length > 0 && (
              <section aria-labelledby="gallery">
                <h2 id="gallery" className="font-display text-h3 font-semibold text-forest">
                  {t('gallery')}
                </h2>
                <div className="mt-6">
                  <GalleryGrid items={gallery} />
                </div>
              </section>
            )}
          </article>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-soft lg:sticky lg:top-28">
              <h2 className="eyebrow text-leaf">{t('keyFacts')}</h2>
              <dl className="mt-5 space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="relative pl-7">
                    <f.icon
                      className="absolute top-0.5 left-0 size-4 text-gold-600"
                      aria-hidden="true"
                    />
                    <dt className="text-xs text-ink-muted">{f.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-forest">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {project.links && project.links.length > 0 && (
                <div className="mt-6 border-t border-forest/8 pt-5">
                  <h3 className="eyebrow text-leaf">{t('links')}</h3>
                  <ul className="mt-3 space-y-2">
                    {project.links
                      .filter((l) => isSafeExternalUrl(l.url))
                      .map((l, i) => (
                        <li key={l.id ?? i}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-leaf hover:underline"
                          >
                            {l.label} <ExternalLink className="size-3.5" aria-hidden="true" />
                            <span className="sr-only">{tc('openInNewTab')}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              {documents.length > 0 && (
                <div className="mt-6 space-y-3 border-t border-forest/8 pt-5">
                  <h3 className="eyebrow text-leaf">{t('documents')}</h3>
                  {documents.map((d) => (
                    <DocumentLink key={d.id} document={d} />
                  ))}
                </div>
              )}
              <NextLink
                href={pathFor('/partners/become', locale)}
                className={`${buttonVariants({ variant: 'primary' })} mt-6 w-full`}
              >
                {t('ctaTitle')} <ArrowGlyph />
              </NextLink>
            </div>
          </aside>
        </div>
      </Section>

      {partners.length > 0 && (
        <Section tone="white">
          <h2 className="font-display text-h3 font-semibold text-forest">{t('partners')}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {partners.map((p) => (
              <li key={p.id}>
                <PartnerCard partner={p} compact />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {news.length > 0 && (
        <Section tone="ivory">
          <h2 className="font-display text-h3 font-semibold text-forest">{t('relatedNews')}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <li key={n.id}>
                <NewsCard article={n} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        title={t('ctaTitle')}
        text={t('ctaText')}
        actions={
          <NextLink
            href={pathFor('/partners/become', locale)}
            className={buttonVariants({ variant: 'gold', size: 'lg' })}
          >
            {tc('learnMore')} <ArrowGlyph />
          </NextLink>
        }
      />
    </>
  )
}
