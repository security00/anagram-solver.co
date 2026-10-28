'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dictionaryStatusLabel, prefetchWordList } from '@/lib/dictionaryProgress';
import { runWordSolverQuery } from '@/lib/solverClient';
import type { DictionaryType } from '@/lib/dictionaryData';

const RESULT_LIMIT = 100;

export default function JumbleSolverTool() {
  const [letters, setLetters] = useState('');
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'searching'>('searching');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async (dict = dictionaryType) => {
    const value = letters.trim();
    if (!value) return;
    if (dict === 'full') prefetchWordList('full');

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
            input: value,
            limit: RESULT_LIMIT,
            operation: 'anagrams',
            sortBy: 'alphabetical',
          },
        },
        (progress) => {
          setPhase(progress.phase);
          setLoadedBytes(progress.loadedBytes);
        },
      );
      setResults(outcome.words);
      setTotal(outcome.total);
      const url = new URL(window.location.href);
      url.searchParams.set('q', value);
      window.history.replaceState(null, '', `${url.pathname}?${url.searchParams.toString()}`);
    } catch (searchError) {
      setResults([]);
      setTotal(0);
      setError(searchError instanceof Error ? searchError.message : 'Unable to unscramble these letters.');
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = dictionaryStatusLabel(phase, dictionaryType, loadedBytes);
  const phraseHref = `/tools/multiple-words?q=${encodeURIComponent(letters.trim())}`;

  return (
    <div className="tool-shell">
      <form
        className="tool-primary-band"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSolve();
        }}
      >
        <label htmlFor="jumble-letters" className="tool-label tool-label-on-dark">
          Scrambled jumble letters
          <div className="relative mt-1">
            <input
              type="text"
              id="jumble-letters"
              value={letters}
              onChange={(event) => setLetters(event.target.value)}
              placeholder="e.g., TLEISN"
              className="tool-input tool-input-on-dark"
              maxLength={40}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <span className="tool-help tool-help-on-dark">
            Exact anagrams only: every letter is used once. This is not a daily answer list.
          </span>
        </label>
      </form>

      <div className="tool-body">
        <div className="space-y-6">
          <label className="tool-label">
            Dictionary
            <select
              value={dictionaryType}
              onChange={(event) => setDictionaryType(event.target.value as DictionaryType)}
              className="tool-select"
            >
              <option value="common">Common English (~39k)</option>
              <option value="full">Extended English (~142k)</option>
            </select>
          </label>

          <button type="button" onClick={() => void handleSolve()} disabled={!letters.trim() || loading} className="tool-primary-button">
            {loading ? statusLabel : 'Solve exact anagram'}
          </button>

          <div aria-live="polite">
            {error && <p className="tool-status tool-status-error">{error}</p>}
            {!error && searched && !loading && total === 0 && (
              <div className="empty-results">
                <h2>No words found for that rack</h2>
                <p>Try Extended dictionary, switch Exact ↔ Words from letters, or check for typos.</p>
                <p>Exact anagrams need every letter. Try Words from letters to find shorter words in the same rack.</p>
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
                  <Link href={`/?q=${encodeURIComponent(letters.trim())}&mode=words`}>Find words from these letters</Link>
                  <Link href="/tools/word-finder">Open Word Finder</Link>
                </div>
              </div>
            )}
            {total > 0 && !loading && (
              <div>
                <h3 className="tool-results-heading">
                  {total} exact anagram{total === 1 ? '' : 's'}
                </h3>
                <ul className="jumble-results">
                  {results.map((word) => (
                    <li key={word}>{word.toUpperCase()}</li>
                  ))}
                </ul>
                <p className="tool-note">
                  For the circled-letter finale, collect those letters yourself, then open{' '}
                  <Link href={phraseHref}>Multiple Words</Link> or the{' '}
                  <Link href="/tools/anagram-phrase-solver">Anagram Phrase Solver</Link>.
                </p>
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
              </div>
              <p className="tool-trust-sub">Common ~39k · Extended ~142k · Runs in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
