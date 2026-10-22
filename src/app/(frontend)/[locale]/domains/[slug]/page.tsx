import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ProjectCard } from '@/components/cards/project-card'
import { Icon } from '@/components/icon'
import { CmsImage } from '@/components/media/cms-image'
import { RichText } from '@/components/rich-text'
import { PageHero } from '@/components/sections/page-hero'
import { FallbackNotice } from '@/components/sections/fallback-notice'
import { Section } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getDomainBySlug, getDomains, getProjects } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const domain = await getDomainBySlug(slug, locale)
  if (!domain) return {}
  return buildMetadata({
    locale,
    href: { pathname: '/domains/[slug]', params: { slug } },
    title: domain.title,
    description: domain.summary,
    image: domain.image,
    seo: domain.seo,
  })
}

export default async function DomainPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [t, domain, all, projects] = await Promise.all([
    getTranslations({ locale, namespace: 'domains' }),
    getDomainBySlug(slug, locale),
    getDomains(locale),
    getProjects(locale, { domain: slug, limit: 6 }),
  ])
  if (!domain) notFound()
  const others = all.filter((d) => d.id !== domain.id)

  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={domain.title}
        description={domain.summary}
        image={domain.image}
        crumbs={[{ label: t('title'), href: '/domains', url: '/domains' }, { label: domain.title }]}
        aside={
          <div className="hidden justify-end lg:flex">
            <span className="grid size-28 place-items-center rounded-[2rem] bg-white/8 text-gold ring-1 ring-white/15 backdrop-blur">
              <Icon name={domain.icon} className="size-14" />
            </span>
          </div>
        }
      />
      <Section tone="ivory">
        {domain._isFallback && <FallbackNotice className="mb-10" />}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RichText data={domain.body} />
          </div>
          {domain.focusPoints && domain.focusPoints.length > 0 && (
            <aside className="lg:col-span-5">
              <div className="rounded-[1.75rem] bg-forest p-8 text-white lg:sticky lg:top-28">
                <h2 className="eyebrow text-gold">{t('linesOfWork')}</h2>
                <ul className="mt-6 space-y-4">
                  {domain.focusPoints.map((p, i) => (
                    <li key={p.id ?? i} className="flex gap-3">
                      <span className="mt-0.5 font-display text-sm font-semibold text-digital tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/85">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
        {domain.image && typeof domain.image === 'object' && (
          <CmsImage
            media={domain.image}
            className="mt-14 aspect-[21/9] rounded-[2rem]"
            size="hero"
            sizes="100vw"
          />
        )}
      </Section>
      <Section tone="white">
        <h2 className="font-display text-h3 font-semibold text-forest">{t('relatedProjects')}</h2>
        <div className="mt-10">
          {projects.docs.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.docs.map((p) => (
                <li key={p.id}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title={t('relatedProjects')} description={t('noProjects')} />
          )}
        </div>
      </Section>
      <Section tone="ivory" className="py-16 md:py-20">
        <h2 className="eyebrow text-leaf">{t('otherDomains')}</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {others.map((d) => (
            <li key={d.id}>
              <Link
                href={{ pathname: '/domains/[slug]', params: { slug: d.slug } }}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-forest shadow-soft ring-1 ring-forest/5 transition-colors hover:bg-forest hover:text-white"
              >
                <Icon name={d.icon} className="size-4" />
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
