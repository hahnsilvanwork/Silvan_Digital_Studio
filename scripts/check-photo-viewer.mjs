import { chromium, expect } from '@playwright/test';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

const base=process.env.VIEWER_CHECK_URL ?? 'http://localhost:3100';
const products=JSON.parse(await readFile('src/content/nfc-import.json','utf8'));
const browser=await chromium.launch();
const results=[];
try {
  for(const product of products) {
    const context=await browser.newContext();
    const page=await context.newPage(), external=[], errors=[];
    page.on('request',request=> { if(/^https?:/.test(request.url()) && new URL(request.url()).origin!==new URL(base).origin) external.push(request.url()); });
    page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(()=> {
      window.__viewerViolations=[];
      document.addEventListener('securitypolicyviolation',event=> { if(event.disposition==='enforce') window.__viewerViolations.push({directive:event.effectiveDirective,blocked:event.blockedURI}); });
    });
    await page.goto(`${base}/reviews?category=${product.category}`);
    const card=page.locator('[data-product-card]').filter({has:page.locator(`a[href*="model=${product.id}#"]`)});
    await card.getByRole('button',{name:'In 3D ansehen'}).click();
    await expect(page.locator('[data-local-product-stage][data-model-ready=true]')).toBeVisible({timeout:20000});
    expect(external).toEqual([]); expect(errors).toEqual([]);
    expect(await page.evaluate(()=>window.__viewerViolations)).toEqual([]);
    await page.getByRole('button',{name:'3D-Ansicht schliessen'}).click();
    await expect(page.locator('[data-local-product-stage]')).toHaveCount(0);
    results.push({id:product.id,ready:true,externalRequests:0,cspViolations:0});
    await context.close();
    console.log(`${product.id}: local model and CSP verified`);
  }
  await mkdir('artifacts/products',{recursive:true});
  await writeFile('artifacts/products/viewer-check.json',JSON.stringify(results,null,2));
} finally { await browser.close(); }
