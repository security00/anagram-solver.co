import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent, RelatedLinkGrid } from '@/components/InnerPageShell';
import MultipleWordsAnagramTool from '@/components/MultipleWordsAnagramTool';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

const title = 'Name Anagram Solver: Anagram My Name Into Phrases (Free)';
const description =
  'Free name anagram solver: type your name and get two- to four-word anagrams that use every letter once, with common names included. Copy and share.';
const path = '/tools/name-anagram-solver';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'name anagram',
    'anagram my name',
    'name anagram solver',
    'name anagram generator',
    'anagram of my name',
  ],
  alternates: { canonical: getCanonicalUrl(path) },
  openGraph: { title, description, url: getCanonicalUrl(path), type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const faqs = [
  {
    question: 'How do I anagram my name?',
    answer:
      'Type your full name (first and last, with or without spaces) and search. The solver rearranges every letter into phrases of two, three or four real words. Spaces, punctuation and capitals are ignored.',
  },
  {
    question: 'Why are names included in the results?',
    answer:
      'Name anagrams often read best when one of the words is itself a name, so this page turns on the common names list by default. Untick the Names option to see only dictionary words.',
  },
  {
    question: 'Why did my name return no anagrams?',
    answer:
      'Short names or names with few vowels have far fewer combinations. Try adding a middle name or initial, allow more words, or lower the minimum word length to 2.',
  },
  {
    question: 'Are the results meaningful or just random?',
    answer:
      'Every result is made of real dictionary words (and names, if enabled) and uses each letter exactly once, but the solver does not judge meaning. Scan the list for the phrase that reads well for you.',
  },
  {
    question: 'Is my name sent anywhere?',
    answer:
      'No. The search runs in your browser and the name you type is not sent to or stored on a server. Recent searches stay on your device.',
  },
];

export default function NameAnagramSolverPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Name Anagram Solver',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: getCanonicalUrl(path),
      description:
        'Free name anagram solver that rearranges a name into multi-word anagrams, with common names included.',
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
          { label: 'Name Anagram Solver' },
        ]}
        eyebrow="Name solver"
        title="Name Anagram Solver"
        description="Type your name and get anagrams of two to four words that use every letter exactly once, with common names switched on."
        heroContent={
          <MultipleWordsAnagramTool
            defaultWordCount={2}
            defaultIncludeNames
            examples={[
              { label: 'CLINT EASTWOOD', value: 'clint eastwood' },
              { label: 'TOM CRUISE', value: 'tom cruise' },
              { label: 'EMMA WATSON', value: 'emma watson' },
              { label: 'DAVID BECKHAM', value: 'david beckham' },
            ]}
          />
        }
      >
        <InnerContent wide>
          <div className="editorial-copy">
            <h2>Anagram Your Name</h2>
            <p>
              A name anagram rearranges the letters of a person&apos;s name into new words. The best-known
              example is <strong>CLINT EASTWOOD</strong> &rarr; <strong>OLD WEST ACTION</strong>. Type your
              name above and the solver lists phrases that use each letter exactly once. Common names
              are switched on here, because an anagram that contains a name often reads better than one built
              from rare dictionary words.
            </p>

            <h2>How to Use the Name Anagram Solver</h2>
            <ol>
              <li>Type your first and last name. Spaces and capitals are ignored.</li>
              <li>Choose how many words you want in each anagram (2, 3 or 4).</li>
              <li>Set a minimum word length to remove short filler words.</li>
              <li>Untick the Names option if you only want dictionary words.</li>
              <li>Copy or share the anagram you like.</li>
            </ol>

            <h2>Tips for Better Name Anagrams</h2>
            <ul>
              <li>Full names (10 to 16 letters) give many more results than first names alone.</li>
              <li>Add a middle name or initial if a short name returns nothing.</li>
              <li>Use &ldquo;Must include&rdquo; to force a word you want, like LOVE or STAR.</li>
              <li>Results are not ranked for meaning, so scroll through and pick the one that fits.</li>
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
            <Link href="/tools/multiple-words" className="related-link">
              <h3>Multiple Word Anagram Solver</h3>
              <p>Search two- and three-word anagrams from any set of letters.</p>
            </Link>
            <Link href="/tools/two-word-anagram-solver" className="related-link">
              <h3>2 Word Anagram Solver</h3>
              <p>Results locked to exactly two words.</p>
            </Link>
            <Link href="/tools/anagram-phrase-solver" className="related-link">
              <h3>Anagram Phrase Solver</h3>
              <p>Turn any phrase or clue into new multi-word phrases.</p>
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
