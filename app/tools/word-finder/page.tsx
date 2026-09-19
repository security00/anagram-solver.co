import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import WordFinderTool from '@/components/WordFinderTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Finder from Letters & Wildcard Patterns (Free)',
  description:
    'Find English words that can be built from available letters or match fixed-length patterns with ? wildcards. Fast, free in-browser solver with length filters.',
  keywords: [
    'word finder',
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
    title: 'Word Finder from Letters & Wildcard Patterns (Free)',
    description:
      'Find English words that can be built from available letters or match fixed-length patterns with ? wildcards. Fast, free in-browser solver with length filters.',
    url: getCanonicalUrl('/tools/word-finder'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Finder from Letters & Wildcard Patterns (Free)',
    description:
      'Find English words that can be built from available letters or match fixed-length patterns with ? wildcards. Fast, free in-browser solver with length filters.',
  },
};

const faqs = [
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
      title="Word Finder"
      description="Build words from available letters or search an exact-length pattern with unknown positions."
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
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <section key={faq.question} className="mt-4">
              <h3 className="text-lg font-bold text-[#061a38]">{faq.question}</h3>
              <p className="mt-1 text-sm text-[#52657d]">{faq.answer}</p>
            </section>
          ))}
        </div>

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
