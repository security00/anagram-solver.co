import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WordFinderTool from '@/components/WordFinderTool';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Word Finder Tool - Create Words From Letters Online',
  description: 'Create words from letters with our powerful word finder. Instantly generate valid words, filter by length and patterns, and boost scores in puzzles and games.',
  keywords: ['word finder', 'word maker', 'create words', 'letter combination'],
  alternates: {
    canonical: 'https://anagram-solver.co/tools/word-finder',
  },
  openGraph: {
    title: 'Word Finder Tool - Create Words From Letters Online',
    description: 'Create words from letters with our powerful word finder. Instantly generate valid words, filter by length and patterns, and boost scores in puzzles and games.',
    url: 'https://anagram-solver.co/tools/word-finder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Finder Tool - Create Words From Letters Online',
    description: 'Create words from letters with our powerful word finder. Instantly generate valid words, filter by length and patterns, and boost scores in puzzles and games.',
  },
};

export default function WordFinderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Word Finder Tool
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Create words from any letters or find words matching specific patterns. Perfect for
              crosswords, word puzzles, and creative writing.
            </p>
          </div>

          {/* Word Finder Tool */}
          <WordFinderTool />
        </div>

        {/* SEO Content Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Advanced Word Finder for Every Need
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our word finder tool is the most versatile and powerful word creation tool available online. Whether you need to find words from a set of letters or discover words that match specific patterns, our word finder delivers comprehensive results instantly. This advanced word maker supports multiple search methods, making it perfect for crossword puzzles, word games, creative writing, and educational purposes. The word finder tool uses an extensive English dictionary to ensure you never miss a valid word combination.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                How to Use the Word Finder Tool
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Using our word finder is simple and intuitive. You can search for words in two different ways: by entering letters to find all possible word combinations, or by using pattern matching with wildcards. When using the letter-based word finder, simply enter your available letters and the tool will generate all valid words that can be formed. For pattern matching, use the question mark (?) as a wildcard to represent any letter. The word finder also includes advanced filtering options to specify minimum and maximum word lengths, helping you find exactly the words you need for your specific purpose.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Pattern Matching and Wildcard Features
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                The pattern matching feature of our word finder sets it apart from basic word generators. Use wildcards to find words that fit specific letter patterns, making it invaluable for crossword puzzle solving and word games. For example, entering "C?T" in the word finder will return CAT, COT, CUT, and other three-letter words starting with C and ending with T. The word finder supports multiple wildcards in any position, allowing you to search for complex patterns like "?ING" to find all four-letter words ending in ING. This powerful word finder feature makes it easy to solve even the most challenging word puzzles.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Word Finder for Crossword Puzzles
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Crossword enthusiasts will find our word finder tool indispensable for solving challenging puzzles. The pattern matching feature is specifically designed to help with crossword clues where you know some letters but not others. Enter the known letters and use wildcards for unknown positions, and the word finder will show all possible solutions. The word finder also allows you to filter results by word length, which is crucial for fitting words into crossword grids. Many crossword solvers use our word finder as their go-to tool for tackling difficult puzzles and improving their solving speed.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Educational Applications of Word Finder
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Teachers and students find our word finder tool extremely valuable for educational purposes. The word finder helps students expand their vocabulary by showing all possible words that can be formed from a given set of letters. This makes it an excellent tool for spelling practice, vocabulary building, and understanding word formation patterns. The word finder can also be used to create custom word games and exercises, helping educators develop engaging language learning activities. Students can use the word finder to explore different word combinations and discover new words they might not have encountered otherwise.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Creative Writing and Word Finder Tools
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Writers and poets often use our word finder to overcome creative blocks and discover new word possibilities. When you have specific letters to work with or need words that fit particular patterns, the word finder becomes an invaluable creative tool. The word finder can help you find rhyming words, discover synonyms with specific letter patterns, or simply explore different word combinations to enhance your writing. Many creative writers keep our word finder bookmarked as a quick reference tool for finding the perfect word that fits both their meaning and structural requirements.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Why Our Word Finder Stands Out
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our word finder tool combines powerful functionality with an intuitive interface, making it the best choice for anyone who needs to find words quickly and efficiently. Unlike basic word generators, our word finder includes advanced pattern matching, flexible filtering options, and multiple sorting methods. The word finder works with a comprehensive English dictionary and provides accurate results every time. The tool is completely free to use, requires no registration, and works perfectly on all devices. Whether you're a casual puzzle solver or a professional writer, our word finder provides the features and reliability you need to accomplish your word-finding tasks efficiently.
              </p>
            </div>

            {/* Internal Links Section */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/"
                className="block rounded-lg bg-purple-50 p-6 hover:bg-purple-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Anagram Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find all possible anagrams from any letters with our main anagram solving tool.
                </p>
              </a>

              <a
                href="/tools/scrabble-solver"
                className="block rounded-lg bg-purple-50 p-6 hover:bg-purple-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scrabble Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find high-scoring Scrabble words from your tiles with specialized scoring.
                </p>
              </a>

              <a
                href="/tools/multiple-words"
                className="block rounded-lg bg-purple-50 p-6 hover:bg-purple-100 dark:bg-gray-800 dark:hover:bg-gray-700"
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
