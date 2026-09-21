import { expect, test } from '@playwright/test';

for (const locale of ['de', 'en']) {
  test(`${locale}: closed product cards match and disclosures expand independently`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${locale === 'en' ? '/en' : ''}/reviews`);
    await page.evaluate(() => document.fonts.ready);
    const rail = page.locator('[data-product-rail]');
    const cards = page.locator('[data-product-card]');
    const heights = () => cards.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height));
    const categories = page.locator('select[id$="-category"]');
    const options = await categories.locator('option').evaluateAll(elements => elements.map(element => (element as HTMLOptionElement).value));
    for (const width of [390, 1440, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const category of options) {
        if (width < 704) await categories.selectOption(category);
        else {
          const label = await categories.locator(`option[value="${category}"]`).textContent();
          await page.getByRole('group').getByRole('button', { name: new RegExp(`^${label!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) }).click();
        }
        await expect.poll(() => rail.evaluate(element => element.style.getPropertyValue("--card-heading-height"))).not.toBe("");
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await expect.poll(async () => {
          const sizes = await heights();
          return Math.max(...sizes) - Math.min(...sizes);
        }).toBeLessThan(1);
        const before = await heights();
        // DOM activation avoids horizontally scrolling the mobile rail to a
        // different card while verifying that siblings preserve their height.
        await cards.first().locator('summary').evaluate(element => (element as HTMLElement).click());
        await expect.poll(async () => (await heights())[0]).toBeGreaterThan(before[0]);
        const opened = await heights();
        opened.slice(1).forEach((height, index) => expect(Math.abs(height - before[index + 1])).toBeLessThan(1));
        await cards.first().locator('summary').evaluate(element => (element as HTMLElement).click());
        await expect(rail.locator('details[open]')).toHaveCount(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  });
}
