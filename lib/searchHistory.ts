const STORAGE_PREFIX = 'anagram-recent:';
const MAX_ITEMS = 6;

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readRecentSearches(bucket: string): string[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${bucket}`);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export function rememberSearch(bucket: string, query: string): string[] {
  const cleaned = query.trim().replace(/\s+/g, ' ');
  const current = readRecentSearches(bucket);
  if (!cleaned || !canUseStorage()) return current;

  const next = [
    cleaned,
    ...current.filter((item) => item.toLowerCase() !== cleaned.toLowerCase()),
  ].slice(0, MAX_ITEMS);

  window.localStorage.setItem(`${STORAGE_PREFIX}${bucket}`, JSON.stringify(next));
  return next;
}
