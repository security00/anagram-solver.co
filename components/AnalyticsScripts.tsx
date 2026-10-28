'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const CONSENT_KEY = 'anagram-analytics-consent';
const MEASUREMENT_ID = 'G-5G76PLCMD6';
const ADSENSE_CLIENT = 'ca-pub-1548791648803369';

function injectMeasurement() {
  const win = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== 'function') {
    win.gtag = (...args: unknown[]) => {
      win.dataLayer?.push(args);
    };
    win.gtag('js', new Date());
    win.gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
  }
  if (!document.getElementById('ga-loader')) {
    const ga = document.createElement('script');
    ga.id = 'ga-loader';
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(ga);
  }
  if (!document.getElementById('adsense-loader')) {
    const ads = document.createElement('script');
    ads.id = 'adsense-loader';
    ads.async = true;
    ads.crossOrigin = 'anonymous';
    ads.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    ads.addEventListener('load', () => window.dispatchEvent(new Event('ads-ready')));
    document.head.appendChild(ads);
  }
}

type Consent = 'accepted' | 'declined' | 'unknown';

function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener('analytics-consent-change', onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener('analytics-consent-change', onChange);
    window.removeEventListener('storage', onChange);
  };
}

function readConsent(): Consent {
  const saved = window.localStorage.getItem(CONSENT_KEY);
  if (saved === 'accepted' || saved === 'declined') return saved;

  const globalPrivacyControl = (navigator as Navigator & {
    globalPrivacyControl?: boolean;
  }).globalPrivacyControl;
  return globalPrivacyControl || navigator.doNotTrack === '1'
    ? 'declined'
    : 'unknown';
}

export default function AnalyticsScripts() {
  const consent = useSyncExternalStore<Consent | null>(
    subscribeToConsent,
    readConsent,
    () => null
  );
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || consent === null) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] = consent !== 'accepted';
    if (consent !== 'accepted') return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      injectMeasurement();
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(start, { timeout: 2500 });
      return () => {
        window.cancelIdleCallback(idleId);
        window.removeEventListener('pointerdown', start);
        window.removeEventListener('keydown', start);
      };
    }
    const timeoutId = window.setTimeout(start, 800);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [consent]);

  const saveChoice = (choice: Exclude<Consent, 'unknown'>) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event('analytics-consent-change'));
    setShowChoices(false);
  };

  if (consent === null) return null;

  const choicesVisible = consent === 'unknown' || showChoices;

  return (
    <>
      {choicesVisible ? (
        <aside
          aria-label="Analytics privacy choices"
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm border border-[#b9d9e3] border-t-4 border-t-[#09c4d8] bg-white p-4 shadow-[0_12px_32px_rgba(6,26,56,0.18)]"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#061a38]">
              Privacy & Analytics
            </span>
            <button
              type="button"
              onClick={() => saveChoice('declined')}
              className="text-xs text-[#687b91] hover:text-[#061a38]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#52657d]">
            This site uses optional Google Analytics only if you allow it. Word-solving tools always work without analytics.
          </p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => saveChoice('declined')}
              className="border border-[#8cced8] px-3 py-1.5 text-xs font-bold text-[#007f8d] hover:bg-[#effbfc]"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => saveChoice('accepted')}
              className="bg-[#09c4d8] px-3.5 py-1.5 text-xs font-extrabold text-[#061a38] hover:bg-[#41d7e5]"
            >
              Allow
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
