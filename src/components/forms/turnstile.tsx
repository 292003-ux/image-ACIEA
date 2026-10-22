'use client'

import Script from 'next/script'

/** Cloudflare Turnstile widget, rendered only when a site key is configured. */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!siteKey) return null
  return (
    <div className="sm:col-span-2">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
    </div>
  )
}
