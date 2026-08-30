import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Scrabble Strategy Guide - Anagram Solver',
  description: 'Score more in Scrabble with rack management, board control, and smart power-tile plays. Learn proven tactics to maximize points and block opponents.',
  alternates: { canonical: 'https://anagram-solver.co/blog/scrabble-strategy' },
};

export default function ScrabbleStrategyPage() {
  return (
    <InnerPageShell
      eyebrow="Learning guide"
      title="Scrabble Strategy Guide"
      description="Rack management, board control, and practical ways to make stronger plays."
    >
      <InnerContent>
          <article className="editorial-copy">
            <p>Maximize points by leveraging premium squares, balancing your rack, and blocking opponent hooks.</p>
            <h2>Quick Tips</h2>
            <ul>
              <li>Keep a good vowel/consonant mix; exchange tiles early if needed.</li>
              <li>Use S and blank tiles to create multi-word plays.</li>
              <li>Control hotspots around double/triple letter and word scores.</li>
            </ul>
          </article>
      </InnerContent>
    </InnerPageShell>
  );
}
