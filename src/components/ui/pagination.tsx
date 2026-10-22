import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { StaticPathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
  pathname: StaticPathname
  page: number
  totalPages: number
  query?: Record<string, string | undefined>
}

export async function Pagination({ pathname, page, totalPages, query = {} }: Props) {
  if (totalPages <= 1) return null
  const t = await getTranslations('common')
  const hrefFor = (p: number) => ({
    pathname,
    query: Object.fromEntries(
      Object.entries({ ...query, page: p > 1 ? String(p) : undefined }).filter(([, v]) => v),
    ) as Record<string, string>,
  })
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  )
  const item =
    'grid size-11 place-items-center rounded-full text-sm font-semibold transition-colors'
  return (
    <nav
      aria-label={t('page', { page, total: totalPages })}
      className="mt-14 flex items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          className={cn(item, 'border border-forest/15 hover:bg-white')}
          aria-label={t('previous')}
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className={cn(item, 'border border-forest/10 opacity-40')} aria-hidden="true">
          <ChevronLeft className="size-4" />
        </span>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - (pages[i - 1] ?? p) > 1 && (
            <span aria-hidden="true" className="text-ink-muted">
              …
            </span>
          )}
          {p === page ? (
            <span aria-current="page" className={cn(item, 'bg-forest text-white')}>
              {p}
            </span>
          ) : (
            <Link href={hrefFor(p)} className={cn(item, 'hover:bg-white')}>
              {p}
            </Link>
          )}
        </span>
      ))}
      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          className={cn(item, 'border border-forest/15 hover:bg-white')}
          aria-label={t('next')}
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(item, 'border border-forest/10 opacity-40')} aria-hidden="true">
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  )
}
