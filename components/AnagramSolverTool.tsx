'use client';

import { useState } from 'react';
import { findAnagrams, sortResults, calculateScore } from '@/lib/anagramSolver';
import { getDictionaryAsync } from '@/lib/dictionary';

export default function AnagramSolverTool() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'length' | 'alphabetical' | 'score'>('length');
  const [dictionaryType, setDictionaryType] = useState<'common' | 'full'>('full');

  const handleSolve = async () => {
    if (!input.trim()) return;

    setLoading(true);
    // Load selected dictionary asynchronously ('full' uses words_alpha)
    const dictionary = await getDictionaryAsync(dictionaryType);
    const anagrams = findAnagrams(input.toLowerCase(), dictionary);
    const sorted = sortResults(anagrams, sortBy);
    setResults(sorted);
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="letters"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter your letters
            </label>
            <input
              type="text"
              id="letters"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
              placeholder="e.g., LISTEN"
              className="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-lg"
              maxLength={20}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dictionary:
            </label>
            <select
              value={dictionaryType}
              onChange={(e) => setDictionaryType(e.target.value as 'common' | 'full')}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="full">Full (comprehensive)</option>
              <option value="common">Common (faster)</option>
            </select>

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="length">Length</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="score">Scrabble Score</option>
            </select>
          </div>

          <button
            onClick={handleSolve}
            disabled={!input.trim() || loading}
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Solving...' : 'Solve Anagram'}
          </button>

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Found {results.length} anagram{results.length !== 1 ? 's' : ''}:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {results.map((word, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-gray-50 px-3 py-2 text-center dark:bg-gray-700"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {word.toUpperCase()}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      ({calculateScore(word)})
                    </span>
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
