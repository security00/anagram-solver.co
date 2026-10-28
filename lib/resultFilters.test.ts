import { describe, expect, it } from 'vitest';
import { dictionaryStatusLabel } from './dictionaryProgress';
import { applyResultFilters, emptyResultFilters, groupWordsByLength } from './resultFilters';

describe('result filters', () => {
  const words = ['silent', 'listen', 'enlist', 'tin', 'list'];

  it('filters starts, ends, contains, and length', () => {
    expect(
      applyResultFilters(words, { ...emptyResultFilters, starts: 'li', ends: 'n', minLength: '4' }),
    ).toEqual(['listen']);
    expect(applyResultFilters(words, { ...emptyResultFilters, contains: 'in' })).toEqual(['tin']);
  });

  it('groups by length and sorts inside the group', () => {
    const groups = groupWordsByLength(['tin', 'list', 'silent', 'enlist'], 'score');
    expect(groups.map((group) => group.length)).toEqual([6, 4, 3]);
    expect(groups[0]?.words).toEqual(['enlist', 'silent']);
  });
});

describe('dictionary status label', () => {
  it('separates extended loading from searching', () => {
    expect(dictionaryStatusLabel('searching', 'full', 0)).toBe('Searching…');
    expect(dictionaryStatusLabel('loading', 'full', 820_000)).toBe(
      'Loading Extended dictionary… 820 KB / ~1.4 MB',
    );
    expect(dictionaryStatusLabel('loading', 'common', 10_000)).toBe('Loading dictionary…');
  });
});
