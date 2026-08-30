import type { Metadata } from 'next';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Free Exact Anagram Solver and Word Finder',
  description: 'Find exact English anagrams that use every input letter once, or use dedicated tools for rack words, patterns, and multi-word anagrams.',
  keywords: ['anagram', 'anagram solver', 'word anagram', 'free anagram tool', 'anagram generator'],
  metadataBase: new URL('https://anagram-solver.co'),
  openGraph: {
    title: 'Free Exact Anagram Solver and Word Finder',
    description: 'Find exact anagrams, rack words, letter patterns, and multi-word anagrams in your browser.',
    url: 'https://anagram-solver.co',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Exact Anagram Solver and Word Finder',
    description: 'Find exact anagrams, rack words, letter patterns, and multi-word anagrams in your browser.',
  },
  alternates: {
    canonical: 'https://anagram-solver.co',
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
        <AnalyticsScripts />
      </body>
    </html>
  );
}
