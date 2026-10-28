/**
 * Anagram Solver Library
 * Core algorithms for finding anagrams from given letters
 */

// Find exact anagrams: every letter and every blank must be used once.
export function findAnagrams(input: string, dictionary: Set<string>): string[] {
  const normalizedInput = normalizeLetters(input);
  const wildcardCount = countWildcards(input);
  const inputFreq = getCharFrequency(normalizedInput);
  const targetLength = normalizedInput.length + wildcardCount;
  const results: string[] = [];

  for (const word of dictionary) {
    const normalizedWord = normalizeLetters(word);
    if (normalizedWord.length !== targetLength) continue;
    const matches = wildcardCount
      ? canFormWordWithWildcards(inputFreq, normalizedWord, wildcardCount)
      : canFormWord(inputFreq, normalizedWord);
    if (matches) results.push(word);
  }

  return results;
}

// Find words that can be made from some or all of the supplied letters.
export function findWordsFromLetters(input: string, dictionary: Set<string>): string[] {
  const matchesRack = createWordFromLettersMatcher(input);
  const results: string[] = [];

  for (const word of dictionary) {
    if (matchesRack(word)) results.push(word);
  }

  return results;
}

export function canBuildWordFromLetters(input: string, word: string): boolean {
  return createWordFromLettersMatcher(input)(word);
}

export function createWordFromLettersMatcher(input: string): (word: string) => boolean {
  const normalizedInput = normalizeLetters(input);
  const wildcardCount = countWildcards(input);
  const inputFrequency = getCharFrequency(normalizedInput);

  return (word: string) => {
    const normalizedWord = normalizeLetters(word);
    return (
      normalizedWord.length <= normalizedInput.length + wildcardCount &&
      canFormWordWithWildcards(inputFrequency, normalizedWord, wildcardCount)
    );
  };
}

function countWildcards(input: string): number {
  return [...input].filter(
    (character) => character === '?' || character === '*'
  ).length;
}

function canFormWordWithWildcards(
  inputFreq: Map<string, number>,
  word: string,
  wildcardCount: number
): boolean {
  let wildcardsNeeded = 0;
  for (const [char, count] of getCharFrequency(word)) {
    wildcardsNeeded += Math.max(0, count - (inputFreq.get(char) || 0));
    if (wildcardsNeeded > wildcardCount) return false;
  }
  return true;
}

export function normalizeLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

// Get character frequency map
function getCharFrequency(str: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  return freq;
}

// Check if word can be formed from input letters
function canFormWord(inputFreq: Map<string, number>, word: string): boolean {
  const wordFreq = getCharFrequency(word);

  for (const [char, count] of wordFreq) {
    const available = inputFreq.get(char) || 0;
    if (available < count) {
      return false;
    }
  }

  return true;
}

// Sort results by multiple criteria
export function sortResults(
  words: string[],
  sortBy: 'length' | 'alphabetical' | 'score' | 'wwf' = 'length'
): string[] {
  const sorted = [...words];

  switch (sortBy) {
    case 'length':
      return sorted.sort((a, b) => b.length - a.length);
    case 'alphabetical':
      return sorted.sort();
    case 'score':
      return sorted.sort((a, b) => calculateScore(b) - calculateScore(a) || a.localeCompare(b));
    case 'wwf':
      return sorted.sort(
        (a, b) => calculateWwfStyleScore(b) - calculateWwfStyleScore(a) || a.localeCompare(b),
      );
    default:
      return sorted;
  }
}

const LETTER_SCORES: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
  m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
  y: 4, z: 10,
};

// Commonly published Words With Friends face values. Used only for sorting.
const WWF_STYLE_SCORES: Record<string, number> = {
  a: 1, b: 4, c: 4, d: 2, e: 1, f: 4, g: 3, h: 3, i: 1, j: 10, k: 5, l: 2,
  m: 4, n: 2, o: 1, p: 4, q: 10, r: 1, s: 1, t: 1, u: 2, v: 5, w: 4, x: 8,
  y: 3, z: 10,
};

function sumFaceScore(word: string, table: Record<string, number>): number {
  return normalizeLetters(word)
    .split('')
    .reduce((sum, char) => sum + (table[char] || 0), 0);
}

function scoreRack(word: string, rack: string, table: Record<string, number>): number {
  const available = getCharFrequency(normalizeLetters(rack));
  let blanks = [...rack].filter((character) => character === '?' || character === '*').length;
  let score = 0;

  for (const character of normalizeLetters(word)) {
    const count = available.get(character) || 0;
    if (count > 0) {
      available.set(character, count - 1);
      score += table[character] || 0;
    } else if (blanks > 0) {
      blanks--;
    }
  }

  return score;
}

// Calculate a Scrabble-style face-value score without board multipliers.
export function calculateScore(word: string): number {
  return sumFaceScore(word, LETTER_SCORES);
}

// Words With Friends–style face values, without board multipliers.
export function calculateWwfStyleScore(word: string): number {
  return sumFaceScore(word, WWF_STYLE_SCORES);
}

// Score a word against a rack, where letters represented by blank tiles score zero.
export function calculateRackScore(word: string, rack: string): number {
  return scoreRack(word, rack, LETTER_SCORES);
}

export function calculateWwfStyleRackScore(word: string, rack: string): number {
  return scoreRack(word, rack, WWF_STYLE_SCORES);
}

// Handle wildcard pattern matching (? = any letter)
export function findWithWildcards(
  pattern: string,
  dictionary: Set<string>
): string[] {
  const results: string[] = [];
  const normalizedPattern = pattern.toLowerCase();

  for (const word of dictionary) {
    const normalizedWord = word.toLowerCase();
    if (
      normalizedWord.length === normalizedPattern.length &&
      [...normalizedPattern].every(
        (character, index) => character === '?' || character === normalizedWord[index]
      )
    ) {
      results.push(word);
    }
  }

  return results;
}

export type PhraseWordCount = 2 | 3 | 4;
export type MultiWordStopReason = 'result-limit' | 'search-budget' | 'time-limit';

export function parsePhraseWords(value: string): string[] {
  return [...new Set(value.toLowerCase().split(/[^a-z]+/).filter(Boolean))];
}

export type MultiWordSearchOptions = {
  maxResults?: number;
  minWordLength?: number;
  exactWordCount?: number;
  requiredWord?: string;
  excludedWords?: string[];
  maxSearchStates?: number;
  timeLimitMs?: number;
};

export type MultiWordSearchOutcome = {
  results: string[][];
  truncated: boolean;
  stopReason?: MultiWordStopReason;
  visitedStates: number;
};

export function findMultiWordAnagrams(
  input: string,
  dictionary: Set<string>,
  maxWords: number = 3,
  options?: MultiWordSearchOptions
): string[][] {
  return searchMultiWordAnagrams(input, dictionary, maxWords, options).results;
}

// Find multi-word anagrams with explicit work and time budgets.
export function searchMultiWordAnagrams(
  input: string,
  dictionary: Set<string>,
  maxWords: number = 3,
  options?: MultiWordSearchOptions
): MultiWordSearchOutcome {
  // Prefilter candidates, use compact counts, and stop at explicit budgets.
  const maxResults = options?.maxResults ?? 200;
  const minLen = options?.minWordLength ?? 2;
  const maxSearchStates = options?.maxSearchStates ?? 50_000;
  const timeLimitMs = options?.timeLimitMs ?? 1_500;
  const deadline = Date.now() + timeLimitMs;
  const requiredWord = options?.requiredWord
    ? normalizeLetters(options.requiredWord)
    : '';
  const excludedWords = new Set(
    (options?.excludedWords ?? []).map((word) => normalizeLetters(word)).filter(Boolean)
  );

  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const n = letters.length;
  if (n === 0) {
    return { results: [], truncated: false, visitedStates: 0 };
  }

  // Map 'a'..'z' to 0..25
  const makeCounts = (s: string): number[] => {
    const arr = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
      if (code >= 97 && code <= 122) arr[code - 97]++;
    }
    return arr;
  };
  const canSubtract = (left: number[], take: number[]): boolean => {
    for (let i = 0; i < 26; i++) if (take[i] > left[i]) return false;
    return true;
  };
  const subtractInPlace = (left: number[], take: number[]): void => {
    for (let i = 0; i < 26; i++) left[i] -= take[i];
  };
  const addInPlace = (left: number[], add: number[]): void => {
    for (let i = 0; i < 26; i++) left[i] += add[i];
  };
  const remainingLen = (cnt: number[]): number => cnt.reduce((s, v) => s + v, 0);
  const inputCnt = makeCounts(letters);

  if (
    requiredWord &&
    (requiredWord.length < minLen ||
      requiredWord.length > n ||
      excludedWords.has(requiredWord) ||
      !dictionary.has(requiredWord) ||
      !canSubtract(inputCnt, makeCounts(requiredWord)))
  ) {
    return { results: [], truncated: false, visitedStates: 0 };
  }

  // Prefilter dictionary to only words buildable from input and >= minLen and <= total length
  const candidates: { word: string; cnt: number[]; len: number }[] = [];
  for (const w of dictionary) {
    const word = w.toLowerCase();
    if (word.length < minLen || word.length > n) continue;
    if (excludedWords.has(word)) continue;
    // quick skip non a-z
    if (!/^[a-z]+$/.test(word)) continue;
    const cnt = makeCounts(word);
    if (canSubtract(inputCnt, cnt)) candidates.push({ word, cnt, len: word.length });
  }

  // Sort longer words first to reduce branching and finish sooner
  candidates.sort((a, b) => b.len - a.len || (a.word < b.word ? -1 : 1));
  const candidateLengths = new Set(candidates.map((candidate) => candidate.len));

  const results: string[][] = [];
  let stopReason: MultiWordStopReason | undefined;
  let visitedStates = 0;

  function dfs(startIdx: number, rem: number[], chosen: string[]) {
    if (stopReason) return;

    visitedStates++;
    if (visitedStates >= maxSearchStates) {
      stopReason = 'search-budget';
      return;
    }
    if (Date.now() >= deadline) {
      stopReason = 'time-limit';
      return;
    }
    if (results.length >= maxResults) {
      stopReason = 'result-limit';
      return;
    }

    const remLen = remainingLen(rem);
    const slotsLeft = maxWords - chosen.length;
    if (remLen === 0) {
      if (
        chosen.length > 0 &&
        (!options?.exactWordCount || chosen.length === options.exactWordCount) &&
        (!requiredWord || chosen.includes(requiredWord))
      ) {
        results.push(
          [...chosen].sort((a, b) => b.length - a.length || a.localeCompare(b))
        );
      }
      return;
    }
    if (slotsLeft <= 0 || remLen < slotsLeft * minLen) return;
    if (slotsLeft === 1 && !candidateLengths.has(remLen)) return;

    for (let i = startIdx; i < candidates.length; i++) {
      if ((i & 255) === 0 && Date.now() >= deadline) {
        stopReason = 'time-limit';
        return;
      }
      const c = candidates[i];
      // simple pruning: if word longer than remaining, skip
      if (c.len > remLen) continue;
      const nextSlots = slotsLeft - 1;
      const nextRem = remLen - c.len;
      if (nextSlots === 0 && nextRem !== 0) continue;
      if (nextRem < nextSlots * minLen) continue;
      if (!canSubtract(rem, c.cnt)) continue;

      subtractInPlace(rem, c.cnt);
      chosen.push(c.word);
      // allow reuse of words by starting from i (not i+1); to avoid permutations, keep non-decreasing index
      dfs(i, rem, chosen);
      chosen.pop();
      addInPlace(rem, c.cnt);

      if (stopReason) return;
    }
  }

  const initialRemainder = inputCnt.slice();
  const initialWords: string[] = [];
  if (requiredWord) {
    subtractInPlace(initialRemainder, makeCounts(requiredWord));
    initialWords.push(requiredWord);
  }

  dfs(0, initialRemainder, initialWords);
  return {
    results,
    truncated: Boolean(stopReason),
    stopReason,
    visitedStates,
  };
}
