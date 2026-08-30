import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const innerPages = [
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/faq/page.tsx',
  'app/privacy/page.tsx',
  'app/terms/page.tsx',
  'app/blog/anagram-tips/page.tsx',
  'app/blog/scrabble-strategy/page.tsx',
  'app/blog/word-game-guide/page.tsx',
  'app/tools/multiple-words/page.tsx',
  'app/tools/scrabble-solver/page.tsx',
  'app/tools/three-word-anagram-solver/page.tsx',
  'app/tools/two-word-anagram-solver/page.tsx',
  'app/tools/word-finder/page.tsx',
];

const innerTools = [
  'components/AnalyticsScripts.tsx',
  'components/MultipleWordsAnagramTool.tsx',
  'components/ScrabbleSolverTool.tsx',
  'components/WordFinderTool.tsx',
];

const legacyVisualTokens =
  /bg-gradient-to-br|dark:|(?:from|to|bg|text|border|hover:bg)-(?:blue|emerald|fuchsia|gray|green|indigo|pink|purple|sky|violet)-|rounded-(?:md|lg|xl|2xl)|shadow-(?:sm|lg|xl|2xl)/;

function source(file: string) {
  return readFileSync(resolve(process.cwd(), file), 'utf8');
}

describe('inner-page visual system', () => {
  it.each(innerPages)('%s uses the shared inner-page shell', (file) => {
    expect(source(file)).toContain('<InnerPageShell');
  });

  it.each([...innerPages, ...innerTools])('%s avoids legacy visual tokens', (file) => {
    expect(source(file)).not.toMatch(legacyVisualTokens);
  });
});
