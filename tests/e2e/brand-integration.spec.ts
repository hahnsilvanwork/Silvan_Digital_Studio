import {expect,test} from '@playwright/test';

test('the approved logo works in both languages, the footer and browser previews',async({page,request})=>{
  for(const path of ['/about','/en/about']){
    await page.goto(path);
    const header=page.getByRole('banner');
    await expect(header.getByRole('img',{name:'SILVAN Digital Studio'})).toHaveAttribute('src','/images/brand/silvan-logo-navy.svg');
    await expect(header.getByRole('link',{name:'SILVAN Digital Studio',exact:true})).toHaveAttribute('href',path.startsWith('/en')?'/en':'/');
    await expect(page.getByRole('contentinfo').getByRole('img',{name:'SILVAN Digital Studio'})).toHaveAttribute('src','/images/brand/silvan-logo-white.svg');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  for(const path of ['/icon','/apple-icon','/favicon.ico','/og/de','/og/en']){
    const response=await request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toMatch(/^image\//);
    expect((await response.body()).byteLength).toBeGreaterThan(200);
  }
});

test('the signature loads on view, plays silently once without controls',async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  const signature=page.locator('[data-brand-signature]');
  const video=signature.locator('video');
  await expect(video).not.toHaveAttribute('src');
  await signature.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('src','/videos/silvan-logo.mp4');
  await expect(video).toHaveAttribute('data-visible','true');
  expect(await video.evaluate((element:HTMLVideoElement)=>({muted:element.muted,loop:element.loop,inline:element.playsInline}))).toEqual({muted:true,loop:false,inline:true});
  await expect.poll(() => video.evaluate((element:HTMLVideoElement)=>element.ended), {timeout:10000}).toBe(true);
  expect(await video.evaluate((element:HTMLVideoElement)=>element.duration)).toBeLessThan(5);
  await expect(signature.getByRole('button')).toHaveCount(0);
});

test('reduced motion keeps the logo still without downloading the film',async({page})=>{
  const requested:string[]=[];
  page.on('request',request=>{if(request.url().endsWith('/videos/silvan-logo.mp4'))requested.push(request.url());});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/en');
  const signature=page.locator('[data-brand-signature]');
  await signature.scrollIntoViewIfNeeded();
  await expect(signature.getByRole('img',{name:'SILVAN Digital Studio'})).toBeVisible();
  await expect(signature.locator('video')).not.toHaveAttribute('src');
  await expect(signature.getByRole('button')).toHaveCount(0);
  expect(requested).toHaveLength(0);
});

test('saving data keeps the logo still without downloading the film',async({page})=>{
  const requested:string[]=[];
  page.on('request',request=>{if(request.url().endsWith('/videos/silvan-logo.mp4'))requested.push(request.url());});
  await page.addInitScript(()=>{Object.defineProperty(navigator,'connection',{configurable:true,value:Object.assign(new EventTarget(),{saveData:true})});});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/en');
  const signature=page.locator('[data-brand-signature]');
  await signature.scrollIntoViewIfNeeded();
  await expect(signature.locator('video')).not.toHaveAttribute('src');
  expect(requested).toHaveLength(0);
});

test('a film failure preserves the readable static signature',async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  const signature=page.locator('[data-brand-signature]');
  await signature.scrollIntoViewIfNeeded();
  const video=signature.locator('video');
  await expect(video).toHaveAttribute('src','/videos/silvan-logo.mp4');
  // A real missing media resource also covers native Safari media requests,
  // which the local WebKit runner did not intercept through page.route().
  await video.evaluate((element:HTMLVideoElement)=>{
    element.src='/videos/missing-brand-film.mp4';element.load();
  });
  await expect(signature.getByRole('img',{name:'SILVAN Digital Studio'})).toBeVisible();
  await expect(signature.getByRole('button')).toHaveCount(0);
  await expect(video).toHaveAttribute('data-visible','false');
});
