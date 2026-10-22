'use server'

import { randomBytes, randomUUID } from 'node:crypto'
import { SUBMISSION_FILE_MAX_BYTES, SUBMISSION_FILE_TYPES } from '@/lib/constants'
import { isLocale } from '@/i18n/routing'
import { clientFingerprint, looksLikeSpam, verifyTurnstile } from '@/lib/anti-spam'
import { getPayload } from '@/lib/payload'
import { rateLimit } from '@/lib/rate-limit'
import {
  contactSchema,
  type FormResult,
  flattenZodErrors,
  newsletterSchema,
  partnershipSchema,
  sniffDocumentType,
} from '@/lib/validation'

type Payload = Awaited<ReturnType<typeof getPayload>>

function fields(formData: FormData, keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of keys) {
    const value = formData.get(key)
    if (typeof value === 'string') out[key] = value
  }
  return out
}

function localeOf(formData: FormData): 'fr' | 'en' {
  const l = formData.get('locale')
  return typeof l === 'string' && isLocale(l) ? l : 'fr'
}

async function guard(formData: FormData, bucket: string, limit: number): Promise<FormResult | null> {
  const fp = await clientFingerprint()
  if (!rateLimit(`${bucket}:${fp}`, { limit, windowMs: 10 * 60 * 1000 }).ok) {
    return { ok: false, error: 'rateLimited' }
  }
  if (looksLikeSpam(formData) || !(await verifyTurnstile(formData))) {
    return { ok: false, error: 'spam' }
  }
  return null
}

/** Sends an internal notification if SMTP and recipients are configured. Never throws. */
async function notify(payload: Payload, subject: string, lines: string[]): Promise<'sent' | 'failed' | 'not-configured'> {
  if (!process.env.SMTP_HOST) return 'not-configured'
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const to = (settings.notificationEmails ?? []).filter(Boolean)
    if (!to.length) return 'not-configured'
    const admin = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin`
    await payload.sendEmail({
      to,
      subject: `[ACIEA] ${subject}`,
      // Plain text only: user input is never rendered as HTML in emails.
      text: [...lines, '', `Consulter dans l’administration : ${admin}`].join('\n'),
    })
    return 'sent'
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Form notification failed' })
    return 'failed'
  }
}

async function auditSubmission(payload: Payload, entity: string, id: number | string) {
  await payload.create({
    collection: 'audit-logs',
    data: { action: 'form-submission', entity, entityId: String(id) },
    overrideAccess: true,
  })
}

export async function submitContact(formData: FormData): Promise<FormResult> {
  const blocked = await guard(formData, 'contact', 5)
  if (blocked) return blocked
  const parsed = contactSchema.safeParse(
    fields(formData, ['name', 'email', 'organization', 'subject', 'message', 'consent']),
  )
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenZodErrors(parsed.error) }
  const data = parsed.data
  try {
    const payload = await getPayload()
    const doc = await payload.create({
      collection: 'contact-submissions',
      overrideAccess: true,
      data: {
        name: data.name,
        email: data.email,
        organization: data.organization || undefined,
        subject: data.subject,
        subjectLine: `${data.subject} — ${data.name}`.slice(0, 200),
        message: data.message,
        locale: localeOf(formData),
        consentAt: new Date().toISOString(),
        status: 'new',
      },
    })
    const notification = await notify(payload, `Nouveau message de contact (${data.subject})`, [
      `Nom : ${data.name}`,
      `Email : ${data.email}`,
      `Organisation : ${data.organization || '—'}`,
      '',
      data.message,
    ])
    await payload.update({
      collection: 'contact-submissions',
      id: doc.id,
      data: { notification },
      overrideAccess: true,
      context: { skipAudit: true },
    })
    await auditSubmission(payload, 'contact-submissions', doc.id)
    return { ok: true }
  } catch (error) {
    console.error('[forms] contact failed', error)
    return { ok: false, error: 'generic' }
  }
}

export async function submitPartnership(formData: FormData): Promise<FormResult> {
  const blocked = await guard(formData, 'partnership', 3)
  if (blocked) return blocked
  const parsed = partnershipSchema.safeParse(
    fields(formData, [
      'fullName',
      'organization',
      'position',
      'email',
      'phone',
      'country',
      'collaborationType',
      'subject',
      'message',
      'consent',
    ]),
  )
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenZodErrors(parsed.error) }

  // Attachment: optional, strictly checked (size, declared type and file signature).
  const file = formData.get('attachment')
  let upload: { data: Buffer; mimetype: string; name: string; size: number } | null = null
  if (file instanceof File && file.size > 0) {
    if (file.size > SUBMISSION_FILE_MAX_BYTES) {
      return { ok: false, error: 'fileSize', fieldErrors: { attachment: 'fileSize' } }
    }
    if (!(SUBMISSION_FILE_TYPES as readonly string[]).includes(file.type)) {
      return { ok: false, error: 'fileType', fieldErrors: { attachment: 'fileType' } }
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const kind = sniffDocumentType(buffer.subarray(0, 8))
    const expected = file.type === 'application/pdf' ? 'pdf' : 'docx'
    if (kind !== expected) return { ok: false, error: 'fileType', fieldErrors: { attachment: 'fileType' } }
    upload = {
      data: buffer,
      mimetype: file.type,
      // Random server-side name: the original filename is never trusted.
      name: `demande-${randomUUID()}.${expected}`,
      size: buffer.length,
    }
  }

  const data = parsed.data
  try {
    const payload = await getPayload()
    const attachment = upload
      ? await payload.create({ collection: 'submission-files', data: {}, file: upload, overrideAccess: true })
      : null
    const doc = await payload.create({
      collection: 'partnership-requests',
      overrideAccess: true,
      data: {
        fullName: data.fullName,
        organization: data.organization,
        position: data.position,
        email: data.email,
        phone: data.phone || undefined,
        country: data.country,
        collaborationType: data.collaborationType,
        subject: data.subject,
        message: data.message,
        attachment: attachment?.id,
        locale: localeOf(formData),
        consentAt: new Date().toISOString(),
        status: 'new',
      },
    })
    const notification = await notify(payload, `Nouvelle demande de partenariat — ${data.organization}`, [
      `Nom : ${data.fullName} (${data.position})`,
      `Organisation : ${data.organization} — ${data.country}`,
      `Email : ${data.email}`,
      `Type : ${data.collaborationType}`,
      `Objet : ${data.subject}`,
      '',
      data.message,
    ])
    await payload.update({
      collection: 'partnership-requests',
      id: doc.id,
      data: { notification },
      overrideAccess: true,
      context: { skipAudit: true },
    })
    await auditSubmission(payload, 'partnership-requests', doc.id)
    return { ok: true }
  } catch (error) {
    console.error('[forms] partnership failed', error)
    return { ok: false, error: 'generic' }
  }
}

export async function subscribeNewsletter(formData: FormData): Promise<FormResult> {
  const blocked = await guard(formData, 'newsletter', 5)
  if (blocked) return blocked
  const parsed = newsletterSchema.safeParse(fields(formData, ['email', 'consent']))
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenZodErrors(parsed.error) }
  const email = parsed.data.email.toLowerCase()
  try {
    const payload = await getPayload()
    const existing = await payload.find({
      collection: 'newsletter-subscriptions',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    const current = existing.docs[0]
    if (current?.status === 'subscribed') return { ok: true, code: 'already' }
    const data = {
      email,
      status: 'subscribed' as const,
      locale: localeOf(formData),
      consentAt: new Date().toISOString(),
      unsubscribedAt: null,
      unsubscribeToken: randomBytes(24).toString('hex'),
    }
    if (current) {
      await payload.update({ collection: 'newsletter-subscriptions', id: current.id, data, overrideAccess: true })
    } else {
      await payload.create({ collection: 'newsletter-subscriptions', data, overrideAccess: true })
    }
    return { ok: true }
  } catch (error) {
    console.error('[forms] newsletter failed', error)
    return { ok: false, error: 'generic' }
  }
}
