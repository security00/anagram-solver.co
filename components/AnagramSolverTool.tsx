'use client';

import {
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  MinusSmallIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { calculateScore } from '@/lib/anagramSolver';
import { runWordSolverQuery } from '@/lib/solverClient';
import type { DictionaryType } from '@/lib/dictionaryData';
import type { WordSort } from '@/lib/solverEngine';

const RESULT_LIMIT = 500;
const PAGE_SIZE = 100;

const modes = [
  { href: '/', label: 'Anagram Solver', active: true },
  { href: '/tools/word-finder', label: 'Word Finder' },
  { href: '/tools/scrabble-solver', label: 'Rack Word Finder' },
  { href: '/tools/multiple-words', label: 'Multiple Words' },
];

const exampleWords = ['SILENT', 'ENLIST', 'TINSEL'];

export default function AnagramSolverTool() {
  const [input, setInput] = useState('LISTEN');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<WordSort>('length');
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');

  const handleSolve = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const outcome = await runWordSolverQuery({
        dictionaryType,
        kind: 'words',
        request: {
          input,
          limit: RESULT_LIMIT,
          operation: 'anagrams',
          sortBy,
        },
      });
      setResults(outcome.words);
      setTotal(outcome.total);
      setVisibleCount(PAGE_SIZE);
    } catch (searchError) {
      setResults([]);
      setTotal(0);
      setError(searchError instanceof Error ? searchError.message : 'Unable to solve this anagram.');
    } finally {
      setLoading(false);
    }
  };

  const visibleResults = results.slice(0, visibleCount);

  return (
    <div id="solver" className="relative mx-auto mt-12 max-w-[1320px] scroll-mt-24 sm:mt-14">
      <nav aria-label="Choose a word tool" className="flex gap-7 overflow-x-auto border-b border-[#d9e5ec] sm:gap-12">
        {modes.map((mode) => (
          <Link
            key={mode.label}
            href={mode.href}
            aria-current={mode.active ? 'page' : undefined}
            className={`relative shrink-0 pb-4 text-sm font-semibold transition-colors sm:text-base ${
              mode.active ? 'text-[#00aebf]' : 'text-[#233a58] hover:text-[#00aebf]'
            }`}
          >
            {mode.label}
            {mode.active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#09c4d8]" aria-hidden="true" />}
          </Link>
        ))}
      </nav>

      <form
        className="mt-4 border-x border-b border-[#d9e5ec] bg-white shadow-[0_18px_45px_rgba(6,26,56,0.08)]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSolve();
        }}
      >
        <div className="grid gap-4 bg-[#061a38] p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-end md:gap-5 lg:p-6">
          <label htmlFor="letters" className="block min-w-0">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Enter a word or phrase
            </span>
            <input
              type="text"
              id="letters"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="LISTEN"
              aria-describedby="anagram-rule"
              className="block h-[60px] w-full max-w-[700px] border border-slate-400 bg-transparent px-5 font-mono text-2xl font-semibold uppercase tracking-[0.24em] text-white placeholder:text-slate-400 sm:px-7 sm:text-3xl sm:tracking-[0.32em]"
              maxLength={40}
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="group flex h-[60px] w-full items-center justify-center gap-4 bg-[#09c4d8] px-5 text-lg font-extrabold text-[#061a38] transition-colors hover:bg-[#41d7e5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Solving…' : 'Solve'}
            {!loading && <ArrowRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
          </button>
        </div>

        <div className="grid border-b border-[#d9e5ec] bg-white md:grid-cols-[1fr_1fr_1.35fr]">
          <label className="flex min-h-24 items-center gap-4 border-b border-[#d9e5ec] px-5 py-4 md:border-b-0 md:border-r lg:px-7">
            <GlobeAltIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[#687b91]">Dictionary</span>
              <select
                value={dictionaryType}
                onChange={(event) => setDictionaryType(event.target.value as DictionaryType)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-[#061a38] sm:text-base"
              >
                <option value="common">Common English (faster)</option>
                <option value="full">Extended English</option>
              </select>
            </span>
          </label>

          <label className="flex min-h-24 items-center gap-4 border-b border-[#d9e5ec] px-5 py-4 md:border-b-0 md:border-r lg:px-7">
            <QueueListIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[#687b91]">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as WordSort)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-[#061a38] sm:text-base"
              >
                <option value="length">Length</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="score">Tile score</option>
              </select>
            </span>
          </label>

          <p id="anagram-rule" className="flex min-h-24 items-center gap-3 px-5 py-4 text-sm leading-6 text-[#52657d] lg:px-7">
            <CheckCircleIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            Exact anagrams use every letter once. Spaces, punctuation, and capitalization do not count.
          </p>
        </div>

        <div className="px-5 py-4 sm:px-7" aria-live="polite">
          {error && <p className="border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>}

          {!error && searched && !loading && total === 0 && (
            <p className="border border-[#d9e5ec] bg-[#f7fafb] p-4 text-[#334a66]">
              No exact anagrams found. Try the extended dictionary or use Word Finder for shorter words.
            </p>
          )}

          {!searched && (
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <p className="shrink-0 text-sm font-medium text-[#52657d]">Top anagrams (examples)</p>
              <div className="flex flex-1 flex-wrap items-center justify-around gap-4 sm:gap-7">
                {exampleWords.map((word, index) => (
                  <span key={word} className="contents">
                    <span className="font-mono font-bold tracking-[0.22em] text-[#061a38]">{word}</span>
                    {index < exampleWords.length - 1 && <MinusSmallIcon className="h-4 w-4 text-[#09c4d8]" aria-hidden="true" />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {loading && <p className="py-3 text-sm font-medium text-[#52657d]">Searching the local dictionary…</p>}

          {!error && !loading && total > 0 && (
            <div>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-[#061a38]">
                  {total} exact anagram{total === 1 ? '' : 's'}
                </h2>
                {total > results.length && <p className="text-sm text-[#687b91]">Showing the first {results.length}</p>}
              </div>
              <div className="grid max-h-96 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-5">
                {visibleResults.map((word) => (
                  <div key={word} className="border border-[#b9d9e3] bg-white px-3 py-3 text-center">
                    <span className="font-mono font-bold tracking-[0.12em] text-[#061a38]">{word.toUpperCase()}</span>
                    <span className="ml-2 text-xs text-[#687b91]">{calculateScore(word)} pts</span>
                  </div>
                ))}
              </div>
              {visibleCount < results.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="mt-4 w-full border border-[#8cced8] px-4 py-3 font-bold text-[#007f8d] hover:bg-cyan-50"
                >
                  Show more
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
