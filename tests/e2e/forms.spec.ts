import { expect, test } from '@playwright/test'
import { readState, tinyPdf } from './fixtures'

test.describe('forms', () => {
  test('contact form validates then stores the message', async ({ page, request }) => {
    await page.goto('/fr/contact')
    const form = page.getByTestId('contact-form')
    await form.getByRole('button', { name: 'Envoyer' }).click()
    await expect(form.getByText('Ce champ est obligatoire.').first()).toBeVisible()

    await form.getByLabel('Nom').fill('Test E2E')
    await form.getByLabel('Adresse email').fill('contact@e2e.test')
    await form.getByLabel('Message').fill('Message envoyé par le test end-to-end de l’ACIEA.')
    await form.getByRole('checkbox').check()
    await page.waitForTimeout(2600) // human-like delay required by the anti-spam timer
    await form.getByRole('button', { name: 'Envoyer' }).click()
    await expect(page.getByText('votre message a bien été enregistré')).toBeVisible()

    const { superToken } = readState()
    const res = await request.get(
      '/api/contact-submissions?where[email][equals]=contact@e2e.test',
      {
        headers: { Authorization: `JWT ${superToken}` },
      },
    )
    expect((await res.json()).totalDocs).toBeGreaterThan(0)
  })

  test('honeypot submissions are rejected', async ({ page }) => {
    await page.goto('/fr/contact')
    const form = page.getByTestId('contact-form')
    await form.getByLabel('Nom').fill('Robot')
    await form.getByLabel('Adresse email').fill('bot@e2e.test')
    await form
      .getByLabel('Message')
      .fill('Je suis un robot qui remplit tous les champs du formulaire.')
    await form.getByRole('checkbox').check()
    await form
      .locator('input[name="website_url"]')
      .evaluate((el: HTMLInputElement) => (el.value = 'http://spam'))
    await page.waitForTimeout(2600)
    await form.getByRole('button', { name: 'Envoyer' }).click()
    await expect(page.getByText('Votre envoi n’a pas pu être validé')).toBeVisible()
  })

  test('partnership request with attachment', async ({ page, request }) => {
    await page.goto('/fr/partenaires/devenir-partenaire')
    const form = page.getByTestId('partnership-form')
    await form.getByLabel('Nom complet').fill('Partenaire E2E')
    await form.getByLabel('Organisation').fill('Organisation de test')
    await form.getByLabel('Fonction').fill('Directrice')
    await form.getByLabel('Email professionnel').fill('partner@e2e.test')
    await form.getByLabel('Pays').fill('Burkina Faso')
    await form.getByLabel('Type de collaboration').selectOption('technical')
    await form.getByLabel('Objet').fill('Proposition de collaboration technique')
    await form
      .getByLabel('Message')
      .fill('Nous proposons une collaboration technique autour de la gestion durable de l’eau.')
    await form
      .getByLabel('Pièce jointe')
      .setInputFiles({ name: 'presentation.pdf', mimeType: 'application/pdf', buffer: tinyPdf() })
    await form.getByRole('checkbox').check()
    await page.waitForTimeout(2600)
    await form.getByRole('button', { name: 'Envoyer' }).click()
    await expect(
      page.getByText('proposition de collaboration a bien été enregistrée'),
    ).toBeVisible()

    const { superToken } = readState()
    const res = await request.get(
      '/api/partnership-requests?where[email][equals]=partner@e2e.test&depth=1',
      {
        headers: { Authorization: `JWT ${superToken}` },
      },
    )
    const body = await res.json()
    expect(body.totalDocs).toBe(1)
    expect(body.docs[0].attachment?.mimeType).toBe('application/pdf')
    // The attachment is never publicly accessible.
    const file = await request.get(`/api/submission-files/file/${body.docs[0].attachment.filename}`)
    expect(file.status()).toBeGreaterThanOrEqual(400)
  })

  test('rejects disguised attachments client-side', async ({ page }) => {
    await page.goto('/fr/partenaires/devenir-partenaire')
    await page
      .getByTestId('partnership-form')
      .getByLabel('Pièce jointe')
      .setInputFiles({
        name: 'virus.exe',
        mimeType: 'application/octet-stream',
        buffer: Buffer.from('MZ'),
      })
    await expect(page.getByText('Format non accepté')).toBeVisible()
  })

  test('newsletter subscription', async ({ page }) => {
    await page.goto('/fr')
    const form = page.getByTestId('newsletter-form')
    await form.getByPlaceholder('Adresse email').fill(`news-${Date.now()}@e2e.test`)
    await form.getByRole('checkbox').check()
    await page.waitForTimeout(2600)
    await form.getByRole('button', { name: 'S’inscrire' }).click()
    await expect(form.getByText('votre inscription est enregistrée')).toBeVisible()
  })
})
