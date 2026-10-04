export type DictionaryType = 'common' | 'full';
export type WordListType = DictionaryType | 'names';

export function getDictionaryUrl(type: WordListType): string {
  return `/dictionaries/${type}.txt`;
}

export function processWordText(text: string): Set<string> {
  return new Set(
    text
      .split(/\r?\n/)
      .map((word) => word.trim().toLowerCase())
      .filter((word) => /^[a-z]+$/.test(word))
  );
}
