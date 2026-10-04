import {
  getDictionaryUrl,
  processWordText,
  type DictionaryType,
  type WordListType,
} from './dictionaryData';

export {
  getDictionaryUrl,
  processWordText,
  type DictionaryType,
  type WordListType,
} from './dictionaryData';

const dictionaryCache = new Map<WordListType, Set<string>>();
const loadingPromises = new Map<WordListType, Promise<Set<string>>>();
const mergedCache = new Map<string, Set<string>>();

export async function loadDictionary(type: DictionaryType): Promise<Set<string>> {
  return loadWordList(type);
}

export async function loadWordList(type: WordListType): Promise<Set<string>> {
  const cached = dictionaryCache.get(type);
  if (cached) return cached;

  const inFlight = loadingPromises.get(type);
  if (inFlight) return inFlight;

  const loading = loadDictionaryFile(type)
    .then((dictionary) => {
      dictionaryCache.set(type, dictionary);
      return dictionary;
    })
    .catch(async (error) => {
      if (type === 'full') {
        return loadWordList('common');
      }
      throw error;
    })
    .finally(() => {
      loadingPromises.delete(type);
    });

  loadingPromises.set(type, loading);
  return loading;
}

export async function loadSearchDictionary(
  type: DictionaryType,
  includeNames = false
): Promise<Set<string>> {
  if (!includeNames) return loadWordList(type);

  const cacheKey = `${type}+names`;
  const cached = mergedCache.get(cacheKey);
  if (cached) return cached;

  const [base, names] = await Promise.all([loadWordList(type), loadWordList('names')]);
  const merged = new Set(base);
  for (const word of names) merged.add(word);
  mergedCache.set(cacheKey, merged);
  return merged;
}

async function loadDictionaryFile(type: WordListType): Promise<Set<string>> {
  let text: string;

  if (typeof window !== 'undefined') {
    const response = await fetch(getDictionaryUrl(type), { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error(`Failed to load ${type} dictionary: ${response.status}`);
    }
    text = await response.text();
  } else {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    text = await fs.readFile(
      path.join(process.cwd(), 'public', 'dictionaries', `${type}.txt`),
      'utf8'
    );
  }

  return processWordText(text);
}

export function getLoadedWordCount(type: WordListType): number {
  return dictionaryCache.get(type)?.size ?? 0;
}

export function clearDictionaryCache(): void {
  dictionaryCache.clear();
  loadingPromises.clear();
  mergedCache.clear();
}
