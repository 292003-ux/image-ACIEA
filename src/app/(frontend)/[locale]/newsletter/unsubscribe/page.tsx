import { CheckCircle2, MailX, XCircle } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { getPathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo'
import { confirmUnsubscribe } from './actions'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ token?: string; status?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'forms' })
  return buildMetadata({
    locale,
    href: '/newsletter/unsubscribe',
    title: t('unsubscribeTitle'),
    noIndex: true,
  })
}

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { token, status } = await searchParams
  const t = await getTranslations({ locale, namespace: 'forms' })
  const back = getPathname({ href: '/newsletter/unsubscribe', locale })
  return (
    <>
      <PageHero title={t('unsubscribeTitle')} crumbs={[{ label: t('unsubscribeTitle') }]} />
      <Section tone="ivory">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-soft">
          {status === 'done' ? (
            <p role="status" className="flex items-start gap-4 text-lg text-ink">
              <CheckCircle2 className="size-7 shrink-0 text-success" aria-hidden="true" />
              {t('unsubscribeDone')}
            </p>
          ) : status === 'invalid' || !token ? (
            <p role="status" className="flex items-start gap-4 text-lg text-ink">
              <XCircle className="size-7 shrink-0 text-danger" aria-hidden="true" />
              {t('unsubscribeInvalid')}
            </p>
          ) : (
            <form action={confirmUnsubscribe} className="flex flex-col items-start gap-6">
              <MailX className="size-9 text-leaf" aria-hidden="true" />
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="back" value={back} />
              <Button type="submit">{t('unsubscribeTitle')}</Button>
            </form>
          )}
        </div>
      </Section>
    </>
  )
}
