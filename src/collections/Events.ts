import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { seoField } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { contentGroup, editorialCollection } from './_shared'

export const Events: CollectionConfig = {
  slug: 'events',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Événement', en: 'Event' },
    plural: { fr: 'Événements', en: 'Events' },
  },
  defaultSort: '-startDate',
  admin: {
    useAsTitle: 'title',
    group: contentGroup,
    defaultColumns: ['title', 'startDate', 'location', '_status'],
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
      label: { fr: 'Résumé', en: 'Summary' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { fr: 'Description', en: 'Description' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          index: true,
          label: { fr: 'Début', en: 'Start' },
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
        {
          name: 'endDate',
          type: 'date',
          label: { fr: 'Fin', en: 'End' },
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    { name: 'location', type: 'text', localized: true, label: { fr: 'Lieu', en: 'Venue' } },
    {
      name: 'format',
      type: 'select',
      defaultValue: 'in-person',
      label: { fr: 'Format', en: 'Format' },
      options: [
        { value: 'in-person', label: { fr: 'Présentiel', en: 'In person' } },
        { value: 'online', label: { fr: 'En ligne', en: 'Online' } },
        { value: 'hybrid', label: { fr: 'Hybride', en: 'Hybrid' } },
      ],
    },
    {
      name: 'cancelled',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Annulé', en: 'Cancelled' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image', en: 'Image' },
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: { fr: 'Lien d’inscription', en: 'Registration link' },
    },
    {
      name: 'relatedNews',
      type: 'relationship',
      relationTo: 'news',
      label: { fr: 'Compte rendu (actualité)', en: 'Report (news)' },
    },
    slugField(),
    seoField,
    ...editorialFields,
  ],
}
