# Café & Konditorei Vogel

## Purpose and scope

A German-language, fictional Zurich café and bakery website demonstrating SILVAN's hospitality web design. Visitors can explore food, atmosphere, concept opening hours and a local reservation preview. There is no real location, booking service or operating café behind the demo. Scope is `demos/cafe-vogel`; the parent portfolio is a separate product.

## Implemented routes

- `/`: atmospheric hero, six specialties drawn from shared menu data, concept preview and opening hours.
- `/speisekarte`: four anchored categories containing 22 items: breakfast (4), bakery/patisserie (8), coffee/hot drinks (6), and cakes/celebrations (4). Prices are fictional examples in CHF.
- `/ueber-uns`: an explicitly fictional café concept, supported by bakery and interior imagery. No invented founding history, testimonials or staff credentials.
- `/kontakt`: local reservation preview plus concept information and hours.

The deployment uses the `/demos/cafe` base path. Internal Next links disable prefetch for the static-export deployment. Page metadata requests `noindex, nofollow`.

## Shared content and assets

Menu content lives in `app/data/menu.ts`; featured items reference that same source. `app/data/hours.ts` defines Monday–Friday 07:00–18:00, Saturday 08:00–17:00, Sunday 08:00–16:00, and manually selected holiday hours 09:00–14:00.

The retained warm visual identity is documented in `DESIGN.md`. Playfair Display and EB Garamond are local fonts. Three pre-existing JPEGs—bakery display, interior and a baking scene—have WebP derivatives used by the pages. No image was newly generated for this refinement; the baking image is not presented as a verified staff portrait.

## Reservation behavior

The form operates in React memory only. It sends no reservation, writes no persistent storage, and checks no table inventory. The summary explicitly says the information is unsent. Holidays are selected manually rather than inferred from a calendar.

- **Initial state:** empty inputs; the time selector asks for a date first. Server-rendered controls remain disabled until JavaScript is ready; the no-JavaScript message explains this.
- **Fields:** required name, email, party size, date and time; optional phone and message. Party size permits 1–8 or “more than 8”. Name/email/phone/message limits are 100/254/40/1000 characters.
- **Validation:** trims textual input; requires a nonempty name and valid email shape; checks allowed party values, real calendar dates, date not in the past and a permitted future time. The current day and time use `Europe/Zurich`, including its daylight-saving rules.
- **Time selection:** half-hour slots begin at opening and end 30 minutes before closing. Today's elapsed slots are excluded. Changing the date or holiday toggle clears the chosen time. A date with no future slots displays an explicit empty state.
- **Errors:** field-specific messages and invalid states accompany an alert; focus moves to the first invalid field. Editing a field clears its existing error. Submission revalidates against the current clock.
- **Review:** successful validation displays all values, formatted date and optional-field fallbacks; focus moves to the summary. There is no send or confirmation step.
- **Edit and reset:** editing returns to the populated form; deleting clears inputs and errors. Both return focus to the name input. Deletion is also available before review. Reloading loses the in-memory entries.

## Accessibility and release evidence

The implementation includes a skip link, labelled fields, visible keyboard focus, active-route state, responsive navigation, reduced-motion support and a usable navigation fallback without JavaScript. Copy consistently marks the concept, imagery and prices as fictional or illustrative.

At documentation handoff on 2026-09-24, the release coordinator reported 46 passing browser checks, an independent finish review of **SHIP** with no material defects, and a completed deployment with 15/15 live checks passing. These results record the verification evidence supplied by the release coordinator.
