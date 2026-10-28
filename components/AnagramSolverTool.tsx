'use client';

import {
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecentSearches from '@/components/RecentSearches';
import { EmptyFilterResults, EmptyRackResults, ResultFilterFields } from '@/components/SolverResultStates';
import { calculateScore } from '@/lib/anagramSolver';
import { getHomeDailyChallenge } from '@/lib/dailyChallenge';
import { dictionaryStatusLabel, prefetchWordList } from '@/lib/dictionaryProgress';
import { applyResultFilters, emptyResultFilters, filtersActive, groupWordsByLength, type ResultFilters } from '@/lib/resultFilters';
import { readRecentSearches, rememberSearch } from '@/lib/searchHistory';
import { getWordHint, getWordLookupHref } from '@/lib/wordHints';
import { runWordSolverQuery } from '@/lib/solverClient';
import { trackSolverFeedback } from '@/lib/trackEvent';
import type { DictionaryType } from '@/lib/dictionaryData';
import type { WordSort } from '@/lib/solverEngine';

const RESULT_LIMIT = 500;
const PAGE_SIZE = 40;

type SolveMode = 'exact' | 'words';

const modes = [
  { href: '/', label: 'Anagram Solver', active: true },
  { href: '/tools/word-finder', label: 'Word Finder' },
  { href: '/tools/scrabble-solver', label: 'Rack Word Finder' },
  { href: '/tools/multiple-words', label: 'Multiple Words' },
];

const exampleWords = ['SILENT', 'ENLIST', 'TINSEL'];

function parseMode(value: string | null): SolveMode {
  return value === 'words' || value === 'from-letters' ? 'words' : 'exact';
}

function syncQuery(word: string, mode: SolveMode) {
  const url = new URL(window.location.href);
  url.searchParams.set('q', word.trim());
  url.searchParams.set('mode', mode);
  const next = `${url.pathname}?${url.searchParams.toString()}`;
  const current = `${window.location.pathname}${window.location.search}`;
  if (next !== current) window.history.replaceState(null, '', next);
}

export default function AnagramSolverTool() {
  const [input, setInput] = useState('');
  const [solveMode, setSolveMode] = useState<SolveMode>('exact');
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'searching'>('searching');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [activeDict, setActiveDict] = useState<DictionaryType>('common');
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<WordSort>('length');
  const [dictionaryType, setDictionaryType] = useState<DictionaryType>('common');
  const [filters, setFilters] = useState<ResultFilters>(emptyResultFilters);
  const [groupLimits, setGroupLimits] = useState<Record<number, number>>({});
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [feedbackVote, setFeedbackVote] = useState<'yes' | 'no' | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [dailyPrompt, setDailyPrompt] = useState('');

  useEffect(() => {
    setRecentSearches(readRecentSearches('home'));
    setDailyPrompt(getHomeDailyChallenge().prompt);
    const media = window.matchMedia('(max-width: 767px)');
    const updateShare = () => setCanShare(media.matches && typeof navigator.share === 'function');
    updateShare();
    media.addEventListener('change', updateShare);

    const params = new URLSearchParams(window.location.search);
    const nextMode = parseMode(params.get('mode'));
    const query = (params.get('q') || params.get('letters') || '').trim();
    setSolveMode(nextMode);
    if (query) {
      setInput(query);
      void handleSolveWithWord(query, nextMode);
    }
    return () => media.removeEventListener('change', updateShare);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dictionaryType === 'full') prefetchWordList('full');
  }, [dictionaryType]);

  const handleCopyWord = (word: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(word);
      setCopiedWord(word);
      setTimeout(() => {
        setCopiedWord((curr) => (curr === word ? null : curr));
      }, 1500);
    }
  };

  const handleSolveWithWord = async (
    wordToSolve: string,
    mode = solveMode,
    dict = dictionaryType,
  ) => {
    if (!wordToSolve.trim()) return;

    setLoading(true);
    setPhase(dict === 'full' ? 'loading' : 'searching');
    setLoadedBytes(0);
    setActiveDict(dict);
    setError('');
    setSearched(true);
    setFeedbackVote(null);
    setFilters(emptyResultFilters);
    setGroupLimits({});
    setRecentSearches(rememberSearch('home', wordToSolve));
    try {
      const outcome = await runWordSolverQuery(
        {
          dictionaryType: dict,
          kind: 'words',
          request: {
            input: wordToSolve,
            limit: RESULT_LIMIT,
            minLength: mode === 'words' ? 2 : undefined,
            operation: mode === 'words' ? 'words' : 'anagrams',
            sortBy,
          },
        },
        (progress) => {
          setPhase(progress.phase);
          setLoadedBytes(progress.loadedBytes);
          if (progress.dictionaryType === 'common' || progress.dictionaryType === 'full') {
            setActiveDict(progress.dictionaryType);
          }
        },
      );
      setResults(outcome.words);
      setTotal(outcome.total);
      syncQuery(wordToSolve, mode);
    } catch (searchError) {
      setResults([]);
      setTotal(0);
      setError(searchError instanceof Error ? searchError.message : 'Unable to solve this anagram.');
    } finally {
      setLoading(false);
    }
  };

  const handleSolve = () => handleSolveWithWord(input);

  const handleModeChange = (mode: SolveMode) => {
    setSolveMode(mode);
    if (input.trim() && searched) {
      void handleSolveWithWord(input, mode);
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    const url = `${window.location.origin}/?q=${encodeURIComponent(input.trim())}&mode=${solveMode}`;
    void navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 1600);
  };

  const shareWord = async (word: string) => {
    if (!navigator.share) return;
    const url = `${window.location.origin}/?q=${encodeURIComponent(input.trim())}&mode=${solveMode}`;
    try {
      await navigator.share({ text: word.toUpperCase(), title: word.toUpperCase(), url });
    } catch {
      // The share sheet was dismissed.
    }
  };

  const vote = (choice: 'yes' | 'no') => {
    setFeedbackVote(choice);
    trackSolverFeedback(choice, {
      dictionary: dictionaryType,
      mode: solveMode,
      tool: 'home',
    });
  };

  const filtered = applyResultFilters(results, filters);
  const grouped = groupWordsByLength(filtered, sortBy);
  const lettersOnly = input.replace(/[^a-zA-Z?*]/g, '');
  const hasBlank = /[?*]/.test(input);
  const longInput = lettersOnly.length >= 12 || /\s/.test(input.trim());
  const statusLabel = dictionaryStatusLabel(phase, activeDict, loadedBytes);
  const resultLabel =
    solveMode === 'exact'
      ? filtered.length === 1
        ? 'exact anagram'
        : 'exact anagrams'
      : filtered.length === 1
        ? 'word from these letters'
        : 'words from these letters';

  return (
    <div id="solver" className="relative mx-auto mt-12 max-w-[1320px] scroll-mt-24 sm:mt-14">
      <nav aria-label="Choose a word tool" className="flex gap-7 overflow-x-auto border-b border-[#d9e5ec] sm:gap-12">
        {modes.map((mode) => (
          <Link
            key={mode.label}
            href={mode.href}
            aria-current={mode.active ? 'page' : undefined}
            className={`relative shrink-0 pb-4 text-sm font-semibold transition-colors sm:text-base ${
              mode.active ? 'text-[#00aebf]' : 'text-[#233a58] hover:text-[#00aebf]'
            }`}
          >
            {mode.label}
            {mode.active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#09c4d8]" aria-hidden="true" />}
          </Link>
        ))}
      </nav>

      <form
        className="mt-4 border-x border-b border-[#d9e5ec] bg-white shadow-[0_18px_45px_rgba(6,26,56,0.08)]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSolve();
        }}
      >
        <div className="grid gap-4 bg-[#061a38] p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-end md:gap-5 lg:p-6">
          <label htmlFor="letters" className="block min-w-0">
            <span className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-slate-200">
              <span>Enter a word or letters</span>
              <span className="solver-mode-toggle" role="group" aria-label="Solve mode">
                <button
                  type="button"
                  className={`solver-mode-btn ${solveMode === 'exact' ? 'active' : ''}`}
                  aria-pressed={solveMode === 'exact'}
                  onClick={() => handleModeChange('exact')}
                >
                  Exact anagrams
                </button>
                <button
                  type="button"
                  className={`solver-mode-btn ${solveMode === 'words' ? 'active' : ''}`}
                  aria-pressed={solveMode === 'words'}
                  onClick={() => handleModeChange('words')}
                >
                  Words from letters
                </button>
              </span>
            </span>
            <div className="relative max-w-[700px]">
              <input
                type="text"
                id="letters"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="LISTEN"
                aria-describedby="anagram-rule"
                className="block h-[60px] w-full border border-slate-400 bg-transparent px-5 pr-12 font-mono text-2xl font-semibold uppercase tracking-[0.24em] text-white placeholder:text-slate-400 sm:px-7 sm:text-3xl sm:tracking-[0.32em]"
                maxLength={40}
                autoComplete="off"
                spellCheck={false}
              />
              {input.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setInput('');
                    setResults([]);
                    setTotal(0);
                    setSearched(false);
                    setError('');
                    setFilters(emptyResultFilters);
                  }}
                  className="tool-clear-button"
                  aria-label="Clear input"
                >
                  ✕
                </button>
              )}
            </div>
          </label>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="group flex h-[60px] w-full items-center justify-center gap-4 bg-[#09c4d8] px-5 text-lg font-extrabold text-[#061a38] transition-colors hover:bg-[#41d7e5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (phase === 'loading' ? 'Loading…' : 'Searching…') : solveMode === 'exact' ? 'Solve' : 'Unscramble'}
            {!loading && <ArrowRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
          </button>
        </div>

        <div className="grid border-b border-[#d9e5ec] bg-white md:grid-cols-[1fr_1fr_1.35fr]">
          <label className="flex min-h-24 items-center gap-4 border-b border-[#d9e5ec] px-5 py-4 md:border-b-0 md:border-r lg:px-7">
            <GlobeAltIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[#687b91]">Dictionary</span>
              <select
                value={dictionaryType}
                onChange={(event) => setDictionaryType(event.target.value as DictionaryType)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-[#061a38] sm:text-base"
              >
                <option value="common">Common English (~39k)</option>
                <option value="full">Extended English (~142k)</option>
              </select>
            </span>
          </label>

          <label className="flex min-h-24 items-center gap-4 border-b border-[#d9e5ec] px-5 py-4 md:border-b-0 md:border-r lg:px-7">
            <QueueListIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[#687b91]">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as WordSort)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-[#061a38] sm:text-base"
              >
                <option value="length">Length</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="score">Tile score</option>
              </select>
            </span>
          </label>

          <p id="anagram-rule" className="flex min-h-24 items-center gap-3 px-5 py-4 text-sm leading-6 text-[#52657d] lg:px-7">
            <CheckCircleIcon className="h-6 w-6 shrink-0 text-[#00aebf]" aria-hidden="true" />
            {solveMode === 'exact'
              ? 'Exact anagrams use every letter once. ? or * is a blank. Spaces and punctuation do not count.'
              : 'Words from letters finds shorter words in the same rack. ? or * is a blank tile.'}
          </p>
        </div>

        <div className="px-5 py-4 sm:px-7" aria-live="polite">
          {error && <p className="border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>}

          {!error && searched && !loading && total === 0 && (
            <EmptyRackResults
              hasBlank={hasBlank}
              longInput={longInput}
              mode={solveMode}
              query={input}
              onExtended={() => {
                setDictionaryType('full');
                void handleSolveWithWord(input, solveMode, 'full');
              }}
              onWordsMode={() => {
                setSolveMode('words');
                void handleSolveWithWord(input, 'words');
              }}
            />
          )}

          {!searched && (
            <div className="space-y-4">
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008f9e]">
                    Quick Test Examples (Tiles):
                  </span>
                  <span className="text-xs text-[#687b91]">Click any word to instantly solve</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {exampleWords.map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => {
                        setInput(word);
                        void handleSolveWithWord(word);
                      }}
                      className="tile-rack-btn"
                      title={`Solve anagrams for ${word}`}
                    >
                      <span>{word}</span>
                      <span className="tile-rack-tag">▶</span>
                    </button>
                  ))}
                  {dailyPrompt && (
                    <button
                      type="button"
                      onClick={() => {
                        setSolveMode('exact');
                        setInput(dailyPrompt);
                        void handleSolveWithWord(dailyPrompt, 'exact');
                      }}
                      className="tile-rack-btn"
                      title={`Today's anagram: ${dailyPrompt}`}
                    >
                      <span>Today: {dailyPrompt}</span>
                      <span className="tile-rack-tag">▶</span>
                    </button>
                  )}
                </div>
              </div>
              <RecentSearches
                items={recentSearches}
                onPick={(query) => {
                  setInput(query);
                  void handleSolveWithWord(query);
                }}
              />
            </div>
          )}

          {loading && <p className="py-3 text-sm font-medium text-[#52657d]">{statusLabel}</p>}

          {!error && !loading && total > 0 && (
            <div>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-[#061a38]">
                  {filtered.length} {resultLabel}
                  {filtersActive(filters) ? ` of ${total}` : ''}
                </h2>
                <div className="flex items-center gap-3">
                  {total > results.length && <p className="text-sm text-[#687b91]">Showing the first {results.length}</p>}
                  {!canShare && (
                    <button type="button" onClick={handleShare} className="text-xs font-bold text-[#007f8d] underline">
                      {copiedShare ? 'Link copied' : 'Copy share link'}
                    </button>
                  )}
                </div>
              </div>

              <ResultFilterFields filters={filters} onChange={setFilters} />

              {filtered.length === 0 ? (
                <EmptyFilterResults onClear={() => setFilters(emptyResultFilters)} />
              ) : (
                <div>
                  {grouped.map((group, index) => {
                    const limit = groupLimits[group.length] ?? PAGE_SIZE;
                    const visible = group.words.slice(0, limit);
                    return (
                      <details key={group.length} className="result-length-group" open={index === 0}>
                        <summary>
                          {group.length} letters ({group.words.length})
                        </summary>
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                          {visible.map((word) => {
                            const isCopied = copiedWord === word;
                            const hint = getWordHint(word);
                            return (
                              <div key={word} className="border border-[#b9d9e3] bg-white px-3 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleCopyWord(word)}
                                  className="w-full cursor-pointer"
                                  title={hint ?? 'Scrabble-style letter points. Unofficial word list.'}
                                >
                                  <span className="font-mono font-bold tracking-[0.12em] text-[#061a38]">
                                    {word.toUpperCase()}
                                  </span>
                                  <span className="ml-2 text-xs font-semibold text-[#007f8d]">
                                    {isCopied ? '✓ Copied' : `${calculateScore(word)} pts`}
                                  </span>
                                </button>
                                {hint ? (
                                  <p className="mt-1 text-[11px] leading-4 text-[#687b91]">{hint}</p>
                                ) : (
                                  <a
                                    href={getWordLookupHref(word)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="word-hint-link"
                                  >
                                    Definition
                                  </a>
                                )}
                                {canShare && (
                                  <button type="button" className="result-share-btn" onClick={() => void shareWord(word)}>
                                    Share
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {limit < group.words.length && (
                          <button
                            type="button"
                            onClick={() =>
                              setGroupLimits((current) => ({
                                ...current,
                                [group.length]: (current[group.length] ?? PAGE_SIZE) + PAGE_SIZE,
                              }))
                            }
                            className="mt-4 w-full border border-[#8cced8] px-4 py-3 font-bold text-[#007f8d] hover:bg-[#effbfc]"
                          >
                            Show more
                          </button>
                        )}
                      </details>
                    );
                  })}
                </div>
              )}

              <div className="tool-feedback-box">
                <div className="flex items-center gap-2 text-xs text-[#52657d]">
                  <span className="font-bold text-[#061a38]">Did you find the anagram you were looking for?</span>
                  <span>We use this to verify our dictionary coverage.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => vote('yes')}
                    className={`tool-feedback-action-btn ${feedbackVote === 'yes' ? 'active' : ''}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => vote('no')}
                    className={`tool-feedback-action-btn ${feedbackVote === 'no' ? 'active' : ''}`}
                  >
                    No
                  </button>
                </div>
              </div>
              {feedbackVote === 'no' && (
                <div className="feedback-nudge">
                  <p>Sorry that didn’t help. Want a wider list or a pattern search?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setDictionaryType('full');
                      void handleSolveWithWord(input, solveMode, 'full');
                    }}
                  >
                    Try Extended
                  </button>
                  <Link href="/tools/word-finder">Word Finder</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              )}
            </div>
          )}

          {searched && (
            <div className="mt-4">
              <RecentSearches
                items={recentSearches}
                onPick={(query) => {
                  setInput(query);
                  void handleSolveWithWord(query);
                }}
              />
            </div>
          )}

          <div className="tool-trust-bar">
            <div>
              <div className="tool-trust-items">
                <span className="tool-trust-item">
                  <span className="tool-trust-dot" />
                  <span>100% In-Browser Computation</span>
                </span>
                <span className="tool-trust-item">
                  <span className="tool-trust-dot" />
                  <span>Zero Data Uploaded (Private)</span>
                </span>
                <span className="tool-trust-item">
                  <span className="tool-trust-dot" />
                  <span>Scrabble-style letter points · Unofficial word list</span>
                </span>
              </div>
              <p className="tool-trust-sub">Common ~39k · Extended ~142k · Runs in your browser</p>
            </div>
            <span className="tool-trust-badge">Updated October 2026</span>
          </div>
        </div>
      </form>
    </div>
  );
}
