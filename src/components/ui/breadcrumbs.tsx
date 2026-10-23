import { getTranslations } from 'next-intl/server'
import type * as React from 'react'
import { Link } from '@/i18n/navigation'
import { absoluteUrl } from '@/lib/utils'

export type Crumb = {
  label: string
  href?: React.ComponentProps<typeof Link>['href']
  url?: string
}

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = await getTranslations('common')
  const all: Crumb[] = [{ label: t('home'), href: '/', url: '/' }, ...items]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.url ? { item: absoluteUrl(c.url) } : {}),
    })),
  }
  // Only the structured data is kept for search engines: the site has no visible trail,
  // "Home" being the first entry of the main menu.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
