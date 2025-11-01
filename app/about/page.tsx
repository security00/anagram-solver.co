import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// 强制静态生成
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'About Anagram Solver - Free Online Word Tool',
  description: "Learn how our anagram solver works, the tech behind it, and why it's a fast, accurate, and free resource for word games and puzzle fans.",
  keywords: ['about anagram solver', 'word game tools', 'online word utilities'],
  metadataBase: new URL('https://anagram-solver.co'),
  alternates: {
    canonical: 'https://anagram-solver.co/about',
  },
  openGraph: {
    title: 'About Anagram Solver - Free Online Word Tool',
    description: "Learn about our anagram solver tool, how it works, and why it's the best free online resource for word games.",
    url: 'https://anagram-solver.co/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              About Our Anagram Solver Tool
            </h1>

            <div className="mt-8 prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to the premier free anagram solver on the internet. Our anagram solver has
                been helping word game enthusiasts, puzzle solvers, and language learners find the
                perfect words since its creation. This anagram solver was built with one goal in
                mind: to provide the most comprehensive, user-friendly, and accurate anagram
                solving tool available online.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                What Makes Our Anagram Solver Special
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver stands apart from other word finding tools through its
                combination of powerful features and ease of use. The anagram solver uses advanced
                algorithms to quickly search through an extensive English dictionary, finding every
                possible valid word from your input letters. Unlike basic anagram solver tools, ours
                includes multiple sorting options, Scrabble score calculations, and specialized
                features for different word games. The anagram solver interface was designed to be
                intuitive for beginners while offering advanced options for experienced users. We
                continuously improve our anagram solver based on user feedback and the latest
                developments in computational linguistics. This anagram solver represents years of
                development and refinement to create the perfect tool for word enthusiasts.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                The Technology Behind Our Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver employs cutting-edge algorithms optimized for speed and
                accuracy. The anagram solver uses character frequency matching, which is
                significantly more efficient than generating all permutations. When you enter
                letters into the anagram solver, it creates a frequency map of your input and
                compares it against our comprehensive dictionary. This approach allows the anagram
                solver to process even complex queries in milliseconds. The anagram solver database
                contains thousands of valid English words, carefully curated to ensure accuracy. Our
                anagram solver is built using modern web technologies, ensuring it works seamlessly
                across all devices and browsers. The anagram solver backend is optimized for
                performance, capable of handling thousands of simultaneous users without slowdown.
                We regularly update the anagram solver dictionary to include new words and remove
                obsolete terms.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Our Commitment to Free Access
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We believe that an anagram solver should be accessible to everyone, which is why our
                anagram solver is completely free with no hidden costs. Many anagram solver websites
                charge subscription fees or limit functionality, but we've kept our anagram solver
                open to all users. The anagram solver requires no registration, no downloads, and no
                personal information. You can use the anagram solver as many times as you want,
                whenever you need it. Our anagram solver is funded through minimal, non-intrusive
                advertising that doesn't interfere with your word-solving experience. We're
                committed to keeping this anagram solver free forever, ensuring that quality word
                game tools remain accessible to everyone. The anagram solver represents our
                contribution to the word game community and language learning resources.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Who Uses Our Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our anagram solver serves a diverse community of users with varied needs. Scrabble
                players use the anagram solver to find high-scoring words during competitive games.
                Crossword enthusiasts rely on the anagram solver to crack difficult puzzle clues.
                Teachers incorporate the anagram solver into classroom activities to make vocabulary
                learning engaging. Students use the anagram solver to improve spelling and discover
                new words. Writers employ the anagram solver for creative wordplay and naming
                characters. Language learners find the anagram solver helpful for understanding
                English word patterns. Casual puzzle solvers enjoy the anagram solver for daily word
                games and brain training. Professional word game competitors trust the anagram
                solver for tournament preparation and practice.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Privacy and Security in Our Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Your privacy is paramount when using our anagram solver. The anagram solver doesn't
                store your searches or collect personal information. When you use the anagram
                solver, all processing happens in your browser or on our secure servers without
                logging your activity. Our anagram solver doesn't use tracking cookies beyond basic
                analytics to improve the service. The anagram solver connection is secured with SSL
                encryption, protecting your data during transmission. We've designed the anagram
                solver to be completely anonymous – you can use it without creating an account or
                providing any identifying information. Our anagram solver complies with all relevant
                privacy regulations, including GDPR and CCPA. The security of the anagram solver
                infrastructure is regularly audited and updated to protect against threats.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                The Future of Our Anagram Solver
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We have exciting plans for the future development of our anagram solver. The anagram
                solver will soon include support for multiple languages beyond English. We're
                working on adding historical word usage data to the anagram solver to help users
                understand word popularity. Future versions of the anagram solver will include
                advanced filtering options for word origins and technical terminology. The anagram
                solver mobile app is under development to provide an even better experience on
                smartphones and tablets. We plan to add social features to the anagram solver,
                allowing users to share interesting anagram discoveries. The anagram solver will
                incorporate machine learning to provide personalized word suggestions based on your
                interests. Community features will let anagram solver users submit new words and
                vote on dictionary additions. We're committed to making this anagram solver the most
                comprehensive word tool available.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                Join Our Anagram Solver Community
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We invite you to become part of the growing anagram solver community. Share your
                feedback about the anagram solver to help us improve the tool. Follow our anagram
                solver on social media for word game tips and interesting anagram discoveries. Join
                discussions about the anagram solver and word games in our online forums. Subscribe
                to the anagram solver newsletter for updates on new features and word game
                strategies. Recommend our anagram solver to friends and fellow word game enthusiasts
                who might benefit from it. Whether you're a casual user or a devoted word game
                player, the anagram solver community welcomes you. Together, we're building the best
                free anagram solver resource on the internet.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-16 rounded-lg bg-blue-50 p-8 text-center dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready to Solve Anagrams?
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Try our free anagram solver now and discover all the words you can make!
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="/"
                  className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Use Anagram Solver
                </a>
                <a
                  href="/faq"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Read FAQ
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
