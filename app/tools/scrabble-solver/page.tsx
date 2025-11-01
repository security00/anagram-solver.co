import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrabbleSolverTool from '@/components/ScrabbleSolverTool';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Scrabble Solver - Find High-Scoring Scrabble Words',
  description: 'Use our Scrabble solver to find high-scoring words from your rack instantly. Filter by length, prefixes, and suffixes to maximize points every turn.',
  keywords: ['scrabble solver', 'scrabble word finder', 'scrabble helper', 'scrabble cheater'],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/scrabble-solver',
  },
  openGraph: {
    title: 'Scrabble Solver - Find High-Scoring Scrabble Words',
    description: 'Advanced Scrabble solver to find the highest-scoring words from your tiles. Optimize your Scrabble game with our powerful tool.',
    url: 'https://anagram-solver.co/tools/scrabble-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scrabble Solver - Find High-Scoring Scrabble Words',
    description: 'Advanced Scrabble solver to find the highest-scoring words from your tiles. Optimize your Scrabble game with our powerful tool.',
  },
};

export default function ScrabbleSolverPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Scrabble Solver Tool
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Find the highest-scoring Scrabble words from your tiles. Our advanced Scrabble solver
              helps you dominate every game with strategic word choices.
            </p>
          </div>

          {/* Scrabble Solver Tool */}
          <ScrabbleSolverTool />
        </div>

        {/* SEO Content Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Master Scrabble with Our Advanced Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our Scrabble solver is the ultimate tool for serious Scrabble players who want to maximize their scores and win more games. This powerful Scrabble word finder analyzes your tiles and discovers the highest-scoring word combinations possible. Whether you're playing competitive Scrabble tournaments or casual games with friends, our Scrabble solver gives you the strategic advantage you need to dominate the board.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                How to Use the Scrabble Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Using our Scrabble solver is simple and effective. Enter your Scrabble tiles in the input field above, and our Scrabble word finder will instantly generate all possible words sorted by their point values. The Scrabble solver shows you exactly how many points each word is worth, helping you make the best strategic decisions. You can also use advanced filters to find Scrabble words that start with specific letters, end with certain suffixes, or meet minimum length requirements for optimal board placement.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Advanced Scrabble Solver Features
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our Scrabble solver includes powerful features that set it apart from basic word finders. The Scrabble tool allows you to filter results by prefix and suffix, making it easy to build off existing words on the board. You can set minimum word lengths to focus on high-scoring opportunities, and the Scrabble solver automatically calculates point values using official Scrabble letter scores. The solver works with the complete Scrabble dictionary, ensuring you never miss a valid high-scoring word during your games.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Scrabble Strategy and Scoring Tips
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Winning at Scrabble requires more than just knowing words – you need strategic thinking and smart tile management. Our Scrabble solver helps you identify the highest-scoring opportunities, but understanding Scrabble strategy is equally important. Focus on using high-value letters like Q, Z, X, and J in combination with premium squares on the board. The Scrabble solver shows you all possible words, but experienced players know to save certain tiles for maximum impact. Look for opportunities to create multiple words in a single play, and use our Scrabble tool to explore different combinations before making your move.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Competitive Scrabble and Tournament Play
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                For serious Scrabble players and tournament competitors, our Scrabble solver serves as an excellent training tool. Practice with different tile combinations to improve your word recognition skills and learn new high-scoring words. The Scrabble solver helps you understand scoring patterns and develop intuition for spotting valuable plays during actual games. Many competitive Scrabble players use word finders like ours during practice sessions to expand their vocabulary and improve their game strategy. Remember that while our Scrabble solver is perfect for learning and practice, official tournament play requires relying on your own knowledge and skills.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Why Choose Our Scrabble Solver?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our Scrabble solver stands out as the most comprehensive and user-friendly tool available for Scrabble enthusiasts. The solver uses the official Scrabble dictionary and accurate point calculations to ensure reliable results every time. Unlike basic word generators, our Scrabble tool includes advanced filtering options that help you find words that actually fit your game situation. The clean, intuitive interface makes it easy to quickly find the best plays, and the mobile-responsive design means you can use our Scrabble solver on any device. Whether you're a beginner learning the game or an expert looking to sharpen your skills, our Scrabble solver provides the tools you need to improve your gameplay.
              </p>
            </div>

            {/* Internal Links Section */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/"
                className="block rounded-lg bg-green-50 p-6 hover:bg-green-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find all possible anagrams from any letters with our main anagram solving tool.
                </p>
              </a>

              <a
                href="/tools/word-finder"
                className="block rounded-lg bg-green-50 p-6 hover:bg-green-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Word Finder
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Create words from letters with pattern matching and wildcard support.
                </p>
              </a>

              <a
                href="/tools/multiple-words"
                className="block rounded-lg bg-green-50 p-6 hover:bg-green-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Multiple Word Anagrams
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Discover multi-word anagram combinations and phrase solutions.
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
