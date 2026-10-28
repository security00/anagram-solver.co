'use client';

import { useEffect } from 'react';
import { prefetchWordList } from '@/lib/dictionaryProgress';

export default function DictionaryPrefetch() {
  useEffect(() => {
    const run = () => prefetchWordList('common');
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(run, 300);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
