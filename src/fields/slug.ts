import type { Field, FieldHook } from 'payload'

/** Path segments used by static routes that must never be captured by a slug. */
export const RESERVED_SLUGS = ['ongoing', 'completed', 'en-cours', 'acheves', 'reports', 'become']

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[sourceField] ?? originalDoc?.[sourceField]
    if (typeof source === 'string' && source) return slugify(source)
    // Localized source fields arrive as the current-locale string; fall back gracefully.
    return value
  }

export function slugField(sourceField = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    required: true,
    label: { fr: 'Slug (URL)', en: 'Slug (URL)' },
    admin: {
      position: 'sidebar',
      description: {
        fr: 'Généré automatiquement depuis le titre. Minuscules, chiffres et tirets.',
        en: 'Generated from the title. Lowercase letters, digits and hyphens.',
      },
    },
    hooks: { beforeValidate: [formatSlug(sourceField)] },
    validate: (value: unknown) => {
      if (typeof value !== 'string' || !value) return 'Slug requis / Slug required'
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return 'Format de slug invalide'
      if (RESERVED_SLUGS.includes(value)) return 'Ce slug est réservé'
      return true
    },
  }
}
