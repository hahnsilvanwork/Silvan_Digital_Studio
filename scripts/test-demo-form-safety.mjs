import { chromium, expect } from '@playwright/test';

// Run against already-built sites; never starts a build or changes production.
const urls = process.argv.slice(2);
if (!urls.length) urls.push(...['kontakt/', 'en/contact/', 'gartenbau/', 'en/gartenbau/', 'immobilien/', 'en/immobilien/'].map(route => `http://127.0.0.1:3200/${route}`), 'http://127.0.0.1:3201/kontakt/', 'http://127.0.0.1:3202/', 'http://127.0.0.1:3203/kontakt/');
const browser = await chromium.launch();
const failures = [];
async function fill(form) {
  for (const control of await form.locator('input:not([type=hidden]):visible, textarea, select').all()) {
    const type = await control.getAttribute('type');
    if (type === 'checkbox') { await control.check(); continue; }
    const tag = await control.evaluate(el => el.tagName);
    if (tag === 'SELECT') { const options = await control.locator('option').all(); await control.selectOption({ index: options.length > 1 ? 1 : 0 }); continue; }
    await control.fill(type === 'email' ? 'privacy-probe@example.com' : type === 'date' ? '2027-12-20' : type === 'time' ? '10:00' : type === 'number' ? '2' : 'privacy-probe');
  }
}
try {
  for (const url of urls) for (const mode of ['no-js', 'blocked-scripts', 'interactive-enter', 'interactive-click']) {
    const context = await browser.newContext({ javaScriptEnabled: mode !== 'no-js' });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    page.setDefaultNavigationTimeout(10000);
    if (mode === 'blocked-scripts') await page.route('**/*', async route => {
      if (route.request().resourceType() === 'script') return route.abort();
      if (route.request().resourceType() === 'document') {
        const response = await route.fetch();
        return route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': "script-src 'none'" } });
      }
      return route.continue();
    });
    try {
      await page.goto(url, { waitUntil: 'load' });
      // Hosting may canonicalize trailing slashes before the interaction begins.
      const initialUrl = page.url();
      const form = page.locator('form').first();
      await expect(form).toBeVisible();
      const requests = [];
      const unsafeRequests = [];
      page.on('request', request => {
        requests.push(request.url());
        if (!['GET', 'HEAD'].includes(request.method()) || request.isNavigationRequest() ||
            /privacy-probe/i.test(decodeURIComponent(request.url()) + (request.postData() ?? ''))) {
          unsafeRequests.push(request.url());
        }
      });
      if (!mode.startsWith('interactive')) {
        const enabled = await form.locator('input:enabled:not([type=hidden]), textarea:enabled, select:enabled, button:enabled').count();
        if (enabled) {
          await fill(form);
          await form.locator('[type=submit]').click();
          await page.waitForTimeout(300);
          throw new Error(`Form is editable without handler; resulting URL: ${page.url()}; requests: ${requests.join(', ')}`);
        }
        // A real keyboard action cannot implicitly submit disabled controls.
        await form.locator('[type=submit]').evaluate(button => button.focus());
        await page.keyboard.press('Enter');
        await expect(form.locator('fieldset')).toHaveAttribute('disabled', '');
        expect(page.url()).toBe(initialUrl);
        expect(requests).toEqual([]);
      } else {
        await expect(form.locator('input[type=email]')).toBeEnabled();
        await expect(page.locator('a[href="https://silvandigital.ch/privacy"], a[href="https://silvandigital.ch/en/privacy"]').first()).toBeVisible();
        await fill(form);
        // Initial link prefetches may continue after load. Check all typing for
        // data leakage, then measure the submit action independently.
        expect(unsafeRequests).toEqual([]);
        requests.length = 0;
        if (mode === 'interactive-enter') await form.locator('input[type=email]').press('Enter');
        else await form.locator('[type=submit]').click();
        await expect(page.getByRole('status').filter({ hasText: /Demo|demo/ }).first()).toBeVisible();
        expect(page.url()).toBe(initialUrl);
        expect(requests).toEqual([]);
        expect(unsafeRequests).toEqual([]);
        expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
      }
      console.log(`PASS ${mode} ${url}`);
    } catch (error) { const failure = `${mode} ${url}: ${error.message}`; failures.push(failure); console.error(failure); }
    finally { await context.close(); }
  }
} finally { await browser.close(); }
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
