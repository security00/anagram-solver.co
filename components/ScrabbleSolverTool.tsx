'use client';

import { useState } from 'react';
import { calculateRackScore, calculateScore } from '@/lib/anagramSolver';
import { runWordSolverQuery } from '@/lib/solverClient';
import type { DictionaryType } from '@/lib/dictionaryData';
import { getRackPlacement } from '@/lib/solverEngine';

const RESULT_LIMIT = 500;
const PAGE_SIZE = 100;

export default function ScrabbleSolverTool() {
  const [tiles, setTiles] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [minLength, setMinLength] = useState(2);
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    const rack = tiles.trim();
    if (!rack) return;

    setLoading(true);
    setSearched(true);
    setError('');
    try {
      const outcome = await runWordSolverQuery({
        dictionaryType,
        kind: 'words',
        request: {
          input: rack,
          limit: RESULT_LIMIT,
          minLength,
          operation: 'scrabble',
          prefix,
          sortBy: 'score',
          suffix,
        },
      });
      setResults(outcome.words);
      setTotal(outcome.total);
      setVisibleCount(PAGE_SIZE);
    } catch (searchError) {
      setResults([]);
      setTotal(0);
      setError(searchError instanceof Error ? searchError.message : 'Unable to search the dictionary.');
    } finally {
      setLoading(false);
    }
  };

  const scoreWord = (word: string) => tiles.trim()
    ? calculateRackScore(getRackPlacement(word, prefix, suffix) ?? word, tiles)
    : calculateScore(word);

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="tiles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rack or available letters
            </label>
            <input
              type="text"
              id="tiles"
              value={tiles}
              onChange={(event) => setTiles(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSolve()}
              placeholder="e.g., ABCDEFG or C?T"
              className="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-lg"
              maxLength={15}
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              A standard rack has seven tiles. Use ? or * for a blank tile; blanks score zero points.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dictionary
              <select value={dictionaryType} onChange={(event) => setDictionaryType(event.target.value as DictionaryType)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option value="common">Common English</option>
                <option value="full">Extended English</option>
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fixed board prefix
              <input value={prefix} onChange={(event) => setPrefix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" maxLength={8} />
            </label>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fixed board suffix
              <input value={suffix} onChange={(event) => setSuffix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" maxLength={8} />
            </label>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum length
              <select value={minLength} onChange={(event) => setMinLength(Number(event.target.value))} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                {[2, 3, 4, 5, 6, 7].map((length) => <option key={length} value={length}>{length} letters</option>)}
              </select>
            </label>
          </div>

          <button
            onClick={handleSolve}
            disabled={!tiles.trim() || loading}
            className="w-full rounded-md bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Searching in the background…' : 'Find Rack Words'}
          </button>

          <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
            This uses an open English spelling list and Scrabble-style letter values. It is not an official tournament word authority, and scores exclude board multipliers.
          </p>

          <div aria-live="polite">
            {error && <p className="rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">{error}</p>}
            {!error && searched && !loading && total === 0 && (
              <p className="rounded-md bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-200">No matching rack words found.</p>
            )}
            {total > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Found {total} word{total === 1 ? '' : 's'}{total > results.length ? ` — showing the top ${results.length}` : ''}
                </h3>
                <div className="grid max-h-96 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                  {results.slice(0, visibleCount).map((word) => (
                    <div key={word} className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-center dark:border-gray-600 dark:bg-gray-700">
                      <span className="text-lg font-bold text-green-900 dark:text-white">{word.toUpperCase()}</span>
                      <div className="mt-1 text-sm text-green-700 dark:text-gray-300">{word.length} letters · {scoreWord(word)} rack points</div>
                    </div>
                  ))}
                </div>
                {visibleCount < results.length && (
                  <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="mt-4 w-full rounded-md border border-green-200 px-4 py-2 font-medium text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-200 dark:hover:bg-gray-700">
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
