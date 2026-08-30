'use client';

import Script from 'next/script';
import { useState, useSyncExternalStore } from 'react';

const CONSENT_KEY = 'anagram-analytics-consent';
const MEASUREMENT_ID = 'G-5G76PLCMD6';

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

  const saveChoice = (choice: Exclude<Consent, 'unknown'>) => {
    const analyticsAlreadyLoaded = consent === 'accepted' && choice === 'declined';
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event('analytics-consent-change'));
    setShowChoices(false);

    if (analyticsAlreadyLoaded) window.location.reload();
  };

  if (consent === null) return null;

  const choicesVisible = consent === 'unknown' || showChoices;

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {choicesVisible ? (
        <section
          aria-label="Analytics privacy choices"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        >
          <p className="text-sm text-gray-700 dark:text-gray-200">
            This site uses optional Google Analytics only after you allow it. The word-solving tools work without analytics.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveChoice('declined')}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Decline analytics
            </button>
            <button
              type="button"
              onClick={() => saveChoice('accepted')}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Allow analytics
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setShowChoices(true)}
          className="fixed bottom-3 left-3 z-40 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
        >
          Privacy choices
        </button>
      )}
    </>
  );
}
