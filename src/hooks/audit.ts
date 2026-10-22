import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

export type AuditAction =
  | 'create'
  | 'update'
  | 'publish'
  | 'unpublish'
  | 'delete'
  | 'login'
  | 'logout'
  | 'login-failed'
  | 'form-submission'

type AuditEntry = {
  action: AuditAction
  entity: string
  entityId?: string | number
  summary?: string
}

/** Best-effort IP hint for audit purposes (stored truncated, never shown publicly). */
function clientIp(req: PayloadRequest): string | undefined {
  const fwd = req.headers?.get?.('x-forwarded-for')
  const ip = fwd?.split(',')[0]?.trim() || req.headers?.get?.('x-real-ip') || undefined
  if (!ip) return undefined
  // Anonymise: keep network part only.
  if (ip.includes('.')) return ip.split('.').slice(0, 3).join('.') + '.0'
  return ip.split(':').slice(0, 3).join(':') + '::'
}

export async function writeAudit(req: PayloadRequest, entry: AuditEntry): Promise<void> {
  try {
    const user = req.user
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId !== undefined ? String(entry.entityId) : undefined,
        summary: entry.summary?.slice(0, 500),
        user: user && user.collection === 'users' ? user.id : undefined,
        userEmail: user && 'email' in user ? String(user.email) : undefined,
        ipNetwork: clientIp(req),
      },
      overrideAccess: true,
      req,
    })
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'Audit log write failed' })
  }
}

function titleOf(doc: Record<string, unknown>): string | undefined {
  for (const key of ['title', 'name', 'label', 'email', 'question', 'filename']) {
    const value = doc[key]
    if (typeof value === 'string' && value) return value
  }
  return undefined
}

export const auditAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
  collection,
}) => {
  if (req.context?.skipAudit) return doc
  let action: AuditAction = operation === 'create' ? 'create' : 'update'
  const status = (doc as { _status?: string })._status
  const prevStatus = (previousDoc as { _status?: string } | undefined)?._status
  if (status === 'published' && prevStatus !== 'published') action = 'publish'
  if (status === 'draft' && prevStatus === 'published') action = 'unpublish'
  await writeAudit(req, {
    action,
    entity: collection.slug,
    entityId: doc.id,
    summary: titleOf(doc),
  })
  return doc
}

export const auditAfterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  await writeAudit(req, {
    action: 'delete',
    entity: collection.slug,
    entityId: doc.id,
    summary: titleOf(doc),
  })
  return doc
}

export const auditGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  if (req.context?.skipAudit) return doc
  await writeAudit(req, { action: 'update', entity: `global:${global.slug}` })
  return doc
}

export const auditHooks = {
  afterChange: [auditAfterChange],
  afterDelete: [auditAfterDelete],
}
