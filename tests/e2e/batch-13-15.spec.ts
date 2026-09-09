import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  const review = locale === 'en' ? 'Review details' : 'Angaben prüfen';
  for (const model of ['review-round-black', 'nfc-001-google', 'review-stand-white']) {
    test(`${locale}: selected ${model} needs only remaining choices`, async ({ page }) => {
      await page.goto(`${prefix}/reviews?category=reviews&model=${model}#inquiry`);
      await expect(page.getByTestId('inquiry-model')).toBeVisible();
      await expect(page.locator(model === 'review-round-black' ? '[name=size]' : '[name=quantity]')).toBeFocused();
      if (model === 'review-round-black') await page.locator('[name=size]').selectOption('80');
      await expect(page.locator('[name=product]')).toHaveCount(0);
      await expect(page.locator('[name=shape]')).toHaveCount(0);
      await page.locator('[name=quantity]').fill('2');
      await page.locator('[name=setup]').selectOption('needs-setup');
      await page.locator('[name=contactPerson]').fill('Private Browser Example');
      await page.getByRole('button', { name: review, exact: true }).click();
      await expect(page.locator('[data-inquiry-summary] h3')).toBeFocused();
      await expect(page.locator('[data-inquiry-summary]')).toContainText('Private Browser Example');
      expect(page.url()).not.toContain('Private');
      expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
      const email = page.getByRole('link', { name: locale === 'en' ? 'Enquire by email' : 'Per E-Mail anfragen' });
      await expect(email).toHaveAttribute('href', /Private%20Browser%20Example/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    });
  }
  test(`${locale}: adjusted model can become two personalized cards without stale model details`, async ({ page }) => {
    await page.goto(`${prefix}/reviews?category=reviews&model=review-round-black#inquiry`);
    await page.getByRole('button', { name: locale === 'en' ? 'Adjust selection' : 'Auswahl anpassen' }).click();
    await expect(page.locator('[name=destination]')).toBeFocused();
    await page.locator('[name=product]').selectOption('personalized-card');
    await expect(page.getByTestId('inquiry-model')).toHaveCount(0);
    await page.locator('[name=quantity]').fill('2');
    await page.locator('[name=shape]').selectOption('round');
    await page.locator('[name=size]').selectOption('confirm');
    await page.locator('[name=setup]').selectOption('needs-setup');
    await page.getByRole('button', { name: review, exact: true }).click();
    await expect(page.locator('[data-inquiry-summary]')).toContainText('CHF 100');
    expect(page.url()).not.toContain('model=');
  });
  test(`${locale}: offers explain maintenance and work previews appear early`, async ({ page }) => {
    await page.goto(`${prefix}/websites`);
    await expect(page.getByRole('heading', { name: locale === 'en' ? 'How will you update your content?' : 'Wie ändern Sie später Ihre Inhalte?' })).toBeVisible();
    await expect(page.getByText(locale === 'en' ? /The quote specifies whether/ : /Ob und welche Lösung umgesetzt wird/)).toBeVisible();
    await page.goto(`${prefix}/work`);
    const image = page.locator('main img').first();
    await expect(image).toBeVisible();
    const box = await image.boundingBox();
    expect(box!.y).toBeLessThan(page.viewportSize()!.height);
    for (const slug of ['falkenried', 'cafe-vogel', 'steiner-handwerk', 'salon-lumiere']) {
      await page.goto(`${prefix}/work/${slug}`);
      await expect(page.getByRole('heading', { name: locale === 'en' ? 'Implemented in the concept' : 'Im Konzept umgesetzt' })).toBeVisible();
      await expect(page.getByRole('heading', { name: locale === 'en' ? 'Scope of this case study' : 'Rahmen der Fallstudie' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  });
}
