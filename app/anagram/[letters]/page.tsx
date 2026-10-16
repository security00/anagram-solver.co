import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import { isIndexable, puzzleEntries, solvePuzzle } from '@/lib/puzzleWords';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

type Params = { letters: string };

export function generateStaticParams(): Params[] {
  return puzzleEntries.map((e) => ({ letters: e.letters }));
}

const up = (s: string) => s.toUpperCase();
const list = (words: string[]) => words.map(up).join(', ');

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { letters } = await params;
  const entry = puzzleEntries.find((e) => e.letters === letters);
  if (!entry) return {};
  const s = solvePuzzle(letters);
  const L = up(letters);
  const title = `${L} Anagram: Unscramble ${L} (${s.answers.length > 1 ? 'Answers' : 'Answer'} + Words)`;
  const description = `${L} unscrambles to ${list(s.answers)}. See every exact anagram of ${L}, ${s.shorterCount} shorter words grouped by length, and multi-word phrases.`;
  const path = `/anagram/${letters}`;
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(path) },
    robots: isIndexable(entry) ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: getCanonicalUrl(path), type: 'article' },
  };
}

export default async function PuzzleWordPage({ params }: { params: Promise<Params> }) {
  const { letters } = await params;
  if (!puzzleEntries.some((e) => e.letters === letters)) notFound();
  const s = solvePuzzle(letters);
  const L = up(letters);
  const faqs = [
    {
      question: `What does ${L} unscramble to?`,
      answer: `${L} unscrambles to ${list(s.answers)}${s.answers.length > 1 ? ' — each uses all ' + letters.length + ' letters exactly once' : ', using all ' + letters.length + ' letters exactly once'}.${s.extendedAnswers.length ? ` The extended dictionary also accepts ${list(s.extendedAnswers)}.` : ''}`,
    },
    {
      question: `How many words can you make from ${L}?`,
      answer: `Using the common English dictionary, ${s.shorterCount} shorter words of 3 letters or more can be made from ${L}, listed by length on this page.`,
    },
    {
      question: `Can ${L} be split into two or more words?`,
      answer: s.phrases.length
        ? `Yes. Examples include ${s.phrases.slice(0, 3).map(up).join(', ')}.`
        : `Not with common words of 3 letters or more. Try the multiple word anagram solver with a lower minimum length.`,
    },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InnerPageShell
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/anagram', label: 'Puzzle anagrams' },
          { label: `${L} anagram` },
        ]}
        eyebrow="Puzzle anagram"
        title={`${L} Anagram`}
        description={`${L} unscrambles to ${list(s.answers)}. Below are all exact anagrams, shorter words and phrases from these ${letters.length} letters.`}
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Anagrams of {L}</h2>
            <ul>
              {s.answers.map((w) => (
                <li key={w}><strong>{up(w)}</strong></li>
              ))}
            </ul>
            {s.extendedAnswers.length > 0 && (
              <p>Also valid in the extended dictionary: {list(s.extendedAnswers)}.</p>
            )}

            <h2>Words From {L} by Length</h2>
            {s.wordsByLength.map((g) => (
              <section key={g.length}>
                <h3>{g.length}-letter words ({g.words.length})</h3>
                <p>{list(g.words)}</p>
              </section>
            ))}

            <h2>Multi-Word Phrases From {L}</h2>
            {s.phrases.length ? (
              <ul>
                {s.phrases.map((p) => <li key={p}>{up(p)}</li>)}
              </ul>
            ) : (
              <p>No two- or three-word phrases made only of common words with 3 or more letters.</p>
            )}

            <p>
              <Link href={`/?q=${letters}`}>Open {L} in the anagram solver</Link> to change dictionaries,
              sort by points, or try different letters.
            </p>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f) => (
              <section key={f.question}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </section>
            ))}
          </div>

          <RelatedLinkGrid>
            <Link href="/anagram" className="related-link">
              <h3>More Puzzle Anagrams</h3>
              <p>Other scrambled words people are searching for.</p>
            </Link>
            <Link href="/" className="related-link">
              <h3>Anagram Solver</h3>
              <p>Unscramble any letters into exact anagrams and shorter words.</p>
            </Link>
            <Link href="/tools/multiple-words" className="related-link">
              <h3>Multiple Word Anagram Solver</h3>
              <p>Split letters into two-, three- or four-word phrases.</p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
