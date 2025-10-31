import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnagramSolverTool from '@/components/AnagramSolverTool';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Tool */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Free Anagram Solver Tool
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
              Solve anagrams instantly with our powerful anagram solver. Find all possible words
              from your letters for Scrabble, crossword puzzles, and word games.
            </p>
          </div>

          {/* Anagram Solver Tool */}
          <AnagramSolverTool />
        </div>

        {/* SEO Content Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                What is an Anagram Solver?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                An anagram solver is a powerful tool that helps you find all possible words that can
                be created by rearranging the letters of a given word or phrase. Our free anagram
                solver uses advanced algorithms to quickly analyze your input and generate every
                valid anagram combination. Whether you're playing Scrabble, solving crossword
                puzzles, or simply exploring word games, our anagram solver provides instant results
                to help you discover new words and improve your vocabulary.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                How to Use Our Anagram Solver Tool
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Using our anagram solver is incredibly simple and efficient. First, enter the
                letters you want to unscramble into the input field above. Our anagram solver
                accepts up to 20 letters at a time. Next, choose how you want to sort the results:
                by word length, alphabetically, or by Scrabble score. Then click the "Solve
                Anagram" button, and our anagram solver will instantly display all valid English
                words that can be formed from your letters. The anagram solver shows each word along
                with its Scrabble point value, making it perfect for competitive word games.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Benefits of Using an Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver offers numerous benefits for word game enthusiasts and language
                learners. The anagram solver helps you discover new words you might not have known
                existed, expanding your vocabulary significantly. When playing Scrabble or Words
                with Friends, the anagram solver can help you find high-scoring words quickly. For
                crossword puzzle solvers, our anagram solver is invaluable in finding words that fit
                specific letter patterns. Students and educators also use our anagram solver as a
                learning tool to understand word formation and improve spelling skills. The anagram
                solver is completely free to use, with no registration required, making it accessible
                to everyone who needs help with word puzzles and games.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Advanced Features of Our Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver includes several advanced features that set it apart from other
                word finding tools. The anagram solver supports multiple sorting options, allowing
                you to organize results by length, alphabetical order, or Scrabble score. This makes
                it easy to find the perfect word for any situation. Our anagram solver uses a
                comprehensive English dictionary containing thousands of valid words, ensuring you
                won't miss any possible combinations. The anagram solver also displays Scrabble
                point values for each word, helping you make strategic decisions in word games. For
                serious players, our anagram solver can handle complex letter combinations and find
                even the most obscure valid words.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Anagram Solver Strategies and Tips
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                To get the most out of our anagram solver, consider these helpful strategies. When
                using the anagram solver for Scrabble, focus on finding longer words first, as they
                typically score more points. The anagram solver can help you identify common letter
                patterns and prefixes that frequently form words. Try using the anagram solver with
                different combinations of your available letters to explore all possibilities. For
                crossword puzzles, the anagram solver excels at finding words that match specific
                letter patterns. Regular use of our anagram solver can help you memorize common
                anagrams and improve your word game performance over time. Remember that practice
                with the anagram solver will naturally enhance your ability to spot anagrams without
                assistance.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Why Choose Our Free Anagram Solver?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver stands out as the best free tool available for several reasons.
                The anagram solver features a clean, user-friendly interface that works perfectly on
                both desktop and mobile devices. Unlike other anagram solver tools that require
                downloads or registrations, ours works instantly in your browser. Our anagram solver
                is continuously updated with new words and improvements to ensure accuracy and
                reliability. The anagram solver processes results quickly, even with complex letter
                combinations, saving you valuable time. We've designed this anagram solver to be
                completely free with no hidden costs or premium features, making powerful word
                solving accessible to everyone. Whether you're a casual player or a serious
                competitor, our anagram solver provides the tools you need to excel at word games.
              </p>
            </div>

            {/* Internal Links Section */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/tools/scrabble-solver"
                className="block rounded-lg bg-blue-50 p-6 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scrabble Solver
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Find high-scoring Scrabble words from your tiles with our specialized Scrabble
                  solver tool.
                </p>
              </a>

              <a
                href="/tools/word-finder"
                className="block rounded-lg bg-blue-50 p-6 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Word Finder
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Create words from any letters with our powerful word finder and pattern matching
                  tool.
                </p>
              </a>

              <a
                href="/tools/multiple-words"
                className="block rounded-lg bg-blue-50 p-6 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Multiple Word Anagrams
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Discover multi-word anagrams and phrase combinations with our advanced solver.
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
