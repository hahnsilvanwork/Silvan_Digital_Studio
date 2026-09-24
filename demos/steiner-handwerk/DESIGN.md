---
name: Steiner Bau — Swiss architecture exhibition
description: Implemented visual system for the fictional Steiner Bau demo only.
colors:
  forest: "#243f34"
  limestone: "#f5f4ee"
  sage: "#e4e9df"
  muted: "#536158"
  divider: "#c6cfc3"
  warm-white: "#fffefa"
  contact-stone: "#e8e7dd"
  focus-ochre: "#856026"
  error: "#9b2923"
  hero-emphasis: "#c2ceb5"
  hero-action: "#e5ebdb"
typography:
  display:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(56px, 5.3vw, 84px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(38px, 4.1vw, 64px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  control: "2px"
spacing:
  section-desktop: "100px"
  section-tablet: "76px"
  section-mobile: "64px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  input:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  button-hero:
    backgroundColor: "{colors.hero-action}"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
    padding: "15px 22px"
---

# Design System: Steiner Bau

## Overview

**Creative North Star: "Swiss architecture exhibition"**

This code-led demo presents approachable renovation work through architectural imagery, limestone paper, forest lettering and generous exhibition-like spacing. A full-width forest copy plane and warm room image form the opening composition. Regular-width Barlow and quiet horizontal rules make the work legible; craft imagery explains the working approach later. This document describes this demo, not the parent SilvanDigital website.

**Key Characteristics:**

- Large truthful inspiration imagery, with visible fictional-demo labels.
- Open service rows and spacious project compositions.
- Restrained rectangular controls and a traceable selection-to-enquiry interaction.

## Colors

Forest supplies primary text, actions, the hero copy plane and the inverted process section. Limestone is the main canvas and hero title color; sage groups project ideas and the demo banner. Muted green supports secondary copy, while pale dividers organize content without card shells. Warm white distinguishes fields and the review summary; contact stone gives the enquiry section its own surface. Ochre focus outlines and red validation messages communicate interaction state.

The hero uses pale green emphasis and a light primary action that hovers to limestone. Its supporting copy is `#e0e5d9`, with brighter ochre focus (`#bf963d`) against the dark plane. Elsewhere primary buttons hover to `#385443`.

## Typography

Display and body use locally hosted **Barlow**, falling back to Arial and sans-serif. The hero title and body copy use regular weight; other headings use medium weight. Barlow Condensed font files remain available but are not used by this layout.

Paragraphs generally stop at 64 characters; narrower introductions and project copy keep scanning comfortable. Titles range from 28–34px, supporting labels from 14–17px. Hero type becomes `clamp(46px, 5.5vw, 61px)` between 701px and 1100px, and `clamp(45px, 10.6vw, 68px)` at 700px and below. On desktop at least 1100px wide and at most 800px high, it uses 70px (the tablet rule wins at exactly 1100px). At 600px and below, section headings become 40px and body text becomes 17px.

## Layout

The shared container is `min(1320px, 90%)`, changing to 89% at 600px and below. Section padding follows the desktop/tablet/mobile values in the frontmatter. Desktop heading pairs, working approach and contact use asymmetric or equal two-column grids; projects use two columns, services three, and process steps three. At 1100px, gaps tighten and service actions move beneath the description.

At the 900px navigation boundary (CSS `max-width: 899px`), the header exposes a menu button and contact stacks. The hero has its own 700px stacking boundary. At 600px and below, section headings, services, project ideas, working approach, process, FAQ and paired form fields become single column.

Below the demo banner and sticky header, the desktop opening runs full bleed: 42% forest copy and 58% room image, with headline “Aus Räumen wird Zuhause.”, introduction and actions grouped on the left. The composition has a 620px minimum height, increasing to 700px at 1600px wide; shorter desktop viewports use 560px. Between 701px and 1100px it becomes 46%/54% with a 590px minimum. The photo fills its plane with a 58% horizontal crop (62% on tablet). A ruled foundation strip follows the composition inside the shared container.

At 700px and below, copy and image stack. The copy uses compact padding, wrapping horizontal actions and no craft footnote, bringing the image into the first viewport at the reviewed mobile sizes. The image is 340px high with a 56% crop, reducing to 290px at 360px and below. Its illustrative-image caption stays on an opaque light plate at the lower right. The foundation strip stacks beneath it. These rules in `app/hero.css` replace the earlier headline-above-image opening.

## Elevation & Depth

No shadows. Surface changes, thin borders, image scale and whitespace establish hierarchy. The header is opaque limestone, not glass. Reduced-motion preferences disable smooth scrolling, transitions and animations.

## Shapes

Images and content regions are rectangular. Controls have only the small radius documented above. A three-bar, skewed architectural mark accompanies the wordmark; arrows and plus signs provide quiet directional and disclosure cues.

## Components

- **Buttons:** Forest primary and transparent outlined secondary; minimum height 52px. Text links remain visibly underlined. Focusable controls receive a 3px ochre outline with 5px offset.
- **Hero actions:** Light primary action against forest, minimum height 56px on desktop and 50px on mobile; a secondary inspiration link points to project ideas. Directional icons are inline SVG. Hero focus uses the brighter ochre treatment.
- **Navigation:** Sticky desktop header with horizontal anchors and an outlined contact link. Mobile menu expands within the header; Escape closes it and restores toggle focus. Returning to desktop closes mobile state. Without JavaScript, navigation remains visible and the header becomes non-sticky.
- **Services:** Four ruled rows pair a service name, explanatory scope and selection action. Their links preserve native anchor navigation while carrying the selection into the form.
- **Project ideas:** Large images, category, title, copy, native disclosure and enquiry link. Hover scales imagery gently to 1.025 over 0.5 seconds. Project images crop to 360px high on wide desktop and 300px on smaller widths.
- **Disclosures:** Native details/summary for project prompts and FAQ, with ruled separation and a plus rotating when open.
- **Fields and review:** Explicit labels, warm-white fields, inline errors and a plain bordered summary. The first invalid field receives focus; a valid review receives focus. Edit and clear actions remain explicit.

## Do's and Don'ts

- **Do** preserve the room-first visual hierarchy, generous spacing and regular Barlow typography.
- **Do** use `public/hero-zuhause.webp` for the opening: a new AI-generated architectural illustration created with the built-in image generation tool and compressed to WebP. Its caption reads “So könnte es aussehen. · Symbolbild”. The source prompt and provenance are recorded in `../../docs/superpowers/plans/2026-09-24-steiner-hero.md`.
- **Do** retain the existing local gallery assets: `public/proj-1.webp` for interior inspiration, `proj-2.webp` for facade, `proj-3.webp` for bathroom, `proj-4.webp` for wood detail, and `hero-handwerk.webp` for craft. Runtime URLs use `/demos/handwerk/`. This documentation asserts no external photographer or licensing provenance for these existing assets.
- **Do** retain image alt text and captions distinguishing inspiration and symbolic craft imagery from customer references.
- **Don't** introduce invented customer proof, condensed industrial display type, floating card shadows or unrelated visual metaphors into this established demo.
