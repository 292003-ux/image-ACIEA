import { APIError, type CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { editorialCollection, institutionGroup } from './_shared'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  ...editorialCollection,
  hooks: {
    ...editorialCollection.hooks,
    beforeChange: [
      ...editorialCollection.hooks.beforeChange,
      ({ data }) => {
        if (data?._status === 'published' && !data.consentObtained) {
          throw new APIError(
            'Un témoignage ne peut être publié sans le consentement écrit de son auteur.',
            400,
            undefined,
            true,
          )
        }
        return data
      },
    ],
  },
  labels: {
    singular: { fr: 'Témoignage validé', en: 'Approved testimonial' },
    plural: { fr: 'Témoignages validés', en: 'Approved testimonials' },
  },
  admin: { useAsTitle: 'authorName', group: institutionGroup },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Citation', en: 'Quote' },
    },
    { name: 'authorName', type: 'text', required: true, label: { fr: 'Auteur', en: 'Author' } },
    {
      name: 'authorRole',
      type: 'text',
      localized: true,
      label: { fr: 'Fonction / organisation', en: 'Role / organisation' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo' },
    {
      name: 'consentObtained',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Consentement écrit obtenu', en: 'Written consent obtained' },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: { fr: 'Projet', en: 'Project' },
    },
    ...editorialFields,
  ],
}
