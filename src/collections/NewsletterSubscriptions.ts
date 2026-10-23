import type { CollectionConfig } from 'payload'
import { adminsOnly, nobody } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'
import { inboxGroup } from './_shared'

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletter-subscriptions',
  labels: {
    singular: { fr: 'Abonné newsletter', en: 'Newsletter subscriber' },
    plural: { fr: 'Abonnés newsletter', en: 'Newsletter subscribers' },
  },
  admin: {
    description: {
      fr: 'Personnes inscrites à la lettre d’information (formulaire en bas du site).',
      en: 'People subscribed to the newsletter (form at the bottom of the site).',
    },
    useAsTitle: 'email',
    group: inboxGroup,
    defaultColumns: ['email', 'status', 'locale', 'createdAt'],
  },
  access: { read: adminsOnly, create: nobody, update: adminsOnly, delete: adminsOnly },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'subscribed',
      options: [
        { value: 'subscribed', label: { fr: 'Inscrit', en: 'Subscribed' } },
        { value: 'unsubscribed', label: { fr: 'Désinscrit', en: 'Unsubscribed' } },
      ],
    },
    { name: 'locale', type: 'text', admin: { readOnly: true } },
    {
      name: 'consentAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'unsubscribedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'unsubscribeToken',
      type: 'text',
      index: true,
      admin: { hidden: true },
      access: { read: () => false },
    },
  ],
  hooks: auditHooks,
}
