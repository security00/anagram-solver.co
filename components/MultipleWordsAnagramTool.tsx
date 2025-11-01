'use client';

import { useState } from 'react';
import { findMultiWordAnagrams, calculateScore } from '@/lib/anagramSolver';
import { getDictionaryAsync } from '@/lib/dictionary';

export default function MultipleWordsAnagramTool() {
  const [input, setInput] = useState('');
  const [maxWords, setMaxWords] = useState(2);
  const [results, setResults] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  // Default to 'common' for faster multi-word search
  const [dictionaryType, setDictionaryType] = useState<'common' | 'full'>('common');

  const handleSolve = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const dictionary = await getDictionaryAsync(dictionaryType);
    // Use optimized multi-word solver with a reasonable results cap
    const multiWordAnagrams = findMultiWordAnagrams(
      input.toLowerCase(),
      dictionary,
      maxWords,
      { maxResults: 200, minWordLength: 2 }
    );

    // Sort by total score (sum of all words in the combination)
    const sortedResults = multiWordAnagrams.sort((a, b) => {
      const scoreA = a.reduce((sum, word) => sum + calculateScore(word), 0);
      const scoreB = b.reduce((sum, word) => sum + calculateScore(word), 0);
      return scoreB - scoreA;
    });

    setResults(sortedResults);
    setLoading(false);
  };

  const getTotalScore = (words: string[]) => {
    return words.reduce((sum, word) => sum + calculateScore(word), 0);
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="space-y-6">
          {/* Main input */}
          <div>
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter letters or phrase to find multi-word anagrams
            </label>
            <input
              type="text"
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
              placeholder="e.g., SCHOOLMASTER or LISTEN SILENT"
              className="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-lg"
              maxLength={30}
            />
          </div>

          {/* Options */}
          <div className="flex items-center space-x-6">
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
                className="mt-1 block rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="full">Full (comprehensive)</option>
                <option value="common">Common (faster)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="maxWords"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Maximum number of words
              </label>
              <select
                id="maxWords"
                value={maxWords}
                onChange={(e) => setMaxWords(Number(e.target.value))}
                className="mt-1 block rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={2}>2 words</option>
                <option value={3}>3 words</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={!input.trim() || loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Multi-Word Anagrams...' : 'Find Multi-Word Anagrams'}
          </button>

          {loading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>This may take a moment for longer phrases...</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Found {results.length} multi-word anagram{results.length !== 1 ? 's' : ''}:
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((wordCombination, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-indigo-50 px-4 py-3 border border-indigo-200 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-indigo-900 dark:text-white text-lg">
                        {wordCombination.map(word => word.toUpperCase()).join(' + ')}
                      </span>
                      <div className="text-sm text-indigo-700 dark:text-gray-300">
                        Total: {getTotalScore(wordCombination)} points
                      </div>
                    </div>
                    <div className="text-sm text-indigo-600 dark:text-gray-400 mt-1">
                      {wordCombination.map((word, wordIndex) => (
                        <span key={wordIndex}>
                          {word} ({calculateScore(word)} pts)
                          {wordIndex < wordCombination.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && !loading && input.trim() && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>No multi-word anagrams found. Try a different phrase or longer input.</p>
            </div>
          )}

          {/* Usage tips */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Tips for Better Results:
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div>• Use longer phrases (8+ letters) for more interesting combinations</div>
              <div>• Try famous phrases, names, or common expressions</div>
              <div>• Examples: "SCHOOLMASTER" → "THE CLASSROOM"</div>
              <div>• "LISTEN SILENT" → "ENLIST" + "SILENT"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
