import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'FAQ - Anagram Solver Frequently Asked Questions',
  description: 'Find answers to common questions about our anagram solver, Scrabble tips, and word game strategies.',
  keywords: ['faq', 'frequently asked questions', 'anagram tips', 'word game tips'],
  metadataBase: new URL('https://anagram-solver.co'),
  alternates: {
    canonical: 'https://anagram-solver.co/faq',
  },
  openGraph: {
    title: 'FAQ - Anagram Solver Frequently Asked Questions',
    description: 'Find answers to common questions about our anagram solver, Scrabble tips, and word game strategies.',
    url: 'https://anagram-solver.co/faq',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is an anagram solver and how does it work?',
    answer:
      'An anagram solver is a tool that finds all possible words that can be formed by rearranging the letters of a given input. Our anagram solver uses advanced algorithms to match your letters against a comprehensive English dictionary. The anagram solver works by creating a character frequency map of your input and comparing it with dictionary words to find exact matches. This makes the anagram solver extremely fast and accurate.',
  },
  {
    question: 'Is the anagram solver free to use?',
    answer:
      'Yes, our anagram solver is completely free with no hidden costs or subscription fees. The anagram solver requires no registration or downloads. You can use the anagram solver as many times as you want, whenever you need it. We believe an anagram solver should be accessible to everyone, so we keep it free forever.',
  },
  {
    question: 'How accurate is the anagram solver dictionary?',
    answer:
      'Our anagram solver uses a comprehensive English dictionary containing thousands of valid words. The anagram solver dictionary is regularly updated to include new words and ensure accuracy. Every word in the anagram solver has been verified against official dictionaries and Scrabble word lists. The anagram solver only shows words that are recognized in standard English usage.',
  },
  {
    question: 'Can I use the anagram solver for Scrabble?',
    answer:
      'Absolutely! Our anagram solver is perfect for Scrabble and includes a specialized Scrabble solver tool. The anagram solver shows Scrabble point values for each word, helping you find high-scoring plays. The anagram solver dictionary includes all valid Scrabble words. Many competitive Scrabble players use our anagram solver for practice and game improvement.',
  },
  {
    question: 'Does the anagram solver work on mobile devices?',
    answer:
      'Yes, the anagram solver is fully responsive and works perfectly on all mobile devices. The anagram solver interface automatically adapts to your screen size, whether you\'re using a smartphone, tablet, or desktop computer. The anagram solver loads quickly on mobile networks and provides the same powerful features across all devices.',
  },
  {
    question: 'What makes your anagram solver better than others?',
    answer:
      'Our anagram solver offers several advantages over other tools. The anagram solver includes multiple sorting options (by length, alphabetically, or Scrabble score). The anagram solver processes queries instantly, even with complex letter combinations. Our anagram solver features a clean, ad-free interface focused on functionality. The anagram solver includes specialized tools for different word games and puzzle types.',
  },
  {
    question: 'How many letters can I enter in the anagram solver?',
    answer:
      'The anagram solver accepts up to 20 letters at a time. This limit ensures the anagram solver performs quickly while still handling most word game situations. The anagram solver can process this many letters in milliseconds. If you need to solve longer anagrams, try breaking them into smaller chunks with the anagram solver.',
  },
  {
    question: 'Does the anagram solver support wildcards or blank tiles?',
    answer:
      'Yes, our word finder tool supports wildcard pattern matching using the ? character. The anagram solver word finder feature lets you specify known letters and use wildcards for unknown positions. This makes the anagram solver perfect for crossword puzzles where you know some letters. The anagram solver wildcard feature works seamlessly with our regular anagram finding.',
  },
  {
    question: 'Can the anagram solver find multi-word anagrams?',
    answer:
      'Yes! We have a specialized multiple word anagram solver that finds two-word and three-word combinations. The anagram solver multi-word tool discovers creative phrase anagrams from your letters. This anagram solver feature is perfect for finding amusing anagrams of names or phrases. The anagram solver processes multi-word searches quickly and comprehensively.',
  },
  {
    question: 'How do I sort anagram solver results?',
    answer:
      'The anagram solver provides three sorting options for results. You can sort anagram solver results by word length (longest first), alphabetically, or by Scrabble score (highest first). The anagram solver remembers your sorting preference for convenience. Simply select your preferred sorting method before clicking the solve button in the anagram solver.',
  },
  {
    question: 'Is my data private when using the anagram solver?',
    answer:
      'Absolutely. The anagram solver does not store your searches or collect personal information. The anagram solver processes everything securely without logging your activity. We respect your privacy and designed the anagram solver to be completely anonymous. The anagram solver connection is encrypted for additional security.',
  },
  {
    question: 'Why doesn\'t the anagram solver find my word?',
    answer:
      'If the anagram solver doesn\'t find a specific word, it may not be in our dictionary. The anagram solver only includes valid English words from recognized dictionaries. Proper nouns, abbreviations, and very obscure terms might not appear in the anagram solver results. The anagram solver focuses on commonly accepted words for word games and puzzles.',
  },
  {
    question: 'Can I use the anagram solver for Words with Friends?',
    answer:
      'Yes, the anagram solver works excellently for Words with Friends. While the anagram solver uses standard English dictionaries, most words are valid in Words with Friends. The anagram solver helps you find high-scoring words and strategic plays. Many Words with Friends players rely on our anagram solver to improve their game.',
  },
  {
    question: 'How does the anagram solver calculate Scrabble scores?',
    answer:
      'The anagram solver uses official Scrabble letter point values to calculate scores. Each letter in the anagram solver has its standard Scrabble value (A=1, Z=10, etc.). The anagram solver adds up these values to show the base score for each word. Note that the anagram solver shows tile values only, not board multipliers.',
  },
  {
    question: 'Does the anagram solver work offline?',
    answer:
      'Currently, the anagram solver requires an internet connection to access our dictionary and processing. We\'re developing an offline version of the anagram solver for mobile devices. The anagram solver loads quickly even on slower connections. Once loaded, the anagram solver responds instantly to your queries.',
  },
  {
    question: 'Can teachers use the anagram solver in classrooms?',
    answer:
      'Absolutely! The anagram solver is an excellent educational tool for teaching vocabulary and spelling. Teachers use the anagram solver to create engaging word games and learning activities. The anagram solver helps students discover new words and understand letter patterns. The anagram solver is free for educational use with no restrictions.',
  },
  {
    question: 'What word games work best with the anagram solver?',
    answer:
      'The anagram solver excels at Scrabble, Words with Friends, crossword puzzles, and word searches. The anagram solver helps with anagram puzzles, cryptograms, and letter rearrangement games. The anagram solver is useful for any game requiring word formation from letters. The anagram solver supports both competitive and casual word gaming.',
  },
  {
    question: 'How often is the anagram solver dictionary updated?',
    answer:
      'We update the anagram solver dictionary regularly to include new words and maintain accuracy. The anagram solver team reviews new word additions from official dictionaries quarterly. When Scrabble word lists are updated, the anagram solver dictionary is refreshed accordingly. The anagram solver always reflects current, valid English vocabulary.',
  },
];

export default function FAQPage() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Frequently Asked Questions About Our Anagram Solver
            </h1>

            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
              Find answers to common questions about using our anagram solver, word game
              strategies, and tips for getting the most out of our tools.
            </p>

            <div className="mt-12 space-y-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {faq.question}
                  </h2>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional SEO Content */}
            <div className="mt-16 prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                More Anagram Solver Tips and Strategies
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Using an anagram solver effectively requires understanding how to maximize its
                features. Our anagram solver provides multiple ways to find the perfect words for
                your needs. When playing Scrabble, use the anagram solver to explore all possible
                words before making your move. The anagram solver can reveal high-scoring
                opportunities you might have missed. For crossword puzzles, combine the anagram
                solver with our pattern matching feature to find words that fit specific letter
                positions. The anagram solver becomes even more powerful when you understand common
                letter patterns and word formations. Regular practice with the anagram solver helps
                you recognize anagrams more quickly in actual gameplay. The anagram solver serves
                as both a problem-solving tool and a learning resource for improving vocabulary.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Advanced Anagram Solver Techniques
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Expert users employ several advanced techniques with our anagram solver. The
                anagram solver sorting options help you quickly identify the best words for
                different situations. When using the anagram solver for Scrabble, sort by score to
                find maximum point plays. The anagram solver length sorting helps when you need
                words that fit specific board positions. Combining multiple anagram solver tools
                gives you comprehensive word-finding capabilities. Use the anagram solver main tool
                for general searches, then switch to specialized tools for specific needs. The
                anagram solver multi-word feature reveals creative combinations for phrase anagrams.
                Understanding how the anagram solver processes your input helps you formulate better
                searches. The anagram solver works best when you provide clear, focused inputs
                rather than random letters.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-16 rounded-lg bg-cyan-50 p-8 dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Still Have Questions About Our Anagram Solver?
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                If you have additional questions about the anagram solver that aren't covered here,
                we'd love to hear from you. Your feedback helps us improve the anagram solver and
                add new features that users need.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="/contact"
                  className="rounded-md bg-cyan-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-cyan-700"
                >
                  Contact Us
                </a>
                <a
                  href="/"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Try Anagram Solver
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
