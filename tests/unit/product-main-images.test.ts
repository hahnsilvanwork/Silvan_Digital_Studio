import { describe, expect, it } from 'vitest';
// @ts-expect-error Standalone Node import script.
import { mapProductImages } from '../../scripts/import-product-images.mjs';
import { createPhotoProducts } from '../../src/content/photo-products';

describe('main product photos', () => {
  it('matches numbers and the supplied spelling typo, ignoring model references', () => {
    expect(mapProductImages(['001 product.png', '003 poduct.png', '001 front.png'])).toEqual([
      { file: '001 product.png', id: 'nfc-001-google' },
      { file: '003 poduct.png', id: 'review-stand-white' },
    ]);
  });
  it('requires a platform for shared numbers and rejects unknown or duplicate assignments', () => {
    const shared = [{number:'022',platform:'tiktok',id:'tiktok'}, {number:'022',platform:'whatsapp',id:'whatsapp'}];
    expect(() => mapProductImages(['022 product.png'], shared)).toThrow(/uniquely/);
    expect(mapProductImages(['022 WhatsApp product.png'], shared)[0].id).toBe('whatsapp');
    expect(mapProductImages(['009 product.png'])[0].id).toBe('nfc-022-whatsapp');
    expect(mapProductImages(['022 product.png'])[0].id).toBe('nfc-022-tiktok');
    expect(() => mapProductImages(['999 product.png'])).toThrow(/uniquely/);
    expect(() => mapProductImages(['001 product.png', '001 product.jpg'])).toThrow(/Multiple/);
  });
  it('uses the first four supplied main photos while retaining separate 3D previews', () => {
    const products = createPhotoProducts('en');
    for (const id of ['nfc-001-google', 'review-square-blue', 'review-stand-white', 'review-round-black']) {
      const product = products.find(p => p.id === id)!;
      expect(product.image.src).toContain('/images/products/main/');
      expect(product.scene?.fallbackImage).toContain('/images/products/nfc/');
    }
  });
});
