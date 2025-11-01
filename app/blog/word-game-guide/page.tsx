import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Game Guide - Anagram Solver',
  description: 'Explore popular word games, core rules, and tactics that improve your play. Build better patterns, manage time, and develop scoring intuition.',
  alternates: { canonical: 'https://anagram-solver.co/blog/word-game-guide' },
};

export default function WordGameGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-fuchsia-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Word Game Guide</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>From Scrabble to Boggle, learn the basic rules and the core tactics that carry across games.</p>
            <h2>Highlights</h2>
            <ul>
              <li>Pattern spotting and board vision.</li>
              <li>Time management and fast filtering.</li>
              <li>Vocabulary building that actually helps scoring.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
