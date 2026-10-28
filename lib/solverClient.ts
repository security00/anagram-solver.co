'use client';

import type { MultiWordSearchOutcome } from './anagramSolver';
import type { WordSearchOutcome } from './solverEngine';
import type {
  SolverProgressMessage,
  SolverQuery,
  SolverQueryOutcome,
  SolverWorkerRequest,
  SolverWorkerResponse,
} from './solverProtocol';

type PendingRequest = {
  onProgress?: (message: SolverProgressMessage) => void;
  reject: (error: Error) => void;
  resolve: (value: SolverQueryOutcome) => void;
  timeout: ReturnType<typeof setTimeout>;
};

const pendingRequests = new Map<number, PendingRequest>();
let nextRequestId = 1;
let solverWorker: Worker | null = null;

function isProgress(
  message: SolverWorkerResponse | SolverProgressMessage,
): message is SolverProgressMessage {
  return 'kind' in message && message.kind === 'progress';
}

function rejectAll(error: Error): void {
  for (const pending of pendingRequests.values()) {
    clearTimeout(pending.timeout);
    pending.reject(error);
  }
  pendingRequests.clear();
}

function resetWorker(error?: Error): void {
  solverWorker?.terminate();
  solverWorker = null;
  if (error) rejectAll(error);
}

function getWorker(): Worker {
  if (solverWorker) return solverWorker;
  if (typeof Worker === 'undefined') {
    throw new Error('This browser does not support background word searches.');
  }

  solverWorker = new Worker(new URL('../workers/solver.worker.ts', import.meta.url), {
    name: 'anagram-solver',
    type: 'module',
  });

  solverWorker.addEventListener('message', (event: MessageEvent<SolverWorkerResponse | SolverProgressMessage>) => {
    const response = event.data;
    if (isProgress(response)) {
      pendingRequests.get(response.id)?.onProgress?.(response);
      return;
    }
    const pending = pendingRequests.get(response.id);
    if (!pending) return;

    clearTimeout(pending.timeout);
    pendingRequests.delete(response.id);
    if (response.ok) {
      pending.resolve(response.outcome);
    } else {
      pending.reject(new Error(response.error));
    }
  });

  solverWorker.addEventListener('error', () => {
    resetWorker(new Error('The background solver stopped unexpectedly. Please try again.'));
  });

  return solverWorker;
}

export function runSolverQuery<T extends SolverQueryOutcome>(
  query: SolverQuery,
  onProgress?: (message: SolverProgressMessage) => void,
): Promise<T> {
  const worker = getWorker();
  const id = nextRequestId++;

  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      resetWorker(new Error('The search took too long and was cancelled.'));
      reject(new Error('The search took too long and was cancelled.'));
    }, 30_000);

    pendingRequests.set(id, {
      onProgress,
      reject,
      resolve: resolve as (value: SolverQueryOutcome) => void,
      timeout,
    });

    const request: SolverWorkerRequest = { id, query };
    worker.postMessage(request);
  });
}

export function runWordSolverQuery(
  query: Extract<SolverQuery, { kind: 'words' }>,
  onProgress?: (message: SolverProgressMessage) => void,
) {
  return runSolverQuery<WordSearchOutcome>(query, onProgress);
}

export function runMultiWordSolverQuery(query: Extract<SolverQuery, { kind: 'multi' }>) {
  return runSolverQuery<MultiWordSearchOutcome>(query);
}

export function cancelSolverQueries(): void {
  resetWorker(new Error('Search cancelled.'));
}
