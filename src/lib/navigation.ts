import 'server-only'
import { getTranslations } from 'next-intl/server'
import { getPathname } from '@/i18n/navigation'
import type { Locale, StaticPathname } from '@/i18n/routing'
import type { Domain, Navigation } from '@/payload-types'
import { isSafeExternalUrl } from './utils'

export type ResolvedLink = {
  label: string
  href: string
  external?: boolean
  description?: string
  icon?: string | null
  children?: ResolvedLink[]
}

type DefaultItem = {
  key: string
  route: StaticPathname
  descKey?: string
  children?: DefaultItem[]
  domains?: boolean
}

// Five plain links (no drop-downs): sections without published content stay out of the menu.
const DEFAULT_HEADER: DefaultItem[] = [
  { key: 'about', route: '/about' },
  { key: 'actions', route: '/projects' },
  { key: 'saagdo', route: '/saagdo' },
  { key: 'newsArticles', route: '/news' },
  { key: 'contact', route: '/contact' },
]

export function pathFor(route: StaticPathname, locale: Locale): string {
  return getPathname({ href: route, locale })
}

export function pathForSlug(
  route:
    | '/projects/[slug]'
    | '/news/[slug]'
    | '/domains/[slug]'
    | '/events/[slug]'
    | '/publications/[slug]'
    | '/pages/[slug]',
  slug: string,
  locale: Locale,
): string {
  return getPathname({ href: { pathname: route, params: { slug } }, locale })
}

type CmsLink = NonNullable<Navigation['header']>[number]

function resolveCmsLink(
  link: CmsLink | NonNullable<CmsLink['children']>[number],
  locale: Locale,
): ResolvedLink | null {
  if (link.route) {
    return {
      label: link.label,
      href: pathFor(link.route as StaticPathname, locale),
      description: link.description ?? undefined,
    }
  }
  if (isSafeExternalUrl(link.url)) {
    return {
      label: link.label,
      href: link.url,
      external: true,
      description: link.description ?? undefined,
    }
  }
  return null
}

export async function resolveHeaderNav(
  locale: Locale,
  cms: Navigation | null,
  domains: Domain[],
): Promise<ResolvedLink[]> {
  if (cms?.header?.length) {
    return cms.header
      .map((item): ResolvedLink | null => {
        const base = resolveCmsLink(item, locale)
        if (!base) return null
        const children = (item.children ?? [])
          .map((c) => resolveCmsLink(c, locale))
          .filter((c): c is ResolvedLink => !!c)
        return { ...base, children: children.length ? children : undefined }
      })
      .filter((i): i is ResolvedLink => !!i)
  }
  const t = await getTranslations({ locale, namespace: 'nav' })
  return DEFAULT_HEADER.map((item) => {
    let children: ResolvedLink[] | undefined = item.children?.map((c) => ({
      label: t(c.key as never),
      href: pathFor(c.route, locale),
      description: c.descKey ? t(`descriptions.${c.descKey}` as never) : undefined,
    }))
    if (item.domains && domains.length) {
      children = domains.map((d) => ({
        label: d.title,
        href: pathForSlug('/domains/[slug]', d.slug, locale),
        description: d.summary.length > 90 ? `${d.summary.slice(0, 88)}…` : d.summary,
        icon: d.icon,
      }))
    }
    return { label: t(item.key as never), href: pathFor(item.route, locale), children }
  })
}

/** Which optional sections have published content (they are linked only then). */
export type ContentPresence = { events: boolean; publications: boolean; gallery: boolean }

export async function resolveFooterColumns(
  locale: Locale,
  cms: Navigation | null,
  presence: ContentPresence,
): Promise<{ title: string; links: ResolvedLink[] }[]> {
  if (cms?.footerColumns?.length) {
    return cms.footerColumns.map((col) => ({
      title: col.title,
      links: (col.links ?? [])
        .map((l) => resolveCmsLink(l, locale))
        .filter((l): l is ResolvedLink => !!l),
    }))
  }
  const t = await getTranslations({ locale, namespace: 'nav' })
  const tf = await getTranslations({ locale, namespace: 'footer' })
  const link = (key: string, route: StaticPathname) => ({
    label: t(key as never),
    href: pathFor(route, locale),
  })
  return [
    {
      title: tf('navigation'),
      links: [
        link('about', '/about'),
        link('actions', '/projects'),
        link('saagdo', '/saagdo'),
        link('newsArticles', '/news'),
        ...(presence.events ? [link('events', '/events')] : []),
        ...(presence.publications ? [link('publications', '/publications')] : []),
        ...(presence.gallery ? [link('gallery', '/gallery')] : []),
      ],
    },
    {
      title: tf('getInvolved'),
      links: [
        link('partners', '/partners'),
        link('becomePartner', '/partners/become'),
        link('join', '/join'),
        link('contact', '/contact'),
      ],
    },
  ]
}
