'use client';

import { useState } from 'react';
import { calculateScore } from '@/lib/anagramSolver';
import { runMultiWordSolverQuery } from '@/lib/solverClient';
import type { DictionaryType } from '@/lib/dictionaryData';


type ExamplePhrase = {
  label: string;
  value: string;
};

type MultipleWordsAnagramToolProps = {
  defaultWordCount?: 2 | 3;
  lockWordCount?: boolean;
  examples?: ExamplePhrase[];
};

const DEFAULT_EXAMPLES: ExamplePhrase[] = [
  { label: 'SCHOOLMASTER', value: 'schoolmaster' },
  { label: 'THE EYES', value: 'the eyes' },
  { label: 'ASTRONOMER', value: 'astronomer' },
];

export default function MultipleWordsAnagramTool({
  defaultWordCount = 2,
  lockWordCount = false,
  examples = DEFAULT_EXAMPLES,
}: MultipleWordsAnagramToolProps) {
  const [input, setInput] = useState('');
  const [wordCount, setWordCount] = useState<2 | 3>(defaultWordCount);
  const [minWordLength, setMinWordLength] = useState(2);
  const [containsWord, setContainsWord] = useState('');
  const [resultLimit, setResultLimit] = useState(250);
  const [results, setResults] = useState<string[][]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [error, setError] = useState('');
  const [truncationMessage, setTruncationMessage] = useState('');

  const handleExampleClick = (value: string) => {
    setInput(value);
    setResults([]);
    setHasSearched(false);
    setError('');
    setTruncationMessage('');
  };

  const handleSolve = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setError('');
    setTruncationMessage('');
    try {
      const outcome = await runMultiWordSolverQuery({
        dictionaryType,
        input,
        kind: 'multi',
        options: {
          maxResults: resultLimit,
          maxSearchStates: 50_000,
          minWordLength,
          requiredWord: containsWord,
          timeLimitMs: 1_500,
        },
        wordCount,
      });

      setResults(outcome.results);
      if (outcome.truncated) {
        setTruncationMessage(
          outcome.stopReason === 'result-limit'
            ? `Showing the first ${outcome.results.length} combinations.`
            : 'Search stopped at the performance limit. Add a required word, raise the minimum length, or use the common dictionary to narrow it.'
        );
      }
    } catch (searchError) {
      setResults([]);
      setError(searchError instanceof Error ? searchError.message : 'Unable to search phrase anagrams.');
    } finally {
      setLoading(false);
    }
  };

  const getTotalScore = (words: string[]) => {
    return words.reduce((sum, word) => sum + calculateScore(word), 0);
  };

  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter letters or a phrase
            </label>
            <input
              type="text"
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
              placeholder="e.g., SCHOOLMASTER, THE EYES, or ASTRONOMER"
              className="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-lg"
              maxLength={30}
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Spaces and punctuation are ignored. Results use every letter exactly once.
            </p>
          </div>

          {examples.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Try:
              </span>
              {examples.map((example) => (
                <button
                  key={example.value}
                  type="button"
                  onClick={() => handleExampleClick(example.value)}
                  className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:border-gray-600 dark:bg-gray-700 dark:text-indigo-200 dark:hover:bg-gray-600"
                >
                  {example.label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
                onChange={(e) => setDictionaryType(e.target.value as DictionaryType)}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="common">Common English (faster)</option>
                <option value="full">Extended English</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="wordCount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Word count
              </label>
              {lockWordCount ? (
                <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  Exactly {wordCount} words
                </div>
              ) : (
                <select
                  id="wordCount"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value) as 2 | 3)}
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value={2}>Exactly 2 words</option>
                  <option value={3}>Exactly 3 words</option>
                </select>
              )}
            </div>

            <div>
              <label
                htmlFor="minWordLength"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Min word length
              </label>
              <select
                id="minWordLength"
                value={minWordLength}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value={2}>2 letters</option>
                <option value={3}>3 letters</option>
                <option value={4}>4 letters</option>
                <option value={5}>5 letters</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="containsWord"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Must include
              </label>
              <input
                type="text"
                id="containsWord"
                value={containsWord}
                onChange={(e) => setContainsWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                placeholder="optional"
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                maxLength={15}
              />
            </div>

            <div>
              <label
                htmlFor="resultLimit"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Results
              </label>
              <select
                id="resultLimit"
                value={resultLimit}
                onChange={(e) => setResultLimit(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value={100}>100</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={!input.trim() || loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Finding Multi-Word Anagrams...' : 'Find Multi-Word Anagrams'}
          </button>

          {loading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>This may take a moment for longer phrases or the full dictionary.</p>
            </div>
          )}

          {error && (
            <div aria-live="polite" className="rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </div>
          )}

          {truncationMessage && !loading && (
            <div aria-live="polite" className="rounded-md bg-amber-50 p-4 text-amber-900 dark:bg-amber-950 dark:text-amber-100">
              {truncationMessage}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Found {results.length} multi-word anagram{results.length !== 1 ? 's' : ''}:
              </h3>
              <div className="max-h-96 space-y-3 overflow-y-auto">
                {results.map((wordCombination, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-lg font-medium text-indigo-900 dark:text-white">
                        {wordCombination.map((word) => word.toUpperCase()).join(' + ')}
                      </span>
                      <div className="shrink-0 text-sm text-indigo-700 dark:text-gray-300">
                        Total: {getTotalScore(wordCombination)} points
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-indigo-600 dark:text-gray-400">
                      {wordCombination.map((word, wordIndex) => (
                        <span key={wordIndex}>
                          {word} ({calculateScore(word)} pts)
                          {wordIndex < wordCombination.length - 1 ? ' - ' : ''}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(wordCombination.join(' '))}
                      className="mt-3 rounded-md bg-white px-3 py-1 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-100 dark:bg-gray-800 dark:text-indigo-200 dark:hover:bg-gray-600"
                    >
                      Copy phrase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && hasSearched && !loading && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p>No multi-word anagrams found. Try a longer phrase, a lower minimum length, or the full dictionary.</p>
            </div>
          )}

          <div className="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tips for better results
            </h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div>- Use longer phrases with 8 or more letters for better combinations.</div>
              <div>- Try names, famous phrases, or puzzle clues.</div>
              <div>- Example: SCHOOLMASTER can become THE + CLASSROOM.</div>
              <div>- Use Must include when you already know one word in the answer.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
