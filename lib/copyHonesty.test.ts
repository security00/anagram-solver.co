import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const src = (file: string) => readFileSync(resolve(process.cwd(), file), 'utf8');

const surfaces = [
  'app/page.tsx',
  'app/faq/page.tsx',
  'app/about/page.tsx',
  'app/layout.tsx',
  'components/AnagramSolverTool.tsx',
  'components/Footer.tsx',
  'app/tools/words-with-friends-finder/page.tsx',
  'app/tools/jumble-solver/page.tsx',
  'components/WordsWithFriendsTool.tsx',
  'components/JumbleSolverTool.tsx',
];

describe('approved dictionary copy', () => {
  it.each(surfaces)('%s does not revive the old size or official-points claim', (file) => {
    const text = src(file);
    expect(text).not.toContain('178');
    expect(text).not.toContain('170,000');
    expect(text).not.toContain('Official Scrabble &');
    expect(text).not.toContain('Official Tile Scoring');
    expect(text).not.toContain('Ad-Free');
  });

  it('routes both new tools in the sitemap once', () => {
    const sitemap = src('public/sitemap.xml');
    expect(sitemap.match(/tools\/words-with-friends-finder</g)?.length).toBe(1);
    expect(sitemap.match(/tools\/jumble-solver</g)?.length).toBe(1);
  });

  it('keeps the WWF page on style points and off board solving', () => {
    const page = src('app/tools/words-with-friends-finder/page.tsx');
    expect(page).toContain('not an official Words With Friends® dictionary or tournament word list');
    expect(page).toContain('does not read your board from a screenshot');
    expect(page).not.toContain('board AI');
  });

  it('keeps the jumble page an exact-anagram tool without an answer calendar', () => {
    const page = src('app/tools/jumble-solver/page.tsx');
    expect(page).toContain('not a daily');
    expect(page).not.toContain('yesterday');
    expect(page).not.toContain('/tools/wordle-solver');
  });
});
