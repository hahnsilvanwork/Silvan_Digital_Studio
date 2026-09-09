import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("header uses the concept wordmark in an accessible stable grid", async () => {
  const source = await readSource("src/components/Header.astro");
  assert.match(source, /brand-wordmark/);
  assert.match(source, /aria-label="Falkenried Gruppe/);
  assert.match(source, /Falkenried Gruppe – Startseite/);
  assert.match(source, /lg:grid-cols-\[minmax\(12rem,1fr\)_auto_minmax\(12rem,1fr\)\]/);
});

test("home media uses a local image without external video requests", async () => {
  const source = await readSource("src/components/VideoPreview.astro");
  assert.match(source, /garden-path\.jpg/);
  assert.doesNotMatch(source, /youtube|<iframe|fetch\(/);
  assert.match(source, /<Image/);
  assert.match(source, /<figcaption>/);
  assert.match(source, /href=\{routes\.geschichte\[lang\]\}/);
});

test("both homepages label localized testimonials as fictional examples", async () => {
  const de = await readSource("src/pages/index.astro");
  const en = await readSource("src/pages/en/index.astro");
  for (const source of [de, en]) {
    assert.equal((source.match(/<Testimonial /g) ?? []).length, 3);
    assert.match(source, /md:grid-cols-3/);
    assert.doesNotMatch(source, /Original customer quote/);
  }
  assert.match(de, /BEISPIELSTIMMEN · DEMO/);
  assert.match(de, /H\. B\. aus Nassenwil/);
  assert.match(de, /Professionell, freundlich, zuverlässig/);
  assert.match(de, /Top Beratung/);
  assert.match(de, /Sehr nette und kompetente Mitarbeiter/);
  assert.match(en, /EXAMPLE TESTIMONIALS · DEMO/);
  assert.match(en, /H\. B\. from Nassenwil/);
  assert.match(en, /J\. W\. from Bachs/);
  assert.match(en, /C\. H\. from Schleinikon/);
  assert.match(en, /Professional, friendly and reliable/);
  assert.match(en, /Helpful advice with the customer in mind/);
  assert.match(en, /Friendly, knowledgeable staff/);
  assert.match(de, /<VideoPreview lang="de"/);
  assert.match(en, /<VideoPreview lang="en"/);
});

test("FAQ tabs are equal-width and centered", async () => {
  const source = await readSource("src/components/FaqTabs.astro");
  assert.match(source, /justify-center/);
  assert.match(source, /md:grid-cols-3/);
  assert.match(source, /w-full text-center/);
});
