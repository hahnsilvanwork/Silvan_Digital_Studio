import { chromium, expect } from '@playwright/test';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { demoProjects } from './demos.config.mjs';

const demos = demoProjects.map(demo => demo.slug);
const width = Number(process.env.DEMO_AUDIT_WIDTH ?? 390);
const report = [];
await mkdir('artifacts/demo-polish', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [index, slug] of demos.entries()) {
    const base = process.env[`DEMO_${slug.toUpperCase()}_URL`] ?? `http://127.0.0.1:${3200 + index}`;
    const files = await readdir(path.resolve('.scratch/vercel-demos', slug), { recursive: true });
    const routes = files.filter(file => /(^|[\\/])index\.html$/.test(file) && !file.includes('404')).map(file => '/' + file.replaceAll('\\', '/').replace(/index\.html$/, ''));
    const checked = new Set();
    const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      expect(response.status(), `${slug}${route}`).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(async () => Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); })));
      const data = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images].filter(image => !image.naturalWidth).map(image => image.src),
        links: [...new Set([...document.querySelectorAll('a[href]')].map(link => link.href))].filter(href => href.startsWith(location.origin)),
      }));
      expect(data.overflow, `${slug}${route} overflow`).toBe(false);
      expect(data.brokenImages, `${slug}${route} images`).toEqual([]);
      expect(errors, `${slug}${route} JS`).toEqual([]);
      for (const href of data.links) {
        const url = new URL(href); url.hash = '';
        if (checked.has(url.href)) continue;
        checked.add(url.href);
        const target = await page.request.get(url.href);
        expect(target.status(), `${slug}${route} link ${url.href}`).toBe(200);
      }
      if (route === '/') await page.screenshot({ path: `artifacts/layout-audit-2026-09-30/demo-${slug}-${width}.png`, fullPage: true });
      report.push({ slug, route, width, passed: true });
      page.off('pageerror', onError);
    }
    await page.close();
    console.log(`${slug}: ${routes.length} routes at ${width}px and ${checked.size} link destinations passed`);
  }
} finally {
  await browser.close();
  await writeFile(`artifacts/demo-polish/standalone-verification-${width}.json`, JSON.stringify(report, null, 2));
}
