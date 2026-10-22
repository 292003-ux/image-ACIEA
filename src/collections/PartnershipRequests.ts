import type { CollectionConfig } from 'payload'
import { adminsOnly, nobody } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'
import { inboxMetaFields } from './ContactSubmissions'
import { inboxGroup } from './_shared'

import { COLLABORATION_TYPES } from '@/lib/constants'

export { COLLABORATION_TYPES }

export const PartnershipRequests: CollectionConfig = {
  slug: 'partnership-requests',
  labels: {
    singular: { fr: 'Demande de partenariat', en: 'Partnership request' },
    plural: { fr: 'Demandes de partenariat', en: 'Partnership requests' },
  },
  admin: {
    useAsTitle: 'subject',
    group: inboxGroup,
    defaultColumns: ['subject', 'organization', 'collaborationType', 'status', 'createdAt'],
  },
  access: { read: adminsOnly, create: nobody, update: adminsOnly, delete: adminsOnly },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: { fr: 'Nom complet', en: 'Full name' }, admin: { readOnly: true } },
    { name: 'organization', type: 'text', required: true, label: { fr: 'Organisation', en: 'Organisation' }, admin: { readOnly: true } },
    { name: 'position', type: 'text', required: true, label: { fr: 'Fonction', en: 'Position' }, admin: { readOnly: true } },
    { name: 'email', type: 'email', required: true, admin: { readOnly: true } },
    { name: 'phone', type: 'text', label: { fr: 'Téléphone', en: 'Phone' }, admin: { readOnly: true } },
    { name: 'country', type: 'text', required: true, label: { fr: 'Pays', en: 'Country' }, admin: { readOnly: true } },
    {
      name: 'collaborationType',
      type: 'select',
      required: true,
      label: { fr: 'Type de collaboration', en: 'Collaboration type' },
      options: COLLABORATION_TYPES.map((value) => ({ value, label: value })),
      admin: { readOnly: true },
    },
    { name: 'subject', type: 'text', required: true, label: { fr: 'Objet', en: 'Subject' }, admin: { readOnly: true } },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'submission-files',
      label: { fr: 'Pièce jointe', en: 'Attachment' },
      admin: { readOnly: true },
    },
    ...inboxMetaFields,
  ],
  hooks: {
    ...auditHooks,
    afterDelete: [
      ...auditHooks.afterDelete,
      // Remove the private attachment together with the request (data minimisation).
      async ({ doc, req }) => {
        const id = typeof doc.attachment === 'object' ? doc.attachment?.id : doc.attachment
        if (id) {
          await req.payload.delete({ collection: 'submission-files', id, overrideAccess: true, req })
        }
      },
    ],
  },
}
