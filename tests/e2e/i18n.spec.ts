import { expect, test } from '@playwright/test'

test.describe('bilingualism', () => {
  test('switching language keeps the current page', async ({ page }) => {
    await page.goto('/fr/projets/saagdo')
    await page
      .getByRole('link', { name: /Passer en English/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/en\/projects\/saagdo$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('link', { name: /Switch to Français/ }).first()).toBeVisible()
  })

  test('localised URLs map to the same content', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.locator('h1')).toBeVisible()
    await page.goto('/en/focus-areas')
    await expect(page.getByRole('heading', { level: 1, name: 'Focus areas' })).toBeVisible()
  })

  test('flags unvalidated English translations', async ({ page }) => {
    await page.goto('/en')
    await expect(page.getByText('The French version prevails')).toBeVisible()
  })

  test('root redirects to a locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/(fr|en)$/)
  })
})
