import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Multiple Word Anagram Solver - Find Word Combinations',
  description: 'Find multi-word anagrams and word combinations from your letters. Discover valid phrase anagrams quickly with smart filters to explore creative results.',
  keywords: ['multiple word anagram', 'phrase anagram', 'anagram combinations', 'multi word solver'],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/multiple-words',
  },
  openGraph: {
    title: 'Multiple Word Anagram Solver - Find Word Combinations',
    description: 'Find multi-word anagrams and word combinations from your letters. Discover valid phrase anagrams quickly with smart filters to explore creative results.',
    url: 'https://anagram-solver.co/tools/multiple-words',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiple Word Anagram Solver - Find Word Combinations',
    description: 'Find multi-word anagrams and word combinations from your letters. Discover valid phrase anagrams quickly with smart filters to explore creative results.',
  },
};

export default function MultipleWordsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Multiple Word Anagram Solver
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Discover fascinating multi-word anagrams and phrase combinations. Transform single
              words into multiple word phrases and explore creative anagram possibilities.
            </p>
          </div>

          {/* Multiple Words Anagram Tool */}
          <MultipleWordsAnagramTool />
        </div>

        {/* SEO Content Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Explore the Art of Multiple Word Anagrams
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Multiple word anagrams represent one of the most creative and challenging aspects of wordplay. Our multiple word anagram solver helps you discover fascinating phrase combinations that use the exact same letters as your original input. This advanced anagram tool can transform single words into meaningful phrases, names into descriptive sentences, or long phrases into completely different expressions. Multiple word anagrams have been used throughout history for entertainment, puzzles, and even secret messages, making our multiple word anagram solver both educational and entertaining.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                How Multiple Word Anagram Solving Works
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our multiple word anagram solver uses sophisticated algorithms to find all possible combinations of words that use your input letters exactly once. Unlike single word anagrams, multiple word anagram solving requires checking millions of word combinations to find valid phrases. The multiple word anagram tool systematically explores different word lengths and combinations, ensuring that every letter from your original input is used exactly once in the final result. This comprehensive approach means our multiple word anagram solver can discover even the most obscure and creative phrase combinations that you might never find manually.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Famous Multiple Word Anagrams in History
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Multiple word anagrams have fascinated people for centuries, with some becoming famous for their cleverness or coincidental meaning. Classic examples include "SCHOOLMASTER" becoming "THE CLASSROOM" and "ASTRONOMER" transforming into "MOON STARER." Our multiple word anagram solver can help you discover similar amazing combinations from any input phrase. Historical figures have used multiple word anagrams for pseudonyms, and writers have employed them for character names and literary devices. The multiple word anagram solver reveals these hidden connections between seemingly unrelated phrases, showcasing the beautiful patterns within the English language.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Creative Applications of Multiple Word Anagrams
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Writers, poets, and creative professionals use our multiple word anagram solver for various artistic purposes. The tool can help generate unique character names, create memorable business names, or develop creative titles for projects. Multiple word anagram solving is also popular in puzzle creation, where constructors use our solver to develop challenging anagram puzzles for newspapers and magazines. Teachers use multiple word anagrams as educational tools to help students understand letter patterns and improve their vocabulary. The multiple word anagram solver makes these creative applications accessible to everyone, regardless of their experience with wordplay.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Advanced Features of Our Multiple Word Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our multiple word anagram solver includes several advanced features that make it the most powerful tool available for multi-word anagram discovery. The solver can handle phrases up to 30 characters long and can find combinations of 2 or 3 words. The multiple word anagram tool automatically calculates Scrabble scores for each word combination, helping you identify the highest-scoring possibilities. Results are sorted by total point value, making it easy to find the most valuable combinations for word games. The multiple word anagram solver also handles spaces and punctuation intelligently, focusing on the actual letters while ignoring formatting characters.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Tips for Getting Better Multiple Word Anagram Results
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                To get the best results from our multiple word anagram solver, start with longer input phrases of at least 8-10 letters. Shorter inputs may not have enough letters to form interesting multiple word combinations. Try using common phrases, famous names, or meaningful expressions as input for the multiple word anagram solver. The tool works best with inputs that have a good mix of vowels and consonants, as this provides more flexibility for word formation. If you don't find results immediately, try variations of your input phrase or consider removing less common letters. Remember that multiple word anagram solving is computationally intensive, so be patient while the solver explores all possible combinations.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Why Choose Our Multiple Word Anagram Solver?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our multiple word anagram solver stands out as the most comprehensive and user-friendly tool available for discovering multi-word anagram combinations. The solver uses advanced algorithms optimized for speed and accuracy, ensuring you get complete results quickly. Unlike basic anagram tools that only find single words, our multiple word anagram solver explores the full space of possible phrase combinations. The tool includes helpful features like score calculation, result sorting, and usage tips to enhance your anagram-solving experience. The multiple word anagram solver is completely free to use, requires no registration, and works perfectly on all devices, making it accessible to anyone interested in exploring the fascinating world of multi-word anagrams.
              </p>
            </div>

            {/* Internal Links Section */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/"
                className="block rounded-lg bg-indigo-50 p-6 hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find all possible single-word anagrams from any letters with our main tool.
                </p>
              </a>

              <a
                href="/tools/scrabble-solver"
                className="block rounded-lg bg-indigo-50 p-6 hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scrabble Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find high-scoring Scrabble words from your tiles with specialized scoring.
                </p>
              </a>

              <a
                href="/tools/word-finder"
                className="block rounded-lg bg-indigo-50 p-6 hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Word Finder
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Create words from letters with pattern matching and wildcard support.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
