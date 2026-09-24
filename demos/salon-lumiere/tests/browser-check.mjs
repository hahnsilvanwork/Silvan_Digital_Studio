import { chromium, webkit, expect } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const base = process.env.SALON_URL || 'http://127.0.0.1:3203';
const output = 'artifacts/salon-2026-09-24';
const live = process.env.SALON_LIVE === '1';
const screenshots = process.env.SALON_SCREENSHOTS !== '0';
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const report = { base, surfaces: [], journeys: [], errors: [] };
await mkdir(output, { recursive: true });

function futureWeekday(day) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 8);
  while (date.getUTCDay() !== day) date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

async function check(name, fn) {
  try { await fn(); report.journeys.push({ name, passed: true }); }
  catch (error) { report.errors.push({ name, error: error.message }); }
}

for (const [engine, browserType] of Object.entries(live ? { chromium } : { chromium, webkit })) {
  const browser = await browserType.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const jsErrors = [];
  page.on('pageerror', error => jsErrors.push(error.message));
  try {
    for (const width of (live ? [390, 1280] : [320, 390, 768, 1280])) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/', '/leistungen/', '/ueber-uns/', '/kontakt/']) {
        await check(`${engine} ${width} ${route}`, async () => {
          const response = await page.goto(base + route, { waitUntil: 'networkidle' });
          assert.equal(response.status(), 200);
          await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })); });
          const state = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            images: [...document.images].filter(img => !img.naturalWidth).map(img => img.src),
            h1: document.querySelectorAll('h1').length,
            noindex: document.querySelector('meta[name=robots]')?.content.includes('noindex'),
            description: document.querySelector('meta[name=description]')?.content,
            smallControls: [...document.querySelectorAll('a,button,input,select,summary')].filter(el => { const r=el.getBoundingClientRect(); return r.width>0 && r.height>0 && r.height<43 && r.width<43; }).map(el => el.textContent),
            brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(el => !document.getElementById(decodeURIComponent(el.hash.slice(1)))).map(el => el.hash),
          }));
          report.surfaces.push({ engine, width, route, ...state });
          assert.equal(state.overflow, false, 'horizontal overflow');
          assert.deepEqual(state.images, []);
          assert.equal(state.h1, 1);
          assert.equal(state.noindex, true);
          assert.ok(state.description);
          assert.deepEqual(state.smallControls, []);
          assert.deepEqual(state.brokenAnchors, []);
          if (engine === 'chromium' && width === 390) {
            await page.evaluate(axe);
            const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa'] } })).violations.map(v => ({ id:v.id, nodes:v.nodes.map(n => n.target) })));
            assert.deepEqual(violations, [], 'axe violations');
          }
          if (screenshots && engine === 'chromium' && [390,1280].includes(width)) await page.screenshot({ path: `${output}/${live ? 'live' : 'after'}-${route.replaceAll('/','') || 'home'}-${width}.png`, fullPage:true });
        });
      }
    }

    await check(`${engine} mobile menu, focus, breakpoint`, async () => {
      await page.setViewportSize({ width:390, height:844 });
      await page.goto(base, { waitUntil: 'networkidle' });
      const trigger = page.getByRole('button', { name:'Menü öffnen' });
      await trigger.click();
      await expect(page.getByRole('navigation', { name:'Mobile Navigation' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(trigger).toBeFocused();
      await expect(page.locator('.salon-menu-toggle')).toHaveAttribute('aria-expanded','false');
      await trigger.click();
      await page.setViewportSize({ width:1280, height:900 });
      await expect(page.locator('.salon-menu-toggle')).toHaveAttribute('aria-expanded','false');
      await page.setViewportSize({ width:390, height:844 });
      await expect(page.locator('#salon-mobile-menu')).toBeHidden();
      await trigger.click();
      await page.getByRole('navigation', { name:'Mobile Navigation' }).getByRole('link', { name:'Leistungen & Preise' }).click();
      await expect(page.locator('#salon-mobile-menu')).toBeHidden();
      await expect(page.locator('h1')).toContainText('Ihr Look.');
      await page.waitForLoadState('networkidle');
    });

    await check(`${engine} service selection and local request`, async () => {
      await page.goto(base+'/leistungen/', { waitUntil: 'networkidle' });
      await page.getByRole('link', { name:'Keratin-Behandlung: Termin anfragen', exact:true }).click();
      await expect(page.locator('#service')).toHaveValue('keratin');
      await expect(page.locator('#service-detail')).toContainText('ab CHF 180');
      await page.getByRole('button', { name:'Angaben prüfen', exact:true }).click();
      await expect(page.locator('#name')).toHaveAttribute('aria-invalid','true');
      await page.locator('#name').fill('Anna Beispiel');
      await page.locator('#email').fill('anna@example.com');
      await page.locator('#desiredDate').fill(futureWeekday(0));
      await page.getByRole('button', { name:'Angaben prüfen', exact:true }).click();
      await expect(page.locator('#desiredDate-error')).toContainText('Sonntags');
      await page.locator('#desiredDate').fill(futureWeekday(5));
      await expect(page.locator('#desiredTime option[value="17:30"]')).toHaveCount(1);
      await expect(page.locator('#desiredTime option[value="17:45"]')).toHaveCount(0);
      await page.locator('#desiredTime').selectOption('17:30');
      await page.locator('#message').fill('Ein neuer Look. Bitte beraten.');
      const transmissions = [];
      const onRequest = request => { if(request.method() !== 'GET' || /anna|example\.com|Ein%20neuer/.test(request.url())) transmissions.push(request.url()); };
      page.on('request', onRequest);
      await page.getByRole('button', { name:'Angaben prüfen', exact:true }).click();
      const summary = page.getByTestId('inquiry-summary');
      for(const text of ['Keratin-Behandlung','ab CHF 180','17:30','Anna Beispiel','anna@example.com','Ein neuer Look. Bitte beraten.']) await expect(summary).toContainText(text);
      await expect(page.getByLabel('Zusammenfassung Ihrer Beispielanfrage')).toBeFocused();
      await page.getByRole('button', { name:'Angaben ändern' }).click();
      await expect(page.locator('#name')).toHaveValue('Anna Beispiel');
      await expect(page.locator('#message')).toHaveValue('Ein neuer Look. Bitte beraten.');
      await page.getByRole('button', { name:'Angaben löschen' }).click();
      for(const field of ['name','email','message','desiredDate','desiredTime','service']) await expect(page.locator('#'+field)).toHaveValue('');
      await expect(page.locator('#service')).toBeFocused();
      const storage = await page.evaluate(() => ({ local:localStorage.length, session:sessionStorage.length }));
      assert.deepEqual(storage, { local:0, session:0 });
      assert.deepEqual(transmissions, []);
      page.off('request',onRequest);
      await page.evaluate(axe);
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']} })).violations.map(v=>v.id));
      assert.deepEqual(violations, []);
    });

    await check(`${engine} 200 percent text on all pages`, async () => {
      await page.setViewportSize({width:390,height:844});
      for (const route of ['/', '/leistungen/', '/ueber-uns/', '/kontakt/']) {
        await page.goto(base+route, { waitUntil: 'networkidle' });
        await page.addStyleTag({content:'html { font-size: 200% !important; }'});
        await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 1),false,route);
        await page.getByRole('button',{name:'Menü öffnen'}).click();
        const nav=page.getByRole('navigation',{name:'Mobile Navigation'});
        await expect(nav.getByRole('link',{name:'Termin anfragen'})).toBeVisible();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 1),false,route+' menu');
      }
      for (const width of [900,1024,1280]) {
        await page.setViewportSize({width,height:900});
        await page.goto(base, {waitUntil:'networkidle'});
        await page.addStyleTag({content:'html { font-size: 200% !important; }'});
        await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 1),false,`desktop text ${width}`);
      }
    });
    assert.deepEqual(jsErrors, [], `${engine} browser exceptions`);
    const noJs = await browser.newContext({javaScriptEnabled:false});
    await check(`${engine} no-JS disabled form`, async () => {
      const p = await noJs.newPage(); await p.goto(base+'/kontakt/');
      await expect(p.locator('fieldset')).toHaveAttribute('disabled','');
      await expect(p.getByRole('button',{name:'Angaben prüfen'})).toBeDisabled();
      await p.close();
    });
    await noJs.close();
  } catch(error) {report.errors.push({name:engine,error:error.message});}
  finally { await browser.close(); }
}
await writeFile(`${output}/${live?'live':'local'}-checks.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({base,surfaces:report.surfaces.length,passed:report.journeys.length,errors:report.errors},null,2));
if(report.errors.length)process.exitCode=1;
