# Stammdaten und Öffnungszeiten Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alle wiederverwendeten Unternehmens-, Kontakt-, Team- und BMW-Öffnungsdaten aus einer zentralen typisierten Quelle beziehen und die offiziellen Live-Angaben auf den bestehenden DE-/EN-Seiten ausgeben.

**Architecture:** `src/data/company.ts` ist die einzige Faktenquelle und exportiert unveränderliche Daten sowie kleine sprachabhängige Formatierungsfunktionen. Astro-Seiten und Schema.org-Helfer importieren diese Fakten. Ein Node-Test lädt die echte TypeScript-Datei und prüft Pflichtwerte, Zeitfenster, Personen-IDs und externe HTTPS-Links, bevor Seiten umgestellt werden.

**Tech Stack:** Astro 7, TypeScript 6, Node.js 22.12 `node:test`, Tailwind CSS 4, `astro check`, `astro build`

---

## Dateistruktur

- Create: `src/data/company.ts` – unveränderliche Fakten, Typen und Formatierungsfunktionen
- Create: `tests/company-data.test.ts` – Datenvertrag und Plausibilitätsprüfungen
- Create: `src/components/ContactPerson.astro` – textbasierte Ansprechpartnerkarte ohne Stockporträt
- Modify: `src/lib/schema.ts` – Schema.org aus zentralen Daten erzeugen
- Modify: `src/pages/impressum.astro`, `src/pages/en/imprint.astro` – UID und zentrale Kontaktdaten
- Modify: `src/pages/kontakt.astro`, `src/pages/en/contact.astro` – Ansprechpartner, Fax und zentrale Kontaktdaten
- Modify: `src/pages/bmw-garage.astro`, `src/pages/en/bmw-garage.astro` – Jonas Lindberg, Öffnungszeiten und externer Terminplaner
- Modify: `src/pages/gartenbau.astro`, `src/pages/en/gartenbau.astro` – Lukas Falkenried ohne Stockporträt
- Modify: `src/pages/immobilien.astro`, `src/pages/en/immobilien.astro` – Mara Linden und Nora Feldmann ohne Stockporträt
- Modify: `src/pages/geschichte.astro`, `src/pages/en/history.astro` – vier bestätigte Kontakte ohne Stockporträts
- Modify: `package.json` – wiederholbarer Datentest
- Modify: `CONTENT-TODO.md` – erledigte Platzhalter entfernen, Launch-Bestätigung beibehalten

### Task 1: Datenvertrag als fehlschlagenden Test festlegen

**Files:**
- Create: `tests/company-data.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Testskript ergänzen**

In `package.json` unter `scripts` ergänzen:

```json
"test:data": "node --experimental-strip-types --test tests/company-data.test.ts"
```

- [ ] **Step 2: Den Datenvertrag schreiben**

`tests/company-data.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  bmwOpeningHours,
  company,
  dataProvenance,
  externalLinks,
  people,
} from "../src/data/company.ts";

test("company exposes the verified legal and contact data", () => {
  assert.equal(company.name, "Falkenried Gruppe");
  assert.equal(company.uid, "Fiktives Beispielunternehmen");
  assert.equal(company.address.street, "Musterweg 12");
  assert.equal(company.address.postalCode, "8165");
  assert.equal(company.address.locality, "Zürcher Unterland");
  assert.equal(company.phone.display, "Telefon auf Anfrage");
  assert.match(company.phone.href, /^tel:\+41/);
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
  assert.deepEqual(Object.keys(people).sort(), ["nora-feldmann", "mara-linden", "jonas-lindberg", "lukas-falkenried"]);
  for (const [id, person] of Object.entries(people)) {
    assert.equal(person.id, id);
    assert.ok(person.name.trim());
    assert.ok(person.roles.de.length > 0);
    assert.ok(person.roles.en.length > 0);
  }
});

test("external operational links are secure and provenance is dated", () => {
  for (const url of Object.values(externalLinks)) assert.match(url, /^https:\/\//);
  assert.equal(dataProvenance.checkedAt, "2026-08-24");
  assert.ok(dataProvenance.sources.length >= 7);
  assert.equal(dataProvenance.requiresLaunchConfirmation, true);
});
```

- [ ] **Step 3: RED prüfen**

Run: `npm run test:data`\
Expected: FAIL mit `ERR_MODULE_NOT_FOUND` für `src/data/company.ts`.

- [ ] **Step 4: Test-Gerüst committen**

```powershell
git add package.json tests/company-data.test.ts
git commit -m "test: define company data contract"
```

### Task 2: Zentrale Faktenquelle implementieren

**Files:**
- Create: `src/data/company.ts`
- Test: `tests/company-data.test.ts`

- [ ] **Step 1: Minimale typisierte Datenquelle schreiben**

`src/data/company.ts`:

```ts
export type Lang = "de" | "en";
export type TimeRange = readonly [opens: string, closes: string];

export const company = {
  name: "Falkenried Gruppe",
  uid: "Fiktives Beispielunternehmen",
  address: {
    street: "Musterweg 12",
    postalCode: "8165",
    locality: "Zürcher Unterland",
    region: "ZH",
    country: "CH",
  },
  phone: { display: "Telefon auf Anfrage", international: "DEMO", href: "tel:DEMO" },
  fax: { display: "Nicht verf?gbar", international: "DEMO" },
  email: "info@falkenried.example",
} as const;

export const externalLinks = {
  corporate: "https://falkenried.example",
  garage: "https://falkenried.example",
  garden: "https://falkenried.example",
  bmwAppointment: "https://plan.soft-nrg.com/group/Li8GQSzNltgAKXob-RNkuJzMnSdECQI2mJGL8-Sk8lluIZ7zOitg4g/signin",
} as const;

export const people = {
  "jonas-lindberg": { id: "jonas-lindberg", name: "Jonas Lindberg", roles: { de: ["Geschäftsführer", "Verkäufer", "Serviceberater BMW"], en: ["Managing Director", "Sales Consultant", "BMW Service Advisor"] } },
  "lukas-falkenried": { id: "lukas-falkenried", name: "Lukas Falkenried", roles: { de: ["Gartenbau", "Technischer Unterhalt Immobilien"], en: ["Landscaping", "Technical Property Maintenance"] } },
  "mara-linden": { id: "mara-linden", name: "Mara Linden", roles: { de: ["Geschäftsführerin", "Immobilien"], en: ["Managing Director", "Real Estate"] } },
  "nora-feldmann": { id: "nora-feldmann", name: "Nora Feldmann", roles: { de: ["Sachbearbeiterin Immobilien"], en: ["Real Estate Administrator"] } },
} as const;

export const bmwOpeningHours = {
  monday: [["07:30", "12:00"], ["13:00", "17:30"]],
  tuesday: [["07:30", "12:00"], ["13:00", "17:30"]],
  wednesday: [["07:30", "12:00"], ["13:00", "17:30"]],
  thursday: [["07:30", "12:00"], ["13:00", "17:30"]],
  friday: [["07:30", "12:00"], ["13:00", "17:00"]],
  saturday: [["08:30", "13:00"]],
  sunday: [],
  lastSaturdayClosed: true,
} as const satisfies Record<string, readonly TimeRange[] | boolean>;

export const dataProvenance = {
  checkedAt: "2026-08-24",
  requiresLaunchConfirmation: true,
  sources: [
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
  ],
} as const;

export function formatAddress(separator = ", ") {
  return `${company.address.street}${separator}${company.address.postalCode} ${company.address.locality}`;
}

export function formatRoles(person: keyof typeof people, lang: Lang) {
  return people[person].roles[lang].join(lang === "de" ? ", " : ", ");
}
```

- [ ] **Step 2: GREEN prüfen**

Run: `npm run test:data`\
Expected: 4 Tests PASS, 0 FAIL.

- [ ] **Step 3: Typprüfung ausführen**

Run: `npm run astro -- check`\
Expected: 0 errors.

- [ ] **Step 4: Datenquelle committen**

```powershell
git add src/data/company.ts
git commit -m "feat: centralize verified company data"
```

### Task 3: Schema.org und rechtliche Seiten umstellen

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `src/pages/impressum.astro`
- Modify: `src/pages/en/imprint.astro`
- Test: `tests/company-data.test.ts`

- [ ] **Step 1: Schema-Erwartungen zuerst ergänzen**

In `tests/company-data.test.ts` importieren:

```ts
import { organizationSchema } from "../src/lib/schema.ts";
```

Test ergänzen:

```ts
test("organization schema uses the central legal data", () => {
  const schema = organizationSchema("de");
  assert.equal(schema.telephone, company.phone.international);
  assert.equal(schema.email, company.email);
  assert.equal(schema.vatID, company.uid);
  assert.equal(schema.address.streetAddress, company.address.street);
});
```

- [ ] **Step 2: RED prüfen**

Run: `npm run test:data`\
Expected: FAIL, weil `vatID` fehlt und die E-Mail noch `info@falkenried.ch` lautet.

- [ ] **Step 3: `src/lib/schema.ts` zentralisieren**

`company` und `bmwOpeningHours` importieren. Im `BASE` ersetzen:

```ts
import { bmwOpeningHours, company } from "../data/company";

const BASE = {
  "@context": "https://schema.org",
  name: company.name,
  url: "https://falkenried.example",
  logo: "https://falkenried.example",
  telephone: company.phone.international,
  email: company.email,
  vatID: company.uid,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    addressCountry: company.address.country,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: bmwOpeningHours.monday[0][0], closes: bmwOpeningHours.monday[1][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: bmwOpeningHours.friday[0][0], closes: bmwOpeningHours.friday[1][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: bmwOpeningHours.saturday[0][0], closes: bmwOpeningHours.saturday[0][1] },
  ],
};
```

- [ ] **Step 4: Impressum und Imprint umstellen**

Beide Seiten importieren `company` und `formatAddress`. Hart codierte Firma/Kontakte durch `company.name`, `formatAddress("<br />")` nicht als HTML-String, sondern durch einzelne Adressfelder, `company.phone`, `company.email` und `company.uid` ersetzen. Im deutschen Text lautet die UID-Zeile:

```astro
Handelsregister-Nr. / UID: <strong>{company.uid}</strong><br />
Sitz: {company.address.locality}, Kanton Zürich
```

Im englischen Text:

```astro
Commercial Register No. / UID: <strong>{company.uid}</strong><br />
Registered office: {company.address.locality}, Canton of Zurich
```

- [ ] **Step 5: GREEN und Astro-Prüfung**

Run: `npm run test:data`\
Expected: 5 Tests PASS.\
Run: `npm run astro -- check`\
Expected: 0 errors.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/schema.ts src/pages/impressum.astro src/pages/en/imprint.astro tests/company-data.test.ts
git commit -m "feat: publish verified legal company data"
```

### Task 4: Textbasierte Ansprechpartner-Komponente

**Files:**
- Create: `src/components/ContactPerson.astro`
- Modify: `src/pages/bmw-garage.astro`, `src/pages/en/bmw-garage.astro`
- Modify: `src/pages/gartenbau.astro`, `src/pages/en/gartenbau.astro`
- Modify: `src/pages/immobilien.astro`, `src/pages/en/immobilien.astro`
- Modify: `src/pages/geschichte.astro`, `src/pages/en/history.astro`

- [ ] **Step 1: Statische RED-Prüfung ausführen**

Run:

```powershell
Select-String -Path src/pages/*.astro,src/pages/en/*.astro -Pattern 'Vorname Nachname','First Last'
```

Expected: Treffer in BMW, Immobilien und Geschichte/History.

- [ ] **Step 2: Komponente erstellen**

`src/components/ContactPerson.astro`:

```astro
---
interface Props {
  name: string;
  roles: readonly string[];
  accentVar: string;
  dark?: boolean;
}

const { name, roles, accentVar, dark = false } = Astro.props;
---

<article class:list={["rounded-lg border p-6", dark ? "border-white/20 bg-white/5" : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)]"]}>
  <div class="w-10 h-1 mb-5" style={`background-color: var(${accentVar})`}></div>
  <h3 class="font-display text-lg font-semibold">{name}</h3>
  <p class:list={["mt-2 text-sm leading-relaxed", dark ? "text-white/70" : "text-[var(--color-ink-muted)]"]}>
    {roles.join(" · ")}
  </p>
</article>
```

- [ ] **Step 3: Bereichsseiten umstellen**

Auf jeder betroffenen Seite `TeamCard` und die zugehörigen Stockbild-Imports entfernen, `ContactPerson` und `people` importieren. Verwenden:

```astro
<ContactPerson name={people["jonas-lindberg"].name} roles={people["jonas-lindberg"].roles[lang]} accentVar={accent} dark />
```

```astro
<ContactPerson name={people["lukas-falkenried"].name} roles={people["lukas-falkenried"].roles[lang]} accentVar={accent} />
```

```astro
<ContactPerson name={people["mara-linden"].name} roles={people["mara-linden"].roles[lang]} accentVar={accent} />
<ContactPerson name={people["nora-feldmann"].name} roles={people["nora-feldmann"].roles[lang]} accentVar={accent} />
```

Geschichte/History zeigt alle vier Personen in drei Bereichsgruppen. Keine Person erhält ein Stockporträt.

- [ ] **Step 4: Platzhalterprüfung GREEN**

Run:

```powershell
$hits = Select-String -Path src/pages/*.astro,src/pages/en/*.astro -Pattern 'Vorname Nachname','First Last'; if ($hits) { $hits; exit 1 }
```

Expected: Exit 0, keine Ausgabe.

- [ ] **Step 5: Astro-Prüfung und Commit**

Run: `npm run astro -- check`\
Expected: 0 errors.

```powershell
git add src/components/ContactPerson.astro src/pages/bmw-garage.astro src/pages/en/bmw-garage.astro src/pages/gartenbau.astro src/pages/en/gartenbau.astro src/pages/immobilien.astro src/pages/en/immobilien.astro src/pages/geschichte.astro src/pages/en/history.astro
git commit -m "feat: replace team placeholders with verified contacts"
```

### Task 5: BMW-Terminplaner und Öffnungszeiten ausgeben

**Files:**
- Modify: `src/pages/bmw-garage.astro`
- Modify: `src/pages/en/bmw-garage.astro`

- [ ] **Step 1: RED-Prüfung für Terminlink**

Run:

```powershell
Select-String -Path src/pages/bmw-garage.astro,src/pages/en/bmw-garage.astro -SimpleMatch 'externalLinks.bmwAppointment'
```

Expected: keine Treffer.

- [ ] **Step 2: Termin-CTAs korrigieren**

`externalLinks` und `bmwOpeningHours` importieren. Beide primären Termin-CTAs erhalten:

```astro
primaryCta={{ label: lang === "de" ? "Online-Termin buchen" : "Book online", href: externalLinks.bmwAppointment }}
```

Der zweite Terminlink verwendet ebenfalls `externalLinks.bmwAppointment`, `target="_blank"` und `rel="noopener noreferrer"`. Der Prozessschritt sagt ausdrücklich, dass der Termin im externen BMW-Planer gewählt wird.

- [ ] **Step 3: Öffnungszeiten-Sektion ergänzen**

Vor der Teamsektion eine kompakte Tabelle ausgeben:

```astro
<section class="py-[var(--spacing-section-gap)] bg-[var(--color-surface)]">
  <div class="max-w-3xl mx-auto px-6 lg:px-16">
    <h2 class="font-display text-3xl font-semibold mb-8">Öffnungszeiten Garage</h2>
    <dl class="divide-y divide-[var(--color-outline-variant)]/40">
      <div class="flex justify-between py-4 gap-6"><dt>Mo.–Do.</dt><dd>07:30–12:00 · 13:00–17:30</dd></div>
      <div class="flex justify-between py-4 gap-6"><dt>Fr.</dt><dd>07:30–12:00 · 13:00–17:00</dd></div>
      <div class="flex justify-between py-4 gap-6"><dt>Sa.</dt><dd>08:30–13:00</dd></div>
      <div class="flex justify-between py-4 gap-6"><dt>So.</dt><dd>geschlossen</dd></div>
    </dl>
    <p class="text-sm text-[var(--color-ink-muted)] mt-5">Jeweils am letzten Samstag im Monat geschlossen. Sonderöffnungszeiten vor dem Besuch prüfen.</p>
  </div>
</section>
```

Die englische Seite erhält dieselben Fakten mit englischen Labels. Werte sollen aus `bmwOpeningHours` formatiert werden; die ausgeschriebenen Zeiten im Snippet zeigen die erwartete Ausgabe.

- [ ] **Step 4: GREEN und Typprüfung**

Run: `Select-String -Path src/pages/bmw-garage.astro,src/pages/en/bmw-garage.astro -SimpleMatch 'externalLinks.bmwAppointment'`\
Expected: mindestens je zwei Treffer.\
Run: `npm run astro -- check`\
Expected: 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/bmw-garage.astro src/pages/en/bmw-garage.astro
git commit -m "feat: add verified BMW hours and booking link"
```

### Task 6: Kontaktseiten zentralisieren

**Files:**
- Modify: `src/pages/kontakt.astro`
- Modify: `src/pages/en/contact.astro`

- [ ] **Step 1: RED-Prüfung für zentrale Daten**

Run:

```powershell
Select-String -Path src/pages/kontakt.astro,src/pages/en/contact.astro -SimpleMatch 'company.fax.display','people[division.person]'
```

Expected: keine Treffer.

- [ ] **Step 2: Divisionsdaten mit Personen verknüpfen**

`company` und `people` importieren. `divisions` erhält `person`:

```ts
const divisions = [
  { name: "Autowerkstatt", person: "jonas-lindberg", accent: "--color-bmw-text", description: "Service & Verkauf", cta: "Termin vereinbaren" },
  { name: "Gartenbau", person: "lukas-falkenried", accent: "--color-garden", description: "Planung & Pflege", cta: "Beratung anfordern" },
  { name: "Immobilien", person: "mara-linden", accent: "--color-realestate", description: "Vermietung & Verwaltung", cta: "Objekte ansehen" },
] as const;
```

Jede Karte zeigt `people[division.person].name` und die sprachabhängigen Rollen. Telefon und E-Mail kommen aus `company`. Die BMW-Karte verlinkt direkt zum externen Terminplaner; Gartenbau und Immobilien bleiben beim Formularanker.

- [ ] **Step 3: Hauptkontakt ergänzen**

Adresse, Telefon und E-Mail aus `company` ausgeben und Fax hinzufügen:

```astro
<div>
  <p class="label-caps text-[var(--color-ink-muted)] mb-2">Fax</p>
  <p>{company.fax.display}</p>
</div>
```

- [ ] **Step 4: GREEN, Typprüfung und Commit**

Run: `npm run astro -- check`\
Expected: 0 errors.

```powershell
git add src/pages/kontakt.astro src/pages/en/contact.astro
git commit -m "feat: centralize contact page facts"
```

### Task 7: Dokumentation und vollständige Verifikation

**Files:**
- Modify: `CONTENT-TODO.md`

- [ ] **Step 1: Erledigte Platzhalter aus der Aufgabenliste entfernen**

Teamnamen und UID als technisch erledigt markieren. Beibehalten:

- echte Porträtfotos fehlen weiterhin
- Live-Angaben vor Launch nochmals bestätigen
- Sonderöffnungszeiten benötigen einen Pflegeprozess
- Formulare, Immobilienangebote, Recht und Redirects bleiben offen

- [ ] **Step 2: Alle Prüfungen frisch ausführen**

```powershell
npm run test:data
npm run astro -- check
npm run build
$hits = Select-String -Path src/pages/*.astro,src/pages/en/*.astro -Pattern 'Vorname Nachname','First Last','\[TODO[^\]]*UID'; if ($hits) { $hits; exit 1 }
git diff --check
```

Expected:

- Datentests: 5 PASS, 0 FAIL
- Astro: 0 errors
- Build: Exit 0
- Platzhaltersuche: Exit 0 ohne Treffer
- Diff-Prüfung: Exit 0

- [ ] **Step 3: Abschluss-Commit**

```powershell
git add CONTENT-TODO.md
git commit -m "docs: update verified content tasks"
```
