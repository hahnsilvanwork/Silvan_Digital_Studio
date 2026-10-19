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
  await expect(page.getByTestId('reservation-summary')).toContainText('10:00');
  await expect(page.getByTestId('reservation-summary')).toContainText('Feiertagszeiten');
  await expect(page.getByTestId('reservation-summary')).toContainText('nicht versendet');
});

test('salon carries only a known service and displays the demo appointment request', async ({ page }) => {
  await page.goto('/demos/salon/leistungen');
  await page.getByRole('link', { name: 'Balayage / Ombré: Termin anfragen', exact: true }).click();
  await expect(page.locator('#service')).toHaveValue('balayage-ombre');
  await page.locator('#name').fill('Demo Test');
  await page.locator('#email').fill('demo@example.test');
  await page.locator('#desiredDate').fill('2027-12-20');
  await page.locator('#desiredTime').selectOption('10:00');
  await page.locator('#message').fill('Fiktive Farbanfrage.');
  await page.locator('button[type="submit"]').click();
  await expect(page.getByTestId('inquiry-summary')).toContainText('Balayage / Ombré');
  await expect(page.getByTestId('inquiry-summary')).toContainText('10:00');
  await expect(page.getByText('Es wird kein Termin gebucht.', {exact: false})).toBeVisible();
  await page.goto('/demos/salon/kontakt?service=unbekannt&name=Private');
  await expect(page.locator('#service')).toHaveValue('');
  await expect(page.locator('#name')).toHaveValue('');
});

test('Spurwerk concept replaces Steiner and announces its German demo in English', async ({ page, request }) => {
  for (const prefix of ['', '/en']) {
    await page.goto(prefix + '/work/spurwerk');
    await expect(page.locator('main h1')).toHaveText('Spurwerk Veloatelier');
    await expect(page).toHaveTitle(/Spurwerk Veloatelier/);
    const demo = page.locator('a[href="https://silvan-demo-spurwerk.vercel.app/"]');
    await expect(demo).toBeVisible();
    if (prefix) await expect(demo).toContainText(/German/);
    const response = await request.get(prefix + '/work/steiner-handwerk', { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(prefix + '/work/spurwerk');
  }
  for (const path of ['/demos/handwerk', '/demos/handwerk/index.html', '/demos/handwerk/kontakt']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe('https://silvan-demo-spurwerk.vercel.app/');
  }
  await page.goto('/work');
  await expect(page.locator('a[href="/work/spurwerk"]')).toBeVisible();
  await expect(page.getByText('Steiner Bau', { exact: true })).toHaveCount(0);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('/work/spurwerk');
  expect(await sitemap.text()).not.toContain('steiner-handwerk');
});
