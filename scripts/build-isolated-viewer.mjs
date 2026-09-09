import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { hardenHtml } from './static-csp.mjs';

await mkdir('public/3d', { recursive: true });
await build({
  entryPoints: ['src/viewer/main.tsx'], outfile: 'public/3d/viewer.js',
  bundle: true, minify: true, format: 'esm', platform: 'browser', target: 'es2020',
  jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'parent-owns-fallback-image', setup(builder) {
    builder.onResolve({ filter: /^next\/image$/ }, () => ({ path: 'image', namespace: 'parent-fallback' }));
    builder.onLoad({ filter: /.*/, namespace: 'parent-fallback' }, () => ({ contents: 'export default function Image() { return null; }', loader: 'js' }));
  } }],
});
await writeFile('public/3d/viewer.html', hardenHtml('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Interactive product model</title><link rel="stylesheet" href="/3d/viewer.css"></head><body><div id="viewer"></div><script type="module" src="/3d/viewer.js"></script></body></html>', { isolatedViewer: true }));
console.log('Isolated viewer built in public/3d');
