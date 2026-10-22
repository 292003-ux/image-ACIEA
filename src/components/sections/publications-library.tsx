import { Library, Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { PublicationCard } from '@/components/cards/document-card'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterChips } from '@/components/ui/filter-chips'
import { Pagination } from '@/components/ui/pagination'
import type { Locale, StaticPathname } from '@/i18n/routing'
import { PUBLICATION_TYPES } from '@/lib/constants'
import { getPublications } from '@/lib/queries'

/** Document library with type filter and keyword search (GET form: works without JS). */
export async function PublicationsLibrary({
  locale,
  pathname,
  searchParams,
  types = [...PUBLICATION_TYPES],
}: {
  locale: Locale
  pathname: StaticPathname
  searchParams: { type?: string; q?: string; page?: string }
  types?: (typeof PUBLICATION_TYPES)[number][]
}) {
  const t = await getTranslations({ locale, namespace: 'publications' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const page = Math.max(1, Number.parseInt(searchParams.page ?? '1', 10) || 1)
  const type = types.includes(searchParams.type as never) ? searchParams.type : undefined
  const result = await getPublications(locale, {
    type,
    types: type ? undefined : types,
    q: searchParams.q,
    page,
  })
  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips
          pathname={pathname}
          param="type"
          label={t('type')}
          allLabel={t('allTypes')}
          current={type}
          options={types.map((v) => ({ value: v, label: t(`types.${v}`) }))}
        />
        <form role="search" method="get" className="relative w-full lg:w-80">
          {type && <input type="hidden" name="type" value={type} />}
          <label htmlFor="pub-q" className="sr-only">
            {tc('search')}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            id="pub-q"
            name="q"
            type="search"
            defaultValue={searchParams.q}
            placeholder={tc('search')}
            className="h-12 w-full rounded-full border border-forest/15 bg-white pr-4 pl-10 text-sm outline-none focus:border-leaf focus:ring-4 focus:ring-leaf/15"
          />
        </form>
      </div>
      <p className="mt-6 text-sm text-ink-muted" aria-live="polite">
        {tc('results', { count: result.totalDocs })}
      </p>
      <div className="mt-6">
        {result.docs.length ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.docs.map((p) => (
              <li key={p.id}>
                <PublicationCard publication={p} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<Library className="size-7" aria-hidden="true" />}
            title={t('empty')}
            description={t('emptyHint')}
          />
        )}
      </div>
      <Pagination
        pathname={pathname}
        page={result.page}
        totalPages={result.totalPages}
        query={{ type, q: searchParams.q }}
      />
    </>
  )
}
