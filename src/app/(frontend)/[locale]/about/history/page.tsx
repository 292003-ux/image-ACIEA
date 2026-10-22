import { getTranslations, setRequestLocale } from 'next-intl/server'
import { RichText } from '@/components/rich-text'
import { Milestones } from '@/components/sections/milestones'
import { PageHero } from '@/components/sections/page-hero'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import type { Locale } from '@/i18n/routing'
import { getAboutPage } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return buildMetadata({ locale, href: '/about/history', title: t('historyTitle') })
}

export default async function HistoryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, about] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getAboutPage(locale),
  ])
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={t('historyTitle')}
        crumbs={[
          { label: t('title'), href: '/about', url: '/about' },
          { label: t('historyTitle') },
        ]}
      />
      <Section tone="ivory">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RichText
              data={about?.historyIntro}
              className="text-lead text-ink-muted lg:sticky lg:top-28"
            />
          </div>
          <div className="lg:col-span-8">
            {about?.milestones?.length ? (
              <Milestones items={about.milestones} />
            ) : (
              <EmptyState title={t('milestonesEmpty')} />
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
