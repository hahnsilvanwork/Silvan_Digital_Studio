import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("desktop navigation stays centered when the language changes", async () => {
  const header = await readSource("src/components/Header.astro");

  assert.match(header, /lg:grid-cols-\[minmax\(/);
  assert.match(header, /justify-self-center/);
  assert.match(header, /justify-self-end/);
  assert.match(header, /min-w-\[10rem\]/);
});

test("three-step processes use three centered columns", async () => {
  const processSteps = await readSource("src/components/ProcessSteps.astro");

  assert.match(processSteps, /steps\.length === 3/);
  assert.match(processSteps, /sm:grid-cols-3 lg:grid-cols-3/);
  assert.match(processSteps, /items-center text-center/);
});
