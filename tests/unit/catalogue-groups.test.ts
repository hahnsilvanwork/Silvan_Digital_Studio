import { describe, expect, it } from 'vitest';
import { getContent } from '../../src/lib/locales';
import { catalogueGroup, STARTER_PRODUCT_IDS } from '../../src/lib/catalogue-groups';

describe('compact catalogue', () => {
  it.each(['de', 'en'] as const)('offers seven distinct starting models and keeps all models reachable in %s', locale => {
    const { catalog, categories } = getContent(locale).reviews;
    const starters = STARTER_PRODUCT_IDS.map(id => catalog.find(product => product.id === id)!);
    expect(starters.every(Boolean)).toBe(true);
    expect(new Set(starters.map(product => product.id)).size).toBe(7);
    expect(starters.map(product => catalogueGroup(product))).toEqual(['reviews', 'reviews', 'reviews', 'social', 'chips', 'menu', 'custom']);
    expect(new Set(starters.slice(0, 3).map(product => product.kind)).size).toBe(3);
    expect(categories).toHaveLength(5);
    for (const product of catalog) expect(categories.map(category => category.id)).toContain(catalogueGroup(product));
    expect(catalog.filter(product => catalogueGroup(product) === 'social').every(product => product.platform === 'instagram')).toBe(true);
  });
});
