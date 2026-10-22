import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

export const PUBLICATION_TYPES = [
  'report',
  'study',
  'technical-note',
  'guide',
  'scientific',
  'press-release',
  'public-document',
] as const

export const Publications: CollectionConfig = {
  slug: 'publications',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Publication', en: 'Publication' },
    plural: { fr: 'Publications', en: 'Publications' },
  },
  defaultSort: '-publishedAt',
  admin: {
    useAsTitle: 'title',
    group: contentGroup,
    defaultColumns: ['title', 'type', 'publishedAt', '_status'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { fr: 'Titre', en: 'Title' } },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: { fr: 'Type de document', en: 'Document type' },
      options: [
        { value: 'report', label: { fr: 'Rapport', en: 'Report' } },
        { value: 'study', label: { fr: 'Étude', en: 'Study' } },
        { value: 'technical-note', label: { fr: 'Note technique', en: 'Technical note' } },
        { value: 'guide', label: { fr: 'Guide', en: 'Guide' } },
        { value: 'scientific', label: { fr: 'Publication scientifique', en: 'Scientific paper' } },
        { value: 'press-release', label: { fr: 'Communiqué', en: 'Press release' } },
        { value: 'public-document', label: { fr: 'Document institutionnel', en: 'Institutional document' } },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Description', en: 'Description' },
    },
    { name: 'body', type: 'richText', localized: true, label: { fr: 'Présentation détaillée', en: 'Details' } },
    { name: 'file', type: 'upload', relationTo: 'documents', label: { fr: 'Fichier téléchargeable', en: 'Downloadable file' } },
    {
      name: 'externalUrl',
      type: 'text',
      label: { fr: 'Ou lien externe (DOI, dépôt…)', en: 'Or external link (DOI, repository…)' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: { fr: 'Couverture', en: 'Cover' } },
    { name: 'authors', type: 'text', label: { fr: 'Auteurs', en: 'Authors' } },
    {
      name: 'documentLanguage',
      type: 'select',
      defaultValue: 'fr',
      label: { fr: 'Langue du document', en: 'Document language' },
      options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'fr-en', label: 'FR / EN' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      label: { fr: 'Date de publication', en: 'Publication date' },
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true, label: { fr: 'Projets liés', en: 'Related projects' } },
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
