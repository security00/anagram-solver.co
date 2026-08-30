import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'Anagram Solver', href: '/' },
      { name: 'Rack Word Finder', href: '/tools/scrabble-solver' },
      { name: 'Word Finder', href: '/tools/word-finder' },
      { name: 'Multiple Word Anagrams', href: '/tools/multiple-words' },
      { name: 'Two Word Anagram Solver', href: '/tools/two-word-anagram-solver' },
      { name: 'Three Word Anagram Solver', href: '/tools/three-word-anagram-solver' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    resources: [
      { name: 'Anagram Tips', href: '/blog/anagram-tips' },
      { name: 'Scrabble Strategy', href: '/blog/scrabble-strategy' },
      { name: 'Word Game Guide', href: '/blog/word-game-guide' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-[#061a38] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[1320px] px-6 pb-8 pt-14 sm:pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Image src="/design/brand-mark.webp" alt="" width={36} height={36} className="h-9 w-9" />
              <span className="text-xl font-bold">Anagram Solver</span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              Find exact anagrams, words from available letters, and fixed-length patterns in your browser.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Tools
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.tools.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-slate-300 hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-slate-300 hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-slate-300 hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs leading-5 text-slate-400">
            &copy; {currentYear} Anagram Solver. Open-dictionary word tools for puzzles and learning.
          </p>
        </div>
      </div>
    </footer>
  );
}
