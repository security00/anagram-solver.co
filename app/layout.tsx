import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Free Anagram Solver - Generate Word Anagrams Online',
  description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
  keywords: ['anagram', 'anagram solver', 'word anagram', 'free anagram tool', 'anagram generator'],
  metadataBase: new URL('https://anagram-solver.co'),
  openGraph: {
    title: 'Free Anagram Solver - Generate Word Anagrams Online',
    description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
    url: 'https://anagram-solver.co',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Anagram Solver - Generate Word Anagrams Online',
    description: 'Solve anagrams instantly with our free online tool. Find all possible words from your letters, perfect for Scrabble and word games.',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
