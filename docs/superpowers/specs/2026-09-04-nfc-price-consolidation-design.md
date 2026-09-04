# NFC Price Consolidation Design

## Goal

Make the Standard Stand cost CHF 49 and reduce the review page's lower pricing overview from five entries to four without removing the stand from the product catalogue.

## Price structure

The four pricing entries are:

1. Standard Card or Standard Stand — CHF 49.–
2. Two Standard Cards — CHF 80.–
3. Personalized Card — CHF 69.–
4. Fully Customized Card — CHF 99.–

The Standard Stand remains a separate visible catalogue product because it has its own image and 3D model. Its catalogue price and inquiry option both change to CHF 49.–.

## Content consistency

German and English content must use the same prices. The FAQ price summary and inquiry selector must state CHF 49 for the stand. The existing quantity-discount message remains unchanged.

## Verification

Unit tests must assert the four-entry pricing overview and the CHF 49 stand price. Type checking, linting, and the relevant page tests must remain successful.
