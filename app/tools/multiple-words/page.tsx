import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Anagram Solver Multiple Words - Free 2 & 3 Word Finder',
  description:
    'Use this free multiple word anagram solver to find exact 2-word and 3-word phrase anagrams. Filter by dictionary, word length, and required words.',
  keywords: [
    'anagram solver multiple words',
    'multiple word anagram solver',
    'two word anagram solver',
    'multi word anagram solver',
    'phrase anagram solver',
  ],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/multiple-words',
  },
  openGraph: {
    title: 'Anagram Solver Multiple Words - Free 2 & 3 Word Finder',
    description:
      'Find exact multi-word anagrams from names, phrases, and puzzle clues with fast filters for 2-word and 3-word results.',
    url: 'https://anagram-solver.co/tools/multiple-words',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anagram Solver Multiple Words - Free 2 & 3 Word Finder',
    description:
      'Find exact multi-word anagrams from names, phrases, and puzzle clues with fast filters for 2-word and 3-word results.',
  },
};

const faqs = [
  {
    question: 'Does this solver use every letter?',
    answer:
      'Yes. The multiple word anagram solver ignores spaces and punctuation, then returns phrases that use every input letter exactly once.',
  },
  {
    question: 'Can I find exactly two-word anagrams?',
    answer:
      'Yes. Choose Exactly 2 words in the Word count filter to show only two-word anagram results.',
  },
  {
    question: 'Why do some long phrases take longer?',
    answer:
      'Multi-word anagrams require checking many word combinations. The common dictionary is faster, while the full dictionary searches a wider word list.',
  },
  {
    question: 'What does the Must include filter do?',
    answer:
      'Use Must include when one word is already known. For example, entering the as a required word will only show phrases containing the.',
  },
];

export default function MultipleWordsPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Anagram Solver Multiple Words',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: 'https://anagram-solver.co/tools/multiple-words',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
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
        eyebrow="Word tools"
        title="Anagram Solver for Multiple Words"
        description="Find exact 2-word and 3-word anagrams from names, phrases, and puzzle clues. Use every letter once, filter by word length, and require a known word when you already have part of the answer."
        heroContent={<MultipleWordsAnagramTool />}
      >
        <InnerContent wide>
            <div className="editorial-copy">
              <h2>Find Phrase Anagrams That Use Every Letter</h2>
              <p>
                This multiple word anagram solver is built for phrase anagrams, not just single-word
                word lists. Enter a name, clue, or sentence fragment, and the tool searches for
                combinations that use the same letters exactly once. That makes it useful for puzzle
                solving, wordplay, classroom exercises, and checking whether a phrase can be turned
                into a clean two-word or three-word anagram.
              </p>

              <h2>How to Search for Multiple Word Anagrams</h2>
              <p>
                Start by entering your letters or phrase. Choose whether you want exactly two words
                or exactly three words, then set a minimum word length to remove short filler words.
                If you already know one word in the answer, add it to the Must include field. The
                common dictionary is best for faster, readable results. The full dictionary is better
                when you want a broader search and do not mind more unusual words.
              </p>

              <h2>Two-Word vs Three-Word Anagrams</h2>
              <p>
                Two-word anagrams are usually easier to scan and more likely to form memorable
                phrases. Three-word anagrams can reveal more combinations, especially for longer
                inputs, but they may include smaller words. Use the exact word count filter when a
                puzzle clue says the answer has a specific number of words.
              </p>

              <h2>Examples to Try</h2>
              <ul>
                <li>SCHOOLMASTER can produce THE + CLASSROOM.</li>
                <li>THE EYES can produce THEY + SEE.</li>
                <li>ASTRONOMER can produce MOON + STARER.</li>
              </ul>

              <h2>Why No Result Appears</h2>
              <p>
                Multi-word anagrams are stricter than ordinary word finders because every letter has
                to be used. If no result appears, lower the minimum word length, switch to the full
                dictionary, remove the required word, or try exactly three words instead of exactly
                two. Short inputs often do not have enough letters to form a useful phrase.
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
                href="/tools/two-word-anagram-solver"
                className="related-link"
              >
                <h3>Two Word Anagram Solver</h3>
                <p>
                  Focus on exact two-word phrase anagrams for names, clues, and short phrases.
                </p>
              </Link>

              <Link
                href="/tools/three-word-anagram-solver"
                className="related-link"
              >
                <h3>Three Word Anagram Solver</h3>
                <p>
                  Explore exact three-word phrase anagrams for longer names and clues.
                </p>
              </Link>

              <Link
                href="/tools/word-finder"
                className="related-link"
              >
                <h3>Word Finder</h3>
                <p>
                  Search words by letters, length, and wildcard patterns.
                </p>
              </Link>
            </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
