import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Scrabble Strategy Guide - Anagram Solver',
  description: 'Score more in Scrabble with rack management, board control, and smart power-tile plays. Learn proven tactics to maximize points and block opponents.',
  alternates: { canonical: 'https://anagram-solver.co/blog/scrabble-strategy' },
};

export default function ScrabbleStrategyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Scrabble Strategy Guide</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>Maximize points by leveraging premium squares, balancing your rack, and blocking opponent hooks.</p>
            <h2>Quick Tips</h2>
            <ul>
              <li>Keep a good vowel/consonant mix; exchange tiles early if needed.</li>
              <li>Use S and blank tiles to create multi-word plays.</li>
              <li>Control hotspots around double/triple letter and word scores.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
