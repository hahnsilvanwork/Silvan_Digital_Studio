import test from "node:test";
import assert from "node:assert/strict";
import {
  bmwOpeningHours,
  company,
  dataProvenance,
  externalLinks,
  people,
} from "../src/data/company.ts";
import { organizationSchema } from "../src/lib/schema.ts";

test("company exposes the clearly fictional contact data", () => {
  assert.equal(company.name, "Falkenried Gruppe");
  assert.equal(company.uid, "Fiktives Beispielunternehmen");
  assert.equal(company.address.street, "Musterweg 12");
  assert.equal(company.address.postalCode, "8165");
  assert.equal(company.address.locality, "Zürcher Unterland");
  assert.equal(company.phone.display, "Telefon auf Anfrage");
  assert.equal(company.phone.href, "#demo-hinweis");
  assert.equal(company.email, "info@falkenried.example");
});

test("BMW opening hours preserve split business hours and closures", () => {
  assert.deepEqual(bmwOpeningHours.monday, [["07:30", "12:00"], ["13:00", "17:30"]]);
  assert.deepEqual(bmwOpeningHours.friday, [["07:30", "12:00"], ["13:00", "17:00"]]);
  assert.deepEqual(bmwOpeningHours.saturday, [["08:30", "13:00"]]);
  assert.deepEqual(bmwOpeningHours.sunday, []);
  assert.equal(bmwOpeningHours.lastSaturdayClosed, true);
});

test("verified people have unique ids and non-empty roles", () => {
  assert.deepEqual(Object.keys(people).sort(), ["jonas-lindberg", "lukas-falkenried", "mara-linden", "nora-feldmann"]);
  for (const [id, person] of Object.entries(people)) {
    assert.equal(person.id, id);
    assert.ok(person.name.trim());
    assert.ok(person.roles.de.length > 0);
    assert.ok(person.roles.en.length > 0);
  }
});

test("external operational links are secure and provenance is dated", () => {
  for (const [key, url] of Object.entries(externalLinks)) {
    if (key === "bmwAppointment") assert.equal(url, "/kontakt/#allgemeine-anfrage");
    else assert.equal(new URL(url).hostname, "falkenried.example");
  }
  assert.equal(dataProvenance.checkedAt, "2026-08-24");
  assert.ok(dataProvenance.sources.length >= 7);
  assert.equal(dataProvenance.requiresLaunchConfirmation, true);
});

test("organization schema uses the central legal data", () => {
  const schema = organizationSchema("de");
  assert.equal(schema.telephone, company.phone.international);
  assert.equal(schema.email, company.email);
  assert.equal(schema.vatID, company.uid);
  assert.equal(schema.address.streetAddress, company.address.street);
});
