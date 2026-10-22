import { expect, test } from '@playwright/test'

test.describe('projects catalogue', () => {
  test('search narrows results', async ({ page }) => {
    await page.goto('/fr/projets')
    await page.getByPlaceholder('Rechercher un projet…').fill('SAAGDO')
    await expect(page).toHaveURL(/q=SAAGDO/)
    await expect(page.getByRole('heading', { level: 3, name: /SAAGDO/ })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /Camp Vacances/ })).toHaveCount(0)
  })

  test('status filter works', async ({ page }) => {
    await page.goto('/fr/projets')
    await page.getByLabel('Statut').selectOption('completed')
    await expect(page).toHaveURL(/status=completed/)
    await expect(page.getByRole('heading', { level: 3, name: /Camp Vacances/ })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /SAAGDO/ })).toHaveCount(0)
  })

  test('domain filter works', async ({ page }) => {
    await page.goto('/fr/projets')
    await page.getByLabel('Domaine').selectOption('eau-assainissement')
    await expect(page).toHaveURL(/domain=eau-assainissement/)
    await expect(page.getByRole('heading', { level: 3, name: /SAAGDO/ })).toBeVisible()
  })

  test('opens a project sheet', async ({ page }) => {
    await page.goto('/fr/projets')
    await page
      .getByRole('link', { name: /Camp Vacances Éco-Citoyen 2025/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/fr\/projets\/camp-vacances-eco-citoyen-komsilga-2025$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Camp Vacances Éco-Citoyen 2025/,
    )
    await expect(page.getByRole('heading', { name: 'Réalisations' })).toBeVisible()
    await expect(page.getByText('Fiche d’identité')).toBeVisible()
  })

  test('the map renders without third-party tiles', async ({ page }) => {
    const external: string[] = []
    page.on('request', (r) => {
      const u = new URL(r.url())
      if (!['localhost', '127.0.0.1'].includes(u.hostname)) external.push(r.url())
    })
    await page.goto('/fr/projets')
    await page.locator('#map-title').scrollIntoViewIfNeeded()
    await expect(page.locator('.leaflet-container')).toBeVisible()
    await expect(page.locator('.leaflet-interactive').first()).toBeVisible()
    expect(external).toEqual([])
  })

  test('unpublished project templates are not public', async ({ page }) => {
    const res = await page.goto('/fr/projets/modele-fiche-projet')
    expect(res?.status()).toBe(404)
  })
})
