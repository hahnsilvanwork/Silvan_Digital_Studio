import { expect, test } from '@playwright/test';

for (const width of [390, 1280]) {
  test(`NFC language transfer preserves all details and current preview at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width,height:900});
    await page.goto('/reviews?category=reviews&model=review-round-black#inquiry');
    await page.locator('[name=size]').selectOption('100');
    await page.locator('[name=quantity]').fill('3');
    await page.locator('[name=setup]').selectOption('ready');
    await page.locator('[name=destinationUrl]').fill('https://g.page/r/example/review');
    await page.locator('[name=businessName]').fill('Private Company');
    await page.locator('[name=contactPerson]').fill('Private Visitor');
    await page.locator('[name=note]').fill('Please preserve this private note.');
    expect(await page.evaluate(()=>sessionStorage.length)).toBe(0);
    await page.getByRole('button',{name:'Angaben prüfen',exact:true}).click();
    for (const locale of ['en','de']) {
      await page.getByRole('link',{name:locale==='en'?'Englisch':'German',exact:true}).click();
      await expect(page.locator('html')).toHaveAttribute('lang',locale);
      const summary=page.locator('[data-inquiry-summary]');
      await expect(summary).toBeVisible();
      for(const value of ['Private Company','Private Visitor','Please preserve this private note.','https://g.page/r/example/review','Ø 100 mm','CHF 100']) await expect(summary).toContainText(value);
      await expect(summary).toContainText(locale==='en'?'Destination link':'Link zur Zielseite');
      expect(await page.evaluate(()=>sessionStorage.length)).toBe(0);
      const url=new URL(page.url());expect(url.searchParams.get('model')).toBe('review-round-black');expect([...url.searchParams.keys()]).toEqual(['category','model']);
      for(const link of await summary.locator('a[href^="mailto:"], a[href*="wa.me/"]').all()) {
        const message=decodeURIComponent((await link.getAttribute('href'))!);expect(message).toContain('Private Company');expect(message).toContain('CHF 100');expect(message).toContain('Ø 100 mm');
      }
    }
    await page.getByRole('button',{name:'Angaben bearbeiten',exact:true}).click();
    for (const [name,value] of Object.entries({size:'100',quantity:'3',setup:'ready',destinationUrl:'https://g.page/r/example/review',businessName:'Private Company',contactPerson:'Private Visitor',note:'Please preserve this private note.'})) await expect(page.locator(`[name=${name}]`)).toHaveValue(value);
    await page.locator('[name=quantity]').fill('4');await expect(page.locator('[data-inquiry-summary]')).toHaveCount(0);
    await page.getByRole('button',{name:'Angaben prüfen',exact:true}).click();await expect(page.getByTestId('inquiry-total')).toContainText('CHF 120');
  });
}

for (const locale of ['de','en']) {
  test(`${locale}: pause survives scrolling and tab switching; reduced motion stays static`,async({page,context})=>{
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.goto(`${locale==='en'?'/en':''}/reviews`);
    const figure=page.locator('[data-nfc-motion]');await figure.scrollIntoViewIfNeeded();await expect(figure).toHaveAttribute('data-running','true');
    const pause=page.getByRole('button',{name:locale==='de'?'Animation pausieren':'Pause animation',exact:true});await pause.focus();await page.keyboard.press('Space');
    await expect(figure).toHaveAttribute('data-running','false');
    await page.locator('#inquiry').scrollIntoViewIfNeeded();await figure.scrollIntoViewIfNeeded();
    const other=await context.newPage();await other.goto('about:blank');await other.bringToFront();await page.bringToFront();await other.close();
    await expect(figure).toHaveAttribute('data-running','false');
    expect(await figure.evaluate(el=>el.getAnimations({subtree:true}).every(animation=>animation.playState==='paused'))).toBe(true);
    const resume=page.getByRole('button',{name:locale==='de'?'Animation fortsetzen':'Resume animation',exact:true});await expect(resume).toHaveAttribute('aria-pressed','true');await resume.focus();await page.keyboard.press('Enter');await expect(figure).toHaveAttribute('data-running','true');
    await page.emulateMedia({reducedMotion:'reduce'});await expect(figure).toHaveAttribute('data-static','true');await expect(figure).toHaveAttribute('data-running','false');await expect(figure.getByRole('button')).toHaveCount(0);
  });
}

test('blocked session storage keeps the draft when language change is cancelled',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));
 await page.goto('/reviews?category=reviews&model=review-round-black#inquiry');await page.locator('[name=businessName]').fill('Keep these details');
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Abbrechen behält Ihre Angaben');await dialog.dismiss();});
 await page.getByRole('link',{name:'Englisch',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('lang','de');await expect(page.locator('[name=businessName]')).toHaveValue('Keep these details');
});
for (const width of [390,1280]) {
 test(`application and family controls retain every variant at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/en/reviews?category=reviews&model=review-round-black#products');
  const cards=page.locator('[data-product-card]');await expect(cards).toHaveCount(9);
  const stand=page.getByRole('button',{name:'Stand',exact:true});await stand.focus();await page.keyboard.press('Enter');await expect(stand).toHaveAttribute('aria-pressed','true');await expect(cards).toHaveCount(2);for (const card of await cards.all()) await expect(card).toContainText('Stand');
  expect(new URL(page.url()).searchParams.get('model')).toBe('review-round-black');
  await page.getByRole('button',{name:'Flat card',exact:true}).click();await expect(cards).toHaveCount(7);
  await page.getByRole('button',{name:'All product types',exact:true}).click();await expect(cards).toHaveCount(9);
  const category=page.locator('select[id$="-category"]');if(await category.isVisible()) await category.selectOption('chips');else await page.getByRole('button',{name:/^NFC chip.*1 product/}).click();
  await expect(page.getByRole('button',{name:'Adhesive chip',exact:true})).toBeVisible();await expect(cards).toHaveCount(1);await expect(cards).toContainText('CHF 15');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
 });
}
