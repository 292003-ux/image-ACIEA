import type { CollectionConfig } from 'payload'
import { adminsOnly, nobody } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'

import { SUBMISSION_FILE_TYPES } from '@/lib/constants'

/**
 * Private attachments received through public forms.
 * Never publicly readable: files are served through Payload's access-controlled endpoint.
 */
export const SubmissionFiles: CollectionConfig = {
  slug: 'submission-files',
  labels: {
    singular: { fr: 'Pièce jointe reçue', en: 'Received attachment' },
    plural: { fr: 'Pièces jointes reçues', en: 'Received attachments' },
  },
  admin: { group: { fr: 'Demandes reçues', en: 'Inbox' } },
  access: {
    read: adminsOnly,
    create: nobody,
    update: nobody,
    delete: adminsOnly,
  },
  upload: {
    staticDir: process.env.PRIVATE_UPLOADS_DIR || 'uploads/private',
    mimeTypes: [...SUBMISSION_FILE_TYPES],
    disableLocalStorage: false,
  },
  fields: [],
  hooks: auditHooks,
}
