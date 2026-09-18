import type { NfcProduct, ProductCategory } from '../content/types';

export const STARTER_PRODUCT_IDS = [
  'review-round-black', 'review-square-blue', 'review-stand-white',
  'nfc-007-instagram', 'nfc-030-chip', 'menu-round-black', 'booking-custom-blue',
] as const;

/** Presentation groups do not change model IDs or their enquiry presets. */
export function catalogueGroup(product: NfcProduct): ProductCategory {
  if (product.category === 'social') return product.platform === 'instagram' ? 'social' : 'custom';
  if (product.category === 'tripadvisor' || product.category === 'contact') return 'custom';
  return product.category;
}
