import type { GlobalConfig } from 'payload'
import { localizedText, localizedTextarea, pageGlobal } from './_shared'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  ...pageGlobal,
  admin: {
    ...pageGlobal.admin,
    description: {
      fr: 'Textes, photos et vidéo de la page d’accueil.',
      en: 'Texts, photos and video of the homepage.',
    },
  },
  label: { fr: 'Accueil', en: 'Homepage' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            localizedText('eyebrow', { fr: 'Surtitre', en: 'Eyebrow' }),
            localizedText('title', { fr: 'Titre principal', en: 'Main title' }),
            localizedTextarea('subtitle', { fr: 'Sous-titre', en: 'Subtitle' }),
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: { fr: 'Image principale', en: 'Main image' },
            },
            {
              name: 'mosaic',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              maxRows: 3,
              label: { fr: 'Mosaïque photo (3 max.)', en: 'Photo mosaic (max. 3)' },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              label: {
                fr: 'Vidéo d’arrière-plan (MP4/WebM légère, facultative)',
                en: 'Background video (light MP4/WebM, optional)',
              },
            },
          ],
        },
        {
          label: { fr: 'Présentation', en: 'Introduction' },
          name: 'intro',
          fields: [
            localizedText('eyebrow', { fr: 'Surtitre', en: 'Eyebrow' }),
            localizedText('title', { fr: 'Titre', en: 'Title' }),
            localizedTextarea('text', { fr: 'Texte', en: 'Text' }),
            localizedTextarea('mission', { fr: 'Mission (encadré)', en: 'Mission (highlight)' }),
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
            {
              name: 'secondaryImage',
              type: 'upload',
              relationTo: 'media',
              label: { fr: 'Image secondaire', en: 'Secondary image' },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'video' } },
              label: { fr: 'Vidéo de présentation', en: 'Presentation video' },
              admin: {
                description: {
                  fr: 'Si une vidéo est choisie, elle remplace les images (MP4 léger, lue seulement au clic).',
                  en: 'When set, the video replaces the images (light MP4, only loaded on click).',
                },
              },
            },
            {
              name: 'videoPoster',
              type: 'upload',
              relationTo: 'media',
              label: { fr: 'Image d’aperçu de la vidéo', en: 'Video poster image' },
            },
          ],
        },
        {
          label: 'SAAGDO',
          name: 'saagdo',
          // No longer shown on the homepage (kept so existing content is not lost).
          admin: { condition: () => false },
          fields: [
            localizedText('title', { fr: 'Titre', en: 'Title' }),
            localizedTextarea('text', { fr: 'Texte', en: 'Text' }),
          ],
        },
        {
          label: { fr: 'Appel à l’action', en: 'Call to action' },
          name: 'cta',
          // No longer shown on the homepage (kept so existing content is not lost).
          admin: { condition: () => false },
          fields: [
            localizedText('title', { fr: 'Titre', en: 'Title' }),
            localizedTextarea('text', { fr: 'Texte', en: 'Text' }),
          ],
        },
      ],
    },
  ],
}
