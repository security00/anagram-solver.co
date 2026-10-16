import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import list from '../data/puzzle-words.json';
import { findAnagrams, findWordsFromLetters, searchMultiWordAnagrams } from './anagramSolver';

export const PUZZLE_PAGE_CAP = 50;
export const NOINDEX_AFTER_DAYS = 60;
export const MIN_IMPRESSIONS = 100;
export const MIN_SHORTER_WORDS = 5;
// Lower bound of the range relayed for entries without an exact GSC figure.
export const RELAYED_RANGE_MIN = 280;

export type PuzzleEntry = {
  letters: string;
  addedOn: string;
  gscWindow: string;
  gscImpressions28d: number | null;
  gscImpressionsNote?: string;
  gscQuery?: string;
  gscSource?: string;
  gscClicks28d?: number;
  gscPosition28d?: number;
  gscPrevImpressions28d?: number | null;
  clicks: number | null;
  clicksCheckedOn: string | null;
  noindex: boolean;
};

export const puzzleEntries: PuzzleEntry[] = list.entries as PuzzleEntry[];

const daysBetween = (a: string, b: string) =>
  Math.floor((Date.parse(b) - Date.parse(a)) / 86_400_000);

/**
 * A page is noindexed when the manual flag is set, or when it is older than
 * NOINDEX_AFTER_DAYS and a GSC click check recorded 0 clicks since it was added.
 * Evaluated at build time, so it takes effect on the next deploy.
 */
export function isIndexable(entry: PuzzleEntry, today: string = new Date().toISOString().slice(0, 10)) {
  if (entry.noindex) return false;
  const old = daysBetween(entry.addedOn, today) > NOINDEX_AFTER_DAYS;
  return !(old && entry.clicks === 0);
}

function loadList(name: string): Set<string> {
  const text = readFileSync(resolve(process.cwd(), 'public/dictionaries', `${name}.txt`), 'utf8');
  return new Set(text.split(/\s+/).filter((w) => /^[a-z]+$/.test(w)));
}

let cache: { common: Set<string>; full: Set<string> } | null = null;
function dicts() {
  cache ??= { common: loadList('common'), full: loadList('full') };
  return cache;
}

export type PuzzleSolution = {
  letters: string;
  answers: string[];
  extendedAnswers: string[];
  wordsByLength: Array<{ length: number; words: string[] }>;
  shorterCount: number;
  phrases: string[];
};

export function solvePuzzle(letters: string): PuzzleSolution {
  const { common, full } = dicts();
  const answers = findAnagrams(letters, common).sort();
  const extendedAnswers = findAnagrams(letters, full)
    .filter((w) => !answers.includes(w))
    .sort();
  const shorter = findWordsFromLetters(letters, common).filter(
    (w) => w.length >= 3 && w.length < letters.length,
  );
  const groups = new Map<number, string[]>();
  for (const w of shorter) groups.set(w.length, [...(groups.get(w.length) ?? []), w]);
  const wordsByLength = [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([length, words]) => ({ length, words: words.sort() }));
  const phrases = ([2, 3] as const).flatMap((count) =>
    searchMultiWordAnagrams(letters, common, count, {
      minWordLength: 3,
      exactWordCount: count,
      maxResults: 15,
      timeLimitMs: 5_000,
      maxSearchStates: 200_000,
    }).results.map((r) => r.join(' ')),
  );
  return { letters, answers, extendedAnswers, wordsByLength, shorterCount: shorter.length, phrases };
}

export function qualifies(entry: PuzzleEntry): boolean {
  const impressions = entry.gscImpressions28d ?? (entry.gscImpressionsNote ? RELAYED_RANGE_MIN : 0);
  if (impressions < MIN_IMPRESSIONS) return false;
  const s = solvePuzzle(entry.letters);
  return s.answers.length >= 1 && s.shorterCount >= MIN_SHORTER_WORDS;
}
