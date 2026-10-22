import { expect, test } from '@playwright/test'
import { ADMIN, readState } from './fixtures'

const ORIGIN = { Origin: process.env.E2E_BASE_URL || 'http://localhost:3000' }

async function tokenFor(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  password: string,
) {
  const res = await request.post('/api/users/login', { data: { email, password }, headers: ORIGIN })
  expect(res.ok()).toBeTruthy()
  return (await res.json()).token as string
}

test.describe('administration', () => {
  test('admin login through the interface', async ({ page }) => {
    await page.goto('/admin/login')
    await page.getByLabel(/Email|E-mail/i).fill(ADMIN.email)
    await page.getByLabel(/Mot de passe|Password/i).fill(ADMIN.password)
    await page.getByRole('button', { name: /Connexion|Se connecter|Login/i }).click()
    await expect(page).toHaveURL(/\/admin(\/)?$/)
    await expect(page.getByText(/Projets|Projects/).first()).toBeVisible()
  })

  test('contributor drafts, editor publishes', async ({ request }) => {
    const { contributor, editor } = readState()
    const cToken = await tokenFor(request, contributor.email, contributor.password)
    const slug = `e2e-actualite-${Date.now()}`
    const draft = await request.post('/api/news?draft=true', {
      headers: { ...ORIGIN, Authorization: `JWT ${cToken}` },
      data: {
        title: 'Brouillon E2E',
        excerpt: 'Résumé',
        slug,
        category: 'institutional',
        publishedAt: new Date().toISOString(),
        _status: 'draft',
      },
    })
    expect(draft.ok()).toBeTruthy()
    const id = (await draft.json()).doc.id

    // Contributor cannot publish
    const forbidden = await request.patch(`/api/news/${id}`, {
      headers: { ...ORIGIN, Authorization: `JWT ${cToken}` },
      data: { _status: 'published' },
    })
    expect(forbidden.status()).toBeGreaterThanOrEqual(400)

    // Draft is not public
    expect((await request.get(`/fr/actualites/${slug}`)).status()).toBe(404)

    // Editor publishes
    const eToken = await tokenFor(request, editor.email, editor.password)
    const published = await request.patch(`/api/news/${id}`, {
      headers: { ...ORIGIN, Authorization: `JWT ${eToken}` },
      data: { _status: 'published' },
    })
    expect(published.ok()).toBeTruthy()
    expect((await request.get(`/fr/actualites/${slug}`)).status()).toBe(200)
  })

  test('anonymous and unauthorised users cannot modify content', async ({ request }) => {
    const anon = await request.patch('/api/domains/1', {
      headers: ORIGIN,
      data: { title: 'Piraté' },
    })
    expect(anon.status()).toBeGreaterThanOrEqual(400)
    const { contributor } = readState()
    const cToken = await tokenFor(request, contributor.email, contributor.password)
    const edit = await request.patch('/api/domains/1', {
      headers: { ...ORIGIN, Authorization: `JWT ${cToken}` },
      data: { title: 'Piraté' },
    })
    expect(edit.status()).toBeGreaterThanOrEqual(400)
    const settings = await request.post('/api/globals/site-settings', {
      headers: { ...ORIGIN, Authorization: `JWT ${cToken}` },
      data: { shortName: 'HACK' },
    })
    expect(settings.status()).toBeGreaterThanOrEqual(400)
    const inbox = await request.get('/api/contact-submissions', {
      headers: { ...ORIGIN, Authorization: `JWT ${cToken}` },
    })
    expect(inbox.status()).toBeGreaterThanOrEqual(400)
  })
})
