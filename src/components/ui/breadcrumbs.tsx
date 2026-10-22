import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type * as React from 'react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { absoluteUrl } from '@/lib/utils'

export type Crumb = {
  label: string
  href?: React.ComponentProps<typeof Link>['href']
  url?: string
}

export async function Breadcrumbs({
  items,
  tone = 'dark',
  className,
}: {
  items: Crumb[]
  tone?: 'dark' | 'light'
  className?: string
}) {
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
  return (
    <nav aria-label={t('breadcrumb')} className={cn('text-sm', className)}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1.5',
          tone === 'dark' ? 'text-white/65' : 'text-ink-muted',
        )}
      >
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className={cn(
                    'rounded transition-colors',
                    tone === 'dark' ? 'hover:text-white' : 'hover:text-forest',
                  )}
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cn(
                    last && (tone === 'dark' ? 'text-white' : 'text-forest'),
                    'line-clamp-1',
                  )}
                >
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />}
            </li>
          )
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </nav>
  )
}
