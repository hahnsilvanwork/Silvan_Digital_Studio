import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

for (const locale of ['de', 'en']) {
  const prefix = locale === 'en' ? '/en' : '';
  test(`${locale}: contact context survives language and back navigation without private query data`, async ({ page }) => {
    await page.goto(`${prefix}/contact?service=websites&email=private@example.com`);
    const reason = page.locator('#contact-reason');
    await expect(reason).toHaveValue('websites');
    await reason.selectOption('automation');
    await expect(page).toHaveURL(`${prefix}/contact?service=automation`);
    const mail = page.locator('main a[href^="mailto:"]');
    expect(decodeURIComponent((await mail.getAttribute('href'))!)).toMatch(/Automation/);
    expect(await mail.getAttribute('href')).not.toContain('private');
    await page.locator(`header a[hreflang="${locale === 'de' ? 'en' : 'de'}"]`).click();
    await expect(page).toHaveURL(`${locale === 'de' ? '/en' : ''}/contact?service=automation`);
    await expect(page.locator('#contact-reason')).toHaveValue('automation');
    await page.goBack();
    await expect(page).toHaveURL(`${prefix}/contact?service=automation`);
    await expect(reason).toHaveValue('automation');
    await page.goto(`${prefix}/contact?service=websites&service=automation`);
    await expect(reason).toHaveValue('');
  });

  test(`${locale}: hello downloads the actual contact card`, async ({ page }) => {
    await page.goto(`${prefix}/hello`);
    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[download="silvan-hahn.vcf"]').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('silvan-hahn.vcf');
    const card = await readFile((await download.path())!, 'utf8');
    expect(card).toContain('BEGIN:VCARD\r\nVERSION:4.0');
    expect(card).toContain('FN:Silvan Hahn');
    expect(card).toContain('EMAIL:');
    expect(card).toContain('TEL;VALUE=uri:tel:');
  });

  test(`${locale}: legal anchors work below the header and pages reflow at 320px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 568 });
    for (const route of ['/contact', '/hello', '/privacy', '/imprint']) {
      await page.goto(`${prefix}${route}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
    }
    await page.goto(`${prefix}/privacy#section-3`);
    const heading = page.locator('#section-3');
    await expect(heading).toBeInViewport();
    expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual((await page.locator('body > header, header').first().boundingBox())!.height);
    await page.locator('a[href="#legal-contents"]').nth(2).click();
    await expect(page.locator('#legal-contents')).toBeFocused();
    await page.locator('a[href="#section-3"]').click();
    await expect(heading).toBeFocused();
  });
}
