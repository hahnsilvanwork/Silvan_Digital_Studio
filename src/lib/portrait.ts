/**
 * The approved photograph of Silvan Hahn.
 *
 * Described once because three places have to agree on it: the about page
 * renders it, the Person markup points Google at it, and
 * public/images/portrait/README.md documents the crop. If the file is replaced
 * at different dimensions and only one of those is updated, the frame crops the
 * face a second time or the structured data reports a size the file does not
 * have. tests/unit/design-contract.test.ts asserts the README still states the
 * numbers below, so the three cannot drift apart silently.
 *
 * The file is served straight from /public rather than through the image
 * optimizer, so the URL in the structured data is stable and crawlable.
 */
export const PORTRAIT = {
  src: "/images/portrait/portrait.webp",
  width: 1360,
  height: 1700,
} as const;
