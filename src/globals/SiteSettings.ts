import type { GlobalConfig } from 'payload'
import { settingsGlobal } from './_shared'

export const SOCIAL_PLATFORMS = [
  'facebook',
  'linkedin',
  'x',
  'youtube',
  'instagram',
  'tiktok',
  'whatsapp',
] as const

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  ...settingsGlobal,
  admin: {
    ...settingsGlobal.admin,
    description: {
      fr: 'Logo, coordonnées, réseaux sociaux et référencement, utilisés sur tout le site.',
      en: 'Logo, contact details, social networks and SEO, used across the site.',
    },
  },
  label: { fr: 'Paramètres du site', en: 'Site settings' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Identité', en: 'Identity' },
          fields: [
            {
              name: 'organizationName',
              type: 'text',
              localized: true,
              required: true,
              label: { fr: 'Nom officiel', en: 'Official name' },
            },
            {
              name: 'shortName',
              type: 'text',
              required: true,
              defaultValue: 'ACIEA',
              label: { fr: 'Sigle', en: 'Acronym' },
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              label: { fr: 'Devise', en: 'Motto' },
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              label: { fr: 'Présentation courte', en: 'Short description' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { fr: 'Logo officiel', en: 'Official logo' },
                },
                { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon' },
              ],
            },
            {
              name: 'foundedYear',
              type: 'number',
              label: { fr: 'Année de création', en: 'Year founded' },
            },
            {
              name: 'legalStatus',
              type: 'text',
              localized: true,
              label: { fr: 'Statut juridique', en: 'Legal status' },
            },
            {
              name: 'registrationNumber',
              type: 'text',
              label: { fr: 'N° de récépissé / enregistrement', en: 'Registration number' },
              admin: {
                description: {
                  fr: 'À renseigner pour les mentions légales.',
                  en: 'Required for the legal notice.',
                },
              },
            },
          ],
        },
        {
          label: { fr: 'Contact', en: 'Contact' },
          fields: [
            { name: 'email', type: 'email', label: { fr: 'Email public', en: 'Public email' } },
            { name: 'phone', type: 'text', label: { fr: 'Téléphone public', en: 'Public phone' } },
            {
              name: 'address',
              type: 'textarea',
              localized: true,
              label: { fr: 'Adresse', en: 'Address' },
            },
            {
              name: 'city',
              type: 'text',
              defaultValue: 'Ouagadougou',
              label: { fr: 'Ville', en: 'City' },
            },
            {
              name: 'country',
              type: 'text',
              localized: true,
              label: { fr: 'Pays', en: 'Country' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'hqLatitude',
                  type: 'number',
                  label: { fr: 'Latitude du siège', en: 'HQ latitude' },
                },
                {
                  name: 'hqLongitude',
                  type: 'number',
                  label: { fr: 'Longitude du siège', en: 'HQ longitude' },
                },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              label: { fr: 'Réseaux sociaux officiels', en: 'Official social accounts' },
              admin: {
                description: {
                  fr: 'Seuls les comptes cochés « vérifié » sont affichés.',
                  en: 'Only accounts marked “verified” are displayed.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: SOCIAL_PLATFORMS.map((v) => ({ value: v, label: v })),
                    },
                    { name: 'url', type: 'text', required: true },
                    { name: 'verified', type: 'checkbox', defaultValue: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { fr: 'Formulaires & données', en: 'Forms & data' },
          fields: [
            {
              name: 'notificationEmails',
              type: 'text',
              hasMany: true,
              label: { fr: 'Destinataires des notifications', en: 'Notification recipients' },
              admin: {
                description: {
                  fr: 'Reçoivent une alerte à chaque formulaire (nécessite la configuration SMTP).',
                  en: 'Receive an alert for each form submission (requires SMTP configuration).',
                },
              },
            },
            {
              name: 'dataRetentionMonths',
              type: 'number',
              defaultValue: 24,
              min: 1,
              max: 120,
              label: { fr: 'Conservation des messages (mois)', en: 'Message retention (months)' },
              admin: {
                description: {
                  fr: 'Les messages et demandes plus anciens sont supprimés automatiquement chaque jour. À valider au regard des obligations applicables.',
                  en: 'Older messages and requests are deleted automatically every day. To be validated against applicable obligations.',
                },
              },
            },
            {
              name: 'dataController',
              type: 'text',
              localized: true,
              label: { fr: 'Responsable du traitement', en: 'Data controller' },
            },
          ],
        },
        {
          label: { fr: 'SEO & langues', en: 'SEO & languages' },
          fields: [
            { name: 'defaultMetaTitle', type: 'text', localized: true, label: 'Meta title' },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              localized: true,
              label: 'Meta description',
            },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media', label: 'Open Graph' },
            {
              name: 'englishValidated',
              type: 'checkbox',
              defaultValue: false,
              label: {
                fr: 'Les traductions anglaises ont été validées par l’ACIEA',
                en: 'English translations have been approved by ACIEA',
              },
              admin: {
                description: {
                  fr: 'Tant que cette case est décochée, un bandeau signale que la version française fait foi.',
                  en: 'While unchecked, a banner states that the French version prevails.',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
