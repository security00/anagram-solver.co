import {
  getDictionaryUrl,
  processWordText,
  type DictionaryType,
} from './dictionaryData';

export { getDictionaryUrl, processWordText, type DictionaryType } from './dictionaryData';

const dictionaryCache = new Map<DictionaryType, Set<string>>();
const loadingPromises = new Map<DictionaryType, Promise<Set<string>>>();

export async function loadDictionary(type: DictionaryType): Promise<Set<string>> {
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
        return loadDictionary('common');
      }
      throw error;
    })
    .finally(() => {
      loadingPromises.delete(type);
    });

  loadingPromises.set(type, loading);
  return loading;
}

async function loadDictionaryFile(type: DictionaryType): Promise<Set<string>> {
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

export function getLoadedWordCount(type: DictionaryType): number {
  return dictionaryCache.get(type)?.size ?? 0;
}

export function clearDictionaryCache(): void {
  dictionaryCache.clear();
  loadingPromises.clear();
}
