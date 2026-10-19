import { chromium, webkit } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const out = 'artifacts/home-20261009';
const baseUrl = process.env.HOME_CHECK_URL || 'http://127.0.0.1:3000';
await mkdir(out, { recursive: true });
const results = [];
for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
  const browser = await browserType.launch();
  for (const locale of ['de', 'en']) {
    for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const home = locale === 'de' ? '/' : '/en';
      await page.goto(`${baseUrl}${home}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page.evaluate(() => {
        const title = document.querySelector('h1');
        const hero = title.closest('section');
        const header = document.querySelector('header > div');
        const rect = el => ({ x: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width });
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          lines: title.clientHeight / parseFloat(getComputedStyle(title).lineHeight),
          hero: rect(hero), header: rect(header),
          servicesY: document.querySelector('#services').getBoundingClientRect().top,
          benefits: hero.querySelectorAll('ul li').length,
        };
      });
      assert.equal(geometry.overflow, false, `${engine} ${locale} ${width}: overflow`);
      assert.equal(geometry.benefits, 4);
      assert.ok(Math.abs(geometry.hero.x - geometry.header.x) < 1);
      assert.ok(Math.abs(geometry.hero.width - geometry.header.width) < 1);
      if (width >= 1024) assert.ok(geometry.lines <= 3.1, `${locale} ${width}: title ${geometry.lines}`);
      if (width >= 1280) assert.ok(geometry.servicesY >= 900, 'Services follow the desktop welcome screen');
      await page.screenshot({ path: `${out}/${engine}-${locale}-${width}.png`, fullPage: width === 390 });
      if (width >= 1152) {
        assert.equal(await page.getByRole('button', { name: locale === 'de' ? 'Menü öffnen' : 'Open menu' }).isVisible(), false);
        await page.locator('header summary').click();
        const dropdown = page.locator('header details');
        assert.equal(await dropdown.locator('a').count(), 4);
        await page.keyboard.press('Escape');
        assert.equal(await dropdown.getAttribute('open'), null);
        await page.locator('header nav').getByRole('link', { name: locale === 'de' ? 'Preise' : 'Prices', exact: true }).click();
      } else {
        await page.getByRole('button', { name: locale === 'de' ? 'Menü öffnen' : 'Open menu' }).click();
        const dialog = page.getByRole('dialog');
        assert.equal(await dialog.locator('a').count(), 10);
        await dialog.getByRole('link', { name: locale === 'de' ? 'Preise' : 'Prices', exact: true }).click();
        await page.getByRole('dialog').waitFor({ state: 'hidden' });
      }
      await page.waitForFunction(() => location.hash === '#prices' && Math.abs(document.querySelector('#prices').getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().bottom - 16) < 3);
      assert.equal(await page.locator('#prices a').count(), 4);
      await page.screenshot({ path: `${out}/${engine}-${locale}-${width}-prices.png` });
      assert.deepEqual(errors, []);
      results.push({ engine, locale, width, ...geometry });
      await page.close();
    }
  }
  await browser.close();
}
await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
console.log(`${results.length} responsive browser checks passed.`);
