import { z } from 'zod'
import { COLLABORATION_TYPES, CONTACT_SUBJECTS } from './constants'

/**
 * Validation schemas shared by client forms and server actions.
 * Error messages are translation keys from `forms.errors`.
 */
const text = (min: number, max: number) =>
  z.string({ error: 'required' }).trim().min(1, 'required').min(min, 'tooShort').max(max, 'tooLong')

const email = z
  .string({ error: 'required' })
  .trim()
  .min(1, 'required')
  .max(254, 'tooLong')
  .email('email')

const consent = z
  .union([z.literal('on'), z.literal('true'), z.literal(true), z.boolean(), z.undefined()])
  .refine((v) => v === true || v === 'on' || v === 'true', 'consent')

export const contactSchema = z.object({
  name: text(2, 120),
  email,
  organization: z.string().trim().max(160, 'tooLong').optional().default(''),
  subject: z.enum(CONTACT_SUBJECTS, { error: 'required' }),
  message: text(20, 5000),
  consent,
})

export const partnershipSchema = z.object({
  fullName: text(2, 120),
  organization: text(2, 160),
  position: text(2, 120),
  email,
  phone: z
    .string()
    .trim()
    .max(32, 'tooLong')
    .regex(/^$|^[+()\d\s.-]{6,32}$/, 'phone')
    .optional()
    .default(''),
  country: text(2, 80),
  collaborationType: z.enum(COLLABORATION_TYPES, { error: 'required' }),
  subject: text(4, 200),
  message: text(30, 6000),
  consent,
})

export const newsletterSchema = z.object({ email, consent })

export type ContactInput = z.input<typeof contactSchema>
export type PartnershipInput = z.input<typeof partnershipSchema>
export type NewsletterInput = z.input<typeof newsletterSchema>

export type FormResult = {
  ok: boolean
  error?: 'generic' | 'rateLimited' | 'spam' | 'validation' | 'fileType' | 'fileSize'
  fieldErrors?: Record<string, string>
  code?: 'already'
}

export function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}

/** Magic-number check: the declared MIME type must match the file content. */
export function sniffDocumentType(bytes: Uint8Array): 'pdf' | 'docx' | null {
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  )
    return 'pdf'
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04
  )
    return 'docx'
  return null
}
