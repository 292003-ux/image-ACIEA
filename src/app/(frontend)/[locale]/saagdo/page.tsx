import { ExternalLink } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NetworkField } from '@/components/decor/network-field'
import { Icon } from '@/components/icon'
import { CmsImage } from '@/components/media/cms-image'
import { VideoPlayer } from '@/components/media/video-player'
import { Reveal } from '@/components/motion/reveal'
import { SaagdoMockup } from '@/components/saagdo/mockup'
import { SaagdoScreens } from '@/components/saagdo/screens'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { getNewsBySlug, getPartners, getProjectBySlug, getSaagdoPage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { isSafeExternalUrl } from '@/lib/utils'
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
  const [t, tc, page, partners, project, mouNews] = await Promise.all([
    getTranslations({ locale, namespace: 'saagdo' }),
    getTranslations({ locale, namespace: 'common' }),
    getSaagdoPage(locale),
    getPartners(locale),
    getProjectBySlug('saagdo', locale),
    getNewsBySlug('protocole-accord-gwp-afrique-de-l-ouest', locale),
  ])
  // Real photos come from the SAAGDO project and the MoU article, edited there.
  const asMedia = (m: unknown) => (m && typeof m === 'object' ? (m as Media) : null)
  const teamPhoto = asMedia(project?.coverImage)
  const video = asMedia(page?.video)
  const mouPhoto = asMedia(mouNews?.coverImage)
  const gwp = partners.find((p) => p.slug === 'gwp-afrique-de-l-ouest')
  const platformUrl = isSafeExternalUrl(page?.platformUrl) ? page.platformUrl : null

  return (
    <div className="bg-night text-white">
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
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
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
              {platformUrl && (
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'light', size: 'lg' })}
                  >
                    {t('openPlatform')} <ExternalLink aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
            <div className="lg:col-span-6">
              {asMedia(page?.screenshotPlatform) ? (
                <SaagdoScreens
                  platform={asMedia(page?.screenshotPlatform)!}
                  app={asMedia(page?.screenshotApp)}
                />
              ) : (
                <SaagdoMockup label={tc('fictitious')} locale={locale} />
              )}
            </div>
          </div>
        </div>
      </section>

      {video ? (
        <section id="video" className="scroll-mt-28 pb-24 md:pb-28">
          <VideoPlayer
            video={video}
            poster={asMedia(page?.videoPoster) ?? teamPhoto}
            className="mx-auto w-full max-w-4xl px-4 sm:px-6"
            videoClassName="aspect-video rounded-[1.75rem] ring-1 ring-white/10"
            captionClassName="mt-4 text-sm text-white/70"
          />
        </section>
      ) : (
        teamPhoto && (
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
        )
      )}

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
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  )
}
