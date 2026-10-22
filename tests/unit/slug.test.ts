import { describe, expect, it } from 'vitest'
import { RESERVED_SLUGS, slugField, slugify } from '@/fields/slug'

describe('slugify', () => {
  it('removes accents, apostrophes and punctuation', () => {
    expect(slugify('Éducation environnementale & engagement')).toBe(
      'education-environnementale-engagement',
    )
    expect(slugify("L’ACIEA et le GWP Afrique de l'Ouest")).toBe(
      'l-aciea-et-le-gwp-afrique-de-l-ouest',
    )
  })
  it('limits the length', () => {
    expect(slugify('a'.repeat(200)).length).toBeLessThanOrEqual(96)
  })
})

describe('slug field validation', () => {
  const field = slugField() as { validate: (v: unknown) => true | string }
  it('accepts clean slugs', () => {
    expect(field.validate('camp-2025')).toBe(true)
  })
  it('rejects invalid formats and reserved route segments', () => {
    expect(field.validate('Bad Slug')).not.toBe(true)
    expect(field.validate('../etc')).not.toBe(true)
    for (const reserved of RESERVED_SLUGS) expect(field.validate(reserved)).not.toBe(true)
  })
})
