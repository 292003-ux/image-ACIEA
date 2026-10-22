import { APIError, type CollectionConfig, type FieldAccess } from 'payload'
import {
  ROLE_LABELS,
  ROLES,
  adminsOnly,
  getRole,
  isAdminOrAbove,
  isSuperAdmin,
  type Role,
} from '@/access/roles'
import { auditAfterChange, auditAfterDelete, writeAudit } from '@/hooks/audit'

const ROLE_RANK: Record<Role, number> = { superadmin: 3, admin: 2, editor: 1, contributor: 0 }

/** Only admins can change roles, and nobody can grant a role above their own. */
const canSetRole: FieldAccess = ({ req }) => isAdminOrAbove(req.user)

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Compte administrateur', en: 'Admin account' },
    plural: { fr: 'Comptes administrateurs', en: 'Admin accounts' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    group: { fr: 'Administration', en: 'Administration' },
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    useSessions: true,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  access: {
    // Staff can read the team list (for authorship); only admins manage accounts.
    read: ({ req }) => {
      if (isAdminOrAbove(req.user)) return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    create: adminsOnly,
    update: ({ req }) => {
      if (isAdminOrAbove(req.user)) return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    delete: adminsOnly,
    admin: ({ req }) => getRole(req.user) !== null,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: { fr: 'Nom complet', en: 'Full name' } },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'contributor',
      saveToJWT: true,
      label: { fr: 'Rôle', en: 'Role' },
      options: ROLES.map((value) => ({ value, label: ROLE_LABELS[value] })),
      access: { update: canSetRole, create: canSetRole },
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        const actor = getRole(req.user)
        // Local API calls without a user (seed scripts, CLI) are trusted.
        if (!req.user) return data
        const target = data.role as Role | undefined
        if (target && actor && ROLE_RANK[target] > ROLE_RANK[actor]) {
          throw new APIError('Vous ne pouvez pas attribuer un rôle supérieur au vôtre.', 403, undefined, true)
        }
        // Admins cannot modify super administrators.
        if (operation === 'update' && originalDoc?.role === 'superadmin' && !isSuperAdmin(req.user)) {
          throw new APIError('Seul un super administrateur peut modifier ce compte.', 403, undefined, true)
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        if (!req.user) return
        if (req.user.id === id) {
          throw new APIError('Vous ne pouvez pas supprimer votre propre compte.', 403, undefined, true)
        }
        const target = await req.payload.findByID({ collection: 'users', id, depth: 0, req })
        if (target.role === 'superadmin' && !isSuperAdmin(req.user)) {
          throw new APIError('Seul un super administrateur peut supprimer ce compte.', 403, undefined, true)
        }
      },
    ],
    afterChange: [auditAfterChange],
    afterDelete: [auditAfterDelete],
    afterLogin: [
      async ({ req, user }) => {
        await writeAudit({ ...req, user: { ...user, collection: 'users' } } as typeof req, {
          action: 'login',
          entity: 'users',
          entityId: user.id,
          summary: String(user.email),
        })
      },
    ],
    afterLogout: [
      async ({ req }) => {
        await writeAudit(req, { action: 'logout', entity: 'users', entityId: req.user?.id })
      },
    ],
  },
}
