import {expect,test} from '@playwright/test';

for(const locale of ['de','en'])for(const width of [390,900,1440]){
  test(`aligns product content and actions at ${width}px in ${locale}`,async({page})=>{
    await page.setViewportSize({width,height:1000});
    await page.emulateMedia({reducedMotion:'reduce'});
    for(const category of ['reviews','menu']){
      await page.goto(`${locale==='en'?'/en':''}/reviews?category=${category}`);
      const cards=page.locator('[data-product-card]');
      await expect(cards).toHaveCount(category==='menu'?3:5);
      await page.evaluate(()=>document.fonts.ready);
      const positions=await cards.evaluateAll(nodes=>nodes.map(card=>{
        const top=card.getBoundingClientRect().top;
        const selectors=['h3','[class*=catalogPrice]','[class*=catalogDescription]','ul','a','[class*=view3dButton], [class*=comingSoon]'];
        return {top,rows:selectors.map(selector=>card.querySelector(selector)!.getBoundingClientRect().top-top)};
      }));
      for(let i=1;i<positions.length;i++){
        const previous=positions[i-1];const current=positions[i];
        if(width<704||Math.abs(previous.top-current.top)<1){
          for(let row=0;row<current.rows.length;row++)expect(Math.abs(previous.rows[row]-current.rows[row]),`${category}: card ${i}, content row ${row}`).toBeLessThan(1);
        }
      }
      expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
    }
  });
}
