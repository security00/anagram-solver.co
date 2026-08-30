import type { Metadata } from 'next';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Anagram Solver FAQ',
  description: 'Answers about exact anagrams, rack words, wildcards, dictionaries, scores, privacy, and performance.',
  alternates: { canonical: 'https://anagram-solver.co/faq' },
};

const faqs = [
  {
    question: 'What is an exact anagram?',
    answer: 'It is a word or phrase formed by rearranging all letters of the original. The main solver ignores spaces, punctuation, and capitalization, then requires every remaining letter to be used exactly once.',
  },
  {
    question: 'Why does the main solver not show shorter words?',
    answer: 'A shorter word does not use every letter, so it is not an exact anagram. Use Word Finder when you want any word that can be made from some or all of your letters.',
  },
  {
    question: 'How do wildcards and blank tiles work?',
    answer: 'Word Finder patterns use ? for exactly one unknown character. Rack Word Finder accepts ? or * as a blank tile that can stand for one missing letter and contributes zero rack points.',
  },
  {
    question: 'What is the difference between Common and Extended English?',
    answer: 'Common English is a smaller download focused on familiar spellings. Extended English is broader and can include uncommon, regional, historical, or technical forms. Neither mode guarantees acceptance in a particular game.',
  },
  {
    question: 'Is this an official Scrabble word checker?',
    answer: 'No. It uses an open English spelling list and Scrabble-style English letter values, not a licensed tournament lexicon. Scores are rack-letter totals only and exclude the board, premiums, cross-words, and bingo bonuses.',
  },
  {
    question: 'Can it find phrase anagrams?',
    answer: 'Yes. The multi-word tool finds exact two- or three-word combinations. To keep difficult searches responsive, it has result, time, and search-state limits and clearly reports when a search stops at one of those limits.',
  },
  {
    question: 'Why might a valid word be missing?',
    answer: 'Spelling lists differ. Try Extended English, but remember that proper nouns, phrases, abbreviations, inflections, and game-specific entries vary between dictionaries.',
  },
  {
    question: 'Does solving upload my letters?',
    answer: 'The solver downloads a static dictionary and runs searches in a background browser worker. There is no application search API receiving your input. Optional Google Analytics is loaded only after consent; see the Privacy Policy for details.',
  },
  {
    question: 'Does it work offline?',
    answer: 'The first visit needs a connection to load the site and selected dictionary. Your browser may cache those files, but this version is not packaged as a guaranteed offline application.',
  },
];

export default function FAQPage() {
  return (
    <InnerPageShell
      eyebrow="Help center"
      title="Frequently Asked Questions"
      description="Answers about exact anagrams, rack words, wildcards, dictionaries, scoring, privacy, and performance."
    >
      <InnerContent>
          <div className="faq-list">
            {faqs.map(({ answer, question }) => (
              <details key={question} className="faq-item">
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
      </InnerContent>
    </InnerPageShell>
  );
}
