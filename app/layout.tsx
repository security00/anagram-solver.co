import type { Metadata } from 'next';
import AnalyticsScripts from '@/components/AnalyticsScripts';
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
      <head>
        {/* Google AdSense / Google Ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1548791648803369"
          crossOrigin="anonymous"
        />
        {/* Google Analytics (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5G76PLCMD6"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5G76PLCMD6', { anonymize_ip: true });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <AnalyticsScripts />
        <DynamicCanonical />
      </body>
    </html>
  );
}
