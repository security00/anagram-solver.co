'use client';

import { useState } from 'react';
import { findAnagrams, sortResults, calculateScore } from '@/lib/anagramSolver';
import { getDictionaryAsync } from '@/lib/dictionary';

export default function ScrabbleSolverTool() {
  const [tiles, setTiles] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [minLength, setMinLength] = useState(3);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dictionaryType, setDictionaryType] = useState<'common' | 'full'>('full');
  // Track whether user has attempted a search so we can show an empty state
  const [searched, setSearched] = useState(false);

  const handleSolve = async () => {
    // Normalize inputs for consistent behavior
    const tilesTrim = tiles.trim();
    const prefixTrim = prefix.trim();
    const suffixTrim = suffix.trim();

    // Allow searching by prefix/suffix even if no tiles are provided
    if (!tilesTrim && !prefixTrim && !suffixTrim) return;

    setLoading(true);
    setSearched(true);
    // Load selected dictionary asynchronously ('full' uses words_alpha)
    const dictionary = await getDictionaryAsync(dictionaryType);
    // If tiles are provided, use anagram search; otherwise start from full dictionary
    let anagrams = tilesTrim
      ? findAnagrams(tilesTrim.toLowerCase(), dictionary)
      : Array.from(dictionary);

      // Filter by prefix and suffix if provided
      if (prefixTrim) {
        anagrams = anagrams.filter((word) =>
          word.toLowerCase().startsWith(prefixTrim.toLowerCase())
        );
      }

      if (suffixTrim) {
        anagrams = anagrams.filter((word) =>
          word.toLowerCase().endsWith(suffixTrim.toLowerCase())
        );
      }

    // Filter by minimum length
    anagrams = anagrams.filter((word) => word.length >= minLength);

    // Sort by Scrabble score (highest first)
    const sorted = sortResults(anagrams, 'score');
    setResults(sorted);
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="space-y-6">
          {/* Main input */}
          <div>
            <label
              htmlFor="tiles"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter your Scrabble tiles
            </label>
            <input
              type="text"
              id="tiles"
              value={tiles}
              onChange={(e) => setTiles(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
              placeholder="e.g., ABCDEFG"
              className="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-lg"
              maxLength={15}
            />
          </div>

          {/* Advanced filters */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label
                htmlFor="dictionaryType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Dictionary
              </label>
              <select
                id="dictionaryType"
                value={dictionaryType}
                onChange={(e) => setDictionaryType(e.target.value as 'common' | 'full')}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="full">Full (comprehensive)</option>
                <option value="common">Common (faster)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="prefix"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Starts with (optional)
              </label>
              <input
                type="text"
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                placeholder="e.g., UN"
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                maxLength={5}
              />
            </div>

            <div>
              <label
                htmlFor="suffix"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ends with (optional)
              </label>
              <input
                type="text"
                id="suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                placeholder="e.g., ING"
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                maxLength={5}
              />
            </div>

            <div>
              <label
                htmlFor="minLength"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Minimum length
              </label>
              <select
                id="minLength"
                value={minLength}
                onChange={(e) => setMinLength(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={2}>2 letters</option>
                <option value={3}>3 letters</option>
                <option value={4}>4 letters</option>
                <option value={5}>5 letters</option>
                <option value={6}>6 letters</option>
                <option value={7}>7 letters</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSolve}
            // Disable only when all inputs are empty or while loading
            disabled={(tiles.trim().length === 0 && prefix.trim().length === 0 && suffix.trim().length === 0) || loading}
            className="w-full rounded-md bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Words...' : 'Find Scrabble Words'}
          </button>

          {/* Results / Empty state */}
          {searched && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Found {results.length} Scrabble word{results.length !== 1 ? 's' : ''} (sorted by score):
              </h3>
              {results.length === 0 ? (
                <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                  No words found. Try different tiles, adjust prefix/suffix, or lower the minimum length.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {results.map((word, index) => (
                    <div
                      key={index}
                      className="rounded-md bg-green-50 px-4 py-3 text-center border border-green-200 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <span className="font-bold text-green-900 dark:text-white text-lg">
                        {word.toUpperCase()}
                      </span>
                      <div className="text-sm text-green-700 dark:text-gray-300 mt-1">
                        {word.length} letters • {calculateScore(word)} points
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
