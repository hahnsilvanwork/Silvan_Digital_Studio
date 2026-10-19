import { expect, test } from '@playwright/test';

test('the village is visible on the first screen in both languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 720 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/en']) {
      await page.goto(path);
      const village = await page.locator('main [class*="landscape"]').boundingBox();
      expect(village).not.toBeNull();
      expect(village!.y).toBeGreaterThan(0);
      expect(village!.y + village!.height).toBeLessThanOrEqual(viewport.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  }
});

test('NFC copy and the film share the same desktop starting line', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/reviews', '/en/reviews']) {
    await page.goto(path);
    const heading = await page.locator('h1').boundingBox();
    const stage = await page.locator('[data-nfc-motion] > div').boundingBox();
    expect(Math.abs(heading!.y - stage!.y)).toBeLessThanOrEqual(2);
    const container = await page.locator('[data-reviews-hero-copy]').boundingBox();
    expect(stage!.x - (container!.x + container!.width)).toBeCloseTo(48, 0);
  }
});

test('a single Google offer keeps its text on the section edge', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/presence', '/en/presence']) {
    await page.goto(path);
    const section = page.locator('#packages');
    const heading = await section.locator('h2').boundingBox();
    const offer = await section.locator('h3').boundingBox();
    expect(Math.abs(heading!.x - offer!.x)).toBeLessThanOrEqual(1);
    expect(await section.locator('li li').count()).toBe(3);
    const features = await section.locator('li li').all();
    for (let i = 1; i < features.length; i++) {
      const previous = await features[i - 1].boundingBox();
      const current = await features[i].boundingBox();
      expect(current!.y - previous!.y - previous!.height).toBeLessThanOrEqual(13);
    }
  }
});

test('homepage service titles and prices share starting lines', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/en']) {
      await page.goto(path);
      const titles = await page.locator('#services a > span:first-child').evaluateAll(items => items.map(el => el.getBoundingClientRect().y));
      const prices = await page.locator('#services a > span:last-child').evaluateAll(items => items.map(el => el.getBoundingClientRect().y));
      for (const indices of width === 390 ? [[0, 1], [2, 3]] : [[0, 1, 2, 3]]) {
        for (const positions of [titles, prices]) expect(Math.max(...indices.map(i => positions[i])) - Math.min(...indices.map(i => positions[i]))).toBeLessThanOrEqual(1);
      }
    }
  }
});
