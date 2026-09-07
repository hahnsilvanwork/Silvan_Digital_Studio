import { test, expect } from '@playwright/test';
import { projects } from '../../src/content/projects';

const demos = [
  ['falkenried', 'falkenried'],
  ['cafe-vogel', 'cafe'],
  ['steiner-handwerk', 'handwerk'],
  ['salon-lumiere', 'salon'],
];

test('four real projects lead to working static demos', async ({ page }) => {
  await page.goto('/work');
  for (const [project, demo] of demos) {
    await expect(page.locator(`a[href="/work/${project}"]`)).toBeVisible();
    await page.goto(`/work/${project}`);
    await expect(page.locator(`a[href="${projects.find(item => item.slug === project)!.demoUrl}"]`)).toBeVisible();
    const image = page.locator(`img[src*="${project}"]`);
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    const response = await page.goto(`/demos/${demo}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    const links = await page.locator('a[href]').evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute('href')!))]);
    for (const href of links.filter(href => href.startsWith(`/demos/${demo}`) && !href.includes('#'))) {
      const linked = await page.request.get(href);
      expect(linked.status(), href).toBe(200);
    }
    await page.goto('/work');
  }
});

test('legacy project links resolve to their replacement', async ({ page }) => {
  for (const [old, replacement] of [['archa', 'falkenried'], ['lumen', 'cafe-vogel'], ['architech-studio', 'steiner-handwerk'], ['vanguard-apparel', 'salon-lumiere']]) {
    await page.goto(`/work/${old}`);
    await expect(page).toHaveURL(new RegExp(`/work/${replacement}$`));
  }
});
