import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

export const ROLES = ['superadmin', 'admin', 'editor', 'contributor'] as const
export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, { fr: string; en: string }> = {
  superadmin: { fr: 'Super administrateur', en: 'Super administrator' },
  admin: { fr: 'Administrateur', en: 'Administrator' },
  editor: { fr: 'Éditeur', en: 'Editor' },
  contributor: { fr: 'Contributeur', en: 'Contributor' },
}

type MaybeUser = PayloadRequest['user'] | null | undefined

export function getRole(user: MaybeUser): Role | null {
  if (!user || user.collection !== 'users') return null
  const role = (user as { role?: unknown }).role
  return typeof role === 'string' && (ROLES as readonly string[]).includes(role)
    ? (role as Role)
    : null
}

export function hasRole(user: MaybeUser, ...roles: Role[]): boolean {
  const role = getRole(user)
  return role !== null && roles.includes(role)
}

export const isSuperAdmin = (user: MaybeUser) => hasRole(user, 'superadmin')
export const isAdminOrAbove = (user: MaybeUser) => hasRole(user, 'superadmin', 'admin')
export const isEditorOrAbove = (user: MaybeUser) => hasRole(user, 'superadmin', 'admin', 'editor')
export const isStaff = (user: MaybeUser) => getRole(user) !== null

/* ---------- Collection-level access ---------- */

export const anyone: Access = () => true
export const nobody: Access = () => false
export const staffOnly: Access = ({ req }) => isStaff(req.user)
export const editorsOnly: Access = ({ req }) => isEditorOrAbove(req.user)
export const adminsOnly: Access = ({ req }) => isAdminOrAbove(req.user)
export const superAdminsOnly: Access = ({ req }) => isSuperAdmin(req.user)

/** Public visitors only see published documents; staff see drafts too. */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req.user)) return true
  const where: Where = { _status: { equals: 'published' } }
  return where
}

/** Public visitors only see published documents of non-draft collections flagged `published`. */
export const visibleOrStaff: Access = ({ req }) => {
  if (isStaff(req.user)) return true
  const where: Where = { published: { equals: true } }
  return where
}

/**
 * Editors and above can update any document.
 * Contributors can only update their own documents that have never been published.
 */
export const contentUpdate: Access = ({ req }) => {
  if (isEditorOrAbove(req.user)) return true
  if (hasRole(req.user, 'contributor') && req.user) {
    const where: Where = {
      and: [{ createdBy: { equals: req.user.id } }, { _status: { not_equals: 'published' } }],
    }
    return where
  }
  return false
}

/* ---------- Field-level access ---------- */

export const fieldEditorsOnly: FieldAccess = ({ req }) => isEditorOrAbove(req.user)
export const fieldAdminsOnly: FieldAccess = ({ req }) => isAdminOrAbove(req.user)
export const fieldSuperAdminsOnly: FieldAccess = ({ req }) => isSuperAdmin(req.user)
