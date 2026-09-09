import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { photoProducts } from './nfc-photo-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export function mapProductImages(files, products = photoProducts) {
  const result = [];
  const assigned = new Set();
  for (const file of files) {
    if (!/\.(png|jpe?g|webp)$/i.test(file) || !/(?:^|[\s_-])(?:product|poduct)(?=[\s_.-]|$)/i.test(file)) continue;
    const number = file.match(/^(\d+)(?=[\s_-])/);
    let matches = number ? products.filter(p => Number(p.number) === Number(number[1])) : [];
    if (matches.length > 1) matches = matches.filter(p => file.toLowerCase().includes(p.platform.toLowerCase()));
    if (matches.length !== 1) throw new Error(`Cannot uniquely assign main image "${file}". Use the product number and, for shared numbers, platform (e.g. 022 WhatsApp product.png).`);
    const product = matches[0];
    if (assigned.has(product.id)) throw new Error(`Multiple main images for ${product.id}. Keep one product image per product.`);
    assigned.add(product.id);
    result.push({ file, id: product.id });
  }
  return result;
}

export async function importProductImages() {
  const source = resolve(root, 'NFC Cards');
  let files;
  try { files = await readdir(source); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.log('Source photo folder absent; keeping imported product images.');
    return;
  }
  const assignments = mapProductImages(files);
  const destination = resolve(root, 'src/content/nfc-main-images.json');
  let images = {};
  try { images = JSON.parse(await readFile(destination, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(resolve(root, 'public/images/products/main'), { recursive: true });
  for (const {file, id} of assignments) {
    const bytes = await readFile(resolve(source, file));
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
    const src = `/images/products/main/${id}-${hash}${extname(file).toLowerCase()}`;
    await copyFile(resolve(source, file), resolve(root, `public${src}`));
    images[id] = src;
  }
  await writeFile(destination, JSON.stringify(images, null, 2) + '\n');
  console.log(`Imported ${assignments.length} main product photos; 3D previews preserved.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await importProductImages();
