import {
  ArrowRightIcon,
  BoltIcon,
  CheckBadgeIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnagramSolverTool from '@/components/AnagramSolverTool';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Free Anagram Solver & Word Unscrambler',
  description:
    'Unscramble letters into exact anagrams or shorter words from your rack. Free in-browser anagram solver for puzzles, Scrabble racks, and multi-word phrases.',
  keywords: [
    'anagram solver',
    'word unscrambler',
    'words from letters',
    'anagram',
    'anagrams',
    'free anagram tool',
    'anagram generator',
    'solve anagrams',
  ],
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Free Anagram Solver & Word Unscrambler',
    description:
      'Unscramble letters into exact anagrams or shorter words from your rack. Free in-browser anagram solver for puzzles, Scrabble racks, and multi-word phrases.',
    url: getCanonicalUrl('/'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Anagram Solver & Word Unscrambler',
    description:
      'Unscramble letters into exact anagrams or shorter words from your rack. Free in-browser anagram solver for puzzles, Scrabble racks, and multi-word phrases.',
  },
};

const exampleSource = ['L', 'I', 'S', 'T', 'E', 'N'];
const exampleResult = ['S', 'I', 'L', 'E', 'N', 'T'];

const faqItems = [
  {
    question: 'What is an exact anagram solver?',
    answer:
      'An exact anagram solver rearranges a given sequence of letters so that every single letter is used exactly once to form valid English words or phrases. Unlike generic word finders that match smaller sub-words, an exact anagram solver ensures no letters are left over.',
  },
  {
    question: 'Can this anagram solver find multiple word anagrams?',
    answer:
      'Yes! In addition to single-word anagrams, our specialized multiple-word anagram solver splits all input letters across two or three separate words. This is ideal for solving cryptic crossword clues, phrase puzzles, and creative name anagrams.',
  },
  {
    question: 'Is my input private when using this anagram solver?',
    answer:
      'Completely private. Our anagram solver runs 100% inside your browser using client-side Web Workers. Your letters, words, and anagram search queries are never transmitted to, inspected by, or stored on any remote server.',
  },
  {
    question: 'Which dictionaries does the anagram solver support?',
    answer:
      'Our anagram solver provides two curated lexicons: the Common Dictionary (around 40,000 everyday words for standard puzzles and board games) and the Extended Dictionary (over 178,000 words for competitive tournament play and deep anagram research).',
  },
  {
    question: 'How are tile scores calculated in the anagram solver?',
    answer:
      'Tile scores display standard base letter points modeled after popular board games (such as A=1, B=3, Z=10). This gives word game players an instant baseline score for every anagram generated.',
  },
  {
    question: 'What is the difference between exact anagrams and words from letters?',
    answer:
      'Exact anagrams use every letter once, such as LISTEN to SILENT. Words from letters finds every shorter valid word in the same rack, which is what most Scrabble and word-unscrambler searches need. Switch modes above the solver without leaving this page.',
  },
];

export default function HomePage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Anagram Solver',
      url: getCanonicalUrl('/'),
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${getCanonicalUrl('/')}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Anagram Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl('/'),
      description:
        'Free anagram solver and word unscrambler. Finds exact anagrams, words from letters, and multiple-word phrases client-side.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '240',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfdfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[#09c4d8] bg-[#fcfdfd]">
          <div
            className="pointer-events-none absolute right-0 top-0 hidden h-[400px] w-[58%] lg:block"
            aria-hidden="true"
          >
            <Image
              src="/design/blueprint-letters.webp"
              alt="Anagram letter tile blueprint background"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 0vw"
              className="object-cover object-left-top opacity-75"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-0 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-[70px]">
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00aebf]/30 bg-[#e0f7fa] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008f9e]">
                <SparklesIcon className="h-3.5 w-3.5" /> Fast Anagram Solver &amp; Unscrambler
              </span>
              <h1 className="mt-3 text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#061a38] sm:text-6xl lg:text-[4rem]">
                Free Anagram Solver &amp; Word Unscrambler:{' '}
                <span className="block sm:inline">Find Every Word Hidden in Your Letters</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#52657d] sm:text-xl">
                Switch between exact anagrams and words from letters in one free solver. Unscramble a rack,
                copy a shareable result, and keep recent searches on this device.
              </p>
            </div>

            <AnagramSolverTool />
          </div>
        </section>

        {/* Section: What is an Anagram */}
        <section className="bg-white py-14 sm:py-16" aria-labelledby="anagram-explainer-title">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00aebf]">
                Linguistic Concept
              </span>
              <h2
                id="anagram-explainer-title"
                className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl"
              >
                What is an Anagram &amp; How Does an Anagram Solver Work?
              </h2>
              <p className="mt-5 text-base leading-8 text-[#52657d]">
                An <strong>anagram</strong> is a word or phrase formed by rearranging the letters of another
                word or phrase, using all the original letters exactly once. For instance, transposing the
                letters of <em>LISTEN</em> yields the perfect anagram <em>SILENT</em>.
              </p>
              <p className="mt-4 text-base leading-8 text-[#52657d]">
                A true <strong>anagram solver</strong> differs from an ordinary word search tool. Rather than
                generating shorter partial words, an exact anagram solver matches the complete letter
                signature against verified English dictionaries, ensuring every single consonant and vowel
                finds its rightful place.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d9e5ec] bg-[#f8fbfa] p-8 shadow-sm">
              <p className="text-center text-xs font-extrabold uppercase tracking-widest text-[#008f9e]">
                Exact Anagram Transposition Example
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <LetterExample label="Your Scrambled Letters" letters={exampleSource} />
                <ArrowRightIcon
                  className="mx-auto h-7 w-7 rotate-90 text-[#00aebf] sm:rotate-0"
                  aria-hidden="true"
                />
                <LetterExample label="Exact Solved Anagram" letters={exampleResult} />
              </div>
              <p className="mt-6 text-center text-xs leading-relaxed text-[#687b91]">
                Both words share identical letter frequency: 1×E, 1×I, 1×L, 1×N, 1×S, 1×T.
              </p>
            </div>
          </div>
        </section>

        {/* Section: How to Use the Anagram Solver */}
        <section className="border-t border-[#d9e5ec] bg-[#f4f8fa] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00aebf]">
                Simple 3-Step Process
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl">
                How to Use Our Free Online Anagram Solver
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[#52657d]">
                Finding anagrams has never been easier. Follow these straightforward steps to unscramble words
                and discover hidden anagram solutions in seconds.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div className="rounded-xl border border-[#d9e5ec] bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e0f7fa] font-mono text-xl font-extrabold text-[#008f9e]">
                  1
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#061a38]">Enter Letters or Words</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52657d]">
                  Type your scrambled letters, single words, or full phrases into the anagram solver search
                  input. Spaces and punctuation are automatically sanitized.
                </p>
              </div>

              <div className="rounded-xl border border-[#d9e5ec] bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e0f7fa] font-mono text-xl font-extrabold text-[#008f9e]">
                  2
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#061a38]">Select Your Dictionary</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52657d]">
                  Choose between the Common Dictionary for standard board games or switch to the Extended
                  Dictionary when solving difficult crosswords and tournament anagrams.
                </p>
              </div>

              <div className="rounded-xl border border-[#d9e5ec] bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e0f7fa] font-mono text-xl font-extrabold text-[#008f9e]">
                  3
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#061a38]">Browse &amp; Copy Solutions</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52657d]">
                  View solved anagrams grouped by word length or point values. Use our one-click copy button
                  to paste winning words directly into your game or puzzle sheet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Key Advantages of Our Anagram Solver */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00aebf]">
                Engineered for Performance
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl">
                Why Players Choose Our Exact Anagram Solver
              </h2>
              <p className="mt-4 text-base text-[#52657d]">
                Designed specifically for word puzzle fans, board game champions, and writers seeking a clean,
                blazing-fast anagram solving tool.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[#d9e5ec] p-6 transition-shadow hover:shadow-md">
                <BoltIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-[#061a38]">100% In-Browser Speed</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Our client-side Web Worker engine processes hundreds of thousands of word combinations in
                  milliseconds without server lag.
                </p>
              </div>

              <div className="rounded-xl border border-[#d9e5ec] p-6 transition-shadow hover:shadow-md">
                <ShieldCheckIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-[#061a38]">Strict Data Privacy</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  No search query tracking or backend logging. Your confidential clues and letter combinations
                  never leave your personal browser.
                </p>
              </div>

              <div className="rounded-xl border border-[#d9e5ec] p-6 transition-shadow hover:shadow-md">
                <CheckBadgeIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-[#061a38]">Official Tile Scoring</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Every solved word displays authentic letter tile scores, helping you evaluate high-scoring
                  anagrams for competitive word games.
                </p>
              </div>

              <div className="rounded-xl border border-[#d9e5ec] p-6 transition-shadow hover:shadow-md">
                <CommandLineIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-[#061a38]">Multi-Word Permutations</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Need multi-word phrases? Our advanced phrase anagram solver splits long strings of letters
                  into exact 2-word and 3-word anagram phrases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Popular Word Games & Practical Strategies */}
        <section className="border-t border-[#d9e5ec] bg-[#f8fbfa] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#00aebf]">
                  Game Compatibility
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl">
                  Solve Anagrams for Scrabble, Wordle &amp; Crosswords
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#52657d]">
                  Whether you are playing classic tabletop board games or solving daily mobile word puzzles,
                  our versatile anagram solver is your ultimate strategic companion:
                </p>
                <ul className="mt-6 space-y-3.5 text-sm leading-6 text-[#52657d]">
                  <li className="flex items-start gap-3">
                    <PuzzlePieceIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#008f9e]" />
                    <span>
                      <strong className="text-[#061a38]">Scrabble &amp; Words with Friends:</strong> Discover
                      bingo candidates and unscramble complex 7-letter racks into high-scoring words.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PuzzlePieceIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#008f9e]" />
                    <span>
                      <strong className="text-[#061a38]">Cryptic Crosswords &amp; Jumble:</strong> Decode
                      cryptic anagram clues where words like &ldquo;confused&rdquo; or &ldquo;rebuilt&rdquo; signal
                      scrambled letters.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PuzzlePieceIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#008f9e]" />
                    <span>
                      <strong className="text-[#061a38]">Wordle &amp; Spelling Bee:</strong> Check letter
                      permutations and uncover unexpected anagram solutions to master daily challenges.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PuzzlePieceIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#008f9e]" />
                    <span>
                      <strong className="text-[#061a38]">Boggle &amp; Bananagrams:</strong> Rapidly test speed
                      anagrams and verify word validity against trusted spelling databases.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#d9e5ec] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#061a38]">Pro Tips to Solve Anagrams Faster</h3>
                <p className="mt-2 text-sm text-[#52657d]">
                  Enhance your mental word-solving skills with these four proven anagram techniques:
                </p>
                <div className="mt-6 space-y-4">
                  <div className="border-l-2 border-[#00aebf] pl-4">
                    <h4 className="text-sm font-bold text-[#061a38]">1. Separate Prefixes and Suffixes</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52657d]">
                      Set aside common letter combinations such as <em>RE-</em>, <em>UN-</em>, <em>-ING</em>,{' '}
                      <em>-ED</em>, or <em>-TION</em>. Unscramble the remaining core root letters first.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#00aebf] pl-4">
                    <h4 className="text-sm font-bold text-[#061a38]">2. Group Consonant Blends</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52657d]">
                      Identify frequent consonant pairs like <em>TH</em>, <em>CH</em>, <em>SH</em>, <em>CL</em>,{' '}
                      and <em>ST</em>. Combining these reduces the cognitive complexity of solving anagrams.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#00aebf] pl-4">
                    <h4 className="text-sm font-bold text-[#061a38]">3. Check Vowel-to-Consonant Ratios</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52657d]">
                      English words typically alternate vowels and consonants. Count your vowels to gauge how
                      many syllables the target anagram word likely contains.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#00aebf] pl-4">
                    <h4 className="text-sm font-bold text-[#061a38]">4. Use an Anagram Solver for Post-Game Study</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52657d]">
                      After your matches, review tricky letter combinations with our anagram solver to discover
                      scoring words you missed and sharpen your game memory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions */}
        <section className="bg-white py-14 sm:py-16" aria-labelledby="faq-section-title">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00aebf]">
                Help &amp; Insights
              </span>
              <h2 id="faq-section-title" className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[#061a38] sm:text-4xl">
                Frequently Asked Questions About Anagram Solvers
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[#52657d]">
                Everything you need to know about exact anagram solving, dictionary rules, and privacy.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {faqItems.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-[#d9e5ec] bg-[#fcfdfd] p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#061a38]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52657d]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Specialized Anagram & Word Tools */}
        <section className="border-t border-[#d9e5ec] bg-[#f4f8fa] py-14 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <BoltIcon className="h-8 w-8 text-[#00aebf]" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.025em] text-[#061a38]">
                  Explore More Free Anagram Solvers &amp; Word Tools
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-[#52657d]">
                  Looking for multi-word phrase anagrams, letter rack evaluations, or pattern searches with
                  wildcard tiles? Explore our full collection of browser-based word puzzle solvers.
                </p>
              </div>

              <div className="divide-y divide-[#cfdde5] border-y border-[#cfdde5]">
                <ToolLink
                  href="/tools/multiple-words"
                  title="Multiple Word Anagram Solver"
                  description="Split all input letters into exact two- or three-word phrase anagrams."
                  icon="grid"
                />
                <ToolLink
                  href="/tools/two-word-anagram-solver"
                  title="2 Word Anagram Solver"
                  description="Find exact two-word phrase anagrams for puzzle clues, games, and names."
                  icon="grid"
                />
                <ToolLink
                  href="/tools/three-word-anagram-solver"
                  title="3 Word Anagram Solver"
                  description="Solve cryptic clues and long phrases into three exact English words."
                  icon="grid"
                />
                <ToolLink
                  href="/tools/word-finder"
                  title="Word Finder & Wildcard Tool"
                  description="Make shorter words from available letters or match a fixed-length pattern."
                  icon="search"
                />
                <ToolLink
                  href="/tools/scrabble-solver"
                  title="Rack Word Finder"
                  description="Explore words from a tile rack, including zero-point blank tiles."
                  icon="grid"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function LetterExample({ label, letters }: { label: string; letters: string[] }) {
  return (
    <div>
      <p className="mb-3 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#52657d]">
        {label}
      </p>
      <div className="grid grid-cols-6">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="flex aspect-square min-w-0 items-center justify-center border-y border-l border-[#8ed7e0] font-mono text-lg font-bold text-[#061a38] last:border-r sm:text-xl"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolLink({
  description,
  href,
  icon,
  title,
}: {
  description: string;
  href: string;
  icon: 'grid' | 'search';
  title: string;
}) {
  const Icon = icon === 'search' ? MagnifyingGlassIcon : Squares2X2Icon;

  return (
    <Link href={href} className="group grid gap-4 py-6 sm:grid-cols-[44px_1fr_auto] sm:items-center">
      <span
        className="flex h-11 w-11 items-center justify-center border border-cyan-200 text-[#00aebf]"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-bold text-[#061a38] transition-colors group-hover:text-[#008f9e]">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-[#52657d]">{description}</span>
      </span>
      <span className="text-sm font-semibold text-[#00aebf] group-hover:underline">Open tool &rarr;</span>
    </Link>
  );
}
