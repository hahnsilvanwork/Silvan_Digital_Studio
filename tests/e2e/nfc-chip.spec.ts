import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) test(`adhesive chip image, 3D and tiered enquiry in ${locale}`, async ({page}) => {
  await page.goto(`${locale === 'en' ? '/en' : ''}/reviews?category=chips`);
  const card = page.locator('[data-product-card]');
  await expect(card).toHaveCount(1);
  await expect(card.locator('img')).toHaveAttribute('src', /nfc-030-chip/);
  await card.getByRole('button', {name: locale === 'en' ? 'View in 3D' : 'In 3D ansehen'}).click();
  await expect(page.locator('[data-model-ready=true]')).toBeVisible();
  await page.getByRole('button', {name: locale === 'en' ? 'Close 3D view' : '3D-Ansicht schliessen'}).click();
  await card.locator('a[href*="model=nfc-030-chip"]').first().click();
  await expect(page.getByTestId('inquiry-model')).toContainText(locale === 'en' ? 'Stick-on NFC chip' : 'NFC-Chip zum Aufkleben');
  await expect(page.locator('[name=product]')).toHaveCount(0);
  await page.locator('[name=quantity]').fill('3');
  await expect(page.getByTestId('inquiry-total')).toContainText('CHF 30');
  await page.locator('[name=setup]').selectOption('needs-setup');
  await page.getByRole('button', {name: locale === 'en' ? 'Review details' : 'Angaben prüfen', exact:true}).click();
  await expect(page.getByTestId('inquiry-total')).toContainText('CHF 30');
  const email = page.getByRole('link', {name: locale === 'en' ? 'Enquire by email' : 'Per E-Mail anfragen'});
  await expect(email).toHaveAttribute('href', /CHF%2030/);
});
