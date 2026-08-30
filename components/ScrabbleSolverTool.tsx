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
    <div className="tool-shell">
      <div className="tool-primary-band">
        <label htmlFor="tiles" className="tool-label tool-label-on-dark">
          Rack or available letters
          <input
            type="text"
            id="tiles"
            value={tiles}
            onChange={(event) => setTiles(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSolve()}
            placeholder="e.g., ABCDEFG or C?T"
            className="tool-input tool-input-on-dark"
            maxLength={15}
          />
          <span className="tool-help tool-help-on-dark">
            A standard rack has seven tiles. Use ? or * for a blank tile; blanks score zero points.
          </span>
        </label>
      </div>

      <div className="tool-body">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="tool-label">
              Dictionary
              <select value={dictionaryType} onChange={(event) => setDictionaryType(event.target.value as DictionaryType)} className="tool-select">
                <option value="common">Common English</option>
                <option value="full">Extended English</option>
              </select>
            </label>
            <label className="tool-label">
              Fixed board prefix
              <input value={prefix} onChange={(event) => setPrefix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="tool-input" maxLength={8} />
            </label>
            <label className="tool-label">
              Fixed board suffix
              <input value={suffix} onChange={(event) => setSuffix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="tool-input" maxLength={8} />
            </label>
            <label className="tool-label">
              Minimum length
              <select value={minLength} onChange={(event) => setMinLength(Number(event.target.value))} className="tool-select">
                {[2, 3, 4, 5, 6, 7].map((length) => <option key={length} value={length}>{length} letters</option>)}
              </select>
            </label>
          </div>

          <button
            onClick={handleSolve}
            disabled={!tiles.trim() || loading}
            className="tool-primary-button"
          >
            {loading ? 'Searching in the background…' : 'Find Rack Words'}
          </button>

          <p className="tool-status tool-status-warning">
            This uses an open English spelling list and Scrabble-style letter values. It is not an official tournament word authority, and scores exclude board multipliers.
          </p>

          <div aria-live="polite">
            {error && <p className="tool-status tool-status-error">{error}</p>}
            {!error && searched && !loading && total === 0 && (
              <p className="tool-status">No matching rack words found.</p>
            )}
            {total > 0 && (
              <div className="mt-6">
                <h3 className="tool-results-heading">
                  Found {total} word{total === 1 ? '' : 's'}{total > results.length ? ` — showing the top ${results.length}` : ''}
                </h3>
                <div className="grid max-h-96 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                  {results.slice(0, visibleCount).map((word) => (
                    <div key={word} className="tool-result-card text-center">
                      <span className="tool-result-word text-lg">{word.toUpperCase()}</span>
                      <div className="tool-result-meta mt-1">{word.length} letters · {scoreWord(word)} rack points</div>
                    </div>
                  ))}
                </div>
                {visibleCount < results.length && (
                  <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="tool-secondary-button mt-4 w-full">
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
