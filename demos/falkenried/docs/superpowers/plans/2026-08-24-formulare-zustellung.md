# Formulare und Zustellung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die sechs bestehenden DE-/EN-Formulare ehrlich zwischen Demo- und Aktivmodus umschalten und bei vorhandenem Web3Forms-Key robuste, datenschutzkonforme Anfragen an `info@falkenried.example` senden.

**Architecture:** Eine reine TypeScript-Hilfsdatei kapselt Key-Erkennung und Metadaten, damit das Verhalten mit `node:test` geprüft werden kann. `ContactForm.astro` rendert abhängig von der Build-Umgebung einen deaktivierten Demo-Zustand oder ein aktives Formular; das Browser-Skript verarbeitet ausschließlich aktive Formulare. Seiten liefern Bereich, Quelle und optionale Objekt-ID als explizite Props.

**Tech Stack:** Astro 7, TypeScript 6, Node.js `node:test`, Web3Forms API, Tailwind CSS 4

---

## Dateistruktur

- Create: `src/lib/form-config.ts` – Key-Prüfung, Betreff- und Metadatenvertrag
- Create: `tests/form-config.test.ts` – echte Unit-Tests der Konfiguration
- Create: `tests/contact-form-contract.test.mjs` – statischer Komponenten- und Seitenvertrag
- Modify: `src/components/ContactForm.astro` – Demo-/Aktivmodus, Datenschutz, Honeypot und robuste Zustände
- Modify: `src/pages/kontakt.astro`, `src/pages/en/contact.astro` – allgemeine Quelle und Bereich
- Modify: `src/pages/gartenbau.astro`, `src/pages/en/gartenbau.astro` – Gartenbauquelle und Bereich
- Modify: `src/pages/immobilien.astro`, `src/pages/en/immobilien.astro` – Immobilienquelle und Bereich
- Modify: `.env.example` – sichere Aktivierungsanleitung
- Modify: `package.json` – einheitliches Testskript
- Modify: `CONTENT-TODO.md` – technischen Stand dokumentieren

### Task 1: Formularkonfiguration test-first definieren

**Files:**
- Create: `tests/form-config.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Testskript erweitern**

In `package.json` ergänzen:

```json
"test:forms": "node --experimental-strip-types --test tests/form-config.test.ts"
```

- [ ] **Step 2: Fehlschlagende Unit-Tests schreiben**

`tests/form-config.test.ts`:

```ts
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
```

- [ ] **Step 3: RED prüfen**

Run: `npm run test:forms`\
Expected: FAIL mit `ERR_MODULE_NOT_FOUND` für `src/lib/form-config.ts`.

- [ ] **Step 4: Testgerüst committen**

```powershell
git add package.json tests/form-config.test.ts
git commit -m "test: define form delivery contract"
```

### Task 2: Reine Formularkonfiguration implementieren

**Files:**
- Create: `src/lib/form-config.ts`
- Test: `tests/form-config.test.ts`

- [ ] **Step 1: Hilfsdatei implementieren**

`src/lib/form-config.ts`:

```ts
import type { Lang } from "../i18n/nav";

export type FormArea = "general" | "bmw" | "garden" | "real-estate";

interface MetadataInput {
  area: FormArea;
  lang: Lang;
  source: string;
  objectId?: string;
}

const PLACEHOLDER_KEY = "TODO-REPLACE-WITH-WEB3FORMS-KEY";

export function isWeb3FormsEnabled(key: string | undefined) {
  const value = key?.trim() ?? "";
  return value.length >= 20 && value !== PLACEHOLDER_KEY;
}

export function buildFormMetadata({ area, lang, source, objectId }: MetadataInput) {
  return {
    area,
    language: lang,
    source,
    ...(objectId ? { object_id: objectId } : {}),
  };
}
```

- [ ] **Step 2: Contract-Testdatei als leeres gültiges Testmodul anlegen**

`tests/contact-form-contract.test.mjs`:

```js
import test from "node:test";

test("contact form contract placeholder", () => {});
```

Danach `test:forms` in `package.json` auf beide Testdateien erweitern:

```json
"test:forms": "node --experimental-strip-types --test tests/form-config.test.ts tests/contact-form-contract.test.mjs"
```

- [ ] **Step 3: GREEN prüfen**

Run: `npm run test:forms`\
Expected: 5 Tests PASS, 0 FAIL.

- [ ] **Step 4: Commit**

```powershell
git add package.json src/lib/form-config.ts tests/contact-form-contract.test.mjs
git commit -m "feat: add form delivery configuration"
```

### Task 3: Demo- und Aktivzustand der Komponente absichern

**Files:**
- Modify: `tests/contact-form-contract.test.mjs`
- Modify: `src/components/ContactForm.astro`

- [ ] **Step 1: Statischen Vertrag test-first schreiben**

`tests/contact-form-contract.test.mjs` vollständig ersetzen:

```js
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

test("browser script only submits enabled forms and preserves data on failure", async () => {
  const source = await readSource("src/components/ContactForm.astro");
  assert.match(source, /form\.dataset\.enabled !== "true"/);
  assert.match(source, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(source, /if \(data\.success\) form\.reset\(\)/);
});
```

- [ ] **Step 2: RED prüfen**

Run: `npm run test:forms`\
Expected: 3 Contract-Tests FAIL, 4 Unit-Tests PASS.

- [ ] **Step 3: Props und Serverzustand in `ContactForm.astro` implementieren**

Imports und Props:

```astro
---
import type { Lang } from "../i18n/nav";
import { routes } from "../i18n/nav";
import { buildFormMetadata, isWeb3FormsEnabled, type FormArea } from "../lib/form-config";

interface Props {
  lang: Lang;
  area: FormArea;
  source: string;
  objectId?: string;
  subject: string;
  fields: Field[];
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

const { lang, area, source, objectId, subject, fields, submitLabel, successMessage, errorMessage } = Astro.props;
const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY?.trim();
const isEnabled = isWeb3FormsEnabled(accessKey);
const metadata = buildFormMetadata({ area, lang, source, objectId });
const demoMessage = lang === "de"
  ? "Demo: Das Formular wird vor dem Livegang aktiviert. Bitte kontaktieren Sie uns derzeit per Telefon oder E-Mail."
  : "Demo: This form will be activated before launch. Please contact us by phone or email for now.";
const privacyLabel = lang === "de" ? "Ich habe die Datenschutzerklärung gelesen." : "I have read the privacy policy.";
const disabledLabel = lang === "de" ? "Formular noch nicht aktiviert" : "Form not activated yet";
---
```

- [ ] **Step 4: Formular-Markup umstellen**

Das `<form>` erhält:

```astro
data-enabled={String(isEnabled)}
```

Versteckte Felder:

```astro
{isEnabled && <input type="hidden" name="access_key" value={accessKey} />}
<input type="hidden" name="subject" value={subject} />
<input type="hidden" name="area" value={metadata.area} />
<input type="hidden" name="language" value={metadata.language} />
<input type="hidden" name="source" value={metadata.source} />
<input type="hidden" name="object_id" value={metadata.object_id ?? ""} />
<input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />
```

Vor dem Button ergänzen:

```astro
<label class="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
  <input type="checkbox" name="privacy_consent" value="accepted" required class="mt-1" />
  <span>{privacyLabel} <a href={routes.datenschutz[lang]} class="underline">{lang === "de" ? "Datenschutz" : "Privacy"}</a></span>
</label>
{!isEnabled && <p class="rounded-lg bg-[var(--color-surface-low)] p-4 text-sm text-[var(--color-ink-muted)]">{demoMessage}</p>}
<button type="submit" class="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50" disabled={!isEnabled}>
  {isEnabled ? submitLabel : disabledLabel}
</button>
```

- [ ] **Step 5: Browser-Skript absichern**

Am Anfang des Submit-Handlers nach `preventDefault()`:

```ts
if (form.dataset.enabled !== "true") return;
```

Nur bei `data.success` wird `form.reset()` aufgerufen. Bei HTTP-Fehlern oder `data.success === false` bleibt der Inhalt erhalten. Der ursprüngliche Buttontext wird im `finally` wiederhergestellt.

- [ ] **Step 6: GREEN prüfen**

Run: `npm run test:forms`\
Expected: 7 Tests PASS, 0 FAIL.\
Run: `npm run astro -- check`\
Expected: 0 errors.

- [ ] **Step 7: Commit**

```powershell
git add src/components/ContactForm.astro tests/contact-form-contract.test.mjs
git commit -m "feat: add honest form demo and delivery states"
```

### Task 4: Alle sechs Formulare explizit routen

**Files:**
- Modify: `tests/contact-form-contract.test.mjs`
- Modify: `src/pages/kontakt.astro`, `src/pages/en/contact.astro`
- Modify: `src/pages/gartenbau.astro`, `src/pages/en/gartenbau.astro`
- Modify: `src/pages/immobilien.astro`, `src/pages/en/immobilien.astro`

- [ ] **Step 1: Seitenvertrag ergänzen**

In `tests/contact-form-contract.test.mjs`:

```js
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
```

- [ ] **Step 2: RED prüfen**

Run: `npm run test:forms`\
Expected: der neue Seitenvertrag FAIL.

- [ ] **Step 3: Props in allen Formularaufrufen ergänzen**

Deutsch:

```astro
<ContactForm lang={lang} area="general" source="/kontakt/" ... />
<ContactForm lang={lang} area="garden" source="/gartenbau/" ... />
<ContactForm lang={lang} area="real-estate" source="/immobilien/" ... />
```

Englisch:

```astro
<ContactForm lang={lang} area="general" source="/en/contact/" ... />
<ContactForm lang={lang} area="garden" source="/en/gartenbau/" ... />
<ContactForm lang={lang} area="real-estate" source="/en/immobilien/" ... />
```

- [ ] **Step 4: GREEN prüfen und committen**

Run: `npm run test:forms`\
Expected: 8 Tests PASS, 0 FAIL.\
Run: `npm run astro -- check`\
Expected: 0 errors.

```powershell
git add tests/contact-form-contract.test.mjs src/pages/kontakt.astro src/pages/en/contact.astro src/pages/gartenbau.astro src/pages/en/gartenbau.astro src/pages/immobilien.astro src/pages/en/immobilien.astro
git commit -m "feat: route form inquiries by area and source"
```

### Task 5: Aktivierungsdokumentation und Gesamtprüfung

**Files:**
- Modify: `.env.example`
- Modify: `CONTENT-TODO.md`

- [ ] **Step 1: `.env.example` präzisieren**

```dotenv
# Create an access key for info@falkenried.example at https://web3forms.com/.
# Leave empty during demos: forms stay visible but submission remains disabled.
# Configure the same variable in the hosting environment; never commit the real key.
PUBLIC_WEB3FORMS_KEY=
```

- [ ] **Step 2: `CONTENT-TODO.md` aktualisieren**

Dokumentieren:

- Demo-Zustand ohne Key ist technisch abgeschlossen
- echter Versand bleibt bis zur Beschaffung und Hosting-Konfiguration des Keys deaktiviert
- alle Anfragen gehen an `info@falkenried.example`
- Testnachricht nach Key-Aktivierung ist eine Launch-Pflicht

- [ ] **Step 3: Vollständige Verifikation**

```powershell
npm run test:data
npm run test:forms
node --test tests/layout-stability.test.mjs
npm run astro -- check
npm run build
git diff --check
```

Expected:

- Datentests: 5 PASS
- Formulartests: 8 PASS
- Layouttests: 2 PASS
- Astro: 0 errors, 0 warnings
- Build: 19 Seiten, Exit 0
- Diff-Prüfung: Exit 0

- [ ] **Step 4: Demo im laufenden Server prüfen**

Öffnen:

- `http://localhost:4321/kontakt/`
- `http://localhost:4321/gartenbau/`
- `http://localhost:4321/immobilien/`

Erwartet: sichtbare Felder, Datenschutzeinwilligung, Demo-Hinweis, deaktivierter Button, funktionierende Telefon-/E-Mail-Alternativen.

- [ ] **Step 5: Dokumentation committen**

```powershell
git add .env.example CONTENT-TODO.md
git commit -m "docs: document form activation workflow"
```
