'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { HONEYPOT_FIELD_NAME } from './constants'

type FieldProps = {
  id: string
  label: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  tone?: 'light' | 'dark'
  children: (props: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    className: string
  }) => React.ReactNode
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

export function Field({
  id,
  label,
  error,
  required,
  hint,
  className,
  tone = 'light',
  children,
}: FieldProps) {
  const t = useTranslations('forms')
  const te = useTranslations('forms.errors')
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className={cn('text-sm font-medium', tone === 'light' ? 'text-forest' : 'text-white')}
      >
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span
            className={cn(
              'ml-1.5 text-xs font-normal',
              tone === 'light' ? 'text-ink-muted' : 'text-white/75',
            )}
          >
            ({t('optional')})
          </span>
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
        <p
          id={`${id}-hint`}
          className={cn('text-xs', tone === 'light' ? 'text-ink-muted' : 'text-white/60')}
        >
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

/** Invisible honeypot field: humans never fill it, naive bots do. */
export function AntiSpamFields() {
  const id = React.useId()
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        name={HONEYPOT_FIELD_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  )
}

export function FormAlert({
  tone,
  children,
}: {
  tone: 'success' | 'error'
  children: React.ReactNode
}) {
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
