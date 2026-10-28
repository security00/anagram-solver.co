const CONSENT_KEY = 'anagram-analytics-consent';

export function trackSolverFeedback(
  vote: 'yes' | 'no',
  params: Record<string, string>,
) {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
  } catch {
    return;
  }

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', 'solver_feedback', { vote, ...params });
}
