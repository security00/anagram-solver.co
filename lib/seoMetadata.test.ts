import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const src = (f: string) => readFileSync(resolve(process.cwd(), f), 'utf8');

const pages: Array<[string, string]> = [
  ['app/page.tsx', 'anagram solver'],
  ['app/tools/scrabble-solver/page.tsx', 'scrabble solver'],
  ['app/tools/word-finder/page.tsx', 'anagram word finder'],
  ['app/tools/anagram-phrase-solver/page.tsx', 'anagram phrase solver'],
  ['app/tools/name-anagram-solver/page.tsx', 'name anagram solver'],
];

describe('SEO metadata', () => {
  it.each(pages)('%s title leads with its main term and fits SERP limits', (file, term) => {
    const s = src(file);
    const title = s.match(/title(?::|\s*=)\s*'([^']+)'/)![1];
    expect(title.toLowerCase().startsWith(term)).toBe(true);
    expect(title.length).toBeLessThanOrEqual(60);
    const desc = s.match(/description(?::|\s*=)\s*\n?\s*'([^']+)'/)![1];
    expect(desc.toLowerCase()).toContain(term);
    expect(desc.length).toBeGreaterThanOrEqual(120);
    expect(desc.length).toBeLessThanOrEqual(160);
  });

  it('sitemap lists the phrase solver once', () => {
    const sm = src('public/sitemap.xml');
    expect(sm.match(/tools\/anagram-phrase-solver</g)?.length).toBe(1);
  });

  it('phrase solver avoids unverified rating markup', () => {
    expect(src('app/tools/anagram-phrase-solver/page.tsx')).not.toContain('aggregateRating');
  });
});

describe('structured data honesty', () => {
  it('no page source emits aggregateRating', async () => {
    const { globSync } = await import('node:fs');
    const files = globSync('app/**/*.tsx');
    expect(files.length).toBeGreaterThan(10);
    for (const f of files) expect(src(f), f).not.toContain('aggregateRating');
  });
});
