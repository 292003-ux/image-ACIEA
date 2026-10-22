import { describe, expect, it } from 'vitest'
import {
  contentUpdate,
  getRole,
  hasRole,
  isAdminOrAbove,
  isEditorOrAbove,
  publishedOrStaff,
} from '@/access/roles'

const user = (role: string) => ({ id: 7, role, collection: 'users' }) as never
const req = (u: unknown) => ({ req: { user: u } }) as never

describe('role helpers', () => {
  it('reads roles only from staff accounts', () => {
    expect(getRole(user('editor'))).toBe('editor')
    expect(getRole(user('hacker'))).toBeNull()
    expect(getRole({ id: 1, role: 'admin', collection: 'other' } as never)).toBeNull()
    expect(getRole(null)).toBeNull()
  })
  it('ranks roles', () => {
    expect(isAdminOrAbove(user('superadmin'))).toBe(true)
    expect(isAdminOrAbove(user('editor'))).toBe(false)
    expect(isEditorOrAbove(user('editor'))).toBe(true)
    expect(isEditorOrAbove(user('contributor'))).toBe(false)
    expect(hasRole(user('contributor'), 'contributor')).toBe(true)
  })
})

describe('collection access', () => {
  it('restricts anonymous visitors to published documents', () => {
    expect(publishedOrStaff(req(null))).toEqual({ _status: { equals: 'published' } })
    expect(publishedOrStaff(req(user('contributor')))).toBe(true)
  })
  it('limits contributors to their own unpublished documents', () => {
    expect(contentUpdate(req(user('editor')))).toBe(true)
    expect(contentUpdate(req(user('contributor')))).toEqual({
      and: [{ createdBy: { equals: 7 } }, { _status: { not_equals: 'published' } }],
    })
    expect(contentUpdate(req(null))).toBe(false)
  })
})
