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
  label: 'SAAGDO',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Présentation', en: 'Overview' },
          fields: [
            heroGroup(),
            localizedTextarea('problemIntro', {
              fr: 'Problématique — introduction',
              en: 'Challenge — introduction',
            }),
            cards('problems', { fr: 'Enjeux', en: 'Challenges' }),
            localizedTextarea('solutionIntro', {
              fr: 'Solution — introduction',
              en: 'Solution — introduction',
            }),
            cards('components', { fr: 'Composantes documentées', en: 'Documented components' }),
            cards('flow', {
              fr: 'Fonctionnement conceptuel (étapes)',
              en: 'Conceptual flow (steps)',
            }),
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
              name: 'videoUrl',
              type: 'text',
              label: {
                fr: 'Vidéo de présentation (lien)',
                en: 'Presentation video (link)',
              },
              admin: {
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
