import { chromium, webkit } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const phase = process.argv[2] ?? 'before';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3000';
const out = `artifacts/layout-audit-2026-09-30/${phase}`;
await mkdir(out, { recursive: true });
const routes = ['', '/websites', '/reviews', '/presence', '/automation', '/work', '/about', '/contact', '/hello', '/imprint', '/privacy', ...['falkenried', 'cafe-vogel', 'spurwerk', 'salon-lumiere'].map(id => '/work/' + id)];
const results = [];
const engines = ['before', 'final'].includes(phase) ? [chromium] : [chromium, webkit];
for (const engine of engines) {
  const browser = await engine.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of ['before', 'final'].includes(phase) ? [390, 1440] : [320, 390, 768, 1280, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : width === 1280 ? 720 : 960 });
    for (const locale of ['de', 'en']) for (const route of routes) {
      const url = base + (locale === 'en' ? '/en' : '') + route;
      const res = await page.goto(url || '/', { waitUntil: 'load' });
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })));
      const info = await page.evaluate(() => {
        const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
        const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && !el.closest('.visually-hidden, [aria-hidden="true"]');
        const headings = [...document.querySelectorAll('main h1, main h2, main h3')].map(el => ({ text: el.textContent, ...box(el) }));
        const clipped = [...document.querySelectorAll('main h1,main h2,main h3,main p,main li,main summary,main label,main button,main a')].filter(visible).filter(el => el.scrollWidth > el.clientWidth + 2).map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 100), class: el.className, scroll: el.scrollWidth, client: el.clientWidth }));
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1, h1: document.querySelectorAll('main h1').length, header: box(document.querySelector('header > div')), footer: box(document.querySelector('footer > div')), headings, clipped, landscape: box(document.querySelector('[class*="landscape"]')), text: document.querySelector('main')?.innerText };
      });
      results.push({ engine: engine.name(), width, locale, route: route || '/', status: res.status(), ...info });
      if (engine === chromium && [390, 1440].includes(width)) {
        const name = `${locale}-${route.slice(1).replaceAll('/', '-') || 'home'}-${width}`;
        const full = await page.screenshot({ fullPage: true, animations: 'disabled' });
        await writeFile(`${out}/${name}.png`, full);
        const size = await sharp(full).metadata();
        const small = await sharp(full).resize({ width: width === 390 ? 390 : 720 }).png().toBuffer();
        const resized = await sharp(small).metadata();
        const sliceHeight = 1100;
        const count = Math.ceil(resized.height / sliceHeight);
        const chunks = [];
        for (let i = 0; i < count; i++) chunks.push({ input: await sharp(small).extract({ left: 0, top: i * sliceHeight, width: resized.width, height: Math.min(sliceHeight, resized.height - i * sliceHeight) }).toBuffer(), left: (i % 3) * resized.width, top: Math.floor(i / 3) * sliceHeight });
        await sharp({ create: { width: resized.width * Math.min(count, 3), height: sliceHeight * Math.ceil(count / 3), channels: 3, background: '#e9eef5' } }).composite(chunks).png().toFile(`${out}/${name}-overview.png`);
        if (route === '/presence') await page.locator('#packages').screenshot({ path: `${out}/${name}-packages.png` });
        if (route === '') await page.locator('[data-brand-signature]').screenshot({ path: `${out}/${name}-signature.png` });
        if (locale === 'de') console.log(`${phase}: ${name}, ${size.height}px, overflow=${info.overflow}, clipped=${info.clipped.length}`);
      }
    }
  }
  console.log(JSON.stringify({ engine: engine.name(), pages: results.filter(r => r.engine === engine.name()).length, errors: [...new Set(errors)] }));
  await browser.close();
}
await writeFile(`${out}/results.json`, JSON.stringify({ phase, base, results }, null, 2));
console.log(JSON.stringify({ total: results.length, issues: results.filter(r => r.overflow || r.h1 !== 1 || ![200, 304].includes(r.status)).map(r => ({ engine: r.engine, width: r.width, locale: r.locale, route: r.route, status: r.status, overflow: r.overflow, h1: r.h1 })) }));
