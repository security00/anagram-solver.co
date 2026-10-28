import type { Metadata } from 'next';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import DictionaryPrefetch from '@/components/DictionaryPrefetch';
import DynamicCanonical from '@/components/DynamicCanonical';
import { getCanonicalUrl, getSiteUrl } from '@/lib/siteUrl';
import './globals.css';

export const metadata: Metadata = {
  title: 'Free Anagram Solver & Word Unscrambler',
  description: 'Find exact English anagrams or shorter words from your letters. Unscramble racks, multi-word phrases, and tile combinations instantly for free.',
  keywords: ['anagram', 'anagram solver', 'word anagram', 'free anagram tool', 'anagram generator'],
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: 'Free Anagram Solver & Word Unscrambler',
    description: 'Find exact English anagrams or shorter words from your letters. Unscramble racks, multi-word phrases, and tile combinations instantly for free.',
    url: getCanonicalUrl('/'),
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Anagram Solver & Word Unscrambler',
    description: 'Find exact English anagrams or shorter words from your letters. Unscramble racks, multi-word phrases, and tile combinations instantly for free.',
  },
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <DictionaryPrefetch />
        <AnalyticsScripts />
        <DynamicCanonical />
      </body>
    </html>
  );
}
