'use client';

import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const flatNav = [
  { name: 'Home', href: '/' },
  { name: 'Anagram Solver', href: '/#solver' },
  { name: 'FAQ', href: '/faq' },
];

const toolNav = [
  { name: 'Word Finder', href: '/tools/word-finder' },
  { name: 'Rack Word Finder', href: '/tools/scrabble-solver' },
  { name: 'Words With Friends Finder', href: '/tools/words-with-friends-finder' },
  { name: 'Jumble Solver', href: '/tools/jumble-solver' },
  { name: 'Multiple Words', href: '/tools/multiple-words' },
  { name: '2 Word Anagrams', href: '/tools/two-word-anagram-solver' },
  { name: '3 Word Anagrams', href: '/tools/three-word-anagram-solver' },
  { name: 'Name Anagrams', href: '/tools/name-anagram-solver' },
  { name: 'Phrase Anagrams', href: '/tools/anagram-phrase-solver' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();
  const toolsActive = toolNav.some((item) => pathname === item.href);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileMenuOpen(false);
    setToolsOpen(false);
  }

  return (
    <header className="relative z-40 border-b border-white/10 bg-[#061a38] text-white">
      <nav className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12" aria-label="Primary navigation">
        <div className="flex h-[74px] w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3 rounded-sm" aria-label="Anagram Solver home">
            <Image
              src="/design/brand-mark.webp"
              alt="Anagram Solver logo"
              width={38}
              height={38}
              priority
              className="h-9 w-9"
            />
            <span className="text-lg font-bold tracking-[-0.02em] sm:text-xl">Anagram Solver</span>
          </Link>

          <div className="hidden h-full lg:flex lg:items-center lg:gap-7">
            {flatNav.map((item) => (
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
            <div className="nav-tools" onMouseLeave={() => setToolsOpen(false)}>
              <button
                type="button"
                className={`nav-tools-button ${toolsActive || toolsOpen ? 'text-cyan-300' : 'text-slate-200'}`}
                aria-expanded={toolsOpen}
                aria-controls="tools-menu"
                onClick={() => setToolsOpen((open) => !open)}
                onMouseEnter={() => setToolsOpen(true)}
              >
                Tools
                <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              {toolsOpen && (
                <div id="tools-menu" className="nav-tools-menu" role="menu">
                  {toolNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
              {flatNav.map((item) => (
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
              <p className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Tools</p>
              {toolNav.map((item) => (
                <Link
                  key={item.href}
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
