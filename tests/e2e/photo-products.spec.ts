import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
const products: {id: string; number: string; platform: string; category: string}[] = JSON.parse(readFileSync('src/content/nfc-import.json','utf8'));

test('loads local models on demand, supports keyboard and releases them on close', async ({page}) => {
  const models:string[]=[], external:string[]=[], errors:string[]=[];
  page.on('request',request=> {
    if(request.url().endsWith('.glb')) models.push(request.url());
    if(/spline\.design|gstatic\.com/.test(request.url())) external.push(request.url());
  });
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/reviews');
  expect(models).toHaveLength(0);
  const trigger=page.getByRole('button',{name:'In 3D ansehen'}).first();
  for(let i=0;i<3;i++) {
    await trigger.click();
    const dialog=page.getByRole('dialog');
    const stage=dialog.locator('[data-local-product-stage][data-model-ready=true]');
    await expect(stage).toBeVisible();
    const canvas=stage.locator('canvas');
    const before=await canvas.screenshot();
    await stage.focus(); await page.keyboard.press('ArrowRight');
    expect((await canvas.screenshot()).equals(before)).toBe(false);
    await dialog.getByRole('button',{name:'Hinten',exact:true}).click();
    expect((await canvas.screenshot()).equals(before)).toBe(false);
    await dialog.getByRole('button',{name:'Vergrössern',exact:true}).click();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('[data-local-product-stage]')).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  expect(models).toHaveLength(3);
  expect(external).toEqual([]); expect(errors).toEqual([]);
});

test('all imported models load from their matching catalogue categories', async ({page})=> {
  test.setTimeout(120000);
  for(const product of products) {
    await page.goto(`/reviews?category=${product.category}`);
    const card=page.locator('[data-product-card]').filter({has:page.locator(`a[href*="model=${product.id}#"]`)});
    await expect(card).toHaveCount(1);
    await card.getByRole('button',{name:'In 3D ansehen'}).click();
    await expect(page.locator('[data-local-product-stage][data-model-ready=true]')).toBeVisible();
    await page.getByRole('button',{name:'3D-Ansicht schliessen'}).click();
  }
});

test('keeps controls visible on a small phone and opens an English view', async ({page})=> {
  await page.setViewportSize({width:320,height:568});
  await page.goto('/en/reviews?category=social');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(320);
  await page.getByRole('button',{name:'View in 3D'}).first().click();
  const dialog=page.getByRole('dialog');
  await expect(dialog.locator('[data-model-ready=true]')).toBeVisible();
  await expect(dialog.getByRole('button',{name:'Front',exact:true})).toBeVisible();
  const bounds=await dialog.boundingBox();
  expect(bounds!.y).toBeGreaterThanOrEqual(0); expect(bounds!.y+bounds!.height).toBeLessThanOrEqual(568);
  await dialog.getByRole('button',{name:'Back',exact:true}).click();
  await dialog.getByRole('button',{name:'Close 3D view'}).click();
});

test('keeps the image and offers retry when a model fails', async ({page})=> {
  await page.route('**/models/nfc/*.glb',route=>route.fulfill({status:503,body:'Unavailable'}));
  await page.goto('/reviews');
  await page.getByRole('button',{name:'In 3D ansehen'}).first().click();
  await expect(page.getByRole('dialog').getByRole('alert')).toContainText('konnte nicht geladen');
  await page.unroute('**/models/nfc/*.glb');
  await page.getByRole('button',{name:'Erneut versuchen'}).click();
  await expect(page.locator('[data-model-ready=true]')).toBeVisible();
});
