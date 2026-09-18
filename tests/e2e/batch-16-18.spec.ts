import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  test(`${locale}: all four pages fit a 320px screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    for (const route of ['', '/about', '/presence', '/automation']) {
      await page.goto(`${prefix}${route}` || '/');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
    }
  });
  test(`${locale}: home explains the offer before the project and about shows the person early`, async ({ page }) => {
    await page.goto(prefix || '/');
    const hero = page.locator('main section').first();
    for (const route of ['/websites', '/reviews']) {
      const action = hero.locator(`a[href="${prefix}${route}"]`);
      await expect(action).toBeVisible();
      const box = await action.boundingBox();
      expect(box!.y + box!.height).toBeLessThan(page.viewportSize()!.height);
    }
    await page.goto(`${prefix}/about`);
    await expect(page.locator('main h1')).toBeVisible();
    const portrait = page.locator('main figure').first();
    expect((await portrait.boundingBox())!.y).toBeLessThan(page.viewportSize()!.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.getByRole('link', { name: locale === 'en' ? 'Try the model enquiry' : 'Modellanfrage ausprobieren' }).click();
    await expect(page.getByTestId('inquiry-model')).toBeVisible();
    await expect(page.locator('[name=size]')).toBeFocused();
  });
  test(`${locale}: example pages have readable mobile layouts and real contact paths`, async ({ page }) => {
    for (const route of ['/presence', '/automation']) {
      await page.goto(`${prefix}${route}`);
      await expect(page.locator('main h1')).toBeVisible();
      const examples = page.locator('[data-service-example]');
      await expect(examples).toBeVisible();
      expect(await examples.textContent()).toMatch(locale === 'en' ? /example|illustrat/i : /Beispiel|Anschauung/i);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const contact = page.locator(`main a[href="${prefix}/contact?service=${route.slice(1)}"]`).first();
      await expect(contact).toBeVisible();
      await contact.click();
      await expect(page.locator('#contact-reason')).toHaveValue(route.slice(1));
    }
  });
}
