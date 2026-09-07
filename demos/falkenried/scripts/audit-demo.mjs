import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const root=path.resolve('dist');
const base='/demos/falkenried';
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(req.url.split('?')[0]).replace(base,''); if(name.endsWith('/'))name+='index.html';const file=path.join(root,name); const data=await readFile(file);res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(3103,'127.0.0.1');
async function files(dir){let out=[];for(const ent of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory())out.push(...await files(p));else if(p.endsWith('.html'))out.push(p)}return out}
const routes=(await files(root)).map(f=>'/'+path.relative(root,f).replaceAll('\\','/').replace(/index.html$/,'')).filter(route=>!process.argv[3]||process.argv[3].split(',').includes(route));
const browser=await chromium.launch();
const results=[];
const phase=process.argv[2]||'before';
await mkdir('audit',{recursive:true});
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 for(const route of routes){
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3103'+base+route,{waitUntil:'networkidle'});
  await page.addScriptTag({path:require.resolve('axe-core')});
  const axe=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelector('h1')?.getBoundingClientRect().top,header:document.querySelector('header')?.getBoundingClientRect().bottom,buttons:[...document.querySelectorAll('.btn-primary,.btn-secondary')].map(e=>({text:e.textContent.trim(),color:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor}))}));
  const interactions={};
  if(phase==='after'){
   if(width===390){await page.locator('#mobile-menu-button').click();interactions.menuOpen=await page.locator('#mobile-menu').isVisible();await page.keyboard.press('Escape');interactions.menuClosed=!(await page.locator('#mobile-menu').isVisible());}
   if(await page.locator('[role=tab]').count()){const tabs=page.locator('[role=tab]');await tabs.first().focus();await page.keyboard.press('ArrowRight');interactions.tabsKeyboard=(await tabs.nth(1).getAttribute('aria-selected'))==='true';}
   if(await page.locator('.filter-btn').count()){const filters=page.locator('.filter-btn');await filters.nth(1).click();interactions.filter=(await filters.nth(1).getAttribute('aria-pressed'))==='true';await filters.first().click();}
   if(await page.locator('.contact-form').count()){const form=page.locator('.contact-form').first();await form.locator('input[type=text]').first().fill('Demo Test');for(const input of await form.locator('input[type=email]').all())await input.fill('demo@example.com');for(const input of await form.locator('input[type=tel]').all())await input.fill('0000000000');for(const input of await form.locator('textarea').all())await input.fill('Lokaler Funktionstest.');await form.locator('input[name=privacy_consent]').check();await form.locator('button[type=submit]').click();interactions.formFeedback=await form.locator('.form-feedback').isVisible();}
  }
  results.push({route,width,...layout,interactions,errors,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  if(['/bmw-garage/','/bmw-garage/service/','/gartenbau/gartengestaltung/','/immobilien/','/kontakt/','/'].includes(route)){
   await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{})}));window.scrollTo(0,0)});
   await page.screenshot({path:`audit/${phase}-${width}-${route.replaceAll('/','_')||'home'}.png`,fullPage:true});
  }
  console.log(width,route,axe.violations.map(v=>v.id).join(','),layout.overflow?'OVERFLOW':'');
 }
 await page.close();
}
await writeFile(`audit/${phase}.json`,JSON.stringify(results,null,2));
await browser.close();server.close();
