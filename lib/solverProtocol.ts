import type {
  MultiWordSearchOptions,
  MultiWordSearchOutcome,
  PhraseWordCount,
} from './anagramSolver';
import type { DictionaryType } from './dictionaryData';
import type { WordSearchOutcome, WordSearchRequest } from './solverEngine';

export type SolverQuery =
  | {
      dictionaryType: DictionaryType;
      kind: 'words';
      request: WordSearchRequest;
    }
  | {
      dictionaryType: DictionaryType;
      includeNames?: boolean;
      input: string;
      kind: 'multi';
      options: MultiWordSearchOptions;
      wordCount: PhraseWordCount;
    };

export type SolverQueryOutcome = WordSearchOutcome | MultiWordSearchOutcome;

export type SolverWorkerRequest = {
  id: number;
  query: SolverQuery;
};

export type SolverWorkerResponse =
  | {
      dictionarySize: number;
      elapsedMs: number;
      id: number;
      ok: true;
      outcome: SolverQueryOutcome;
    }
  | {
      error: string;
      id: number;
      ok: false;
    };
