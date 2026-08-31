# Work page header CTA

## Goal

Move the “Ihr Projekt besprechen” call to action from the end of the work index
to the page header, directly below the introductory paragraph. Match the compact
placement and sizing already used on the service pages.

## Design

- Render the existing work CTA inside the page header immediately after
  `content.work.intro`.
- Wrap it in the shared `pageStyles.heroActions` layout used by service-page
  headers. This flex wrapper keeps the button at its intrinsic width instead of
  stretching it across a grid track.
- Use `sequence.actionsIndex` so the CTA enters after the introductory text,
  consistently with the other page headers.
- Remove the former CTA container after the project list. Do not duplicate the
  action at the bottom.
- Keep the CTA label, destination, button component, and visual variant
  unchanged.
- Keep the approved project-grid edge alignment unchanged.

## Verification

Update the work-page unit test so it asserts that the CTA link appears before
the project list in document order while retaining its localized `/contact`
destination. Run the targeted page test, the full unit suite, type checking,
and linting. Present the updated local `/work` page to the user before any Git
push or Vercel deployment.
