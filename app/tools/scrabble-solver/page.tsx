import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import ScrabbleSolverTool from '@/components/ScrabbleSolverTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Scrabble Solver & Scrabble Anagram Finder (With Points)',
  description:
    'Free Scrabble solver: enter your rack, add blanks with ? or *, and get every playable word and Scrabble anagram sorted by points. Board hooks supported.',
  keywords: [
    'scrabble solver',
    'scrabble word finder',
    'letter rack solver',
    'word finder with points',
    'scrabble cheat',
    'scrabble anagram solver',
    'word unscrambler points',
    'scrabble dictionary finder',
  ],
  alternates: { canonical: getCanonicalUrl('/tools/scrabble-solver') },
  openGraph: {
    title: 'Scrabble Solver & Scrabble Anagram Finder (With Points)',
    description:
      'Free Scrabble solver: enter your rack, add blanks with ? or *, and get every playable word and Scrabble anagram sorted by points. Board hooks supported.',
    url: getCanonicalUrl('/tools/scrabble-solver'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scrabble Solver & Scrabble Anagram Finder (With Points)',
    description:
      'Free Scrabble solver: enter your rack, add blanks with ? or *, and get every playable word and Scrabble anagram sorted by points. Board hooks supported.',
  },
};

const faqs = [
  {
    question: 'What is a Scrabble anagram solver?',
    answer:
      'A Scrabble anagram solver unscrambles the tiles on your rack into every valid word you could play. It shows full-rack anagrams (all seven tiles, the 50-point bingo) as well as every shorter word, so you can compare options by points before you place a tile.',
  },
  {
    question: 'How do I find a bingo (a word that uses all 7 tiles)?',
    answer:
      'Type all seven rack letters and look at the longest results first. Any 7-letter result is a full-rack anagram. If none appear, add one board letter in the Prefix or Suffix box to look for 8-letter plays through an open tile.',
  },
  {
    question: 'Which word list does the Scrabble solver use?',
    answer:
      'Results come from open SCOWL / English Speller Database word lists. They are not the official tournament lists (NWL or Collins), so check a word against your game or club dictionary before challenging.',
  },
  {
    question: 'How do I use blank tiles in this Scrabble solver?',
    answer:
      'Enter a question mark (?) or asterisk (*) into your rack for each blank tile you hold. The solver will automatically test all 26 English letters in that position and assign 0 points to the wild tile in accordance with official Scrabble rules.',
  },
  {
    question: 'How do Prefix and Suffix filters help on a game board?',
    answer:
      'Prefix and suffix filters allow you to anchor your rack tiles to existing letters on the game board. For example, if an open "RE-" exists on the board, type "RE" into the Prefix box to find every word you can hook into.',
  },
  {
    question: 'How are word points calculated?',
    answer:
      'Scores reflect standard English tile values (e.g., A=1, D=2, B=3, F=4, K=5, J=8, Q=10). The solver sums face tile values directly; board multipliers (Double/Triple Word and Letter scores) and 50-point Bingo bonuses must be applied on your physical board.',
  },
  {
    question: 'Is this letter rack word finder free and private?',
    answer:
      'Yes, 100% free with no registration or query limits. Search queries run purely client-side inside your browser session and are never logged or sent to external servers.',
  },
];

export default function ScrabbleSolverPage() {
  const canonicalUrl = getCanonicalUrl('/tools/scrabble-solver');

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
            item: getCanonicalUrl('/tools/scrabble-solver'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Letter Rack Word Finder',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Letter Rack Word Finder & Scrabble Solver',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Find highest-scoring English words from letter racks with wildcards (?/*), board hooks, and instant point calculations.',
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
      title="Scrabble Solver &amp; Anagram Finder"
      description="Unscramble your Scrabble rack into every playable word, including blanks, with base tile points for each result."
      heroContent={<ScrabbleSolverTool />}
    >
      <InnerContent wide>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="editorial-columns">
          <div className="editorial-card">
            <h2>How Rack Search &amp; Wildcards Work</h2>
            <p>
              Enter available tiles and use <code>?</code> or <code>*</code> for each blank. Every
              result can be built without using a tile more times than it appears on your rack. Optional prefix
              and suffix fields model letters already required by your puzzle or board placement.
            </p>
          </div>
          <div className="editorial-card">
            <h2>Tile Values &amp; Scoring Scope</h2>
            <p>
              The spelling source is open SCOWL/English Speller Database data. The displayed total is the sum
              of rack tile values, with blanks worth zero points. Board premiums, cross-words, regional rules,
              and 50-point Bingo bonuses are applied on your physical game board.
            </p>
          </div>
        </div>

        <div className="editorial-copy mt-8">
          <h2>How to Use the Scrabble Solver</h2>
          <ol>
            <li><strong>Enter your rack.</strong> Type up to the seven tiles you hold, for example <code>AEIRSTN</code>.</li>
            <li><strong>Add blanks.</strong> Type <code>?</code> or <code>*</code> for each blank tile. Blanks score zero.</li>
            <li><strong>Hook onto the board.</strong> Put letters already on the board in the Prefix or Suffix box.</li>
            <li><strong>Pick the best play.</strong> Results show the base tile points, so compare the top words, then apply board premiums yourself.</li>
          </ol>

          <h2>Scrabble Anagrams vs. Shorter Words</h2>
          <p>
            A Scrabble anagram uses every tile on your rack, such as <em>AEIRSTN</em> becoming <em>RETAINS</em> or
            <em> NASTIER</em>. Those full-rack plays earn the 50-point bingo bonus, so check them first. When no
            full-rack anagram exists, shorter words that keep a balanced leave (a good mix of vowels and consonants,
            plus useful tiles like S and blanks) usually beat the single highest-scoring word.
          </p>

          <h2>Quick Rack Tips</h2>
          <ul>
            <li>Learn the two-letter words: they let you score in two directions at once.</li>
            <li>Hold on to an S or a blank when you can; they turn many plays into bingos.</li>
            <li>Dump duplicate letters and awkward tiles (two Us, a lone Q) instead of chasing a few extra points.</li>
            <li>Use the <Link href="/">exact anagram solver</Link> to see only words that use every letter.</li>
          </ul>

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
            <p>Unscramble letters using every tile exactly once for pure anagram solutions.</p>
          </Link>
          <Link href="/tools/word-finder" className="related-link">
            <h3>Word Finder &amp; Wildcards</h3>
            <p>Search words from letters, length filters, and ? wildcard pattern matching.</p>
          </Link>
          <Link href="/tools/multiple-words" className="related-link">
            <h3>Multiple Word Anagram Solver</h3>
            <p>Break down full letter racks into complete 2-word and 3-word phrase anagrams.</p>
          </Link>
          <Link href="/blog/scrabble-strategy" className="related-link">
            <h3>Scrabble Strategy Guide</h3>
            <p>Master rack leaves, board control, 2-letter words, and 7-letter bingo stems.</p>
          </Link>
        </RelatedLinkGrid>
      </InnerContent>
    </InnerPageShell>
  );
}
