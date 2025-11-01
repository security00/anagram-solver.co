import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Anagram Tips and Tricks - Anagram Solver',
  description: 'Boost your anagram skills with practical tips on letter patterns, common prefixes and suffixes, and faster solving methods used by experts.',
  alternates: { canonical: 'https://anagram-solver.co/blog/anagram-tips' },
};

export default function AnagramTipsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Anagram Tips and Tricks</h1>
          <div className="prose prose-lg mt-6 dark:prose-invert">
            <p>Master anagrams by learning common prefixes/suffixes, letter pairings, and vowel-consonant balancing.</p>
            <h2>Core Strategies</h2>
            <ul>
              <li>Look for common endings: -ed, -er, -ing, -ly, -es.</li>
              <li>Group frequent pairs: TH, CH, SH, QU, ER.</li>
              <li>Try building around the longest vowel chain for stability.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
