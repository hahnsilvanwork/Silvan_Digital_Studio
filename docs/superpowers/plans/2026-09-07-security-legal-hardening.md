# Security and legal hardening implementation plan

Approved scope: implement the findings in the 7 September audit and deliver a detailed Swiss legal/business review. The user's implementation request approves this scope; no repeated design approval is needed.

Architecture: preserve the static site and inquiry handoff. Make demos fail closed without JavaScript. Enforce resource policies without breaking static Next hydration. Publish only supportable legal statements; keep account-specific and business-specific decisions in an internal evidence register until confirmed.

## Tasks

- [x] Demo safety: add browser regression coverage for no-JavaScript submission, then disable controls in server HTML until handlers exist; cover all demo forms. Add shared baseline headers to standalone demo packaging. Verify functional demos and source contracts.
- [x] Main hardening: evaluate installed Next CSP guidance and actual emitted scripts; implement safe resource restrictions and a verifiable static-script strategy where feasible. Pin Spline runtime integrity, verify real model loading. Pin CI actions and add update automation.
- [x] Legal research: consult current primary Swiss/EU and provider sources; create a detailed applicability/findings matrix, evidence register, business procedures and usable offer/contract/data-processing drafts. Separate legal duty, recommendation and unresolved fact.
- [x] Public text: revise both languages for identity, nonbinding inquiry, pricing transparency, rights, contact processors, hosting, overseas transfers, retention and optional features. Do not assert registrations, exemptions, provider guarantees or product certifications without evidence.
- [x] Verification: lint, typecheck, unit tests, fresh full build and targeted production browser tests including blocked scripts and actual CSP. Review diff for security correctness and legal consistency. Record external actions that cannot be performed from project access.

Files: demo source forms/tests; scripts/prepare-vercel-demos.mjs; next.config.ts; scripts/security-headers.mjs; Spline loader/tests; workflows; src/content legal content; docs/legal/*; docs/OPERATIONS.md.

Release boundary: no paid plan purchase, government filing, messages to third parties or invented legal facts. Deployment requires a tested build and a concrete assessment of unresolved publication facts. Research drafts are not automatically incorporated into existing customer contracts.
