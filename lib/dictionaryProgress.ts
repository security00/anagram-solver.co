export function formatByteSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.max(0, Math.round(bytes / 1000))} KB`;
}

export function dictionaryStatusLabel(
  phase: 'loading' | 'searching',
  dictionaryType: string,
  loadedBytes: number,
): string {
  if (phase === 'searching') return 'Searching…';
  if (dictionaryType === 'full') {
    return `Loading Extended dictionary… ${formatByteSize(loadedBytes)} / ~1.4 MB`;
  }
  return 'Loading dictionary…';
}

export function prefetchWordList(type: 'common' | 'full') {
  if (typeof document === 'undefined') return;
  const href = `/dictionaries/${type}.txt`;
  if (document.head.querySelector(`link[data-dict-prefetch="${type}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'fetch';
  link.href = href;
  link.dataset.dictPrefetch = type;
  document.head.appendChild(link);
}
