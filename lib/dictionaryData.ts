export type DictionaryType = 'common' | 'full';

export function getDictionaryUrl(type: DictionaryType): string {
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
