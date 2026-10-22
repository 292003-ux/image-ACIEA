import { Eye, Languages } from 'lucide-react'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'

/** Honest notices: unvalidated English translations and draft preview mode. */
export async function SiteBanners({
  locale,
  englishValidated,
}: {
  locale: Locale
  englishValidated: boolean
}) {
  const t = await getTranslations({ locale, namespace: 'banner' })
  const preview = (await draftMode()).isEnabled
  const showEnglish = locale === 'en' && !englishValidated
  if (!preview && !showEnglish) return null
  return (
    <div className="relative z-50">
      {preview && (
        <div className="flex items-center justify-center gap-3 bg-gold px-4 py-2 text-center text-xs font-semibold text-forest-900">
          <Eye className="size-4" aria-hidden="true" />
          {t('preview')}
          {/* Route handler, not a page: a plain link is required. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/preview/exit" className="underline underline-offset-2">
            {t('exitPreview')}
          </a>
        </div>
      )}
      {showEnglish && (
        <div className="flex items-center justify-center gap-2 bg-night px-4 py-2 text-center text-xs text-white/80">
          <Languages className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
          {t('englishNotice')}
        </div>
      )}
    </div>
  )
}
