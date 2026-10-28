import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import ToolCrossPromo from '@/components/ToolCrossPromo';
import WordsWithFriendsTool from '@/components/WordsWithFriendsTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'Words With Friends Word Finder (WWF-Style Points)';
const description =
  'Find Words With Friends–style plays from your rack: unscramble letters, use ? blanks, and sort by WWF-style tile points. Free browser tool—not an official WWF word list.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: getCanonicalUrl('/tools/words-with-friends-finder') },
  openGraph: {
    title,
    description,
    url: getCanonicalUrl('/tools/words-with-friends-finder'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const faqs = [
  {
    question: 'Is this an official Words With Friends word finder?',
    answer:
      'No. It is an unofficial fan tool on anagram-solver.co. Results come from open English word lists (Common ≈ 39k, Extended ≈ 142k), not a licensed WWF or ENABLE tournament dictionary.',
  },
  {
    question: 'How are WWF-style points calculated?',
    answer:
      'We sum face tile values using a Words With Friends–style letter chart for sorting. Board multipliers and bingo bonuses are applied in your game, not here.',
  },
  {
    question: 'Can I use blank tiles?',
    answer:
      'Yes. Enter ? or * for each blank. The solver tries letters in that slot; blanks contribute 0 face points.',
  },
  {
    question: 'Why is a word I see in WWF missing here?',
    answer:
      'Game dictionaries change and differ by region. Try Extended mode, check spelling, or confirm the word inside the game. We do not mirror every official update.',
  },
  {
    question: 'Is this free and private?',
    answer:
      'Solving runs in your browser with a Web Worker. No account is required. Ads/analytics follow your cookie choice where applicable.',
  },
  {
    question: 'Words With Friends cheat — is that what this is?',
    answer:
      'People search “WWF cheat” when they want a rack helper. This page only lists dictionary matches from your letters. How you use that in a friendly game is up to you and your table’s rules.',
  },
];

export default function WordsWithFriendsFinderPage() {
  const canonicalUrl = getCanonicalUrl('/tools/words-with-friends-finder');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Words With Friends Word Finder',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any',
        url: canonicalUrl,
        description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InnerPageShell
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/tools/scrabble-solver', label: 'Tools' },
          { label: 'Words With Friends Finder' },
        ]}
        eyebrow="Tools · Words With Friends–style finder"
        title="How do you find Words With Friends words from your letter rack?"
        description="Use this Words With Friends word finder when you want rack anagrams and shorter plays sorted by WWF-style letter points—not Scrabble tournament scores. Type the tiles you hold, add ? or * for each blank, then scan results by length or points."
        heroContent={
          <>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-[#52657d]">
              This page is a rack helper. It does not read your board from a screenshot, and it does not use an official Words With Friends® or ENABLE tournament dictionary. Word lists follow the same open English sources as the rest of <Link href="/" className="font-semibold text-[#008f9e] underline">anagram-solver.co</Link> (Common ≈ 39k · Extended ≈ 142k). Always check a word in your game before you play.
            </p>
            <figure className="media-slot">
              <Image
                src="/design/brand-mark.webp"
                alt="Words With Friends–style word finder: enter your rack, optional blanks, sort by WWF-style points."
                width={72}
                height={72}
              />
              <figcaption>
                Words With Friends–style word finder: enter your rack, optional blanks, sort by WWF-style points.
              </figcaption>
            </figure>
            <WordsWithFriendsTool />
          </>
        }
      >
        <InnerContent wide>
          <article className="editorial-copy">
            <p className="tool-note">Last checked: 2026-10-29</p>
            <h2>How to use the Words With Friends finder</h2>
            <ol>
              <li><strong>Enter your rack.</strong> Type the letters on your tile rack (up to your game’s rack size).</li>
              <li><strong>Add blanks.</strong> Type <code>?</code> or <code>*</code> once per blank. Blank tiles count as wild letters and usually score 0 on the face value.</li>
            </ol>
            <figure className="media-slot">
              <div className="blank-tiles" aria-hidden="true">
                <span>C</span>
                <span>?</span>
                <span>T</span>
              </div>
              <figcaption>Use ? or * for each blank tile; blanks are wild and score zero face points.</figcaption>
            </figure>
            <ol start={3}>
              <li><strong>Optional hooks.</strong> Prefix and Suffix work the same way as Rack Word Finder: enter letters already required by the board or puzzle.</li>
              <li><strong>Pick a play.</strong> Sort by WWF-style points or length. Apply board multipliers yourself—this tool only sums face tile values.</li>
              <li>
                <strong>Widen the list.</strong> If a real word is missing, switch to Extended dictionary, or try <Link href="/tools/word-finder">Word Finder</Link> for patterns and <Link href="/tools/scrabble-solver">Scrabble Solver</Link> when you want Scrabble-style points instead.
              </li>
            </ol>

            <h2>WWF-style points vs Scrabble points</h2>
            <p>
              Words With Friends and Scrabble use different letter values for some tiles. This page sorts with WWF-style values so high-point WWF plays rise first. For Scrabble-style sorting, use <Link href="/tools/scrabble-solver">/tools/scrabble-solver</Link>.
            </p>
            <p>
              Points follow common Words With Friends–style letter values for sorting. This is not an official Words With Friends® dictionary or tournament word list.
            </p>

            <h2>What this tool is (and is not)</h2>
            <div className="editorial-columns">
              <div className="editorial-card">
                <h2>This page does</h2>
                <p>Unscramble a rack into valid open-list words. Support blank tiles with ? / *. Sort by WWF-style face points. Run in your browser, with the same privacy story as the homepage. No signup and no paid tier.</p>
              </div>
              <div className="editorial-card">
                <h2>This page does not</h2>
                <p>Claim an official WWF / ENABLE lexicon. Auto-solve a full board from a photo. Apply DW/TW board premiums for you.</p>
              </div>
            </div>

            <h2>Tips for better WWF racks</h2>
            <ul>
              <li>Check full-rack plays first when you hold enough tiles—they often swing a turn.</li>
              <li>Keep an S or a blank when you can; they open many hooks.</li>
              <li>Dump awkward duplicates instead of forcing a mediocre high-point word.</li>
              <li>Need only words that use every letter? Use Exact anagrams on the <Link href="/">homepage</Link>.</li>
              <li>Solving a newspaper Jumble? Try <Link href="/tools/jumble-solver">/tools/jumble-solver</Link>.</li>
            </ul>

            <h2>Frequently asked questions</h2>
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}

            <ToolCrossPromo hint="Related tools on this site:" />
            <p>Unofficial fan word tool. Words With Friends® is a trademark of its owners; this site is not affiliated with or endorsed by them.</p>
          </article>

          <RelatedLinkGrid>
            <Link href="/" className="related-link">
              <h3>Exact anagrams</h3>
              <p>Exact anagrams and words from letters on the homepage.</p>
            </Link>
            <Link href="/tools/scrabble-solver" className="related-link">
              <h3>Scrabble-style points</h3>
              <p>Rack finder with Scrabble-style points and blanks.</p>
            </Link>
            <Link href="/tools/word-finder" className="related-link">
              <h3>Word Finder</h3>
              <p>Pattern and length search, including 5-letter unscrambling.</p>
            </Link>
            <Link href="/tools/jumble-solver" className="related-link">
              <h3>Jumble solver</h3>
              <p>Exact-anagram helper for scrambled jumble letters.</p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
