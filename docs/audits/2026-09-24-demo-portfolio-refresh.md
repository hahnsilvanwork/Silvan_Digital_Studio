# Demo portfolio refresh — 24 September 2026

## Scope
All four standalone demos are now refined and published: Salon Lumière, Steiner Bau, Café Vogel and Falkenried. Captured the actual public pages, including Falkenried's German and English versions. German-only demos remain German in English portfolio screenshots.

Updated eight desktop images and ten versioned mobile/workflow images. The evidence manifest records source URL, viewport, dimensions and timestamp. No forms submitted during capture. Updated screenshot cache versions and the exact Next.js image allowlist so existing browser/optimizer caches cannot retain stale previews.

## Verification
- Screenshot capture: no broken images, page errors or horizontal overflow.
- Selected service/property and date/time were carried into real demo form controls for workflow images.
- Next.js production build: 40 pages; TypeScript successful; static CSP hardening successful.
- Local portfolio image checks: 28 DE/EN page/viewport combinations (home, websites, work, four project details at 390/1440), all refreshed project images decoded successfully.
- Two existing localized screenshot tests passed; scoped ESLint and diff whitespace checks passed.
- Existing main-site sources were compared by SHA-1 against production deployment dpl_4svVrgirvCYYfKp3UfA1Aj24BznS before publication. They already matched production; unrelated Git changes were preserved and excluded from the screenshot commit.

## Deployment
Release: https://silvan-digital-studio-p2tnd9vdb-silvan1.vercel.app
Deployment ID: dpl_E69sXHq2nzqrZpEkouhPsmGEfcC2
Public: https://silvandigital.ch
Rollback: dpl_4svVrgirvCYYfKp3UfA1Aj24BznS
Production completion and public verification recorded below after deployment.

Production confirmed READY and aliased to silvandigital.ch. Repeated all 28 portfolio page/viewport checks publicly: passed. All ten published evidence image SHA-256 hashes match the newly captured local files. No failed image loads or JavaScript errors in checked views.
