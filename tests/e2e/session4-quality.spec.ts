import { expect, test } from '@playwright/test';
const routes=['','/websites','/presence','/automation','/reviews','/work','/work/falkenried','/work/cafe-vogel','/work/spurwerk','/work/salon-lumiere','/about','/contact','/hello','/imprint','/privacy'];
for(const locale of ['', '/en']) {
 for(const viewport of [{width:320,height:740},{width:430,height:932},{width:844,height:390}]) {
  test(`S4 ${locale||'de'} reflow ${viewport.width}x${viewport.height}`,async({page})=>{
   test.setTimeout(90000);
   await page.setViewportSize(viewport);
   await page.emulateMedia({reducedMotion:'reduce'});
   for(const route of routes){
    const path=locale+route||'/';
    const response=await page.goto(path,{waitUntil:'domcontentloaded'});
    expect(response?.status(),path).toBe(200);
    await expect(page.locator('h1'),path).toBeVisible();
    await page.evaluate(()=>document.fonts.ready);
    const dimensions=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));
    expect(dimensions.content,path).toBeLessThanOrEqual(dimensions.viewport);
   }
  });
 }
 test(`S4 ${locale||'de'} hello offers all four services and honest demo languages`,async({page})=>{
  await page.goto(`${locale}/hello`);
  for(const route of ['/websites','/presence','/automation','/reviews']) await expect(page.locator(`main a[href="${locale}${route}"]`)).toBeVisible();
  if(locale) for(const slug of ['cafe-vogel','spurwerk','salon-lumiere']){
   await page.goto(`/en/work/${slug}`);
   await expect(page.getByRole('link',{name:'Open example website (German) (new tab)',exact:true})).toBeVisible();
   await expect(page.getByRole('link',{name:'Try it in the demo (German) (new tab)',exact:true})).toBeVisible();
  }
 });
 test(`S4 ${locale||'de'} ongoing costs precede the first package action`,async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${locale}/websites#packages`);
  const scope=page.getByTestId('website-package-scope');
  await expect(scope).toContainText(locale?'ongoing support cost extra':'laufende Betreuung kosten separat');
  const note=await scope.boundingBox();
  const firstAction=await page.locator('#packages a[href*="tier="]').first().boundingBox();
  expect(note!.y+note!.height).toBeLessThan(firstAction!.y);
 });
 test(`S4 ${locale||'de'} keyboard drawer escapes with focus restored`,async({page,browserName})=>{
  await page.setViewportSize({width:430,height:932});
  await page.goto(locale||'/');
  const skip=page.getByRole('link',{name:locale?'Skip to content':'Zum Inhalt springen',exact:true});
  if(browserName!=='webkit') {await page.keyboard.press('Tab');await expect(skip).toBeFocused();}
  else await skip.focus();
  await expect(skip).toBeInViewport();
  await skip.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const trigger=page.getByRole('button',{name:locale?'Open menu':'Menü öffnen',exact:true});
  await trigger.focus();await trigger.press('Enter');
  const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button')).toBeFocused();
  if(browserName!=='webkit') for(let i=0;i<16;i++){
   await page.keyboard.press(i<8?'Tab':'Shift+Tab');
   expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
  }
  await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(trigger).toBeFocused();
 });
}

