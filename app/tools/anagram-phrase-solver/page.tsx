import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'Anagram Phrase Solver: Turn Letters Into Phrases (Free)';
const description =
  'Free anagram phrase solver: paste a phrase, name or clue and get 2- to 4-word anagram phrases that use every letter once. Filter and copy.';
const path = '/tools/anagram-phrase-solver';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'anagram phrase solver',
    'phrase anagram solver',
    'anagram phrase generator',
    'phrase anagram',
    'anagram a phrase',
    'name anagram phrase',
  ],
  alternates: { canonical: getCanonicalUrl(path) },
  openGraph: { title, description, url: getCanonicalUrl(path), type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const faqs = [
  {
    question: 'What is a phrase anagram?',
    answer:
      'A phrase anagram rearranges every letter of a word or phrase into a new phrase of two or more words. "Dormitory" becomes "dirty room" and "the eyes" becomes "they see". No letter is added or left over.',
  },
  {
    question: 'Can I paste a whole phrase or a name?',
    answer:
      'Yes. Spaces, punctuation, numbers and capital letters are stripped before the search, so you can paste a name, a title or a full clue as it is.',
  },
  {
    question: 'How many words can the phrases have?',
    answer:
      'Choose two, three or four words. Two-word results are easier to read; three- and four-word results give more options for long inputs of twelve letters or more.',
  },
  {
    question: 'How do I get more readable phrases?',
    answer:
      'Keep the common dictionary selected, set the minimum word length to 3 or 4 to remove filler words, and use "Must include" if you already know one word of the answer.',
  },
  {
    question: 'Is the anagram phrase solver free and private?',
    answer:
      'Yes. It is free with no sign-up, and the search runs in your browser, so the phrases you type are not sent to a server.',
  },
];

export default function AnagramPhraseSolverPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Anagram Phrase Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl(path),
      description:
        'Free anagram phrase solver that turns a word, name or phrase into multi-word anagram phrases using every letter once.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
          { label: 'Anagram Phrase Solver' },
        ]}
        eyebrow="Phrase solver"
        title="Anagram Phrase Solver"
        description="Paste a phrase, name or clue and get anagram phrases of two to four words that use every letter exactly once."
        heroContent={
          <MultipleWordsAnagramTool
            defaultWordCount={2}
            examples={[
              { label: 'DORMITORY', value: 'dormitory' },
              { label: 'THE EYES', value: 'the eyes' },
              { label: 'ELEVEN PLUS TWO', value: 'eleven plus two' },
              { label: 'SLOT MACHINES', value: 'slot machines' },
              { label: 'A GENTLEMAN', value: 'a gentleman' },
            ]}
          />
        }
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Turn Any Phrase Into New Phrases</h2>
            <p>
              Most anagram tools return single words. A phrase anagram needs every letter shared across
              several real words, which is what puzzle clues, name anagrams and wordplay usually ask for.
              Type or paste your phrase, pick two, three or four words, and the solver lists phrases that use
              each letter exactly once.
            </p>

            <h2>Classic Phrase Anagrams</h2>
            <ul>
              <li><strong>DORMITORY</strong> &rarr; <strong>DIRTY ROOM</strong></li>
              <li><strong>THE EYES</strong> &rarr; <strong>THEY SEE</strong></li>
              <li><strong>ASTRONOMER</strong> &rarr; <strong>MOON STARER</strong></li>
              <li><strong>A GENTLEMAN</strong> &rarr; <strong>ELEGANT MAN</strong></li>
              <li><strong>ELEVEN PLUS TWO</strong> &rarr; <strong>TWELVE PLUS ONE</strong></li>
            </ul>

            <h2>How to Use the Anagram Phrase Solver</h2>
            <ol>
              <li>Paste the phrase, name or clue letters. Spaces and punctuation are ignored.</li>
              <li>Choose two, three or four words for the answer.</li>
              <li>Set a minimum word length and, if you know one word, add it under &ldquo;Must include&rdquo;.</li>
              <li>Copy the phrase you like with one click.</li>
            </ol>

            <h2>Tips for Better Phrases</h2>
            <p>
              Inputs of 8 to 16 letters give the best mix of choice and readability. For crossword clues
              with an enumeration such as <code>(5,4)</code>, use two words and scan for the right lengths.
              For long names, try three words and a minimum length of 3.
            </p>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>

          <RelatedLinkGrid>
            <Link href="/tools/multiple-words" className="related-link">
              <h3>Multiple Word Anagram Solver</h3>
              <p>Search two- and three-word anagrams from any set of letters.</p>
            </Link>
            <Link href="/tools/two-word-anagram-solver" className="related-link">
              <h3>2 Word Anagram Solver</h3>
              <p>Results locked to exactly two words.</p>
            </Link>
            <Link href="/tools/three-word-anagram-solver" className="related-link">
              <h3>3 Word Anagram Solver</h3>
              <p>Results locked to exactly three words for longer inputs.</p>
            </Link>
            <Link href="/" className="related-link">
              <h3>Anagram Solver</h3>
              <p>Exact one-word anagrams and every word in your letters.</p>
            </Link>
          </RelatedLinkGrid>
        </InnerContent>
      </InnerPageShell>
    </>
  );
}
