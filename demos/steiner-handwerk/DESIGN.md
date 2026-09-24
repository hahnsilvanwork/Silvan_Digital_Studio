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
typography:
  display:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(56px, 6.5vw, 104px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.045em"
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
---

# Design System: Steiner Bau

## Overview

**Creative North Star: "Swiss architecture exhibition"**

This code-led demo presents approachable renovation work through room photography, limestone paper, forest lettering and generous exhibition-like spacing. Regular-width Barlow and quiet horizontal rules make the work legible; craft imagery explains the working approach below the room-led opening. This document describes this demo, not the parent SilvanDigital website.

**Key Characteristics:**

- Large truthful inspiration imagery, with visible fictional-demo labels.
- Open service rows and spacious project compositions.
- Restrained rectangular controls and a traceable selection-to-enquiry interaction.

## Colors

Forest supplies primary text, actions and the inverted process section. Limestone is the main canvas; sage groups project ideas and the demo banner. Muted green supports secondary copy, while pale dividers organize content without card shells. Warm white distinguishes fields and the review summary; contact stone gives the enquiry section its own surface. Ochre focus outlines and red validation messages communicate interaction state.

The hero emphasis uses a lighter green (`#657963`); primary buttons hover to `#385443`. These are observed local treatments, not a second brand palette.

## Typography

Display and body use locally hosted **Barlow**, falling back to Arial and sans-serif. Headings use medium weight; body copy is regular. Barlow Condensed font files remain available but are not used by this layout.

Paragraphs generally stop at 64 characters; narrower introductions and project copy keep scanning comfortable. Titles range from 28–34px, supporting labels from 14–17px. At widths below 900px the display becomes `clamp(54px, 8.2vw, 75px)`; at 600px and below it becomes `clamp(45px, 10.7vw, 63px)`, section headings become 40px, and body text becomes 17px.

## Layout

The shared container is `min(1320px, 90%)`, changing to 89% at 600px and below. Section padding follows the desktop/tablet/mobile values in the frontmatter. Desktop heading pairs, working approach and contact use asymmetric or equal two-column grids; projects use two columns, services three, and process steps three. At 1100px, gaps tighten and service actions move beneath the description.

At the 900px navigation boundary (CSS `max-width: 899px`), the header exposes a menu button, the hero becomes one column, and contact stacks. At 600px and below, section headings, services, project ideas, working approach, process, FAQ and paired form fields become single column.

The desktop opening contains the demo banner, sticky horizontal navigation, a large left headline, right introduction/actions and a wide room image below. On mobile, the banner and compact header precede headline, introduction, primary action, secondary link and then the room image; the image continues beyond the initial viewport depending on device height. Desktop hero photography uses a clamped 320–560px height; mobile uses 340px. Preserve this reading order rather than forcing every element into one screen.

## Elevation & Depth

No shadows. Surface changes, thin borders, image scale and whitespace establish hierarchy. The header is opaque limestone, not glass. Reduced-motion preferences disable smooth scrolling, transitions and animations.

## Shapes

Images and content regions are rectangular. Controls have only the small radius documented above. A three-bar, skewed architectural mark accompanies the wordmark; arrows and plus signs provide quiet directional and disclosure cues.

## Components

- **Buttons:** Forest primary and transparent outlined secondary; minimum height 52px. Text links remain visibly underlined. Focusable controls receive a 3px ochre outline with 5px offset.
- **Navigation:** Sticky desktop header with horizontal anchors and an outlined contact link. Mobile menu expands within the header; Escape closes it and restores toggle focus. Returning to desktop closes mobile state. Without JavaScript, navigation remains visible and the header becomes non-sticky.
- **Services:** Four ruled rows pair a service name, explanatory scope and selection action. Their links preserve native anchor navigation while carrying the selection into the form.
- **Project ideas:** Large images, category, title, copy, native disclosure and enquiry link. Hover scales imagery gently to 1.025 over 0.5 seconds. Project images crop to 360px high on wide desktop and 300px on smaller widths.
- **Disclosures:** Native details/summary for project prompts and FAQ, with ruled separation and a plus rotating when open.
- **Fields and review:** Explicit labels, warm-white fields, inline errors and a plain bordered summary. The first invalid field receives focus; a valid review receives focus. Edit and clear actions remain explicit.

## Do's and Don'ts

- **Do** preserve the room-first visual hierarchy, generous spacing and regular Barlow typography.
- **Do** use the existing local assets: `public/proj-1.webp` for hero/interior, `proj-2.webp` for facade, `proj-3.webp` for bathroom, `proj-4.webp` for wood detail and `hero-handwerk.webp` for craft. Runtime URLs use `/demos/handwerk/`. These are existing repository assets; this documentation asserts no external photographer or licensing provenance.
- **Do** retain image alt text and captions distinguishing inspiration and symbolic craft imagery from customer references.
- **Don't** introduce invented customer proof, condensed industrial display type, floating card shadows or unrelated visual metaphors into this established demo.
