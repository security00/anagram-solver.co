import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Game Guide - Anagram Solver',
  description: 'Explore popular word games, core rules, and tactics that improve your play. Build better patterns, manage time, and develop scoring intuition.',
  alternates: { canonical: 'https://anagram-solver.co/blog/word-game-guide' },
};

export default function WordGameGuidePage() {
  return (
    <InnerPageShell
      eyebrow="Learning guide"
      title="Word Game Guide"
      description="Core rules and transferable tactics for popular letter and word games."
    >
      <InnerContent>
          <article className="editorial-copy">
            <p>From Scrabble to Boggle, learn the basic rules and the core tactics that carry across games.</p>
            <h2>Highlights</h2>
            <ul>
              <li>Pattern spotting and board vision.</li>
              <li>Time management and fast filtering.</li>
              <li>Vocabulary building that actually helps scoring.</li>
            </ul>
          </article>
      </InnerContent>
    </InnerPageShell>
  );
}
