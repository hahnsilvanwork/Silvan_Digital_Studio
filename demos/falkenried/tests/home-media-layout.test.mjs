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
  assert.match(source, /href="\/geschichte\/"/);
});

test("both homepages contain all three original customer testimonials in a three-column layout", async () => {
  for (const path of ["src/pages/index.astro", "src/pages/en/index.astro"]) {
    const source = await readSource(path);
    assert.match(source, /H\. B\. aus Nassenwil/);
    assert.match(source, /J\. W\. aus Bachs/);
    assert.match(source, /C\. H\. aus Schleinikon/);
    assert.match(source, /Professionell, freundlich, zuverlässig/);
    assert.match(source, /Top Beratung/);
    assert.match(source, /Sehr nette und kompetente Mitarbeiter/);
    assert.match(source, /md:grid-cols-3/);
  }
});

test("FAQ tabs are equal-width and centered", async () => {
  const source = await readSource("src/components/FaqTabs.astro");
  assert.match(source, /justify-center/);
  assert.match(source, /md:grid-cols-3/);
  assert.match(source, /w-full text-center/);
});
