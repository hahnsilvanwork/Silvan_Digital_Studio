import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) {
  const path = `${locale === 'en' ? '/en' : ''}/reviews`;
  test(`${locale}: compact mobile catalogue expands and a model opens the enquiry`, async ({ page }) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto(path);
    // Reduced motion omits the motion-ready marker; wait for client scripts
    // before clicking a control already present in the server-rendered HTML.
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-product-card]')).toHaveCount(3);
    await expect(page.locator('[data-inquiry-disclosure]')).not.toHaveAttribute('open');
    await page.getByRole('button', {name: locale === 'de' ? 'Alle 7 ausgewählten Modelle anzeigen' : 'Show all 7 selected models'}).click();
    await expect(page.locator('[data-product-card]')).toHaveCount(7);
    await page.locator('a[href*="model=review-round-black#"]').first().click();
    await expect(page.locator('[data-inquiry-disclosure]')).toHaveAttribute('open');
    await expect(page.locator('[name=size]')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });
  test(`${locale}: product images select a model, prefill and recalculate its price`, async ({ page }) => {
    await page.goto(path);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const card = page.locator('[data-product-card]').filter({ has: page.locator('a[href*="model=review-round-black#"]') });
    await card.locator('a').filter({ has: page.locator('img') }).click();
    await expect(page).toHaveURL(/model=review-round-black#inquiry$/);
    await expect(page.getByTestId('inquiry-model').getByRole('img')).toBeVisible();
    await expect(page.locator('[name=size]')).toBeFocused();
    await expect(page.locator('[name=product]')).toHaveCount(0);
    await page.locator('[name=size]').selectOption('100');
    await page.locator('[name=quantity]').fill('3');
    await expect(page.getByTestId('inquiry-total')).toContainText('CHF 100');
    await page.locator('[name=contactPerson]').fill('Private Visitor');
    await page.locator('[name=setup]').selectOption('needs-setup');
    await page.getByRole('button', { name: locale === 'de' ? 'Anfrage prüfen' : 'Review your enquiry', exact: true }).click();
    await expect(page.getByTestId('inquiry-total')).toContainText('CHF 100');
    const email = page.locator('[data-inquiry-summary] a[href^="mailto:"]');
    const mailText = decodeURIComponent((await email.getAttribute('href'))!);
    expect(mailText).toContain('CHF 100');
    expect(mailText).toContain('Private Visitor');
    expect(page.url()).not.toContain('Private');
    // Re-requesting the same model reopens the form, preserving the user's values.
    await card.locator('a').filter({ has: page.locator('img') }).click();
    await expect(page.locator('[name=quantity]')).toHaveValue('3');
    await expect(page.locator('[name=contactPerson]')).toHaveValue('Private Visitor');
    await expect(page.locator('[name=size]')).toBeFocused();
  });

  test(`${locale}: free choices suggest real models and keep destination and private details`, async ({ page }) => {
    await page.goto(path);
    await page.locator('[data-inquiry-disclosure] > summary').click();
    await page.locator('[name=destination]').selectOption('menu');
    await page.locator('[name=product]').selectOption('nfc-chip');
    await page.locator('[name=quantity]').fill('11');
    await page.locator('[name=note]').fill('Preserve this note');
    const suggestion = page.getByTestId('inquiry-suggestions').getByRole('button');
    await suggestion.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[name=destination]')).toHaveValue('menu');
    await expect(page.locator('[name=note]')).toHaveValue('Preserve this note');
    await expect(page.getByTestId('inquiry-total')).toContainText('CHF 70');
    await expect(page.getByTestId('inquiry-total')).toContainText(locale === 'de' ? 'Mengenrabatt' : 'quantity discount');
    await expect(page.locator('[name=destination]')).toBeFocused();
    await page.setViewportSize({ width: 320, height: 568 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
  });

  test(`${locale}: every approved card price follows piece quantities`, async ({ page }) => {
    await page.goto(`${path}#inquiry`);
    for (const [product, expected] of [['standard-card','100'], ['personalized-card','125'], ['fully-custom-card','180'], ['nfc-chip','30']]) {
      await page.locator('[name=product]').selectOption(product);
      await page.locator('[name=quantity]').fill('3');
      await expect(page.getByTestId('inquiry-total')).toContainText(`CHF ${expected}`);
    }
    await expect(page.locator('[name=product] option[value=standard-pair]')).toHaveCount(0);
  });
}
