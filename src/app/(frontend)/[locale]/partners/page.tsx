import { Handshake } from 'lucide-react'
import NextLink from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PartnerCard } from '@/components/cards/partner-card'
import { PartnershipForm } from '@/components/forms/partnership-form'
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

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn, partners, faqs] = await Promise.all([
    getTranslations({ locale, namespace: 'partners' }),
    getTranslations({ locale, namespace: 'nav' }),
    getPartners(locale),
    getFaqs(locale, 'partners'),
  ])
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

      <Section tone="white">
        <SectionHeading title={t('officialTitle')} description={t('officialText')} />
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
