import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const base = '/demos/falkenried';
async function walk(dir) {
 for (const entry of await readdir(dir, { withFileTypes: true })) {
  const file = path.join(dir, entry.name);
  if (entry.isDirectory()) { await walk(file); continue; }
  if (!/\.(html|css|js|xml)$/.test(file)) continue;
  let text = await readFile(file, 'utf8');
  text = text.replace(/((?:href|src|action|poster)=['"])(\/(?!\/|demos\/falkenried)[^'"]*)/g, '$1'+base+'$2');
  text = text.replace(/(url\(['"]?)(\/(?!\/|demos\/falkenried)[^)'"\s]*)/g, '$1'+base+'$2');
  text = text.replace(/href="https:\/\/(?:[a-z-]+\.)?falkenried\.example[^" ]*"/g, 'href="'+base+'/kontakt/#allgemeine-anfrage"');
  await writeFile(file, text);
 }
}
await walk('dist');
console.log('Falkenried export ready at '+base+'/');
