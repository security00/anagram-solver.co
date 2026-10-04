import type { Metadata } from 'next';
import Link from 'next/link';
import InnerPageShell, { InnerContent } from '@/components/InnerPageShell';
import { getCanonicalUrl } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) - Anagram Solver & Word Tools',
  description:
    'Comprehensive answers to common questions about exact anagram solving, multi-word phrases, Scrabble tile points, dictionary lexicons, and 100% private browser computation.',
  alternates: { canonical: getCanonicalUrl('/faq') },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) - Anagram Solver & Word Tools',
    description:
      'Comprehensive answers to common questions about exact anagram solving, multi-word phrases, Scrabble tile points, dictionary lexicons, and 100% private browser computation.',
    url: getCanonicalUrl('/faq'),
    type: 'website',
  },
};

const faqCategories = [
  {
    category: '1. Anagram Solving Rules & Mechanics',
    items: [
      {
        question: 'What is an exact anagram and how does this solver work?',
        answer:
          'An exact anagram is formed by rearranging every letter of a word or phrase so that every original character is used exactly once. Our solver sanitizes punctuation and spaces, calculates the letter frequency signature, and checks it against verified English word lists in real time.',
      },
      {
        question: 'Why does the main solver not show shorter sub-words?',
        answer:
          'Because by definition, an exact anagram must consume 100% of your input letters with none left over. If you want words formed from only a portion of your letters (such as 3-, 4-, or 5-letter words from a 7-letter rack), please use our dedicated Word Finder or Rack Word Finder tool.',
      },
      {
        question: 'How does the Multi-Word Anagram Solver work?',
        answer:
          'The multi-word tool partitions your scrambled letters across two or three separate valid English words (e.g., THE EYES -> THEY SEE). It runs a recursive combinatorial search inside a background Web Worker, prioritizing novel transposed solutions over simple re-orderings of your original words.',
      },
    ],
  },
  {
    category: '2. Dictionaries & Lexicon Standards',
    items: [
      {
        question: 'What is the difference between Common and Extended English dictionaries?',
        answer:
          'The Common Dictionary contains roughly 40,000 everyday English words, ideal for standard board games and family puzzle solving without obscure distractions. The Extended Dictionary includes over 178,000 words, featuring specialized terminology, archaic spellings, and tournament-level vocabulary.',
      },
      {
        question: 'What sources are used to build the word lists?',
        answer:
          'Our lexicons are compiled from trusted public-domain linguistic databases, primarily SCOWL (Spell Checking Oriented Word Lists) and established open English corpora. They are regularly updated to ensure high accuracy while removing offensive slurs.',
      },
      {
        question: 'Why might a legitimate English word occasionally be missing?',
        answer:
          'English is vast and evolving. Brand names, hyphenated terms, and newly coined internet slang stay out of the default English lists. Personal names are off by default; turn on Include common names in the multi-word solver when you want given names and surnames. If you notice a standard dictionary word missing, feel free to notify us via our Contact page.',
      },
    ],
  },
  {
    category: '3. Scoring & Board Game Rules',
    items: [
      {
        question: 'How are letter tile scores calculated?',
        answer:
          'Tile points follow standard English board game distributions (A=1, B=3, C=3, D=2, E=1, F=4, G=2, H=4, I=1, J=8, K=5, L=1, M=3, N=1, O=1, P=3, Q=10, R=1, S=1, T=1, U=1, V=4, W=4, X=8, Y=4, Z=10). Displayed scores represent the sum of these base letter values.',
      },
      {
        question: 'Do displayed scores include board bonus squares or bingos?',
        answer:
          'No. Our tools calculate base rack point values only. They do not simulate board layout positions (such as Double Letter, Triple Word, or the 50-point all-tile bingo bonus), as board conditions vary by specific match state.',
      },
      {
        question: 'How do wildcards and blank tiles work in searches?',
        answer:
          'In our Rack Word Finder, you can enter ? or * for up to 2 blank tiles. The solver tries all 26 English letters in those positions to find winning words, scoring blank tiles as 0 points in accordance with official tournament rules.',
      },
    ],
  },
  {
    category: '4. Privacy, Speed & Technical Architecture',
    items: [
      {
        question: 'Are my letters or puzzle clues uploaded to any server?',
        answer:
          'Never. Our solvers execute 100% inside your local browser using client-side Web Workers. Your letters, secret puzzle clues, and results are never transmitted to, inspected by, or stored on any remote server.',
      },
      {
        question: 'Does the website work offline or on mobile devices?',
        answer:
          'Our platform is fully responsive and optimized for smartphones, tablets, and desktops. Once a dictionary file is fetched during your session, searches run entirely in local device memory without requiring continuous network requests.',
      },
      {
        question: 'How do I change my analytics privacy preferences?',
        answer:
          'When first visiting the site, you can choose whether to allow optional Google Analytics. You can reset or update your preference at any time by clearing your browser cookies and local storage. We also honor browser-level Global Privacy Control (GPC) and Do Not Track (DNT) signals automatically.',
      },
    ],
  },
  {
    category: '5. Search Tips & User Experience',
    items: [
      {
        question: 'How do I quickly clear my search input?',
        answer:
          'Every search box features an instant "Clear input" icon button on the right side of the input field. Clicking it wipes the current text immediately, letting you test new letter combinations without manual backspacing.',
      },
      {
        question: 'Can I copy solutions directly to my clipboard?',
        answer:
          'Yes. Every solved word and phrase card includes a dedicated one-click copy button. Clicking it instantly copies the text to your device clipboard and displays a green "Copied!" confirmation badge.',
      },
      {
        question: 'Can I share an anagram search with friends via URL?',
        answer:
          'Yes! Our Multi-Word Anagram Solver supports URL parameters (e.g. /tools/multiple-words?q=yourletters). You can bookmark or share the link, and the solver will automatically populate and execute the search on page load.',
      },
    ],
  },
];

const allFaqItems = faqCategories.flatMap((cat) => cat.items);

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <InnerPageShell
      eyebrow="Help &amp; Knowledge Base"
      title="Frequently Asked Questions"
      description="Find clear answers regarding exact anagram algorithms, multi-word phrase unscrambling, dictionary coverage, tile scoring, and 100% private browser computation."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InnerContent>
        <article className="editorial-copy">
          <p>
            Have a question about how our word solvers work, how points are scored, or how your privacy is protected?
            Explore the categorized answers below. If you cannot find what you are looking for, our team is always
            happy to help via our <Link href="/contact" className="font-semibold text-[#008f9e] underline hover:text-[#061a38]">Contact page</Link>.
          </p>

          <div className="mt-10 space-y-12">
            {faqCategories.map((group, groupIdx) => (
              <section key={groupIdx}>
                <h2 className="!mt-0 text-2xl font-extrabold text-[#061a38] border-b border-[#d9e5ec] pb-3">
                  {group.category}
                </h2>
                <div className="mt-4 divide-y divide-[#d9e5ec]">
                  {group.items.map(({ question, answer }, itemIdx) => (
                    <details key={itemIdx} className="group py-4" open={groupIdx === 0 && itemIdx === 0}>
                      <summary className="cursor-pointer list-none font-bold text-[#061a38] text-lg hover:text-[#008f9e] transition-colors flex items-center justify-between">
                        <span>{question}</span>
                        <span className="ml-4 text-xs text-[#00aebf] group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-3 text-base leading-relaxed text-[#52657d] pl-1">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded border border-[#cfdde5] bg-[#f4f8fa] p-6">
            <h3 className="text-lg font-bold text-[#061a38]">Ready to Solve Words?</h3>
            <p className="mt-2 text-sm text-[#52657d]">
              Jump straight into our high-speed solving tools and unscramble your letters in real time:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="editorial-nav-btn"
              >
                <span>Exact Anagram Solver</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/tools/multiple-words"
                className="editorial-nav-btn"
              >
                <span>Multi-Word Anagram Solver</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/tools/scrabble-solver"
                className="editorial-nav-btn"
              >
                <span>Rack Word Finder</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/blog/word-game-guide"
                className="editorial-nav-btn"
              >
                <span>Universal Word Game Guide</span>
                <span className="nav-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>
        </article>
      </InnerContent>
    </InnerPageShell>
  );
}
