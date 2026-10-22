'use client'

import { useLocale } from 'next-intl'
import * as React from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import type { FormResult } from '@/lib/validation'

/**
 * Bridges react-hook-form (client validation) and a server action (authoritative validation).
 * Field errors returned by the server are mapped back onto the form.
 */
export function useServerForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  action: (formData: FormData) => Promise<FormResult>,
) {
  const locale = useLocale()
  const [result, setResult] = React.useState<FormResult | null>(null)
  const ref = React.useRef<HTMLFormElement>(null)

  const onSubmit = form.handleSubmit(async () => {
    if (!ref.current) return
    setResult(null)
    const formData = new FormData(ref.current)
    formData.set('locale', locale)
    try {
      const res = await action(formData)
      setResult(res)
      if (res.ok) {
        form.reset()
      } else if (res.fieldErrors) {
        for (const [name, message] of Object.entries(res.fieldErrors)) {
          form.setError(name as Path<T>, { type: 'server', message })
        }
      }
    } catch {
      setResult({ ok: false, error: 'generic' })
    }
  })

  return { ref, onSubmit, result, submitting: form.formState.isSubmitting }
}
