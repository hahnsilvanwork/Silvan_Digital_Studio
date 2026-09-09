import { chromium, expect } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Actual public demo pages, captured in an isolated browser. Never submits a form.
const output = 'public/images/projects/evidence';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const manifest = [];
const projects = [
  ['falkenried', 'falkenried', 'de'], ['falkenried', 'falkenried', 'en'],
  ['cafe-vogel', 'cafe-vogel', 'de'], ['steiner-handwerk', 'steiner', 'de'],
  ['salon-lumiere', 'salon-lumiere', 'de'],
];
async function ready(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); })));
  await page.waitForTimeout(450);
}
async function capture(page, slug, locale, kind, description) {
  await ready(page);
  const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, broken: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src) }));
  expect(state.overflow).toBe(false);
  expect(state.broken).toEqual([]);
  const filename = `${slug}-${kind}-${locale}.webp`;
  const data = await sharp(await page.screenshot({ animations: 'disabled' })).webp({ quality: 84, effort: 6 }).toBuffer();
  const { width, height } = await sharp(data).metadata();
  await writeFile(`${output}/${filename}`, data);
  manifest.push({ project: slug, kind, locale, src: `/images/projects/evidence/${filename}`, width, height, bytes: data.length, viewport: page.viewportSize(), sourceUrl: page.url(), description, status: 'demo-concept', capturedAt: new Date().toISOString(), submitted: false });
  console.log(filename, width, height, data.length);
}
try {
  for (const [slug, host, locale] of projects) {
    const base = `https://silvan-demo-${host}.vercel.app`;
    const prefix = locale === 'en' ? '/en' : '';
    const mobile = await browser.newPage({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
    await mobile.goto(`${base}${prefix}/`, { waitUntil: 'networkidle' });
    await expect(mobile.locator('h1')).toBeVisible();
    await capture(mobile, slug, locale, 'mobile', 'Actual mobile home page at 390 CSS pixels; upper viewport.');
    await mobile.close();

    const tallForm = slug === 'cafe-vogel' || slug === 'salon-lumiere';
    const page = await browser.newPage({ viewport: { width: 1000, height: tallForm ? 900 : 780 }, deviceScaleFactor: 1.5, reducedMotion: 'reduce' });
    // No write requests or form submissions are permitted during evidence capture.
    await page.route('**/*', route => ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
    let description;
    if (slug === 'falkenried') {
      await page.goto(`${base}${prefix}/immobilien/`, { waitUntil: 'networkidle' });
      await page.locator('a[href="#property-enquiry"]').first().click();
      await expect(page.locator('select[name="objekt"]')).toHaveValue(/Wohnung|Apartment|apartment/);
      description = 'First sample property selected through its enquiry link; actual carried-over property title in the demo form.';
    } else if (slug === 'cafe-vogel') {
      await page.goto(`${base}/kontakt/`, { waitUntil: 'networkidle' });
      await page.locator('#persons').selectOption('2 Personen');
      await page.locator('#date').fill('2026-10-14');
      await page.locator('#time').selectOption('10:00');
      description = 'Reservation demo with two people, sample date and generated preferred time selected; no reservation submitted.';
    } else if (slug === 'steiner-handwerk') {
      await page.goto(`${base}/`, { waitUntil: 'networkidle' });
      await page.getByRole('link', { name: 'Malerarbeiten besprechen', exact: true }).click();
      await expect(page.locator('#service')).toHaveValue(/maler/i);
      description = 'Malerarbeiten service arrow clicked; chosen service carried into the enquiry form.';
    } else {
      await page.goto(`${base}/leistungen/`, { waitUntil: 'networkidle' });
      await page.getByRole('link', { name: 'Balayage / Ombré: Demo-Anfrage ausprobieren', exact: true }).click();
      await expect(page.locator('#service')).toHaveValue('balayage-ombre');
      await page.locator('#desiredDate').fill('2026-10-14');
      await page.locator('#desiredTime').fill('10:00');
      description = 'Balayage / Ombré selected on the services page, carried into the contact form with sample date and time.';
    }
    await page.locator('form').evaluate((form, offset) => window.scrollTo({ top: window.scrollY + form.getBoundingClientRect().top - offset, behavior: 'instant' }), tallForm ? 175 : 120);
    await capture(page, slug, locale, 'workflow', description);
    await page.close();
  }
  await writeFile(`${output}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
} finally { await browser.close(); }
