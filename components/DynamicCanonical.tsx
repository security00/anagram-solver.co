'use client';

import { useEffect } from 'react';

/**
 * Ensures that in local development environments (e.g. localhost:3000, localhost:3001),
 * the canonical link tag matches the active browser origin and pathname.
 * In production, it leaves the canonical tag pointing to the official domain.
 */
export default function DynamicCanonical() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

    if (isLocal) {
      const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonicalLink) {
        const path = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
        const targetHref = `${window.location.origin}${path}`;
        if (canonicalLink.getAttribute('href') !== targetHref) {
          canonicalLink.setAttribute('href', targetHref);
        }
      }
    }
  }, []);

  return null;
}
