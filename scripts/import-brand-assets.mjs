import {copyFile, mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Web derivatives use the approved vector package; the original exports stay intact.
const source = path.resolve('design-assets/brand/silvan-logo-final-2026-09-30');
const destination = path.resolve('public/images/brand');
await mkdir(destination, {recursive:true});
for (const [name, colour] of [['navy','navy'],['white','weiss']]) {
  await copyFile(path.join(source,`silvan-logo-${colour}.svg`),path.join(destination,`silvan-logo-${name}.svg`));
}
await sharp(path.join(destination,'silvan-logo-navy.svg'))
  .resize({width:1200}).png().toFile(path.join(destination,'silvan-logo-navy.png'));

// The favicon uses the actual S outline, rather than substituting a font glyph.
const wordmark = await readFile(path.join(source,'silvan-wortmarke-navy.svg'),'utf8');
const firstOutline = wordmark.match(/<path d="([^"]+)"/)?.[1].split(/(?=M )/)[0];
if (!firstOutline) throw new Error('The approved S outline is missing.');
const coordinates = firstOutline.match(/-?\d+(?:\.\d+)?/g).map(Number);
const xs=coordinates.filter((_,index)=>index%2===0);
const ys=coordinates.filter((_,index)=>index%2===1);
const edge=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))*1.4;
const x=(Math.min(...xs)+Math.max(...xs)-edge)/2;
const y=(Math.min(...ys)+Math.max(...ys)-edge)/2;
const symbol=`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="${x} ${y} ${edge} ${edge}"><rect x="${x}" y="${y}" width="${edge}" height="${edge}" fill="#081B3C"/><path d="${firstOutline}" fill="#FFFFFF"/></svg>`;
await writeFile(path.join(destination,'silvan-symbol.svg'),symbol);
for (const size of [32,64,180,256]) {
  await sharp(Buffer.from(symbol)).resize(size,size).png().toFile(path.join(destination,`silvan-symbol-${size}.png`));
}
const png=await readFile(path.join(destination,'silvan-symbol-32.png'));
const ico=Buffer.alloc(22);
ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);
ico[6]=32;ico[7]=32;ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);
ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);
await writeFile(path.resolve('src/app/favicon.ico'),Buffer.concat([ico,png]));
console.log('Imported the approved navy/white wordmark, share image and S icons.');
