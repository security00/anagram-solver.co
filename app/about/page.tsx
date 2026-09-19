import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'About Our Fast & Private Anagram Solver Tool',
  description:
    'Discover the mission, technology, and dictionary standards behind Anagram Solver. Learn how our client-side Web Worker architecture ensures speed and privacy.',
  alternates: { canonical: getCanonicalUrl('/about') },
  openGraph: {
    title: 'About Our Fast & Private Anagram Solver Tool',
    description:
      'Discover the mission, technology, and dictionary standards behind Anagram Solver. Learn how our client-side Web Worker architecture ensures speed and privacy.',
    url: getCanonicalUrl('/about'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Fast & Private Anagram Solver Tool',
    description:
      'Discover the mission, technology, and dictionary standards behind Anagram Solver. Learn how our client-side Web Worker architecture ensures speed and privacy.',
  },
};

export default function AboutPage() {
  const canonicalUrl = getCanonicalUrl('/about');
  const jsonLd = {
    '@context': 'https://schema.org',
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
        name: 'About',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <InnerPageShell
      eyebrow="About the Project"
      title="About This Anagram Solver"
      description="Engineered for speed, linguistic precision, and total privacy. Learn how our browser-based anagram solver and word tools work."
    >
      <InnerContent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="editorial-copy">
          <section>
            <h2>Our Mission: Fast, Uncluttered &amp; Privacy-First Solving</h2>
            <p className="mt-4">
              Anagram Solver was founded with a singular purpose: to deliver an lightning-fast, modern,
              and completely distraction-free word unscrambling experience. Traditional word puzzle tools
              are often plagued by sluggish page loads, intrusive video overlays, and backend APIs that track
              every puzzle clue you submit.
            </p>
            <p className="mt-4">
              We rebuilt word discovery from the ground up. Whether you are solving daily cryptic crosswords,
              analyzing Scrabble racks, or brainstorming creative anagrams for pen names, our anagram solver
              empowers you with instant solutions generated entirely inside your own browser session.
            </p>
          </section>

          <section>
            <h2>How Our Technology Works: 100% Client-Side Engine</h2>
            <p className="mt-4">
              Unlike legacy solvers that send your letters across the web to distant servers, our platform
              leverages modern client-side web technologies:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[#52657d]">
              <li>
                <strong>Background Web Workers:</strong> Computational heavy lifting is offloaded to a dedicated
                Web Worker thread. This ensures the browser user interface remains fluid at 60 FPS without
                stutter or freeze, even when processing complex multi-word permutations.
              </li>
              <li>
                <strong>Character Frequency Vector Indexing:</strong> Our solver algorithm indexes dictionary
                entries by letter distribution signatures. Comparing word signatures enables near-instantaneous
                pruning and match detection across more than 170,000 verified English words.
              </li>
              <li>
                <strong>Zero Query Logging:</strong> Because search computation never leaves your device, your
                puzzle clues, tile racks, and private word discoveries are never logged, stored, or analyzed on
                any remote server.
              </li>
            </ul>
          </section>

          <section>
            <h2>Transparent Dictionaries &amp; Scoring System</h2>
            <p className="mt-4">
              A reliable anagram solver is only as good as the lexicon backing it. We believe in complete
              transparency regarding where our words originate and how scores are calculated:
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="rounded border border-[#d9e5ec] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">Common Dictionary (~40,000 words)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Optimized for everyday word puzzle games, family Scrabble matches, and quick anagram puzzles.
                  Filters out obscure archaic variants to provide clean, immediately recognizable answers.
                </p>
              </div>
              <div className="rounded border border-[#d9e5ec] bg-[#f8fbfa] p-5">
                <h3 className="text-lg font-bold text-[#061a38]">Extended Dictionary (~178,000 words)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657d]">
                  Designed for competitive tournament players, cryptic crossword enthusiasts, and deep anagram
                  explorations. Includes specialized scientific terms, inflections, and historical spellings.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#52657d]">
              Word lists are compiled from trusted open-source linguistic corpora, primarily SCOWL (Spell Checking
              Oriented Word Lists). Point values reflect standard English letter tile distributions (e.g., Q=10,
              Z=10, J=8, X=8) to help players calculate base rack potential at a glance.
            </p>
          </section>

          <section>
            <h2>Who We Built This Anagram Solver For</h2>
            <p className="mt-4">
              Every day, thousands of word game enthusiasts and language learners rely on our suite of word tools:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[#52657d]">
              <li>
                <strong>Board Game Competitors:</strong> Scrabble, Words with Friends, and Upwords players studying
                high-scoring rack leaves and bingo combinations.
              </li>
              <li>
                <strong>Crossword &amp; Jumble Solvers:</strong> Puzzle enthusiasts tackling cryptic anagram clues
                in publications like The New York Times, The Guardian, or daily newspaper syndicates.
              </li>
              <li>
                <strong>Writers &amp; Creative Minds:</strong> Authors developing pseudonyms, novel book titles,
                or hidden thematic anagrams in storytelling.
              </li>
              <li>
                <strong>Students &amp; Educators:</strong> Teachers demonstrating orthography, phonetics, and
                vocabulary morphology in interactive classroom exercises.
              </li>
            </ul>
          </section>

          <section>
            <h2>Fair Play &amp; Educational Philosophy</h2>
            <p className="mt-4">
              We champion word games as phenomenal exercises for mental sharpness, memory retention, and vocabulary
              growth. We encourage players to use this anagram solver as a practice companion, post-game study
              aid, or puzzle-solving mentor.
            </p>
          </section>

          <section className="rounded border border-[#cfdde5] bg-[#f4f8fa] p-6">
            <h3 className="text-lg font-bold text-[#061a38]">Explore Our Word Tools</h3>
            <p className="mt-2 text-sm text-[#52657d]">
              Ready to test your letters? Try our specialized solvers built for different puzzle styles:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="editorial-nav-btn"
              >
                <span>Single Word Solver</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/tools/multiple-words"
                className="editorial-nav-btn"
              >
                <span>Multi-Word Anagram Solver</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/tools/two-word-anagram-solver"
                className="editorial-nav-btn"
              >
                <span>2 Word Anagram Solver</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/tools/scrabble-solver"
                className="editorial-nav-btn"
              >
                <span>Rack Word Finder</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>
        </article>
      </InnerContent>
    </InnerPageShell>
  );
}
