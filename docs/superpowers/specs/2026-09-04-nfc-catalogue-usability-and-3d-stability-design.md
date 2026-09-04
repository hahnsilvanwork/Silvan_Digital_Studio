# NFC Catalogue Usability and 3D Stability Design

## Goal

Make every product family obvious, show the wide overview photograph without cropping, and provide a compact 3D dialog that never gives its WebGPU renderer a zero-sized surface.

## Confirmed problems

- `all-products.webp` is 1536 × 1024, while the hero frame is square and every slide uses `object-fit: cover`; the wide overview is cropped.
- The three category choices look like small filter chips and do not communicate that Menu and Custom contain additional products.
- The current dialog can exceed a short viewport because its square stage is derived from width. The dialog then scrolls internally and can move the close action away from the model.
- The Spline viewer is mounted while the native dialog is transitioning from `display: none`, and it is removed without first pausing its renderer. Either boundary can expose a transient 0 × 0 canvas to Three/WebGPU.

## Approved interaction design

### Hero imagery

Each hero image declares its natural presentation. Square product shots retain `cover`; the wide product overview uses `contain` inside the same stable frame, with a neutral background. No product is cropped.

### Product-family navigation

The catalogue begins with “Wählen Sie eine Anwendung” / “Choose an application”. Each category control is a substantial segmented panel containing its category name and product count: Google Reviews (5), Menu (3), and Custom (1). The selected panel has a filled ink treatment and a persistent underline/accent. On mobile all three choices stay visible in a two-column grid, with the third choice spanning the row; on wider layouts they share the full width in three columns. A live result heading below restates the selected category and count, so switching cannot be mistaken for adding duplicate product cards.

### 3D dialog

The dialog is a fixed-height grid constrained to the visual viewport: compact header, flexible model stage, compact interaction hint. It uses `overflow: hidden`, so the model, title, and close button remain visible together without internal page scrolling. The stage and Spline figure fill the available grid row instead of enforcing a square based on width.

The close button remains at least 44 × 44 CSS pixels. Escape, the close button, and a click on the backdrop use the same orderly close path and restore focus to the originating product button.

### Renderer lifecycle

The viewer is not created until the open dialog has produced a non-zero stage measurement. A `ResizeObserver` controls this readiness gate. Closing first marks the scene inactive; `SplineProduct` pauses the Spline application while the dialog still has dimensions. The owner removes the open dialog on the following animation frame. This prevents WebGPU from creating a zero-sized depth buffer or swapchain texture.

If measurement, runtime loading, scene loading, or the graphics context fails, the static product image remains visible and the existing retry action remains available.

## Responsive and accessibility requirements

- No horizontal document overflow at 320, 768, 1024, 1280, or 1536 pixels.
- Category navigation may scroll within its own row on small screens, with visible continuation and scroll snapping.
- Dialog remains fully within `100dvh`; the page behind it does not scroll while open.
- Controls remain keyboard accessible, Escape closes, backdrop click closes, and focus returns to the trigger.
- Reduced-motion users can explicitly open a stationary model; no automatic model rotation is introduced.

## Verification

- Unit tests cover hero fit mode, category counts/result heading, non-zero stage gating, backdrop close, orderly inactive-before-unmount behavior, and focus restoration.
- Browser tests verify no Spline request before click, a single model after click, a viewport-contained non-scrolling dialog at short mobile and desktop heights, successful close paths, and zero WebGPU-size console errors during repeated open/close cycles.
- Full unit suite, typecheck, lint, production build, and Chromium/Firefox/WebKit/mobile checks must pass before handoff.
