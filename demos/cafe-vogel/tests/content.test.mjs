import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { featuredMenu, menuSections } from '../app/data/menu.ts';

test('every homepage specialty retains the same name, description and price on the full menu', () => {
  const fullMenu = menuSections.flatMap((section) => section.items);
  assert.equal(featuredMenu.length, 6);
  for (const item of featuredMenu) assert.ok(fullMenu.includes(item), item.name);
  assert.equal(featuredMenu.find((item) => item.name === 'Buttergebäck').price, '2.80');
  assert.equal(featuredMenu.find((item) => item.name === 'Sauerteigbrot').price, '5.80');
  assert.match(featuredMenu.find((item) => item.name === 'Frühstückskorb für Zwei').desc, /Saisonfrüchte/);
});

test('reservation markup requires a time and remains fail-closed until hydration', () => {
  const page = readFileSync(new URL('../app/kontakt/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /const serverReady = \(\) => false/);
  assert.match(page, /<fieldset disabled=\{!ready\}/);
  assert.match(page, /<select id="time"[^>]+required/);
  assert.match(page, /e\.preventDefault\(\); if \(ready && times\.includes\(form\.time\)\)/);
  assert.doesNotMatch(page, /<form[^>]+action=|fetch\(|localStorage|sessionStorage/);
});
