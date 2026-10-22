import fs from 'node:fs'
import type { FullConfig } from '@playwright/test'
import { readState, STATE_FILE } from './fixtures'

/** Removes every record created by the E2E run. */
export default async function globalTeardown(config: FullConfig) {
  if (!fs.existsSync(STATE_FILE)) return
  const base = config.projects[0]?.use.baseURL ?? 'http://localhost:3000'
  const s = readState()
  const headers = { Origin: base, Authorization: `JWT ${s.superToken}` }
  const del = (p: string) =>
    fetch(`${base}${p}`, { method: 'DELETE', headers }).catch(() => undefined)
  if (s.publication) {
    await del(`/api/publications/${s.publication.id}`)
    await del(`/api/documents/${s.publication.documentId}`)
  }
  await del(`/api/users/${s.editor.id}`)
  await del(`/api/users/${s.contributor.id}`)
  // Test submissions are identifiable by their e2e email domain.
  for (const c of ['contact-submissions', 'partnership-requests', 'newsletter-subscriptions']) {
    await del(`/api/${c}?where[email][like]=e2e.test`)
  }
  await del(`/api/news?where[slug][like]=e2e-`)
  await del(`/api/publications?where[slug][like]=e2e-rapport`)
  await del(`/api/documents?where[title][equals]=Rapport de test E2E`)
  await del(`/api/users?where[email][like]=e2e-`)
  fs.rmSync(STATE_FILE)
}
