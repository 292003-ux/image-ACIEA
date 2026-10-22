import { APIError, type CollectionBeforeChangeHook } from 'payload'
import { hasRole } from '@/access/roles'

/** Stores the author of a document on creation (used by contributor permissions). */
export const setCreatedBy: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && req.user && req.user.collection === 'users') {
    return { ...data, createdBy: req.user.id }
  }
  return data
}

/**
 * Contributors may write drafts but never publish.
 * Enforced on the server for every write path (admin UI, REST, local API with a user).
 */
export const preventContributorPublish: CollectionBeforeChangeHook = ({ data, req }) => {
  if (hasRole(req.user, 'contributor') && data?._status === 'published') {
    throw new APIError(
      'Les contributeurs ne peuvent pas publier. Soumettez le contenu à la relecture.',
      403,
      undefined,
      true,
    )
  }
  return data
}

export const editorialHooks = [setCreatedBy, preventContributorPublish]
