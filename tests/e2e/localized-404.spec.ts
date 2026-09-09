import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

for (const path of ['/missing-page', '/work/missing-project', '/en/missing-page', '/en/work/missing-project', '/en/deep/missing-page', '/images/missing-page']) {
  test(`404 document is localized before JavaScript: ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    const html = await response!.text();
    const locale = path.startsWith('/en/') ? 'en' : 'de';
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    expect((html.match(/<html\b/g) ?? []).length).toBe(1);
    expect((html.match(/<body\b/g) ?? []).length).toBe(1);
    expect(html).toContain('data-nonce-csp="true"');
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const prefix = locale === 'en' ? '/en' : '';
    for (const href of [prefix || '/', `${prefix}/work`, `${prefix}/contact`]) {
      await expect(page.locator(`main a[href="${href}"]`)).toBeVisible();
    }
    await expect(page).toHaveTitle(new RegExp(locale === 'en' ? 'Page not found' : 'Seite nicht gefunden'));
  });
}

test('the URL determines the error language even with an incoming locale header', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-silvan-locale': 'en' });
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
});

test.describe('runtime script protection', () => {
  test.use({ javaScriptEnabled: true });
  test('English 404 hydrates with a fresh nonce and blocks injected scripts', async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/en/missing-page');
    await expect(page.locator('main h1')).toBeVisible();
    const policy = await page.locator('meta[data-nonce-csp]').getAttribute('content');
    const second = await request.get('/en/another-missing-page');
    const nonce = /'nonce-([^']+)'/.exec(policy!)?.[1];
    expect(nonce).toBeTruthy();
    expect(await second.text()).not.toContain(nonce!);
    await page.evaluate(() => {
      document.documentElement.dataset.cspProbe = 'blocked';
      const script = document.createElement('script');
      script.textContent = 'document.documentElement.dataset.cspProbe = "executed"';
      document.head.append(script);
    });
    await expect(page.locator('html')).toHaveAttribute('data-csp-probe', 'blocked');
    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.locator('button[aria-expanded]').first();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    expect(errors).toEqual([]);
  });
});

test('valid English pages and the error recovery link still work', async ({ page }) => {
  await page.goto('/en/missing-page');
  await page.locator('main a[href="/en/work"]').click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toBeVisible();
  const response = await page.goto('/en/work/falkenried');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toContainText('Falkenried');
});
