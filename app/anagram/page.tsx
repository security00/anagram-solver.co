import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { isIndexable, puzzleEntries, solvePuzzle } from '@/lib/puzzleWords';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'Puzzle Anagrams: Answers to Scrambled Words';
const description =
  'Answers for scrambled puzzle words people search for, such as SOLDPIE, ITHREW and LOING, with every anagram, shorter word and phrase from the letters.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: getCanonicalUrl('/anagram') },
  openGraph: { title, description, url: getCanonicalUrl('/anagram'), type: 'website' },
};

export default function PuzzleHubPage() {
  const items = puzzleEntries
    .filter((e) => isIndexable(e))
    .map((e) => ({ letters: e.letters, answers: solvePuzzle(e.letters).answers }));
  return (
    <InnerPageShell
      breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Puzzle anagrams' }]}
      eyebrow="Puzzle anagrams"
      title="Puzzle Anagram Answers"
      description="Scrambled words from daily puzzles and word games, each with its exact anagram and every word you can make from the letters."
    >
      <InnerContent wide>
        <div className="editorial-copy">
          <h2>Scrambled Words</h2>
          <ul>
            {items.map((i) => (
              <li key={i.letters}>
                <Link href={`/anagram/${i.letters}`}>{i.letters.toUpperCase()}</Link> &rarr;{' '}
                {i.answers.map((a) => a.toUpperCase()).join(', ')}
              </li>
            ))}
          </ul>
          <p>
            Not listed? Type your letters into the <Link href="/">anagram solver</Link>.
          </p>
        </div>
      </InnerContent>
    </InnerPageShell>
  );
}
