import { FolderSearch } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ProjectCard } from '@/components/cards/project-card'
import { MapLoader } from '@/components/map/map-loader'
import type { MapMarker } from '@/components/map/projects-map'
import { KpiCard } from '@/components/sections/kpi'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/ui/pagination'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Locale, StaticPathname } from '@/i18n/routing'
import { pathForSlug } from '@/lib/navigation'
import {
  getDomains,
  getImpactMetrics,
  getProjectMapPoints,
  getProjectRegions,
  getProjects,
  getSiteSettings,
} from '@/lib/queries'
import { cn } from '@/lib/utils'
import { ProjectFilters } from './project-filters'

export type CatalogSearchParams = {
  q?: string
  status?: string
  domain?: string
  region?: string
  page?: string
  view?: string
}

export async function ProjectsCatalog({
  locale,
  searchParams,
  fixedStatus,
  pathname,
  // Both blocks are off by default since 22/10/2026 (ACIEA asked for a simpler page).
  showMap = false,
  showImpact = false,
}: {
  locale: Locale
  searchParams: CatalogSearchParams
  fixedStatus?: 'ongoing' | 'completed'
  pathname: StaticPathname
  showMap?: boolean
  showImpact?: boolean
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? '1', 10) || 1)
  const status = fixedStatus ?? searchParams.status
  const [t, tc, result, domains, regions, points, settings, metrics] = await Promise.all([
    getTranslations({ locale, namespace: 'projects' }),
    getTranslations({ locale, namespace: 'common' }),
    getProjects(locale, {
      q: searchParams.q,
      status,
      domain: searchParams.domain,
      region: searchParams.region,
      page,
    }),
    getDomains(locale),
    getProjectRegions(locale),
    showMap ? getProjectMapPoints(locale) : Promise.resolve([]),
    getSiteSettings(locale),
    showImpact ? getImpactMetrics(locale) : Promise.resolve([]),
  ])
  const list = searchParams.view === 'list'
  const markers: MapMarker[] = points.map((p) => ({
    id: String(p.id),
    title: p.title,
    href: pathForSlug('/projects/[slug]', p.slug, locale),
    lat: p.lat,
    lng: p.lng,
    kind: 'project',
    subtitle: [t(`status.${p.status}`), p.locality].filter(Boolean).join(' · '),
  }))
  if (typeof settings?.hqLatitude === 'number' && typeof settings?.hqLongitude === 'number') {
    markers.push({
      id: 'hq',
      title: t('mapHq'),
      lat: settings.hqLatitude,
      lng: settings.hqLongitude,
      kind: 'hq',
    })
  }
  const query = {
    q: searchParams.q,
    status: fixedStatus ? undefined : searchParams.status,
    domain: searchParams.domain,
    region: searchParams.region,
    view: searchParams.view,
  }

  return (
    <>
      <section className="bg-ivory py-14 md:py-20">
        <div className="container-page">
          <Suspense>
            <ProjectFilters
              domains={domains.map((d) => ({ value: d.slug, label: d.title }))}
              regions={regions}
              showStatus={!fixedStatus}
              resultCount={result.totalDocs}
            />
          </Suspense>
          <div className="mt-10">
            {result.docs.length ? (
              <ul
                className={cn('grid gap-6', list ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3')}
              >
                {result.docs.map((p, i) => (
                  <li key={p.id}>
                    <ProjectCard project={p} layout={list ? 'list' : 'grid'} priority={i < 3} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<FolderSearch className="size-7" aria-hidden="true" />}
                title={t('empty')}
              />
            )}
          </div>
          <Pagination
            pathname={pathname}
            page={result.page}
            totalPages={result.totalPages}
            query={query}
          />
        </div>
      </section>

      {showMap && (
        <section
          className="relative overflow-hidden bg-night py-20 text-white md:py-24"
          aria-labelledby="map-title"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-grid" />
          <div className="relative container-page">
            <SectionHeading
              id="map-title"
              tone="dark"
              eyebrow={t('mapScope')}
              title={t('mapTitle')}
              description={t('mapText')}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <MapLoader
                  markers={markers}
                  labels={{
                    bf: 'Burkina Faso',
                    wa: t('scope.regional'),
                    view: t('mapScope'),
                    open: t('viewProject'),
                  }}
                />
              </div>
              <aside className="space-y-4 lg:col-span-3">
                <div className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <span className="size-3 rounded-full bg-digital ring-2 ring-white" />{' '}
                    {t('mapLegendProject')}
                  </p>
                  <p className="mt-3 flex items-center gap-3 text-sm text-white/80">
                    <span className="size-3 rounded-full bg-forest ring-2 ring-gold" />{' '}
                    {t('mapLegendHq')}
                  </p>
                </div>
                {points.length === 0 && (
                  <p className="rounded-2xl bg-white/[0.04] p-5 text-sm leading-relaxed text-white/70 ring-1 ring-white/10">
                    {t('mapEmpty')}
                  </p>
                )}
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p.id}>
                      <a
                        href={pathForSlug('/projects/[slug]', p.slug, locale)}
                        className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <p className="mt-4 text-xs text-white/65">
              {tc('source')} : Natural Earth (
              {locale === 'fr' ? 'contours des pays' : 'country outlines'}).
            </p>
          </div>
        </section>
      )}

      {showImpact && metrics.length > 0 && (
        <section className="bg-forest py-20 text-white">
          <div className="container-page">
            <SectionHeading tone="dark" title={t('impactTitle')} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((m) => (
                <KpiCard
                  key={m.id}
                  value={m.value}
                  label={m.label}
                  unit={m.unit}
                  period={m.period}
                  icon={m.icon}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
