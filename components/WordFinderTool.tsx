'use client';

import { useState } from 'react';
import { calculateScore } from '@/lib/anagramSolver';
import { runWordSolverQuery } from '@/lib/solverClient';
import type { DictionaryType } from '@/lib/dictionaryData';
import type { WordSort } from '@/lib/solverEngine';

const RESULT_LIMIT = 500;
const PAGE_SIZE = 100;

export default function WordFinderTool() {
  const [letters, setLetters] = useState('');
  const [pattern, setPattern] = useState('');
  const [minLength, setMinLength] = useState(3);
  const [maxLength, setMaxLength] = useState(15);
  const [sortBy, setSortBy] = useState<WordSort>('length');
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    if (!letters.trim() && !pattern.trim()) return;

    setLoading(true);
    setSearched(true);
    setError('');
    try {
      const outcome = await runWordSolverQuery({
        dictionaryType,
        kind: 'words',
        request: {
          input: pattern.trim() || letters,
          limit: RESULT_LIMIT,
          maxLength,
          minLength,
          operation: pattern.trim() ? 'pattern' : 'words',
          sortBy,
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

  const visibleResults = results.slice(0, visibleCount);

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8">
        <div className="space-y-6">
          <div className="grid gap-4 border-b border-gray-200 pb-6 dark:border-gray-700 md:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Make words from letters
              <input
                type="text"
                value={letters}
                onChange={(event) => {
                  setLetters(event.target.value);
                  if (event.target.value) setPattern('');
                }}
                onKeyDown={(event) => event.key === 'Enter' && handleSolve()}
                placeholder="e.g., EXAMPLE"
                className="mt-2 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-lg"
                maxLength={20}
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Match a fixed-length pattern
              <input
                type="text"
                value={pattern}
                onChange={(event) => {
                  setPattern(event.target.value);
                  if (event.target.value) setLetters('');
                }}
                onKeyDown={(event) => event.key === 'Enter' && handleSolve()}
                placeholder="e.g., C?T or ?ING"
                className="mt-2 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-lg"
                maxLength={20}
              />
              <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">Use ? for exactly one unknown letter.</span>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Dictionary" value={dictionaryType} onChange={(value) => setDictionaryType(value as DictionaryType)}>
              <option value="common">Common English</option>
              <option value="full">Extended English</option>
            </SelectField>
            <SelectField label="Minimum length" value={minLength} onChange={(value) => setMinLength(Number(value))}>
              {[2, 3, 4, 5, 6].map((length) => <option key={length} value={length}>{length} letters</option>)}
            </SelectField>
            <SelectField label="Maximum length" value={maxLength} onChange={(value) => setMaxLength(Number(value))}>
              {[6, 7, 8, 10, 15, 20].map((length) => <option key={length} value={length}>{length} letters</option>)}
            </SelectField>
            <SelectField label="Sort by" value={sortBy} onChange={(value) => setSortBy(value as WordSort)}>
              <option value="length">Length</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="score">Tile score</option>
            </SelectField>
          </div>

          <button
            onClick={handleSolve}
            disabled={(!letters.trim() && !pattern.trim()) || loading}
            className="w-full rounded-md bg-purple-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Searching in the background…' : 'Find Words'}
          </button>

          <div aria-live="polite">
            {error && <p className="rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">{error}</p>}
            {!error && searched && !loading && total === 0 && (
              <p className="rounded-md bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-200">No matching words found.</p>
            )}
            {total > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Found {total} word{total === 1 ? '' : 's'}{total > results.length ? ` — showing the first ${results.length}` : ''}
                </h3>
                <div className="grid max-h-96 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
                  {visibleResults.map((word) => (
                    <div key={word} className="rounded-md border border-purple-200 bg-purple-50 px-3 py-2 text-center dark:border-gray-600 dark:bg-gray-700">
                      <span className="font-medium text-purple-900 dark:text-white">{word.toUpperCase()}</span>
                      <span className="ml-2 text-xs text-purple-700 dark:text-gray-400">({calculateScore(word)})</span>
                    </div>
                  ))}
                </div>
                {visibleCount < results.length && (
                  <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="mt-4 w-full rounded-md border border-purple-200 px-4 py-2 font-medium text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-200 dark:hover:bg-gray-700">
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            Pattern examples: <code>C?T</code> finds CAT/COT/CUT; <code>?ING</code> finds RING/SING/KING.
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  children,
  label,
  onChange,
  value,
}: {
  children: React.ReactNode;
  label: string;
  onChange: (value: string) => void;
  value: string | number;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        {children}
      </select>
    </label>
  );
}
