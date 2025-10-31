'use client';

import { useState } from 'react';
import { findAnagrams, findWithWildcards, sortResults, calculateScore } from '@/lib/anagramSolver';
import { getDictionaryAsync } from '@/lib/dictionary';

export default function WordFinderTool() {
  const [letters, setLetters] = useState('');
  const [pattern, setPattern] = useState('');
  const [minLength, setMinLength] = useState(3);
  const [maxLength, setMaxLength] = useState(15);
  const [sortBy, setSortBy] = useState<'length' | 'alphabetical' | 'score'>('length');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dictionaryType, setDictionaryType] = useState<'common' | 'full'>('full');

  const handleSolve = async () => {
    if (!letters.trim() && !pattern.trim()) return;

    setLoading(true);
    // Load selected dictionary asynchronously ('full' uses words_alpha)
    const dictionary = await getDictionaryAsync(dictionaryType);
    let words: string[] = [];

    if (pattern.trim()) {
      // Use pattern matching with wildcards
      words = findWithWildcards(pattern.toLowerCase(), dictionary);
    } else {
      // Use regular anagram finding
      words = findAnagrams(letters.toLowerCase(), dictionary);
    }

    // Filter by length
    words = words.filter((word) => word.length >= minLength && word.length <= maxLength);

    // Sort results
    const sorted = sortResults(words, sortBy);
    setResults(sorted);
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="space-y-6">
          {/* Input method selection */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Choose your search method:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="letters"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Find words from letters
                </label>
                <input
                  type="text"
                  id="letters"
                  value={letters}
                  onChange={(e) => {
                    setLetters(e.target.value);
                    if (e.target.value) setPattern('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
                  placeholder="e.g., EXAMPLE"
                  className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-lg"
                  maxLength={20}
                />
              </div>

              <div>
                <label
                  htmlFor="pattern"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Find words by pattern (use ? for any letter)
                </label>
                <input
                  type="text"
                  id="pattern"
                  value={pattern}
                  onChange={(e) => {
                    setPattern(e.target.value);
                    if (e.target.value) setLetters('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
                  placeholder="e.g., C?T or ?ING"
                  className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-lg"
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          {/* Advanced options */}
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
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="full">Full (comprehensive)</option>
                <option value="common">Common (faster)</option>
              </select>
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
              </select>
            </div>

            <div>
              <label
                htmlFor="maxLength"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Maximum length
              </label>
              <select
                id="maxLength"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={6}>6 letters</option>
                <option value={7}>7 letters</option>
                <option value={8}>8 letters</option>
                <option value={10}>10 letters</option>
                <option value={15}>15 letters</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sortBy"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="length">Length</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="score">Scrabble Score</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={(!letters.trim() && !pattern.trim()) || loading}
            className="w-full rounded-md bg-purple-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Words...' : 'Find Words'}
          </button>

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Found {results.length} word{results.length !== 1 ? 's' : ''}:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {results.map((word, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-purple-50 px-3 py-2 text-center border border-purple-200 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <span className="font-medium text-purple-900 dark:text-white">
                      {word.toUpperCase()}
                    </span>
                    <span className="ml-2 text-xs text-purple-700 dark:text-gray-400">
                      ({calculateScore(word)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage examples */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Pattern Examples:
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">C?T</code> - finds CAT, COT, CUT, etc.</div>
              <div><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">?ING</code> - finds RING, SING, KING, etc.</div>
              <div><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">ST??</code> - finds STAR, STOP, STEP, etc.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
