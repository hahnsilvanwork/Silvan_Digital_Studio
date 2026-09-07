import { copyFile, mkdir, access, readdir, readFile, unlink } from 'node:fs/promises';
import { resolve, join, dirname, basename, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { demoProjects } from './demos.config.mjs';

export const demos = Object.fromEntries(demoProjects.map(demo => [demo.slug, `${demo.source}/${demo.output}`]));
export async function exportFiles(root) {
  return (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter(entry => entry.isFile())
    .map(entry => resolve(entry.parentPath, entry.name).slice(resolve(root).length + 1).replaceAll('\\', '/'))
    .sort();
}

// The same manifest drives both publication formats. Keep source originals intact.
export async function publicationFiles(root) {
  await access(join(root, 'index.html'));
  const files = await exportFiles(root);
  const texts = await Promise.all(files.filter(file => /\.(html|css|js|json|txt|xml|svg)$/.test(file)).map(file => readFile(join(root, file), 'utf8')));
  const references = texts.join('\n');
  return files.filter(file => {
    if (/\.(mp4|map)$/.test(file) || basename(file).startsWith('.')) return false;
    // Conservative basename matching covers CSS, client JS, JSON and every route.
    if (/\.jpe?g$/i.test(file) && !references.includes(basename(file)) && !references.includes(encodeURIComponent(basename(file)))) return false;
    return true;
  });
}

export async function removeStaleFiles(destination, files) {
  const root = resolve(destination);
  const allowed = [resolve('public/demos'), resolve('.scratch/vercel-demos')];
  if (!allowed.some(parent => root.startsWith(parent + sep))) throw new Error(`Unexpected publication directory: ${root}`);
  await mkdir(root, { recursive: true });
  const keep = new Set(files);
  for (const file of await exportFiles(root)) {
    if (!keep.has(file)) await unlink(join(root, file));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  for (const [slug, source] of Object.entries(demos)) {
    const root = resolve(source);
    const files = await publicationFiles(root);
    const destination = resolve('public/demos', slug);
    await mkdir(destination, { recursive: true });
    for (const file of files) {
      await mkdir(dirname(join(destination, file)), { recursive: true });
      await copyFile(join(root, file), join(destination, file));
    }
    await removeStaleFiles(destination, files);
    console.log(`${slug}: published ${files.length} files from checked export manifest`);
  }
}
