import type { CollectionConfig } from 'payload'
import { anyone, isEditorOrAbove, staffOnly } from '@/access/roles'
import { auditHooks } from '@/hooks/audit'

/** Public documents attached to publications, projects and institutional pages. */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: { fr: 'Document', en: 'Document' },
    plural: { fr: 'Documents', en: 'Documents' },
  },
  admin: {
    group: { fr: 'Médiathèque', en: 'Library' },
    defaultColumns: ['title', 'filename', 'filesize', 'updatedAt'],
    useAsTitle: 'title',
  },
  access: {
    read: anyone,
    create: staffOnly,
    update: staffOnly,
    delete: ({ req }) => isEditorOrAbove(req.user),
  },
  upload: {
    staticDir: process.env.DOCUMENTS_DIR || 'media/documents',
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { fr: 'Titre', en: 'Title' } },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { fr: 'Description', en: 'Description' },
    },
  ],
  hooks: auditHooks,
}
