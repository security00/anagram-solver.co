import { describe, expect, it } from 'vitest';

import { runWordSearch } from './solverEngine';

const dictionary = new Set([
  'a',
  'as',
  'games',
  'mages',
  'same',
  'cat',
  'cot',
  'cut',
]);

describe('runWordSearch', () => {
  it('keeps exact anagrams distinct from words made from available letters', () => {
    expect(
      runWordSearch(dictionary, {
        input: 'games',
        limit: 100,
        operation: 'anagrams',
        sortBy: 'alphabetical',
      }).words
    ).toEqual(['games', 'mages']);

    expect(
      runWordSearch(dictionary, {
        input: 'games',
        limit: 100,
        operation: 'words',
        sortBy: 'length',
      }).words
    ).toEqual(['games', 'mages', 'same', 'as', 'a']);
  });

  it('caps transferred results while preserving the full match count', () => {
    const outcome = runWordSearch(dictionary, {
      input: 'c?t',
      limit: 2,
      operation: 'pattern',
      sortBy: 'alphabetical',
    });

    expect(outcome.words).toEqual(['cat', 'cot']);
    expect(outcome.total).toBe(3);
    expect(outcome.truncated).toBe(true);
  });

  it('sorts blank-tile Scrabble results by their actual rack score', () => {
    const outcome = runWordSearch(new Set(['za', 'ba']), {
      input: '?a',
      limit: 100,
      operation: 'scrabble',
      sortBy: 'score',
    });

    expect(outcome.words).toEqual(['ba', 'za']);
  });

  it('treats fixed board prefixes and suffixes as letters outside the rack', () => {
    const outcome = runWordSearch(new Set(['cat', 'cats', 'cater']), {
      input: 'ers',
      limit: 100,
      operation: 'scrabble',
      prefix: 'cat',
      sortBy: 'score',
    });

    expect(outcome.words).toEqual(['cater', 'cats']);

    const suffixOutcome = runWordSearch(new Set(['cat', 'scat']), {
      input: 's',
      limit: 100,
      operation: 'scrabble',
      sortBy: 'score',
      suffix: 'cat',
    });

    expect(suffixOutcome.words).toEqual(['scat']);
  });
});
