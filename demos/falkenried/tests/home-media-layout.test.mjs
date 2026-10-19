import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("header uses the concept wordmark in an accessible stable grid", async () => {
  const source = await readSource("src/components/Header.astro");
  assert.match(source, /brand-wordmark/);
  assert.match(source, /aria-label=\{lang === "de"/);
  assert.match(source, /"Falkenried Gruppe: Startseite" : "Falkenried Gruppe: home page"/);
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

test("home uses a shared bilingual concept with three service routes", async () => {
  const source = await readSource("src/components/HomePage.astro");
  assert.match(source, /route: 'bmw'/);
  assert.match(source, /route: 'gartenbau'/);
  assert.match(source, /route: 'immobilien'/);
  assert.match(source, /Falkenried ist ein fiktives Unternehmen/);
  assert.match(source, /fetchpriority="high"/);
  assert.doesNotMatch(source, /Testimonial|VideoPreview|1969/);
});

test("FAQ tabs are equal-width and centered", async () => {
  const source = await readSource("src/components/FaqTabs.astro");
  assert.match(source, /justify-center/);
  assert.match(source, /md:grid-cols-3/);
  assert.match(source, /w-full text-center/);
});
