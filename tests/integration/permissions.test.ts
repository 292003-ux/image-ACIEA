import { beforeAll, describe, expect, it } from 'vitest'
import { makeUser, payload } from './helpers'

const domainData = (title: string) => ({
  title,
  summary: 'Résumé de test',
  slug: `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
})

describe('editorial permissions (server-side)', () => {
  let contributor: Awaited<ReturnType<typeof makeUser>>
  let editor: Awaited<ReturnType<typeof makeUser>>
  let admin: Awaited<ReturnType<typeof makeUser>>
  let superadmin: Awaited<ReturnType<typeof makeUser>>

  beforeAll(async () => {
    contributor = await makeUser('contributor')
    editor = await makeUser('editor')
    admin = await makeUser('admin')
    superadmin = await makeUser('superadmin')
  })

  it('lets a contributor create a draft but never publish it', async () => {
    const p = await payload()
    const draft = await p.create({
      collection: 'domains',
      data: { ...domainData('Brouillon contributeur'), _status: 'draft' },
      draft: true,
      user: contributor,
      overrideAccess: false,
    })
    expect(draft._status).toBe('draft')
    expect(typeof draft.createdBy === 'object' ? draft.createdBy?.id : draft.createdBy).toBe(
      contributor.id,
    )

    await expect(
      p.update({
        collection: 'domains',
        id: draft.id,
        data: { _status: 'published' },
        user: contributor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('prevents a contributor from editing someone else’s document', async () => {
    const p = await payload()
    const other = await p.create({
      collection: 'domains',
      data: { ...domainData('Document éditeur'), _status: 'draft' },
      draft: true,
      user: editor,
      overrideAccess: false,
    })
    await expect(
      p.update({
        collection: 'domains',
        id: other.id,
        data: { title: 'Piraté' },
        user: contributor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('lets an editor publish', async () => {
    const p = await payload()
    const doc = await p.create({
      collection: 'domains',
      data: { ...domainData('Publié par éditeur'), _status: 'published' },
      user: editor,
      overrideAccess: false,
    })
    expect(doc._status).toBe('published')
  })

  it('records publications in the audit log', async () => {
    const p = await payload()
    const doc = await p.create({
      collection: 'domains',
      data: { ...domainData('Audité'), _status: 'published' },
      user: editor,
      overrideAccess: false,
    })
    const logs = await p.find({
      collection: 'audit-logs',
      where: { and: [{ entity: { equals: 'domains' } }, { entityId: { equals: String(doc.id) } }] },
    })
    expect(logs.docs.some((l) => l.action === 'publish' || l.action === 'create')).toBe(true)
  })

  it('forbids contributors from deleting content', async () => {
    const p = await payload()
    const doc = await p.create({
      collection: 'domains',
      data: { ...domainData('À ne pas supprimer'), _status: 'draft' },
      draft: true,
      user: contributor,
      overrideAccess: false,
    })
    await expect(
      p.delete({ collection: 'domains', id: doc.id, user: contributor, overrideAccess: false }),
    ).rejects.toThrow()
  })

  it('hides drafts from anonymous visitors', async () => {
    const p = await payload()
    const doc = await p.create({
      collection: 'domains',
      data: { ...domainData('Invisible'), _status: 'draft' },
      draft: true,
      user: editor,
      overrideAccess: false,
    })
    const res = await p.find({
      collection: 'domains',
      where: { id: { equals: doc.id } },
      overrideAccess: false,
    })
    expect(res.docs).toHaveLength(0)
  })

  it('keeps form submissions private', async () => {
    const p = await payload()
    await p.create({
      collection: 'contact-submissions',
      data: {
        name: 'Test',
        email: 't@test.local',
        subject: 'general',
        message: 'Message de test suffisamment long.',
      },
      overrideAccess: true,
    })
    await expect(
      p.find({ collection: 'contact-submissions', overrideAccess: false }),
    ).rejects.toThrow()
    await expect(
      p.find({ collection: 'contact-submissions', user: editor, overrideAccess: false }),
    ).rejects.toThrow()
    const asAdmin = await p.find({
      collection: 'contact-submissions',
      user: admin,
      overrideAccess: false,
    })
    expect(asAdmin.totalDocs).toBeGreaterThan(0)
    await expect(
      p.create({
        collection: 'contact-submissions',
        data: {
          name: 'Spam',
          email: 's@test.local',
          subject: 'general',
          message: 'Création directe via API publique.',
        },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('makes the audit log append-only', async () => {
    const p = await payload()
    const log = await p.find({ collection: 'audit-logs', limit: 1 })
    const entry = log.docs[0]!
    await expect(
      p.update({
        collection: 'audit-logs',
        id: entry.id,
        data: { summary: 'falsifié' },
        user: superadmin,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
    await expect(
      p.delete({ collection: 'audit-logs', id: entry.id, user: admin, overrideAccess: false }),
    ).rejects.toThrow()
  })
})

describe('account management', () => {
  it('prevents an admin from granting the super administrator role', async () => {
    const p = await payload()
    const admin = await makeUser('admin')
    const target = await makeUser('editor')
    await expect(
      p.update({
        collection: 'users',
        id: target.id,
        data: { role: 'superadmin' },
        user: admin,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('prevents an admin from modifying a super administrator', async () => {
    const p = await payload()
    const admin = await makeUser('admin')
    const sa = await makeUser('superadmin')
    await expect(
      p.update({
        collection: 'users',
        id: sa.id,
        data: { name: 'Renamed' },
        user: admin,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('prevents editors from changing their own role', async () => {
    const p = await payload()
    const editor = await makeUser('editor')
    const updated = await p.update({
      collection: 'users',
      id: editor.id,
      data: { role: 'admin' },
      user: editor,
      overrideAccess: false,
    })
    // Field-level access silently ignores the forbidden field.
    expect(updated.role).toBe('editor')
  })
})

describe('content integrity rules', () => {
  it('refuses to publish an impact metric without verification metadata', async () => {
    const p = await payload()
    const editor = await makeUser('editor')
    await expect(
      p.create({
        collection: 'impact-metrics',
        data: { label: 'Bénéficiaires', value: 1000, _status: 'published' },
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('refuses to publish a testimonial without consent', async () => {
    const p = await payload()
    const editor = await makeUser('editor')
    await expect(
      p.create({
        collection: 'testimonials',
        data: { quote: 'Super', authorName: 'X', consentObtained: false, _status: 'published' },
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('requires a source for financial partners', async () => {
    const p = await payload()
    const editor = await makeUser('editor')
    await expect(
      p.create({
        collection: 'partners',
        data: {
          name: 'Bailleur X',
          category: 'financial',
          slug: `bailleur-${Date.now()}`,
          _status: 'published',
        },
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
