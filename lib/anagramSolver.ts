/**
 * Anagram Solver Library
 * Core algorithms for finding anagrams from given letters
 */

// Find anagrams using character frequency matching (more efficient)
export function findAnagrams(input: string, dictionary: Set<string>): string[] {
  const inputFreq = getCharFrequency(input);
  const results: string[] = [];

  for (const word of dictionary) {
    if (canFormWord(inputFreq, word)) {
      results.push(word);
    }
  }

  return results;
}

// Get character frequency map
function getCharFrequency(str: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const char of str.toLowerCase()) {
    if (char !== ' ') {
      freq.set(char, (freq.get(char) || 0) + 1);
    }
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
  sortBy: 'length' | 'alphabetical' | 'score' = 'length'
): string[] {
  const sorted = [...words];

  switch (sortBy) {
    case 'length':
      return sorted.sort((a, b) => b.length - a.length);
    case 'alphabetical':
      return sorted.sort();
    case 'score':
      return sorted.sort((a, b) => calculateScore(b) - calculateScore(a));
    default:
      return sorted;
  }
}

// Calculate Scrabble-like score for a word
export function calculateScore(word: string): number {
  const scores: { [key: string]: number } = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
    m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
    y: 4, z: 10,
  };

  return word
    .toLowerCase()
    .split('')
    .reduce((sum, char) => sum + (scores[char] || 0), 0);
}

// Handle wildcard pattern matching (? = any letter)
export function findWithWildcards(
  pattern: string,
  dictionary: Set<string>
): string[] {
  const results: string[] = [];
  const regex = new RegExp(`^${pattern.replace(/\?/g, '.')}$`, 'i');

  for (const word of dictionary) {
    if (regex.test(word)) {
      results.push(word);
    }
  }

  return results;
}

// Find multi-word anagrams
export function findMultiWordAnagrams(
  input: string,
  dictionary: Set<string>,
  maxWords: number = 3,
  options?: { maxResults?: number; minWordLength?: number }
): string[][] {
  // Faster implementation: prefilter candidates, use arrays for counts, memoize states, stop after a cap
  const maxResults = options?.maxResults ?? 200;
  const minLen = options?.minWordLength ?? 2;

  const letters = input.toLowerCase().replace(/\s+/g, '');
  const n = letters.length;
  if (n === 0) return [];

  // Map 'a'..'z' to 0..25
  const toIdx = (c: string) => c.charCodeAt(0) - 97;
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
  const keyOf = (cnt: number[]): string => cnt.join(',');

  const inputCnt = makeCounts(letters);

  // Prefilter dictionary to only words buildable from input and >= minLen and <= total length
  const candidates: { word: string; cnt: number[]; len: number }[] = [];
  for (const w of dictionary) {
    const word = w.toLowerCase();
    if (word.length < minLen || word.length > n) continue;
    // quick skip non a-z
    if (!/^[a-z]+$/.test(word)) continue;
    const cnt = makeCounts(word);
    if (canSubtract(inputCnt, cnt)) candidates.push({ word, cnt, len: word.length });
  }

  // Sort longer words first to reduce branching and finish sooner
  candidates.sort((a, b) => b.len - a.len || (a.word < b.word ? -1 : 1));

  const results: string[][] = [];
  const memo = new Set<string>();

  function dfs(startIdx: number, rem: number[], chosen: string[]) {
    if (results.length >= maxResults) return; // stop early

    const remLen = remainingLen(rem);
    if (remLen === 0) {
      if (chosen.length > 0) results.push([...chosen]);
      return;
    }
    if (chosen.length === maxWords) return;

    const memoKey = chosen.length + '|' + keyOf(rem) + '|' + startIdx;
    if (memo.has(memoKey)) return;
    memo.add(memoKey);

    for (let i = startIdx; i < candidates.length; i++) {
      const c = candidates[i];
      // simple pruning: if word longer than remaining, skip
      if (c.len > remLen) continue;
      if (!canSubtract(rem, c.cnt)) continue;

      subtractInPlace(rem, c.cnt);
      chosen.push(c.word);
      // allow reuse of words by starting from i (not i+1); to avoid permutations, keep non-decreasing index
      dfs(i, rem, chosen);
      chosen.pop();
      addInPlace(rem, c.cnt);

      if (results.length >= maxResults) return;
    }
  }

  dfs(0, inputCnt.slice(), []);
  return results;
}

// Input validation
export function validateInput(input: string): { valid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: 'Please enter at least one letter' };
  }

  if (input.length > 20) {
    return { valid: false, error: 'Maximum 20 letters allowed' };
  }

  return { valid: true };
}

// Permutation generator for word solving (for smaller inputs)
export function generatePermutations(str: string): Set<string> {
  const result = new Set<string>();

  if (str.length === 0) {
    result.add('');
    return result;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const perms = generatePermutations(remaining);

    for (const perm of perms) {
      result.add(char + perm);
    }
  }

  return result;
}

// Filter permutations that are valid English words
export function filterValidWords(
  permutations: Set<string>,
  dictionary: Set<string>
): string[] {
  const validWords: string[] = [];

  for (const word of permutations) {
    if (dictionary.has(word.toLowerCase())) {
      validWords.push(word.toLowerCase());
    }
  }

  return [...new Set(validWords)]; // Remove duplicates
}
