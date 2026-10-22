import { expect, test } from '@playwright/test'

const PAGES_FR = [
  '/fr',
  '/fr/a-propos',
  '/fr/a-propos/notre-histoire',
  '/fr/a-propos/mission-vision-valeurs',
  '/fr/a-propos/gouvernance',
  '/fr/a-propos/equipe',
  '/fr/domaines-intervention',
  '/fr/projets',
  '/fr/projets/en-cours',
  '/fr/projets/acheves',
  '/fr/saagdo',
  '/fr/actualites',
  '/fr/evenements',
  '/fr/publications',
  '/fr/publications/rapports-et-documents',
  '/fr/galerie',
  '/fr/partenaires',
  '/fr/partenaires/devenir-partenaire',
  '/fr/rejoindre-aciea',
  '/fr/contact',
  '/fr/recherche',
  '/fr/mentions-legales',
  '/fr/politique-de-confidentialite',
  '/fr/conditions-utilisation',
]

test.describe('navigation', () => {
  for (const path of PAGES_FR) {
    test(`renders ${path}`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1').first()).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
      // One single h1 per page.
      expect(await page.locator('h1').count()).toBe(1)
    })
  }

  test('main navigation links lead to working pages', async ({ page }) => {
    await page.goto('/fr')
    const nav = page.getByRole('navigation', { name: 'Navigation principale' })
    await nav.getByRole('link', { name: 'SAAGDO' }).click()
    await expect(page).toHaveURL(/\/fr\/saagdo$/)
    await page
      .getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('link', { name: 'À propos' })
      .click()
    await expect(page).toHaveURL(/\/fr\/a-propos$/)
    await page
      .getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: /Nos actions/ })
      .click()
    await page
      .getByRole('link', { name: /Domaines d’intervention/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/fr\/domaines-intervention$/)
  })

  test('returns a real 404 with a branded page', async ({ page }) => {
    const res = await page.goto('/fr/cette-page-nexiste-pas')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible()
  })

  test('exposes SEO essentials', async ({ page, request }) => {
    await page.goto('/fr/saagdo')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/fr\/saagdo$/)
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      /\/en\/saagdo$/,
    )
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBeTruthy()
    expect(await sitemap.text()).toContain('/fr/projets/saagdo')
    const robots = await request.get('/robots.txt')
    expect(await robots.text()).toContain('Disallow: /admin')
  })

  test('sends security headers', async ({ request }) => {
    const res = await request.get('/fr')
    const h = res.headers()
    expect(h['content-security-policy']).toContain("frame-ancestors 'none'")
    expect(h['x-content-type-options']).toBe('nosniff')
    expect(h['referrer-policy']).toBeTruthy()
    expect(h['x-powered-by']).toBeUndefined()
  })
})
