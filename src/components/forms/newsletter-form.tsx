'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { subscribeNewsletter } from '@/app/actions/forms'
import { type NewsletterInput, newsletterSchema } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { AntiSpamFields } from './fields'
import { useServerForm } from './use-server-form'

export function NewsletterForm() {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', consent: false },
  })
  const { ref, onSubmit, result, submitting } = useServerForm(form, subscribeNewsletter)
  const emailError = form.formState.errors.email?.message as string | undefined
  const consentError = form.formState.errors.consent?.message as string | undefined

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="relative space-y-3" data-testid="newsletter-form">
      <AntiSpamFields />
      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t('email')}
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t('email')}
          {...form.register('email')}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'newsletter-email-error' : undefined}
          className={cn(
            'h-12 w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/45 outline-none focus:border-digital focus:ring-4 focus:ring-digital/20',
            emailError && 'border-[#ff8a80]',
          )}
        />
        <button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-full bg-gold px-5 font-display text-sm font-semibold text-forest-900 transition-colors hover:bg-[#e0bd78] disabled:opacity-60"
        >
          {t('subscribe')}
        </button>
      </div>
      {emailError && (
        <p id="newsletter-email-error" role="alert" className="text-xs font-medium text-[#ffb4ab]">
          {te(emailError as never)}
        </p>
      )}
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-white/65">
        <input type="checkbox" {...form.register('consent')} className="mt-0.5 size-4 shrink-0 accent-gold" />
        <span>{t('newsletterConsent')}</span>
      </label>
      {consentError && (
        <p role="alert" className="text-xs font-medium text-[#ffb4ab]">
          {te(consentError as never)}
        </p>
      )}
      <div aria-live="polite">
        {result?.ok && (
          <p className="text-xs font-medium text-digital-300">{result.code === 'already' ? t('newsletterAlready') : t('newsletterSuccess')}</p>
        )}
        {result && !result.ok && <p className="text-xs font-medium text-[#ffb4ab]">{te(result.error ?? 'generic')}</p>}
      </div>
    </form>
  )
}
