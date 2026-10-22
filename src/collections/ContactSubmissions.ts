import type { CollectionConfig, Field } from 'payload'
import { adminsOnly, nobody } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'
import { inboxGroup } from './_shared'

import { CONTACT_SUBJECTS } from '@/lib/constants'

export { CONTACT_SUBJECTS }

/** Fields shared by every inbox collection. */
export const inboxMetaFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    defaultValue: 'new',
    label: { fr: 'Traitement', en: 'Handling' },
    options: [
      { value: 'new', label: { fr: 'Nouveau', en: 'New' } },
      { value: 'in-progress', label: { fr: 'En cours', en: 'In progress' } },
      { value: 'answered', label: { fr: 'Répondu', en: 'Answered' } },
      { value: 'closed', label: { fr: 'Clôturé', en: 'Closed' } },
      { value: 'spam', label: 'Spam' },
    ],
    admin: { position: 'sidebar' },
  },
  {
    name: 'internalNotes',
    type: 'textarea',
    label: { fr: 'Notes internes', en: 'Internal notes' },
  },
  {
    name: 'locale',
    type: 'text',
    admin: { readOnly: true, position: 'sidebar' },
    label: { fr: 'Langue', en: 'Language' },
  },
  {
    name: 'consentAt',
    type: 'date',
    admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    label: { fr: 'Consentement donné le', en: 'Consent given at' },
  },
  {
    name: 'notification',
    type: 'select',
    defaultValue: 'not-configured',
    admin: { readOnly: true, position: 'sidebar' },
    label: { fr: 'Notification email', en: 'Email notification' },
    options: [
      { value: 'sent', label: { fr: 'Envoyée', en: 'Sent' } },
      { value: 'failed', label: { fr: 'Échec', en: 'Failed' } },
      {
        value: 'not-configured',
        label: { fr: 'Service email non configuré', en: 'Email not configured' },
      },
    ],
  },
]

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { fr: 'Message de contact', en: 'Contact message' },
    plural: { fr: 'Messages de contact', en: 'Contact messages' },
  },
  admin: {
    useAsTitle: 'subjectLine',
    group: inboxGroup,
    defaultColumns: ['subjectLine', 'name', 'email', 'status', 'createdAt'],
  },
  // Personal data: admins only. Public creation goes through the validated server action.
  access: { read: adminsOnly, create: nobody, update: adminsOnly, delete: adminsOnly },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom', en: 'Name' },
      admin: { readOnly: true },
    },
    { name: 'email', type: 'email', required: true, admin: { readOnly: true } },
    {
      name: 'organization',
      type: 'text',
      label: { fr: 'Organisation', en: 'Organisation' },
      admin: { readOnly: true },
    },
    {
      name: 'subject',
      type: 'select',
      required: true,
      label: { fr: 'Objet', en: 'Subject' },
      options: CONTACT_SUBJECTS.map((value) => ({ value, label: value })),
      admin: { readOnly: true },
    },
    {
      name: 'subjectLine',
      type: 'text',
      label: { fr: 'Titre', en: 'Title' },
      admin: { readOnly: true },
    },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    ...inboxMetaFields,
  ],
  hooks: auditHooks,
  timestamps: true,
}
