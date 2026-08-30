import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import ScrabbleSolverTool from '@/components/ScrabbleSolverTool';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Letter Rack Word Finder with Tile Scores',
  description: 'Find English words from a letter rack, use blank tiles, filter by prefix or suffix, and compare base tile scores.',
  alternates: { canonical: 'https://anagram-solver.co/tools/scrabble-solver' },
};

export default function ScrabbleSolverPage() {
  return (
    <InnerPageShell
      eyebrow="Word tools"
      title="Letter Rack Word Finder"
      description="Find words that can be made from a rack, including blank tiles, and compare their base English tile values."
      heroContent={<ScrabbleSolverTool />}
    >
      <InnerContent wide>
          <div className="editorial-columns">
            <div className="editorial-card">
              <h2>How rack search works</h2>
              <p>
                Enter available tiles and use <code>?</code> or <code>*</code> for each blank. Every
                result can be built without using a tile more times than it appears. Optional prefix
                and suffix fields model letters already required by your puzzle; they do not model
                a full game board.
              </p>
            </div>
            <div className="editorial-card">
              <h2>Know the limits</h2>
              <p>
                The spelling source is open SCOWL/English Speller Database data, not an official
                Scrabble lexicon. The displayed total is the sum of rack tile values, with blanks
                worth zero. Board premiums, cross-words, regional rules, and bonuses are not
                calculated, so confirm a play with the authority used by your game.
              </p>
            </div>
          </div>
      </InnerContent>
    </InnerPageShell>
  );
}
