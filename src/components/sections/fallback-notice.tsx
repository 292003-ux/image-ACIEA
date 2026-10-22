import { Languages } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

/** Explicit notice when a document has no translation in the current language. */
export async function FallbackNotice({ className }: { className?: string }) {
  const t = await getTranslations('common')
  return (
    <p
      role="note"
      className={cn(
        'flex items-center gap-3 rounded-xl bg-info-bg px-4 py-3 text-sm text-info',
        className,
      )}
    >
      <Languages className="size-4 shrink-0" aria-hidden="true" />
      {t('translationFallback')}
    </p>
  )
}
