# Falkenried — product reference

Updated 24 September 2026. Scope: the Falkenried portfolio demo, not the main SilvanDigital site.

## Purpose and audience

Falkenried is a fictional regional business website demonstrating how three services can share a clear identity: an automotive workshop, landscaping and property. Visitors should quickly choose the relevant area, understand the example services and try an enquiry flow. It is not an operating company directory or a real booking system.

## Structure

German is the default language, with English equivalents under `/en/`. A central route map makes language switches land on the equivalent page. The site includes the homepage, workshop portal and service subpages, garden portal and service subpages, property collection, company concept, FAQ, news, events, jobs, partners, contact and legal pages. Existing `/geschichte/` and `/en/history/` paths now describe the concept rather than asserting a company history.

The homepage introduces the three divisions with photographic links. Division pages provide more detail and routes to enquiries. The property collection supports category filtering and transfers a selected object to its enquiry form. FAQ tabs support arrow keys, Home and End; native disclosures expose individual answers.

## Enquiry contract

All forms are demonstrations. They do not send an enquiry or persist submitted values. JavaScript validates required values, trimmed length and email format, then builds a local summary of the entered fields and page/object context. Users can return to editing without losing values or clear their entries. Validation errors identify the affected controls and focus moves to the first invalid field or the review heading as appropriate.

Forms are disabled in server-rendered HTML and become editable only after the handler preventing submission is installed. Without JavaScript a visible explanation accompanies the disabled form. Do not connect an endpoint, storage, analytics capture or delivery service without a separate product decision and appropriate real-business information.

## Content and trust

The shared layout identifies Falkenried as an invented company and states that no enquiries are sent. Property listings and other business details are illustrative. Homepage copy avoids invented customer quotes, founding dates and longevity claims. Workshop naming must not imply a verified manufacturer partnership. The concept should demonstrate useful interactions without pretending that example offers are live inventory.

Pages default to `noindex, nofollow`. Astro emits static output; the repository's export and demo-preparation scripts adapt paths for embedded and standalone hosting. The configured source domain is a placeholder, so standalone deployment metadata must be checked after preparation rather than inferred from source configuration.

## Maintenance and release checks

Preserve route parity, valid internal links, responsive images, accessible focus states and keyboard navigation. Check both languages, mobile overflow, enlarged text, property filtering and enquiry preselection, form review/edit/clear, and no-JavaScript fallbacks. Build and browser verification results belong in the release audit; this document records behaviour, not a certification or a claim that a deployment succeeded.
