import { expect, test } from '@playwright/test'
import { readState } from './fixtures'

test.describe('editorial content', () => {
  test('reads a news article', async ({ page }) => {
    await page.goto('/fr/actualites')
    await page
      .getByRole('link', { name: /GWP Afrique de l’Ouest formalisent/ })
      .first()
      .click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('GWP')
    await expect(page.getByRole('link', { name: /Publication d’origine/ })).toHaveAttribute(
      'href',
      /gwpo-gwp\.org/,
    )
    const ldTypes = await page.$$eval('script[type="application/ld+json"]', (els) =>
      els.map((e) => JSON.parse(e.textContent || '{}')['@type']),
    )
    expect(ldTypes).toContain('NewsArticle')
  })

  test('lists the news without category filters', async ({ page }) => {
    await page.goto('/fr/actualites')
    await expect(page.getByRole('link', { name: /formalisent/ }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Partenariat', exact: true })).toHaveCount(0)
  })

  test('downloads an authorised publication', async ({ page }) => {
    const { publication } = readState()
    await page.goto('/fr/publications')
    const card = page
      .locator('article')
      .filter({ has: page.locator(`a[href$="/publications/${publication!.slug}"]`) })
    await expect(card).toBeVisible()
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      card.getByRole('link', { name: /Télécharger/ }).click(),
    ])
    expect(download.suggestedFilename()).toMatch(/\.pdf$/)
    await page.goto(`/fr/publications/${publication!.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: 'Rapport de test E2E' })).toBeVisible()
  })

  test('global search finds projects and news', async ({ page }) => {
    await page.goto('/fr/recherche?q=Komsilga')
    await expect(page.getByRole('heading', { name: /Projets/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Actualités/ })).toBeVisible()
  })

  test('SAAGDO page shows the real app, its features and the video', async ({ page }) => {
    await page.goto('/fr/saagdo')
    await expect(page.getByRole('heading', { name: 'Ce que permet SAAGDO' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Signaler un déchet' })).toBeVisible()
    await expect(page.locator('video')).toHaveCount(1)
    await expect(page.getByAltText(/Plateforme de gestion SAAGDO/)).toBeVisible()
    await expect(page.getByText(/fictiv/i)).toHaveCount(0)
  })
})
