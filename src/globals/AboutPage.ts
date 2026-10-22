import type { GlobalConfig } from 'payload'
import { iconField } from '@/fields/icon'
import { sourceField } from '@/fields/editorial'
import { heroGroup, localizedText, localizedTextarea, pageGlobal } from './_shared'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  ...pageGlobal,
  label: { fr: 'À propos', en: 'About' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Présentation', en: 'Overview' },
          fields: [
            heroGroup(),
            { name: 'presentation', type: 'richText', localized: true, label: { fr: 'Présentation générale', en: 'Overview' } },
            { name: 'presentationImage', type: 'upload', relationTo: 'media', label: 'Image' },
          ],
        },
        {
          label: { fr: 'Histoire', en: 'History' },
          fields: [
            { name: 'historyIntro', type: 'richText', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
            {
              name: 'milestones',
              type: 'array',
              label: { fr: 'Jalons vérifiés', en: 'Verified milestones' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
                    {
                      name: 'datePrecision',
                      type: 'select',
                      defaultValue: 'day',
                      options: [
                        { value: 'day', label: { fr: 'Jour', en: 'Day' } },
                        { value: 'month', label: { fr: 'Mois', en: 'Month' } },
                        { value: 'year', label: { fr: 'Année', en: 'Year' } },
                      ],
                    },
                  ],
                },
                localizedText('title', { fr: 'Titre', en: 'Title' }, { required: true } as never),
                localizedTextarea('description', { fr: 'Description', en: 'Description' }),
                sourceField,
              ],
            },
          ],
        },
        {
          label: { fr: 'Mission & valeurs', en: 'Mission & values' },
          fields: [
            localizedTextarea('mission', { fr: 'Mission', en: 'Mission' }),
            localizedTextarea('vision', { fr: 'Vision', en: 'Vision' }),
            {
              name: 'values',
              type: 'array',
              label: { fr: 'Valeurs', en: 'Values' },
              fields: [
                localizedText('title', { fr: 'Valeur', en: 'Value' }),
                localizedTextarea('description', { fr: 'Description', en: 'Description' }),
                iconField(),
              ],
            },
            {
              name: 'commitments',
              type: 'array',
              label: { fr: 'Engagements / modes d’action', en: 'Commitments / ways of working' },
              fields: [localizedText('text', { fr: 'Texte', en: 'Text' })],
            },
          ],
        },
        {
          label: { fr: 'Gouvernance', en: 'Governance' },
          fields: [
            { name: 'governance', type: 'richText', localized: true, label: { fr: 'Gouvernance', en: 'Governance' } },
            {
              name: 'presidentMessage',
              type: 'group',
              label: { fr: 'Message du président', en: 'Message from the president' },
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: false, label: { fr: 'Afficher (texte officiel validé)', en: 'Display (approved official text)' } },
                localizedTextarea('text', { fr: 'Texte officiel', en: 'Official text' }),
                { name: 'author', type: 'relationship', relationTo: 'team-members', label: { fr: 'Signataire', en: 'Signatory' } },
              ],
            },
            {
              name: 'institutionalDocuments',
              type: 'upload',
              relationTo: 'documents',
              hasMany: true,
              label: { fr: 'Documents institutionnels (statuts, rapports…)', en: 'Institutional documents' },
            },
          ],
        },
      ],
    },
  ],
}
