import {chromium, webkit, expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';

const base=process.env.AUDIT_BASE_URL ?? 'https://silvandigital.ch';
const out='artifacts/layout-audit-2026-09-30/live';
await mkdir(out,{recursive:true});
const routes=['','/websites','/reviews','/presence','/automation','/work','/about','/contact','/hello','/imprint','/privacy',...['falkenried','cafe-vogel','spurwerk','salon-lumiere'].map(id=>'/work/'+id)];
const results=[];
for(const engine of [chromium,webkit]){
  const browser=await engine.launch();
  for(const width of engine===chromium?[390,1440]:[390]){
    for(const prefix of ['','/en']) for(const route of routes){
      const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      const response=await page.goto(base+prefix+route,{waitUntil:'networkidle'});
      await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
      const geometry=await page.evaluate(()=>{
        const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
        const visible=e=>e.getClientRects().length&&!e.closest('.visually-hidden,[aria-hidden="true"]');
        return {overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('main h1').length,muted:getComputedStyle(document.documentElement).getPropertyValue('--color-ink-muted').trim(),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),clipped:[...document.querySelectorAll('main p,main li,main h1,main h2,main h3,main label')].filter(visible).filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.slice(0,80)),village:box(document.querySelector('main [class*="landscape"]')),heading:box(document.querySelector('h1')),nfcStage:box(document.querySelector('[data-nfc-motion] > div'))};
      });
      const result={engine:engine.name(),width,route:prefix+route||'/',status:response.status(),errors,...geometry};
      results.push(result);
      expect(response.status()).toBe(200);
      expect(geometry.h1).toBe(1);
      expect(geometry.overflow).toBe(false);
      expect(geometry.brokenImages).toEqual([]);
      expect(geometry.clipped).toEqual([]);
      expect(errors).toEqual([]);
      expect(geometry.muted).toBe('#5c6b91');
      if(!route){expect(geometry.village.y+geometry.village.height).toBeLessThanOrEqual(width===390?844:900);}
      if(width===1440&&route==='/reviews')expect(Math.abs(geometry.heading.y-geometry.nfcStage.y)).toBeLessThanOrEqual(2);
      if(engine===chromium&&['','/reviews','/presence'].includes(route)){
        const name=`${prefix?'en':'de'}-${route.slice(1)||'home'}-${width}`;
        await page.screenshot({path:`${out}/${name}-first-screen.png`});
        if(route==='/presence')await page.locator('#packages').screenshot({path:`${out}/${name}-packages.png`});
      }
      console.log(`${engine.name()} ${width} ${prefix+route||'/'} OK`);
      await page.close();
    }
  }
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  for(const prefix of ['','/en']){
    await page.goto(base+prefix+'/reviews?category=reviews&model=review-round-black#inquiry',{waitUntil:'networkidle'});
    await expect(page.getByTestId('inquiry-model')).toBeVisible();
    await page.locator('[name=size]').selectOption('100');
    await page.locator('[name=setup]').selectOption('needs-setup');
    await page.locator('[name=quantity]').fill('2');
    await page.getByRole('button',{name:prefix?'Review your enquiry':'Anfrage prüfen',exact:true}).click();
    const summary=page.locator('[data-inquiry-summary]');
    await expect(summary).toBeVisible();
    const links=await summary.locator('a[href^="https://wa.me"],a[href^="mailto:"]').evaluateAll(items=>items.map(a=>decodeURIComponent(a.getAttribute('href'))));
    expect(links.length).toBe(2);
    expect(links.every(href=>href.includes('CHF 80'))).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if(engine===chromium)await summary.screenshot({path:`${out}/${prefix?'en':'de'}-nfc-review-390.png`});
    await page.goto(base+prefix+'/contact',{waitUntil:'networkidle'});
    await page.locator('main details').evaluateAll(items=>items.forEach(d=>d.open=true));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if(engine===chromium)await page.locator('main').screenshot({path:`${out}/${prefix?'en':'de'}-contact-open-390.png`});
  }
  await page.close();
  await browser.close();
}
await writeFile(`${out}/results.json`,JSON.stringify({base,results,journeys:'DE/EN NFC review and prepared contact details in Chromium and WebKit; external messages were not sent'},null,2));
console.log(`${results.length} live page checks passed`);
