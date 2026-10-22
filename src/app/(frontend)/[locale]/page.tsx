import { Landmark } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NewsCard } from '@/components/cards/news-card'
import { ProjectCard } from '@/components/cards/project-card'
import { HomeHero } from '@/components/home/hero'
import { SaagdoFeature } from '@/components/home/saagdo-feature'
import { Icon } from '@/components/icon'
import { CmsImage } from '@/components/media/cms-image'
import { VideoPlayer } from '@/components/media/video-player'
import { Reveal } from '@/components/motion/reveal'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { isLocale, type Locale } from '@/i18n/routing'
import { pathFor, pathForSlug } from '@/lib/navigation'
import {
  getDomains,
  getFeaturedProjects,
  getHomepage,
  getNews,
  getPartners,
  getSaagdoPage,
} from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, href: '/' })
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const [t, tn, home, domains, projects, partners, news, saagdoPage] = await Promise.all([
    getTranslations({ locale, namespace: 'home' }),
    getTranslations({ locale, namespace: 'nav' }),
    getHomepage(locale),
    getDomains(locale),
    getFeaturedProjects(locale, 4),
    getPartners(locale),
    getNews(locale, { limit: 3 }),
    getSaagdoPage(locale),
  ])
  const intro = home?.intro
  const asMedia = (m: unknown) => (m && typeof m === 'object' ? (m as Media) : null)
  const introVideo = asMedia(intro?.video)
  // SAAGDO has its own section just below: keep it out of the project cards.
  const otherProjects = projects.filter((p) => p.slug !== 'saagdo').slice(0, 3)

  return (
    <>
      <HomeHero hero={home?.hero} locale={locale} />

      {/* Presentation */}
      <Section id="presentation" tone="ivory" className="overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow={intro?.eyebrow ?? undefined} title={intro?.title ?? 'ACIEA'} />
            {intro?.text && (
              <div className="mt-6 space-y-4 text-lead text-ink-muted">
                {intro.text.split(/\n\s*\n/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            <NextLink
              href={pathFor('/about', locale)}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-10')}
            >
              {t('introCta')}
              <ArrowGlyph />
            </NextLink>
          </Reveal>
          <Reveal className="relative lg:col-span-6" delay={0.15}>
            <div className="relative mx-auto max-w-lg lg:ml-auto">
              <div
                aria-hidden="true"
                className="absolute -top-6 -right-6 size-40 rounded-3xl bg-grid-light"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-8 size-56 rounded-full bg-leaf/12 blur-3xl"
              />
              {introVideo ? (
                <VideoPlayer
                  video={introVideo}
                  poster={asMedia(intro?.videoPoster)}
                  className="relative mx-auto max-w-[22rem]"
                  videoClassName="aspect-[9/16] rounded-[2rem] shadow-lift"
                  captionClassName="mt-4 text-center text-sm text-ink-muted"
                />
              ) : (
                <>
                  <CmsImage
                    media={intro?.image}
                    className="relative aspect-[4/5] rounded-[2rem] shadow-lift"
                    sizes="(min-width: 1024px) 520px, 100vw"
                    placeholderSeed="intro"
                  />
                  {intro?.secondaryImage && typeof intro.secondaryImage === 'object' && (
                    <CmsImage
                      media={intro.secondaryImage}
                      size="thumbnail"
                      className="absolute -bottom-10 left-2 aspect-square w-36 rounded-2xl shadow-lift ring-8 ring-ivory sm:-left-6 sm:w-48"
                      sizes="192px"
                    />
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Our work: focus areas + projects */}
      <section className="relative bg-white py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-light [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="relative container-page">
          <SectionHeading
            eyebrow={tn('actions')}
            title={t('domainsTitle')}
            description={t('domainsText')}
            action={
              <NextLink
                href={pathFor('/projects', locale)}
                className={buttonVariants({ variant: 'outline' })}
              >
                {t('projectsCta')}
                <ArrowGlyph />
              </NextLink>
            }
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d) => (
              <li key={d.id}>
                <NextLink
                  href={pathForSlug('/domains/[slug]', d.slug, locale)}
                  className="group flex h-full items-center gap-4 rounded-2xl bg-ivory p-4 ring-1 ring-forest/5 transition-all hover:bg-white hover:shadow-soft"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf transition-colors group-hover:bg-forest group-hover:text-gold">
                    <Icon name={d.icon} className="size-5" />
                  </span>
                  <span className="font-display leading-snug font-semibold text-forest">
                    {d.title}
                  </span>
                  <ArrowGlyph className="ml-auto size-4 shrink-0 text-leaf opacity-0 transition-opacity group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
          {otherProjects.length > 0 && (
            <ul
              className={cn(
                'mt-14 grid gap-6 md:grid-cols-2',
                otherProjects.length > 2 && 'lg:grid-cols-3',
              )}
            >
              {otherProjects.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <SaagdoFeature
        locale={locale}
        title={home?.saagdo?.title}
        text={home?.saagdo?.text}
        screens={{
          platform: asMedia(saagdoPage?.screenshotPlatform),
          app: asMedia(saagdoPage?.screenshotApp),
        }}
      />

      {/* News + partners */}
      <Section tone="ivory">
        {news.docs.length > 0 && (
          <>
            <SectionHeading
              eyebrow={t('newsEyebrow')}
              title={t('newsTitle')}
              action={
                <NextLink
                  href={pathFor('/news', locale)}
                  className={buttonVariants({ variant: 'outline' })}
                >
                  {t('newsCta')}
                  <ArrowGlyph />
                </NextLink>
              }
            />
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {news.docs.map((n, i) => (
                <Reveal as="li" key={n.id} delay={i * 0.08}>
                  <NewsCard article={n} />
                </Reveal>
              ))}
            </ul>
          </>
        )}
        {partners.length > 0 && (
          <div
            className={cn(
              'flex flex-col gap-6 md:flex-row md:items-center',
              news.docs.length > 0 && 'mt-20 border-t border-forest/10 pt-12',
            )}
          >
            <p className="shrink-0 eyebrow text-leaf">{t('partnersEyebrow')}</p>
            <ul className="flex flex-wrap gap-3">
              {partners.map((p) => (
                <li key={p.id}>
                  <NextLink
                    href={pathFor('/partners', locale)}
                    className="flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-sm font-semibold text-forest ring-1 ring-forest/8 transition-shadow hover:shadow-soft"
                  >
                    <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-ivory">
                      {p.logo && typeof p.logo === 'object' ? (
                        <CmsImage
                          media={p.logo}
                          size="thumbnail"
                          sizes="36px"
                          className="size-full"
                          imgClassName="object-contain p-1"
                          showProvenance={false}
                        />
                      ) : (
                        <Landmark className="size-4 text-forest/70" aria-hidden="true" />
                      )}
                    </span>
                    {p.acronym || p.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  )
}
