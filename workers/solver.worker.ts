/// <reference lib="webworker" />

import {
  getDictionaryUrl,
  processWordText,
  type DictionaryType,
  type WordListType,
} from '../lib/dictionaryData';
import { runMultiWordSearch, runWordSearch } from '../lib/solverEngine';
import type { SolverProgressMessage, SolverWorkerRequest, SolverWorkerResponse } from '../lib/solverProtocol';

const dictionaryCache = new Map<WordListType, Set<string>>();
const dictionaryLoads = new Map<WordListType, Promise<Set<string>>>();
const mergedCache = new Map<string, Set<string>>();

const APPROX_BYTES: Record<WordListType, number> = {
  common: 345_000,
  full: 1_400_000,
  names: 32_000,
};

async function readDictionaryText(
  response: Response,
  type: WordListType,
  onProgress?: (loaded: number, total: number) => void,
): Promise<string> {
  const headerTotal = Number(response.headers.get('content-length'));
  const total = Number.isFinite(headerTotal) && headerTotal > 0 ? headerTotal : APPROX_BYTES[type];
  if (!response.body) {
    const text = await response.text();
    onProgress?.(new TextEncoder().encode(text).byteLength, total);
    return text;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress?.(loaded, total);
  }

  const merged = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

async function loadWordList(
  type: WordListType,
  onProgress?: (loaded: number, total: number) => void,
): Promise<Set<string>> {
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
      return processWordText(await readDictionaryText(response, type, onProgress));
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
    const report = (loaded: number, total: number) => {
      const progress: SolverProgressMessage = {
        dictionaryType: query.dictionaryType,
        id,
        kind: 'progress',
        loadedBytes: loaded,
        phase: 'loading',
        totalBytes: total,
      };
      self.postMessage(progress);
    };
    const dictionary =
      query.kind === 'words'
        ? await loadWordList(query.dictionaryType, report)
        : await loadSearchDictionary(query.dictionaryType, query.includeNames);
    const searching: SolverProgressMessage = {
      dictionaryType: query.dictionaryType,
      id,
      kind: 'progress',
      loadedBytes: 0,
      phase: 'searching',
      totalBytes: null,
    };
    self.postMessage(searching);
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
