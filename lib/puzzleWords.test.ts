import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { isIndexable, PUZZLE_PAGE_CAP, puzzleEntries, qualifies, solvePuzzle, type PuzzleEntry } from './puzzleWords';

const base: PuzzleEntry = {
  letters: 'loing', addedOn: '2026-01-01', gscWindow: '', gscImpressions28d: 300,
  clicks: null, clicksCheckedOn: null, noindex: false,
};

describe('puzzle word list', () => {
  it(`is capped at ${PUZZLE_PAGE_CAP} entries`, () => {
    expect(puzzleEntries.length).toBeLessThanOrEqual(PUZZLE_PAGE_CAP);
  });
  it('has unique lowercase letter keys', () => {
    const keys = puzzleEntries.map((e) => e.letters);
    expect(new Set(keys).size).toBe(keys.length);
    keys.forEach((k) => expect(k).toMatch(/^[a-z]{4,15}$/));
  });
  it.each(puzzleEntries.map((e) => [e.letters, e] as const))('%s qualifies', (_l, e) => {
    expect(qualifies(e)).toBe(true);
  });
  it('every indexable entry is in the sitemap, noindexed ones are not', () => {
    const sm = readFileSync('public/sitemap.xml', 'utf8');
    for (const e of puzzleEntries) {
      expect(sm.includes(`/anagram/${e.letters}<`)).toBe(isIndexable(e));
    }
  });
});

describe('noindex rule', () => {
  it('keeps young pages indexed', () => {
    expect(isIndexable({ ...base, clicks: 0 }, '2026-02-15')).toBe(true);
  });
  it('noindexes pages older than 60 days with 0 recorded clicks', () => {
    expect(isIndexable({ ...base, clicks: 0 }, '2026-03-15')).toBe(false);
  });
  it('keeps old pages with clicks or no check yet', () => {
    expect(isIndexable({ ...base, clicks: 3 }, '2026-06-01')).toBe(true);
    expect(isIndexable(base, '2026-06-01')).toBe(true);
  });
  it('honours the manual flag', () => {
    expect(isIndexable({ ...base, noindex: true }, '2026-01-02')).toBe(false);
  });
  it('rejects low-impression and answerless entries', () => {
    expect(qualifies({ ...base, gscImpressions28d: 50 })).toBe(false);
    expect(qualifies({ ...base, letters: 'redlayn' })).toBe(false);
  });
  it('solves known answers', () => {
    expect(solvePuzzle('ithrew').answers).toEqual(['whiter', 'wither', 'writhe']);
  });
});

describe('phrases', () => {
  it('finds two-word phrases', () => {
    expect(solvePuzzle('soldpie').phrases.length).toBeGreaterThan(0);
  });
});
