'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function readLetters() {
  const match = window.location.pathname.match(/^\/anagram\/([a-zA-Z]+)/);
  return match ? match[1].toLowerCase() : '';
}

export default function PuzzleMissHandoff() {
  const letters = useSyncExternalStore(subscribe, readLetters, () => '');
  if (!letters) return null;

  return (
    <div className="empty-results">
      <h2>No puzzle page for that scramble</h2>
      <p>Solve it on the homepage instead.</p>
      <div className="empty-results-actions">
        <Link className="primary" href={`/?q=${encodeURIComponent(letters)}&mode=exact`}>
          Solve on homepage
        </Link>
      </div>
    </div>
  );
}
