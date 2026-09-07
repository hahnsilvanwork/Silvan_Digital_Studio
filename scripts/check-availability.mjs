import { chromium } from '@playwright/test';

const origin = 'https://silvandigital.ch';
const urls = [origin, `${origin}/contact`, `${origin}/reviews`,
  'https://silvan-demo-falkenried.vercel.app',
  'https://silvan-demo-cafe-vogel.vercel.app',
  'https://silvan-demo-steiner.vercel.app',
  'https://silvan-demo-salon-lumiere.vercel.app'];
const browser = await chromium.launch();
const failures = [];
try {
  for (const url of urls) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      if (response?.status() !== 200) throw new Error(`HTTP ${response?.status()}`);
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 10000 });
      if (errors.length) throw new Error(`${errors.length} JavaScript exception(s)`);
      console.log(`OK ${url}`);
    } catch (error) {
      failures.push(`${url}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  const response = await fetch(`${origin}/availability-check-missing-page`, { signal: AbortSignal.timeout(15000) });
  if (response.status !== 404) failures.push(`Missing page returned ${response.status}, expected 404`);
} finally {
  await browser.close();
}
if (failures.length) {
  failures.forEach(failure => console.error(failure));
  process.exitCode = 1;
}
