# Audit remediation implementation plan

> Execute the user-approved recommendations in `docs/WEBSITE-AUDIT-2026-09-07.md` using subagent-driven-development for independent areas and inline TDD for the inquiry flow. Approval is the user's request to implement all recommendations.

**Goal:** Resolve verified defects and implement the audit's practical improvements without inventing business facts.

**Architecture:** Preserve static bilingual Next/React architecture and current editorial design. Share inquiry display/message serialization; connect catalogue choice through safe public product identifiers. Add browser protections and operational checks without collecting inquiry data.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Playwright, Vercel static demo exports.

- [x] Inquiry: regressions for hidden URL, localized summary, safe quantity/text lengths; copy and mail alternatives; distinct review/dispatch actions; optional identity fields and clear bundle quantity.
- [x] Catalogue: model-to-inquiry selection and shareable category/model state without personal data in URLs; short external-3D explanation.
- [x] Security/operations: headers, CSP rollout, preview protection, CI for main and all demos, privacy-safe conversion/vitals collection, availability checking and operating guide.
- [x] Demos: repair vulnerable dependency trees, rebuild all exports, remove unreferenced large originals from exports, verify standalone deployments locally.
- [x] Content/design: accurate privacy text, visible scope/cost/delivery conditions without invented guarantees; centralize home copy, varied selected projects, compact mobile NFC sections/footer, LCP fetch priority.
- [x] Maintenance: stale E2E expectation, revision metadata, unused showcase code/data, README, investigate 404 logging if reproduced.
- [x] Verification: lint/typecheck/unit tests; production build; full E2E; desktop/mobile screenshots and axe; main/demo dependency audits; header and preview checks; real Spline with enforced headers.
- [x] Delivery: coverage/status document for every recommendation; identify external account or business-owner actions that cannot be activated from code alone. Publish only within session authorization and available deployment access, then smoke test.

Evidence is saved under `artifacts/audit-remediation`. Existing unrelated edits remain in place. No blanket git resets or blind `npm audit fix --force`.
