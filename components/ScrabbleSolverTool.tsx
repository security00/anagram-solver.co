'use client';

import { useState } from 'react';
import { findAnagrams, sortResults, calculateScore } from '@/lib/anagramSolver';
import { getDictionary } from '@/lib/dictionary';

export default function ScrabbleSolverTool() {
  const [tiles, setTiles] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [minLength, setMinLength] = useState(3);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSolve = () => {
    // Allow searching by prefix/suffix even if no tiles are provided
    if (!tiles.trim() && !prefix && !suffix) return;

    setLoading(true);
    setTimeout(() => {
      const dictionary = getDictionary('scrabble');
      // If tiles are provided, use anagram search; otherwise start from full dictionary
      let anagrams = tiles.trim()
        ? findAnagrams(tiles.toLowerCase(), dictionary)
        : Array.from(dictionary);

      // Filter by prefix and suffix if provided
      if (prefix) {
        anagrams = anagrams.filter((word) =>
          word.toLowerCase().startsWith(prefix.toLowerCase())
        );
      }

      if (suffix) {
        anagrams = anagrams.filter((word) =>
          word.toLowerCase().endsWith(suffix.toLowerCase())
        );
      }

      // Filter by minimum length
      anagrams = anagrams.filter((word) => word.length >= minLength);

      // Sort by Scrabble score (highest first)
      const sorted = sortResults(anagrams, 'score');
      setResults(sorted);
      setLoading(false);
    }, 100);
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            disabled={(tiles.trim().length === 0 && !prefix && !suffix) || loading}
            className="w-full rounded-md bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Words...' : 'Find Scrabble Words'}
          </button>

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Found {results.length} Scrabble word{results.length !== 1 ? 's' : ''} (sorted by score):
              </h3>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
