import { expect, test } from '@playwright/test'

test.describe('mobile', () => {
  test('hamburger menu opens and navigates', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: /Projets & Impact/ }).click()
    await dialog.getByRole('link', { name: 'Projets achevés' }).click()
    await expect(page).toHaveURL(/\/fr\/projets\/acheves$/)
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })

  test('menu is keyboard-closable', async ({ page }) => {
    await page.goto('/fr')
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })
})

const WIDTHS = [320, 375, 430, 768, 1024, 1440, 1920]
const PAGES = ['/fr', '/fr/saagdo', '/fr/projets', '/fr/contact', '/fr/partenaires']

for (const width of WIDTHS) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const path of PAGES) {
      await page.goto(path)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `${path} @ ${width}px`).toBeLessThanOrEqual(0)
    }
  })
}
