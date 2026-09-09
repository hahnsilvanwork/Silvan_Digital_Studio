import { build } from 'esbuild';
import { mkdir,writeFile } from 'node:fs/promises';

// Local rendering workbench used to generate thumbnails and inspect exported GLBs.
await mkdir('public/3d',{recursive:true});
await build({stdin:{contents:`import { createProductStage } from './src/components/products/local-product-stage';
const id = new URLSearchParams(location.hash.slice(1)).get('model');
if (id && /^[a-z0-9-]+$/.test(id)) {
  window.productStage = createProductStage(document.getElementById('stage'), '/models/nfc/'+id+'.glb', () => { document.body.dataset.ready='true'; }, () => { document.body.dataset.error='true'; });
}`,resolveDir:process.cwd(),loader:'ts'},bundle:true,minify:true,format:'esm',platform:'browser',outfile:'public/3d/local-product.js'});
await writeFile('public/3d/product.html','<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Produktvorschau</title><style>html,body,#stage{width:100%;height:100%;margin:0;overflow:hidden;background:#f0efec}</style></head><body><div id="stage"></div><script type="module" src="/3d/local-product.js"></script></body></html>');
