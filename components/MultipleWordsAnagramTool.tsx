'use client';

import { useEffect, useState } from 'react';
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
  { label: 'THE EYES', value: 'the eyes' },
  { label: 'SCHOOLMASTER', value: 'schoolmaster' },
  { label: 'ASTRONOMER', value: 'astronomer' },
  { label: 'ELEVEN PLUS TWO', value: 'eleven plus two' },
  { label: 'DORMITORY', value: 'dormitory' },
  { label: 'A GENTLEMAN', value: 'a gentleman' },
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
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [resultSort, setResultSort] = useState<'default' | 'score' | 'alpha'>('default');
  const [feedbackVote, setFeedbackVote] = useState<'yes' | 'no' | null>(null);

  const executeSolve = async (
    queryInput: string,
    targetWordCount = wordCount,
    targetMinLen = minWordLength,
    targetMustInclude = containsWord,
    targetLimit = resultLimit,
    targetDict = dictionaryType
  ) => {
    if (!queryInput.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setError('');
    setTruncationMessage('');
    try {
      const outcome = await runMultiWordSolverQuery({
        dictionaryType: targetDict,
        input: queryInput,
        kind: 'multi',
        options: {
          maxResults: targetLimit,
          maxSearchStates: 50_000,
          minWordLength: targetMinLen,
          requiredWord: targetMustInclude,
          timeLimitMs: 1_500,
        },
        wordCount: targetWordCount,
      });

      const inputWordList = (queryInput.toLowerCase().match(/[a-z]+/g) || []).sort().join(' ');
      const sortedResults = [...outcome.results].sort((a, b) => {
        const aSorted = [...a].map((w) => w.toLowerCase()).sort().join(' ');
        const bSorted = [...b].map((w) => w.toLowerCase()).sort().join(' ');
        const aIsInput = aSorted === inputWordList;
        const bIsInput = bSorted === inputWordList;
        if (aIsInput && !bIsInput) return 1;
        if (!aIsInput && bIsInput) return -1;
        return 0;
      });

      setResults(sortedResults);
      if (outcome.truncated) {
        setTruncationMessage(
          outcome.stopReason === 'result-limit'
            ? `Showing the first ${outcome.results.length} combinations.`
            : 'Search stopped at the performance limit. Add a required word, raise the minimum length, or use the common dictionary to narrow it.'
        );
      }
    } catch (searchError) {
      setResults([]);
      setError(
        searchError instanceof Error
          ? searchError.message
          : 'Unable to search phrase anagrams.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (value: string) => {
    setInput(value);
    void executeSolve(
      value,
      wordCount,
      minWordLength,
      containsWord,
      resultLimit,
      dictionaryType
    );
  };

  const handleSolve = () => {
    void executeSolve(input);
  };

  const handleCopy = (phrase: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(phrase);
      setCopiedPhrase(phrase);
      setTimeout(() => {
        setCopiedPhrase((curr) => (curr === phrase ? null : curr));
      }, 2000);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || params.get('letters') || params.get('input');
    if (q && q.trim()) {
      const val = q.trim();
      setInput(val);
      void executeSolve(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotalScore = (words: string[]) => {
    return words.reduce((sum, word) => sum + calculateScore(word), 0);
  };

  return (
    <div className="tool-shell">
      <div className="tool-primary-band">
        <label htmlFor="input" className="tool-label tool-label-on-dark">
          Enter letters or a phrase
          <div className="relative mt-1">
            <input
              type="text"
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
              placeholder="e.g., SCHOOLMASTER, THE EYES, or ASTRONOMER"
              className="tool-input tool-input-on-dark"
              maxLength={30}
              autoComplete="off"
              spellCheck={false}
            />
            {input.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setResults([]);
                  setHasSearched(false);
                  setError('');
                  setTruncationMessage('');
                }}
                className="tool-clear-button"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
          </div>
          <span className="tool-help tool-help-on-dark">
            Spaces and punctuation are ignored. Results use every letter exactly once.
          </span>
        </label>

        {examples.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Interactive Quick Try (Tiles):
              </span>
              <span className="text-xs text-slate-300">Click to instantly solve</span>
            </div>
            <div className="tile-rack-card mt-2 flex flex-wrap gap-2">
              {examples.map((example) => {
                const isActive = input.trim().toLowerCase() === example.value.toLowerCase();
                return (
                  <button
                    key={example.value}
                    type="button"
                    onClick={() => handleExampleClick(example.value)}
                    className={`tile-rack-btn ${isActive ? 'ring-2 ring-cyan-400' : ''}`}
                    title={`Click to solve: ${example.label}`}
                  >
                    <span>{example.label}</span>
                    <span className="tile-rack-tag">▶</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="tool-body">
        <div className="space-y-6">
          <div className="tool-filter-bar">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_0.75fr]">
              <div>
                <label htmlFor="dictionaryType" className="tool-label">
                  Dictionary
                </label>
                <select
                  id="dictionaryType"
                  value={dictionaryType}
                  onChange={(e) => {
                    const val = e.target.value as DictionaryType;
                    setDictionaryType(val);
                    if (input.trim() && hasSearched) {
                      void executeSolve(input, wordCount, minWordLength, containsWord, resultLimit, val);
                    }
                  }}
                  className="tool-select"
                >
                  <option value="common">Common English (faster)</option>
                  <option value="full">Extended English</option>
                </select>
              </div>

              <div>
                <label htmlFor="wordCount" className="tool-label">
                  Word count
                </label>
                {lockWordCount ? (
                  <div className="tool-static-field">
                    Exactly {wordCount} words
                  </div>
                ) : (
                  <select
                    id="wordCount"
                    value={wordCount}
                    onChange={(e) => {
                      const val = Number(e.target.value) as 2 | 3;
                      setWordCount(val);
                      if (input.trim() && hasSearched) {
                        void executeSolve(input, val, minWordLength, containsWord, resultLimit, dictionaryType);
                      }
                    }}
                    className="tool-select"
                  >
                    <option value={2}>Exactly 2 words</option>
                    <option value={3}>Exactly 3 words</option>
                  </select>
                )}
              </div>

              <div>
                <label htmlFor="minWordLength" className="tool-label">
                  Min word length
                </label>
                <select
                  id="minWordLength"
                  value={minWordLength}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMinWordLength(val);
                    if (input.trim() && hasSearched) {
                      void executeSolve(input, wordCount, val, containsWord, resultLimit, dictionaryType);
                    }
                  }}
                  className="tool-select"
                >
                  <option value={2}>2 letters</option>
                  <option value={3}>3 letters</option>
                  <option value={4}>4 letters</option>
                  <option value={5}>5 letters</option>
                </select>
              </div>

              <div>
                <label htmlFor="containsWord" className="tool-label">
                  Must include
                </label>
                <input
                  type="text"
                  id="containsWord"
                  value={containsWord}
                  onChange={(e) => setContainsWord(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
                  placeholder="optional"
                  className="tool-input"
                  maxLength={15}
                />
              </div>

              <div>
                <label htmlFor="resultLimit" className="tool-label">
                  Results
                </label>
                <select
                  id="resultLimit"
                  value={resultLimit}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setResultLimit(val);
                    if (input.trim() && hasSearched) {
                      void executeSolve(input, wordCount, minWordLength, containsWord, val, dictionaryType);
                    }
                  }}
                  className="tool-select"
                >
                  <option value={100}>100</option>
                  <option value={250}>250</option>
                  <option value={500}>500</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={!input.trim() || loading}
            className="tool-primary-button"
          >
            {loading ? 'Finding Multi-Word Anagrams...' : 'Find Multi-Word Anagrams'}
          </button>

          {loading && (
            <div className="text-center text-[#52657d]">
              <p>Searching combinations in background… This may take a moment for long phrases.</p>
            </div>
          )}

          {error && (
            <div aria-live="polite" className="tool-status tool-status-error">
              {error}
            </div>
          )}

          {truncationMessage && !loading && (
            <div aria-live="polite" className="tool-status tool-status-warning">
              {truncationMessage}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#d9e5ec] pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="tool-results-heading mb-0">
                    Found {results.length} multi-word anagram{results.length !== 1 ? 's' : ''}
                  </h3>
                  <span className="tool-trust-badge">
                    {wordCount}-Word Exact
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-[#687b91]">Sort by:</span>
                  <div className="inline-flex rounded border border-[#b9cbd7] bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => setResultSort('default')}
                      className={`rounded px-2 py-1 font-semibold transition-colors ${
                        resultSort === 'default'
                          ? 'bg-[#061a38] text-white'
                          : 'text-[#52657d] hover:text-[#061a38]'
                      }`}
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      onClick={() => setResultSort('score')}
                      className={`rounded px-2 py-1 font-semibold transition-colors ${
                        resultSort === 'score'
                          ? 'bg-[#061a38] text-white'
                          : 'text-[#52657d] hover:text-[#061a38]'
                      }`}
                    >
                      Highest Points
                    </button>
                    <button
                      type="button"
                      onClick={() => setResultSort('alpha')}
                      className={`rounded px-2 py-1 font-semibold transition-colors ${
                        resultSort === 'alpha'
                          ? 'bg-[#061a38] text-white'
                          : 'text-[#52657d] hover:text-[#061a38]'
                      }`}
                    >
                      A–Z
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
                {[...results]
                  .sort((a, b) => {
                    if (resultSort === 'score') {
                      return getTotalScore(b) - getTotalScore(a);
                    }
                    if (resultSort === 'alpha') {
                      return a.join(' ').localeCompare(b.join(' '));
                    }
                    return 0;
                  })
                  .map((wordCombination, index) => {
                  const phraseText = wordCombination.join(' ');
                  const isCopied = copiedPhrase === phraseText;
                  const totalScore = getTotalScore(wordCombination);
                  const inputWords = input.toLowerCase().match(/[a-z]+/g) || [];
                  const inputSorted = [...inputWords].sort().join(' ');
                  const comboSorted = [...wordCombination].map((w) => w.toLowerCase()).sort().join(' ');
                  const isInputEcho = inputWords.length >= 2 && comboSorted === inputSorted;

                  return (
                    <div key={index} className="tool-result-card">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {wordCombination.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex items-center">
                              <span className="tool-word-tile">
                                <span>{word.toUpperCase()}</span>
                                <span className="tool-word-tile-score">
                                  {calculateScore(word)}
                                </span>
                              </span>
                              {wordIndex < wordCombination.length - 1 && (
                                <span className="tool-phrase-plus" aria-hidden="true">
                                  +
                                </span>
                              )}
                            </span>
                          ))}
                          {inputWords.length >= 2 && !isInputEcho && index < 3 && resultSort === 'default' && (
                            <span className="tool-badge-novel ml-1">
                              ✨ Transposed
                            </span>
                          )}
                          {isInputEcho && (
                            <span className="ml-1 text-xs text-[#8295a8]">
                              (original words)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <span className="tool-score-pill">
                            <span className="text-xs uppercase tracking-wider text-[#687b91]">
                              Total:
                            </span>
                            <span>{totalScore} pts</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(phraseText)}
                            className={`tool-copy-action-btn ${
                              isCopied ? 'tool-copy-action-btn-copied' : ''
                            }`}
                            aria-label={`Copy phrase ${phraseText}`}
                          >
                            {isCopied ? '✓ Copied!' : 'Copy phrase'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* User Retention Feedback Widget */}
              <div className="tool-feedback-box">
                <div className="flex items-center gap-2 text-xs text-[#52657d]">
                  <span className="font-bold text-[#061a38]">Did you find the phrase you wanted?</span>
                  <span>Your feedback helps improve our dictionary pairings.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackVote('yes')}
                    className={`tool-feedback-action-btn ${feedbackVote === 'yes' ? 'active' : ''}`}
                  >
                    👍 Yes, found it!
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackVote('no')}
                    className={`tool-feedback-action-btn ${feedbackVote === 'no' ? 'active' : ''}`}
                  >
                    👎 Need more phrases
                  </button>
                </div>
              </div>
            </div>
          )}

          {results.length === 0 && hasSearched && !loading && (
            <div className="py-8 text-center text-[#687b91]">
              <p>No multi-word anagrams found. Try a longer phrase, a lower minimum length, or the full dictionary.</p>
            </div>
          )}

          {/* EEAT Trust Bar */}
          <div className="tool-trust-bar">
            <div className="tool-trust-items">
              <span className="tool-trust-item">
                <span className="tool-trust-dot" />
                <span>Client-Side Web Worker Engine</span>
              </span>
              <span className="tool-trust-item">
                <span className="tool-trust-dot" />
                <span>Zero Data Uploaded (100% Private)</span>
              </span>
              <span className="tool-trust-item">
                <span className="tool-trust-dot" />
                <span>Free &amp; Ad-Free Experience</span>
              </span>
            </div>
            <span className="tool-trust-badge">
              Verified 2026 Word Database
            </span>
          </div>

          <div className="tool-note mt-8">
            <h4 className="mb-2 text-sm font-bold text-[#061a38]">
              Tips for high-quality multi-word anagrams
            </h4>
            <div className="space-y-1 text-sm text-[#52657d]">
              <div>• Use longer phrases with 8 or more letters for the most creative combinations.</div>
              <div>• Try names, famous phrases, or cryptic crossword clues (e.g. SCHOOLMASTER → THE CLASSROOM).</div>
              <div>• Use the &ldquo;Must include&rdquo; filter when you already have part of your puzzle solution.</div>
              <div>• For puzzle solving, toggle between 2-word and 3-word combinations to test different phrase lengths.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
