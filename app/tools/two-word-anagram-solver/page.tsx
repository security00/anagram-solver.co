import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
  description:
    'Find exact two-word anagrams from letters, names, and phrases. This free 2 word anagram solver uses every letter once and includes useful filters.',
  keywords: [
    'two word anagram solver',
    '2 word anagram solver',
    'anagram solver 2 words',
    'two word anagrams',
  ],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/two-word-anagram-solver',
  },
  openGraph: {
    title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. Use every letter once and filter results quickly.',
    url: 'https://anagram-solver.co/tools/two-word-anagram-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. Use every letter once and filter results quickly.',
  },
};

const faqs = [
  {
    question: 'What is a two-word anagram?',
    answer:
      'A two-word anagram is a phrase of exactly two words made by rearranging all letters from the original input.',
  },
  {
    question: 'Does the solver ignore spaces?',
    answer:
      'Yes. Spaces, punctuation, and capitalization are ignored so you can paste a name or phrase directly.',
  },
  {
    question: 'Can I require one word in the answer?',
    answer:
      'Yes. Add the known word to the Must include field and the solver will only show two-word results that contain it.',
  },
];

export default function TwoWordAnagramSolverPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InnerPageShell
        eyebrow="Word tools"
        title="Two Word Anagram Solver"
        description="Find exact 2 word anagrams from names, phrases, and puzzle clues. Every result uses each source letter once."
        heroContent={<MultipleWordsAnagramTool
            defaultWordCount={2}
            lockWordCount
            examples={[
              { label: 'THE EYES', value: 'the eyes' },
              { label: 'SCHOOLMASTER', value: 'schoolmaster' },
              { label: 'MOON STARER', value: 'moon starer' },
            ]}
          />}
      >
        <InnerContent wide>
            <div className="editorial-copy">
              <h2>Search Exact 2 Word Anagrams</h2>
              <p>
                Two-word anagrams are easier to read than long lists of single words. They are
                useful when a puzzle clue asks for a phrase, when you want a memorable name anagram,
                or when you are checking classic examples like THE EYES becoming THEY SEE. This page
                focuses on exact two-word results so you can scan phrase options quickly.
              </p>

              <h2>How to Get Better Two-Word Results</h2>
              <p>
                Start with at least eight letters, keep the common dictionary selected for readable
                phrases, and raise the minimum word length if you see too many short words. If a clue
                already gives one word, enter it in Must include. Switch to the full dictionary only
                when you need a wider search.
              </p>

              <h2>Two-Word Anagram FAQ</h2>
              {faqs.map((faq) => (
                <section key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </div>

            <RelatedLinkGrid>
              <Link
                href="/tools/multiple-words"
                className="related-link"
              >
                <h3>Multiple Word Anagram Solver</h3>
                <p>
                  Search both two-word and three-word phrase anagrams.
                </p>
              </Link>

              <Link
                href="/tools/three-word-anagram-solver"
                className="related-link"
              >
                <h3>Three Word Anagram Solver</h3>
                <p>
                  Explore longer phrase anagrams with exactly three words.
                </p>
              </Link>

              <Link
                href="/tools/word-finder"
                className="related-link"
              >
                <h3>Word Finder</h3>
                <p>
                  Find words by letters, wildcard patterns, and word length.
                </p>
              </Link>
            </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
