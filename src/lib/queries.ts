import 'server-only'
import { unstable_cache } from 'next/cache'
import type { CollectionSlug, Where } from 'payload'
import { cache } from 'react'
import { CMS_CACHE_TAG } from '@/hooks/revalidate'
import type { Locale } from '@/i18n/routing'
import type {
  AboutPage,
  Domain,
  Event,
  Faq,
  Homepage,
  ImpactMetric,
  Media,
  Navigation,
  News,
  Page,
  Partner,
  Project,
  Publication,
  SaagdoPage,
  SiteSetting,
  TeamMember,
  Testimonial,
} from '@/payload-types'
import { getPayload, isDraft } from './payload'

export type WithFallback<T> = T & { _isFallback?: boolean }

export type Paginated<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
}

const PAGE_SIZE = 9

/**
 * Public reads are cached and tagged; any CMS change expires the tag (src/hooks/revalidate.ts).
 * Draft previews always bypass the cache. A 5-minute safety net covers changes made
 * outside a request (scheduled publication jobs, scripts).
 */
function cachedRead<T>(key: unknown[], fn: () => Promise<T>): Promise<T> {
  return unstable_cache(fn, ['cms', ...key.map((k) => JSON.stringify(k ?? null))], {
    tags: [CMS_CACHE_TAG],
    revalidate: 300,
  })()
}

/** Wraps a query so that a missing database never crashes public pages. */
async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.error(`[queries] ${label} failed`, error)
    return fallback
  }
}

/** Escape LIKE wildcards supplied by visitors. */
function sanitizeQuery(q: string | undefined): string | undefined {
  const trimmed = q?.trim().slice(0, 80)
  if (!trimmed || trimmed.length < 2) return undefined
  return trimmed.replace(/[%_\\]/g, ' ')
}

/**
 * For English pages, flags documents whose key field has no English value,
 * so the UI can state explicitly that the original (French) version is shown.
 */
async function flagFallbacks<T extends { id: number | string }>(
  collection: CollectionSlug,
  docs: T[],
  locale: Locale,
  draft: boolean,
  field = 'title',
): Promise<WithFallback<T>[]> {
  if (locale === 'fr' || docs.length === 0) return docs
  const payload = await getPayload()
  const res = await payload.find({
    collection,
    locale,
    fallbackLocale: false,
    where: { id: { in: docs.map((d) => d.id) } },
    select: { [field]: true },
    depth: 0,
    limit: docs.length,
    draft,
    pagination: false,
    overrideAccess: draft,
  })
  const translated = new Set<string>(
    (res.docs as unknown as Record<string, unknown>[])
      .filter((d) => {
        const v = d[field]
        return typeof v === 'string' && v.trim().length > 0
      })
      .map((d) => String(d.id)),
  )
  return docs.map((d) => ({ ...d, _isFallback: !translated.has(String(d.id)) }))
}

async function findMany<T extends { id: number | string }>(
  collection: CollectionSlug,
  locale: Locale,
  opts: {
    where?: Where
    sort?: string
    limit?: number
    page?: number
    depth?: number
    titleField?: string
    /** Free-text queries are not cached (unbounded key space). */
    noCache?: boolean
  } = {},
): Promise<Paginated<WithFallback<T>>> {
  const empty = { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
  const draft = await isDraft()
  const run = async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection,
      locale,
      fallbackLocale: 'fr',
      where: opts.where,
      sort: opts.sort,
      limit: opts.limit ?? 100,
      page: opts.page ?? 1,
      depth: opts.depth ?? 1,
      draft,
      // Draft previews are only enabled for authenticated staff (see /api/preview).
      overrideAccess: draft,
    })
    const docs = await flagFallbacks(
      collection,
      res.docs as unknown as T[],
      locale,
      draft,
      opts.titleField,
    )
    return { docs, totalDocs: res.totalDocs, totalPages: res.totalPages, page: res.page ?? 1 }
  }
  return safe(
    () => (draft || opts.noCache ? run() : cachedRead(['find', collection, locale, opts], run)),
    empty,
    `find ${collection}`,
  )
}

async function findOneBySlug<T extends { id: number | string }>(
  collection: CollectionSlug,
  slug: string,
  locale: Locale,
  depth = 2,
  titleField = 'title',
): Promise<WithFallback<T> | null> {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null
  const res = await findMany<T>(collection, locale, {
    where: { slug: { equals: slug } },
    limit: 1,
    depth,
    titleField,
  })
  return res.docs[0] ?? null
}

async function findGlobal<T>(slug: string, locale: Locale, depth = 1): Promise<T | null> {
  const draft = await isDraft()
  const run = async () => {
    const payload = await getPayload()
    return (await payload.findGlobal({
      slug: slug as 'site-settings',
      locale,
      fallbackLocale: 'fr',
      depth,
      draft,
    })) as unknown as T
  }
  return safe(
    () => (draft ? run() : cachedRead(['global', slug, locale, depth], run)),
    null,
    `global ${slug}`,
  )
}

/* ---------------- Globals ---------------- */

export const getSiteSettings = cache((locale: Locale) =>
  findGlobal<SiteSetting>('site-settings', locale, 1),
)
export const getNavigation = cache((locale: Locale) =>
  findGlobal<Navigation>('navigation', locale, 0),
)
export const getHomepage = cache((locale: Locale) => findGlobal<Homepage>('homepage', locale, 1))
export const getAboutPage = cache((locale: Locale) =>
  findGlobal<AboutPage>('about-page', locale, 2),
)
export const getSaagdoPage = cache((locale: Locale) =>
  findGlobal<SaagdoPage>('saagdo-page', locale, 1),
)

/* ---------------- Domains ---------------- */

export const getDomains = cache(
  async (locale: Locale) =>
    (await findMany<Domain>('domains', locale, { sort: 'order', depth: 1 })).docs,
)

export const getDomainBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<Domain>('domains', slug, locale),
)

/* ---------------- Projects ---------------- */

export type ProjectFilters = {
  q?: string
  status?: string
  domain?: string
  region?: string
  page?: number
  limit?: number
}

export const getProjects = cache(async (locale: Locale, filters: ProjectFilters = {}) => {
  const and: Where[] = []
  const q = sanitizeQuery(filters.q)
  if (q) and.push({ or: [{ title: { like: q } }, { excerpt: { like: q } }] })
  if (filters.status && ['planned', 'ongoing', 'completed'].includes(filters.status)) {
    and.push({ status: { equals: filters.status } })
  }
  if (filters.domain && /^[a-z0-9-]+$/.test(filters.domain)) {
    and.push({ 'domains.slug': { equals: filters.domain } })
  }
  if (filters.region) and.push({ 'location.region': { equals: filters.region.slice(0, 80) } })
  return findMany<Project>('projects', locale, {
    where: and.length ? { and } : undefined,
    sort: '-startDate',
    limit: filters.limit ?? PAGE_SIZE,
    page: filters.page && filters.page > 0 ? filters.page : 1,
    depth: 1,
    noCache: Boolean(q),
  })
})

export const getFeaturedProjects = cache(async (locale: Locale, limit = 3) => {
  const featured = await findMany<Project>('projects', locale, {
    sort: '-featured,-startDate',
    limit,
    depth: 1,
  })
  return featured.docs
})

export const getProjectBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<Project>('projects', slug, locale, 2),
)

export const getProjectRegions = cache(async (locale: Locale) => {
  const all = await findMany<Project>('projects', locale, { limit: 500, depth: 0 })
  return [
    ...new Set(all.docs.map((p) => p.location?.region).filter((r): r is string => !!r)),
  ].sort()
})

export type MapPoint = {
  id: number | string
  slug: string
  title: string
  status: Project['status']
  lat: number
  lng: number
  locality?: string | null
}

export const getProjectMapPoints = cache(async (locale: Locale): Promise<MapPoint[]> => {
  const all = await findMany<Project>('projects', locale, {
    where: { 'location.coordinatesVerified': { equals: true } },
    limit: 500,
    depth: 0,
  })
  return all.docs
    .filter(
      (p) => typeof p.location?.latitude === 'number' && typeof p.location?.longitude === 'number',
    )
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      status: p.status,
      lat: p.location!.latitude as number,
      lng: p.location!.longitude as number,
      locality: p.location?.locality,
    }))
})

/* ---------------- News ---------------- */

export const getNews = cache(
  async (
    locale: Locale,
    opts: { category?: string; page?: number; limit?: number; q?: string } = {},
  ) => {
    const and: Where[] = [{ archived: { not_equals: true } }]
    if (opts.category && /^[a-z-]+$/.test(opts.category))
      and.push({ category: { equals: opts.category } })
    const q = sanitizeQuery(opts.q)
    if (q) and.push({ or: [{ title: { like: q } }, { excerpt: { like: q } }] })
    return findMany<News>('news', locale, {
      where: { and },
      sort: '-publishedAt',
      limit: opts.limit ?? PAGE_SIZE,
      page: opts.page ?? 1,
      depth: 1,
      noCache: Boolean(q),
    })
  },
)

export const getNewsBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<News>('news', slug, locale, 2),
)

/* ---------------- Publications ---------------- */

export const getPublications = cache(
  async (
    locale: Locale,
    opts: { type?: string; types?: string[]; q?: string; page?: number; limit?: number } = {},
  ) => {
    const and: Where[] = []
    if (opts.type && /^[a-z-]+$/.test(opts.type)) and.push({ type: { equals: opts.type } })
    if (opts.types?.length) and.push({ type: { in: opts.types } })
    const q = sanitizeQuery(opts.q)
    if (q) and.push({ or: [{ title: { like: q } }, { description: { like: q } }] })
    return findMany<Publication>('publications', locale, {
      where: and.length ? { and } : undefined,
      sort: '-publishedAt',
      limit: opts.limit ?? 12,
      page: opts.page ?? 1,
      depth: 1,
      noCache: Boolean(q),
    })
  },
)

export const getPublicationBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<Publication>('publications', slug, locale, 2),
)

/* ---------------- Events ---------------- */

export const getEvents = cache(
  async (locale: Locale) =>
    (await findMany<Event>('events', locale, { sort: '-startDate', limit: 200, depth: 1 })).docs,
)

export const getEventBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<Event>('events', slug, locale, 2),
)

/* ---------------- Institution ---------------- */

export const getPartners = cache(
  async (locale: Locale) =>
    (
      await findMany<Partner>('partners', locale, {
        sort: 'order',
        limit: 100,
        depth: 1,
        titleField: 'name',
      })
    ).docs,
)

export const getTeam = cache(
  async (locale: Locale) =>
    (
      await findMany<TeamMember>('team-members', locale, {
        where: { consentToPublish: { equals: true } },
        sort: 'order',
        limit: 200,
        depth: 1,
        titleField: 'position',
      })
    ).docs,
)

export const getImpactMetrics = cache(
  async (locale: Locale) =>
    (
      await findMany<ImpactMetric>('impact-metrics', locale, {
        sort: 'order',
        limit: 24,
        depth: 0,
        titleField: 'label',
      })
    ).docs,
)

export const getFaqs = cache(
  async (locale: Locale, scope: Faq['scope']) =>
    (
      await findMany<Faq>('faqs', locale, {
        where: { scope: { equals: scope } },
        sort: 'order',
        limit: 50,
        depth: 0,
        titleField: 'question',
      })
    ).docs,
)

export const getTestimonials = cache(
  async (locale: Locale) =>
    (
      await findMany<Testimonial>('testimonials', locale, {
        where: { consentObtained: { equals: true } },
        limit: 12,
        depth: 1,
        titleField: 'quote',
      })
    ).docs,
)

export const getPageBySlug = cache((slug: string, locale: Locale) =>
  findOneBySlug<Page>('pages', slug, locale, 1),
)

export const getGalleryMedia = cache(
  async (locale: Locale) =>
    (
      await findMany<Media>('media', locale, {
        where: { showInGallery: { equals: true } },
        sort: '-createdAt',
        limit: 120,
        depth: 0,
        titleField: 'alt',
      })
    ).docs,
)

/* ---------------- Global search ---------------- */

export type SearchHit = {
  type: 'projects' | 'news' | 'publications' | 'events' | 'domains'
  slug: string
  title: string
  excerpt?: string | null
}

export const searchAll = cache(async (locale: Locale, rawQuery: string): Promise<SearchHit[]> => {
  const q = sanitizeQuery(rawQuery)
  if (!q) return []
  const like = (fields: string[]): Where => ({ or: fields.map((f) => ({ [f]: { like: q } })) })
  const [projects, news, publications, events, domains] = await Promise.all([
    findMany<Project>('projects', locale, {
      where: like(['title', 'excerpt']),
      limit: 10,
      depth: 0,
      noCache: true,
    }),
    findMany<News>('news', locale, {
      where: like(['title', 'excerpt']),
      limit: 10,
      depth: 0,
      noCache: true,
    }),
    findMany<Publication>('publications', locale, {
      where: like(['title', 'description']),
      limit: 10,
      depth: 0,
      noCache: true,
    }),
    findMany<Event>('events', locale, {
      where: like(['title', 'summary']),
      limit: 10,
      depth: 0,
      noCache: true,
    }),
    findMany<Domain>('domains', locale, {
      where: like(['title', 'summary']),
      limit: 10,
      depth: 0,
      noCache: true,
    }),
  ])
  return [
    ...domains.docs.map((d) => ({
      type: 'domains' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.summary,
    })),
    ...projects.docs.map((d) => ({
      type: 'projects' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
    })),
    ...news.docs.map((d) => ({
      type: 'news' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
    })),
    ...publications.docs.map((d) => ({
      type: 'publications' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.description,
    })),
    ...events.docs.map((d) => ({
      type: 'events' as const,
      slug: d.slug,
      title: d.title,
      excerpt: d.summary,
    })),
  ]
})
