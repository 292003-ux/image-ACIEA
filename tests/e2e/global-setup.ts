import fs from 'node:fs'
import path from 'node:path'
import type { FullConfig } from '@playwright/test'
import { ADMIN, type E2EState, STATE_FILE, tinyPdf } from './fixtures'

/**
 * Creates the accounts and the downloadable publication the scenarios need,
 * through the real REST API (with CSRF-compliant Origin header).
 */
export default async function globalSetup(config: FullConfig) {
  const base = config.projects[0]?.use.baseURL ?? 'http://localhost:3000'
  const headers = { 'Content-Type': 'application/json', Origin: base }

  const login = await fetch(`${base}/api/users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(ADMIN),
  })
  if (!login.ok)
    throw new Error(
      `Admin login failed (${login.status}). Run "pnpm seed" with SEED_ADMIN_* first.`,
    )
  const { token } = (await login.json()) as { token: string }
  const auth = { ...headers, Authorization: `JWT ${token}` }

  const mkUser = async (role: 'editor' | 'contributor') => {
    const email = `e2e-${role}-${Date.now()}@test.local`
    const password = 'E2e-Password-123!'
    const res = await fetch(`${base}/api/users`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({ email, password, name: `E2E ${role}`, role }),
    })
    if (!res.ok) throw new Error(`Cannot create ${role}: ${await res.text()}`)
    const { doc } = (await res.json()) as { doc: { id: number } }
    return { id: doc.id, email, password }
  }

  // Publication with a real file to test downloads.
  const form = new FormData()
  form.append(
    'file',
    new Blob([new Uint8Array(tinyPdf())], { type: 'application/pdf' }),
    'e2e-rapport.pdf',
  )
  form.append('_payload', JSON.stringify({ title: 'Rapport de test E2E' }))
  const up = await fetch(`${base}/api/documents`, {
    method: 'POST',
    headers: { Origin: base, Authorization: `JWT ${token}` },
    body: form,
  })
  if (!up.ok) throw new Error(`Upload failed: ${await up.text()}`)
  const { doc: document } = (await up.json()) as { doc: { id: number } }
  const slug = `e2e-rapport-${Date.now()}`
  const pub = await fetch(`${base}/api/publications`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      title: 'Rapport de test E2E',
      slug,
      type: 'report',
      description: 'Publication temporaire créée par les tests end-to-end.',
      publishedAt: new Date().toISOString(),
      file: document.id,
      _status: 'published',
    }),
  })
  if (!pub.ok) throw new Error(`Publication failed: ${await pub.text()}`)
  const { doc: publication } = (await pub.json()) as { doc: { id: number } }

  const state: E2EState = {
    superToken: token,
    editor: await mkUser('editor'),
    contributor: await mkUser('contributor'),
    publication: { id: publication.id, slug, documentId: document.id },
  }
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true })
  fs.writeFileSync(STATE_FILE, JSON.stringify(state))
}
