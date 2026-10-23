import type { GlobalConfig } from 'payload'
import { iconField } from '@/fields/icon'
import { heroGroup, localizedText, localizedTextarea, pageGlobal } from './_shared'

const cards = (name: string, label: { fr: string; en: string }) => ({
  name,
  type: 'array' as const,
  label,
  fields: [
    localizedText('title', { fr: 'Titre', en: 'Title' }),
    localizedTextarea('description', { fr: 'Description', en: 'Description' }),
    iconField(),
  ],
})

export const SaagdoPage: GlobalConfig = {
  slug: 'saagdo-page',
  ...pageGlobal,
  admin: {
    ...pageGlobal.admin,
    description: {
      fr: 'Page « SAAGDO » : présentation, fonctionnalités, captures d’écran, vidéo, partenariat.',
      en: '“SAAGDO” page: overview, features, screenshots, video, partnership.',
    },
  },
  label: 'SAAGDO',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Présentation', en: 'Overview' },
          fields: [
            heroGroup(),
            // No longer shown on the page (kept so existing content is not lost).
            localizedTextarea(
              'problemIntro',
              { fr: 'Problématique — introduction', en: 'Challenge — introduction' },
              { admin: { hidden: true } },
            ),
            { ...cards('problems', { fr: 'Enjeux', en: 'Challenges' }), admin: { hidden: true } },
            localizedTextarea('solutionIntro', {
              fr: 'Fonctionnalités — introduction',
              en: 'Features — introduction',
            }),
            cards('components', { fr: 'Fonctionnalités', en: 'Features' }),
            {
              ...cards('flow', {
                fr: 'Fonctionnement conceptuel (étapes)',
                en: 'Conceptual flow (steps)',
              }),
              admin: { hidden: true },
            },
          ],
        },
        {
          label: { fr: 'Partenariat & accès', en: 'Partnership & access' },
          fields: [
            localizedTextarea('partnershipText', {
              fr: 'Cadre du partenariat GWP-AO',
              en: 'GWP-WA partnership framework',
            }),
            {
              name: 'partnershipSourceUrl',
              type: 'text',
              // No longer linked from the page (kept so existing content is not lost).
              admin: { hidden: true },
              label: { fr: 'Source officielle', en: 'Official source' },
            },
            {
              name: 'platformUrl',
              type: 'text',
              label: {
                fr: 'URL officielle de la plateforme SAAGDO',
                en: 'Official SAAGDO platform URL',
              },
              admin: {
                description: {
                  fr: 'Laisser vide tant que la plateforme n’est pas publiquement accessible : le bouton reste désactivé.',
                  en: 'Leave empty until the platform is publicly available: the button stays disabled.',
                },
              },
            },
            {
              name: 'screenshotPlatform',
              type: 'upload',
              relationTo: 'media',
              label: {
                fr: 'Capture de la plateforme (ordinateur)',
                en: 'Platform screenshot (desktop)',
              },
              admin: {
                description: {
                  fr: 'Avec la capture de l’application, remplace la maquette illustrative (accueil et page SAAGDO).',
                  en: 'With the app screenshot, replaces the illustrative mock-up (home and SAAGDO page).',
                },
              },
            },
            {
              name: 'screenshotApp',
              type: 'upload',
              relationTo: 'media',
              label: {
                fr: 'Capture de l’application (téléphone)',
                en: 'App screenshot (phone)',
              },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'video' } },
              label: { fr: 'Vidéo de présentation (fichier)', en: 'Presentation video (file)' },
              admin: {
                description: {
                  fr: 'Lue directement sur la page, sous l’introduction (MP4 léger, chargée seulement au clic).',
                  en: 'Played on the page, under the intro (light MP4, only loaded on click).',
                },
              },
            },
            {
              name: 'videoPoster',
              type: 'upload',
              relationTo: 'media',
              label: { fr: 'Image d’aperçu de la vidéo', en: 'Video poster image' },
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: {
                fr: 'Vidéo de présentation (lien)',
                en: 'Presentation video (link)',
              },
              // The page now plays the uploaded video file; the link button was removed.
              admin: {
                hidden: true,
                description: {
                  fr: 'Lien vers la vidéo publiée (Facebook, YouTube…). Affiche un bouton « Voir la vidéo » ; laisser vide pour le masquer.',
                  en: 'Link to the published video (Facebook, YouTube…). Shows a “Watch the video” button; leave empty to hide it.',
                },
              },
            },
            {
              name: 'showDemo',
              type: 'checkbox',
              defaultValue: true,
              // The fictitious demo was replaced by real screenshots and the video.
              admin: { hidden: true },
              label: {
                fr: 'Afficher la démonstration (données fictives)',
                en: 'Show demo (fictitious data)',
              },
            },
          ],
        },
      ],
    },
  ],
}
