import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  test(`${locale}: prices ascend and mobile enquiry prioritizes required choices`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${prefix}/reviews?category=reviews&model=review-round-black#inquiry`);
    const prices = page.locator('[class*="pricingBlock"] [class*="tierName"]');
    await expect(prices).toHaveText([locale === 'de' ? 'NFC-Sticker' : 'NFC sticker', 'Standard Card', 'Personalized Card', 'Fully Customized Card']);
    const model = page.getByTestId('inquiry-model');
    await expect(model.getByRole('img')).toBeVisible();
    const details = model.locator('details');
    await expect(details).not.toHaveAttribute('open');
    await details.locator('summary').click();
    await expect(details.locator('dl')).toBeVisible();
    await details.locator('summary').click();
    const setup = page.locator('[name=setup]');
    expect(await setup.evaluate(el => Boolean(el.compareDocumentPosition(document.querySelector('[name=businessName]')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    await page.locator('[name=quantity]').fill('2');
    await expect(page.getByTestId('inquiry-total')).toContainText('CHF 80');
    const action = page.getByRole('button', { name: locale === 'de' ? 'Angaben prüfen' : 'Review details', exact: true });
    expect((await action.boundingBox())!.width).toBeGreaterThan(300);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      for (const control of await page.locator('form input, form select, form button, form summary').all()) {
        expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
    }
    await page.locator('[name=size]').selectOption('80');
    await setup.selectOption('needs-setup');
    await action.click();
    await expect(page.locator('[data-inquiry-summary]')).toBeVisible();
    await expect(page.getByTestId('inquiry-total')).toContainText('CHF 80');
  });
}
