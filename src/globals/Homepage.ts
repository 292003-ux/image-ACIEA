import type { GlobalConfig } from 'payload'
import { localizedText, localizedTextarea, pageGlobal } from './_shared'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  ...pageGlobal,
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
            { name: 'image', type: 'upload', relationTo: 'media', label: { fr: 'Image principale', en: 'Main image' } },
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
              label: { fr: 'Vidéo d’arrière-plan (MP4/WebM légère, facultative)', en: 'Background video (light MP4/WebM, optional)' },
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
            { name: 'secondaryImage', type: 'upload', relationTo: 'media', label: { fr: 'Image secondaire', en: 'Secondary image' } },
          ],
        },
        {
          label: 'SAAGDO',
          name: 'saagdo',
          fields: [
            localizedText('title', { fr: 'Titre', en: 'Title' }),
            localizedTextarea('text', { fr: 'Texte', en: 'Text' }),
          ],
        },
        {
          label: { fr: 'Appel à l’action', en: 'Call to action' },
          name: 'cta',
          fields: [
            localizedText('title', { fr: 'Titre', en: 'Title' }),
            localizedTextarea('text', { fr: 'Texte', en: 'Text' }),
          ],
        },
      ],
    },
  ],
}
