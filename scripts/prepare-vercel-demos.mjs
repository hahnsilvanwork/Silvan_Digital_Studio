import { mkdir, readdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { demos as sources, publicationFiles, removeStaleFiles } from './sync-demos.mjs';

import { hardenHtml } from './static-csp.mjs';

const portfolio = 'https://silvandigital.ch';
const staging = path.resolve('.scratch/vercel-demos');
const selected = process.argv.slice(2);
for (const [slug, source] of Object.entries(sources)) {
  if (selected.length && !selected.includes(slug)) continue;
  const prefix = `/demos/${slug}`;
  const destination = path.join(staging, slug);
  await access(path.join(source, 'index.html'));
  const files = await publicationFiles(path.resolve(source));
  const included = new Set(files);
  async function copy(directory, relative = '') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const local = path.join(relative, entry.name);
      const from = path.join(directory, entry.name);
      const to = path.join(destination, local);
      if (entry.isDirectory()) { await mkdir(to, { recursive: true }); await copy(from, local); continue; }
      if (!included.has(local.replaceAll('\\', '/'))) continue;
      await mkdir(path.dirname(to), { recursive: true });
      if (/\.(html|css|js|json|txt|xml|svg)$/.test(entry.name)) {
        let content = await readFile(from, 'utf8');
        content = content.replaceAll(`${prefix}/`, '/').replaceAll(prefix, '');
        // Only explicit portfolio links leave this independently hosted demo.
        content = content.replaceAll('"/work/', `"${portfolio}/work/`).replaceAll('\\"/work/', `\\"${portfolio}/work/`);
        if (entry.name.endsWith('.html')) content = hardenHtml(content);
        await writeFile(to, content);
      } else await copyFile(from, to);
    }
  }
  await copy(source);
  await writeFile(path.join(destination, 'vercel.json'), JSON.stringify({
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: null,
    buildCommand: null,
    outputDirectory: '.',
    cleanUrls: true,
    trailingSlash: true,
    headers: [{ source: '/(.*)', headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
      { key: 'Content-Security-Policy', value: "base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'" },
    ] }],
  }, null, 2));
  await removeStaleFiles(destination, [...files, 'vercel.json']);
  console.log(`${slug}: ${destination}`);
}
