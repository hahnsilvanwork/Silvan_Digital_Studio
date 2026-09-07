import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch();
const baseURL = process.env.UX_BASE_URL ?? 'http://localhost:3000';
// The dev server can legitimately disable reveal animations before hydration.
// Verify that React has attached to the menu instead of relying on motion state.
const waitForMenuHydration = () => page.waitForFunction(() => {
  const menu = document.querySelector('button[aria-haspopup="dialog"]');
  return menu && Object.keys(menu).some(key => key.startsWith('__reactFiber$'));
}, undefined, { timeout: 20000 });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await mkdir('artifacts/ux', { recursive: true });
for (const width of [320, 390, 768, 1024, 1280, 1536]) {
  await page.setViewportSize({ width, height: 844 });
  for (const route of ['/', '/websites', '/reviews', '/presence', '/automation', '/work', '/about', '/contact', '/en', '/en/reviews']) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    if (dimensions.scroll > dimensions.client + 1) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && el.getBoundingClientRect().width > 0).slice(0, 12).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent.slice(0, 50), right: el.getBoundingClientRect().right }))));
    expect(dimensions.scroll, `${width}px ${route}: horizontal overflow`).toBeLessThanOrEqual(dimensions.client + 1);
    if ([390, 1280].includes(width)) {
      for (const img of await page.locator('main img').all()) {
        if (await img.isVisible()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el => el.decode());
        }
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `artifacts/ux/after-${route.replaceAll('/', '') || 'home'}-${width}.png`, fullPage: true });
      await page.screenshot({ path: `artifacts/ux/viewport-${route.replaceAll('/', '') || 'home'}-${width}.png` });
    }
  }
  console.log(`${width}px: 10 routes without horizontal overflow`);
}
await page.setViewportSize({ width: 390, height: 844 });
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.goto(baseURL);
await waitForMenuHydration();
await page.getByRole('link', { name: 'Leistungen ansehen', exact: true }).click();
await expect(page).toHaveURL(/#services$/);
await expect(page.locator('#services')).toBeInViewport();
await page.getByRole('button', { name: 'Menü öffnen' }).click();
await expect(page.getByRole('dialog', { name: 'Menü', exact: true })).toBeVisible();
await page.keyboard.press('Escape');
await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused();
await page.goto(`${baseURL}/reviews`);
await waitForMenuHydration();
await page.getByRole('link', { name: 'Modelle ansehen', exact: true }).click();
await expect(page).toHaveURL(/#products$/);
await expect(page.locator('#products')).toBeInViewport();
const view = page.getByRole('button', { name: 'In 3D ansehen', exact: true }).first();
await view.scrollIntoViewIfNeeded();
await expect(view.locator('span')).toBeVisible();
expect((await view.boundingBox()).height).toBeGreaterThanOrEqual(44);
await page.screenshot({ path: 'artifacts/ux/mobile-3d-button.png' });
await view.click();
await expect(page.getByRole('dialog')).toBeVisible();
await page.keyboard.press('Escape');
await expect(view).toBeFocused();
console.log('Services anchor, mobile menu, 3D label/dialog/focus: passed');
await browser.close();
