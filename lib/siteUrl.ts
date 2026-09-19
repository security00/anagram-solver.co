/**
 * Returns the site base URL dynamically based on environment or explicit configuration.
 * In development, defaults to the active local server (http://localhost:3001 or process.env.PORT).
 * In production, returns the canonical live domain (https://anagram-solver.co).
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || '3001';
    return `http://localhost:${port}`;
  }
  return 'https://anagram-solver.co';
}

/**
 * Returns an absolute canonical URL for a given pathname.
 */
export function getCanonicalUrl(pathname: string = '/'): string {
  const base = getSiteUrl();
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath === '/') {
    return `${base}/`;
  }
  return `${base}${cleanPath.replace(/\/$/, '')}`;
}
