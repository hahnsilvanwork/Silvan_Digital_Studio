import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');

test('property request is a real link and carries the selected object into the form', async () => {
  const card = await read('components/PropertyCard.astro');
  assert.match(card, /href="#property-enquiry"/);
  assert.match(card, /data-property-title/);
  assert.match(card, /select\.value/);
  for (const page of ['pages/immobilien.astro', 'pages/en/immobilien.astro']) {
    assert.match(await read(page), /id="property-enquiry"/);
  }
});

test('company and phone actions do not promise nonexistent external destinations', async () => {
  const company = await read('components/CompanyContentPage.astro');
  assert.doesNotMatch(company, /href=\{(?:item\.sourceUrl|partner\.url)\}/);
  assert.doesNotMatch(company, /Originalbeitrag ansehen|View original post|Website besuchen|Visit website/);
  assert.match(company, /routes\.kontakt\[lang\]/);
  assert.doesNotMatch(await read('pages/faq.astro'), /Jetzt anrufen/);
  assert.doesNotMatch(await read('pages/en/faq.astro'), /Call Now/);
});
