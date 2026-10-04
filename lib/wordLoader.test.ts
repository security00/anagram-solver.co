import { describe, expect, it } from 'vitest';

import { loadDictionary, loadSearchDictionary, loadWordList } from './wordLoader';

describe('loadDictionary', () => {
  it('loads a curated common dictionary without malformed entries', async () => {
    const dictionary = await loadDictionary('common');

    // ESDB size 35 contains 43k lines; apostrophes and compounds are
    // intentionally removed because this solver accepts a-z tiles only.
    expect(dictionary.size).toBeGreaterThan(38_000);
    expect(dictionary.has('classroom')).toBe(true);
    expect([...dictionary].every((word) => /^[a-z]+$/.test(word))).toBe(true);
  });

  it('loads a broader full dictionary for uncommon phrase anagrams', async () => {
    const common = await loadDictionary('common');
    const full = await loadDictionary('full');

    expect(full.size).toBeGreaterThan(common.size);
    expect(full.has('starer')).toBe(true);
  });

  it('loads a curated names overlay that can merge with common English', async () => {
    const names = await loadWordList('names');
    const merged = await loadSearchDictionary('common', true);

    expect(names.size).toBeGreaterThan(800);
    expect(names.has('shakespeare')).toBe(true);
    expect(names.has('garcia')).toBe(true);
    expect([...names].every((word) => /^[a-z]+$/.test(word))).toBe(true);
    expect(merged.size).toBeGreaterThan(names.size);
    expect(merged.has('classroom')).toBe(true);
    expect(merged.has('shakespeare')).toBe(true);
  });
});
