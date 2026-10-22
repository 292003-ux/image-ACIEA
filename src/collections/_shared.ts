import type { CollectionConfig } from 'payload'
import { contentUpdate, editorsOnly, publishedOrStaff, staffOnly } from '@/access/roles'
import { auditAfterChange, auditAfterDelete } from '@/hooks/audit'
import { editorialHooks } from '@/hooks/editorial'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

/** Shared settings for editorial collections with drafts, review workflow and audit trail. */
export const editorialCollection = {
  access: {
    read: publishedOrStaff,
    create: staffOnly,
    update: contentUpdate,
    delete: editorsOnly,
    readVersions: staffOnly,
  },
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
    maxPerDoc: 30,
  },
  hooks: {
    beforeChange: editorialHooks,
    afterChange: [auditAfterChange, revalidateAfterChange],
    afterDelete: [auditAfterDelete, revalidateAfterDelete],
  },
} satisfies Partial<CollectionConfig>

export const contentGroup = { fr: 'Contenus', en: 'Content' }
export const institutionGroup = { fr: 'Institution', en: 'Organisation' }
export const inboxGroup = { fr: 'Demandes reçues', en: 'Inbox' }
