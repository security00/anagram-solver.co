import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
  description:
    'Find exact three-word anagrams from names, clues, and longer phrases. This free 3 word anagram solver uses every letter once with helpful filters.',
  keywords: [
    'three word anagram solver',
    '3 word anagram solver',
    'anagram solver 3 words',
    'three word anagrams',
  ],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/three-word-anagram-solver',
  },
  openGraph: {
    title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
    description:
      'Find exact three-word anagrams from longer phrases. Use every letter once and filter phrase results quickly.',
    url: 'https://anagram-solver.co/tools/three-word-anagram-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
    description:
      'Find exact three-word anagrams from longer phrases. Use every letter once and filter phrase results quickly.',
  },
};

const faqs = [
  {
    question: 'When should I use a three-word anagram solver?',
    answer:
      'Use a three-word anagram solver for longer inputs where a two-word phrase is too restrictive or when a puzzle clue asks for exactly three words.',
  },
  {
    question: 'Are three-word anagrams harder to find?',
    answer:
      'They can take longer because the solver must test more combinations. Lowering the minimum word length or using the common dictionary can make results easier to scan.',
  },
  {
    question: 'Does this page show only three-word results?',
    answer:
      'Yes. The tool on this page is locked to exactly three words so the results match the page intent.',
  },
];

export default function ThreeWordAnagramSolverPage() {
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
        title="Three Word Anagram Solver"
        description="Find exact 3 word anagrams from longer phrases, names, and puzzle clues. Every result uses each source letter once."
        heroContent={<MultipleWordsAnagramTool
            defaultWordCount={3}
            lockWordCount
            examples={[
              { label: 'THE CLASSROOM', value: 'the classroom' },
              { label: 'ELEVEN PLUS TWO', value: 'eleven plus two' },
              { label: 'CONVERSATION', value: 'conversation' },
            ]}
          />}
      >
        <InnerContent wide>
            <div className="editorial-copy">
              <h2>Search Exact 3 Word Anagrams</h2>
              <p>
                Three-word anagrams are useful when a longer phrase has too many letters for a clean
                two-word answer. They often reveal more phrase options, especially when you allow
                shorter connector words. This page keeps the search focused on exactly three words,
                so every result matches that format.
              </p>

              <h2>How to Improve Three-Word Results</h2>
              <p>
                Use longer source text, keep the minimum word length at two or three letters, and
                add a required word only when you are confident it belongs in the answer. If the
                result list feels too broad, raise the minimum word length or switch back to the
                common dictionary.
              </p>

              <h2>Three-Word Anagram FAQ</h2>
              {faqs.map((faq) => (
                <section key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </div>

            <RelatedLinkGrid>
              <Link
                href="/tools/two-word-anagram-solver"
                className="related-link"
              >
                <h3>Two Word Anagram Solver</h3>
                <p>
                  Narrow the search to exact two-word phrase anagrams.
                </p>
              </Link>

              <Link
                href="/tools/multiple-words"
                className="related-link"
              >
                <h3>Multiple Word Anagram Solver</h3>
                <p>
                  Switch between two-word and three-word phrase anagrams.
                </p>
              </Link>
            </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
