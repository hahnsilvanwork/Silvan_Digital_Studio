import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

test("garden portal has localized planning guidance and bilingual pages", async () => {
  const data = await readFile(new URL("../src/data/garden.ts", import.meta.url), "utf8");
  for (const id of ["design", "maintenance", "containers-transport"]) assert.match(data, new RegExp(`id: [\"']${id}[\"']`));
  assert.doesNotMatch(data, /verifiedOn/);
  const notes = [...data.matchAll(/planningNote: \{ de: "([^"]+)", en: "([^"]+)" \}/g)];
  assert.equal(notes.length, 3, "each garden service needs guidance in both languages");
  for (const [, de, en] of notes) {
    assert.ok(de.length > 80 && en.length > 80, "guidance must explain the project information needed");
    assert.notEqual(de, en);
  }
  const portal = await readFile(new URL("../src/components/GardenPortalPage.astro", import.meta.url), "utf8");
  assert.match(portal, /service\.planningNote\[lang\]/);
  assert.doesNotMatch(portal, /Gärten, die wir gestaltet haben|Gardens we have shaped/);
  const pages = [
    "gartenbau/gartengestaltung", "gartenbau/gartenunterhalt", "gartenbau/mulden-transporte", "gartenbau/referenzen", "gartenbau/tipps",
    "en/gartenbau/garden-design", "en/gartenbau/garden-maintenance", "en/gartenbau/containers-transport", "en/gartenbau/references", "en/gartenbau/tips",
  ];
  await Promise.all(pages.map((path) => access(new URL(`../src/pages/${path}/index.astro`, import.meta.url))));
});

test("garden reference images have bilingual alternative text", async () => {
  const images = await readFile(new URL("../src/data/garden-images.ts", import.meta.url), "utf8");
  assert.match(images, /documentary:\s*true/);
  assert.match(images, /alt:\s*\{\s*de:/);
  assert.match(images, /en:/);
});

test("garden hubs link every new section without unsupported claims", async () => {
  for (const path of ["../src/pages/gartenbau.astro", "../src/pages/en/gartenbau.astro"]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    for (const key of ["gardenDesign", "gardenMaintenance", "gardenTransport", "gardenReferences", "gardenTips"]) assert.match(source, new RegExp(`routes\\.${key}`));
    assert.doesNotMatch(source, /3D-Visualisierung|3D visualisation|Pflegeabos|maintenance contracts/i);
  }
});
