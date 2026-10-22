import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PAGES = [
  '/fr',
  '/fr/saagdo',
  '/fr/projets',
  '/fr/projets/saagdo',
  '/fr/contact',
  '/fr/partenaires',
  '/fr/actualites',
  '/en/about',
]

test.describe('accessibility (axe, WCAG 2.2 A/AA)', () => {
  for (const path of PAGES) {
    test(`${path} has no serious or critical violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .exclude('.leaflet-container')
        .analyze()
      const blocking = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      )
      expect(
        blocking.map(
          (v) =>
            `${v.id}: ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(' '))
              .join(' | ')}`,
        ),
      ).toEqual([])
    })
  }

  test('keyboard users can skip to content', async ({ page }) => {
    await page.goto('/fr')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Aller au contenu principal' })
    await expect(skip).toBeFocused()
    await skip.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })
})
