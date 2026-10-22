import { describe, expect, it } from 'vitest'
import {
  contactSchema,
  flattenZodErrors,
  newsletterSchema,
  partnershipSchema,
  sniffDocumentType,
} from '@/lib/validation'

const validContact = {
  name: 'Awa Ouédraogo',
  email: 'awa@example.org',
  organization: '',
  subject: 'general',
  message: 'Bonjour, je souhaite en savoir plus sur vos actions.',
  consent: 'on',
}

describe('contact schema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true)
  })

  it('requires consent', () => {
    const res = contactSchema.safeParse({ ...validContact, consent: undefined })
    expect(res.success).toBe(false)
    if (!res.success) expect(flattenZodErrors(res.error).consent).toBe('consent')
  })

  it('rejects invalid emails and short messages', () => {
    const res = contactSchema.safeParse({
      ...validContact,
      email: 'not-an-email',
      message: 'court',
    })
    expect(res.success).toBe(false)
    if (!res.success) {
      const errors = flattenZodErrors(res.error)
      expect(errors.email).toBe('email')
      expect(errors.message).toBe('tooShort')
    }
  })

  it('rejects unknown subjects (no arbitrary enum values)', () => {
    expect(contactSchema.safeParse({ ...validContact, subject: 'hack' }).success).toBe(false)
  })

  it('trims whitespace', () => {
    const res = contactSchema.safeParse({ ...validContact, name: '  Awa  ' })
    expect(res.success && res.data.name).toBe('Awa')
  })
})

describe('partnership schema', () => {
  const valid = {
    fullName: 'Jean Kaboré',
    organization: 'Université X',
    position: 'Chercheur',
    email: 'jean@univ.example',
    phone: '+226 70 00 00 00',
    country: 'Burkina Faso',
    collaborationType: 'scientific',
    subject: 'Projet de recherche commun',
    message: 'Nous souhaitons étudier une collaboration autour de la qualité de l’eau.',
    consent: true,
  }
  it('accepts a valid request', () => {
    expect(partnershipSchema.safeParse(valid).success).toBe(true)
  })
  it('rejects malformed phone numbers', () => {
    const res = partnershipSchema.safeParse({ ...valid, phone: 'call me maybe' })
    expect(res.success).toBe(false)
  })
  it('allows an empty optional phone', () => {
    expect(partnershipSchema.safeParse({ ...valid, phone: '' }).success).toBe(true)
  })
})

describe('newsletter schema', () => {
  it('needs an email and consent', () => {
    expect(newsletterSchema.safeParse({ email: 'a@b.co', consent: 'on' }).success).toBe(true)
    expect(newsletterSchema.safeParse({ email: 'a@b.co' }).success).toBe(false)
  })
})

describe('file signature sniffing', () => {
  it('detects PDF and DOCX by magic number', () => {
    expect(sniffDocumentType(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))).toBe('pdf')
    expect(sniffDocumentType(new Uint8Array([0x50, 0x4b, 0x03, 0x04]))).toBe('docx')
  })
  it('rejects anything else (e.g. an executable renamed .pdf)', () => {
    expect(sniffDocumentType(new Uint8Array([0x4d, 0x5a, 0x90, 0x00]))).toBeNull()
    expect(sniffDocumentType(new Uint8Array([]))).toBeNull()
  })
})
