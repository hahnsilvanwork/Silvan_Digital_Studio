import { expect, test } from '@playwright/test';

test('reload restores product choices but excludes personal details', async ({ page }) => {
  await page.goto('/en/reviews?category=reviews&model=review-round-black#inquiry');
  await expect(page.getByTestId('inquiry-model')).toBeVisible();
  await page.selectOption('[name="size"]', '100');
  await page.selectOption('[name="setup"]', 'ready');
  await page.fill('[name="quantity"]', '3');
  await page.fill('[name="businessName"]', 'Private test business');
  await page.fill('[name="destinationUrl"]', 'https://example.com/private');
  await page.reload();
  await expect(page.locator('[name="quantity"]')).toHaveValue('3');
  await expect(page.locator('[name="size"]')).toHaveValue('100');
  await expect(page.locator('[name="businessName"]')).toHaveValue('');
  await expect(page.locator('[name="destinationUrl"]')).toHaveValue('');
  await expect(page.getByText(/selection restored/i)).toBeVisible();
  await page.getByRole('button', { name: 'Start again', exact: true }).click();
  await expect(page.getByTestId('inquiry-model')).toHaveCount(0);
  await expect(page.locator('[name="product"]')).toHaveValue('');
});

test('optional brief reaches both drafts and clipboard fallback without URL leakage', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: () => Promise.reject(new Error('unavailable')) },
  }));
  await page.goto('/contact?service=websites&tier=business');
  await page.locator('summary').filter({ hasText: 'optional' }).click();
  await page.locator('#contact-brief').fill('Website für meine Testfirma');
  for (const scheme of ['mailto:', 'https://wa.me/']) {
    const href = await page.locator(`main a[href^="${scheme}"]`).first().getAttribute('href');
    expect(decodeURIComponent(href!)).toContain('Website für meine Testfirma');
  }
  await page.getByRole('button', { name: /kopieren/i }).click();
  await expect(page.locator('#contact-draft')).toHaveValue(/Website für meine Testfirma/);
  expect(page.url()).not.toContain('Testfirma');
  await page.reload();
  await expect(page.locator('#contact-brief')).toHaveValue('');
});

test('home remains within a narrow viewport in both languages', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of ['/', '/en']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const header = await page.locator('header').boundingBox();
    expect(header!.height).toBeLessThan(100);
  }
});
