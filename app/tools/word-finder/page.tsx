import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import ToolCrossPromo from '@/components/ToolCrossPromo';
import WordFinderTool from '@/components/WordFinderTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Anagram Word Finder: Find Words From Letters (Free)',
  description:
    'Free anagram word finder: enter letters to find every word they make, from 2 letters to full anagrams, or search ? wildcard patterns. Filter by length.',
  keywords: [
    'word finder',
    'anagram finder',
    'anagram word finder',
    'word finder anagram',
    'word finder from letters',
    'word unscrambler',
    'wildcard word finder',
    'words with these letters',
    'make words with letters',
    'pattern word search',
    'free word finder',
  ],
  alternates: { canonical: getCanonicalUrl('/tools/word-finder') },
  openGraph: {
    title: 'Anagram Word Finder: Find Words From Letters (Free)',
    description:
      'Free anagram word finder: enter letters to find every word they make, from 2 letters to full anagrams, or search ? wildcard patterns. Filter by length.',
    url: getCanonicalUrl('/tools/word-finder'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anagram Word Finder: Find Words From Letters (Free)',
    description:
      'Free anagram word finder: enter letters to find every word they make, from 2 letters to full anagrams, or search ? wildcard patterns. Filter by length.',
  },
};

const faqs = [
  {
    question: 'Is this an anagram finder?',
    answer:
      'Yes. Enter your letters and sort by length: results at the top that use every letter are exact anagrams, and everything below them is a shorter word hidden in the same letters. For anagrams only, use the exact anagram solver on the home page.',
  },
  {
    question: 'What is the difference between an anagram solver and a word finder?',
    answer:
      'An exact anagram solver requires using every single letter provided. In contrast, this Word Finder searches for all valid English words that can be formed using any subset of your letters, from short 2-letter words up to full-length words.',
  },
  {
    question: 'How do ? wildcard characters work in pattern search?',
    answer:
      'Each question mark (?) represents exactly one unknown letter in a fixed position. For instance, searching "C?T" matches CAT, COT, and CUT. Searching "?ING" finds 4-letter words ending in ING, such as RING, SING, and WING.',
  },
  {
    question: 'Can I filter words by specific length?',
    answer:
      'Yes, you can set both Minimum Word Length and Maximum Word Length sliders/inputs to narrow down your results to exact puzzle requirements, such as finding only 5-letter words for Wordle.',
  },
  {
    question: 'Are my searches private and free?',
    answer:
      'Yes, 100% free with no registration or limits. All search computations run entirely inside your browser session using high-speed Web Workers without logging or transmitting queries.',
  },
];

export default function WordFinderPage() {
  const canonicalUrl = getCanonicalUrl('/tools/word-finder');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getCanonicalUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: getCanonicalUrl('/tools/word-finder'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Word Finder',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Word Finder & Wildcard Pattern Search',
        applicationCategory: 'SearchApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Find English words from available letters, filter by length, and search fixed-length patterns with ? wildcards.',
        url: canonicalUrl,
      },
      {
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
    ],
  };

  return (
    <InnerPageShell
      eyebrow="Word tools"
      title="Anagram Word Finder"
      description="Find every word you can make from your letters, from short words up to full anagrams, or search a pattern with unknown letters."
      heroContent={<WordFinderTool />}
    >
      <InnerContent wide>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="editorial-columns">
          <div className="editorial-card">
            <h2>Available-Letter Search</h2>
            <p>
              This mode returns words that use no more of each letter than you supplied. Unlike
              the exact anagram solver, a result may use only part of the rack. Set minimum and
              maximum lengths to filter results to your game&apos;s requirements.
            </p>
          </div>
          <div className="editorial-card">
            <h2>Fixed Pattern Matching</h2>
            <p>
              A question mark represents exactly one unknown letter. For example,
              <code> C?T</code> matches CAT, COT, or CUT, while <code>?ING</code> finds
              four-letter words ending in ING. Pattern input is matched character by character,
              making it ideal for crosswords and Wordle hints.
            </p>
          </div>
        </div>

        <div className="editorial-copy mt-8">
          <h2>Anagram Finder and Word Finder in One</h2>
          <p>
            An anagram finder answers &ldquo;what words use all of these letters?&rdquo;, while a word finder answers
            &ldquo;what words can I make from these letters?&rdquo;. This page does both. For example, the letters
            <em> RACE</em> give the anagrams <em>ACRE</em> and <em>CARE</em>, plus shorter words such as <em>ARC</em>,
            <em> CAR</em> and <em>ERA</em>. Sort by length and the full anagrams appear first.
          </p>

          <h2>When to Use Each Tool</h2>
          <ul>
            <li>
              <strong>Word games and 5-letter unscrambling:</strong> set length to 5, or open{' '}
              <Link href="/tools/word-finder?min=5&max=5">word finder with min and max at 5</Link>.
              This is not a green, yellow, or gray Wordle solver.
            </li>
            <li><strong>Exact one-word anagrams:</strong> the <Link href="/">anagram solver</Link> shows only full-letter matches.</li>
            <li><strong>Phrases and names:</strong> the <Link href="/tools/anagram-phrase-solver">anagram phrase solver</Link> splits letters into two or three words, and the <Link href="/tools/name-anagram-solver">name anagram solver</Link> does the same for names.</li>
            <li><strong>Scrabble racks with blanks:</strong> the <Link href="/tools/scrabble-solver">Scrabble solver</Link> adds tile points and board hooks.</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <section key={faq.question} className="mt-4">
              <h3 className="text-lg font-bold text-[#061a38]">{faq.question}</h3>
              <p className="mt-1 text-sm text-[#52657d]">{faq.answer}</p>
            </section>
          ))}
        </div>

        <ToolCrossPromo hint="Five-letter racks, blanks, and jumble words live on these tools:" />
        <RelatedLinkGrid>
          <Link href="/" className="related-link">
            <h3>Exact Anagram Solver</h3>
            <p>Unscramble letters using every letter once for complete word permutations.</p>
          </Link>
          <Link href="/tools/scrabble-solver" className="related-link">
            <h3>Rack Word Finder</h3>
            <p>Calculate maximum tile points with blank tiles and board prefix/suffix hooks.</p>
          </Link>
          <Link href="/tools/multiple-words" className="related-link">
            <h3>Multiple Word Anagram Solver</h3>
            <p>Form 2-word and 3-word phrase anagrams from full letter sets and clues.</p>
          </Link>
          <Link href="/blog/word-game-guide" className="related-link">
            <h3>Universal Word Game Guide</h3>
            <p>Learn core tactics for tile placement, speed anagrams, and deduction puzzles.</p>
          </Link>
        </RelatedLinkGrid>
      </InnerContent>
    </InnerPageShell>
  );
}
