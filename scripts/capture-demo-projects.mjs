import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import { screenshotCopy } from './demo-screenshot-copy.mjs';
import { demoProjects } from './demos.config.mjs';

const base = process.env.DEMO_BASE_URL ?? 'http://localhost:3110';
const demos = Object.fromEntries(demoProjects.map(demo => [demo.name, demo.slug]));
await mkdir('public/images/projects', { recursive: true });
await mkdir('artifacts/demos', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [project, demo] of Object.entries(demos)) {
    for (const locale of ['de', 'en']) {
    for (const width of locale === 'de' ? [1440, 390] : [1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', deviceScaleFactor: width === 1440 ? 2 : 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}/demos/${demo}${locale === 'en' && demo === 'falkenried' ? '/en/' : ''}`, { waitUntil: 'networkidle' });
      if (locale === 'en' && screenshotCopy[demo]) {
        await page.evaluate(({copy, demo}) => {
          document.documentElement.lang = 'en';
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let repeatedEnding = 0;
          while (walker.nextNode()) {
            const node = walker.currentNode;
            if (['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) continue;
            const key = node.textContent.trim();
            if (Object.hasOwn(copy, key)) {
              const value = demo === 'handwerk' && key === 'AN.' && repeatedEnding++ === 1 ? 'AT HOME.' : copy[key];
              node.textContent = node.textContent.replace(key, value);
            }
          }
        }, {copy:screenshotCopy[demo], demo});
      }
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
