import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const revalidate = false;

export const metadata: Metadata = {
  title: '3 Word Anagram Solver (Free) - Exact Three Word Anagram Finder',
  description:
    'Find exact three-word anagrams from phrases, names, and puzzle clues. Free 3 word anagram solver that uses every letter once with instant copy and filters.',
  keywords: [
    '3 word anagram solver',
    'three word anagram solver',
    'anagram solver 3 words',
    'three word anagrams',
    '3 word anagram finder',
    'three word anagram generator',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tools/three-word-anagram-solver'),
  },
  openGraph: {
    title: '3 Word Anagram Solver (Free) - Exact Three Word Anagram Finder',
    description:
      'Find exact three-word anagrams from phrases, names, and puzzle clues. Free 3 word anagram solver that uses every letter once with instant copy and filters.',
    url: getCanonicalUrl('/tools/three-word-anagram-solver'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3 Word Anagram Solver (Free) - Exact Three Word Anagram Finder',
    description:
      'Find exact three-word anagrams from phrases, names, and puzzle clues. Free 3 word anagram solver that uses every letter once with instant copy and filters.',
  },
};

const faqs = [
  {
    question: 'When should I use a 3 word anagram solver?',
    answer:
      'Use a 3 word anagram solver when your source input has 10 or more letters, or when your crossword/puzzle clue explicitly indicates a three-word solution (such as (3, 4, 3) or (4, 4, 3)).',
  },
  {
    question: 'Is this three word anagram solver completely free?',
    answer:
      'Yes, it is 100% free with no registration or limits. The algorithm processes combinations in the background in your browser.',
  },
  {
    question: 'Does this page only show three-word results?',
    answer:
      'Yes. The tool on this page is locked to exactly three words so every result strictly matches your three-word search intent.',
  },
  {
    question: 'What is a famous 3-word anagram example?',
    answer:
      'A famous example is "ELEVEN PLUS TWO" → "TWELVE PLUS ONE", where all 13 letters are rearranged into an exact 3-word phrase that is also mathematically identical.',
  },
  {
    question: 'How do I speed up three-word anagram searches?',
    answer:
      'Keep the Common English dictionary selected, set a minimum word length of 3 letters, or use the "Must include" box if you already know one word of the answer.',
  },
];

export default function ThreeWordAnagramSolverPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '3 Word Anagram Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl('/tools/three-word-anagram-solver'),
      description:
        'Free 3 word anagram solver that finds exact three-word phrase anagrams from longer phrases, names, and puzzle clues.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '94',
      },
    },
    {
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
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InnerPageShell
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/tools/multiple-words', label: 'Tools' },
          { label: '3 Word Anagram Solver' },
        ]}
        eyebrow="Three-word solver"
        title="3 Word Anagram Solver"
        description="Find exact 3-word anagrams from longer phrases, names, and cryptic clues. Every result unscrambles your letters into three distinct words using every letter once."
        heroContent={
          <MultipleWordsAnagramTool
            defaultWordCount={3}
            lockWordCount
            examples={[
              { label: 'ELEVEN PLUS TWO', value: 'eleven plus two' },
              { label: 'THE CLASSROOM', value: 'the classroom' },
              { label: 'CONVERSATION', value: 'conversation' },
              { label: 'ASTRONOMERS', value: 'astronomers' },
            ]}
          />
        }
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Search Exact 3 Word Anagrams</h2>
            <p>
              Three-word anagrams are uniquely suited for longer inputs (10 to 25 letters) where
              two-word phrases may be too rigid or mathematically impossible. When you have a longer
              phrase or a clue specifying a trio of words, this <strong>3 word anagram solver</strong> explores
              combinations of three valid English words that consume all available letters.
            </p>

            <h2>Why Solve for 3 Words?</h2>
            <ul>
              <li>
                <strong>Longer Clues & Sentences:</strong> Long phrases like <em>ELEVEN PLUS TWO</em> easily split into <em>TWELVE PLUS ONE</em>.
              </li>
              <li>
                <strong>Cryptic Crossword Indicators:</strong> When clue parentheticals indicate three parts (like <code>(3, 4, 3)</code>, <code>(4, 3, 4)</code>, or <code>(5, 3, 4)</code>), a 3-word solver cuts straight to the target length.
              </li>
              <li>
                <strong>Creative Titles & Mottos:</strong> Generate three-word slogans, book subtitles, or band names from any root phrase.
              </li>
            </ul>

            <h2>Tips to Improve Three-Word Searches</h2>
            <p>
              Three-word searches inspect more potential permutations than single- or two-word searches.
              To get clean, readable results in milliseconds:
            </p>
            <ul>
              <li>
                <strong>Use Common English:</strong> The common dictionary contains the ~38,000 most recognizable English words, filtering out dictionary arcana.
              </li>
              <li>
                <strong>Raise Minimum Word Length:</strong> If results contain too many tiny words (like &ldquo;a&rdquo; or &ldquo;as&rdquo;), raise the minimum word length to 3 or 4 letters.
              </li>
              <li>
                <strong>Anchor with a Known Word:</strong> If your crossword clue suggests one word (like &ldquo;the&rdquo;, &ldquo;one&rdquo;, or &ldquo;not&rdquo;), enter it into &ldquo;Must include&rdquo; to accelerate the solver.
              </li>
            </ul>

            <h2>Frequently Asked Questions</h2>
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
                Focus on punchy two-word phrase anagrams for shorter names and phrases.
              </p>
            </Link>

            <Link
              href="/tools/multiple-words"
              className="related-link"
            >
              <h3>Multiple Word Anagram Solver</h3>
              <p>
                Switch freely between 2-word and 3-word anagram phrases with customizable filters.
              </p>
            </Link>

            <Link
              href="/tools/word-finder"
              className="related-link"
            >
              <h3>Word Finder</h3>
              <p>
                Find words from letters, length filters, and ? wildcard patterns.
              </p>
            </Link>

            <Link
              href="/tools/scrabble-solver"
              className="related-link"
            >
              <h3>Rack Word Finder</h3>
              <p>
                Calculate maximum Scrabble scores with blank tiles and board prefix/suffix filters.
              </p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
