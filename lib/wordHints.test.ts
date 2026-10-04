import { describe, expect, it } from 'vitest';
import { getHomeDailyChallenge } from './dailyChallenge';
import { getWordHint, getWordLookupHref } from './wordHints';

describe('word hints', () => {
  it('returns a local gloss for high-value tiles', () => {
    expect(getWordHint('QI')).toMatch(/vital energy/i);
    expect(getWordHint('za')).toMatch(/pizza/i);
    expect(getWordHint('unknownword')).toBeNull();
  });

  it('builds a Wiktionary lookup URL', () => {
    expect(getWordLookupHref('Silent')).toBe('https://en.wiktionary.org/wiki/silent');
  });
});

describe('daily challenge', () => {
  it('returns a stable challenge for a UTC date', () => {
    const first = getHomeDailyChallenge(new Date('2026-10-04T00:00:00Z'));
    const same = getHomeDailyChallenge(new Date('2026-10-04T23:00:00Z'));
    expect(first.prompt).toBe(same.prompt);
    expect(first.href).toContain('q=');
  });
});
