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
  maxWords: number = 3
): string[][] {
  const inputFreq = getCharFrequency(input);
  const results: string[][] = [];

  function backtrack(
    remaining: Map<string, number>,
    currentWords: string[],
    depth: number
  ) {
    if (depth === 0) {
      // Check if all letters are used
      let allUsed = true;
      for (const count of remaining.values()) {
        if (count > 0) {
          allUsed = false;
          break;
        }
      }
      if (allUsed && currentWords.length > 0) {
        results.push([...currentWords]);
      }
      return;
    }

    for (const word of dictionary) {
      const wordFreq = getCharFrequency(word);
      let canUse = true;

      for (const [char, count] of wordFreq) {
        if ((remaining.get(char) || 0) < count) {
          canUse = false;
          break;
        }
      }

      if (canUse) {
        const newRemaining = new Map(remaining);
        for (const [char, count] of wordFreq) {
          newRemaining.set(char, (newRemaining.get(char) || 0) - count);
        }

        currentWords.push(word);
        backtrack(newRemaining, currentWords, depth - 1);
        currentWords.pop();
      }
    }
  }

  backtrack(new Map(inputFreq), [], maxWords);
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