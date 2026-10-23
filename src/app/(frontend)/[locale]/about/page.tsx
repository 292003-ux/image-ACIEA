import { Users } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DocumentLink } from '@/components/cards/document-card'
import { CmsImage } from '@/components/media/cms-image'
import { Reveal } from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { Milestones } from '@/components/sections/milestones'
import { PageHero } from '@/components/sections/page-hero'
import { PresidentMessage } from '@/components/sections/president-message'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { TeamGrid } from '@/components/sections/team-grid'
import type { Locale } from '@/i18n/routing'
import { getAboutPage, getTeam } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import type { Document } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const [about, t] = await Promise.all([
    getAboutPage(locale),
    getTranslations({ locale, namespace: 'about' }),
  ])
  return buildMetadata({
    locale,
    href: '/about',
    title: t('title'),
    description: about?.hero?.subtitle,
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, about, team] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getAboutPage(locale),
    getTeam(locale),
  ])
  const docs = (about?.institutionalDocuments ?? []).filter(
    (d): d is Document => typeof d === 'object',
  )

  return (
    <>
      <PageHero
        eyebrow={about?.hero?.eyebrow}
        title={about?.hero?.title || t('title')}
        description={about?.hero?.subtitle}
        image={about?.hero?.image}
        crumbs={[{ label: t('title') }]}
      />

      {/* Overview */}
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-6 eyebrow text-leaf">{t('presentation')}</h2>
            <RichText
              data={about?.presentation}
              className="text-lead [&_p]:text-ink-muted [&_p:first-child]:font-serif [&_p:first-child]:text-[1.45rem] [&_p:first-child]:leading-snug [&_p:first-child]:text-forest"
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <CmsImage
              media={about?.presentationImage}
              className="aspect-[4/5] rounded-[2rem] shadow-lift"
              sizes="(min-width:1024px) 480px, 100vw"
              placeholderSeed="about"
            />
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <section className="relative isolate overflow-hidden bg-forest py-20 text-white md:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { label: t('missionTitle'), text: about?.mission },
            { label: t('visionTitle'), text: about?.vision },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.1}>
              <article className="h-full rounded-[1.75rem] bg-white/[0.04] p-8 ring-1 ring-white/10 md:p-10">
                <p className="eyebrow text-gold">{b.label}</p>
                <p className="mt-5 font-serif text-[1.45rem] leading-snug text-white/95">
                  {b.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* History */}
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={t('historyTitle')} />
            <RichText data={about?.historyIntro} className="mt-6 text-ink-muted" />
          </div>
          <div className="lg:col-span-7">
            {about?.milestones?.length ? (
              <Milestones items={about.milestones} />
            ) : (
              <EmptyState title={t('milestonesEmpty')} />
            )}
          </div>
        </div>
      </Section>

      {/* President */}
      <Section tone="white">
        <PresidentMessage
          message={about?.presidentMessage}
          locale={locale}
          className="mx-auto max-w-3xl bg-ivory"
        />
      </Section>

      {/* Team */}
      <Section tone="ivory">
        <SectionHeading title={t('teamTitle')} align="center" />
        <div className="mt-12">
          {team.length ? (
            <TeamGrid members={team} />
          ) : (
            <EmptyState
              icon={<Users className="size-7" aria-hidden="true" />}
              title={t('teamTitle')}
              description={t('teamEmpty')}
            />
          )}
        </div>
      </Section>

      {/* Documents (only once some are published) */}
      {docs.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow={t('documentsTitle')} title={t('documentsTitle')} as="h2" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {docs.map((d) => (
              <li key={d.id}>
                <DocumentLink document={d} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
