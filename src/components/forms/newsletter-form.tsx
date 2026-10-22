'use client'

import { useLocale, useTranslations } from 'next-intl'
import * as React from 'react'
import { subscribeNewsletter } from '@/app/actions/forms'
import type { FormResult } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { STARTED_AT_FIELD_NAME } from './constants'
import { AntiSpamFields } from './fields'

/**
 * Footer newsletter form, deliberately dependency-free (it ships on every page).
 * Native constraint validation on the client, authoritative Zod validation on the server.
 */
export function NewsletterForm() {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const locale = useLocale()
  const shownAt = React.useRef(0)
  const [result, setResult] = React.useState<FormResult | null>(null)
  const [pending, setPending] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; consent?: string }>({})

  React.useEffect(() => {
    shownAt.current = Date.now()
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.elements.namedItem('email') as HTMLInputElement
    const consent = form.elements.namedItem('consent') as HTMLInputElement
    const next = {
      email: !email.value ? 'required' : email.validity.valid ? undefined : 'email',
      consent: consent.checked ? undefined : 'consent',
    }
    setErrors(next)
    if (next.email || next.consent) return
    const data = new FormData(form)
    data.set('locale', locale)
    data.set(STARTED_AT_FIELD_NAME, String(shownAt.current))
    setPending(true)
    try {
      const res = await subscribeNewsletter(data)
      setResult(res)
      if (res.ok) form.reset()
      else if (res.fieldErrors) setErrors(res.fieldErrors)
    } catch {
      setResult({ ok: false, error: 'generic' })
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-3"
      data-testid="newsletter-form"
    >
      <AntiSpamFields />
      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t('email')}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder={t('email')}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          className={cn(
            'h-12 w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white outline-none placeholder:text-white/60 focus:border-digital focus:ring-4 focus:ring-digital/20',
            errors.email && 'border-[#ff8a80]',
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 w-full rounded-full bg-gold px-5 font-display text-sm font-semibold text-forest-900 transition-colors hover:bg-[#e0bd78] disabled:opacity-60"
        >
          {t('subscribe')}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="text-xs font-medium text-[#ffb4ab]">
          {te(errors.email as never)}
        </p>
      )}
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-white/65">
        <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-gold" />
        <span>{t('newsletterConsent')}</span>
      </label>
      {errors.consent && (
        <p role="alert" className="text-xs font-medium text-[#ffb4ab]">
          {te(errors.consent as never)}
        </p>
      )}
      <div aria-live="polite">
        {result?.ok && (
          <p className="text-xs font-medium text-digital-300">
            {result.code === 'already' ? t('newsletterAlready') : t('newsletterSuccess')}
          </p>
        )}
        {result && !result.ok && (
          <p className="text-xs font-medium text-[#ffb4ab]">{te(result.error ?? 'generic')}</p>
        )}
      </div>
    </form>
  )
}
