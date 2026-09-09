import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/content/services.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const sandbox = { exports: {}, URLSearchParams };
vm.runInNewContext(compiled, sandbox);
const { services, allServices, serviceFromQuery } = sandbox.exports;

test("all twelve service choices round-trip as public query IDs", () => {
  assert.equal(services.length, 4);
  assert.equal(allServices.length, 12);
  assert.equal(new Set(allServices.map(({ id }) => id)).size, 12);
  for (const { id } of allServices) {
    assert.match(id, /^[a-z-]+$/);
    assert.equal(serviceFromQuery(`?service=${id}`), id);
  }
});

test("unknown, duplicate and arbitrary URL input never becomes a service", () => {
  for (const query of ["", "?service=", "?service=unknown", "?service=__proto__", "?service=%3Cscript%3Ealert(1)%3C/script%3E", "?service=damenschnitt&service=keratin", "?service=keratin&service=keratin", "?service=%E0%A4%A", "?message=hello&name=someone"]) {
    assert.equal(serviceFromQuery(query), "", query);
  }
  assert.equal(serviceFromQuery("?message=ignored&service=keratin"), "keratin");
});
