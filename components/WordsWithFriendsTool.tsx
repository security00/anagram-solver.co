'use client';

import { useState } from 'react';
import { calculateWwfStyleRackScore } from '@/lib/anagramSolver';
import { dictionaryStatusLabel } from '@/lib/dictionaryProgress';
import { runWordSolverQuery } from '@/lib/solverClient';
import { getRackPlacement } from '@/lib/solverEngine';
import type { DictionaryType } from '@/lib/dictionaryData';
import type { WordSort } from '@/lib/solverEngine';

const RESULT_LIMIT = 500;
const PAGE_SIZE = 100;

export default function WordsWithFriendsTool() {
  const [tiles, setTiles] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [contains, setContains] = useState('');
  const [minLength, setMinLength] = useState(2);
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [sortBy, setSortBy] = useState<WordSort>('wwf');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'searching'>('searching');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async (dict = dictionaryType) => {
    const rack = tiles.trim();
    if (!rack) return;

    setLoading(true);
    setPhase(dict === 'full' ? 'loading' : 'searching');
    setLoadedBytes(0);
    setSearched(true);
    setError('');
    try {
      const outcome = await runWordSolverQuery(
        {
          dictionaryType: dict,
          kind: 'words',
          request: {
            input: rack,
            limit: RESULT_LIMIT,
            minLength,
            operation: 'scrabble',
            prefix,
            sortBy,
            suffix,
          },
        },
        (progress) => {
          setPhase(progress.phase);
          setLoadedBytes(progress.loadedBytes);
        },
      );
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

  const needle = contains.toLowerCase().replace(/[^a-z]/g, '');
  const filtered = needle ? results.filter((word) => word.includes(needle)) : results;
  const scoreWord = (word: string) =>
    calculateWwfStyleRackScore(getRackPlacement(word, prefix, suffix) ?? word, tiles);
  const statusLabel = dictionaryStatusLabel(phase, dictionaryType, loadedBytes);

  return (
    <div className="tool-shell">
      <div className="tool-primary-band">
        <label htmlFor="wwf-tiles" className="tool-label tool-label-on-dark">
          Rack or available letters
          <div className="relative mt-1">
            <input
              type="text"
              id="wwf-tiles"
              value={tiles}
              onChange={(event) => setTiles(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSolve()}
              placeholder="e.g., ABCDEFG or C?T"
              className="tool-input tool-input-on-dark"
              maxLength={15}
            />
            {tiles.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTiles('');
                  setResults([]);
                  setTotal(0);
                  setSearched(false);
                }}
                className="tool-clear-button"
                aria-label="Clear tiles"
              >
                ✕
              </button>
            )}
          </div>
          <span className="tool-help tool-help-on-dark">
            Use ? or * for each blank tile. Blanks are wild and score zero face points.
          </span>
        </label>
      </div>

      <div className="tool-body">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="tool-label">
              Dictionary
              <select value={dictionaryType} onChange={(event) => setDictionaryType(event.target.value as DictionaryType)} className="tool-select">
                <option value="common">Common English (~39k)</option>
                <option value="full">Extended English (~142k)</option>
              </select>
            </label>
            <label className="tool-label">
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as WordSort)} className="tool-select">
                <option value="wwf">WWF-style points</option>
                <option value="length">Length</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </label>
            <label className="tool-label">
              Minimum length
              <select value={minLength} onChange={(event) => setMinLength(Number(event.target.value))} className="tool-select">
                {[2, 3, 4, 5, 6, 7].map((length) => (
                  <option key={length} value={length}>{length} letters</option>
                ))}
              </select>
            </label>
            <label className="tool-label">
              Starts with (prefix)
              <input value={prefix} onChange={(event) => setPrefix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="tool-input" maxLength={8} />
            </label>
            <label className="tool-label">
              Ends with (suffix)
              <input value={suffix} onChange={(event) => setSuffix(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSolve()} placeholder="optional" className="tool-input" maxLength={8} />
            </label>
            <label className="tool-label">
              Contains
              <input value={contains} onChange={(event) => setContains(event.target.value)} placeholder="optional" className="tool-input" maxLength={12} />
            </label>
          </div>

          <button type="button" onClick={() => void handleSolve()} disabled={!tiles.trim() || loading} className="tool-primary-button">
            {loading ? statusLabel : 'Find rack words'}
          </button>

          <p className="tool-status tool-status-warning">
            Points follow common Words With Friends–style letter values for sorting. This is not an official Words With Friends® dictionary or tournament word list.
          </p>

          <div aria-live="polite">
            {error && <p className="tool-status tool-status-error">{error}</p>}
            {!error && searched && !loading && total === 0 && (
              <div className="empty-results">
                <h2>No words found for that rack</h2>
                <p>Try Extended dictionary, switch Exact ↔ Words from letters, or check for typos.</p>
                <div className="empty-results-actions">
                  <button
                    type="button"
                    className="primary"
                    onClick={() => {
                      setDictionaryType('full');
                      void handleSolve('full');
                    }}
                  >
                    Search with Extended
                  </button>
                  <a href="/tools/word-finder">Open Word Finder</a>
                  <a href="/tools/scrabble-solver">Open Rack Word Finder</a>
                </div>
              </div>
            )}
            {!error && searched && !loading && total > 0 && filtered.length === 0 && (
              <div className="empty-results">
                <h2>No words match these filters</h2>
                <p>Clear Starts / Ends / Contains or the length filter to see all matches again.</p>
                <div className="empty-results-actions">
                  <button type="button" className="primary" onClick={() => setContains('')}>
                    Clear filters
                  </button>
                  <button type="button" onClick={() => setContains('')}>
                    Show all results
                  </button>
                </div>
              </div>
            )}
            {filtered.length > 0 && (
              <div className="mt-6">
                <h3 className="tool-results-heading">
                  Found {needle ? filtered.length : total} word{(needle ? filtered.length : total) === 1 ? '' : 's'}
                  {!needle && total > results.length ? ` — showing the top ${results.length}` : ''}
                </h3>
                <div className="grid max-h-96 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                  {filtered.slice(0, visibleCount).map((word) => (
                    <div key={word} className="tool-result-card text-center">
                      <span className="tool-result-word text-lg">{word.toUpperCase()}</span>
                      <div className="tool-result-meta mt-1">
                        {word.length} letters · {scoreWord(word)} WWF-style pts
                      </div>
                    </div>
                  ))}
                </div>
                {visibleCount < filtered.length && (
                  <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="tool-secondary-button mt-4 w-full">
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="tool-trust-bar">
            <div>
              <div className="tool-trust-items">
                <span className="tool-trust-item">
                  <span className="tool-trust-dot" />
                  <span>Scrabble-style letter points · Unofficial word list</span>
                </span>
                <span className="tool-trust-item">
                  <span className="tool-trust-dot" />
                  <span>WWF-style points on this page</span>
                </span>
              </div>
              <p className="tool-trust-sub">Common ~39k · Extended ~142k · Runs in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
