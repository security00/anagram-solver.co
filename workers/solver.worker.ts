/// <reference lib="webworker" />

import {
  getDictionaryUrl,
  processWordText,
  type DictionaryType,
  type WordListType,
} from '../lib/dictionaryData';
import { runMultiWordSearch, runWordSearch } from '../lib/solverEngine';
import type { SolverWorkerRequest, SolverWorkerResponse } from '../lib/solverProtocol';

const dictionaryCache = new Map<WordListType, Set<string>>();
const dictionaryLoads = new Map<WordListType, Promise<Set<string>>>();
const mergedCache = new Map<string, Set<string>>();

async function loadWordList(type: WordListType): Promise<Set<string>> {
  const cached = dictionaryCache.get(type);
  if (cached) return cached;

  const inFlight = dictionaryLoads.get(type);
  if (inFlight) return inFlight;

  const dictionaryUrl = new URL(getDictionaryUrl(type), self.location.origin);
  const loading = fetch(dictionaryUrl, { cache: 'force-cache' })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${type} dictionary (${response.status}).`);
      }
      return processWordText(await response.text());
    })
    .then((dictionary) => {
      dictionaryCache.set(type, dictionary);
      return dictionary;
    })
    .catch(async (error) => {
      if (type === 'full') return loadWordList('common');
      throw error;
    })
    .finally(() => {
      dictionaryLoads.delete(type);
    });

  dictionaryLoads.set(type, loading);
  return loading;
}

async function loadSearchDictionary(
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

self.addEventListener('message', async (event: MessageEvent<SolverWorkerRequest>) => {
  const { id, query } = event.data;

  try {
    const startedAt = performance.now();
    const dictionary =
      query.kind === 'words'
        ? await loadWordList(query.dictionaryType)
        : await loadSearchDictionary(query.dictionaryType, query.includeNames);
    const outcome =
      query.kind === 'words'
        ? runWordSearch(dictionary, query.request)
        : runMultiWordSearch(
            dictionary,
            query.input,
            query.wordCount,
            query.options
          );

    const response: SolverWorkerResponse = {
      dictionarySize: dictionary.size,
      elapsedMs: Math.round(performance.now() - startedAt),
      id,
      ok: true,
      outcome,
    };
    self.postMessage(response);
  } catch (error) {
    const response: SolverWorkerResponse = {
      error: error instanceof Error ? error.message : 'Unknown solver error.',
      id,
      ok: false,
    };
    self.postMessage(response);
  }
});

export {};
