import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
  description:
    'Find exact three-word anagrams from names, clues, and longer phrases. This free 3 word anagram solver uses every letter once with helpful filters.',
  keywords: [
    'three word anagram solver',
    '3 word anagram solver',
    'anagram solver 3 words',
    'three word anagrams',
  ],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/three-word-anagram-solver',
  },
  openGraph: {
    title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
    description:
      'Find exact three-word anagrams from longer phrases. Use every letter once and filter phrase results quickly.',
    url: 'https://anagram-solver.co/tools/three-word-anagram-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three Word Anagram Solver - Find Exact 3 Word Anagrams',
    description:
      'Find exact three-word anagrams from longer phrases. Use every letter once and filter phrase results quickly.',
  },
};

const faqs = [
  {
    question: 'When should I use a three-word anagram solver?',
    answer:
      'Use a three-word anagram solver for longer inputs where a two-word phrase is too restrictive or when a puzzle clue asks for exactly three words.',
  },
  {
    question: 'Are three-word anagrams harder to find?',
    answer:
      'They can take longer because the solver must test more combinations. Lowering the minimum word length or using the common dictionary can make results easier to scan.',
  },
  {
    question: 'Does this page show only three-word results?',
    answer:
      'Yes. The tool on this page is locked to exactly three words so the results match the page intent.',
  },
];

export default function ThreeWordAnagramSolverPage() {
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-50 to-sky-100 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Three Word Anagram Solver
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Find exact 3 word anagrams from longer phrases, names, and puzzle clues. The search is
              locked to three-word combinations that use every letter once.
            </p>
          </div>

          <MultipleWordsAnagramTool
            defaultWordCount={3}
            lockWordCount
            examples={[
              { label: 'THE CLASSROOM', value: 'the classroom' },
              { label: 'ELEVEN PLUS TWO', value: 'eleven plus two' },
              { label: 'CONVERSATION', value: 'conversation' },
            ]}
          />
        </div>

        <div className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Search Exact 3 Word Anagrams
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Three-word anagrams are useful when a longer phrase has too many letters for a clean
                two-word answer. They often reveal more phrase options, especially when you allow
                shorter connector words. This page keeps the search focused on exactly three words,
                so every result matches that format.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900 dark:text-white">
                How to Improve Three-Word Results
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Use longer source text, keep the minimum word length at two or three letters, and
                add a required word only when you are confident it belongs in the answer. If the
                result list feels too broad, raise the minimum word length or switch back to the
                common dictionary.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-gray-900 dark:text-white">
                Three-Word Anagram FAQ
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
                href="/tools/two-word-anagram-solver"
                className="block rounded-lg bg-violet-50 p-6 hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Two Word Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Narrow the search to exact two-word phrase anagrams.
                </p>
              </Link>

              <Link
                href="/tools/multiple-words"
                className="block rounded-lg bg-violet-50 p-6 hover:bg-violet-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Multiple Word Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Switch between two-word and three-word phrase anagrams.
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
