import {
  loadDictionary,
  type DictionaryType,
} from './wordLoader';

export type { DictionaryType } from './wordLoader';

export function getAvailableDictionaries(): DictionaryType[] {
  return ['common', 'full'];
}

export function getDictionaryAsync(type: DictionaryType): Promise<Set<string>> {
  return loadDictionary(type);
}
