import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'About the Anagram Solver',
  description: 'How the anagram, word finder, and rack tools work, including their dictionary and privacy boundaries.',
  alternates: { canonical: 'https://anagram-solver.co/about' },
};

export default function AboutPage() {
  return (
    <InnerPageShell
      eyebrow="About the project"
      title="About This Anagram Solver"
      description="A focused set of browser-based word tools with clear search rules, open dictionaries, and privacy-first processing."
    >
      <InnerContent>
        <article className="editorial-copy">
            <section>
              <h2>Clear search modes</h2>
              <p className="mt-4">
                The main solver finds exact anagrams: every input letter must appear once in the
                result. Word Finder searches for words that can be made from some or all available
                letters. The multi-word solver divides every input letter across exactly two or
                three words. Keeping these operations separate makes the results predictable.
              </p>
            </section>
            <section>
              <h2>Dictionary and scoring</h2>
              <p className="mt-4">
                The site uses open English spelling data generated from SCOWL/English Speller
                Database sources. Common and Extended modes trade familiarity and download size for
                coverage. These are general spelling lists, not licensed official Scrabble word
                authorities. Displayed points use familiar English-language tile values and exclude
                board placement, premiums, and game-specific rules.
              </p>
            </section>
            <section>
              <h2>Performance and privacy</h2>
              <p className="mt-4">
                Search code runs in a Web Worker in your browser, away from the interface thread.
                The solver fetches only the selected static dictionary; it has no application API
                that receives your letter input. Optional analytics is disabled until you explicitly
                allow it, and you can change that choice at any time.
              </p>
            </section>
        </article>
      </InnerContent>
    </InnerPageShell>
  );
}
