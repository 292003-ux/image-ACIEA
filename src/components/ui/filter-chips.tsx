import { Link } from '@/i18n/navigation'
import type { StaticPathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

/** Server-rendered filter chips (plain links: crawlable and work without JavaScript). */
export function FilterChips({
  pathname,
  param,
  options,
  current,
  allLabel,
  label,
  tone = 'light',
}: {
  pathname: StaticPathname
  param: string
  options: { value: string; label: string }[]
  current?: string
  allLabel: string
  label: string
  tone?: 'light' | 'dark'
}) {
  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors',
      tone === 'light'
        ? active
          ? 'bg-forest text-white'
          : 'bg-white text-forest ring-1 ring-forest/10 hover:bg-forest/5'
        : active
          ? 'bg-digital text-night'
          : 'bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10',
    )
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={{ pathname } as never}
            className={chip(!current)}
            aria-current={!current ? 'page' : undefined}
          >
            {allLabel}
          </Link>
        </li>
        {options.map((o) => (
          <li key={o.value}>
            <Link
              href={{ pathname, query: { [param]: o.value } } as never}
              className={chip(current === o.value)}
              aria-current={current === o.value ? 'page' : undefined}
            >
              {o.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
