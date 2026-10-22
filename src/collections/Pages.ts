import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

/**
 * Free-form editorial pages. Pages with the slugs `legal`, `privacy` and `terms`
 * feed the legal notice, privacy policy and terms of use routes.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  ...editorialCollection,
  labels: { singular: { fr: 'Page', en: 'Page' }, plural: { fr: 'Pages', en: 'Pages' } },
  admin: { useAsTitle: 'title', group: contentGroup, defaultColumns: ['title', 'slug', '_status'] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { fr: 'Titre', en: 'Title' } },
    { name: 'intro', type: 'textarea', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
    { name: 'content', type: 'richText', localized: true, label: { fr: 'Contenu', en: 'Content' } },
    {
      name: 'lastReviewed',
      type: 'date',
      label: { fr: 'Dernière mise à jour juridique', en: 'Last legal review' },
      admin: { position: 'sidebar' },
    },
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
