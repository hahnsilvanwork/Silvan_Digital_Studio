import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import photoProducts from '../../src/content/nfc-import.json';

describe('photo model exports', () => {
  it('accounts for both batches and the corrected WhatsApp number', () => {
    expect(photoProducts).toHaveLength(31);
    expect(new Set(photoProducts.map(p => p.id)).size).toBe(31);
    expect(photoProducts.filter(p => p.number === '022').map(p => p.platform)).toEqual(['tiktok']);
    expect(photoProducts.filter(p => p.number === '009').map(p => p.platform)).toEqual(['whatsapp']);
  });
  it.each(photoProducts)('exports a self-contained, dimensional GLB for $id', (product) => {
    const path = `public${product.modelUrl}`;
    expect(existsSync(path)).toBe(true);
    const bytes = readFileSync(path);
    expect(bytes.toString('ascii',0,4)).toBe('glTF');
    expect(bytes.readUInt32LE(4)).toBe(2);
    expect(bytes.readUInt32LE(8)).toBe(bytes.length);
    const doc = JSON.parse(bytes.toString('utf8',20,20+bytes.readUInt32LE(12)));
    expect(doc.images.every((image: {bufferView?: number; uri?: string}) => image.bufferView !== undefined && !image.uri)).toBe(true);
    expect(doc.meshes.length).toBeGreaterThanOrEqual(product.kind === 'stand' ? 4 : 3);
    const bounds = doc.accessors.filter((a: {type: string; min?: number[]}) => a.type === 'VEC3' && a.min);
    expect(bounds.length).toBeGreaterThan(0);
    expect(doc.asset.extras.personalized).toBe(product.personalized);
  });
});
