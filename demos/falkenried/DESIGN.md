---
name: Falkenried Gruppe — Heritage Precision
description: Consolidated design system for the Falkenried Gruppe website, derived from the Stitch "heritage_precision_1" mockup direction.
---

## 1. Brand & Style

Falkenried Gruppe combines three pillars — BMW service, landscaping, real estate — under one 55-year family legacy. The direction is **Corporate / Modern "Quiet Luxury"**: generous whitespace, editorial typography, large photography, no neon or glassmorphism. It should feel like "Trusted Stewardship" — a client's car, garden, or home is in competent, patient hands.

## 2. Color Palette

All ratios computed with the WCAG 2.1 relative-luminance formula.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--color-surface` | `#F8F9FA` | Page background | — |
| `--color-surface-lowest` | `#FFFFFF` | Card/content background | — |
| `--color-ink` | `#191C1D` | Primary body text | 16.26:1 on surface |
| `--color-ink-muted` | `#424751` | Secondary text | 9.33:1 on white |
| `--color-outline-variant` | `#C2C6D3` | Borders/dividers only | 1.71:1 — never use as text |
| `--color-primary` | `#00356C` | Swiss Navy — buttons, links, headline accents | 12.17:1 on white; 12.17:1 white-on-navy |
| `--color-primary-strong` | `#004B95` | Hover/active state of primary | 8.61:1 on white |
| `--color-charcoal` | `#333333` | Structural text alternative | 12.63:1 on white |
| `--color-heritage-gold` | `#E9B63C` | Anniversary/premium badges — **decorative only** | 1.87:1 — never as text |
| `--color-bmw` | `#3C8CBF` | BMW division accent — borders, icons, backgrounds with white text | 3.69:1 — large text (≥18px/14px bold) or non-text only |
| `--color-bmw-text` | `#1C4F73` | BMW division text/links | 8.69:1 on white |
| `--color-garden` | `#2D5A27` | Gartenbau division accent — safe as text | 8.07:1 on white |
| `--color-realestate` | `#55606B` | Immobilien division text | 7.1:1 on white |
| `--color-realestate-muted` | `#707070` | Immobilien decorative (icons/dividers) | 4.95:1 |
| `--color-inverse-surface` | `#2E3132` | Dark section background (Immobilien showcase) | — |
| `--color-inverse-ink` | `#F0F1F2` | Text on inverse surface | 13.9:1 |
| `--color-error` | `#BA1A1A` | Form validation errors | 5.9:1 on white |

**Rule:** `--color-bmw` and `--color-heritage-gold` must never carry small body text directly — use `--color-bmw-text` for BMW copy, and reserve gold for badges/icons/borders with dark text on top.

## 3. Typography

- **Display/Headlines:** Hanken Grotesk Variable (weights 400–800)
- **Body/UI:** Inter (400, 500, 600, 700)

| Role | Family | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| display-lg | Hanken Grotesk | 56px / 36px mobile | 700 | 1.1 | -0.02em |
| headline-md | Hanken Grotesk | 32px | 600 | 1.25 | normal |
| headline-sm | Hanken Grotesk | 24px | 600 | 1.33 | normal |
| body-lg | Inter | 18px | 400 | 1.55 | normal |
| body-md | Inter | 16px | 400 | 1.5 | normal |
| label-caps | Inter | 12px | 700 | 1.33 | 0.14em, uppercase |
| button | Inter | 13px | 600 | 1.4 | 0.05em, uppercase |

## 4. Layout & Spacing

- Max content width: 1280px, 24px gutter mobile, 40–64px desktop margins.
- Section vertical rhythm: `clamp(4rem, 8vw, 7.5rem)` between major blocks.
- Desktop: 12-column grid, left-aligned content (Swiss modernist influence). Division cards span 4 columns each.
- Mobile: single column, generous 64px+ stacking between modules.

## 5. Shapes & Elevation

- Radius scale: `sm` 2px, `md` 6px, `lg` 8px, `xl` 12px — soft but not bubbly (Level 1–2).
- Buttons/inputs: `md` (6px). Cards/image containers: `lg`–`xl`.
- Shadows are soft and diffused: `0 4px 20px rgba(0,0,0,0.05)` to lift cards without hard edges.
- Photography carries a subtle navy-to-transparent gradient overlay where text sits on images.

## 6. Components

- **Division Card:** white card, colored 3px top border matching division accent, lifts slightly with ambient shadow on hover.
- **Primary Button** (`.btn-primary`): solid navy, white uppercase label, 6px radius, no gradient.
- **Secondary Button** (`.btn-secondary`): transparent, 1.5px navy border, fills navy on hover.
- **Timeline:** vertical 1px navy line, year in `display-lg` navy, content alternating or stacked on mobile.
- **FAQ Accordion:** `<details>`/`<summary>` native element for zero-JS accessibility, chevron rotates on open.
- **Property Card:** image, status chip (frei/reserviert/vermietet), title, address, price, "Details" link. Filterable by category via a small inline script toggling `hidden`.
- **Contact Form:** label-above-input, bottom-border-only inputs, navy focus ring, submits to Web3Forms.
- **Input Fields:** minimalist, 1px bottom border, navy on focus, label always visible.

## 7. Accessibility

- WCAG AA is the floor: 4.5:1 body text, 3:1 large text/UI components.
- All interactive elements have visible `:focus-visible` outlines (navy, 2px offset).
- Skip-to-content link on every page.
- FAQ and property filters work without JavaScript where feasible (`<details>` for FAQ); filter script is a light progressive enhancement.
