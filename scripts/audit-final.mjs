import { chromium } from '@playwright/test';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const mode = process.argv[2] ?? 'accessibility';
const label = process.argv[3] ?? 'final';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3113';
await mkdir('artifacts/final-audit', { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  if (mode === 'performance') {
    for (const route of ['/', '/reviews', '/work']) for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await page.addInitScript(() => {
        window.__lab = { lcp: 0, cls: 0, lcpElement: '' };
        new PerformanceObserver(list => {
          for (const e of list.getEntries()) { window.__lab.lcp = e.startTime; window.__lab.lcpElement = e.element?.tagName + ':' + (e.element?.getAttribute('alt') ?? e.element?.textContent?.slice(0, 70) ?? ''); }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        let start = 0, last = 0, sum = 0;
        new PerformanceObserver(list => {
          for (const e of list.getEntries()) if (!e.hadRecentInput) {
            if (e.startTime - last > 1000 || e.startTime - start > 5000) { start = e.startTime; sum = 0; }
            last = e.startTime; sum += e.value; window.__lab.cls = Math.max(window.__lab.cls, sum);
          }
        }).observe({ type: 'layout-shift', buffered: true });
      });
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(8000);
      const metrics = await page.evaluate(() => ({ ...window.__lab, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null, resources: performance.getEntriesByType('resource').length, transferredBytes: performance.getEntriesByType('resource').reduce((sum, e) => sum + e.transferSize, 0) }));
      results.push({ route, run, ...metrics });
      console.log(JSON.stringify(results.at(-1)));
      await context.close();
    }
  } else {
    const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
    const routes = ['', '/websites', '/reviews', '/presence', '/automation', '/work', '/about', '/contact', '/hello', '/privacy', '/imprint', ...['falkenried', 'cafe-vogel', 'steiner-handwerk', 'salon-lumiere'].map(id => '/work/' + id)];
    for (const prefix of ['', '/en']) for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(base + prefix + route, { waitUntil: 'load' });
      await page.evaluate(axe);
      const result = await page.evaluate(async () => {
        const report = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
        return { violations: report.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incompleteRules: report.incomplete.map(v => v.id), overflow: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      results.push({ route: prefix + route || '/', ...result });
      console.log(`${prefix + route || '/'}: ${result.violations.length} violations, overflow=${result.overflow}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`artifacts/final-audit/${mode}-${label}.json`, JSON.stringify({ base, conditions: mode === 'performance' ? 'Chromium, 390x844, DPR1, CPU 4x, 150ms latency, 1.6Mbps down / 750Kbps up, browser cache disabled, 8 seconds after DOMContentLoaded, three runs per page; local server lab only' : 'axe WCAG2A/AA+2.1AA; Chromium 390x844 reduced motion; not a conformance certification', results }, null, 2));
}
