import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import { demoProjects } from './demos.config.mjs';

const base = process.env.DEMO_BASE_URL ?? 'http://localhost:3110';
const demos = Object.fromEntries(demoProjects.map(demo => [demo.name, demo.slug]));
const requested = process.argv.slice(2);
for (const project of requested) {
  if (!Object.hasOwn(demos, project)) throw new Error(`Unknown demo project: ${project}`);
}
await mkdir('public/images/projects', { recursive: true });
await mkdir('artifacts/demos', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [project, demo] of Object.entries(demos)) {
    if (requested.length && !requested.includes(project)) continue;
    for (const locale of ['de', 'en']) {
    for (const width of locale === 'de' ? [1440, 390] : [1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', deviceScaleFactor: width === 1440 ? 2 : 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}/demos/${demo}${locale === 'en' && demo === 'falkenried' ? '/en/' : ''}`, { waitUntil: 'load' });
      // Capture the actual available demo. German-only demos stay German in
      // English portfolio screenshots, matching their labelled destination.
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(async () => { await Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); })); });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
      }));
      expect(state.overflow, `${demo} at ${width}: overflow`).toBe(false);
      expect(state.broken, `${demo} at ${width}: broken images`).toEqual([]);
      expect(errors, `${demo}: JS errors`).toEqual([]);
      const suffix = locale === 'en' ? '-en' : '';
      const capture = await page.screenshot({ path: `artifacts/demos/${project}-retina${suffix}-${width}.png`, fullPage: width === 390 });
      if (width === 1440) await sharp(capture).webp({ quality: 95, effort: 5 }).toFile(`public/images/projects/${project}-retina${suffix}.webp`);
      console.log(`${demo} ${locale} ${width}: images, layout and JS passed`);
      await page.close();
    }
    }
  }
} finally { await browser.close(); }
