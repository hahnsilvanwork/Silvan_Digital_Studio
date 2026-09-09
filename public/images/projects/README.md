# Project screenshots

The eight active screenshots are 2880 x 2000 WebP files for the German and English portfolio. Source mapping lives in src/content/projects.ts. Files use the -retina.webp and -retina-en.webp suffixes. Public names follow the actual demos; Steiner Bau retains its stable steiner-handwerk filenames and URL slug.

Regenerate with npm run demos:screenshots and DEMO_BASE_URL pointing to a running main website with current bundled demos. The capture uses a 1440×1000 CSS viewport at pixel ratio 2. Screenshots always show the actual available demo language: Falkenried has a real English route; the three German-only demos remain German in the English portfolio. No translated content is injected into the capture browser. Optional CLI arguments select project IDs, e.g. npm run demos:screenshots -- steiner-handwerk.

Older low-resolution files and retired concept images are preserved only in the local cleanup archive, not shipped or committed.

When replacing screenshot bytes under an existing filename, update its `v` query in src/content/projects.ts so the image optimizer and browser do not retain an older capture. The 20260908 version selects the refreshed Café, Steiner and Salon screenshots.
