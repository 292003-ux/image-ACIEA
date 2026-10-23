import type { CollectionConfig } from 'payload'
import { editorialFields, sourceField } from '@/fields/editorial'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

import { NEWS_CATEGORIES } from '@/lib/constants'

export { NEWS_CATEGORIES }

export const News: CollectionConfig = {
  slug: 'news',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Actualité', en: 'News article' },
    plural: { fr: 'Actualités', en: 'News' },
  },
  defaultSort: '-publishedAt',
  admin: {
    description: {
      fr: 'Page « Actualités » ; les 3 plus récentes apparaissent aussi sur l’accueil.',
      en: '“News” page; the 3 most recent also appear on the homepage.',
    },
    useAsTitle: 'title',
    group: contentGroup,
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'reviewStatus'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    preview: (doc, { locale }) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      const path = `/${locale || 'fr'}/${locale === 'en' ? 'news' : 'actualites'}/${doc.slug}`
      return `${base}/api/preview?path=${encodeURIComponent(path)}`
    },
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 320,
      label: { fr: 'Résumé', en: 'Summary' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image', en: 'Image' },
    },
    { name: 'content', type: 'richText', localized: true, label: { fr: 'Contenu', en: 'Content' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'institutional',
      label: { fr: 'Catégorie', en: 'Category' },
      options: [
        { value: 'institutional', label: { fr: 'Vie institutionnelle', en: 'Institutional' } },
        { value: 'partnership', label: { fr: 'Partenariat', en: 'Partnership' } },
        { value: 'field', label: { fr: 'Terrain', en: 'Field action' } },
        { value: 'event', label: { fr: 'Événement', en: 'Event' } },
        { value: 'statement', label: { fr: 'Déclaration', en: 'Statement' } },
        { value: 'innovation', label: { fr: 'Innovation', en: 'Innovation' } },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      label: { fr: 'Date', en: 'Date' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'datePrecision',
      type: 'select',
      defaultValue: 'day',
      label: { fr: 'Précision de la date', en: 'Date precision' },
      options: [
        { value: 'day', label: { fr: 'Jour exact', en: 'Exact day' } },
        { value: 'month', label: { fr: 'Mois seulement', en: 'Month only' } },
      ],
      admin: {
        position: 'sidebar',
        description: {
          fr: 'Choisir « Mois seulement » quand le jour exact n’est pas connu.',
          en: 'Use “Month only” when the exact day is unknown.',
        },
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: { fr: 'Auteur (affiché)', en: 'Author (displayed)' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Archivé (masqué des listes)', en: 'Archived (hidden from lists)' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      label: { fr: 'Mots-clés', en: 'Tags' },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: { fr: 'Projets liés', en: 'Related projects' },
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: { fr: 'Galerie', en: 'Gallery' },
    },
    sourceField,
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
