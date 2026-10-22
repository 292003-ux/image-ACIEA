import {
  Building2,
  Cpu,
  FlaskConical,
  Handshake,
  HeartHandshake,
  Landmark,
  Users,
} from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PartnerCard } from '@/components/cards/partner-card'
import { PartnershipForm } from '@/components/forms/partnership-form'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/sections/page-hero'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowGlyph, buttonVariants } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { pathFor } from '@/lib/navigation'
import { getFaqs, getPartners } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partners' })
  return buildMetadata({ locale, href: '/partners', title: t('title'), description: t('intro') })
}

const COOPERATION = [
  { key: 'institutional', icon: Landmark },
  { key: 'technical', icon: Building2 },
  { key: 'scientific', icon: FlaskConical },
  { key: 'technological', icon: Cpu },
  { key: 'community', icon: Users },
  { key: 'financial', icon: HeartHandshake },
] as const

const COOPERATION_TEXT = {
  fr: {
    institutional:
      'Ministères, collectivités et agences publiques : alignement avec les politiques et appui aux territoires.',
    technical:
      'Organisations techniques et ONG : expertise de terrain, méthodologies et mise en œuvre conjointe.',
    scientific:
      'Universités et centres de recherche : production de connaissances, données et évaluation.',
    technological:
      'Acteurs du numérique : outils de collecte, cartographie, analyse de données et IA.',
    community:
      'Associations et organisations communautaires : ancrage local, mobilisation et participation.',
    financial:
      'Bailleurs et fondations : soutien aux projets, uniquement dans un cadre formalisé et transparent.',
  },
  en: {
    institutional:
      'Ministries, local authorities and public agencies: policy alignment and support to territories.',
    technical:
      'Technical organisations and NGOs: field expertise, methods and joint implementation.',
    scientific: 'Universities and research centres: knowledge production, data and evaluation.',
    technological: 'Digital actors: data collection, mapping, data analysis and AI tools.',
    community:
      'Associations and community organisations: local roots, mobilisation and participation.',
    financial:
      'Donors and foundations: project support, only within a formal and transparent framework.',
  },
}

const WHY = {
  fr: [
    {
      title: 'Démultiplier l’impact',
      text: 'Les défis climatiques et environnementaux dépassent les capacités d’un acteur isolé.',
    },
    {
      title: 'Croiser les expertises',
      text: 'Science, technologie, action publique et terrain se renforcent mutuellement.',
    },
    {
      title: 'Ancrer les solutions',
      text: 'Les partenariats locaux garantissent des solutions adaptées et appropriées par les communautés.',
    },
  ],
  en: [
    {
      title: 'Multiply impact',
      text: 'Climate and environmental challenges exceed what any single actor can address.',
    },
    {
      title: 'Combine expertise',
      text: 'Science, technology, public action and field work reinforce one another.',
    },
    {
      title: 'Root solutions locally',
      text: 'Local partnerships ensure solutions are adapted to and owned by communities.',
    },
  ],
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn, partners, faqs] = await Promise.all([
    getTranslations({ locale, namespace: 'partners' }),
    getTranslations({ locale, namespace: 'nav' }),
    getPartners(locale),
    getFaqs(locale, 'partners'),
  ])
  const framework = partners.find((p) => p.agreementType)
  return (
    <>
      <PageHero
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
        decor="network"
      >
        <NextLink
          href={pathFor('/partners/become', locale)}
          className={buttonVariants({ variant: 'gold', size: 'lg' })}
        >
          {tn('becomePartner')} <ArrowGlyph />
        </NextLink>
      </PageHero>

      <Section tone="ivory">
        <SectionHeading title={t('whyTitle')} />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY[locale].map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.08}>
              <div className="h-full border-t-2 border-gold pt-6">
                <span className="font-display text-sm font-semibold text-gold-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-forest">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow={t('title')}
          title={t('officialTitle')}
          description={t('officialText')}
        />
        <div className="mt-12">
          {partners.length ? (
            <ul className="grid gap-6 lg:grid-cols-2">
              {partners.map((p) => (
                <li key={p.id}>
                  <PartnerCard partner={p} detailed />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<Handshake className="size-7" aria-hidden="true" />}
              title={t('emptyOfficial')}
            />
          )}
        </div>
      </Section>

      <section className="bg-forest py-20 text-white md:py-28">
        <div className="container-page">
          <SectionHeading tone="dark" title={t('typesTitle')} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COOPERATION.map(({ key, icon: I }) => (
              <li
                key={key}
                className="rounded-[var(--radius-card)] bg-white/[0.04] p-7 ring-1 ring-white/10"
              >
                <I className="size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {t(`categories.${key}`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/68">
                  {COOPERATION_TEXT[locale][key]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {framework && (
        <Section tone="ivory">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={t('frameworkTitle')}
                title={framework.name}
                description={framework.description}
              />
            </div>
            <div className="lg:col-span-7">
              <PartnerCard partner={framework} detailed />
            </div>
          </div>
        </Section>
      )}

      <Section tone="white" id="proposer">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={t('opportunitiesTitle')}
              title={t('formTitle')}
              description={t('formText')}
            />
          </div>
          <div className="rounded-[1.75rem] bg-ivory p-6 md:p-10 lg:col-span-8">
            <PartnershipForm />
          </div>
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section tone="ivory">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading title={t('faqTitle')} />
            </div>
            <div className="text-forest lg:col-span-8">
              <Accordion type="single" collapsible>
                {faqs.map((f) => (
                  <AccordionItem key={f.id} value={String(f.id)}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent className="text-ink">{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
