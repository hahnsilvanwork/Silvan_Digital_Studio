import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { hardenHtml, assertStaticPages } from './static-csp.mjs';

// Static HTML only. The localized 404 has a runtime nonce policy in RootDocument,
// verified by localized-404.spec.ts. Any other dynamic page still fails closed.
const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
const appRoutes = JSON.parse(await readFile('.next/app-path-routes-manifest.json', 'utf8'));
// _global-error is Next's emergency runtime boundary, not an application route.
assertStaticPages(manifest, Object.entries(appRoutes)
  .filter(([key]) => key.endsWith('/page') && key !== '/_global-error/page')
  .map(([, route]) => route)
  .filter(route => route !== '/_not-found'));
const reviewedHandlers = new Set(['/apple-icon', '/favicon.ico', '/icon', '/manifest.webmanifest', '/og/[locale]', '/robots.txt', '/sitemap.xml']);
for (const [key, route] of Object.entries(appRoutes)) {
  if (key.endsWith('/route') && !reviewedHandlers.has(route)) throw new Error(`Review new route handler content type and CSP: ${route}`);
}
for (const [route, entry] of Object.entries(manifest.routes)) {
  if (entry.initialRevalidateSeconds !== false && entry.initialRevalidateSeconds !== undefined) {
    throw new Error(`ISR would bypass build-time CSP on regeneration: ${route}`);
  }
}
let count = 0;
// Vercel's Next adapter copies HTML during onBuildComplete, before npm postbuild.
// Harden its final artifacts too, including prerender fallbacks and real 404s.
const adapterOutput = '.next/output';
for (const directory of ['.next/server/app', '.next/server/pages', 'public', adapterOutput]) {
  const root = resolve(directory);
  const entries = await readdir(root, { recursive: true, withFileTypes: true }).catch(error => {
    if (error.code === 'ENOENT' && ['.next/server/pages', adapterOutput].includes(directory)) return [];
    throw error;
  });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const file = join(entry.parentPath, entry.name);
    await writeFile(file, hardenHtml(await readFile(file, 'utf8'), { isolatedViewer: file.replaceAll('\\', '/').endsWith('/3d/viewer.html') }));
    count++;
  }
}
if (!count) throw new Error('No static HTML found; refusing an unhardened build');
console.log(`Enforced per-document CSP in ${count} static HTML documents`);
