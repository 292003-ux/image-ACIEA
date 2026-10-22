import { FileText, Quote, Users } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DomainCard } from '@/components/cards/domain-card'
import { DocumentLink } from '@/components/cards/document-card'
import { Icon } from '@/components/icon'
import { CmsImage } from '@/components/media/cms-image'
import { Reveal } from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Milestones } from '@/components/sections/milestones'
import { PageHero } from '@/components/sections/page-hero'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { TeamGrid } from '@/components/sections/team-grid'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import { getAboutPage, getDomains, getTeam } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import type { Document, TeamMember } from '@/payload-types'

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
  const [t, tn, about, domains, team] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getTranslations({ locale, namespace: 'nav' }),
    getAboutPage(locale),
    getDomains(locale),
    getTeam(locale),
  ])
  const docs = (about?.institutionalDocuments ?? []).filter(
    (d): d is Document => typeof d === 'object',
  )
  const president = about?.presidentMessage
  const presidentAuthor =
    president?.author && typeof president.author === 'object'
      ? (president.author as TeamMember)
      : null

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

      {/* Values */}
      {about?.values && about.values.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow={tn('mission')} title={t('valuesTitle')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.id ?? i} delay={i * 0.06}>
                <div className="h-full rounded-[var(--radius-card)] bg-ivory p-7 ring-1 ring-forest/5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-forest text-gold">
                    <Icon name={v.icon} className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold text-forest">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          {about.commitments && about.commitments.length > 0 && (
            <div className="mt-14 rounded-[1.75rem] border border-forest/10 p-8 md:p-10">
              <p className="eyebrow text-leaf">{t('commitmentsTitle')}</p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {about.commitments.map((c, i) => (
                  <li key={c.id ?? i} className="flex gap-3 text-ink">
                    <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-gold" />
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* History */}
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={tn('history')} title={t('historyTitle')} />
            <RichText data={about?.historyIntro} className="mt-6 text-ink-muted" />
            <NextLink
              href={pathFor('/about/history', locale)}
              className={`${buttonVariants({ variant: 'outline' })} mt-8`}
            >
              {tn('history')} <ArrowGlyph />
            </NextLink>
          </div>
          <div className="lg:col-span-7">
            {about?.milestones?.length ? (
              <Milestones items={about.milestones} limit={4} />
            ) : (
              <EmptyState title={t('milestonesEmpty')} />
            )}
          </div>
        </div>
      </Section>

      {/* Focus areas */}
      <section className="bg-night py-20 text-white md:py-28">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow={tn('domains')} title={tn('domains')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <li key={d.id}>
                <DomainCard domain={d} index={i} tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Governance + president */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={tn('governance')} title={t('governanceTitle')} />
            <RichText data={about?.governance} className="mt-6 text-ink-muted" />
          </div>
          <div className="lg:col-span-6">
            <div className="relative h-full rounded-[1.75rem] bg-ivory p-8 ring-1 ring-forest/5 md:p-10">
              <Quote className="size-10 text-gold" aria-hidden="true" />
              <p className="mt-6 eyebrow text-leaf">{t('presidentTitle')}</p>
              {president?.enabled && president.text ? (
                <>
                  <blockquote className="mt-4 font-serif text-xl leading-relaxed whitespace-pre-line text-forest">
                    {president.text}
                  </blockquote>
                  {presidentAuthor && (
                    <p className="mt-6 text-sm font-semibold text-forest">
                      {presidentAuthor.name}
                      {presidentAuthor.position && (
                        <span className="font-normal text-ink-muted">
                          {' '}
                          — {presidentAuthor.position}
                        </span>
                      )}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-4 text-ink-muted">{t('presidentPending')}</p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow={tn('team')}
          title={t('teamTitle')}
          description={t('teamIntro')}
          action={
            <NextLink
              href={pathFor('/about/team', locale)}
              className={buttonVariants({ variant: 'outline' })}
            >
              {tn('team')} <ArrowGlyph />
            </NextLink>
          }
        />
        <div className="mt-12">
          {team.length ? (
            <TeamGrid members={team.slice(0, 8)} />
          ) : (
            <EmptyState
              icon={<Users className="size-7" aria-hidden="true" />}
              title={t('teamTitle')}
              description={t('teamEmpty')}
            />
          )}
        </div>
      </Section>

      {/* Documents */}
      <Section tone="white" className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('documentsTitle')} title={t('documentsTitle')} as="h2" />
        <div className="mt-10">
          {docs.length ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {docs.map((d) => (
                <li key={d.id}>
                  <DocumentLink document={d} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<FileText className="size-7" aria-hidden="true" />}
              title={t('documentsTitle')}
              description={t('documentsEmpty')}
            />
          )}
        </div>
      </Section>

      <CtaBanner
        title={t('collabTitle')}
        text={t('collabText')}
        actions={
          <>
            <NextLink
              href={pathFor('/partners/become', locale)}
              className={buttonVariants({ variant: 'gold', size: 'lg' })}
            >
              {tn('becomePartner')} <ArrowGlyph />
            </NextLink>
            <NextLink
              href={pathFor('/contact', locale)}
              className={buttonVariants({ variant: 'light', size: 'lg' })}
            >
              {tn('contact')}
            </NextLink>
          </>
        }
      />
    </>
  )
}
