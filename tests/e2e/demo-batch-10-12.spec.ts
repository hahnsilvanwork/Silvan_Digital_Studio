import { expect, test } from '@playwright/test';

test('cafe contact heading fits narrow screens without horizontal scrolling', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/demos/cafe/kontakt');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  }
});

test('cafe request uses opening hours, resets stale time and shows the chosen time', async ({ page }) => {
  await page.goto('/demos/cafe/kontakt');
  await page.locator('#date').fill('2027-12-20');
  await page.locator('#time').selectOption('17:30');
  await page.locator('#holiday').check();
  await expect(page.locator('#time')).toHaveValue('');
  await expect(page.locator('#time option[value="17:30"]')).toHaveCount(0);
  await page.locator('#time').selectOption('10:00');
  await page.locator('#name').fill('Demo Test');
  await page.locator('#email').fill('demo@example.test');
  await page.locator('#persons').selectOption({ index: 1 });
  await page.locator('button[type="submit"]').click();
  await expect(page.getByRole('status')).toContainText('10:00');
  await expect(page.getByRole('status')).toContainText('Feiertagszeiten');
  await expect(page.getByRole('status')).toContainText(/nichts|keine/);
});

test('salon carries only a known service and displays the demo appointment request', async ({ page }) => {
  await page.goto('/demos/salon/leistungen');
  await page.getByRole('link', { name: 'Balayage / Ombré: Demo-Anfrage ausprobieren', exact: true }).click();
  await expect(page.locator('#service')).toHaveValue('balayage-ombre');
  await page.locator('#name').fill('Demo Test');
  await page.locator('#email').fill('demo@example.test');
  await page.locator('#desiredDate').fill('2027-12-20');
  await page.locator('#desiredTime').fill('10:00');
  await page.locator('#message').fill('Fiktive Farbanfrage.');
  await page.locator('button[type="submit"]').click();
  await expect(page.getByTestId('inquiry-summary')).toContainText('Balayage / Ombré');
  await expect(page.getByTestId('inquiry-summary')).toContainText('10:00');
  await expect(page.getByRole('status')).toContainText('kein Termin gebucht');
  await page.goto('/demos/salon/kontakt?service=unbekannt&name=Private');
  await expect(page.locator('#service')).toHaveValue('');
  await expect(page.locator('#name')).toHaveValue('');
});

test('Steiner service selection and reset keep the demo enquiry coherent', async ({ page }) => {
  await page.goto('/demos/handwerk');
  await page.getByRole('link', { name: 'Malerarbeiten besprechen', exact: true }).click();
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator('#service')).toHaveValue('Malerarbeiten');
  await expect(page.locator('#service')).toBeFocused();
  // Selecting again from the same fragment must retain the form handoff too.
  await page.getByRole('link', { name: 'Renovationen besprechen', exact: true }).click();
  await expect(page.locator('#service')).toHaveValue('Renovationen');
  await expect(page.locator('#service')).toBeFocused();
  await page.locator('#name').fill('Demo Test');
  await page.locator('#email').fill('demo@example.test');
  await page.locator('#message').fill('Fiktive Anfrage für eine Innenwand.');
  await page.getByRole('button', { name: /Demo-Anfrage ausprobieren/ }).click();
  await expect(page.getByRole('status')).toContainText('keine Daten versendet');
  await page.getByRole('button', { name: 'Neue Demo-Anfrage' }).click();
  await expect(page.locator('#name')).toHaveValue('');
  await expect(page.locator('#service')).toHaveValue('');
  await expect(page.locator('#name')).toBeFocused();
  await expect(page.locator('.project-description')).toHaveCount(4);
});

test('the portfolio and actual Steiner demo use the same public name', async ({ page }) => {
  await page.goto('/work/steiner-handwerk');
  await expect(page.locator('main h1')).toHaveText('Steiner Bau');
  await expect(page).toHaveTitle(/Steiner Bau/);
  await page.goto('/demos/handwerk');
  await expect(page.getByRole('link', { name: 'Steiner Bau – Startseite' })).toBeVisible();
});
