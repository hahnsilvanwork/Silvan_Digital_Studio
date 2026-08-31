# Project grid edge alignment

## Goal

On laptop and desktop viewports, distribute the four project previews across
the site's standard content width. Odd previews align with the left content
edge and even previews align with the right content edge. Apply the same layout
to the home-page project section and the `/work` index.

## Layout

- Keep the existing single-column mobile layout.
- At the existing desktop breakpoint (`64rem`), use two capped project columns
  across the full available width of the shared content container.
- Align the first column to the container's left edge and the second column to
  its right edge.
- Keep each project column capped at `32rem` so the 512-pixel concept images are
  not enlarged beyond the current presentation size.
- Preserve the existing vertical offset on even previews.
- Do not change project content, image treatment, typography, or card markup.

The shared `previewList` class is used by both pages, so the layout rule should
remain in `src/components/work/work.module.css` and affect both consistently.

## Responsive behavior

- Below `64rem`: one fluid column, unchanged.
- At and above `64rem`: two columns, each no wider than `32rem`, with the
  remaining horizontal space placed between them.
- The list must stay within the site's standard container and must not create a
  horizontal scrollbar.

## Verification

Add a design-contract regression test before changing the stylesheet. It must
fail against the current capped-list implementation and require the desktop
grid to use the full container width while distributing its capped tracks to
opposite edges.

After implementation:

- run the targeted design-contract test, then the full unit suite;
- run type checking and linting;
- inspect the home page and `/work` at widths 320, 768, 1024, 1280, and 1536;
- confirm the outer card edges match the normal content edges at desktop sizes;
- confirm there is no horizontal overflow.

## Release gate

Start the site locally and let the user review both affected pages. Do not push
to Git or deploy to Vercel until the user explicitly approves the local result.
