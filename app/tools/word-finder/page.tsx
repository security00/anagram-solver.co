import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WordFinderTool from '@/components/WordFinderTool';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Finder from Letters and Patterns',
  description: 'Find words that can be built from available letters or match a fixed-length pattern using ? wildcards.',
  alternates: { canonical: 'https://anagram-solver.co/tools/word-finder' },
};

export default function WordFinderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">Word Finder</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
              Build words from available letters or search an exact-length pattern with unknown positions.
            </p>
          </div>
          <WordFinderTool />
        </section>

        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Available-letter search</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                This mode returns words that use no more of each letter than you supplied. Unlike
                the exact anagram solver, a result may use only part of the rack. Set minimum and
                maximum lengths to narrow the list.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Fixed patterns</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                A question mark represents exactly one unknown letter. For example,
                <code> C?T</code> can match CAT, COT, or CUT, while <code>?ING</code> finds
                four-letter words ending in ING. Pattern input is matched character by character,
                so regular-expression syntax is not executed.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
