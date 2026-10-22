import type { MetadataRoute } from 'next'
import { getPathname } from '@/i18n/navigation'
import { locales, type StaticPathname } from '@/i18n/routing'
import { getPayload } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const STATIC: StaticPathname[] = [
  '/',
  '/about',
  '/about/history',
  '/about/mission',
  '/about/governance',
  '/about/team',
  '/domains',
  '/projects',
  '/projects/ongoing',
  '/projects/completed',
  '/saagdo',
  '/news',
  '/events',
  '/publications',
  '/publications/reports',
  '/gallery',
  '/partners',
  '/partners/become',
  '/join',
  '/contact',
  '/legal',
  '/privacy',
  '/terms',
]

type Href = Parameters<typeof getPathname>[0]['href']

function entry(href: Href, lastModified?: string, priority = 0.6): MetadataRoute.Sitemap[number][] {
  return locales.map((locale) => ({
    url: absoluteUrl(getPathname({ href, locale })),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [
          l === 'fr' ? 'fr-BF' : 'en',
          absoluteUrl(getPathname({ href, locale: l })),
        ]),
      ),
    },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const out: MetadataRoute.Sitemap = STATIC.flatMap((p) => entry(p, undefined, p === '/' ? 1 : 0.7))
  try {
    const payload = await getPayload()
    const published = { _status: { equals: 'published' } } as const
    const [domains, projects, news, events, pubs] = await Promise.all([
      payload.find({
        collection: 'domains',
        where: published,
        limit: 500,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'projects',
        where: published,
        limit: 1000,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'news',
        where: { and: [published, { archived: { not_equals: true } }] },
        limit: 1000,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'events',
        where: published,
        limit: 1000,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'publications',
        where: published,
        limit: 1000,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
    ])
    for (const d of domains.docs)
      out.push(...entry({ pathname: '/domains/[slug]', params: { slug: d.slug } }, d.updatedAt))
    for (const d of projects.docs)
      out.push(
        ...entry({ pathname: '/projects/[slug]', params: { slug: d.slug } }, d.updatedAt, 0.8),
      )
    for (const d of news.docs)
      out.push(...entry({ pathname: '/news/[slug]', params: { slug: d.slug } }, d.updatedAt))
    for (const d of events.docs)
      out.push(...entry({ pathname: '/events/[slug]', params: { slug: d.slug } }, d.updatedAt, 0.5))
    for (const d of pubs.docs)
      out.push(
        ...entry({ pathname: '/publications/[slug]', params: { slug: d.slug } }, d.updatedAt),
      )
  } catch (error) {
    console.error('[sitemap] database unavailable', error)
  }
  return out
}
