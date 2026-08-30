import {
  calculateRackScore,
  createWordFromLettersMatcher,
  findAnagrams,
  findWithWildcards,
  findWordsFromLetters,
  normalizeLetters,
  searchMultiWordAnagrams,
  sortResults,
  type MultiWordSearchOptions,
  type MultiWordSearchOutcome,
} from './anagramSolver';

export type WordSort = 'length' | 'alphabetical' | 'score';
export type WordSearchOperation = 'anagrams' | 'pattern' | 'scrabble' | 'words';

export type WordSearchRequest = {
  operation: WordSearchOperation;
  input: string;
  sortBy: WordSort;
  limit?: number;
  minLength?: number;
  maxLength?: number;
  prefix?: string;
  suffix?: string;
};

export type WordSearchOutcome = {
  words: string[];
  total: number;
  truncated: boolean;
};

export function getRackPlacement(
  word: string,
  prefixInput = '',
  suffixInput = ''
): string | null {
  const prefix = normalizeLetters(prefixInput);
  const suffix = normalizeLetters(suffixInput);
  const normalizedWord = normalizeLetters(word);

  if (
    normalizedWord.length < prefix.length + suffix.length ||
    !normalizedWord.startsWith(prefix) ||
    !normalizedWord.endsWith(suffix)
  ) {
    return null;
  }

  const placedEnd = suffix.length
    ? normalizedWord.length - suffix.length
    : normalizedWord.length;
  return normalizedWord.slice(prefix.length, placedEnd);
}

export function runWordSearch(
  dictionary: Set<string>,
  request: WordSearchRequest
): WordSearchOutcome {
  const limit = Math.max(1, request.limit ?? 500);
  const minLength = Math.max(1, request.minLength ?? 1);
  const maxLength = Math.max(minLength, request.maxLength ?? Number.POSITIVE_INFINITY);
  const prefix = normalizeLetters(request.prefix ?? '');
  const suffix = normalizeLetters(request.suffix ?? '');
  const matchesRack = createWordFromLettersMatcher(request.input);

  let words: string[];
  switch (request.operation) {
    case 'anagrams':
      words = findAnagrams(request.input, dictionary);
      break;
    case 'pattern':
      words = findWithWildcards(request.input, dictionary);
      break;
    case 'scrabble':
      words = Array.from(dictionary).filter((word) => {
        const placedLetters = getRackPlacement(word, prefix, suffix);
        return Boolean(
          placedLetters && matchesRack(placedLetters)
        );
      });
      break;
    case 'words':
      words = findWordsFromLetters(request.input, dictionary);
      break;
  }

  words = words.filter(
    (word) =>
      word.length >= minLength &&
      word.length <= maxLength &&
      (!prefix || word.startsWith(prefix)) &&
      (!suffix || word.endsWith(suffix))
  );

  const sorted =
    request.operation === 'scrabble' && request.sortBy === 'score'
      ? [...words].sort(
          (a, b) =>
            calculateRackScore(
              getRackPlacement(b, prefix, suffix) ?? b,
              request.input
            ) -
              calculateRackScore(
                getRackPlacement(a, prefix, suffix) ?? a,
                request.input
              ) ||
            a.localeCompare(b)
        )
      : sortResults(words, request.sortBy);
  return {
    words: sorted.slice(0, limit),
    total: sorted.length,
    truncated: sorted.length > limit,
  };
}

export function runMultiWordSearch(
  dictionary: Set<string>,
  input: string,
  wordCount: 2 | 3,
  options: MultiWordSearchOptions
): MultiWordSearchOutcome {
  return searchMultiWordAnagrams(input, dictionary, wordCount, {
    ...options,
    exactWordCount: wordCount,
  });
}
