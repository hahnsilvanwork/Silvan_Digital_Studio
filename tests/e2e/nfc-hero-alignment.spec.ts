import {expect,test} from '@playwright/test';
import {waitForHydration} from './support';

for(const width of [1200,1280,1366,1440,1516,1533,1600]) for(const locale of ['de','en']) {
  test(`NFC heading, copy, film and actions share the grid ${locale} ${width}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto(`${locale==='en'?'/en':''}/reviews`);
    await waitForHydration(page);
    await page.evaluate(()=>document.fonts.ready);
    // Measure after the action row's real entrance animation has settled.
    await page.waitForFunction(()=>{
      const row=document.querySelector('[data-reviews-hero-copy] a')!.parentElement!;
      const style=getComputedStyle(row);
      return style.opacity==='1' && (style.transform==='none' || style.transform==='matrix(1, 0, 0, 1, 0, 0)');
    });
    const pause=page.getByRole('button',{name:locale==='de'?'Animation pausieren':'Pause animation',exact:true});
    await expect(pause).toBeVisible();
    for(let state=0;state<2;state++){
      const rects=await page.evaluate(()=>{
        const copy=document.querySelector('[data-reviews-hero-copy]')!;
        const figure=document.querySelector('[data-nfc-motion]')!;
        const stage=figure.firstElementChild!.getBoundingClientRect();
        const button=figure.querySelector('button')!.getBoundingClientRect();
        const links=Array.from(copy.querySelectorAll('a')).map(a=>a.getBoundingClientRect());
        const title=document.querySelector('h1')!.getBoundingClientRect();
        const column=copy.getBoundingClientRect();
        const caption=figure.querySelector('figcaption')!.getBoundingClientRect();
        const actions=copy.querySelector('a')!.parentElement!.getBoundingClientRect();
        const price=copy.querySelector('[data-reviews-hero-price]')!.getBoundingClientRect();
        const intro=copy.querySelector('[data-reviews-hero-main] p')!.getBoundingClientRect();
        return {top:title.top-stage.top,bottom:actions.bottom-stage.bottom,metadataCenter:price.top+price.height/2-caption.top-caption.height/2,metadataGap:price.top-actions.bottom,actionGap:actions.top-intro.bottom,titleLeft:title.left-column.left,titleWidth:title.width-column.width,targets:[button,...links].map(a=>a.height),fitting:getComputedStyle(figure.querySelector('video')!).objectFit,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      expect(Math.abs(rects.top)).toBeLessThan(1);
      expect(Math.abs(rects.bottom)).toBeLessThan(1);
      expect(Math.abs(rects.metadataCenter)).toBeLessThan(1);
      expect(rects.metadataGap).toBeGreaterThanOrEqual(16);
      expect(rects.metadataGap).toBeLessThanOrEqual(32);
      expect(rects.actionGap).toBeGreaterThanOrEqual(20);
      expect(rects.actionGap).toBeLessThanOrEqual(80);
      expect(Math.abs(rects.titleLeft)).toBeLessThan(1);
      expect(Math.abs(rects.titleWidth)).toBeLessThan(1);
      for(const height of rects.targets)expect(height).toBeGreaterThanOrEqual(44);
      expect(rects.fitting).toBe('contain');
      expect(rects.overflow).toBe(false);
      if(state===0)await pause.click();
    }
  });
}
