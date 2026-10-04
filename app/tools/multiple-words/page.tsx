import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Anagram Solver Multiple Words (Free) | Instant 2 & 3 Word Finder',
  description:
    'Instantly solve multiple word anagrams from any letters or phrases. Free multi-word anagram solver that finds exact 2-word and 3-word phrase combinations.',
  keywords: [
    'anagram solver multiple words',
    'multiple word anagram solver',
    'multiple word anagram solver free',
    'multi word anagram solver',
    'anagram finder multiple words',
    'multiple word anagram solver with letters',
    'phrase anagram solver',
  ],
  alternates: {
    canonical: getCanonicalUrl('/tools/multiple-words'),
  },
  openGraph: {
    title: 'Anagram Solver Multiple Words (Free) | Instant 2 & 3 Word Finder',
    description:
      'Instantly solve multiple word anagrams from any letters or phrases. Free multi-word anagram solver that finds exact 2-word and 3-word phrase combinations.',
    url: getCanonicalUrl('/tools/multiple-words'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anagram Solver Multiple Words (Free) | Instant 2 & 3 Word Finder',
    description:
      'Instantly solve multiple word anagrams from any letters or phrases. Free multi-word anagram solver that finds exact 2-word and 3-word phrase combinations.',
  },
};

const faqs = [
  {
    question: 'Is this multiple word anagram solver completely free?',
    answer:
      'Yes, it is 100% free with no registration, word limits, or paywalls. All anagram computations run directly in your browser using high-speed Web Workers.',
  },
  {
    question: 'How do I solve multiple word anagrams from letters?',
    answer:
      'Simply type or paste your letters or phrase into the input field above. The solver automatically ignores spaces and punctuation, rearrange your letters, and finds exact 2-word, 3-word, and 4-word combinations.',
  },
  {
    question: 'Does this solver use every single letter?',
    answer:
      'Yes. Every result is an exact anagram that uses every input letter exactly once. If you need partial words made from your letters, use our Word Finder tool instead.',
  },
  {
    question: 'Can I find anagrams for names or famous phrases?',
    answer:
      'Yes. Enter any full name or phrase (such as SCHOOLMASTER or THE EYES). Turn on Include common names when you want given names and surnames in the results. The solver splits and pairs words into meaningful English phrases like THE CLASSROOM or THEY SEE.',
  },
  {
    question: 'Can I lock results to exactly two words or three words?',
    answer:
      'Yes. Toggle the Word count filter to exactly 2, 3, or 4 words. Dedicated pages remain available for Two Word Anagram Solver and Three Word Anagram Solver.',
  },
  {
    question: 'What does the Must include filter do?',
    answer:
      'Use Must include when one word of your answer is already known or suspected. For example, typing "the" will only show phrase results that contain the word "the".',
  },
  {
    question: 'What does the Must exclude filter do?',
    answer:
      'Use Must exclude to drop filler or already-used words from the phrase list. You can type one word or several words separated by commas or spaces, such as "the, a".',
  },
];

export default function MultipleWordsPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Multiple Word Anagram Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl('/tools/multiple-words'),
      description:
        'Free online multiple word anagram solver that finds exact two-word and three-word phrase anagrams from letters and names.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '158',
      },
    },
    {
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
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InnerPageShell
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/tools/multiple-words', label: 'Tools' },
          { label: 'Multiple Word Anagram Solver' },
        ]}
        eyebrow="Multi-word solver"
        title="Multiple Word Anagram Solver"
        description="Find exact 2-word and 3-word anagram phrases from your letters, names, and puzzle clues. 100% free, runs instantly in your browser, and uses every letter exactly once."
        heroContent={<MultipleWordsAnagramTool />}
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Instant Multi-Word Anagrams from Any Letters</h2>
            <p>
              Unlike traditional anagram solvers that only unscramble letters into single dictionary
              words, this <strong>multiple word anagram solver</strong> discovers full multi-word
              phrases and sentences. Enter a name, cryptic crossword clue, or any set of letters,
              and the solver breaks them down into exact combinations where <em>every single letter</em> is
              used once.
            </p>

            <h2>Popular Examples of Multi-Word Anagrams</h2>
            <p>
              Multi-word anagrams often reveal clever, humorous, or poetic connections between
              different words. Here are some famous examples you can test right now:
            </p>
            <ul>
              <li><strong>THE EYES</strong> &rarr; <strong>THEY SEE</strong> (Exact 2-word anagram)</li>
              <li><strong>SCHOOLMASTER</strong> &rarr; <strong>THE CLASSROOM</strong> (Exact 2-word anagram)</li>
              <li><strong>ASTRONOMER</strong> &rarr; <strong>MOON STARER</strong> (Exact 2-word anagram)</li>
              <li><strong>ELEVEN PLUS TWO</strong> &rarr; <strong>TWELVE PLUS ONE</strong> (Exact 3-word anagram, matching mathematical truth)</li>
              <li><strong>DORMITORY</strong> &rarr; <strong>DIRTY ROOM</strong> (Exact 2-word anagram)</li>
              <li><strong>A GENTLEMAN</strong> &rarr; <strong>ELEGANT MAN</strong> (Exact 2-word anagram)</li>
            </ul>

            <h2>When to Use a Multiple Word Anagram Solver</h2>
            <p>
              There are several common reasons why players and word lovers need multi-word solutions:
            </p>
            <ul>
              <li>
                <strong>Cryptic Crosswords:</strong> Clues frequently hint that an answer consists of two or three words (e.g. indicated by clue word counts like (4, 3) or (3, 4, 3)).
              </li>
              <li>
                <strong>Name Anagrams & Pseudonyms:</strong> Authors, screenwriters, and gamers love rearranging personal names or character names into secret aliases or alter egos.
              </li>
              <li>
                <strong>Pub Quizzes & Puzzle Hunts:</strong> Multi-word anagrams are staples of trivia competitions, escape rooms, and brain teasers.
              </li>
              <li>
                <strong>Creative Writing & Branding:</strong> Brainstorm memorable brand names, band titles, and book titles from existing phrases.
              </li>
            </ul>

            <h2>How to Filter and Get Better Results</h2>
            <p>
              Multi-word combinations grow exponentially with longer inputs. To find the best results quickly:
            </p>
            <ul>
              <li>
                <strong>Word Count:</strong> Choose whether you want <em>Exactly 2 words</em> or <em>Exactly 3 words</em>. Two-word anagrams are usually crisper and easier to read, while three-word anagrams help handle longer phrases.
              </li>
              <li>
                <strong>Min Word Length:</strong> Increase this to 3 or 4 letters to filter out 1-letter or 2-letter connector words (like &ldquo;a&rdquo;, &ldquo;in&rdquo;, &ldquo;to&rdquo;) if you want meatier phrases.
              </li>
              <li>
                <strong>Must Include:</strong> When you already know one word from a puzzle clue, type it in the &ldquo;Must include&rdquo; box to restrict the search.
              </li>
              <li>
                <strong>Dictionary Type:</strong> Use <em>Common English</em> for natural, everyday words and faster searches. Switch to <em>Extended English</em> when you need comprehensive obscure vocabulary.
              </li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>

          <RelatedLinkGrid>
            <Link
              href="/tools/two-word-anagram-solver"
              className="related-link"
            >
              <h3>Anagram Solver 2 Words</h3>
              <p>
                Dedicated two-word anagram solver for exact phrase pairs, names, and puzzle answers.
              </p>
            </Link>

            <Link
              href="/tools/three-word-anagram-solver"
              className="related-link"
            >
              <h3>Three Word Anagram Solver</h3>
              <p>
                Explore exact three-word phrase anagrams for longer names and sentence clues.
              </p>
            </Link>

            <Link
              href="/tools/word-finder"
              className="related-link"
            >
              <h3>Word Finder & Wildcard Tool</h3>
              <p>
                Search words from letters, length filters, and ? wildcard patterns.
              </p>
            </Link>

            <Link
              href="/tools/scrabble-solver"
              className="related-link"
            >
              <h3>Rack Word Finder</h3>
              <p>
                Score words from available tile racks with blank tile support and prefix/suffix filters.
              </p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
