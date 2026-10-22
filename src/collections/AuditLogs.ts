import type { CollectionConfig } from 'payload'
import { adminsOnly, nobody, superAdminsOnly } from '@/access/roles'

/** Append-only trail of sensitive operations. Written by server hooks only. */
export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: { fr: 'Entrée du journal', en: 'Log entry' },
    plural: { fr: 'Journal d’audit', en: 'Audit log' },
  },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'summary',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['createdAt', 'action', 'entity', 'summary', 'userEmail'],
  },
  access: {
    read: adminsOnly,
    create: nobody,
    update: nobody,
    // Retention clean-up only, by a super administrator.
    delete: superAdminsOnly,
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      required: true,
      index: true,
      options: [
        'create',
        'update',
        'publish',
        'unpublish',
        'delete',
        'login',
        'logout',
        'login-failed',
        'form-submission',
      ],
    },
    { name: 'entity', type: 'text', required: true, index: true },
    { name: 'entityId', type: 'text' },
    { name: 'summary', type: 'text' },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'userEmail', type: 'text' },
    {
      name: 'ipNetwork',
      type: 'text',
      label: { fr: 'Réseau IP (anonymisé)', en: 'IP network (anonymised)' },
    },
  ],
}
