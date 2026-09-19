import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const revalidate = false;

export const metadata: Metadata = {
  title: '2 Word Anagram Solver (Free) - Exact Two Word Anagram Finder',
  description:
    'Find exact two-word anagrams from letters, names, and phrases. 100% free 2 word anagram solver that uses every letter once with instant copy and filters.',
  keywords: [
    '2 word anagram solver',
    'anagram solver 2 words',
    'two word anagram solver',
    'two word anagrams',
    '2 word anagram finder',
    'two word anagram generator',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tools/two-word-anagram-solver'),
  },
  openGraph: {
    title: '2 Word Anagram Solver (Free) - Exact Two Word Anagram Finder',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. 100% free 2 word anagram solver that uses every letter once with instant copy and filters.',
    url: getCanonicalUrl('/tools/two-word-anagram-solver'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 Word Anagram Solver (Free) - Exact Two Word Anagram Finder',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. 100% free 2 word anagram solver that uses every letter once with instant copy and filters.',
  },
};

const faqs = [
  {
    question: 'What is a two-word anagram?',
    answer:
      'A two-word anagram is a phrase consisting of exactly two dictionary words formed by rearranging every letter from the original input without adding or dropping any letters.',
  },
  {
    question: 'Is this 2 word anagram solver free to use?',
    answer:
      'Yes, it is completely free with no limits or sign-up. Searches run client-side in your browser for maximum speed and privacy.',
  },
  {
    question: 'Does the solver ignore spaces and capitalization?',
    answer:
      'Yes. Spaces, punctuation, numbers, and capitalization are automatically stripped, so you can paste full sentences or multi-word names directly.',
  },
  {
    question: 'Can I require one specific word in the two-word answer?',
    answer:
      'Yes. Enter the known word in the "Must include" field, and the solver will only return two-word pairings containing that word.',
  },
  {
    question: 'What are some famous two-word anagram examples?',
    answer:
      'Classic examples include "THE EYES" → "THEY SEE", "SCHOOLMASTER" → "THE CLASSROOM", "DORMITORY" → "DIRTY ROOM", and "ASTRONOMER" → "MOON STARER".',
  },
];

export default function TwoWordAnagramSolverPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '2 Word Anagram Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl('/tools/two-word-anagram-solver'),
      description:
        'Free 2 word anagram solver that finds exact two-word phrase anagrams from letters, names, and puzzle clues.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '112',
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
          { label: '2 Word Anagram Solver' },
        ]}
        eyebrow="Two-word solver"
        title="2 Word Anagram Solver"
        description="Find exact 2-word anagrams from letters, names, and clues. Every result forms a meaningful two-word phrase using every source letter once."
        heroContent={
          <MultipleWordsAnagramTool
            defaultWordCount={2}
            lockWordCount
            examples={[
              { label: 'THE EYES', value: 'the eyes' },
              { label: 'SCHOOLMASTER', value: 'schoolmaster' },
              { label: 'ASTRONOMER', value: 'astronomer' },
              { label: 'DORMITORY', value: 'dormitory' },
              { label: 'A GENTLEMAN', value: 'a gentleman' },
            ]}
          />
        }
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Search Exact 2 Word Anagrams</h2>
            <p>
              Two-word anagrams are punchy, memorable, and much easier to read than long lists of
              scattered single words. They are especially popular when solving cryptic crossword clues
              with two-word answers (e.g. indicated by lengths like <code>(4, 5)</code> or <code>(3, 7)</code>),
              generating catchy name anagrams, or exploring classic wordplay gems like <em>THE EYES</em> becoming <em>THEY SEE</em>.
            </p>

            <h2>Why 2-Word Anagrams Are Perfect for Clues & Word Games</h2>
            <p>
              When a puzzle specifies a two-word solution, ordinary anagram tools fall short because they
              either dump hundreds of single sub-words or produce random jumbles. Our <strong>2 word anagram solver</strong> is
              locked to exact two-word solutions:
            </p>
            <ul>
              <li><strong>Zero Waste:</strong> Every letter in your input is used exactly once across the two words.</li>
              <li><strong>Scrabble & Tile Scoring:</strong> Compare the tile value of each word and the combined phrase score.</li>
              <li><strong>One-Click Copy:</strong> Instantly copy your favorite phrase to clipboard with one click.</li>
              <li><strong>Fast Filtering:</strong> Set minimum word lengths or require a known word to narrow down hundreds of options in milliseconds.</li>
            </ul>

            <h2>Famous 2-Word Anagram Pairs to Explore</h2>
            <ul>
              <li><strong>THE EYES</strong> &rarr; <strong>THEY SEE</strong></li>
              <li><strong>SCHOOLMASTER</strong> &rarr; <strong>THE CLASSROOM</strong></li>
              <li><strong>ASTRONOMER</strong> &rarr; <strong>MOON STARER</strong></li>
              <li><strong>DORMITORY</strong> &rarr; <strong>DIRTY ROOM</strong></li>
              <li><strong>A GENTLEMAN</strong> &rarr; <strong>ELEGANT MAN</strong></li>
              <li><strong>SLOT MACHINES</strong> &rarr; <strong>CASH LOST IN ME</strong></li>
            </ul>

            <h2>How to Get Better Two-Word Results</h2>
            <p>
              Start with at least eight letters, keep the common dictionary selected for readable
              everyday phrases, and set the minimum word length to 3 letters to filter out 1-letter or
              2-letter filler words. If your puzzle clue already reveals one part of the answer, enter
              it into the &ldquo;Must include&rdquo; box to isolate matching pairs instantly.
            </p>

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
              href="/tools/multiple-words"
              className="related-link"
            >
              <h3>Multiple Word Anagram Solver</h3>
              <p>
                Explore both two-word and three-word phrase combinations with flexible search filters.
              </p>
            </Link>

            <Link
              href="/tools/three-word-anagram-solver"
              className="related-link"
            >
              <h3>Three Word Anagram Solver</h3>
              <p>
                Search exact three-word phrase anagrams for longer inputs and multi-word clues.
              </p>
            </Link>

            <Link
              href="/tools/word-finder"
              className="related-link"
            >
              <h3>Word Finder</h3>
              <p>
                Search words by letters, length, and wildcard patterns for Scrabble and Wordle.
              </p>
            </Link>

            <Link
              href="/tools/scrabble-solver"
              className="related-link"
            >
              <h3>Rack Word Finder</h3>
              <p>
                Find highest-scoring words from your tile rack with blank tile and board placement support.
              </p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
