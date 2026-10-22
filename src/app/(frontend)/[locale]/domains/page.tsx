import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DomainCard } from '@/components/cards/domain-card'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import type { Locale } from '@/i18n/routing'
import { getDomains } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'domains' })
  return buildMetadata({ locale, href: '/domains', title: t('title'), description: t('intro') })
}

export default async function DomainsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, domains] = await Promise.all([
    getTranslations({ locale, namespace: 'domains' }),
    getDomains(locale),
  ])
  return (
    <>
      <PageHero
        title={t('title')}
        description={t('intro')}
        crumbs={[{ label: t('title') }]}
        decor="network"
      />
      <Section tone="ivory">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <Reveal as="li" key={d.id} delay={(i % 3) * 0.07}>
              <DomainCard domain={d} index={i} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  )
}
