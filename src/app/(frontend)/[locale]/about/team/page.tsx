import { Users } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { TeamGrid } from '@/components/sections/team-grid'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { TEAM_GROUPS } from '@/lib/constants'
import type { Locale } from '@/i18n/routing'
import { getTeam } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return buildMetadata({
    locale,
    href: '/about/team',
    title: t('teamTitle'),
    description: t('teamIntro'),
  })
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, team] = await Promise.all([
    getTranslations({ locale, namespace: 'about' }),
    getTeam(locale),
  ])
  const groups = TEAM_GROUPS.map((g) => ({
    key: g,
    members: team.filter((m) => (m.group ?? 'team') === g),
  })).filter((g) => g.members.length)
  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={t('teamTitle')}
        description={t('teamIntro')}
        crumbs={[{ label: t('title'), href: '/about', url: '/about' }, { label: t('teamTitle') }]}
      />
      <Section tone="ivory">
        {groups.length ? (
          <div className="space-y-20">
            {groups.map((g) => (
              <section key={g.key} aria-labelledby={`team-${g.key}`}>
                <h2
                  id={`team-${g.key}`}
                  className="mb-10 font-display text-h3 font-semibold text-forest"
                >
                  {t(`groups.${g.key}`)}
                </h2>
                <TeamGrid members={g.members} />
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="size-7" aria-hidden="true" />}
            title={t('teamTitle')}
            description={t('teamEmpty')}
          />
        )}
      </Section>
    </>
  )
}
