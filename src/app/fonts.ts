import { Geist } from "next/font/google";

/**
 * One grotesque carries the whole site: display, body and the small tracked
 * labels. The labels used to run in a monospace, which gave the service line
 * and every price a terminal character -- including the slashed zero -- that
 * read as generic tech rather than as Swiss editorial.
 */
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const rootFontVariables = geist.variable;
