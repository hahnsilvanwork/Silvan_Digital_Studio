import type { NfcProduct, ProductCategory } from '../content/types';

export const STARTER_PRODUCT_IDS = [
  'review-round-black', 'menu-round-black', 'nfc-030-chip',
  'review-square-blue', 'review-stand-white', 'nfc-007-instagram', 'menu-personalized-white',
] as const;

/** Presentation groups do not change model IDs or their enquiry presets. */
export function catalogueGroup(product: NfcProduct): ProductCategory {
  if (product.category === 'social') return product.platform === 'instagram' ? 'social' : 'custom';
  if (product.category === 'tripadvisor' || product.category === 'contact') return 'custom';
  return product.category;
}

/** Custom design examples also remain discoverable under their intended use. */
export function isInCatalogueGroup(product: NfcProduct, category: string): boolean {
  return catalogueGroup(product) === category || (category === 'custom' && product.packageId === 'fully-custom-card');
}

export function customExamplesFirst(a: NfcProduct, b: NfcProduct): number {
  return Number(b.packageId === 'fully-custom-card') - Number(a.packageId === 'fully-custom-card');
}
