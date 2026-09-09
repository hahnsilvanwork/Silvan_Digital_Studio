import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.VIEWER_CHECK_URL ?? 'http://localhost:3110';
const browser = await chromium.launch();
const results = [];
try {
  for (let index = 0; index < 4; index++) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const external = new Set();
    const errors = [];
    page.on('request', request => {
      if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(base).origin) external.add(new URL(request.url()).origin);
    });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.__securityViolations = [];
      document.addEventListener('securitypolicyviolation', event => {
        if (event.disposition === 'enforce') window.__securityViolations.push({ directive: event.effectiveDirective, blocked: event.blockedURI });
      });
    });
    await page.goto(`${base}/reviews`, { waitUntil: 'networkidle' });
    expect(external.size).toBe(0);
    await page.getByRole('button', { name: 'In 3D ansehen' }).nth(index).click();
    await page.frameLocator('[data-isolated-spline]').locator('[data-spline-state="ready"]').waitFor({ timeout: 45_000 });
    const frame = page.frames().find(item => item.url().includes('/3d/viewer.html'));
    const isolation = await frame.evaluate(() => {
      let parentBlocked = false; let storageBlocked = false;
      try { void window.parent.document.body; } catch { parentBlocked = true; }
      try { void localStorage.length; } catch { storageBlocked = true; }
      return { parentBlocked, storageBlocked, violations: window.__securityViolations };
    });
    expect(isolation.parentBlocked).toBe(true);
    expect(isolation.storageBlocked).toBe(true);
    expect(isolation.violations).toEqual([]);
    expect(await page.evaluate(() => window.__securityViolations)).toEqual([]);
    expect(errors).toEqual([]);
    await mkdir('artifacts/security', { recursive: true });
    if (index === 0) await page.screenshot({ path: 'artifacts/security/isolated-viewer.png' });
    results.push({ index, ready: true, externalOrigins: [...external], isolation, errors });
    await page.locator('[data-product-3d-dialog]').getByRole('button', { name: '3D-Ansicht schliessen' }).click();
    await expect(page.locator('[data-isolated-spline]')).toHaveCount(0);
    await context.close();
    console.log(`Real isolated model ${index + 1}/4 ready; DOM/storage isolation and CSP verified`);
  }
  await writeFile('artifacts/security/real-viewer.json', JSON.stringify(results, null, 2));
} finally { await browser.close(); }
