import {expect,test} from '@playwright/test';
import {waitForHydration} from './support';

for(const width of [1024,1100,1152,1280,1366,1440,1536]) for(const locale of ['de','en']) {
  test(`NFC film and both playback states align with actions ${locale} ${width}`,async({page})=>{
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
        return {top:copy.getBoundingClientRect().top-stage.top,buttons:links.map(a=>({top:a.top-button.top,bottom:a.bottom-button.bottom})),ratio:stage.width/stage.height,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      expect(Math.abs(rects.top)).toBeLessThan(1);
      for(const button of rects.buttons){expect(Math.abs(button.top)).toBeLessThan(1);expect(Math.abs(button.bottom)).toBeLessThan(1);}
      expect(rects.ratio).toBeCloseTo(1.04,2);
      expect(rects.overflow).toBe(false);
      if(state===0)await pause.click();
    }
  });
}
