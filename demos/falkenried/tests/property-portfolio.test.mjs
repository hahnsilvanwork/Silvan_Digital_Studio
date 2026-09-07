import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const directory = new URL("../src/content/properties/", import.meta.url);

async function loadProperties() {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));
  return Promise.all(files.map(async (file) => JSON.parse(await readFile(new URL(file, directory), "utf8"))));
}

test("portfolio contains the five concept properties with unique stable identities", async () => {
  const properties = await loadProperties();
  assert.equal(properties.length, 5);
  assert.equal(new Set(properties.map(({ id }) => id)).size, 5);
  assert.equal(new Set(properties.map(({ slug }) => slug)).size, 5);
  assert.deepEqual(new Set(properties.map(({ location }) => location)), new Set(["Schleinikon", "Boppelsen", "Zürcher Unterland"]));
});

test("every property has bilingual editorial content and explicit example sources", async () => {
  for (const property of await loadProperties()) {
    assert.ok(property.title.de && property.title.en, property.id);
    assert.ok(property.description.de && property.description.en, property.id);
    assert.ok(property.address && property.types.length && property.facts.length, property.id);
    assert.ok(property.image.alt.de && property.image.alt.en && property.image.classification, property.id);
    assert.equal(new URL(property.source.url).hostname, "falkenried.example", property.id);
    assert.match(property.source.checkedAt, /^2026-08-24$/, property.id);
  }
});

test("the permanent portfolio never claims current availability or prices", async () => {
  const forbiddenKeys = ["price", "rent", "availability", "availableFrom", "monthlyRent"];
  for (const property of await loadProperties()) {
    for (const key of forbiddenKeys) assert.equal(Object.hasOwn(property, key), false, `${property.id}: ${key}`);
  }
});
