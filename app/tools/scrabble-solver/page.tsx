import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrabbleSolverTool from '@/components/ScrabbleSolverTool';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Letter Rack Word Finder with Tile Scores',
  description: 'Find English words from a letter rack, use blank tiles, filter by prefix or suffix, and compare base tile scores.',
  alternates: { canonical: 'https://anagram-solver.co/tools/scrabble-solver' },
};

export default function ScrabbleSolverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">Letter Rack Word Finder</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
              Find words that can be made from a rack, including blank tiles, and compare their base English tile values.
            </p>
          </div>
          <ScrabbleSolverTool />
        </section>

        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How rack search works</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                Enter available tiles and use <code>?</code> or <code>*</code> for each blank. Every
                result can be built without using a tile more times than it appears. Optional prefix
                and suffix fields model letters already required by your puzzle; they do not model
                a full game board.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Know the limits</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                The spelling source is open SCOWL/English Speller Database data, not an official
                Scrabble lexicon. The displayed total is the sum of rack tile values, with blanks
                worth zero. Board premiums, cross-words, regional rules, and bonuses are not
                calculated, so confirm a play with the authority used by your game.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
