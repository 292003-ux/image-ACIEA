import 'server-only'
import { createHash } from 'node:crypto'
import { headers } from 'next/headers'

export const HONEYPOT_FIELD = 'website_url'
export const STARTED_AT_FIELD = 'started_at'

export async function clientFingerprint(): Promise<string> {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  // Never store raw IPs: salted hash only.
  return createHash('sha256')
    .update(`${process.env.IP_HASH_SALT || process.env.PAYLOAD_SECRET || 'aciea'}:${ip}`)
    .digest('hex')
    .slice(0, 32)
}

/** Honeypot + minimum fill time. Returns true if the submission looks automated. */
export function looksLikeSpam(formData: FormData): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD)
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return true
  const started = Number(formData.get(STARTED_AT_FIELD))
  if (!Number.isFinite(started)) return true
  const elapsed = Date.now() - started
  return elapsed < 2500 || elapsed > 1000 * 60 * 60 * 24
}

/** Optional Cloudflare Turnstile verification, active only when configured. */
export async function verifyTurnstile(formData: FormData): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  const token = formData.get('cf-turnstile-response')
  if (typeof token !== 'string' || !token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}
