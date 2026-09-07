import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every subpage has a unique local hero with bilingual alt text", async () => {
  for (const path of ["../src/data/bmw-images.ts", "../src/data/garden-hero-images.ts"]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.match(source, /alt:\s*\{\s*de:/);
    assert.match(source, /en:/);
    assert.doesNotMatch(source, /https?:\/\//);
  }
});

test("portal components render their route-specific hero mapping", async () => {
  const bmw = await readFile(new URL("../src/components/BMWPortalPage.astro", import.meta.url), "utf8");
  assert.match(bmw, /bmwHeroImages/);
  assert.match(bmw, /hero\.image/);
  assert.match(bmw, /hero\.alt\[lang\]/);
  assert.doesNotMatch(bmw, /workshop-detail\.jpg/);

  const garden = await readFile(new URL("../src/components/GardenPortalPage.astro", import.meta.url), "utf8");
  assert.match(garden, /gardenHeroImages/);
  assert.match(garden, /hero\.image/);
  assert.match(garden, /hero\.alt\[lang\]/);
  assert.doesNotMatch(garden, /garden-aerial\.jpg/);
});
