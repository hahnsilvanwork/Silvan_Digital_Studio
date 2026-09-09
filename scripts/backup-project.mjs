import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, lstat } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';

// Source snapshot only: Git-ignored credentials, originals and build output stay private.
const root = resolve('.');
const destination = resolve(process.argv[2] ?? '../Website Backups');
if (destination === root || destination.startsWith(root + sep)) throw new Error('Choose a backup destination outside the project');
const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
const staging = resolve('.scratch', `restore-check-${stamp}`);
await mkdir(staging, { recursive: true });
await mkdir(destination, { recursive: true });
const files = [...new Set(execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean))];
const manifest = [];
for (const file of files) {
  const path = resolve(file);
  if (!path.startsWith(root + sep) || /[\r\n]/.test(file)) throw new Error(`Unsafe archive path: ${file}`);
  const info = await lstat(path).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  if (!info) continue; // A deleted tracked file must not reappear on recovery.
  if (!info.isFile()) throw new Error(`Review non-regular file before backup: ${file}`);
  manifest.push({ file, sha256: createHash('sha256').update(await readFile(path)).digest('hex') });
}
const list = join(staging, 'file-list.txt');
await writeFile(list, manifest.map(item => item.file).join('\n') + '\n');
const archive = join(destination, `silvan-source-${stamp}.zip`);
execFileSync('tar', ['-a', '-cf', archive, '-T', list], { stdio: 'pipe' });
const restore = join(staging, 'restored');
await mkdir(restore);
execFileSync('tar', ['-xf', archive, '-C', restore], { stdio: 'pipe' });
for (const item of manifest) {
  const restored = createHash('sha256').update(await readFile(join(restore, item.file))).digest('hex');
  if (restored !== item.sha256) throw new Error(`Restore verification failed: ${item.file}`);
}
const evidence = { createdAt: new Date().toISOString(), archive, verifiedFiles: manifest.length, restoreVerified: true,
  scope: 'Current non-ignored source files; excludes Git history, credentials, hosting settings and customer mail. Same-machine copy is not off-site protection.', files: manifest };
await writeFile(`${archive}.manifest.json`, JSON.stringify(evidence, null, 2));
await mkdir('artifacts/security', { recursive: true });
await writeFile('artifacts/security/backup-result.json', JSON.stringify({ ...evidence, files: undefined }, null, 2));
console.log(`Source backup restored and SHA-256 verified: ${manifest.length} files; ${archive}`);
