import { describe, expect, it } from 'vitest';
import { getContent } from '../../src/lib/locales';
import { catalogueGroup, STARTER_PRODUCT_IDS, isInCatalogueGroup, customExamplesFirst } from '../../src/lib/catalogue-groups';

describe('compact catalogue', () => {
  it.each(['de', 'en'] as const)('offers seven distinct starting models and keeps all models reachable in %s', locale => {
    const { catalog, categories } = getContent(locale).reviews;
    const starters = STARTER_PRODUCT_IDS.map(id => catalog.find(product => product.id === id)!);
    expect(starters.every(Boolean)).toBe(true);
    expect(new Set(starters.map(product => product.id)).size).toBe(7);
    expect(starters.map(product => catalogueGroup(product))).toEqual(['reviews', 'menu', 'chips', 'reviews', 'reviews', 'social', 'menu']);
    expect(new Set(starters.slice(0, 3).map(product => catalogueGroup(product))).size).toBe(3);
    expect(categories).toHaveLength(5);
    for (const product of catalog) expect(categories.map(category => category.id)).toContain(catalogueGroup(product));
    expect(catalog.filter(product => catalogueGroup(product) === 'social').every(product => product.platform === 'instagram')).toBe(true);
  });
});

it.each(['de','en'] as const)('keeps starter examples in their own groups and sorts custom designs first in %s', locale => {
  const {catalog}=getContent(locale).reviews;
  expect(STARTER_PRODUCT_IDS).not.toContain('booking-custom-blue');
  expect(STARTER_PRODUCT_IDS).toContain('menu-personalized-white');
  for(const id of STARTER_PRODUCT_IDS){const model=catalog.find(p=>p.id===id)!;expect(isInCatalogueGroup(model,catalogueGroup(model))).toBe(true);}
  const custom=catalog.filter(p=>isInCatalogueGroup(p,'custom')).sort(customExamplesFirst);
  for(const id of ['menu-personalized-white','booking-custom-blue']) expect(custom.some(p=>p.id===id)).toBe(true);
  const count=custom.filter(p=>p.packageId==='fully-custom-card').length;
  expect(count).toBeGreaterThan(0);
  expect(custom.slice(0,count).every(p=>p.price==='CHF 99.–')).toBe(true);
});
