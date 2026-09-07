import { chromium, expect } from '@playwright/test';
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { demos, exportFiles, publicationFiles } from './sync-demos.mjs';

const result = { manifests: [], interactions: [] };
for (const [slug, source] of Object.entries(demos)) {
  const manifest = await publicationFiles(source);
  const prefixed = await exportFiles(`public/demos/${slug}`);
  const standalone = (await exportFiles(`.scratch/vercel-demos/${slug}`)).filter(file => file !== 'vercel.json');
  expect(prefixed).toEqual(manifest);
  expect(standalone).toEqual(manifest);
  let omittedBytes = 0;
  const omitted = (await exportFiles(source)).filter(file => /\.jpe?g$/i.test(file) && !manifest.includes(file));
  for (const file of omitted) omittedBytes += (await stat(path.join(source, file))).size;
  let referenceCount = 0;
  for (const file of manifest.filter(file => file.endsWith('.html'))) {
    const html = await readFile(`public/demos/${slug}/${file}`, 'utf8');
    for (const match of html.matchAll(/(?:src|href)="(\/demos\/[^"?#]+)[^" ]*"/g)) {
      const urlPath = decodeURIComponent(match[1]);
      let target = path.join('public', urlPath);
      try { if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html'); }
      catch { target += '.html'; }
      await stat(target);
      referenceCount++;
    }
  }
  result.manifests.push({ slug, files: manifest.length, checkedHtmlReferences: referenceCount, omittedJpegs: omitted, omittedBytes });
}
const browser = await chromium.launch();
try {
  for (const [index, slug] of ['falkenried', 'cafe', 'handwerk', 'salon'].entries()) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://127.0.0.1:${3200 + index}/`);
    const menu = page.locator('button[aria-controls]').first();
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    if (slug === 'salon' || slug === 'falkenried') {
      await page.goto(`http://127.0.0.1:${3200 + index}/kontakt/`);
      const form = page.locator('form').first();
      const sent = [];
      page.on('request', request => { if (request.method() === 'POST') sent.push(request.url()); });
      await form.locator('input[type="text"]').first().fill('Demo Test');
      await form.locator('input[type="email"]').fill('demo@example.test');
      await form.locator('textarea').first().fill('Local verification only.');
      for (const box of await form.locator('input[type="checkbox"]:visible').all()) await box.check();
      await form.locator('[type="submit"]').click();
      await expect(page.locator('[role="status"]').first()).toBeVisible();
      expect(sent).toEqual([]);
    }
    result.interactions.push({ slug, menuOpenEscape: true, demoForm: ['salon', 'falkenried'].includes(slug) });
    await page.close();
  }
} finally {
  await browser.close();
  await writeFile('artifacts/demo-polish/publication-verification.json', JSON.stringify(result, null, 2));
}
console.log(JSON.stringify(result, null, 2));
