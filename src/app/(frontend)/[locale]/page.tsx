import { Handshake, LineChart } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DomainCard } from '@/components/cards/domain-card'
import { NewsCard } from '@/components/cards/news-card'
import { PartnerCard } from '@/components/cards/partner-card'
import { ProjectCard } from '@/components/cards/project-card'
import { HomeHero } from '@/components/home/hero'
import { SaagdoFeature } from '@/components/home/saagdo-feature'
import { CmsImage } from '@/components/media/cms-image'
import { Reveal } from '@/components/motion/reveal'
import { CtaBanner } from '@/components/sections/cta-banner'
import { KpiCard } from '@/components/sections/kpi'
import { Testimonials } from '@/components/sections/testimonials'
import { Milestones } from '@/components/sections/milestones'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { isLocale, type Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import {
  getAboutPage,
  getDomains,
  getFeaturedProjects,
  getHomepage,
  getImpactMetrics,
  getNews,
  getPartners,
  getSiteSettings,
  getTestimonials,
} from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

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
  const [t, home, settings, domains, projects, metrics, about, partners, news, testimonials] =
    await Promise.all([
      getTranslations({ locale, namespace: 'home' }),
      getHomepage(locale),
      getSiteSettings(locale),
      getDomains(locale),
      getFeaturedProjects(locale, 3),
      getImpactMetrics(locale),
      getAboutPage(locale),
      getPartners(locale),
      getNews(locale, { limit: 3 }),
      getTestimonials(locale),
    ])
  const intro = home?.intro

  return (
    <>
      <HomeHero
        hero={home?.hero}
        locale={locale}
        foundedYear={settings?.foundedYear}
        domainsCount={domains.length}
      />

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
            {intro?.mission && (
              <blockquote className="relative mt-10 rounded-2xl border-l-2 border-gold bg-white p-6 shadow-soft">
                <p className="mb-2 eyebrow text-gold-600">{t('missionLabel')}</p>
                <p className="font-serif text-xl leading-snug text-forest">{intro.mission}</p>
              </blockquote>
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
              {settings?.foundedYear && (
                <div className="absolute top-8 left-3 rounded-2xl bg-forest px-5 py-4 text-white shadow-lift sm:-left-10">
                  <p className="font-display text-3xl font-semibold text-gold">
                    {settings.foundedYear}
                  </p>
                  <p className="text-xs text-white/70">{t('foundedLabel')}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Focus areas */}
      <section className="relative bg-white py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-light [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="relative container-page">
          <SectionHeading
            eyebrow={t('domainsEyebrow')}
            title={t('domainsTitle')}
            description={t('domainsText')}
            action={
              <NextLink
                href={pathFor('/domains', locale)}
                className={buttonVariants({ variant: 'outline' })}
              >
                {t('domainsEyebrow')}
                <ArrowGlyph />
              </NextLink>
            }
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 3) * 0.07}>
                <DomainCard domain={d} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <SaagdoFeature locale={locale} title={home?.saagdo?.title} text={home?.saagdo?.text} />

      {/* Projects */}
      {projects.length > 0 && (
        <Section tone="ivory">
          <SectionHeading
            eyebrow={t('projectsEyebrow')}
            title={t('projectsTitle')}
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
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* Impact */}
      <section className="relative isolate overflow-hidden bg-forest py-20 text-white md:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/3 -z-10 size-[30rem] rounded-full bg-digital/10 blur-[120px]"
        />
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow={t('impactEyebrow')}
            title={t('impactTitle')}
            description={t('impactText')}
          />
          {metrics.length > 0 ? (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((m) => (
                <KpiCard
                  key={m.id}
                  value={m.value}
                  label={m.label}
                  unit={m.unit}
                  period={m.period}
                  icon={m.icon}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <EmptyState
                  tone="dark"
                  icon={<LineChart className="size-7" aria-hidden="true" />}
                  title={t('impactEmptyTitle')}
                  description={t('impactEmptyText')}
                  className="text-left lg:sticky lg:top-28"
                />
              </div>
              {about?.milestones && about.milestones.length > 0 && (
                <div className="lg:col-span-7">
                  <p className="mb-8 eyebrow text-gold">{t('milestonesTitle')}</p>
                  <Milestones items={about.milestones} tone="dark" limit={5} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t('partnersEyebrow')} title={t('partnersTitle')} />
            <NextLink
              href={pathFor('/partners/become', locale)}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-10')}
            >
              <Handshake aria-hidden="true" />
              {t('partnersCta')}
            </NextLink>
          </div>
          <div className="grid gap-6 lg:col-span-7">
            {partners.slice(0, 2).map((p) => (
              <Reveal key={p.id}>
                <PartnerCard partner={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Testimonials
        items={testimonials}
        eyebrow={t('testimonialsEyebrow')}
        title={t('testimonialsTitle')}
      />

      {/* News */}
      {news.docs.length > 0 && (
        <Section tone="ivory">
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
        </Section>
      )}

      <CtaBanner
        title={
          home?.cta?.title ||
          'Construisons ensemble des solutions durables pour les générations futures.'
        }
        text={home?.cta?.text}
        className="bg-white"
        actions={
          <>
            <NextLink
              href={pathFor('/partners/become', locale)}
              className={buttonVariants({ variant: 'gold', size: 'lg' })}
            >
              {t('ctaPartner')}
              <ArrowGlyph />
            </NextLink>
            <NextLink
              href={pathFor('/join', locale)}
              className={buttonVariants({ variant: 'light', size: 'lg' })}
            >
              {t('ctaNetwork')}
            </NextLink>
          </>
        }
      />
    </>
  )
}
