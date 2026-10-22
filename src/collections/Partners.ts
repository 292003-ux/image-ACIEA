import type { CollectionConfig, TextField } from 'payload'
import { editorialFields, sourceField } from '@/fields/editorial'
import { slugField } from '@/fields/slug'
import { editorialCollection, institutionGroup } from './_shared'

export const PARTNER_CATEGORIES = [
  'institutional',
  'technical',
  'scientific',
  'financial',
  'technological',
  'community',
] as const

export const Partners: CollectionConfig = {
  slug: 'partners',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Partenaire', en: 'Partner' },
    plural: { fr: 'Partenaires', en: 'Partners' },
  },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'name',
    group: institutionGroup,
    defaultColumns: ['name', 'category', 'agreementDate', '_status'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, label: { fr: 'Nom officiel', en: 'Official name' } },
    { name: 'acronym', type: 'text', localized: true, label: { fr: 'Sigle', en: 'Acronym' } },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'website', type: 'text', label: { fr: 'Site officiel', en: 'Official website' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: { fr: 'Catégorie', en: 'Category' },
      options: [
        { value: 'institutional', label: { fr: 'Partenaire institutionnel', en: 'Institutional partner' } },
        { value: 'technical', label: { fr: 'Partenaire technique', en: 'Technical partner' } },
        { value: 'scientific', label: { fr: 'Partenaire scientifique', en: 'Scientific partner' } },
        { value: 'financial', label: { fr: 'Partenaire financier', en: 'Financial partner' } },
        { value: 'technological', label: { fr: 'Partenaire technologique', en: 'Technology partner' } },
        { value: 'community', label: { fr: 'Organisation communautaire', en: 'Community organisation' } },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { fr: 'Présentation de la collaboration', en: 'About the collaboration' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'agreementType',
          type: 'text',
          localized: true,
          label: { fr: 'Cadre formel (ex. protocole d’accord)', en: 'Formal framework (e.g. MoU)' },
        },
        { name: 'agreementDate', type: 'date', label: { fr: 'Date de signature', en: 'Signature date' } },
      ],
    },
    {
      name: 'collaborationAreas',
      type: 'array',
      localized: true,
      label: { fr: 'Axes de collaboration', en: 'Areas of collaboration' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      ...sourceField,
      validate: (value: string | null | undefined, { siblingData }: { siblingData: unknown }) => {
        const sibling = siblingData as Record<string, unknown>
        // Financial partnerships are sensitive: a source is mandatory.
        if (sibling?.category === 'financial' && !value) {
          return 'Une source est obligatoire pour un partenaire financier.'
        }
        if (!value) return true
        try {
          new URL(String(value))
          return true
        } catch {
          return 'URL invalide'
        }
      },
    } as TextField,
    { name: 'order', type: 'number', defaultValue: 0, label: { fr: 'Ordre', en: 'Order' }, admin: { position: 'sidebar' } },
    slugField('name'),
    ...editorialFields,
  ],
}
