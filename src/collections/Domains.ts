import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { iconField } from '@/fields/icon'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

export const Domains: CollectionConfig = {
  slug: 'domains',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Domaine d’intervention', en: 'Focus area' },
    plural: { fr: 'Domaines d’intervention', en: 'Focus areas' },
  },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    group: contentGroup,
    defaultColumns: ['title', 'order', '_status', 'reviewStatus'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', en: 'Title' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 260,
      label: { fr: 'Présentation courte', en: 'Short summary' },
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      label: { fr: 'Présentation détaillée', en: 'Detailed presentation' },
    },
    {
      name: 'focusPoints',
      type: 'array',
      localized: true,
      label: { fr: 'Axes de travail', en: 'Lines of work' },
      fields: [{ name: 'text', type: 'text', required: true, label: { fr: 'Texte', en: 'Text' } }],
    },
    {
      type: 'row',
      fields: [
        iconField(),
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: { fr: 'Ordre d’affichage', en: 'Display order' },
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: { fr: 'Visuel', en: 'Visual' } },
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
