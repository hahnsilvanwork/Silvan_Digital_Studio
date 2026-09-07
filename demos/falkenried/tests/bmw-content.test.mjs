import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";

test("BMW data contains every verified service and station feature", async () => {
  const source = await readFile(new URL("../src/data/bmw.ts", import.meta.url), "utf8");

  for (const id of [
    "holiday-check",
    "climate-service",
    "windscreen",
    "body-damage",
    "rbv",
    "bmw-i",
    "service-plus",
  ]) {
    assert.match(source, new RegExp(`id: [\"']${id}[\"']`));
  }

  for (const id of ["fuel", "charging", "car-wash", "vacuum"]) {
    assert.match(source, new RegExp(`id: [\"']${id}[\"']`));
  }

  assert.match(source, /verifiedOn:\s*["']2026-08-24["']/);
});

test("BMW detail pages have direct German and English counterparts", async () => {
  const pages = [
    "src/pages/bmw-garage/service/index.astro",
    "src/pages/bmw-garage/occasionen/index.astro",
    "src/pages/bmw-garage/servicestation/index.astro",
    "src/pages/bmw-garage/zubehoer/index.astro",
    "src/pages/en/bmw-garage/service/index.astro",
    "src/pages/en/bmw-garage/used-cars/index.astro",
    "src/pages/en/bmw-garage/service-station/index.astro",
    "src/pages/en/bmw-garage/accessories/index.astro",
  ];
  await Promise.all(pages.map((path) => access(new URL(`../${path}`, import.meta.url))));
  const routes = await readFile(new URL("../src/i18n/nav.ts", import.meta.url), "utf8");
  for (const key of ["bmwService", "bmwOccasions", "bmwStation", "bmwAccessories"]) {
    assert.match(routes, new RegExp(`${key}:`));
  }
});

test("BMW section navigation and external embeds are accessible and privacy-first", async () => {
  const sectionNav = await readFile(new URL("../src/components/SectionNav.astro", import.meta.url), "utf8");
  const embed = await readFile(new URL("../src/components/ExternalEmbed.astro", import.meta.url), "utf8");

  assert.match(sectionNav, /aria-label/);
  assert.match(sectionNav, /activePath/);
  assert.match(embed, /DEMO/);
  assert.match(embed, /does not load external vehicle listings/);
  assert.doesNotMatch(embed, /<iframe[^>]+src=/);
  assert.doesNotMatch(embed, /<iframe|fetch\(|createElement/);
});

test("ServiceList accepts immutable content data", async () => {
  const source = await readFile(new URL("../src/components/ServiceList.astro", import.meta.url), "utf8");
  assert.match(source, /items:\s*readonly string\[\]/);
});

test("BMW hubs and FAQs surface the verified portal content", async () => {
  for (const path of ["../src/pages/bmw-garage.astro", "../src/pages/en/bmw-garage.astro"]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    for (const key of ["bmwService", "bmwOccasions", "bmwStation", "bmwAccessories"]) assert.match(source, new RegExp(`routes\\.${key}`));
    assert.doesNotMatch(source, /Textil-Waschanlage|Neu- & Occasionswagen/);
  }
  for (const path of ["../src/pages/faq.astro", "../src/pages/en/faq.astro"]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.match(source, /bmwFaqs/);
  }
});
