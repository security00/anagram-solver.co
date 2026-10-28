import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import JumbleSolverTool from '@/components/JumbleSolverTool';
import ToolCrossPromo from '@/components/ToolCrossPromo';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'Jumble Solver — Unscramble Jumble Letters Free';
const description =
  'Jumble solver for scrambled letters: find exact anagrams fast in your browser. Learn the classic four-word → circled letters flow—without a daily answer archive.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: getCanonicalUrl('/tools/jumble-solver') },
  openGraph: {
    title,
    description,
    url: getCanonicalUrl('/tools/jumble-solver'),
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
    question: 'What is a jumble solver?',
    answer:
      'A jumble solver unscrambles mixed letters into dictionary words. On this site it uses the same exact-anagram engine as the homepage: every letter in, every letter used once.',
  },
  {
    question: 'Does this show today’s Daily Jumble answers?',
    answer:
      'No. We provide a free unscrambler so you can solve the letters yourself. We do not maintain a dated answer archive.',
  },
  {
    question: 'Why did my scramble return no words?',
    answer:
      'Check for missing/extra letters, try Extended dictionary, or switch to Words from letters on the homepage if you only need partial words.',
  },
  {
    question: 'Can I solve the final circled-letter phrase here?',
    answer:
      'Collect the circled letters from each solved word, then paste that pool into Multiple Words or the Anagram Phrase Solver.',
  },
  {
    question: 'Is solving private?',
    answer: 'Yes—search runs in your browser via a Web Worker. No account required.',
  },
  {
    question: 'Jumble solver vs anagram solver — same thing?',
    answer:
      'For single scrambled words, yes: both seek exact letter rearrangements. “Jumble” is the puzzle name people search; “anagram” is the word-play term. This URL matches the jumble search intent with the same underlying exact mode.',
  },
];

export default function JumbleSolverPage() {
  const canonicalUrl = getCanonicalUrl('/tools/jumble-solver');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Jumble Solver',
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
          { href: '/tools/multiple-words', label: 'Tools' },
          { label: 'Jumble Solver' },
        ]}
        eyebrow="Tools · Jumble solver (exact anagram)"
        title="How do you unscramble Jumble letters into real words?"
        description="A jumble solver unscrambles mixed-up letters into a real English word—the same job as an exact anagram search. Type the scrambled word, hit solve, and pick the match that fits your puzzle."
        heroContent={
          <>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-[#52657d]">
              This page is a letter unscrambler for Jumble-style clues. It is not a daily “today’s Jumble answers” archive. We do not republish newspaper cartoons or calendar solutions. For the final phrase built from circled letters, use our <Link href="/tools/multiple-words" className="font-semibold text-[#008f9e] underline">Multiple Words</Link> or <Link href="/tools/anagram-phrase-solver" className="font-semibold text-[#008f9e] underline">Anagram Phrase Solver</Link> tools after you collect those letters yourself.
            </p>
            <figure className="media-slot">
              <Image
                src="/design/brand-mark.webp"
                alt="Free jumble solver—enter scrambled letters to find exact anagrams in your browser."
                width={72}
                height={72}
              />
              <figcaption>Free jumble solver—enter scrambled letters to find exact anagrams in your browser.</figcaption>
            </figure>
            <JumbleSolverTool />
          </>
        }
      >
        <InnerContent wide>
          <article className="editorial-copy">
            <p className="tool-note">Last checked: 2026-10-29</p>
            <h2>How to use this jumble solver</h2>
            <ol>
              <li><strong>Copy one scrambled word</strong> from your puzzle (letters only; ignore circles until later).</li>
              <li><strong>Paste into the solver</strong> and run Exact anagram mode (every letter used once).</li>
              <li><strong>Pick the sensible word</strong>—exact anagrams that use the full scramble.</li>
              <li><strong>Repeat</strong> for each jumble word in the set.</li>
              <li>
                <strong>Final phrase:</strong> note any circled letters from the solved words, then unscramble that pool with <Link href="/tools/multiple-words">Multiple Words</Link> / <Link href="/tools/anagram-phrase-solver">Phrase solver</Link>.
              </li>
            </ol>

            <h2>How Daily Jumble–style puzzles usually work</h2>
            <p>Many newspaper and app jumbles follow this pattern:</p>
            <ol>
              <li>You get several scrambled words (often four).</li>
              <li>You unscramble each into a normal word.</li>
              <li>Some letters are circled; those letters feed a final phrase or punchline.</li>
              <li>The last step is another anagram—often a short phrase, not a single word.</li>
            </ol>
            <p>
              This tool helps steps 1–2 (and the letter pool for step 4). It does not fetch “Jumble answers for October 29” or any other date. If you searched for today’s newspaper solution, solve the letter racks here instead of relying on spoiler calendars.
            </p>
            <figure className="media-slot">
              <svg className="jumble-flow" viewBox="0 0 640 120" role="img" aria-labelledby="jumble-flow-title jumble-flow-desc">
                <title id="jumble-flow-title">Classic jumble flow</title>
                <desc id="jumble-flow-desc">Solve each scrambled word, collect circled letters, then unscramble the final phrase.</desc>
                <rect x="8" y="28" width="140" height="64" fill="#f4fbfc" stroke="#8ed7e0" />
                <rect x="176" y="28" width="140" height="64" fill="#f4fbfc" stroke="#8ed7e0" />
                <rect x="344" y="28" width="140" height="64" fill="#f4fbfc" stroke="#8ed7e0" />
                <rect x="512" y="28" width="120" height="64" fill="#f4fbfc" stroke="#8ed7e0" />
                <path d="M148 60 H176 M316 60 H344 M484 60 H512" stroke="#00aebf" strokeWidth="2" />
                <text x="78" y="64" textAnchor="middle" fill="#061a38" fontSize="14" fontFamily="Arial, sans-serif">Scramble</text>
                <text x="246" y="64" textAnchor="middle" fill="#061a38" fontSize="14" fontFamily="Arial, sans-serif">Word</text>
                <text x="414" y="58" textAnchor="middle" fill="#061a38" fontSize="13" fontFamily="Arial, sans-serif">Circled</text>
                <text x="414" y="76" textAnchor="middle" fill="#061a38" fontSize="13" fontFamily="Arial, sans-serif">letters</text>
                <text x="572" y="64" textAnchor="middle" fill="#061a38" fontSize="14" fontFamily="Arial, sans-serif">Phrase</text>
              </svg>
              <figcaption>Classic jumble flow: solve each scrambled word, collect circled letters, then unscramble the final phrase.</figcaption>
            </figure>

            <h2>Exact anagram vs words from letters</h2>
            <div className="editorial-columns">
              <div className="editorial-card">
                <h2>Exact anagram (this page)</h2>
                <p>Best default for Jumble. Uses every letter in the scramble once.</p>
              </div>
              <div className="editorial-card">
                <h2>Words from letters</h2>
                <p>Sometimes useful. Finds shorter words inside the same rack on the homepage.</p>
              </div>
            </div>
            <p>
              If Exact returns nothing, check for a typo, try Extended dictionary (~142k), or open the <Link href="/">homepage</Link> Words-from-letters mode. Pattern hunts belong on <Link href="/tools/word-finder">/tools/word-finder</Link>.
            </p>

            <h2>What this page will not do</h2>
            <ul>
              <li>Publish daily or previous Jumble answers by date</li>
              <li>Host or hotlink copyrighted cartoon panels</li>
              <li>Claim affiliation with Tribune, Daily Jumble, or similar brands</li>
              <li>Replace your own solve of the final circled-letter phrase (we only give anagram tools)</li>
            </ul>

            <h2>Tips when you are stuck</h2>
            <ul>
              <li>Confirm you typed every letter—Jumble scrambles are usually exact length matches.</li>
              <li>Try Common first for speed, then Extended if the word feels obscure.</li>
              <li>Proper names may need <Link href="/tools/name-anagram-solver">/tools/name-anagram-solver</Link>.</li>
              <li>
                Two- or three-word finals → <Link href="/tools/two-word-anagram-solver">/tools/two-word-anagram-solver</Link> / <Link href="/tools/three-word-anagram-solver">/tools/three-word-anagram-solver</Link>.
              </li>
              <li>Playing Words With Friends instead? Use <Link href="/tools/words-with-friends-finder">/tools/words-with-friends-finder</Link>.</li>
            </ul>

            <h2>Frequently asked questions</h2>
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}

            <ToolCrossPromo hint="Related tools on this site:" />
            <p>Unofficial fan word tool. Daily Jumble® and related marks belong to their owners; this site is not affiliated with or endorsed by them.</p>
          </article>

          <RelatedLinkGrid>
            <Link href="/" className="related-link">
              <h3>Homepage solver</h3>
              <p>Exact anagrams and words from letters.</p>
            </Link>
            <Link href="/tools/multiple-words" className="related-link">
              <h3>Multiple Words</h3>
              <p>Final multi-word phrase from circled letters.</p>
            </Link>
            <Link href="/tools/anagram-phrase-solver" className="related-link">
              <h3>Phrase solver</h3>
              <p>Phrase-oriented anagrams.</p>
            </Link>
            <Link href="/faq" className="related-link">
              <h3>FAQ</h3>
              <p>Dictionary size and privacy.</p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
