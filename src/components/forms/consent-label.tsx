'use client'

import NextLink from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { getPathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

export function ConsentLabel() {
  const t = useTranslations('forms')
  const locale = useLocale() as Locale
  const href = getPathname({ href: '/privacy', locale })
  return (
    <>
      {t.rich('consent', {
        link: (chunks) => (
          <NextLink
            href={href}
            className="underline underline-offset-2 hover:text-leaf"
            target="_blank"
          >
            {chunks}
          </NextLink>
        ),
      })}
    </>
  )
}
