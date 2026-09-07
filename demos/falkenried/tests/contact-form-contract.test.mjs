import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("contact form exposes honest demo and active states", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /isWeb3FormsEnabled/);
  assert.match(source, /data-enabled=/);
  assert.match(source, /disabled=\{!isEnabled\}/);
  assert.match(source, /demoMessage/);
  assert.doesNotMatch(source, /TODO-REPLACE-WITH-WEB3FORMS-KEY/);
});

test("contact form requires privacy consent and carries metadata", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /name="privacy_consent"/);
  assert.match(source, /required/);
  assert.match(source, /name="area"/);
  assert.match(source, /name="language"/);
  assert.match(source, /name="source"/);
  assert.match(source, /name="object_id"/);
  assert.match(source, /name="botcheck"/);
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
