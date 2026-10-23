import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { contentGroup, editorialCollection } from './_shared'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  ...editorialCollection,
  labels: { singular: 'FAQ', plural: 'FAQ' },
  defaultSort: 'order',
  admin: {
    description: {
      fr: 'Questions fréquentes de la page « Partenaires ».',
      en: 'Frequently asked questions on the “Partners” page.',
    },
    useAsTitle: 'question',
    group: contentGroup,
    defaultColumns: ['question', 'scope', '_status'],
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true, label: 'Question' },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Réponse', en: 'Answer' },
    },
    {
      name: 'scope',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: { fr: 'Rubrique', en: 'Section' },
      options: [
        { value: 'saagdo', label: 'SAAGDO' },
        { value: 'partners', label: { fr: 'Partenariats', en: 'Partnerships' } },
        { value: 'general', label: { fr: 'Général', en: 'General' } },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    ...editorialFields,
  ],
}
