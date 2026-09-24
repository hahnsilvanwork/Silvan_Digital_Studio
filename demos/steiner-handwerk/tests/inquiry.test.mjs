import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const path = new URL("../lib/inquiry.ts", import.meta.url);
const source = existsSync(path) ? readFileSync(path, "utf8") : "";
const sandbox = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  sandbox,
);
const { validateInquiry, normalizeInquiry } = sandbox.exports;
const valid = {
  name: "Anna Beispiel",
  email: "anna@example.ch",
  message: "Wir möchten unser Wohnzimmer renovieren.",
  location: "",
  timeframe: "",
};

test("required fields reject whitespace and enforce trimmed boundaries", () => {
  assert.equal(typeof validateInquiry, "function");
  assert.equal(Object.keys(validateInquiry(valid)).length, 0);
  for (const field of ["name", "email", "message"]) {
    assert.ok(validateInquiry({ ...valid, [field]: "   " })[field]);
  }
  for (const [field, limit] of [
    ["name", 100],
    ["message", 2000],
    ["location", 150],
    ["timeframe", 150],
  ]) {
    assert.equal(
      validateInquiry({ ...valid, [field]: `  ${"x".repeat(limit)}  ` })[field],
      undefined,
    );
    assert.ok(
      validateInquiry({ ...valid, [field]: "x".repeat(limit + 1) })[field],
    );
  }
});
test("email rejects malformed and oversized values", () => {
  for (const email of [
    "anna",
    "anna@",
    "@example.ch",
    "a b@example.ch",
    "anna@example",
    "x".repeat(244) + "@example.ch",
  ]) {
    assert.ok(validateInquiry({ ...valid, email }).email, email);
  }
  assert.equal(
    validateInquiry({ ...valid, email: "  anna+haus@example.ch  " }).email,
    undefined,
  );
});
test("normalization trims every field without modifying the draft", () => {
  assert.equal(typeof normalizeInquiry, "function");
  const draft = {
    ...valid,
    name: " Anna ",
    message: "  Erste Zeile\nZweite Zeile  ",
    location: " Zürich ",
    timeframe: " Herbst ",
  };
  const normalized = normalizeInquiry(draft);
  assert.equal(normalized.name, "Anna");
  assert.equal(normalized.message, "Erste Zeile\nZweite Zeile");
  assert.equal(normalized.location, "Zürich");
  assert.equal(normalized.timeframe, "Herbst");
  assert.equal(draft.name, " Anna ");
});
