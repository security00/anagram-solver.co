import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Master Scrabble Strategy: Advanced Rack Management & Board Tactics',
  description:
    'Elevate your Scrabble game with expert strategies: rack balance, high-probability bingo stems, power tile placements (Q, Z, J, X), board defense, and endgame tile tracking.',
  alternates: { canonical: getCanonicalUrl('/blog/scrabble-strategy') },
  openGraph: {
    title: 'Master Scrabble Strategy: Advanced Rack Management & Board Tactics',
    description:
      'Elevate your Scrabble game with expert strategies: rack balance, high-probability bingo stems, power tile placements (Q, Z, J, X), board defense, and endgame tile tracking.',
    url: getCanonicalUrl('/blog/scrabble-strategy'),
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Scrabble Strategy: Advanced Rack Management & Board Tactics',
    description:
      'Elevate your Scrabble game with expert strategies: rack balance, high-probability bingo stems, power tile placements (Q, Z, J, X), board defense, and endgame tile tracking.',
  },
};

export default function ScrabbleStrategyPage() {
  const canonicalUrl = getCanonicalUrl('/blog/scrabble-strategy');
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
            name: 'Resources',
            item: getCanonicalUrl('/faq'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Scrabble Strategy',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'Master Scrabble Strategy: Advanced Rack Management & Board Tactics',
        description:
          'Elevate your Scrabble game with expert strategies: rack balance, high-probability bingo stems, power tile placements (Q, Z, J, X), board defense, and endgame tile tracking.',
        url: canonicalUrl,
        datePublished: '2026-02-10',
        dateModified: '2026-09-19',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'Anagram Solver Editorial Team',
          url: getCanonicalUrl('/about'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'Anagram Solver',
          logo: {
            '@type': 'ImageObject',
            url: getCanonicalUrl('/design/brand-mark.webp'),
          },
        },
      },
    ],
  };

  return (
    <InnerPageShell
      eyebrow="Tactical Playbook"
      title="Advanced Scrabble Strategy Guide"
      description="Learn how tournament champions control the board, balance tile racks, maximize power tiles, and hunt 50-point bingos turn after turn."
    >
      <InnerContent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="editorial-copy">
          <section>
            <h2>The Mathematics &amp; Psychology of Winning Scrabble</h2>
            <p>
              Novice Scrabble players focus exclusively on the single highest-scoring move visible on their current
              turn. Tournament champions, by contrast, treat every play as an investment in probability and board
              geography. They know that scoring 28 points while dumping consonants and leaving an unworkable rack of
              three I&apos;s and an O will lose more points in future turns than playing a 16-point move that leaves
              a balanced, high-potential tile rack.
            </p>
            <p>
              Scrabble is a game of 100 tiles, 225 grid squares, and incomplete information. By mastering rack
              leave evaluation, controlling premium multiplier access, executing devastating parallel plays, and
              tracking unseen tiles, you can consistently outperform opponents regardless of tile luck.
            </p>
          </section>

          <section>
            <h2>1. Rack Balance &amp; The Concept of &ldquo;Leaves&rdquo;</h2>
            <p>
              Your &ldquo;leave&rdquo; is the combination of tiles you deliberately retain on your rack after placing
              a word. Managing your leave is the single most decisive factor in winning competitive word games:
            </p>

            <div className="mt-6 space-y-6">
              <div className="rounded border border-[#d9e5ec] bg-[#f8fbfa] p-6">
                <h3 className="text-xl font-bold text-[#061a38]">The Ideal 3:4 Vowel-to-Consonant Ratio</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  With 7 tiles on your rack, aim to maintain either <strong>3 vowels and 4 consonants</strong>, or{' '}
                  <strong>2 vowels and 5 consonants</strong>. An overload of vowels (e.g., A-A-E-I-O) or consonants
                  (e.g., B-C-G-K-R-T) prevents you from forming natural English syllable structures. When faced with
                  an unbalanced rack, your highest priority is to shed surplus duplicate letters even on modest-scoring
                  placements.
                </p>
              </div>

              <div className="rounded border border-[#d9e5ec] bg-[#f8fbfa] p-6">
                <h3 className="text-xl font-bold text-[#061a38]">Premium Leaves vs. Toxic Leaves</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Certain letter combinations dramatically increase your odds of scoring a 50-point bingo (playing all
                  7 tiles) on the subsequent turn. Protect high-synergy leaves and discard clunky, inflexible tiles:
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded border border-[#8ed7e0] bg-[#f4fbfc] p-4 text-xs">
                    <p className="font-bold text-[#008f9e]">Top Tier Leaves to Keep:</p>
                    <p className="mt-1 font-mono text-[#061a38]">E-R-S &bull; R-E-T &bull; I-N-G &bull; S-A-T &bull; A-E-R</p>
                    <p className="mt-1 text-[#687b91]">These stems seamlessly link with high-frequency vowels and consonants.</p>
                  </div>
                  <div className="rounded border border-[#ffd5cc] bg-[#fff8f6] p-4 text-xs">
                    <p className="font-bold text-[#c93b2b]">Toxic Leaves to Dump Fast:</p>
                    <p className="mt-1 font-mono text-[#061a38]">U-U &bull; I-I-I &bull; V-V &bull; B-C-K &bull; Q (no U)</p>
                    <p className="mt-1 text-[#687b91]">Duplicate awkward consonants or triplicate vowels severely limit flexibility.</p>
                  </div>
                </div>
              </div>

              <div className="rounded border border-[#d9e5ec] bg-[#f8fbfa] p-6">
                <h3 className="text-xl font-bold text-[#061a38]">When to Exchange Tiles</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Passing a turn to exchange tiles is not a defeat—it is a strategic reset. If you hold 5 vowels with no
                  blank or high-scoring synergy, and the board offers no parallel dump play exceeding 15 points, exchange
                  3 to 4 surplus vowels immediately rather than limping forward for three consecutive 8-point turns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>2. Board Geometry &amp; Hotspot Control</h2>
            <p>
              The Scrabble board is not neutral terrain. Certain squares dictate the flow and score differential of
              the entire match:
            </p>

            <div className="mt-6 space-y-6">
              <div className="border-l-4 border-[#00aebf] bg-white p-5">
                <h3 className="text-lg font-bold text-[#061a38]">The Opening Gambit: Avoid Free Triple Lanes</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  When playing the first word from the center star (H8), avoid placing a 4-letter word that ends on
                  a Double Letter square or stops 2 squares short of a Triple Word square. Playing a 5-letter word
                  reaching column 12 (L8) forces the opponent to deal with awkward perimeter angles rather than
                  awarding them an effortless opening bonus.
                </p>
              </div>

              <div className="border-l-4 border-[#00aebf] bg-white p-5">
                <h3 className="text-lg font-bold text-[#061a38]">Guarding Triple Word Squares (TWS)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Never float a vowel within 1 or 2 squares of an open Triple Word square unless you are certain you can
                  exploit it next turn. Floating an &lsquo;A&rsquo; or &lsquo;E&rsquo; within reach of a TWS square is
                  an open invitation for your opponent to drop high-value consonants like Z or J for 40+ points.
                </p>
              </div>

              <div className="border-l-4 border-[#00aebf] bg-white p-5">
                <h3 className="text-lg font-bold text-[#061a38]">Mastering Parallel Plays</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Parallel play is the secret weapon of tournament experts. By dropping a short 3- or 4-letter word
                  directly alongside an existing board word, every letter placed counts towards two words simultaneously.
                  A simple play like <code>ZA</code> laid parallel to <code>AX</code> scores the Z twice, the A twice,
                  and the X twice, easily yielding 45 to 60 points from just two tiles.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>3. Power Tiles Optimization (Q, Z, J, X)</h2>
            <p>
              The four highest-value tiles in Scrabble can either hand you victory or weigh down your rack like anchors:
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded border border-[#8ed7e0] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">The Q Without U Arsenal</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  There are only 4 U&apos;s in the entire 100-tile set. If you draw the Q without a U, do not wait
                  passively. Memorize all key Q-without-U words to cash in the 10 points immediately:
                </p>
                <p className="mt-3 font-mono text-xs font-bold text-[#008f9e]">
                  QI &bull; QAT &bull; SUQ &bull; TRANQ &bull; QOPH &bull; FAQIR &bull; SHEQEL
                </p>
              </div>

              <div className="rounded border border-[#8ed7e0] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">The 10-Point Z Multiplier</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  The Z is the most versatile power tile because it forms quick two-letter words in both directions:
                  <code>ZA</code> (pizza) and <code>ZO</code> (Tibetan crossbreed). Placing the Z on a Double or
                  Triple Letter square crossing two words can single-handedly generate over 60 points.
                </p>
                <p className="mt-3 font-mono text-xs font-bold text-[#008f9e]">
                  ZA &bull; ZO &bull; ZAG &bull; ZEP &bull; COZ &bull; WIZ &bull; ADZE
                </p>
              </div>

              <div className="rounded border border-[#8ed7e0] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">The 8-Point J &amp; X Hooks</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  The letter X is arguably the easiest power tile to score high with because it makes five common
                  2-letter words: <code>AX</code>, <code>EX</code>, <code>OX</code>, <code>XI</code>, and <code>XU</code>.
                  The J creates high-yield cross-words with <code>JO</code>, <code>JAW</code>, and <code>RAJ</code>.
                </p>
                <p className="mt-3 font-mono text-xs font-bold text-[#008f9e]">
                  JO &bull; JIG &bull; JOT &bull; RAJ &bull; AX &bull; EX &bull; XI &bull; XU
                </p>
              </div>

              <div className="rounded border border-[#8ed7e0] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">The S Tile: Scrabble&apos;s Most Precious Asset</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Even though the S is worth only 1 point, there are only four S tiles in the game. An S acts as a hook
                  for thousands of words. Never waste an S on a 12-point play. Save it for a 50-point bingo or a
                  devastating cross-word hook on a Triple Word square worth 40+ points.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>4. Bingo Hunting &amp; 6-Letter Anagram Stems</h2>
            <p>
              A &ldquo;Bingo&rdquo; occurs when you use all 7 tiles on your rack, granting a massive 50-point bonus.
              Games between experienced players are almost always decided by who plays more bingos.
            </p>
            <p className="mt-4">
              To spot bingos consistently, memorize <strong>6-letter stems</strong>. These are clusters of high-probability
              letters that form valid 7-letter anagram words with almost any 7th letter you draw from the bag:
            </p>

            <div className="mt-4 rounded border border-[#cfdde5] bg-[#f8fbfa] p-5 text-sm">
              <h4 className="font-bold text-[#061a38]">Top High-Frequency Bingo Stems:</h4>
              <ul className="mt-3 space-y-2 text-[#52657d]">
                <li>
                  <strong className="text-[#008f9e]">TISANE:</strong> Pairs with 23 out of 26 English letters (e.g. +A =
                  ENTASIA, +B = BANTIES, +C = CINEAST, +D = DESTAIN, +O = ATONIES, +R = NASTIER).
                </li>
                <li>
                  <strong className="text-[#008f9e]">SATIRE:</strong> Forms valid 7-letter words with 22 letters (e.g. +B =
                  BASTIER, +D = AIRDEST, +G = GAIEST, +M = SMARTIE, +P = PIASRET).
                </li>
                <li>
                  <strong className="text-[#008f9e]">RETINA:</strong> Matches with 21 letters to form words like RETINAS,
                  TRAINEE, PAINTER, CERATIN, and TAENIAS.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2>5. The Endgame: Tile Tracking &amp; Going Out First</h2>
            <p>
              When fewer than 7 tiles remain in the bag, Scrabble transitions into complete information chess. By
              counting the tiles already played on the board and those on your own rack, you can calculate the exact
              letters your opponent is holding.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[#52657d]">
              <li>
                <strong>Block Their Best Spots:</strong> If your tile tracking reveals that the opponent holds the Q or Z,
                deliberately block every vowel hook and high-scoring lane they could attach it to.
              </li>
              <li>
                <strong>Dumping and Going Out:</strong> The player who empties their rack first collects twice the value
                of the tiles left on the opponent&apos;s rack. Trapping your opponent with an unplayable Q or V in the final
                turns can flip a 30-point deficit into a thrilling victory.
              </li>
            </ul>
          </section>

          <section>
            <h2>Deliberate Practice with Our Word Tools</h2>
            <p>
              Theoretical knowledge only translates to victory through repetition and post-game analysis:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[#52657d]">
              <li>
                Use our{' '}
                <Link
                  href="/tools/scrabble-solver"
                  className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
                >
                  Letter Rack Word Finder
                </Link>{' '}
                to test rack leaves, analyze blank tile combinations, and calculate exact base point values.
              </li>
              <li>
                Review tricky letter permutations with our{' '}
                <Link
                  href="/"
                  className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
                >
                  Single Word Anagram Solver
                </Link>{' '}
                to uncover high-scoring bingos you missed during match play.
              </li>
              <li>
                Explore our full tactical overview in the{' '}
                <Link
                  href="/blog/word-game-guide"
                  className="font-semibold text-[#008f9e] underline hover:text-[#061a38]"
                >
                  Universal Word Game Guide
                </Link>.
              </li>
            </ul>
          </section>

          <section className="mt-10 rounded border border-[#cfdde5] bg-[#f4f8fa] p-6">
            <h3 className="text-lg font-bold text-[#061a38]">Explore More Tactical Guides</h3>
            <p className="mt-2 text-sm text-[#52657d]">
              Continue mastering vocabulary, letter patterns, and competitive anagram solving:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/blog/anagram-tips"
                className="editorial-nav-btn"
              >
                <span>Anagram Tips &amp; Tricks</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/blog/word-game-guide"
                className="editorial-nav-btn"
              >
                <span>Universal Word Game Guide</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/faq"
                className="editorial-nav-btn"
              >
                <span>Frequently Asked Questions</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>
        </article>
      </InnerContent>
    </InnerPageShell>
  );
}
