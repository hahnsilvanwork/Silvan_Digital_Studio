---
name: Silvan Editorial
colors:
  surface: '#F9F8F6'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#0035c6'
  on-secondary: '#ffffff'
  secondary-container: '#0448ff'
  on-secondary-container: '#d6daff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#001257'
  on-secondary-fixed-variant: '#0033c0'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
  text-main: '#1A1A1A'
  divider: '#E5E5E5'
  accent-electric: '#0047FF'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 12vw
    fontWeight: '600'
    lineHeight: '0.9'
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: '600'
    lineHeight: 88px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  mono-label:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-desktop: 64px
  margin-mobile: 20px
  gutter: 24px
  section-gap: 160px
  element-gap: 32px
---

## Brand & Style

The design system is built for a Swiss Digital Developer, emphasizing Swiss-style precision, technical mastery, and editorial sophistication. The brand personality is direct and personal, stripping away the "noise" of traditional SaaS marketing in favor of a high-impact, minimalist aesthetic.

The visual direction follows **Minimalism** with a **High-Contrast/Bold** typographic hierarchy. It avoids common UI tropes like heavy shadows and container-based cards, instead using whitespace, thin hairline rules, and massive display type to guide the user's eye. The emotional response should be one of quiet confidence, technical reliability, and creative clarity.

## Colors

The palette is strictly controlled to maintain a premium, architectural feel. 

- **Primary & Neutral:** The background uses a soft, warm white (#F9F8F6) to reduce eye strain and feel more "printed" than digital. Text is a deep near-black (#1A1A1A) to ensure maximum contrast and a sharp, ink-on-paper quality.
- **Secondary:** An Electric Blue (#0047FF) is the sole chromatic accent. It must be used sparingly—only for primary calls to action, active states, or small technical accents.
- **Tertiary/Lines:** A soft grey (#E5E5E5) is used for hairlines and structural divisions. It should never be used as a background for "cards" but rather as a boundary for the grid.

## Typography

This design system uses a Neo-Grotesk pairing. **Geist** provides a technical, Swiss-engineered feel for headlines and functional labels, while **Inter** ensures comfortable readability for long-form body text.

The hierarchy is intentionally extreme. "Display-XL" should be used for hero sections, often spanning the full width of the viewport. Use "Label-Caps" for utility information like dates, categories, or technical metadata. All headings should have tight letter-spacing to emphasize the precise, geometric nature of the letterforms.

## Layout & Spacing

The layout utilizes a disciplined **12-column fluid grid** for desktop. To achieve the editorial feel, content should be placed asymmetrically—for example, a headline spanning columns 1-8 while the body text starts at column 5.

Avoid grouping elements in boxes. Structure is created through:
1.  **Vertical Hairlines:** 1px lines (#E5E5E5) to separate logical sections.
2.  **Generous Whitespace:** Section gaps are large (160px+) to allow the eye to rest and emphasize individual projects or services.
3.  **Horizontal Alignment:** Stick strictly to the grid edges; do not center-align content unless it is a specific, isolated display moment.

## Elevation & Depth

This system is strictly **Flat** and **Layer-based**. No shadows should be used.

Depth is communicated through **Tonal Layers** and transparency. Background elements (like device mockups) may sit at 100% opacity, while secondary information or inactive states use lower contrast.

For interactive overlays or navigation menus, use a **Backdrop Blur** (Glassmorphism) with the #F9F8F6 color at 80% opacity to maintain the soft white feel while suggesting a physical layer sitting above the main content.

## Shapes

The shape language is sharp and architectural. A "Soft" (4px) corner radius is used for buttons and small interactive elements to prevent them from feeling too aggressive, but large containers or image wrappers should remain strictly square (0px) to maintain the editorial, grid-aligned aesthetic.

## Components

- **Buttons:** Primary buttons use the #1A1A1A background with white text or #0047FF with white text for critical CTAs. The shape is a subtle rounded rectangle (4px). Labels use Geist Mono or SemiBold.
- **Input Fields:** Use a simple 1px bottom border (#E5E5E5) rather than a box. When focused, the border transitions to #1A1A1A or #0047FF.
- **Lines/Dividers:** 1px #E5E5E5 lines are the primary structural element. They should span the full width of their container or the full width of the grid.
- **Imagery:** Use massive, full-bleed imagery or mockups that align strictly to the 12-column grid. Avoid borders around images; use the white space to frame them.
- **Project Lists:** Instead of cards, use a simple vertical list where each item is separated by a 1px line. On hover, reveal the project image using a smooth fade or text-mask transition.
- **Utility Labels:** Small Geist-font labels in all caps used to denote "Status," "Year," or "Tech Stack."