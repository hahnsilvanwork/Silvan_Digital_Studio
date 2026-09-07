import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { demoProjects } from './demos.config.mjs';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
for (const {slug, port} of demoProjects) {
  const root = path.resolve('.scratch/vercel-demos', slug);
  http.createServer(async (request, response) => {
    try {
      let target = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
      if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
      try { if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html'); }
      catch { target += '.html'; }
      const body = await readFile(target);
      response.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream' }).end(body);
    } catch { response.writeHead(404).end('Not found'); }
  }).listen(port, '127.0.0.1', () => console.log(`${slug}: http://127.0.0.1:${port}`));
}
