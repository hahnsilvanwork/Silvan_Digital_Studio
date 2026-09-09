import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const files = execFileSync('git', ['ls-files', '-z', 'public', 'demos', 'src'], { encoding: 'utf8' })
  .split('\0').filter(file => /\.(webp|png|jpe?g|svg|woff2?|ttf|otf)$/i.test(file));
const lines = [
  '# Medien- und Lizenznachweisregister', '',
  'Stand: 7. September 2026. Automatisches Inventar versionierter Medien; kein Beleg einer Lizenz oder einer Rechtsverletzung. Geprueft werden muss auch die konkrete kommerzielle Nutzung, Bearbeitung und Weitergabe an Kunden. Generierte Screenshots koennen Rechte an abgebildeten Inhalten enthalten.', '',
  'Je Datei private Beleg-ID, Urheber/Quelle, Lizenzversion, Erwerbsdatum, Nutzungsumfang, allfaellige Marken-/Personenfreigaben und Pruefer ergaenzen. Die Hashwerte dienen nur der eindeutigen Zuordnung. Spline-Szenen und durch next/font geladene Schriften sind ausserhalb dieses Dateiinventars separat zu belegen.', '',
  '| Datei | SHA-256 | Nachweisstatus |', '|---|---|---|',
];
for (const file of files) {
  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  lines.push(`| ${file} | ${hash} | Offen: Quelle/Lizenz/Beleg zuordnen |`);
}
lines.push('', `Erfasst: ${files.length} Dateien. Reproduzierbar mit node scripts/inventory-assets.mjs.`, '');
await writeFile('docs/legal/ASSETREGISTER.md', lines.join('\n'));
console.log(`Inventoried ${files.length} tracked media assets without inferring licences`);
