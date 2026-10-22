'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { submitContact } from '@/app/actions/forms'
import { CONTACT_SUBJECTS } from '@/lib/constants'
import { ArrowGlyph, Button } from '@/components/ui/button'
import { type ContactInput, contactSchema } from '@/lib/validation'
import { ConsentLabel } from './consent-label'
import { AntiSpamFields, Field, FormAlert } from './fields'
import { Turnstile } from './turnstile'
import { useServerForm } from './use-server-form'

export function ContactForm({ defaultSubject = 'general' }: { defaultSubject?: (typeof CONTACT_SUBJECTS)[number] }) {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', organization: '', subject: defaultSubject, message: '', consent: false },
    mode: 'onBlur',
  })
  const { ref, onSubmit, result, submitting } = useServerForm(form, submitContact)
  const err = (k: keyof ContactInput) => form.formState.errors[k]?.message as string | undefined

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" data-testid="contact-form">
      <AntiSpamFields />
      <Field id="contact-name" label={t('name')} required error={err('name')}>
        {(p) => <input {...p} {...form.register('name')} autoComplete="name" />}
      </Field>
      <Field id="contact-email" label={t('email')} required error={err('email')}>
        {(p) => <input {...p} {...form.register('email')} type="email" autoComplete="email" inputMode="email" />}
      </Field>
      <Field id="contact-organization" label={t('organization')} error={err('organization')}>
        {(p) => <input {...p} {...form.register('organization')} autoComplete="organization" />}
      </Field>
      <Field id="contact-subject" label={t('subject')} required error={err('subject')}>
        {(p) => (
          <select {...p} {...form.register('subject')}>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {t(`contactSubjects.${s}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="contact-message" label={t('message')} required error={err('message')} className="sm:col-span-2">
        {(p) => <textarea {...p} {...form.register('message')} rows={6} className={`${p.className} resize-y`} />}
      </Field>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            {...form.register('consent')}
            className="mt-1 size-5 shrink-0 accent-forest"
            aria-invalid={err('consent') ? true : undefined}
            aria-describedby={err('consent') ? 'contact-consent-error' : undefined}
          />
          <span>
            <ConsentLabel />
          </span>
        </label>
        {err('consent') && (
          <p id="contact-consent-error" role="alert" className="mt-2 text-sm font-medium text-danger">
            {te(err('consent') as never)}
          </p>
        )}
      </div>
      <Turnstile />
      <div className="flex flex-col gap-4 sm:col-span-2">
        {result?.ok && <FormAlert tone="success">{t('success')}</FormAlert>}
        {result && !result.ok && <FormAlert tone="error">{te(result.error ?? 'generic')}</FormAlert>}
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto sm:self-start">
          {submitting ? t('submitting') : t('submit')}
          {!submitting && <ArrowGlyph />}
        </Button>
      </div>
    </form>
  )
}
