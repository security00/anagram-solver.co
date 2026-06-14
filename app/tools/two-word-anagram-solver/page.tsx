import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
  description:
    'Find exact two-word anagrams from letters, names, and phrases. This free 2 word anagram solver uses every letter once and includes useful filters.',
  keywords: [
    'two word anagram solver',
    '2 word anagram solver',
    'anagram solver 2 words',
    'two word anagrams',
  ],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/two-word-anagram-solver',
  },
  openGraph: {
    title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. Use every letter once and filter results quickly.',
    url: 'https://anagram-solver.co/tools/two-word-anagram-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Word Anagram Solver - Find Exact 2 Word Anagrams',
    description:
      'Find exact two-word anagrams from letters, names, and phrases. Use every letter once and filter results quickly.',
  },
};

const faqs = [
  {
    question: 'What is a two-word anagram?',
    answer:
      'A two-word anagram is a phrase of exactly two words made by rearranging all letters from the original input.',
  },
  {
    question: 'Does the solver ignore spaces?',
    answer:
      'Yes. Spaces, punctuation, and capitalization are ignored so you can paste a name or phrase directly.',
  },
  {
    question: 'Can I require one word in the answer?',
    answer:
      'Yes. Add the known word to the Must include field and the solver will only show two-word results that contain it.',
  },
];

export default function TwoWordAnagramSolverPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Two Word Anagram Solver
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Find exact 2 word anagrams from names, phrases, and puzzle clues. Paste your letters,
              keep Word count set to Exactly 2 words, and search for phrases that use every letter.
            </p>
          </div>

          <MultipleWordsAnagramTool
            defaultWordCount={2}
            lockWordCount
            examples={[
              { label: 'THE EYES', value: 'the eyes' },
              { label: 'SCHOOLMASTER', value: 'schoolmaster' },
              { label: 'MOON STARER', value: 'moon starer' },
            ]}
          />
        </div>

        <div className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Search Exact 2 Word Anagrams
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Two-word anagrams are easier to read than long lists of single words. They are
                useful when a puzzle clue asks for a phrase, when you want a memorable name anagram,
                or when you are checking classic examples like THE EYES becoming THEY SEE. This page
                focuses on exact two-word results so you can scan phrase options quickly.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900 dark:text-white">
                How to Get Better Two-Word Results
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Start with at least eight letters, keep the common dictionary selected for readable
                phrases, and raise the minimum word length if you see too many short words. If a clue
                already gives one word, enter it in Must include. Switch to the full dictionary only
                when you need a wider search.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900 dark:text-white">
                Two-Word Anagram FAQ
              </h2>
              {faqs.map((faq) => (
                <section key={faq.question} className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </section>
              ))}
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <Link
                href="/tools/multiple-words"
                className="block rounded-lg bg-sky-50 p-6 hover:bg-sky-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Multiple Word Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Search both two-word and three-word phrase anagrams.
                </p>
              </Link>

              <Link
                href="/tools/three-word-anagram-solver"
                className="block rounded-lg bg-sky-50 p-6 hover:bg-sky-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Three Word Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Explore longer phrase anagrams with exactly three words.
                </p>
              </Link>

              <Link
                href="/tools/word-finder"
                className="block rounded-lg bg-sky-50 p-6 hover:bg-sky-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Word Finder
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find words by letters, wildcard patterns, and word length.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
