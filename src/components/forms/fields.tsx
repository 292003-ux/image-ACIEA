'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { HONEYPOT_FIELD_NAME, STARTED_AT_FIELD_NAME } from './constants'

type FieldProps = {
  id: string
  label: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  tone?: 'light' | 'dark'
  children: (props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string; className: string }) => React.ReactNode
}

export function inputClass(tone: 'light' | 'dark' = 'light', invalid = false) {
  return cn(
    'block w-full rounded-xl border px-4 py-3 text-[0.95rem] transition-[border-color,box-shadow] outline-none placeholder:text-current/40',
    'focus:ring-4',
    tone === 'light'
      ? 'border-forest/15 bg-white text-ink focus:border-leaf focus:ring-leaf/15'
      : 'border-white/15 bg-white/5 text-white focus:border-digital focus:ring-digital/20',
    invalid && 'border-danger focus:border-danger focus:ring-danger/15',
  )
}

export function Field({ id, label, error, required, hint, className, tone = 'light', children }: FieldProps) {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={cn('text-sm font-medium', tone === 'light' ? 'text-forest' : 'text-white')}>
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 text-xs font-normal opacity-60">({t('optional')})</span>
        )}
        {required && <span className="sr-only"> ({t('required')})</span>}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
        className: inputClass(tone, !!error),
      })}
      {hint && (
        <p id={`${id}-hint`} className={cn('text-xs', tone === 'light' ? 'text-ink-muted' : 'text-white/60')}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {te(error as never)}
        </p>
      )}
    </div>
  )
}

/** Invisible anti-spam fields: a honeypot and the time the form was displayed. */
export function AntiSpamFields() {
  const [startedAt, setStartedAt] = React.useState('')
  React.useEffect(() => setStartedAt(String(Date.now())), [])
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD_NAME}>Website</label>
        <input id={HONEYPOT_FIELD_NAME} name={HONEYPOT_FIELD_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name={STARTED_AT_FIELD_NAME} value={startedAt} readOnly />
    </>
  )
}

export function FormAlert({ tone, children }: { tone: 'success' | 'error'; children: React.ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl px-4 py-3 text-sm font-medium',
        tone === 'success' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger',
      )}
    >
      {children}
    </div>
  )
}
