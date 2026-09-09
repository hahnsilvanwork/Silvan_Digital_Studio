import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("contact form is locked before its cancellation handler is installed", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /<fieldset disabled/);
  assert.match(source, /<noscript>/);
  assert.ok(source.indexOf('form.addEventListener("submit"') < source.indexOf('fields.disabled = false'));
  assert.match(source, /https:\/\/silvandigital\.ch\/privacy/);
  assert.doesNotMatch(source, /access_key|privacy_consent|isWeb3FormsEnabled|type="hidden"/);
});

test("browser script confirms demo interaction without sending or storing data", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /event\.preventDefault\(\)/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
  assert.match(source, /Nothing has been sent or stored/);
  assert.match(source, /form\.reset\(\)/);
});

test("every form declares area and source metadata", async () => {
  const pages = [
    ["src/pages/kontakt.astro", "general", "/kontakt/"],
    ["src/pages/en/contact.astro", "general", "/en/contact/"],
    ["src/pages/gartenbau.astro", "garden", "/gartenbau/"],
    ["src/pages/en/gartenbau.astro", "garden", "/en/gartenbau/"],
    ["src/pages/immobilien.astro", "real-estate", "/immobilien/"],
    ["src/pages/en/immobilien.astro", "real-estate", "/en/immobilien/"],
  ];

  for (const [path, area, sourcePath] of pages) {
    const source = await readSource(path);
    assert.match(source, new RegExp(`area="${area}"`), path);
    assert.match(source, new RegExp(`source="${sourcePath}"`), path);
  }
});
