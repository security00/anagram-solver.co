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
    <div className="tool-shell">
      <div className="tool-primary-band">
        <label htmlFor="input" className="tool-label tool-label-on-dark">
          Enter letters or a phrase
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="e.g., SCHOOLMASTER, THE EYES, or ASTRONOMER"
            className="tool-input tool-input-on-dark"
            maxLength={30}
          />
          <span className="tool-help tool-help-on-dark">
            Spaces and punctuation are ignored. Results use every letter exactly once.
          </span>
        </label>

        {examples.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-200">Try:</span>
            {examples.map((example) => (
              <button
                key={example.value}
                type="button"
                onClick={() => handleExampleClick(example.value)}
                className="tool-chip"
              >
                {example.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="tool-body">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_0.75fr]">
            <div>
              <label
                htmlFor="dictionaryType"
                className="tool-label"
              >
                Dictionary
              </label>
              <select
                id="dictionaryType"
                value={dictionaryType}
                onChange={(e) => setDictionaryType(e.target.value as DictionaryType)}
                className="tool-select"
              >
                <option value="common">Common English (faster)</option>
                <option value="full">Extended English</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="wordCount"
                className="tool-label"
              >
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
                  onChange={(e) => setWordCount(Number(e.target.value) as 2 | 3)}
                  className="tool-select"
                >
                  <option value={2}>Exactly 2 words</option>
                  <option value={3}>Exactly 3 words</option>
                </select>
              )}
            </div>

            <div>
              <label
                htmlFor="minWordLength"
                className="tool-label"
              >
                Min word length
              </label>
              <select
                id="minWordLength"
                value={minWordLength}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
                className="tool-select"
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
                className="tool-label"
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
                className="tool-input"
                maxLength={15}
              />
            </div>

            <div>
              <label
                htmlFor="resultLimit"
                className="tool-label"
              >
                Results
              </label>
              <select
                id="resultLimit"
                value={resultLimit}
                onChange={(e) => setResultLimit(Number(e.target.value))}
                className="tool-select"
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
            className="tool-primary-button"
          >
            {loading ? 'Finding Multi-Word Anagrams...' : 'Find Multi-Word Anagrams'}
          </button>

          {loading && (
            <div className="text-center text-[#52657d]">
              <p>This may take a moment for longer phrases or the full dictionary.</p>
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
              <h3 className="tool-results-heading">
                Found {results.length} multi-word anagram{results.length !== 1 ? 's' : ''}:
              </h3>
              <div className="max-h-96 space-y-3 overflow-y-auto">
                {results.map((wordCombination, index) => (
                  <div
                    key={index}
                    className="tool-result-card"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="tool-result-word text-lg">
                        {wordCombination.map((word) => word.toUpperCase()).join(' + ')}
                      </span>
                      <div className="tool-result-meta shrink-0">
                        Total: {getTotalScore(wordCombination)} points
                      </div>
                    </div>
                    <div className="tool-result-meta mt-1">
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
                      className="tool-secondary-button mt-3 bg-white"
                    >
                      Copy phrase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && hasSearched && !loading && (
            <div className="py-8 text-center text-[#687b91]">
              <p>No multi-word anagrams found. Try a longer phrase, a lower minimum length, or the full dictionary.</p>
            </div>
          )}

          <div className="tool-note mt-8">
            <h4 className="mb-2 text-sm font-bold text-[#061a38]">
              Tips for better results
            </h4>
            <div className="space-y-1 text-sm text-[#52657d]">
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
