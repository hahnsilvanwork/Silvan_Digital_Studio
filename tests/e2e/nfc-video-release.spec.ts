import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { waitForHydration } from './support';

for (const locale of ['de', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  for (const width of [320, 390, 806, 1024, 1440]) {
    test(`${locale}: complete card film and retained page align at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${prefix}/reviews`);
      await waitForHydration(page);
      const film = page.locator('[data-nfc-motion]');
      await film.scrollIntoViewIfNeeded();
      await expect(film).toHaveAttribute('data-running', 'true');
      const video = film.locator('video');
      await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0.1);
      const media = await video.evaluate((element: HTMLVideoElement) => ({ duration: element.duration, width: element.videoWidth, height: element.videoHeight, muted: element.muted, loop: element.loop, inline: element.playsInline }));
      expect({ duration: media.duration, muted: media.muted, loop: media.loop, inline: media.inline }).toEqual({ duration: 12, muted: true, loop: true, inline: true });
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
      // The Windows WebKit media backend reports its scaled decoded surface.
      // ffprobe verifies the 1280x720 asset; every browser must preserve its aspect.
      expect(Math.abs(media.width / media.height - 16 / 9)).toBeLessThan(0.03);
      if (testInfo.project.name === 'chromium') expect([media.width, media.height]).toEqual([1280, 720]);
      await page.getByRole('button', { name: locale === 'de' ? 'Animation pausieren' : 'Pause animation', exact: true }).click();
      await expect(film).toHaveAttribute('data-running', 'false');
      await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page.evaluate(() => {
        const figure = document.querySelector('[data-nfc-motion]')!;
        const stage = figure.firstElementChild!.getBoundingClientRect();
        const heading = document.querySelector('[data-reviews-hero-copy]')!.getBoundingClientRect();
        const controls = [...document.querySelectorAll('[data-reviews-hero-copy] a, [data-nfc-motion] button')].map(element => element.getBoundingClientRect());
        return { stage: { x: stage.x, top: stage.top, right: stage.right, width: stage.width, height: stage.height }, heading: { x: heading.x, top: heading.top }, overflow: document.documentElement.scrollWidth > innerWidth, heights: controls.map(rect => rect.height), cropped: getComputedStyle(figure.querySelector('video')!).objectFit !== 'contain' };
      });
      expect(geometry.overflow).toBe(false);
      expect(geometry.cropped).toBe(false);
      if (width < 1200) expect(geometry.stage.width / geometry.stage.height).toBeCloseTo(16 / 9, 2);
      expect(geometry.stage.x).toBeGreaterThanOrEqual(0);
      expect(geometry.stage.right).toBeLessThanOrEqual(width);
      if (width >= 1200) expect(Math.abs(geometry.stage.top - geometry.heading.top)).toBeLessThan(1);
      else expect(Math.abs(geometry.stage.x - geometry.heading.x)).toBeLessThan(1);
      for (const height of geometry.heights) expect(height).toBeGreaterThanOrEqual(44);
      expect(errors).toEqual([]);
      await expect(page.getByRole('link', { name: 'NFC 2', exact: true })).toHaveCount(0);
      if (testInfo.project.name === 'chromium' && locale === 'de' && [390, 806, 1440].includes(width)) {
        mkdirSync('.impeccable/review/nfc-video', { recursive: true });
        await page.keyboard.press('Control+Home');
        await page.waitForFunction(() => window.scrollY === 0);
        await page.screenshot({ path: `.impeccable/review/nfc-video/${width}-hero.png` });
        for (const id of ['how-it-works', 'products', 'prices', 'inquiry', 'questions']) {
          const heading = page.locator(`#${id} h2`).first();
          await heading.scrollIntoViewIfNeeded();
          await expect.poll(() => heading.evaluate(element => [...element.querySelectorAll('[data-mask-item]')].every(word => {
            const style = getComputedStyle(word);
            return style.opacity === '1' && (style.transform === 'none' || style.transform === 'matrix(1, 0, 0, 1, 0, 0)');
          }))).toBe(true);
        }
        await page.keyboard.press('Control+Home');
        await page.waitForFunction(() => window.scrollY === 0);
        await page.screenshot({ path: `.impeccable/review/nfc-video/${width}-full.png`, fullPage: true });
      }
      await page.locator('#products').scrollIntoViewIfNeeded();
      await film.scrollIntoViewIfNeeded();
      await expect(film).toHaveAttribute('data-running', 'false');
      await page.getByRole('button', { name: locale === 'de' ? 'Animation fortsetzen' : 'Resume animation', exact: true }).click();
      await expect(film).toHaveAttribute('data-running', 'true');
    });
  }

  test(`${locale}: reduced motion downloads no video and keeps the page`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const mediaRequests: string[] = [];
    page.on('request', request => { if (request.url().includes('nfc-cards-fast.mp4')) mediaRequests.push(request.url()); });
    await page.goto(`${prefix}/reviews`);
    // ScrollReveal's motion-ready marker is intentionally absent for reduced motion.
    await page.waitForLoadState('networkidle');
    const film = page.locator('[data-nfc-motion]');
    await film.scrollIntoViewIfNeeded();
    await expect(film).toHaveAttribute('data-static', 'true');
    await expect(film.locator('video')).not.toHaveAttribute('src');
    await expect(film.locator('img')).toHaveAttribute('data-visible', 'true');
    expect(mediaRequests).toEqual([]);
    await expect(page.locator('#prices')).toContainText('CHF 29');
  });
}

test('NFC 2 is absent in both languages and the sitemap', async ({ request }) => {
  for (const route of ['/nfc-2', '/en/nfc-2']) expect((await request.get(route)).status()).toBe(404);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('nfc-2');
});

test('failed video keeps the poster and enquiry links', async ({ page }) => {
  await page.goto('/reviews');
  const film = page.locator('[data-nfc-motion]');
  await film.scrollIntoViewIfNeeded();
  await expect(film.locator('video')).toHaveAttribute('src', '/videos/nfc-cards-fast.mp4?v=12s');
  // A real 404 also reaches Windows WebKit's native media network backend.
  await film.locator('video').evaluate((element: HTMLVideoElement) => { element.src = '/videos/nfc-card-missing-test.mp4'; element.load(); });
  await expect(film).toContainText('Standbild unserer NFC-Karten.');
  await expect(film.locator('img')).toHaveAttribute('data-visible', 'true');
  await expect(page.getByRole('link', { name: 'Unverbindlich anfragen', exact: true }).first()).toHaveAttribute('href', '#inquiry');
});
