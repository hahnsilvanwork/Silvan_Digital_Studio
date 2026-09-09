import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3113';
const folder = 'artifacts/implementation';
await mkdir(folder, {recursive:true});
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [320,390,1440]) for (const locale of ['de','en']) {
    const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[]; page.on('pageerror', error=>errors.push(error.message));
    const prefix=locale==='en'?'/en':'';
    await page.goto(base+prefix+'/automation');
    await page.getByRole('button',{name:locale==='de'?'Bericht erstellen':'Create report',exact:true}).click();
    const approve=page.getByRole('button',{name:locale==='de'?'Als geprüft markieren':'Mark as reviewed',exact:true});
    await expect(approve).toBeEnabled();
    await approve.click();
    await page.getByRole('checkbox').check();
    await expect(approve).toHaveCount(0);
    await page.getByRole('button',{name:locale==='de'?'Bericht erstellen':'Create report',exact:true}).click();
    await expect(approve).toBeDisabled();
    await page.locator('[data-workflow-example]').screenshot({path:`${folder}/automation-${locale}-${width}.png`});
    await page.goto(base+prefix+'/websites');
    await page.getByText(locale==='de'?'Pakete im Detail vergleichen':'Compare package details',{exact:true}).click();
    await expect(page.getByRole('table')).toBeVisible();
    await page.getByRole('table').screenshot({path:`${folder}/packages-${locale}-${width}.png`});
    await page.locator('a[href*="tier=premium"]').first().click();
    await expect(page.locator('#contact-tier')).toHaveValue('premium');
    const allMail=await page.locator('a[href^="mailto:"]').evaluateAll(links=>links.map(link=>link.href));
    if(!allMail.some(href=>decodeURIComponent(href).includes('2,000')||decodeURIComponent(href).includes("2'000"))) throw new Error('Tier price missing from message');
    for(const route of ['/presence','/work/falkenried','/work/steiner-handwerk']) {
      await page.goto(base+prefix+route);
      await page.screenshot({path:`${folder}/${route.replaceAll('/','-')}-${locale}-${width}.png`,fullPage:true});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      expect(overflow).toBe(false);
    }
    expect(errors).toEqual([]);
    results.push({width,locale,passed:true});
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const axe=await readFile(require.resolve('axe-core/axe.min.js'),'utf8');
  for(const route of ['/websites','/automation']) {
    await page.goto(base+route);
    if(route==='/websites') await page.getByText('Pakete im Detail vergleichen',{exact:true}).click();
    else { await page.getByRole('checkbox').check(); await page.getByRole('button',{name:'Bericht erstellen',exact:true}).click(); }
    await page.evaluate(axe);
    const violations=await page.evaluate(async()=> (await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations);
    expect(violations).toEqual([]);
  }
  console.log(JSON.stringify(results));
} finally { await browser.close(); await writeFile(`${folder}/verification.json`,JSON.stringify(results,null,2)); }
