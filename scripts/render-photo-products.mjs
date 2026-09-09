import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from '@playwright/test';
import { photoProducts } from './nfc-photo-manifest.mjs';

const root=resolve('public');
const server=createServer(async(req,res)=> {
  try {
    const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(!path.startsWith(root+sep)) { res.writeHead(403).end(); return; }
    const bytes=await readFile(path);
    res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.glb':'model/gltf-binary','.png':'image/png'})[extname(path)] ?? 'application/octet-stream');
    res.end(bytes);
  } catch { res.writeHead(404).end(); }
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const url=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:800,height:800},deviceScaleFactor:1});
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
await mkdir('public/images/products/nfc',{recursive:true});
await mkdir('.scratch/photo-products',{recursive:true});
try {
  for(const product of photoProducts) {
    await page.goto(`${url}/3d/product.html?id=${product.id}#model=${product.id}`);
    await page.locator('body[data-ready=true]').waitFor({timeout:20000});
    await page.locator('canvas').screenshot({path:`public${product.imageUrl}`});
    if(['nfc-001-google','nfc-007-instagram','review-stand-white','review-round-black'].includes(product.id)) {
      await page.evaluate(()=>window.productStage.view('back'));
      await page.locator('canvas').screenshot({path:`.scratch/photo-products/${product.id}-back.png`});
    }
    console.log(`Rendered ${product.id}`);
  }
  if(errors.length) throw new Error(errors.join('\n'));
  await writeFile('.scratch/photo-products/gallery.html',`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>NFC Modelle – Sichtprüfung</title><style>body{font:15px system-ui;background:#f0efec;color:#222;padding:24px}main{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}figure{margin:0}img{width:100%}figcaption{padding:8px}</style></head><body><h1>22 NFC Modelle</h1><main>${photoProducts.map(p=>`<figure><img src="../../public${p.imageUrl}"><figcaption>${p.number} · ${p.platform} · ${p.kind}</figcaption></figure>`).join('')}</main></body></html>`);
} finally { await browser.close(); await new Promise(done=>server.close(done)); }
