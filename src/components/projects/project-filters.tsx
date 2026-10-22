'use client'

import { LayoutGrid, List, Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: string }

/** URL-driven filters: shareable, crawlable and usable without client state. */
export function ProjectFilters({
  domains,
  regions,
  showStatus = true,
  resultCount,
}: {
  domains: Option[]
  regions: string[]
  showStatus?: boolean
  resultCount: number
}) {
  const t = useTranslations('projects')
  const tc = useTranslations('common')
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [q, setQ] = React.useState(params.get('q') ?? '')
  const [pending, startTransition] = React.useTransition()

  const update = React.useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString())
      for (const [k, v] of Object.entries(patch)) {
        if (v) next.set(k, v)
        else next.delete(k)
      }
      next.delete('page')
      startTransition(() =>
        router.replace(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false }),
      )
    },
    [params, pathname, router],
  )

  React.useEffect(() => {
    const id = setTimeout(() => {
      if ((params.get('q') ?? '') !== q) update({ q: q.trim() || null })
    }, 350)
    return () => clearTimeout(id)
  }, [q, params, update])

  const select =
    'h-12 w-full rounded-xl border border-forest/15 bg-white px-3 text-sm text-ink outline-none focus:border-leaf focus:ring-4 focus:ring-leaf/15'
  const view = params.get('view') === 'list' ? 'list' : 'grid'
  const hasFilters = ['q', 'status', 'domain', 'region'].some((k) => params.get(k))

  return (
    <div
      className="rounded-[1.5rem] bg-white p-4 shadow-soft ring-1 ring-forest/5 md:p-5"
      aria-busy={pending}
    >
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-3 md:grid-cols-12"
      >
        <div className="relative md:col-span-4">
          <label htmlFor="project-q" className="sr-only">
            {tc('search')}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            id="project-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={cn(select, 'pl-10')}
          />
        </div>
        {showStatus && (
          <div className="md:col-span-2">
            <label htmlFor="project-status" className="sr-only">
              {tc('status')}
            </label>
            <select
              id="project-status"
              className={select}
              value={params.get('status') ?? ''}
              onChange={(e) => update({ status: e.target.value || null })}
            >
              <option value="">{t('allStatuses')}</option>
              {(['ongoing', 'completed', 'planned'] as const).map((s) => (
                <option key={s} value={s}>
                  {t(`status.${s}`)}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={showStatus ? 'md:col-span-3' : 'md:col-span-4'}>
          <label htmlFor="project-domain" className="sr-only">
            {t('domain')}
          </label>
          <select
            id="project-domain"
            className={select}
            value={params.get('domain') ?? ''}
            onChange={(e) => update({ domain: e.target.value || null })}
          >
            <option value="">{t('allDomains')}</option>
            {domains.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className={showStatus ? 'md:col-span-2' : 'md:col-span-3'}>
          <label htmlFor="project-region" className="sr-only">
            {t('region')}
          </label>
          <select
            id="project-region"
            className={select}
            value={params.get('region') ?? ''}
            onChange={(e) => update({ region: e.target.value || null })}
            disabled={regions.length === 0}
          >
            <option value="">{t('allRegions')}</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex items-center justify-end gap-1 md:col-span-1"
          role="group"
          aria-label={`${t('gridView')} / ${t('listView')}`}
        >
          {(
            [
              ['grid', LayoutGrid, t('gridView')],
              ['list', List, t('listView')],
            ] as const
          ).map(([v, I, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              aria-label={label}
              onClick={() => update({ view: v === 'grid' ? null : v })}
              className={cn(
                'grid size-11 place-items-center rounded-xl transition-colors',
                view === v ? 'bg-forest text-white' : 'text-ink-muted hover:bg-ivory',
              )}
            >
              <I className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </form>
      <div className="mt-3 flex items-center justify-between gap-3 px-1 text-sm text-ink-muted">
        <p aria-live="polite">{tc('results', { count: resultCount })}</p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQ('')
              update({ q: null, status: null, domain: null, region: null })
            }}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 font-medium text-leaf hover:bg-leaf-50"
          >
            <X className="size-3.5" aria-hidden="true" />
            {tc('resetFilters')}
          </button>
        )}
      </div>
    </div>
  )
}
