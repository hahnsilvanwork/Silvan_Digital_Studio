import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

test("company content uses concept news, empty jobs and fictional partners", async () => {
  const data = await readFile(new URL("../src/data/company-content.ts", import.meta.url), "utf8");
  for (const slug of ["gewerbeschau-dielsdorf", "welcher-antrieb-passt", "feriencheck"]) assert.match(data, new RegExp(slug));
  assert.match(data, /jobs[^=]*=\s*\[\]/);
  for (const partner of ["Talblick Mobilität", "Lindenklar Reinigung"]) assert.match(data, new RegExp(partner));
});

test("all company content pages have direct language counterparts", async () => {
  const pages = ["aktuelles", "veranstaltungen", "jobs", "partner", "en/news", "en/events", "en/jobs", "en/partners"];
  await Promise.all(pages.map((path) => access(new URL(`../src/pages/${path}/index.astro`, import.meta.url))));
  const routes = await readFile(new URL("../src/i18n/nav.ts", import.meta.url), "utf8");
  for (const key of ["news", "events", "jobs", "partners"]) assert.match(routes, new RegExp(`${key}:`));
});

test("footer exposes company content without changing the header nav", async () => {
  const footer = await readFile(new URL("../src/components/Footer.astro", import.meta.url), "utf8");
  for (const key of ["news", "events", "jobs", "partners"]) assert.match(footer, new RegExp(`routes\\.${key}`));
  const header = await readFile(new URL("../src/components/Header.astro", import.meta.url), "utf8");
  assert.doesNotMatch(header, /routes\.(news|events|jobs|partners)/);
});
