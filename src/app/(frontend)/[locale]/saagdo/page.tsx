import { ExternalLink, FlaskConical, Lock, PlayCircle } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NetworkField } from '@/components/decor/network-field'
import { Icon } from '@/components/icon'
import { CmsImage } from '@/components/media/cms-image'
import { Reveal } from '@/components/motion/reveal'
import { SaagdoDemoLoader } from '@/components/saagdo/demo-loader'
import { FlowDiagram } from '@/components/saagdo/flow-diagram'
import { SaagdoMockup } from '@/components/saagdo/mockup'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { pathFor, pathForSlug } from '@/lib/navigation'
import { getFaqs, getNewsBySlug, getPartners, getProjectBySlug, getSaagdoPage } from '@/lib/queries'
import { buildMetadata, jsonLd } from '@/lib/seo'
import { cn, isSafeExternalUrl } from '@/lib/utils'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const page = await getSaagdoPage(locale)
  return buildMetadata({
    locale,
    href: '/saagdo',
    title: page?.hero?.title || 'SAAGDO',
    description: page?.hero?.subtitle,
  })
}

export default async function SaagdoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tc, page, faqs, partners, project, mouNews] = await Promise.all([
    getTranslations({ locale, namespace: 'saagdo' }),
    getTranslations({ locale, namespace: 'common' }),
    getSaagdoPage(locale),
    getFaqs(locale, 'saagdo'),
    getPartners(locale),
    getProjectBySlug('saagdo', locale),
    getNewsBySlug('protocole-accord-gwp-afrique-de-l-ouest', locale),
  ])
  // Real photos come from the SAAGDO project and the MoU article, edited there.
  const asMedia = (m: unknown) => (m && typeof m === 'object' ? (m as Media) : null)
  const teamPhoto = asMedia(project?.coverImage)
  const mouPhoto = asMedia(mouNews?.coverImage)
  const gwp = partners.find((p) => p.slug === 'gwp-afrique-de-l-ouest')
  const platformUrl = isSafeExternalUrl(page?.platformUrl) ? page.platformUrl : null
  const videoUrl = isSafeExternalUrl(page?.videoUrl) ? page.videoUrl : null

  return (
    <div className="bg-night text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}
      />
      {/* A. Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
        <NetworkField
          className="absolute inset-0 -z-10 size-full opacity-60"
          pulses={[2, 5, 10, 13, 19, 21]}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-digital/15 blur-[140px]"
        />
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'SAAGDO' }]} />
          <div className="mt-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Badge tone="digital" dot>
                {page?.hero?.eyebrow}
              </Badge>
              <h1 className="mt-6 text-h1 font-semibold">
                {(() => {
                  const title = page?.hero?.title || 'SAAGDO'
                  const [head, ...tail] = title.split(':')
                  return tail.length ? (
                    <>
                      <span className="text-digital">{head}</span> :
                      <span className="block">{tail.join(':')}</span>
                    </>
                  ) : (
                    title
                  )
                })()}
              </h1>
              <p className="mt-6 text-lead text-white/72">{page?.hero?.subtitle}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {platformUrl ? (
                  <a
                    href={platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'digital', size: 'lg' })}
                  >
                    {t('openPlatform')} <ExternalLink aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    className={cn(
                      buttonVariants({ variant: 'light', size: 'lg' }),
                      'cursor-not-allowed',
                    )}
                    aria-disabled="true"
                    title={t('platformUnavailable')}
                  >
                    <Lock aria-hidden="true" /> {t('openPlatform')}
                  </span>
                )}
                <a href="#demo" className={buttonVariants({ variant: 'digital', size: 'lg' })}>
                  {t('demoTitle')} <ArrowGlyph />
                </a>
              </div>
              {!platformUrl && (
                <p className="mt-4 text-sm text-white/55">{t('platformUnavailable')}</p>
              )}
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 font-semibold text-white hover:text-digital"
                >
                  <PlayCircle
                    className="size-10 text-digital transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                  {t('watchVideo')}
                  <span className="sr-only">{tc('openInNewTab')}</span>
                </a>
              )}
            </div>
            <div className="lg:col-span-6">
              <SaagdoMockup label={tc('fictitious')} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {teamPhoto && (
        <section className="pb-24 md:pb-28">
          <figure className="container-page">
            <CmsImage
              media={teamPhoto}
              size="hero"
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="aspect-[16/9] rounded-[1.75rem] ring-1 ring-white/10 md:aspect-[21/9]"
              showProvenance={false}
            />
            {teamPhoto.caption && (
              <figcaption className="mt-4 text-sm text-white/70">{teamPhoto.caption}</figcaption>
            )}
          </figure>
        </section>
      )}

      {/* B. Problem */}
      <section
        className="relative border-t border-white/8 py-24 md:py-28"
        aria-labelledby="problem"
      >
        <div className="container-page">
          <SectionHeading
            id="problem"
            tone="dark"
            eyebrow={t('problemEyebrow')}
            title={t('problemTitle')}
            description={page?.problemIntro}
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/8 ring-1 ring-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {(page?.problems ?? []).map((p, i) => (
              <Reveal as="li" key={p.id ?? i} delay={(i % 3) * 0.06} className="bg-night p-8">
                <Icon name={p.icon} className="size-7 text-gold" />
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/62">{p.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* C. Solution */}
      <section className="relative bg-night-800 py-24 md:py-28" aria-labelledby="solution">
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative container-page">
          <SectionHeading
            id="solution"
            tone="dark"
            eyebrow={t('solutionEyebrow')}
            title={t('solutionTitle')}
            description={page?.solutionIntro}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(page?.components ?? []).map((c, i) => (
              <Reveal as="li" key={c.id ?? i} delay={i * 0.06}>
                <div className="group h-full rounded-[1.25rem] bg-white/[0.04] p-6 ring-1 ring-white/10 transition-all hover:bg-white/[0.07] hover:ring-digital/40">
                  <span className="grid size-12 place-items-center rounded-xl bg-digital/12 text-digital transition-colors group-hover:bg-digital group-hover:text-night">
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* D. Flow */}
      <section className="py-24 md:py-28" aria-labelledby="flow">
        <div className="container-page">
          <SectionHeading id="flow" tone="dark" eyebrow={t('flowEyebrow')} title={t('flowTitle')} />
          <div className="mt-14">
            <FlowDiagram
              steps={(page?.flow ?? []).map((f) => ({
                title: f.title ?? '',
                description: f.description,
                icon: f.icon,
              }))}
            />
          </div>
        </div>
      </section>

      {/* E. Demo */}
      {page?.showDemo !== false && (
        <section
          id="demo"
          className="scroll-mt-24 border-y border-white/8 bg-night-800 py-24 md:py-28"
          aria-labelledby="demo-title"
        >
          <div className="container-page">
            <SectionHeading
              id="demo-title"
              tone="dark"
              eyebrow={t('demoEyebrow')}
              title={t('demoTitle')}
            />
            <p
              role="note"
              className="mt-6 flex max-w-3xl items-start gap-3 rounded-xl bg-gold/10 px-4 py-3 text-sm text-gold ring-1 ring-gold/30"
            >
              <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t('demoDisclaimer')}
            </p>
            <div className="mt-10">
              <SaagdoDemoLoader />
            </div>
          </div>
        </section>
      )}

      {/* F. Partnership */}
      <section className="py-24 md:py-28" aria-labelledby="partnership">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="partnership"
              tone="dark"
              eyebrow={t('partnershipEyebrow')}
              title={t('partnershipTitle')}
            />
            <p className="mt-6 text-lead text-white/75">{page?.partnershipText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {isSafeExternalUrl(page?.partnershipSourceUrl) && (
                <a
                  href={page.partnershipSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'light' })}
                >
                  {tc('officialSource')} <ExternalLink aria-hidden="true" />
                  <span className="sr-only">{tc('openInNewTab')}</span>
                </a>
              )}
              <NextLink
                href={pathForSlug(
                  '/news/[slug]',
                  'protocole-accord-gwp-afrique-de-l-ouest',
                  locale,
                )}
                className={buttonVariants({ variant: 'ghost' }) + ' text-white hover:bg-white/10'}
              >
                {tc('readMore')} <ArrowGlyph />
              </NextLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            {mouPhoto ? (
              <figure className="relative">
                <CmsImage
                  media={mouPhoto}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[4/5] rounded-[1.75rem] ring-1 ring-gold/25"
                  showProvenance={false}
                />
                <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-night/85 px-5 py-4 backdrop-blur-md">
                  <span className="eyebrow text-gold">{gwp?.agreementType ?? 'MoU'}</span>
                  <span className="mt-1 block font-display text-2xl font-semibold">03.07.2026</span>
                  <span className="text-sm text-white/75">{mouPhoto.caption}</span>
                </figcaption>
              </figure>
            ) : (
              <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-forest to-night-700 p-8 ring-1 ring-gold/25">
                <p className="eyebrow text-gold">{gwp?.agreementType ?? 'MoU'}</p>
                <p className="mt-4 font-display text-4xl font-semibold sm:text-5xl">03.07.2026</p>
                <p className="mt-4 text-white/75">{gwp?.name ?? 'Global Water Partnership'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* G. FAQ */}
      {faqs.length > 0 && (
        <section className="border-t border-white/8 py-24 md:py-28" aria-labelledby="faq">
          <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading id="faq" tone="dark" title={t('faqTitle')} />
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="text-white">
                {faqs.map((f) => (
                  <AccordionItem key={f.id} value={String(f.id)}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* H. CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-digital/25 via-forest to-night-800 p-10 ring-1 ring-digital/30 md:p-16">
            <NetworkField className="absolute inset-0 -z-10 size-full opacity-40" />
            <h2 className="max-w-3xl text-h2 font-semibold">{t('ctaTitle')}</h2>
            <p className="mt-5 max-w-2xl text-lead text-white/75">{t('ctaText')}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <NextLink
                href={pathFor('/contact', locale) + '?subject=saagdo'}
                className={buttonVariants({ variant: 'light', size: 'lg' })}
              >
                {t('ctaLearn')}
              </NextLink>
              <NextLink
                href={pathFor('/partners/become', locale) + '?type=saagdo'}
                className={buttonVariants({ variant: 'digital', size: 'lg' })}
              >
                {t('ctaCollab')} <ArrowGlyph />
              </NextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
