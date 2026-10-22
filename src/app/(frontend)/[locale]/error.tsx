'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section className="flex min-h-[70dvh] items-center bg-night pt-28 pb-20 text-white">
      <div className="container-page text-center">
        <h1 className="text-h2 font-semibold">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">{t('text')}</p>
        <Button variant="gold" className="mt-8" onClick={reset}>
          {t('retry')}
        </Button>
      </div>
    </section>
  )
}
