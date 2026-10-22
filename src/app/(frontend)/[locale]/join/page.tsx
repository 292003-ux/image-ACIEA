import { Lightbulb, Network, Sprout } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/forms/contact-form'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { getHomepage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'join' })
  return buildMetadata({ locale, href: '/join', title: t('title'), description: t('intro') })
}

export default async function JoinPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, home] = await Promise.all([
    getTranslations({ locale, namespace: 'join' }),
    getHomepage(locale),
  ])
  const ways = [
    { key: 'volunteer', icon: Sprout },
    { key: 'expertise', icon: Lightbulb },
    { key: 'network', icon: Network },
  ] as const
  return (
    <>
      <PageHero
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
        image={home?.hero?.image}
      />
      <Section tone="ivory">
        <SectionHeading title={t('waysTitle')} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {ways.map(({ key, icon: I }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08}>
              <div className="h-full rounded-[var(--radius-card)] bg-white p-8 shadow-soft">
                <span className="grid size-14 place-items-center rounded-2xl bg-forest text-gold">
                  <I className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-forest">
                  {t(`ways.${key}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{t(`ways.${key}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={t('formTitle')} description={t('formText')} />
          </div>
          <div className="rounded-[1.75rem] bg-ivory p-6 md:p-10 lg:col-span-8">
            <ContactForm defaultSubject="join" />
          </div>
        </div>
      </Section>
    </>
  )
}
