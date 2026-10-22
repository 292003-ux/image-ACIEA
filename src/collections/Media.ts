import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAbove, staffOnly } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Média', en: 'Media' },
    plural: { fr: 'Médias', en: 'Media' },
  },
  admin: {
    group: { fr: 'Médiathèque', en: 'Library' },
    defaultColumns: ['filename', 'alt', 'provenance', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: staffOnly,
    update: staffOnly,
    delete: ({ req }) => isEditorOrAbove(req.user),
  },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2400, withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 480, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 80 } } },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Texte alternatif', en: 'Alt text' },
      admin: {
        description: {
          fr: 'Décrit l’image pour les personnes utilisant un lecteur d’écran.',
          en: 'Describes the image for screen-reader users.',
        },
      },
    },
    { name: 'caption', type: 'text', localized: true, label: { fr: 'Légende', en: 'Caption' } },
    { name: 'credit', type: 'text', label: { fr: 'Crédit photo', en: 'Photo credit' } },
    {
      name: 'provenance',
      type: 'select',
      required: true,
      defaultValue: 'to-verify',
      label: { fr: 'Provenance', en: 'Provenance' },
      options: [
        { value: 'official', label: { fr: 'Photo officielle ACIEA', en: 'Official ACIEA photo' } },
        { value: 'field', label: { fr: 'Photo de terrain validée', en: 'Validated field photo' } },
        { value: 'illustrative', label: { fr: 'Visuel d’illustration', en: 'Illustrative visual' } },
        { value: 'to-verify', label: { fr: 'À vérifier', en: 'To verify' } },
      ],
      admin: {
        position: 'sidebar',
        description: {
          fr: 'Les visuels d’illustration sont signalés comme tels sur le site.',
          en: 'Illustrative visuals are labelled as such on the website.',
        },
      },
    },
    {
      // Internal identifier used by the seed script to stay idempotent.
      name: 'seedKey',
      type: 'text',
      index: true,
      admin: { hidden: true },
    },
    {
      name: 'showInGallery',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Afficher dans la galerie publique', en: 'Show in public gallery' },
      admin: { position: 'sidebar' },
    },
  ],
  hooks: auditHooks,
}
