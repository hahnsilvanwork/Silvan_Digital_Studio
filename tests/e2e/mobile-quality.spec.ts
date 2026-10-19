import { expect, test } from '@playwright/test';

const routes = ['', '/websites', '/reviews', '/presence', '/automation', '/work', '/work/falkenried', '/work/cafe-vogel', '/work/spurwerk', '/work/salon-lumiere', '/about', '/contact', '/hello', '/imprint', '/privacy'];

for (const width of [320, 390, 768, 1280]) {
  test(`all public pages fit and their local links resolve at ${width}px`, async ({ page, request }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 844 });
    const defects: string[] = [];
    const destinations = new Set<string>();
    for (const locale of ['', '/en']) for (const route of routes) {
      const path = `${locale}${route}` || '/';
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const visible = (element: Element) => { const r = element.getBoundingClientRect(); const s = getComputedStyle(element); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !element.closest('[inert]'); };
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          smallFields: [...document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]),select,textarea')].filter(visible).filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.id || e.getAttribute('name')),
          smallControls: [...document.querySelectorAll('button,summary,main a[data-touch-target]')].filter(visible).filter(e => { const r=e.getBoundingClientRect(); return r.height < 43.5 || r.width < 43.5; }).map(e => e.textContent?.trim().slice(0,70) || e.getAttribute('aria-label')),
          missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(e => { const href=e.getAttribute('href')!; return href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1))); }).map(e=>e.getAttribute('href')),
          links: [...document.querySelectorAll<HTMLAnchorElement>('a[href]')].filter(a=>a.origin === location.origin && !a.pathname.startsWith('/demos/') && !a.pathname.includes('.')).map(a=>a.pathname),
        };
      });
      if(result.overflow) defects.push(`${path}: horizontal overflow`);
      if(result.smallFields.length) defects.push(`${path}: inputs below 16px: ${result.smallFields.join(', ')}`);
      if(result.smallControls.length) defects.push(`${path}: small targets: ${result.smallControls.join(', ')}`);
      if(result.missingAnchors.length) defects.push(`${path}: missing anchors: ${result.missingAnchors.join(', ')}`);
      result.links.forEach(href=>destinations.add(href));
    }
    if(width === 390) for(const href of destinations) expect((await request.get(href)).status(), href).toBe(200);
    expect(defects).toEqual([]);
  });
}

test('an open mobile menu releases the page when switching to desktop', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Menü öffnen'}).click();
  await expect(page.getByRole('dialog',{name:'Menü',exact:true})).toBeVisible();
  await page.setViewportSize({width:1280,height:900});
  await expect(page.getByRole('dialog',{name:'Menü',exact:true})).toHaveCount(0);
  await expect(page.locator('[inert]')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveAttribute('data-menu-open','true');
});

test('mobile hero actions remain comfortably tappable within the viewport', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  for(const route of ['/', '/en', '/reviews', '/en/reviews']) {
    await page.goto(route);
    const links = page.locator('main section').first().locator('a').filter({hasNot:page.locator('img')});
    const primary = await links.nth(0).boundingBox();
    const secondary = await links.nth(1).boundingBox();
    for (const bounds of [primary!, secondary!]) {
      expect(bounds.x, route).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width, route).toBeLessThanOrEqual(390);
      expect(bounds.height, route).toBeGreaterThanOrEqual(44);
    }
    expect(primary!.height, route).toBeGreaterThanOrEqual(48);
  }
});

test('paired website packages align their actions despite different copy lengths', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [768,1024,1280]) for(const path of ['/websites','/en/websites']) {
    await page.setViewportSize({width,height:900});
    await page.goto(path);
    const actions=page.locator('a[href*="tier="]');
    for(const index of [0,2]) {
      const left=await actions.nth(index).boundingBox();
      const right=await actions.nth(index+1).boundingBox();
      expect(Math.abs(left!.y-right!.y),`${path} at ${width}`).toBeLessThan(1);
    }
  }
});

test('the narrow package comparison opens by keyboard and reads without sideways scrolling', async ({ page }) => {
  await page.setViewportSize({width:320,height:740});
  await page.goto('/websites');
  const summary=page.getByText('Pakete im Detail vergleichen',{exact:true});
  await summary.focus();
  await summary.press('Enter');
  const lists=page.locator('#examples dl');
  await expect(lists).toHaveCount(4);
  for(const list of await lists.all()) await expect(list).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

for(const locale of ['de','en']) test(`automation example supports review, error recovery and reset in ${locale}`, async ({page})=>{
  await page.setViewportSize({width:320,height:740});
  await page.goto(locale==='de'?'/automation':'/en/automation');
  const demo=page.locator('[data-workflow-example]');
  await demo.getByRole('combobox').nth(1).selectOption('done');
  const generate=demo.getByRole('button',{name:locale==='de'?'Bericht erstellen':'Create report',exact:true});
  const approve=demo.getByRole('button',{name:locale==='de'?'Freigeben':'Approve',exact:true});
  await generate.click();
  await expect(demo).toContainText(locale==='de'?'2 erledigt':'2 done');
  await approve.click();
  await expect(approve).toBeDisabled();
  await demo.getByRole('checkbox').check();
  await generate.click();
  await expect(approve).toBeDisabled();
  await expect(demo.getByRole('status')).toContainText(locale==='de'?'Zuständigkeit fehlt':'Owner missing');
  await demo.getByRole('button',{name:locale==='de'?'Beispiel zurücksetzen':'Reset example'}).click();
  await expect(demo.getByRole('checkbox')).not.toBeChecked();
  await expect(demo).toContainText(locale==='de'?'Noch kein Bericht':'No report yet');
});

test('homepage hero aligns its desktop closing rows and keeps the full project image on mobile', async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/');
  const hero=page.locator('main section').first();
  const call=await hero.locator('a[href^="tel:"]').boundingBox();
  const caption=await hero.locator('figcaption').boundingBox();
  expect(Math.abs((call!.y+call!.height)-(caption!.y+caption!.height))).toBeLessThan(1);
  await page.setViewportSize({width:390,height:844});
  const title=await hero.locator('h1').boundingBox();
  const image=await hero.locator('figure img').boundingBox();
  expect(Math.abs(image!.x-title!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(image!.width-title!.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(image!.width/image!.height-1.44)).toBeLessThan(0.01);
});

test('website offer stays together before its image and contact labels share an inset', async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('/websites');
  const hero=page.locator('main section').first();
  const button=await hero.getByRole('link',{name:'Website unverbindlich besprechen',exact:true}).boundingBox();
  const image=await hero.locator('img').boundingBox();
  expect(button!.y+button!.height).toBeLessThan(image!.y);
  expect(Math.abs(button!.x-image!.x)).toBeLessThan(1);
  expect(Math.abs(button!.width-image!.width)).toBeLessThan(1);
  await page.setViewportSize({width:1280,height:900});
  const desktopTitle=await hero.locator('h1').boundingBox();
  const desktopImage=await hero.locator('img').boundingBox();
  expect(desktopImage!.x).toBeGreaterThan(desktopTitle!.x+desktopTitle!.width);
  // The optical inset aligns the image with the visible glyphs rather than the line box.
  expect(desktopImage!.y-desktopTitle!.y).toBeGreaterThanOrEqual(0);
  expect(desktopImage!.y-desktopTitle!.y).toBeLessThanOrEqual(12);
  await page.setViewportSize({width:390,height:844});
  await page.goto('/contact');
  const labelEdges=await page.locator('main a[href^="mailto:"],main a[href^="tel:"],main a[href^="https://wa.me/"]').evaluateAll(links=>links.map(a=>a.querySelector('span')!.getBoundingClientRect().x));
  // Bordered rows contribute one CSS pixel to the text inset.
  expect(Math.max(...labelEdges)-Math.min(...labelEdges)).toBeLessThanOrEqual(1);
});
