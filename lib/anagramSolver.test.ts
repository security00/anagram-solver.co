import { describe, expect, it } from 'vitest';

import {
  calculateRackScore,
  findAnagrams,
  findMultiWordAnagrams,
  findWithWildcards,
  findWordsFromLetters,
  searchMultiWordAnagrams,
} from './anagramSolver';

describe('findAnagrams', () => {
  it('returns only words that use every input letter exactly once', () => {
    const dictionary = new Set(['a', 'as', 'games', 'mages', 'smega', 'same']);

    expect(findAnagrams('games', dictionary)).toEqual(['games', 'mages', 'smega']);
  });

  it('ignores spaces, punctuation, and letter case in phrases', () => {
    const dictionary = new Set(['theysee', 'theeyes', 'sheet']);

    expect(findAnagrams('The eyes!', dictionary)).toEqual(['theysee', 'theeyes']);
  });
});

describe('findWithWildcards', () => {
  it('treats only question marks as wildcards and never interprets regex syntax', () => {
    const dictionary = new Set(['cat', 'cot', 'cut', '[at']);

    expect(findWithWildcards('c?t', dictionary)).toEqual(['cat', 'cot', 'cut']);
    expect(() => findWithWildcards('[', dictionary)).not.toThrow();
    expect(findWithWildcards('[at', dictionary)).toEqual(['[at']);
  });
});

describe('findWordsFromLetters', () => {
  it('keeps subset-word behavior separate from exact anagrams', () => {
    const dictionary = new Set(['a', 'as', 'games', 'mages', 'same']);

    expect(findWordsFromLetters('games', dictionary)).toEqual([
      'a',
      'as',
      'games',
      'mages',
      'same',
    ]);
  });

  it('supports question marks and asterisks as blank tiles', () => {
    const dictionary = new Set(['cat', 'cot', 'cut', 'coat']);

    expect(findWordsFromLetters('c?t', dictionary)).toEqual(['cat', 'cot', 'cut']);
    expect(findWordsFromLetters('c*t', dictionary)).toEqual(['cat', 'cot', 'cut']);
  });
});

describe('calculateRackScore', () => {
  it('scores letters supplied by blank tiles as zero points', () => {
    expect(calculateRackScore('cat', 'c?t')).toBe(4);
    expect(calculateRackScore('qi', '?i')).toBe(1);
  });
});

describe('findMultiWordAnagrams', () => {
  it('applies a required word before the result limit is reached', () => {
    const dictionary = new Set(['ate', 'bat', 'b', 'e']);
    const options = {
      exactWordCount: 2,
      maxResults: 1,
      minWordLength: 1,
      requiredWord: 'e',
    };

    expect(findMultiWordAnagrams('ateb', dictionary, 2, options)).toEqual([
      ['bat', 'e'],
    ]);
  });

  it('stops at a deterministic search budget and reports truncation', () => {
    const dictionary = new Set(['ate', 'bat', 'b', 'e']);

    const outcome = searchMultiWordAnagrams('ateb', dictionary, 2, {
      exactWordCount: 2,
      maxResults: 100,
      maxSearchStates: 1,
      minWordLength: 1,
    });

    expect(outcome.results).toEqual([]);
    expect(outcome.truncated).toBe(true);
    expect(outcome.stopReason).toBe('search-budget');
    expect(outcome.visitedStates).toBe(1);
  });

  it('rejects an impossible required word before starting the search', () => {
    const outcome = searchMultiWordAnagrams(
      'ateb',
      new Set(['ate', 'bat', 'b', 'e']),
      2,
      { exactWordCount: 2, requiredWord: 'z' }
    );

    expect(outcome.results).toEqual([]);
    expect(outcome.truncated).toBe(false);
    expect(outcome.visitedStates).toBe(0);
  });
});
