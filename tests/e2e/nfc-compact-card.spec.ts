import {expect,test} from '@playwright/test';
for(const locale of ['de','en']) for(const width of [390,1280]) {
 test(`${locale} compact card prices, 3D and custom examples at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  const path=(locale==='en'?'/en':'')+'/reviews';
  await page.goto(path+'?category=reviews');
  for(const id of ['nfc-001-google','nfc-033-google']) {
   const card=page.locator('[data-product-card]').filter({has:page.locator(`a[href*="model=${id}#"]`)});
   await expect(card).toContainText('CHF 29.–');
   if(id==='nfc-033-google') {
    await card.getByRole('button',{name:locale==='de'?'In 3D ansehen':'View in 3D',exact:true}).click();
    await expect(page.locator('[data-model-ready=true]')).toBeVisible();
    await page.screenshot({path:`.artifacts/compact-card-3d-${locale}-${width}.png`});
    await page.getByRole('button',{name:locale==='de'?'3D-Ansicht schliessen':'Close 3D view',exact:true}).click();
   }
   await card.locator('a[href*="#inquiry"]').first().click();
   await expect(page.getByTestId('inquiry-model')).toContainText('CHF 29.–');
   for(const [quantity,total] of [['1','29'],['2','40'],['3','55'],['5','85']]){
    await page.locator('[name=quantity]').fill(quantity);await expect(page.getByTestId('inquiry-total')).toContainText(`CHF ${total}`);
   }
   await page.locator('[name=setup]').selectOption('needs-setup');
   await page.getByRole('button',{name:locale==='de'?'Anfrage prüfen':'Review your enquiry',exact:true}).click();
   const href=await page.locator('[data-inquiry-summary] a[href^="mailto:"]').getAttribute('href');
   expect(href).not.toBeNull();
   expect(decodeURIComponent(href ?? '')).toContain('CHF 85');
   await page.goto(path+'?category=reviews');
  }
  await page.goto(path);await page.getByRole('button',{name:locale==='de'?'Alle 7 ausgewählten Modelle anzeigen':'Show all 7 selected models'}).click();
  await expect(page.locator('[data-product-card]')).toHaveCount(7);
  await expect(page.locator('[data-product-card] a[href*="model=menu-personalized-white#"]')).toHaveCount(2);
  await expect(page.locator('[data-product-card] a[href*="model=booking-custom-blue#"]')).toHaveCount(0);
  await expect(page.locator('#prices dt')).toHaveCount(5);
  await page.goto(path+'?category=custom');
  const cards=page.locator('[data-product-card]');
  for(let index=0;index<4;index++)await expect(cards.nth(index)).toContainText('CHF 99.–');
  for(const id of ['menu-personalized-white','booking-custom-blue'])await expect(cards.filter({has:page.locator(`a[href*="model=${id}#"]`)})).toHaveCount(1);
  await page.screenshot({path:`.artifacts/custom-examples-${locale}-${width}.png`,fullPage:true});
  await page.goto(path+'?category=menu');await expect(page.locator('[data-product-card]').filter({has:page.locator('a[href*="model=menu-personalized-white#"]')})).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 });
}
