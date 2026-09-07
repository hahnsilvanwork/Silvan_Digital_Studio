import test from "node:test";
import assert from "node:assert/strict";
import { buildFormMetadata, isWeb3FormsEnabled } from "../src/lib/form-config.ts";

test("missing or placeholder keys keep forms in demo mode", () => {
  assert.equal(isWeb3FormsEnabled(undefined), false);
  assert.equal(isWeb3FormsEnabled(""), false);
  assert.equal(isWeb3FormsEnabled("TODO-REPLACE-WITH-WEB3FORMS-KEY"), false);
});

test("a configured key enables delivery", () => {
  assert.equal(isWeb3FormsEnabled("12345678-1234-1234-1234-123456789abc"), true);
});

test("metadata always includes area language and source", () => {
  assert.deepEqual(buildFormMetadata({
    area: "garden",
    lang: "de",
    source: "/gartenbau/",
  }), {
    area: "garden",
    language: "de",
    source: "/gartenbau/",
  });
});

test("metadata includes an object id only for a concrete inquiry", () => {
  assert.deepEqual(buildFormMetadata({
    area: "real-estate",
    lang: "en",
    source: "/en/immobilien/",
    objectId: "offer-gwh-52",
  }), {
    area: "real-estate",
    language: "en",
    source: "/en/immobilien/",
    object_id: "offer-gwh-52",
  });
});
