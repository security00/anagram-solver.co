/**
 * Word Loader for Large Dictionary Files
 * Handles loading and processing of the words_alpha.txt file
 */

let wordsAlphaCache: Set<string> | null = null;
let loadingPromise: Promise<Set<string>> | null = null;

/**
 * Load words from the words_alpha.txt file
 * This function handles the large dictionary file efficiently
 */
export async function loadWordsAlpha(): Promise<Set<string>> {
  // Return cached version if available
  if (wordsAlphaCache) {
    return wordsAlphaCache;
  }

  // Return existing promise if already loading
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading process
  loadingPromise = loadWordsFromFile();
  wordsAlphaCache = await loadingPromise;
  loadingPromise = null;

  return wordsAlphaCache;
}

/**
 * Internal function to load words from file
 */
async function loadWordsFromFile(): Promise<Set<string>> {
  try {
    // In a Next.js environment, we need to fetch the file from the public directory
    // or use a different approach for server-side loading

    if (typeof window !== 'undefined') {
      // Client-side loading: serve from /public to be accessible in the browser
      // Note: the file should exist at public/words_alpha.txt
      const response = await fetch('/words_alpha.txt');
      if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.status}`);
      }
      const text = await response.text();
      return processWordText(text);
    } else {
      // Server-side loading
      const fs = await import('fs');
      const path = await import('path');

      const filePath = path.join(process.cwd(), 'lib', 'words_alpha.txt');
      const text = fs.readFileSync(filePath, 'utf-8');
      return processWordText(text);
    }
  } catch (error) {
    console.error('Error loading words_alpha.txt:', error);
    // Fallback to empty set if file loading fails
    return new Set<string>();
  }
}

/**
 * Process the raw text content into a Set of words
 */
function processWordText(text: string): Set<string> {
  const words = text
    .split('\n')
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0 && /^[a-z]+$/.test(word)); // Only alphabetic words

  return new Set(words);
}

/**
 * Get word count from the loaded dictionary
 */
export function getWordCount(): number {
  return wordsAlphaCache ? wordsAlphaCache.size : 0;
}

/**
 * Check if a word exists in the dictionary
 */
export function hasWord(word: string): boolean {
  if (!wordsAlphaCache) {
    return false;
  }
  return wordsAlphaCache.has(word.toLowerCase());
}

/**
 * Get words by length range
 */
export function getWordsByLength(minLength: number, maxLength: number): string[] {
  if (!wordsAlphaCache) {
    return [];
  }

  return Array.from(wordsAlphaCache).filter(
    word => word.length >= minLength && word.length <= maxLength
  );
}

/**
 * Get words starting with specific letters
 */
export function getWordsStartingWith(prefix: string): string[] {
  if (!wordsAlphaCache) {
    return [];
  }

  const lowerPrefix = prefix.toLowerCase();
  return Array.from(wordsAlphaCache).filter(
    word => word.startsWith(lowerPrefix)
  );
}

/**
 * Clear the cache (useful for testing or memory management)
 */
export function clearCache(): void {
  wordsAlphaCache = null;
  loadingPromise = null;
}
