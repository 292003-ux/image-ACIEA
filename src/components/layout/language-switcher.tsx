'use client'

import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { locales } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const NAMES = { fr: 'Français', en: 'English' } as const

/** Keeps the current page (and slug) when switching language. */
export function LanguageSwitcher({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams<{ slug?: string }>()
  const t = useTranslations('nav')
  return (
    <div
      role="group"
      aria-label={t('language')}
      className={cn(
        'flex items-center rounded-full p-0.5 text-xs font-semibold',
        tone === 'dark' ? 'bg-forest/6 ring-1 ring-forest/10' : 'bg-white/10 ring-1 ring-white/20',
        className,
      )}
    >
      {locales.map((l) => {
        const current = l === locale
        const href = (params?.slug ? { pathname, params: { slug: params.slug } } : { pathname }) as never
        return current ? (
          <span
            key={l}
            aria-current="true"
            className={cn('rounded-full px-2.5 py-1.5 uppercase', tone === 'dark' ? 'bg-forest text-white' : 'bg-white text-forest')}
          >
            <span aria-hidden="true">{l}</span>
            <span className="sr-only">{NAMES[l]}</span>
          </span>
        ) : (
          <Link
            key={l}
            href={href}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-label={t('switchTo', { language: NAMES[l] })}
            className={cn(
              'rounded-full px-2.5 py-1.5 uppercase transition-colors',
              tone === 'dark' ? 'text-forest/70 hover:text-forest' : 'text-white/75 hover:text-white',
            )}
          >
            {l}
          </Link>
        )
      })}
    </div>
  )
}
