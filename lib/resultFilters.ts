import { calculateScore, calculateWwfStyleScore } from './anagramSolver';
import type { WordSort } from './solverEngine';

export type ResultFilters = {
  starts: string;
  ends: string;
  contains: string;
  minLength: string;
  maxLength: string;
};

export const emptyResultFilters: ResultFilters = {
  starts: '',
  ends: '',
  contains: '',
  minLength: '',
  maxLength: '',
};

function clean(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

export function filtersActive(filters: ResultFilters) {
  return Object.values(filters).some((value) => value.trim() !== '');
}

export function applyResultFilters(words: string[], filters: ResultFilters): string[] {
  const starts = clean(filters.starts);
  const ends = clean(filters.ends);
  const contains = clean(filters.contains);
  const min = filters.minLength.trim() === '' ? null : Number(filters.minLength);
  const max = filters.maxLength.trim() === '' ? null : Number(filters.maxLength);

  return words.filter((word) => {
    if (starts && !word.startsWith(starts)) return false;
    if (ends && !word.endsWith(ends)) return false;
    if (contains && !word.includes(contains)) return false;
    if (min !== null && Number.isFinite(min) && word.length < min) return false;
    if (max !== null && Number.isFinite(max) && word.length > max) return false;
    return true;
  });
}

function sortWithinGroup(words: string[], sortBy: WordSort) {
  const sorted = [...words];
  if (sortBy === 'score') {
    sorted.sort((a, b) => calculateScore(b) - calculateScore(a) || a.localeCompare(b));
  } else if (sortBy === 'wwf') {
    sorted.sort((a, b) => calculateWwfStyleScore(b) - calculateWwfStyleScore(a) || a.localeCompare(b));
  } else {
    sorted.sort((a, b) => a.localeCompare(b));
  }
  return sorted;
}

export function groupWordsByLength(words: string[], sortBy: WordSort) {
  const groups = new Map<number, string[]>();
  for (const word of words) {
    const list = groups.get(word.length);
    if (list) list.push(word);
    else groups.set(word.length, [word]);
  }

  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([length, list]) => ({
      length,
      words: sortWithinGroup(list, sortBy),
    }));
}
