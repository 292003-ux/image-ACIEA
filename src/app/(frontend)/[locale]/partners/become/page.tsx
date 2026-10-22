import { CheckCircle2 } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PartnershipForm } from '@/components/forms/partnership-form'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { COLLABORATION_TYPES } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ type?: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const [t, tn] = await Promise.all([
    getTranslations({ locale, namespace: 'partners' }),
    getTranslations({ locale, namespace: 'nav' }),
  ])
  return buildMetadata({
    locale,
    href: '/partners/become',
    title: tn('becomePartner'),
    description: t('formText'),
  })
}

export default async function BecomePartnerPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { type } = await searchParams
  const [t, tn, tc] = await Promise.all([
    getTranslations({ locale, namespace: 'partners' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'contact' }),
  ])
  const defaultType = COLLABORATION_TYPES.includes(type as never)
    ? (type as (typeof COLLABORATION_TYPES)[number])
    : undefined
  const steps =
    locale === 'fr'
      ? [
          'Présentez votre organisation et votre projet.',
          'L’équipe de l’ACIEA examine votre proposition.',
          'Un échange est organisé si les objectifs convergent.',
        ]
      : [
          'Introduce your organisation and project.',
          'The ACIEA team reviews your proposal.',
          'A discussion is arranged if objectives align.',
        ]
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tn('becomePartner')}
        description={t('formText')}
        crumbs={[
          { label: t('title'), href: '/partners', url: '/partners' },
          { label: tn('becomePartner') },
        ]}
      />
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest font-display text-sm font-semibold text-gold">
                    {i + 1}
                  </span>
                  <p className="pt-2 text-ink">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 flex gap-3 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink-muted shadow-soft">
              <CheckCircle2 className="size-5 shrink-0 text-leaf" aria-hidden="true" />
              {tc('responseNote')}
            </p>
          </aside>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-soft md:p-10 lg:col-span-8">
            <h2 className="mb-8 font-display text-h3 font-semibold text-forest">
              {t('formTitle')}
            </h2>
            <PartnershipForm defaultType={defaultType} />
          </div>
        </div>
      </Section>
    </>
  )
}
