---
name: Café & Konditorei Vogel
description: Warm paper, espresso ink and bakery photography for a fictional Zurich café.
colors:
  paper: "#f2e8d5"
  cream: "#fdf8f0"
  oat: "#e5d7bf"
  ink: "#302317"
  muted: "#67543f"
  brown: "#795135"
  line: "#c9b89e"
  focus: "#91600c"
  error: "#982e1d"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(46px, 5vw, 74px)"
    fontWeight: 400
    lineHeight: 1.13
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(34px, 3.5vw, 50px)"
    fontWeight: 400
    lineHeight: 1.13
  body:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "21px"
    lineHeight: 1.55
rounded:
  control: "2px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.brown}"
  input:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 13px"
---

# Design System: Café & Konditorei Vogel

## Overview

The implemented identity retains the original warm café world: paper surfaces, espresso text, expressive serif headings and large atmospheric photographs. Spacious editorial rows give food names, descriptions and prices a clear reading order. This document applies only to this demo, not the SILVAN portfolio.

The homepage pairs its short “Ein bisschen Zeit. Ein Stück Glück.” headline with a tall bakery photograph, followed by specialties, a concept preview and opening hours. Photography remains visibly labelled as illustrative.

## Colors

Brown is the warm accent for italic emphasis, prices and hover states. Ink anchors text, primary actions and the dark specialties section. Paper is the page canvas; cream distinguishes fields and the review surface; oat separates supporting sections. Muted text and fine line dividers retain the same warm hue family. Focus and error colors are functional states, not decorative accents.

## Typography

Playfair Display supplies headings and the wordmark; EB Garamond supplies body copy, navigation and controls. Both are served from local WOFF2 assets with Georgia/serif fallbacks. No remote font request is needed.

The hero has its own desktop heading scale (45–70px), with explicit tablet and mobile adjustments. General titles use the frontmatter scale; tertiary headings are 25px. Body paragraphs cap at 63ch, while hero copy is narrower. Menu titles are 22px and descriptions 18px. Prices use tabular numerals. Italic brown emphasis is part of the retained heading language.

## Layout

The shared container is `min(1240px, 90%)`. Desktop sections typically have 90px vertical padding, with two-column editorial grids and a three-column footer. The hero uses a 1.04:1 split, a 68px gap and a 590px-tall cropped image. The menu pairs a category introduction with rows of items and aligned prices.

At 1100px, gaps and hero typography tighten. Below 900px (CSS maximum 899px), the header becomes an expandable navigation, its minimum height drops from 100px to 88px, paired form fields stack and section spacing reduces to 65px. At 700px and below, major content grids stack, section spacing becomes 58px, menu anchors form two columns, and the hero image becomes 370px tall. The reservation form precedes supporting contact information on mobile.

## Elevation & Depth

There are no box shadows. Tonal sections, thin rules, photographic depth and cream form surfaces provide hierarchy. The header and menu category bar stay sticky; anchor offsets account for them. Smooth scrolling is disabled when reduced motion is requested, along with transitions and animations.

## Shapes

Rectangular photographs and thin borders define the page. Buttons and form controls have nearly square corners using the control radius. Avoid adding rounded card collections to the menu: the implemented pattern is an editorial list.

## Components

- **Buttons:** dark primary surfaces with cream text; brown hover. Secondary actions are transparent with ink text and border, switching to oat on hover. Desktop primary controls have a 54px minimum height, reducing to 52px on mobile.
- **Focus:** a visible 3px ochre outline with 5px offset applies across interactive controls. The skip link appears on focus.
- **Navigation:** serif links, underlined active route, and a bordered reservation link on desktop. Below 900px, a native button expands a vertical list. No-JavaScript styles expose navigation directly.
- **Menu rows:** title and description on the left, price on the right, with horizontal dividers. Mobile prices may wrap without colliding with descriptions. Four category anchors remain available above the menu.
- **Inputs:** cream fields with a muted brown border, 52px minimum height and explicit labels. Errors use red text, matching borders and accessible associations. Disabled fields reduce opacity.
- **Review surface:** cream background, thin line border, 30px padding (24px on mobile), definition-list summary, edit and delete actions. Long input wraps; multiline notes retain line breaks.

## Do's and Don'ts

- Do preserve the warm palette, serif pairing and spacious food/menu typography.
- Do use the existing three photographic subjects with honest illustrative captions. The pre-existing JPEG assets were converted to WebP; this refinement introduced no newly generated imagery.
- Do retain clear focus, readable price alignment and the 900px/700px responsive behavior.
- Don't apply the parent portfolio's visual identity to this demo.
- Don't imply a real staff identity or operating café through captions or imagery.
