import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'About the Anagram Solver',
  description: 'How the anagram, word finder, and rack tools work, including their dictionary and privacy boundaries.',
  alternates: { canonical: 'https://anagram-solver.co/about' },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            About This Anagram Solver
          </h1>
          <div className="mt-8 space-y-10 text-lg leading-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Clear search modes</h2>
              <p className="mt-4">
                The main solver finds exact anagrams: every input letter must appear once in the
                result. Word Finder searches for words that can be made from some or all available
                letters. The multi-word solver divides every input letter across exactly two or
                three words. Keeping these operations separate makes the results predictable.
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dictionary and scoring</h2>
              <p className="mt-4">
                The site uses open English spelling data generated from SCOWL/English Speller
                Database sources. Common and Extended modes trade familiarity and download size for
                coverage. These are general spelling lists, not licensed official Scrabble word
                authorities. Displayed points use familiar English-language tile values and exclude
                board placement, premiums, and game-specific rules.
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Performance and privacy</h2>
              <p className="mt-4">
                Search code runs in a Web Worker in your browser, away from the interface thread.
                The solver fetches only the selected static dictionary; it has no application API
                that receives your letter input. Optional analytics is disabled until you explicitly
                allow it, and you can change that choice at any time.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
