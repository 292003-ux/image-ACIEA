import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Icon } from '@/components/icon'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale } from '@/i18n/routing'
import { getAboutPage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const [t, about] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getAboutPage(locale),
  ])
  return buildMetadata({
    locale,
    href: '/about/mission',
    title: t('mission'),
    description: about?.mission,
  })
}

export default async function MissionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tn, about] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getTranslations({ locale, namespace: 'nav' }),
    getAboutPage(locale),
  ])
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tn('mission')}
        description={about?.mission}
        crumbs={[{ label: t('title'), href: '/about', url: '/about' }, { label: tn('mission') }]}
      />
      <Section tone="ivory">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: t('missionTitle'), text: about?.mission },
            { label: t('visionTitle'), text: about?.vision },
          ].map((b) => (
            <article key={b.label} className="rounded-[1.75rem] bg-white p-8 shadow-soft md:p-10">
              <h2 className="eyebrow text-leaf">{b.label}</h2>
              <p className="mt-5 font-serif text-[1.5rem] leading-snug text-forest">{b.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="white">
        <SectionHeading title={t('valuesTitle')} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(about?.values ?? []).map((v, i) => (
            <Reveal as="li" key={v.id ?? i} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-card)] bg-forest p-7 text-white">
                <Icon name={v.icon} className="size-7 text-gold" />
                <h3 className="mt-6 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        {about?.commitments && about.commitments.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-h3 font-semibold text-forest">
              {t('commitmentsTitle')}
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {about.commitments.map((c, i) => (
                <li key={c.id ?? i} className="flex items-start gap-4 rounded-2xl bg-ivory p-5">
                  <span className="font-display text-sm font-semibold text-gold-600 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink">{c.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Section>
    </>
  )
}
