import type { CollectionConfig } from 'payload'
import { editorialFields } from '@/fields/editorial'
import { editorialCollection, institutionGroup } from './_shared'

export const TEAM_GROUPS = ['board', 'executive', 'team', 'advisors'] as const

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  ...editorialCollection,
  labels: {
    singular: { fr: 'Membre de l’équipe', en: 'Team member' },
    plural: { fr: 'Équipe', en: 'Team' },
  },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'name',
    group: institutionGroup,
    defaultColumns: ['name', 'position', 'group', '_status'],
    description: {
      fr: 'Publiez uniquement des fonctions et biographies validées par les personnes concernées.',
      en: 'Only publish roles and biographies approved by the people concerned.',
    },
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: { fr: 'Nom complet', en: 'Full name' } },
    { name: 'position', type: 'text', localized: true, label: { fr: 'Fonction', en: 'Position' } },
    {
      name: 'group',
      type: 'select',
      defaultValue: 'team',
      label: { fr: 'Instance', en: 'Body' },
      options: [
        { value: 'board', label: { fr: 'Conseil d’administration', en: 'Board' } },
        { value: 'executive', label: { fr: 'Bureau exécutif', en: 'Executive office' } },
        { value: 'team', label: { fr: 'Équipe opérationnelle', en: 'Operational team' } },
        { value: 'advisors', label: { fr: 'Conseillers', en: 'Advisors' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media', label: { fr: 'Portrait', en: 'Portrait' } },
    { name: 'bio', type: 'textarea', localized: true, label: { fr: 'Biographie validée', en: 'Approved biography' } },
    { name: 'linkedin', type: 'text', label: 'LinkedIn' },
    {
      name: 'consentToPublish',
      type: 'checkbox',
      defaultValue: false,
      label: {
        fr: 'Consentement de la personne à la publication de son portrait',
        en: 'Person consents to publication of their portrait',
      },
    },
    { name: 'order', type: 'number', defaultValue: 100, label: { fr: 'Ordre', en: 'Order' }, admin: { position: 'sidebar' } },
    ...editorialFields,
  ],
}
