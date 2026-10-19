import { expect, test } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const evidence = resolve(process.env.S3_EVIDENCE_DIR ?? 'test-results/session3-evidence');
mkdirSync(evidence, { recursive: true });

for (const locale of ['de', 'en'] as const) {
  const prefix = locale === 'de' ? '' : '/en';
  test(`${locale}: contact-first home stays within the viewport`, async ({ page }, info) => {
    test.setTimeout(60000);
    const measurements: unknown[] = [];
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      // Resize an empty document: resizing the previous responsive image and
      // immediately navigating would abort a new optimization request.
      await page.goto('about:blank');
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.goto(prefix || '/', { waitUntil: 'domcontentloaded' });
      const hero = page.locator('main').getByRole('link', { name: locale === 'de' ? 'Kontakt aufnehmen' : 'Get in touch', exact: true }).first();
      await expect(hero).toBeVisible();
      if (width === 390) await expect(hero).toBeInViewport();
      await expect(page.locator('#services a')).toHaveCount(4);
      const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.width);
      const service = await page.locator('#services').boundingBox();
      const figure = await page.locator('main figure').first().boundingBox();
      expect(figure!.y + figure!.height).toBeLessThanOrEqual(service!.y + 1);
      const img = page.locator('main figure img').first();
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty('complete', true, { timeout: 15000 });
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
      measurements.push({ width, sizes, service, figure, src: await img.evaluate((el: HTMLImageElement) => el.currentSrc) });
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: resolve(evidence, `${info.project.name}-${locale}-home-${width}.png`), fullPage: false });
      }
    }
    writeFileSync(resolve(evidence, `${info.project.name}-${locale}-home.json`), JSON.stringify(measurements, null, 2));
  });

  test(`${locale}: prepared enquiry ends in matching external drafts`, async ({ page }, info) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('blocked in test')) } }));
    await page.goto(`${prefix}/contact?service=websites&tier=standard`);
    const brief = page.locator('#contact-brief');
    await expect(brief).toBeVisible();
    await expect(page.locator('#contact-tier')).toHaveValue('standard');
    const text = 'Grüezi – Website & Öffnungszeiten\nEin zweiter Satz 🙂';
    await brief.fill(text);
    const handoff = page.getByRole('group', { name: locale === 'de' ? 'Anfrage weitergeben' : 'Continue with your enquiry', exact: true });
    const email = handoff.locator('a[href^="mailto:"]');
    const whatsapp = handoff.locator('a[href^="https://wa.me/"]');
    await expect(email).toBeVisible();
    const mailHref = new URL((await email.getAttribute('href'))!);
    const waHref = new URL((await whatsapp.getAttribute('href'))!);
    expect(mailHref.searchParams.get('body')).toContain(text);
    expect(waHref.searchParams.get('text')).toBe(mailHref.searchParams.get('body'));
    expect((await email.boundingBox())!.y).toBeGreaterThan((await brief.boundingBox())!.y);
    expect((await email.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    expect((await whatsapp.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.getByRole('button', { name: locale === 'de' ? 'Anfragetext kopieren' : 'Copy enquiry text', exact: true }).click();
    await expect(page.locator('#contact-draft')).toHaveValue(mailHref.searchParams.get('body')!);
    expect(page.url()).not.toContain('Gr');
    expect(await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }))).not.toContain('Öffnungszeiten');
    await email.scrollIntoViewIfNeeded();
    await page.screenshot({ path: resolve(evidence, `${info.project.name}-${locale}-contact-390.png`) });
    await page.selectOption('#contact-reason', 'presence');
    await expect(brief).toHaveValue(text);
    await expect(page.locator('#contact-tier')).toHaveCount(0);
    await expect(page.locator('#contact-draft')).toHaveCount(0);
  });

  test(`${locale}: page-link destinations do not mask their titles`, async ({ page }) => {
    for (const [route, target] of [['websites', 'packages'], ['reviews', 'products'], ['reviews', 'prices'], ['presence', 'examples'], ['automation', 'examples']]) {
      await page.goto(`${prefix}/${route}#${target}`);
      const heading = page.locator(`#${target} h2`).first();
      await expect(heading).toBeVisible();
      await expect(heading).not.toHaveAttribute('data-reveal');
      expect(await heading.locator('[data-mask-item]').count()).toBe(0);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(heading).toBeVisible();
    }
  });

  test(`${locale}: direct contact remains usable without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(new URL(`${prefix}/contact`, baseURL).href);
    await expect(page.locator('main a[href^="mailto:"]').first()).toBeVisible();
    await expect(page.locator('main a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('#contact-brief')).not.toBeVisible();
    await context.close();
  });
}
