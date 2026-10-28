'use client';

import Link from 'next/link';
import type { ChangeEvent } from 'react';
import type { ResultFilters } from '@/lib/resultFilters';

export function ResultFilterFields({
  filters,
  onChange,
}: {
  filters: ResultFilters;
  onChange: (next: ResultFilters) => void;
}) {
  const set = (key: keyof ResultFilters) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, [key]: event.target.value });
  };

  return (
    <div className="result-filters">
      <label>
        Starts with
        <input value={filters.starts} onChange={set('starts')} maxLength={12} autoComplete="off" spellCheck={false} />
      </label>
      <label>
        Ends with
        <input value={filters.ends} onChange={set('ends')} maxLength={12} autoComplete="off" spellCheck={false} />
      </label>
      <label>
        Contains
        <input value={filters.contains} onChange={set('contains')} maxLength={12} autoComplete="off" spellCheck={false} />
      </label>
      <label>
        Min length
        <input value={filters.minLength} onChange={set('minLength')} inputMode="numeric" maxLength={2} />
      </label>
      <label>
        Max length
        <input value={filters.maxLength} onChange={set('maxLength')} inputMode="numeric" maxLength={2} />
      </label>
    </div>
  );
}

export function EmptyFilterResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="empty-results">
      <h2>No words match these filters</h2>
      <p>Clear Starts / Ends / Contains or the length filter to see all matches again.</p>
      <div className="empty-results-actions">
        <button type="button" className="primary" onClick={onClear}>
          Clear filters
        </button>
        <button type="button" onClick={onClear}>
          Show all results
        </button>
      </div>
    </div>
  );
}

export function EmptyRackResults({
  hasBlank,
  longInput,
  mode,
  onExtended,
  onWordsMode,
  query,
}: {
  hasBlank: boolean;
  longInput: boolean;
  mode: 'exact' | 'words';
  onExtended: () => void;
  onWordsMode: () => void;
  query: string;
}) {
  const encoded = encodeURIComponent(query.trim());
  return (
    <div className="empty-results">
      <h2>No words found for that rack</h2>
      <p>Try Extended dictionary, switch Exact ↔ Words from letters, or check for typos.</p>
      {mode === 'exact' && (
        <p>Exact anagrams need every letter. Try Words from letters to find shorter words in the same rack.</p>
      )}
      {longInput && <p>Looking for a phrase or name? Try Multiple Words or Name Anagram Solver.</p>}
      <div className="empty-results-actions">
        <button type="button" className="primary" onClick={onExtended}>
          Search with Extended
        </button>
        <Link href={encoded ? `/tools/word-finder?q=${encoded}` : '/tools/word-finder'}>Open Word Finder</Link>
        {hasBlank && (
          <Link href={encoded ? `/tools/scrabble-solver` : '/tools/scrabble-solver'}>Open Rack Word Finder</Link>
        )}
        {mode === 'exact' && (
          <button type="button" onClick={onWordsMode}>
            Find words from these letters
          </button>
        )}
        {longInput && (
          <>
            <Link href="/tools/multiple-words">Multiple Words</Link>
            <Link href="/tools/name-anagram-solver">Name Anagram Solver</Link>
          </>
        )}
      </div>
    </div>
  );
}
