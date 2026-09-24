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

test("browser script reviews the enquiry without sending, storing, or resetting data", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /event\.preventDefault\(\)/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
  assert.match(source, /Nothing has been sent or stored/);
  assert.doesNotMatch(source, /form\.reset\(\)/);
  assert.match(source, /description\.textContent = value/);
  assert.match(source, /control\.dataset\.label/);
  assert.match(source, /form\.dataset\.objectId/);
  assert.match(source, /form\.dataset\.source/);
  assert.match(source, /data-form-edit/);
  assert.match(source, /data-form-clear/);
  assert.match(source, /control\.value = ""/);
  assert.match(source, /invalid\[0\]\.focus\(\)/);
  assert.match(source, /aria-describedby/);
  assert.match(source, /control\.validity\.typeMismatch/);
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
