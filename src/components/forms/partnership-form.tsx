'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Paperclip } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { submitPartnership } from '@/app/actions/forms'
import { COLLABORATION_TYPES } from '@/lib/constants'
import { ArrowGlyph, Button } from '@/components/ui/button'
import { type PartnershipInput, partnershipSchema } from '@/lib/validation'
import { ConsentLabel } from './consent-label'
import { AntiSpamFields, Field, FormAlert } from './fields'
import { Turnstile } from './turnstile'
import { useServerForm } from './use-server-form'

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = '.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export function PartnershipForm({ defaultType }: { defaultType?: (typeof COLLABORATION_TYPES)[number] }) {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const [fileError, setFileError] = React.useState<string | null>(null)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const form = useForm<PartnershipInput>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      fullName: '',
      organization: '',
      position: '',
      email: '',
      phone: '',
      country: '',
      collaborationType: defaultType ?? ('' as never),
      subject: '',
      message: '',
      consent: false,
    },
    mode: 'onBlur',
  })
  const { ref, onSubmit, result, submitting } = useServerForm(form, submitPartnership)
  const err = (k: keyof PartnershipInput) => form.formState.errors[k]?.message as string | undefined

  React.useEffect(() => {
    if (result?.ok) setFileName(null)
    if (result?.fieldErrors?.attachment) setFileError(result.fieldErrors.attachment)
  }, [result])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)
    setFileName(file?.name ?? null)
    if (!file) return
    if (file.size > MAX_BYTES) setFileError('fileSize')
    else if (!/\.(pdf|docx)$/i.test(file.name)) setFileError('fileType')
    if (file.size > MAX_BYTES || !/\.(pdf|docx)$/i.test(file.name)) {
      e.target.value = ''
      setFileName(null)
    }
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" data-testid="partnership-form">
      <AntiSpamFields />
      <Field id="p-fullName" label={t('fullName')} required error={err('fullName')}>
        {(p) => <input {...p} {...form.register('fullName')} autoComplete="name" />}
      </Field>
      <Field id="p-organization" label={t('organization')} required error={err('organization')}>
        {(p) => <input {...p} {...form.register('organization')} autoComplete="organization" />}
      </Field>
      <Field id="p-position" label={t('position')} required error={err('position')}>
        {(p) => <input {...p} {...form.register('position')} autoComplete="organization-title" />}
      </Field>
      <Field id="p-email" label={t('proEmail')} required error={err('email')}>
        {(p) => <input {...p} {...form.register('email')} type="email" autoComplete="email" inputMode="email" />}
      </Field>
      <Field id="p-phone" label={t('phone')} error={err('phone')}>
        {(p) => <input {...p} {...form.register('phone')} type="tel" autoComplete="tel" inputMode="tel" />}
      </Field>
      <Field id="p-country" label={t('country')} required error={err('country')}>
        {(p) => <input {...p} {...form.register('country')} autoComplete="country-name" />}
      </Field>
      <Field id="p-type" label={t('collaborationType')} required error={err('collaborationType')}>
        {(p) => (
          <select {...p} {...form.register('collaborationType')}>
            <option value="">{t('selectPlaceholder')}</option>
            {COLLABORATION_TYPES.map((c) => (
              <option key={c} value={c}>
                {t(`collaborationTypes.${c}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="p-subject" label={t('subject')} required error={err('subject')}>
        {(p) => <input {...p} {...form.register('subject')} />}
      </Field>
      <Field id="p-message" label={t('message')} required error={err('message')} className="sm:col-span-2">
        {(p) => <textarea {...p} {...form.register('message')} rows={7} className={`${p.className} resize-y`} />}
      </Field>
      <Field id="p-attachment" label={t('attachment')} hint={t('attachmentHelp')} error={fileError ?? undefined} className="sm:col-span-2">
        {(p) => (
          <div className="relative">
            <input
              {...p}
              name="attachment"
              type="file"
              accept={ACCEPT}
              onChange={onFile}
              className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <div className={`${p.className} flex items-center gap-3 peer-focus-visible:border-leaf peer-focus-visible:ring-4 peer-focus-visible:ring-leaf/15`}>
              <Paperclip className="size-4 text-leaf" aria-hidden="true" />
              <span className="truncate text-ink-muted">{fileName ?? 'PDF / DOCX'}</span>
            </div>
          </div>
        )}
      </Field>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            {...form.register('consent')}
            className="mt-1 size-5 shrink-0 accent-forest"
            aria-invalid={err('consent') ? true : undefined}
          />
          <span>
            <ConsentLabel />
          </span>
        </label>
        {err('consent') && (
          <p role="alert" className="mt-2 text-sm font-medium text-danger">
            {te(err('consent') as never)}
          </p>
        )}
      </div>
      <Turnstile />
      <div className="flex flex-col gap-4 sm:col-span-2">
        {result?.ok && <FormAlert tone="success">{t('partnershipSuccess')}</FormAlert>}
        {result && !result.ok && <FormAlert tone="error">{te(result.error ?? 'generic')}</FormAlert>}
        <Button type="submit" size="lg" disabled={submitting || !!fileError} className="w-full sm:w-auto sm:self-start">
          {submitting ? t('submitting') : t('submit')}
          {!submitting && <ArrowGlyph />}
        </Button>
      </div>
    </form>
  )
}
