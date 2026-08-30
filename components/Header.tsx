'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rack Word Finder', href: '/tools/scrabble-solver' },
    { name: 'Word Finder', href: '/tools/word-finder' },
    { name: 'Multiple Words', href: '/tools/multiple-words' },
    { name: '2 Word Anagrams', href: '/tools/two-word-anagram-solver' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="relative z-40 border-b border-white/10 bg-[#061a38] text-white">
      <nav className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12" aria-label="Primary navigation">
        <div className="flex h-[74px] w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3 rounded-sm" aria-label="Anagram Solver home">
            <Image
              src="/design/brand-mark.webp"
              alt=""
              width={38}
              height={38}
              priority
              className="h-9 w-9"
            />
            <span className="text-lg font-bold tracking-[-0.02em] sm:text-xl">Anagram Solver</span>
          </Link>

          <div className="hidden h-full lg:flex lg:items-center lg:gap-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`relative flex h-full items-center text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-cyan-300' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400" aria-hidden="true" />
                )}
              </Link>
            ))}
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/15 text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-navigation" className="border-t border-white/10 pb-5 pt-3 lg:hidden">
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`rounded-md px-3 py-3 text-base font-medium ${
                    pathname === item.href ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
