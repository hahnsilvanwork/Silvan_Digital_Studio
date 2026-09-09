import { describe, expect, it } from 'vitest';
import { createPhotoProducts, photoImports } from '../../src/content/photo-products';
import { getInquiryPreset } from '../../src/lib/inquiry-selection';
import { getContent } from '../../src/lib/locales';

describe('second photo batch', () => {
  const expected = [
    ['024','menu','standard-card','CHF 49.–'],
    ['025','menu','standard-card','CHF 49.–'],
    ['026','menu','standard-card','CHF 49.–'],
    ['027','menu','fully-custom-card','CHF 99.–'],
    ['028','booking','fully-custom-card','CHF 99.–'],
    ['029','google','personalized-card','CHF 69.–'],
    ['031','airbnb','fully-custom-card','CHF 99.–'],
    ['032','airbnb','fully-custom-card','CHF 99.–'],
  ];
  it.each(expected)('imports %s with the correct package and price', (number,platform,packageId,price) => {
    const source=photoImports.find(p=>p.number===number);
    expect(source).toBeDefined();
    expect(source!.platform).toBe(platform);
    expect(getInquiryPreset(source!.id)?.product).toBe(packageId);
    for(const locale of ['de','en'] as const) {
      const product=createPhotoProducts(locale).find(p=>p.id===source!.id)!;
      expect(product.price).toBe(price);
      expect(product.personalized).toBe(packageId!=='standard-card');
      expect(getContent(locale).reviews.catalog.filter(p=>p.id===source!.id)).toHaveLength(1);
      expect(product.scene?.format).toBe('glb');
    }
  });
});
